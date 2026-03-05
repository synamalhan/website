import { useTheme } from "../theme/ThemeContext";
import { FONTS } from "../components/styles";

export default function Footer() {
    const { theme: t } = useTheme();
    return (
        <footer style={{
            borderTop: `1px solid ${t.border}`, padding: "24px 72px", display: "flex",
            justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 1
        }}>
            <div style={{ ...FONTS.orb, fontWeight: 900, fontSize: ".8rem", letterSpacing: ".3em", color: t.textMute }}>SYNA</div>
            <div style={{ ...FONTS.mono, fontSize: ".54rem", letterSpacing: ".18em", color: t.textMute, opacity: .5, textTransform: "uppercase" }}>© 2025 cyber-metal ocean</div>
            <div style={{ display: "flex", alignItems: "center", gap: 7, ...FONTS.mono, fontSize: ".54rem", letterSpacing: ".16em", color: t.textMute, textTransform: "uppercase" }}>
                <div style={{ width: 6, height: 6, background: "#22c55e", borderRadius: "50%", boxShadow: "0 0 7px #22c55e", animation: "pulse 2s ease-in-out infinite" }} />
                online
            </div>
        </footer>
    );
}
