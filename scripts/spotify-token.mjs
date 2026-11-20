// One-time helper: gets a new Spotify refresh token with the scopes the site needs.
// Usage: node scripts/spotify-token.mjs [redirect-uri]   (reads SPOTIFY_CLIENT_ID / SPOTIFY_CLIENT_SECRET from .env)
import { readFileSync } from "node:fs";
import { createServer } from "node:http";
const env = Object.fromEntries(readFileSync(new URL("../.env", import.meta.url), "utf8").split("\n").filter(l => /^\w+=/.test(l)).map(l => [l.split("=")[0], l.slice(l.indexOf("=") + 1).trim()]));
const id = env.SPOTIFY_CLIENT_ID, secret = env.SPOTIFY_CLIENT_SECRET;
if (!id || !secret) throw new Error("Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in .env first");
const REDIRECT = process.argv[2] || "http://127.0.0.1:8888/callback"; // pass your registered URI as the first argument to use a different one
const scope = "user-read-currently-playing user-read-playback-state user-read-recently-played";
console.log("\n1. In the Spotify dashboard, add this Redirect URI to your app:", REDIRECT);
console.log("2. Open this link and approve:\n\nhttps://accounts.spotify.com/authorize?" + new URLSearchParams({ client_id: id, response_type: "code", redirect_uri: REDIRECT, scope }) + "\n");
createServer(async (req, res) => {
    const code = new URL(req.url, REDIRECT).searchParams.get("code");
    if (!code) { res.end("Waiting for approval..."); return; }
    const r = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { Authorization: "Basic " + Buffer.from(`${id}:${secret}`).toString("base64"), "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ grant_type: "authorization_code", code, redirect_uri: REDIRECT }),
    });
    const j = await r.json();
    res.end(j.refresh_token ? "Done. Check your terminal, then close this tab." : "Failed: " + JSON.stringify(j));
    console.log(j.refresh_token ? "\nSPOTIFY_REFRESH_TOKEN=" + j.refresh_token + "\n\nPaste that into .env and into Render's environment settings." : j);
    process.exit(0);
}).listen(Number(new URL(REDIRECT).port) || 80);
