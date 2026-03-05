import { useTheme } from "../theme/ThemeContext";
import Waveform from "../components/Waveform";

export default function WaveformSection() {
    const { theme: t } = useTheme();
    return (
        <section style={{ padding: "clamp(30px, 4vw, 50px) clamp(20px, 5vw, 72px)", position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ border: `1px solid ${t.border}`, padding: "18px 0", background: t.surface + "88", backdropFilter: "blur(6px)", borderRadius: 2 }}>
                <Waveform t={t} />
            </div>
        </section>
    );
}
