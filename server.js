import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import querystring from 'querystring';

dotenv.config();

// Fix for TLSSocket memory leak warning
import { EventEmitter } from 'events';
EventEmitter.defaultMaxListeners = 50;
process.setMaxListeners(50);

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

// Short-term cache for now-playing to avoid hitting Spotify too hard
let lastNowPlaying = null;
let lastNowPlayingTime = 0;
const CACHE_TTL = 2000; // 2 seconds

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

// Utility to fetch lyrics from lrclib
async function getLyrics(artist, title) {
    const cleanTitle = title.replace(/\s\-\s.*$/, "").replace(/\(.*\)/, "").trim();
    const cacheKey = `${artist}-${cleanTitle}`.toLowerCase();

    if (lyricsCache[cacheKey]) {
        return lyricsCache[cacheKey] === "NO_LYRICS" ? null : lyricsCache[cacheKey];
    }

    try {
        const lrcRes = await axios.get(`https://lrclib.net/api/search`, {
            params: { q: `${artist} ${cleanTitle}` }
        });
        const match = lrcRes.data.find(track => track.syncedLyrics) || lrcRes.data[0];
        if (match && match.syncedLyrics) {
            lyricsCache[cacheKey] = match.syncedLyrics;
            return match.syncedLyrics;
        } else {
            lyricsCache[cacheKey] = "NO_LYRICS";
            return null;
        }
    } catch (lrcErr) {
        console.error("Lrclib search error:", lrcErr.message);
        lyricsCache[cacheKey] = "NO_LYRICS";
        return null;
    }
}

app.get('/api/now-playing', async (req, res) => {
    try {
        // Return cached data if it's fresh
        if (lastNowPlaying && Date.now() - lastNowPlayingTime < CACHE_TTL) {
            return res.json(lastNowPlaying);
        }

        const token = await refreshSpotifyToken();
        const spotifyRes = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (spotifyRes.status === 204 || !spotifyRes.data) {
            const idleData = { isPlaying: false };
            lastNowPlaying = idleData;
            lastNowPlayingTime = Date.now();
            return res.json(idleData);
        }

        const data = spotifyRes.data;
        const track = data.item;

        if (!track) {
            const idleData = { isPlaying: false };
            lastNowPlaying = idleData;
            lastNowPlayingTime = Date.now();
            return res.json(idleData);
        }

        const syncedLyrics = await getLyrics(track.artists[0].name, track.name);

        const nowPlayingData = {
            isPlaying: data.is_playing,
            title: track.name.replace(/\s\-\s.*$/, "").replace(/\(.*\)/, "").trim(),
            artist: track.artists[0].name,
            albumImageUrl: track.album.images[0]?.url,
            progressMs: data.progress_ms,
            durationMs: track.duration_ms,
            syncedLyrics,
            uri: track.uri
        };

        lastNowPlaying = nowPlayingData;
        lastNowPlayingTime = Date.now();
        res.json(nowPlayingData);

    } catch (err) {
        if (err.response?.status === 429) {
            console.error("🛑 Spotify Rate Limit (429) Hit. Throttling...");
            // Return last known data to prevent frontend from crashing
            if (lastNowPlaying) return res.json(lastNowPlaying);
        }
        console.error("Now playing error:", err.message);
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/track', async (req, res) => {
    try {
        const uri = req.query.uri;
        const duration = parseInt(req.query.duration);
        if (!uri) return res.status(400).json({ error: "Missing uri parameter" });

        const token = await refreshSpotifyToken();
        let trackId = null;
        let cachedData = null;

        const cacheMatchKey = Object.keys(playlistCache).find(d => Math.abs(parseInt(d) - duration) < 2000);
        
        if (cacheMatchKey) {
            cachedData = playlistCache[cacheMatchKey];
            trackId = cachedData.id;
        }

        if (!trackId) {
            if (uri.includes(':track:')) {
                trackId = uri.split(':').pop();
            } else if (uri.includes(':playlist:')) {
                const playlistId = uri.split(':').pop();
                try {
                    const cToken = await getClientCredentialsToken();
                    const playlistRes = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
                        headers: { 'Authorization': `Bearer ${cToken}` }
                    });
                    const tracks = playlistRes.data.tracks.items;
                    const match = tracks.find(item => item.track && Math.abs(item.track.duration_ms - duration) < 4000);
                    if (match) trackId = match.track.id;
                } catch (err) {}
            }
        }

        if (!trackId) return res.status(404).json({ error: "Track not found" });

        const spotifyRes = await axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const syncedLyrics = await getLyrics(spotifyRes.data.artists[0].name, spotifyRes.data.name);

        res.json({
            title: spotifyRes.data.name.replace(/\s\-\s.*$/, "").replace(/\(.*\)/, "").trim(),
            artist: spotifyRes.data.artists[0].name,
            albumImageUrl: spotifyRes.data.album.images[0]?.url,
            syncedLyrics
        });

    } catch (error) {
        console.error("Server API error:", error.message);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Spotify Sync Backend running on http://localhost:${PORT}`);
});
