import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import querystring from 'querystring';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

let accessToken = null;
let tokenExpiresAt = null;

// Utility to refresh the Spotify Access Token (User Token)
async function refreshSpotifyToken() {
    if (accessToken && Date.now() < tokenExpiresAt) return accessToken;

    if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
        throw new Error("Missing Spotify credentials in .env");
    }

    const basicAuth = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');
    
    try {
        const response = await axios.post('https://accounts.spotify.com/api/token', 
            querystring.stringify({
                grant_type: 'refresh_token',
                refresh_token: SPOTIFY_REFRESH_TOKEN
            }), {
            headers: {
                'Authorization': `Basic ${basicAuth}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        accessToken = response.data.access_token;
        tokenExpiresAt = Date.now() + (response.data.expires_in - 100) * 1000;
        return accessToken;
    } catch (err) {
        console.error("Error refreshing Spotify token:", err.response?.data || err.message);
        throw err;
    }
}

// Utility to get a Client Credentials Token (App Token)
// Use this for public playlist/track lookups to bypass scope restrictions
let clientToken = null;
let clientTokenExpiresAt = null;

async function getClientCredentialsToken() {
    if (clientToken && Date.now() < clientTokenExpiresAt) return clientToken;

    const basicAuth = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');
    
    try {
        const response = await axios.post('https://accounts.spotify.com/api/token', 
            querystring.stringify({ grant_type: 'client_credentials' }), {
            headers: {
                'Authorization': `Basic ${basicAuth}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        clientToken = response.data.access_token;
        clientTokenExpiresAt = Date.now() + (response.data.expires_in - 100) * 1000;
        return clientToken;
    } catch (err) {
        console.error("Error getting Client Credentials token:", err.response?.data || err.message);
        throw err;
    }
}

// Memory cache to avoid spamming lrclib for the same song
const lyricsCache = {};

// Load Playlist Cache if it exists
let playlistCache = {};
const CACHE_PATH = './playlist_cache.json';
import fs from 'fs';
if (fs.existsSync(CACHE_PATH)) {
    try {
        playlistCache = JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8'));
        console.log(`📦 Loaded ${Object.keys(playlistCache).length} tracks from local cache.`);
    } catch (e) {
        console.error("Failed to load metadata cache:", e.message);
    }
}

app.get('/api/track', async (req, res) => {
    try {
        const uri = req.query.uri;
        const duration = parseInt(req.query.duration);
        if (!uri) return res.status(400).json({ error: "Missing uri parameter" });

        const token = await refreshSpotifyToken();
        let trackId = null;
        let cachedData = null;

        // 🟢 PRE-CHECK: Look in our local Metadata Cache first
        // We match by duration (allowing 2s margin)
        const cacheMatchKey = Object.keys(playlistCache).find(d => Math.abs(parseInt(d) - duration) < 2000);
        
        if (cacheMatchKey) {
            cachedData = playlistCache[cacheMatchKey];
            trackId = cachedData.id;
            console.log(`✅ Cache Match: ${cachedData.name} (${cacheMatchKey}ms)`);
        }

        // 🔵 FALLBACK: If not in cache, try Spotify API
        if (!trackId) {
            if (uri.includes(':track:')) {
                trackId = uri.split(':').pop();
            } else if (uri.includes(':playlist:')) {
                const playlistId = uri.split(':').pop();
                console.log(`Resolving track in playlist [${playlistId}] via duration matching (${duration}ms)...`);
                
                try {
                    const cToken = await getClientCredentialsToken();
                    const playlistRes = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
                        headers: { 'Authorization': `Bearer ${cToken}` }
                    });

                    const tracks = playlistRes.data.tracks.items;
                    const match = tracks.find(item => item.track && Math.abs(item.track.duration_ms - duration) < 4000);

                    if (match) {
                        trackId = match.track.id;
                        console.log(`✅ API Match: ${match.track.name}`);
                    }
                } catch (err) {
                    console.error(`🛑 API Resolve Failed [${err.response?.status}]`);
                }
            }
        }

        if (!trackId) {
            return res.status(404).json({ error: "Track not found or unresolvable" });
        }

        // 3. Resolve Metadata (Prefer cache, then Spotify)
        let rawTitle, artist, albumImageUrl;
        
        if (cachedData) {
            rawTitle = cachedData.name;
            artist = cachedData.artist;
            albumImageUrl = cachedData.albumImageUrl;
        } else {
            const spotifyRes = await axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const song = spotifyRes.data;
            rawTitle = song.name;
            artist = song.artists[0].name;
            albumImageUrl = song.album.images[0]?.url;
        }

        // 🧼 Clean Title
        const cleanTitle = rawTitle.replace(/\s\-\s.*$/, "").replace(/\(.*\)/, "").trim();
        console.log(`Backend resolving: [${artist}] - ${cleanTitle}`);
        
        let syncedLyrics = null;
        const cacheKey = `${artist}-${cleanTitle}`.toLowerCase();

        if (lyricsCache[cacheKey]) {
            syncedLyrics = lyricsCache[cacheKey];
        } else {
            try {
                const lrcRes = await axios.get(`https://lrclib.net/api/search`, {
                    params: { q: `${artist} ${cleanTitle}` }
                });
                const match = lrcRes.data.find(track => track.syncedLyrics) || lrcRes.data[0];
                if (match && match.syncedLyrics) {
                    syncedLyrics = match.syncedLyrics;
                    lyricsCache[cacheKey] = syncedLyrics;
                } else {
                    lyricsCache[cacheKey] = "NO_LYRICS";
                }
            } catch (lrcErr) {
                console.error("Lrclib search error:", lrcErr.message);
                lyricsCache[cacheKey] = "NO_LYRICS";
            }
        }

        res.json({
            title: cleanTitle,
            artist,
            albumImageUrl,
            syncedLyrics: syncedLyrics === "NO_LYRICS" ? null : syncedLyrics
        });

    } catch (error) {
        console.error("Server API error:", error.message);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Spotify Sync Backend running on http://localhost:${PORT}`);
});
