// Build-time fallback: saves the current books to src/data/reading.json so the page has something before the live API answers.
import { writeFileSync, existsSync } from "node:fs";
import { fetchReading } from "./reading-lib.mjs";
const OUT = new URL("../src/data/reading.json", import.meta.url);
if (!existsSync(OUT)) writeFileSync(OUT, "[]\n");
try { const b = await fetchReading(); writeFileSync(OUT, JSON.stringify(b, null, 2) + "\n"); console.log("hardcover: saved", b.map(x => x.title).join(", ")); }
catch (e) { console.log("hardcover: skipped,", e.message); }
