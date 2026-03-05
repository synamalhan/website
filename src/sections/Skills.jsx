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
                <H2 style={{ textAlign: "center" }}>SYNAPTIC<br />ARCHITECTURE</H2>
                <p style={{ ...FONTS.mono, fontSize: ".6rem", color: t.textMute, letterSpacing: ".22em", marginTop: 6 }}>HOVER TO ACTIVATE</p>
            </div>
            <NeuralCanvas t={t} />
        </section>
    );
}
