import { Link } from "react-router-dom";
import { useTheme } from "../theme/ThemeContext";
import { FONTS } from "../components/styles";
import { useIsMobile } from "../hooks/useMediaQuery";
import H2 from "../components/ui/H2";
import Label from "../components/ui/Label";
import { skills, projects } from "../data/portfolio";

const AREAS = [["ML/AI", "ML / AI"], ["Languages", "Languages"], ["Web/3D", "Web & 3D"], ["iOS", "iOS"], ["Tools", "Tools"], ["Design", "Design"]];
const count = id => projects.filter(p => p.skills.includes(id)).length;

export default function Skills() {
    const { theme: t } = useTheme();
    const isMobile = useIsMobile();
    const chip = linked => ({ ...FONTS.inter, fontSize: ".95rem", padding: "6px 12px", borderRadius: 999, textDecoration: "none",
        color: linked ? t.textHi : t.textMute, border: `1px solid ${linked ? t.borderHi : t.border}`, background: linked ? t.surface : "transparent" });
    return (
        <section id="skills" style={{ padding: isMobile ? "60px 20px" : "100px 24px", position: "relative", zIndex: 10 }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Label>// Skills</Label>
                <H2>SKILLS</H2>
                <p style={{ color: t.textMute, fontSize: "1.05rem", margin: "0 0 32px" }}>Click a skill to see the projects that use it.</p>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "minmax(0,1fr)" : "repeat(2, minmax(0,1fr))", gap: 20 }}>
                    {AREAS.map(([key, title]) => (
                        <div key={key} style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 16, padding: "20px 22px" }}>
                            <h3 style={{ ...FONTS.mono, fontSize: ".85rem", letterSpacing: ".16em", color: t.accent, marginBottom: 14 }}>{title.toUpperCase()}</h3>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                                {skills.filter(s => s.area === key).map(s => {
                                    const n = count(s.id);
                                    return n
                                        ? <Link key={s.id} to={`/projects?skill=${s.id}`} style={chip(true)}>{s.label}</Link>
                                        : <span key={s.id} style={chip(false)}>{s.label}</span>;
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
