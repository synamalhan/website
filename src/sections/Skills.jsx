import { useTheme } from "../theme/ThemeContext";
import { FONTS } from "../components/styles";
import NeuralCanvas from "../components/NeuralCanvas";
import Label from "../components/ui/Label";
import H2 from "../components/ui/H2";

export default function Skills() {
    const { theme: t } = useTheme();
    return (
        <section id="skills" style={{ padding: "clamp(60px, 8vw, 120px) clamp(20px, 5vw, 72px)", position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 52 }}>
                <Label center>// Skills</Label>
                <H2 style={{ textAlign: "center" }}>MY<br />SKILLS</H2>
                <p style={{ ...FONTS.mono, fontSize: ".6rem", color: t.textMute, letterSpacing: ".22em", marginTop: 6 }}>HOVER TO ACTIVATE</p>
            </div>
            <div style={{ background: t.surface, opacity: 0.95, borderRadius: 24, padding: 20, boxShadow: "0 10px 40px rgba(0,0,0,0.1)", border: `2px solid ${t.borderHi}` }}>
                <NeuralCanvas t={t} />
            </div>
        </section>
    );
}
