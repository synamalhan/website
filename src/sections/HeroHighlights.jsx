import { Link } from "react-router-dom";
import { useTheme } from "../theme/ThemeContext";
import { FONTS } from "../components/styles";
import { useIsMobile } from "../hooks/useMediaQuery";
import { projects, experiences, categories, profile } from "../data/portfolio";

const top3 = projects.filter(p => p.featured).sort((a, b) => a.featuredRank - b.featuredRank).slice(0, 3);
const current = experiences.filter(e => !e.end);
const catTitle = type => categories.find(c => c.type === type)?.title;

export default function HeroHighlights({ left }) {
    const { theme: t } = useTheme();
    const isMobile = useIsMobile();
    const accents = [t.cyan, t.accent, t.gold];
    return (
        <div style={{ width: "100%", maxWidth: 820, margin: left ? "40px 0 0" : "40px auto 0", position: "relative", zIndex: 2 }}>
            {current.length > 0 && (
                <div style={{ ...FONTS.mono, fontSize: isMobile ? ".75rem" : ".85rem", letterSpacing: ".08em", color: t.textMute, marginBottom: 24 }}>
                    <span style={{ color: t.accent }}>NOW · </span>
                    {current.map(e => `${e.role} @ ${e.company}`).join(" · ")}
                    {profile.now && <div style={{ marginTop: 6, fontSize: ".8rem", letterSpacing: ".04em", opacity: 0.85 }}>{profile.now}</div>}
                </div>
            )}
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 16 }}>
                {top3.map((p, i) => (
                    <Link key={p.id} to={`/projects/${p.id}`} className="float-y hover-card" style={{
                        textDecoration: "none", textAlign: "left", padding: "16px 18px", borderRadius: 14,
                        background: t.surface, border: `1px solid ${t.border}`, borderTop: `3px solid ${accents[i]}`,
                        boxShadow: "0 12px 28px rgba(0,0,0,.25)",
                        animationDuration: `${2.6 + i * 0.5}s`, animationDelay: `${i * 0.4}s`,
                        marginTop: !isMobile && i === 1 ? 20 : 0,
                    }}>
                        <div style={{ ...FONTS.mono, fontSize: ".7rem", letterSpacing: ".1em", color: accents[i], marginBottom: 6 }}>{catTitle(p.category)?.toUpperCase()}</div>
                        <div style={{ ...FONTS.inter, fontSize: "1rem", fontWeight: 600, color: t.textHi }}>{p.title.split(":")[0]}</div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
