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

// Utility to refresh the Spotify Access Token
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

// Memory cache to avoid spamming lrclib for the same song
const lyricsCache = {};

app.get('/api/track', async (req, res) => {
    try {
        const uri = req.query.uri;
        const duration = parseInt(req.query.duration);
        if (!uri) return res.status(400).json({ error: "Missing uri parameter" });

        const token = await refreshSpotifyToken();
        let trackId = null;

        // 🟢 Case 1: The player gave us a specific track URI
        if (uri.includes(':track:')) {
            trackId = uri.split(':').pop();
        } 
        // 🟡 Case 2: The player gave us a playlist URI (Workaround for IFrame limitation)
        else if (uri.includes(':playlist:')) {
            const playlistId = uri.split(':').pop();
            console.log(`Resolving track in playlist [${playlistId}] via duration matching (${duration}ms)...`);
            
            const playlistRes = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            // Find track with matching duration (allowing 1.5s margin for safety)
            const match = playlistRes.data.items.find(item => {
                if (!item.track) return false;
                const diff = Math.abs(item.track.duration_ms - duration);
                return diff < 1500; 
            });

            if (match) {
                trackId = match.track.id;
                console.log(`Matched track: ${match.track.name} [${trackId}]`);
            } else {
                console.log("Could not find a duration match in playlist.");
            }
        }

        if (!trackId) {
            return res.status(404).json({ error: "Track not found or unresolvable from context" });
        }

        // 2. Fetch metadata from Spotify
        const spotifyRes = await axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const song = spotifyRes.data;
        const rawTitle = song.name;
        const artist = song.artists[0].name;
        const albumImageUrl = song.album.images[0]?.url;

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
        console.error("Spotify API error:", error.message);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Spotify Sync Backend running on http://localhost:${PORT}`);
});
