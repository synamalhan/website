import { useTheme } from "../theme/ThemeContext";
import { FONTS } from "../components/styles";
import { useIsMobile } from "../hooks/useMediaQuery";
import H2 from "../components/ui/H2";
import Label from "../components/ui/Label";
import { profile } from "../data/portfolio";

export default function Education() {
    const { theme: t } = useTheme();
    const isMobile = useIsMobile();
    const AREAS = { cs: ["Computer Science", t.cyan], math: ["Math & Statistics", t.gold], data: ["Data Science", t.accent] };
    const chip = color => ({ ...FONTS.inter, fontSize: ".95rem", padding: "6px 14px", borderRadius: 999, color, border: `1px solid ${color}`, background: "transparent" });
    const group = status => profile.coursework.filter(c => c.status === status);
    const Row = ({ items }) => <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>{items.map(c => <span key={c.name} style={chip(AREAS[c.area][1])}>{c.name}</span>)}</div>;
    const label = { ...FONTS.mono, fontSize: ".8rem", letterSpacing: ".12em", color: t.textMute, margin: "18px 0 10px" };
    return (
        <section id="education" style={{ padding: isMobile ? "40px 20px" : "60px 24px", position: "relative", zIndex: 10 }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Label>// Education</Label>
                <H2>EDUCATION</H2>
                <div className="hover-card" style={{ border: `1px solid ${t.border}`, background: t.surface, borderRadius: 16, padding: 24 }}>
                    <div style={{ ...FONTS.orb, fontWeight: 700, fontSize: "1.5rem", color: t.textHi }}>{profile.school}</div>
                    <div style={{ color: t.text, fontSize: "1.1rem", margin: "8px 0" }}>{profile.degree} · Minor in {profile.minor}</div>
                    <div style={{ ...FONTS.mono, fontSize: ".85rem", letterSpacing: ".12em", color: t.textMute, marginBottom: 16 }}>EXPECTED MAY {profile.gradYear}</div>

                    <div style={{ display: "flex", gap: 18, flexWrap: "wrap", marginBottom: 6 }} aria-label="Color key">
                        {Object.values(AREAS).map(([name, color]) => (
                            <span key={name} style={{ ...FONTS.mono, fontSize: ".78rem", letterSpacing: ".08em", color: t.textMute, display: "inline-flex", alignItems: "center", gap: 8 }}>
                                <span aria-hidden="true" style={{ width: 12, height: 12, borderRadius: "50%", background: color }} />{name}
                            </span>
                        ))}
                    </div>
                    <div style={label}>COMPLETED COURSEWORK</div>
                    <Row items={group("done")} />
                    <div style={label}>IN PROGRESS · FALL 2026</div>
                    <Row items={group("in-progress")} />
                </div>
            </div>
        </section>
    );
}
