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
        if (!uri) return res.status(400).json({ error: "Missing uri parameter" });

        const trackId = uri.split(':').pop();
        const token = await refreshSpotifyToken();

        // 1. Fetch exact track data from Spotify
        const spotifyRes = await axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const song = spotifyRes.data;
        const title = song.name;
        const artist = song.artists[0].name;
        const albumImageUrl = song.album.images[0]?.url;
        
        let syncedLyrics = null;
        const cacheKey = `${artist}-${title}`.toLowerCase();

        // 2. Fetch lyrics from Lrclib (or use cache)
        if (lyricsCache[cacheKey]) {
            syncedLyrics = lyricsCache[cacheKey];
        } else {
            try {
                // Use Search API for fuzzy matching (avoids failures on "- Remastered" etc)
                const lrcRes = await axios.get(`https://lrclib.net/api/search`, {
                    params: { q: `${artist} ${title}` }
                });
                
                const match = lrcRes.data.find(track => track.syncedLyrics);
                
                if (match) {
                    syncedLyrics = match.syncedLyrics;
                    lyricsCache[cacheKey] = syncedLyrics; // Cache it
                } else {
                    lyricsCache[cacheKey] = "NO_LYRICS";
                }
            } catch (lrcErr) {
                console.error("Lyrics fetch failed:", lrcErr.message);
                lyricsCache[cacheKey] = "NO_LYRICS";
            }
        }

        res.json({
            title,
            artist,
            albumImageUrl,
            syncedLyrics: syncedLyrics === "NO_LYRICS" ? null : syncedLyrics
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Spotify Sync Backend running on http://localhost:${PORT}`);
});
