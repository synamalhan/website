import { useTheme } from "../theme/ThemeContext";
import { FONTS } from "../components/styles";
import { useIsMobile } from "../hooks/useMediaQuery";

export default function Footer() {
    const { theme: t } = useTheme();
    const isMobile = useIsMobile();

    return (
        <footer style={{
            borderTop: `1px solid ${t.border}`, 
            padding: isMobile ? "24px 20px" : "24px 72px", 
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? 12 : 0,
            justifyContent: isMobile ? "center" : "space-between", 
            alignItems: "center", 
            position: "relative", 
            zIndex: 1
        }}>
            <div style={{ ...FONTS.orb, fontWeight: 900, fontSize: isMobile ? ".7rem" : ".8rem", letterSpacing: ".3em", color: t.textMute }}>SYNA</div>
            <div style={{ ...FONTS.mono, fontSize: "0.87rem", letterSpacing: ".12em", color: t.textMute, textTransform: "uppercase", textAlign: "center" }}>© {new Date().getFullYear()} Syna Malhan</div>
        </footer>
    );
}
