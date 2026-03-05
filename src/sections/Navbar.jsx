import { useTheme } from "../theme/ThemeContext";
import ThemeToggle from "../components/ThemeToggle";
import { FONTS } from "../components/styles";

export default function Navbar({ navUp }) {
    const { theme: t, isDark, toggleTheme } = useTheme();
    return (
        <nav style={{
            position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "16px 56px",
            background: navUp ? t.navBg : "transparent",
            backdropFilter: navUp ? "blur(14px)" : "none",
            borderBottom: navUp ? `1px solid ${t.border}` : "1px solid transparent",
            transition: "all .35s",
        }}>
            <div style={{ ...FONTS.orb, fontWeight: 900, fontSize: "1.2rem", letterSpacing: ".3em", color: t.textHi, position: "relative" }}>
                SY<span style={{ color: t.cyan }}>N</span>A
                <div className="scanbar" style={{
                    position: "absolute", bottom: -3, left: 0, right: 0, height: 1,
                    background: `linear-gradient(90deg,transparent,${t.cyan},transparent)`
                }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
                {["About", "Skills", "Projects", "Notes", "Contact"].map(l => (
                    <a key={l} href={`#${l.toLowerCase()}`} style={{
                        ...FONTS.mono, fontSize: ".65rem", letterSpacing: ".16em",
                        color: t.textMute, textDecoration: "none", textTransform: "uppercase",
                        transition: "color .2s"
                    }}
                        onMouseEnter={e => e.target.style.color = t.cyan}
                        onMouseLeave={e => e.target.style.color = t.textMute}>
                        {l}
                    </a>
                ))}
                <ThemeToggle isDark={isDark} toggle={toggleTheme} t={t} />
            </div>
        </nav>
    );
}
