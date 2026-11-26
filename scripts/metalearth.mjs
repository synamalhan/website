// Build step: finds the product photo for the Metal Earth model linked in portfolio.json (profile.currently.metalEarth.link)
// from the page's og:image, and saves it to src/data/metalearth.json. Change the link, rebuild, and the picture follows.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
const OUT = new URL("../src/data/metalearth.json", import.meta.url);
const link = JSON.parse(readFileSync(new URL("../src/data/portfolio.json", import.meta.url), "utf8")).profile.currently?.metalEarth?.link;
const saved = existsSync(OUT) ? JSON.parse(readFileSync(OUT, "utf8")) : {};
if (!link) { console.log("metalearth: no link set, skipped"); process.exit(0); }
try {
    const res = await fetch(link, { headers: { "user-agent": "Mozilla/5.0 (compatible; portfolio-build)" } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    const image = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)?.[1];
    if (!image) throw new Error("no og:image on the page");
    writeFileSync(OUT, JSON.stringify({ link, image }, null, 2) + "\n");
    console.log("metalearth: saved", image);
} catch (e) {
    // Keep the old picture only if it belongs to this same link; otherwise the page shows no picture rather than the wrong one.
    if (saved.link !== link) writeFileSync(OUT, JSON.stringify({ link, image: "" }, null, 2) + "\n");
    console.log("metalearth: skipped,", e.message);
}
