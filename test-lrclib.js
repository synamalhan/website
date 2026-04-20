import axios from 'axios';

async function test() {
    try {
        const title = "Blinding Lights";
        const artist = "The Weeknd";
        const lrcRes = await axios.get(`https://lrclib.net/api/get`, {
            params: { track_name: title, artist_name: artist }
        });
        console.log("Status:", lrcRes.status);
        console.log("Lyrics preview:", lrcRes.data.syncedLyrics ? lrcRes.data.syncedLyrics.substring(0, 100) : "NONE");
    } catch (e) {
        console.log("Error:", e.message);
    }
}
test();
