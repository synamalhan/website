import { Link } from "react-router-dom";
import { useTheme } from "../theme/ThemeContext";
import ThemeToggle from "./ThemeToggle";
import { FONTS } from "./styles";
import { useIsMobile } from "../hooks/useMediaQuery";

// Slim sticky bar for sub-pages (case studies, archive).
export default function PageNav({ current }) {
    const { theme: t, isDark, toggleTheme } = useTheme();
    const isMobile = useIsMobile();
    const link = (active) => ({ ...FONTS.mono, fontSize: ".8rem", letterSpacing: ".14em", textDecoration: "none", color: active ? t.textHi : t.textMute, textTransform: "uppercase" });
    return (
        <nav aria-label="Site" style={{ position: "sticky", top: 0, zIndex: 50, background: t.navBg, backdropFilter: "blur(14px)", borderBottom: `1px solid ${t.border}` }}>
            <div style={{ maxWidth: 1100, margin: "0 auto", padding: "14px 20px", display: "flex", alignItems: "center", gap: isMobile ? 14 : 24 }}>
                <Link to="/" style={{ ...FONTS.orb, fontWeight: 900, letterSpacing: ".3em", color: t.textHi, textDecoration: "none", marginRight: "auto" }}>SYNA</Link>
                {!isMobile && <Link to="/#featured" style={link(current === "featured")}>Featured</Link>}
                <Link to="/projects" style={link(current === "projects")} aria-current={current === "projects" ? "page" : undefined}>{isMobile ? "Projects" : "All projects"}</Link>
                <ThemeToggle isDark={isDark} toggle={toggleTheme} t={t} />
            </div>
        </nav>
    );
}
