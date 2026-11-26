import { useTheme } from "../theme/ThemeContext";
import { FONTS } from "./styles";
import { categories } from "../data/portfolio";
import { projectImage } from "../data/assets";

const shotsOf = p => p.images.filter(i => i.kind === "screenshot").slice(0, 3);
// A screenshot can carry a dark-mode variant ({ dark: { src, bg } }); pick the one for the current theme.
export const shotFor = (t, i) => (t.name === "dark" && i.dark ? { ...i, ...i.dark } : i);
const CAT_COLOR = { ml: "cyan", ios: "accent", vision: "green", fullstack: "magenta", default: "gold", hackathon: "red", creative: "teal", tools: "lime" }; // eight categories, eight hues
// One hue per category, from the theme, so every card for a category matches.
export const catColor = (t, type) => t[CAT_COLOR[type]] || t.accent;

// No app screenshot yet: a cover built from the project's own headline result (or summary), tinted by category.
function Cover({ p, big }) {
    const { theme: t } = useTheme();
    const c = catColor(t, p.category);
    const m = p.metrics?.[0];
    const headline = m ? m.value.replace(/\s*\[.*?\]/, "") : null;
    return (
        <div style={{ aspectRatio: big ? "16 / 9" : "16 / 10", borderRadius: 10, padding: "18px 20px", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-between", background: `${c}22`, border: `1px solid ${c}55`, overflow: "hidden" }}>
            <div style={{ ...FONTS.mono, fontSize: "0.85rem", letterSpacing: ".12em", color: c, display: "flex", justifyContent: "space-between" }}>
                <span>{(categories.find(x => x.type === p.category)?.title || "").toUpperCase()}</span><span>{p.year}</span>
            </div>
            {headline ? (
                <div>
                    <div style={{ ...FONTS.orb, fontWeight: 900, fontSize: big ? "2rem" : "1.5rem", lineHeight: 1.1, color: t.textHi }}>{headline}</div>
                    <div style={{ fontSize: ".8rem", color: t.textMute, marginTop: 6, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{m.label}</div>
                </div>
            ) : (
                <div style={{ fontSize: big ? "1.1rem" : ".95rem", lineHeight: 1.4, color: t.textHi, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{p.summary}</div>
            )}
        </div>
    );
}

// App screenshots side by side on the card itself: no backing panel, so the phones sit directly on the card.
function Shots({ p, big }) {
    const { theme: t } = useTheme();
    const first = shotFor(t, shotsOf(p)[0]);
    // Desktop screenshots fill the card as one image (top of the page, where the UI is); phone screenshots sit side by side.
    if (first.wide) return (
        <div style={{ aspectRatio: big ? "16 / 9" : "16 / 10", borderRadius: 10, overflow: "hidden", background: first.bg, border: "1px solid rgba(128,128,150,.35)", boxShadow: "0 10px 24px rgba(0,0,0,.3)" }}>
            <img src={projectImage(first.src)} alt={first.alt} loading="lazy" style={{ width: "100%", height: "100%", objectFit: first.fit || "cover", objectPosition: "top", display: "block" }} />
        </div>
    );
    return (
        <div style={{ position: "relative", aspectRatio: big ? "16 / 9" : "16 / 10", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, display: "flex", justifyContent: "center", gap: 14, padding: "6px 0" }}>
                {shotsOf(p).map(i => <img key={i.src} src={projectImage(i.src)} alt={i.alt} loading="lazy" style={{ height: "100%", width: "auto", objectFit: "contain", borderRadius: 14, boxShadow: "0 10px 24px rgba(0,0,0,.35)" }} />)}
            </div>
        </div>
    );
}

// Card thumbnail: app screenshots when the project has them, else a cover built from its headline result.
export default function ProjectCover({ p, big }) {
    return shotsOf(p).length ? <Shots p={p} big={big} /> : <Cover p={p} big={big} />;
}
