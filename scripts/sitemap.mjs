// Writes public/sitemap.xml from the data file so it never drifts from the real routes.
import { readFileSync, writeFileSync } from "node:fs";
const SITE = "https://synamalhan.github.io/website";
const { projects } = JSON.parse(readFileSync(new URL("../src/data/portfolio.json", import.meta.url)));
const urls = ["/", "/projects", ...projects.map(p => `/projects/${p.id}`)];
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url><loc>${SITE}${u === "/" ? "/" : u}</loc></url>`).join("\n")}\n</urlset>\n`;
writeFileSync(new URL("../public/sitemap.xml", import.meta.url), xml);
console.log(`sitemap: ${urls.length} urls`);
