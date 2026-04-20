import axios from 'axios';
import fs from 'fs';
import dotenv from 'dotenv';
import querystring from 'querystring';

dotenv.config();

const PLAYLIST_ID = '0Uggezps9kTbnOpFB7ovff';
const OUTPUT_FILE = './playlist_cache.json';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

async function getAccessToken() {
    console.log('🔑 Authenticating with Spotify...');
    const basicAuth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
    
    // Try Refresh Token first
    try {
        const res = await axios.post('https://accounts.spotify.com/api/token', 
            querystring.stringify({ grant_type: 'refresh_token', refresh_token: REFRESH_TOKEN }), {
            headers: { 'Authorization': `Basic ${basicAuth}`, 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        return res.data.access_token;
    } catch (err) {
        console.log('⚠️ Refresh Token failed, falling back to Client Credentials...');
        const res = await axios.post('https://accounts.spotify.com/api/token', 
            querystring.stringify({ grant_type: 'client_credentials' }), {
            headers: { 'Authorization': `Basic ${basicAuth}`, 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        return res.data.access_token;
    }
}

async function fetchAllTracks() {
    try {
        const token = await getAccessToken();
        console.log('📡 Fetching playlist tracks...');
        
        let tracks = [];
        let url = `https://api.spotify.com/v1/playlists/${PLAYLIST_ID}/tracks?limit=100`;
        
        while (url) {
            const res = await axios.get(url, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            tracks = tracks.concat(res.data.items);
            url = res.data.next;
        }

        console.log(`✅ Found ${tracks.length} tracks. Parsing metadata...`);

        const cache = {};
        tracks.forEach(item => {
            if (!item.track) return;
            const t = item.track;
            // Store by duration_ms as the primary key for the IFrame workaround
            cache[t.duration_ms] = {
                id: t.id,
                name: t.name,
                artist: t.artists[0]?.name,
                albumImageUrl: t.album.images[0]?.url
            };
        });

        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(cache, null, 4));
        console.log(`\n🎉 SUCCESS! Metadata saved to ${OUTPUT_FILE}`);
        console.log('You can now restart your server and it will use this local file.');
    } catch (err) {
        console.error('\n🛑 FETCH FAILED!');
        console.error('Error:', err.response?.status, err.response?.data?.error || err.message);
        console.log('\nIf you get a 403, make sure your Spotify App is in "Development Mode" and your email is added to "Users and Access" in the Spotify Dashboard.');
    }
}

fetchAllTracks();
