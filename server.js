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

app.get('/api/now-playing', async (req, res) => {
    try {
        const token = await refreshSpotifyToken();

        // 1. Fetch currently playing from Spotify
        const spotifyRes = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (spotifyRes.status === 204 || spotifyRes.status > 400 || !spotifyRes.data.item) {
            return res.json({ isPlaying: false });
        }

        const song = spotifyRes.data;
        const isPlaying = song.is_playing;
        const title = song.item.name;
        const artist = song.item.artists[0].name;
        const progress_ms = song.progress_ms;
        const albumImageUrl = song.item.album.images[0]?.url;
        
        let syncedLyrics = null;
        const cacheKey = `${artist}-${title}`.toLowerCase();

        // 2. Fetch lyrics from Lrclib (or use cache)
        if (lyricsCache[cacheKey]) {
            syncedLyrics = lyricsCache[cacheKey];
        } else {
            try {
                // Fetch from open Lrclib API
                const lrcRes = await axios.get(`https://lrclib.net/api/get`, {
                    params: { track_name: title, artist_name: artist }
                });
                if (lrcRes.data && lrcRes.data.syncedLyrics) {
                    syncedLyrics = lrcRes.data.syncedLyrics;
                    lyricsCache[cacheKey] = syncedLyrics; // Cache it
                } else {
                    lyricsCache[cacheKey] = "NO_LYRICS";
                }
            } catch (lrcErr) {
                console.error("Lyrics fetch failed:", lrcErr.message);
                // Fail gracefully
                lyricsCache[cacheKey] = "NO_LYRICS";
            }
        }

        res.json({
            isPlaying,
            title,
            artist,
            progress_ms,
            albumImageUrl,
            syncedLyrics: syncedLyrics === "NO_LYRICS" ? null : syncedLyrics
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Spotify Sync Backend running on http://localhost:${PORT}`);
});
