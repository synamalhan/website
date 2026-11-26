import { Link } from "react-router-dom";
import { useTheme } from "../theme/ThemeContext";
import { FONTS } from "../components/styles";
import { useIsMobile } from "../hooks/useMediaQuery";
import H2 from "../components/ui/H2";
import Tag from "../components/ui/Tag";
import ProjectCover, { catColor } from "../components/ProjectCover";
import { projects, categories } from "../data/portfolio";
import { statusLabel } from "../data/format";

const building = projects.filter(p => p.status === "in-progress");
const featured = projects.filter(p => p.featured).sort((a, b) => a.featuredRank - b.featuredRank);

function Card({ p, big }) {
    const { theme: t } = useTheme();
    const status = statusLabel(p);
    const c = catColor(t, p.category); // same hue as this project's card on the Work page
    return (
        <Link to={`/projects/${p.id}`} className="hover-card" style={{
            display: "flex", flexDirection: "column", gap: 12, padding: 14, textDecoration: "none",
            background: `${c}14`, border: `1px solid ${c}55`, borderTop: `4px solid ${c}`, borderRadius: 16, color: t.text,
        }}>
            <ProjectCover p={p} big={big} />
            <div style={{ padding: "0 6px 6px", display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ ...FONTS.mono, fontSize: ".72rem", letterSpacing: ".12em", color: c, fontWeight: 700 }}>{(categories.find(x => x.type === p.category)?.title || "").toUpperCase()}</div>
                {status && <div style={{ ...FONTS.mono, fontSize: ".75rem", letterSpacing: ".08em", color: t.gold }}>{status.toUpperCase()}</div>}
                <div style={{ ...FONTS.orb, fontWeight: 800, fontSize: big ? "1.3rem" : "1.05rem", color: t.textHi, lineHeight: 1.2 }}>{p.title}</div>
                {big && <p style={{ fontSize: ".95rem", lineHeight: 1.5, color: t.textMute, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{p.summary}</p>}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{p.stack.slice(0, 3).map(s => <Tag key={s}>{s}</Tag>)}</div>
            </div>
        </Link>
    );
}

export default function Featured() {
    const { theme: t } = useTheme();
    const isMobile = useIsMobile();
    const cases = featured.filter(p => p.tier === "case-study");
    const cards = featured.filter(p => p.tier === "card");
    const grid = n => ({ display: "grid", gridTemplateColumns: isMobile ? "1fr" : `repeat(${n}, minmax(0, 1fr))`, gap: 20 });
    return (
        <section id="featured" style={{ padding: isMobile ? "60px 20px" : "100px 24px", position: "relative", zIndex: 10 }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <H2>FEATURED WORK</H2>
                <div style={{ ...grid(2), marginBottom: 20 }}>{cases.map(p => <Card key={p.id} p={p} big />)}</div>
                <div style={grid(Math.min(cards.length, 3))}>{cards.map(p => <Card key={p.id} p={p} />)}</div>
                {building.length > 0 && (
                    <div style={{ marginTop: 36 }}>
                        <div style={{ ...FONTS.mono, fontSize: ".8rem", letterSpacing: ".12em", color: t.gold, marginBottom: 12 }}>BUILDING NOW</div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                            {building.map(p => <Link key={p.id} to={`/projects/${p.id}`} style={{ ...FONTS.inter, fontSize: ".95rem", padding: "6px 14px", borderRadius: 999, color: t.text, border: `1px solid ${t.border}`, textDecoration: "none" }}>{p.title.split(":")[0]}</Link>)}
                        </div>
                    </div>
                )}
                <p style={{ marginTop: 28, fontSize: "1rem" }}><Link to="/projects" style={{ color: "inherit" }}>Full archive →</Link></p>
            </div>
        </section>
    );
}
