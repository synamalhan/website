import { useTheme } from "../theme/ThemeContext";
import { FONTS } from "../components/styles";
import { useIsMobile } from "../hooks/useMediaQuery";
import H2 from "../components/ui/H2";
import Label from "../components/ui/Label";
import { internshipWork } from "../data/portfolio";
import { EXPERIENCES } from "../data/experience";

const companies = EXPERIENCES.filter(e => internshipWork.some(w => w.experienceId === e.id))
    .sort((a, b) => (b.id === "micron-technology") - (a.id === "micron-technology")); // strongest first

export default function Internships() {
    const { theme: t } = useTheme();
    const isMobile = useIsMobile();
    // One colour per company, so each internship reads as its own block.
    const palette = [t.accent, t.cyan, t.gold, t.magenta, t.green];
    return (
        <section id="internships" style={{ padding: isMobile ? "60px 20px" : "100px 24px", position: "relative", zIndex: 10 }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <Label>// Internships</Label>
                <H2>INTERNSHIP WORK</H2>
                <p style={{ color: t.textMute, fontSize: "1.05rem", maxWidth: "60ch", margin: "0 0 36px" }}>
                    Work from my internships, described by the kind of problem, my part and the tools. Company internals stay private.
                </p>
                {companies.map((c, ci) => { const color = palette[ci % palette.length]; return (
                    <div key={c.id} style={{ marginBottom: 36 }}>
                        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "baseline", marginBottom: 14 }}>
                            <h3 style={{ ...FONTS.orb, fontSize: "1.3rem", color }}>{c.company}</h3>
                            <span style={{ ...FONTS.mono, fontSize: ".8rem", letterSpacing: ".08em", color: t.textMute }}>{c.role} · {c.years}</span>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "minmax(0,1fr)" : "repeat(auto-fill, minmax(340px, 1fr))", gap: 14 }}>
                            {internshipWork.filter(w => w.experienceId === c.id).map(w => (
                                <details key={w.id} className="hover-card" style={{ background: t.surface, border: `1px solid ${t.border}`, borderLeft: `5px solid ${color}`, borderRadius: 14, padding: "16px 18px" }}>
                                    <summary style={{ cursor: "pointer", listStyle: "none" }}>
                                        <div style={{ ...FONTS.inter, fontWeight: 600, fontSize: "1.05rem", color: t.textHi }}>{w.title} <span aria-hidden="true" style={{ color }}>+</span></div>
                                        <div style={{ ...FONTS.mono, fontSize: ".75rem", letterSpacing: ".06em", color, margin: "6px 0 10px" }}>{w.problemType.toUpperCase()}</div>
                                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{w.tools.map(x => <span key={x} style={{ ...FONTS.mono, fontSize: ".75rem", letterSpacing: ".06em", padding: "5px 11px", borderRadius: 4, color, border: `1px solid ${color}`, background: "transparent", textTransform: "uppercase" }}>{x}</span>)}</div>
                                    </summary>
                                    <div style={{ marginTop: 14, display: "grid", gap: 10, fontSize: ".98rem", lineHeight: 1.6, color: t.text }}>
                                        <div><strong style={{ color: t.textHi }}>My part. </strong>{w.role}</div>
                                        <div><strong style={{ color: t.textHi }}>Impact. </strong>{w.impact}</div>
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>
                ); })}
            </div>
        </section>
    );
}
