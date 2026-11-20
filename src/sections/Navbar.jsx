import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../theme/ThemeContext";
import ThemeToggle from "../components/ThemeToggle";
import { FONTS } from "../components/styles";
import { useIsMobile } from "../hooks/useMediaQuery";

// Projects is its own page; everything else is an anchor on the home page.
const NavLink = ({ l, ...p }) => l === "Projects" ? <Link to="/projects" {...p} /> : <a href={`#${l.toLowerCase()}`} {...p} />;

export default function Navbar({ navUp }) {
    const { theme: t, isDark, toggleTheme } = useTheme();
    const isMobile = useIsMobile();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const navLinks = ["About", "Featured", "Experience", "Internships", "Skills", "Education", "Projects", "Contact"];

    return (
        <nav style={{
            position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: isMobile ? "12px 24px" : "16px 56px",
            background: (navUp || (isMobile && isOpen)) ? t.navBg : "transparent",
            backdropFilter: (navUp || (isMobile && isOpen)) ? "blur(14px)" : "none",
            borderBottom: (navUp || (isMobile && isOpen)) ? `1px solid ${t.border}` : "1px solid transparent",
            transition: "all .35s",
        }}>
            <div style={{ ...FONTS.orb, fontWeight: 900, fontSize: isMobile ? "1rem" : "1.2rem", letterSpacing: ".3em", color: t.textHi, position: "relative" }}>
                SY<span style={{ color: t.cyan }}>N</span>A
                <div className="scanbar" style={{
                    position: "absolute", bottom: -3, left: 0, right: 0, height: 1,
                    background: `linear-gradient(90deg,transparent,${t.cyan},transparent)`
                }} />
            </div>

            {/* Desktop Navigation */}
            {!isMobile && (
                <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
                    {navLinks.map(l => (
                        <NavLink key={l} l={l} style={{
                            ...FONTS.mono, fontSize: ".65rem", letterSpacing: ".16em",
                            color: t.textMute, textDecoration: "none", textTransform: "uppercase",
                            transition: "color .2s"
                        }}
                            onMouseEnter={e => e.target.style.color = t.cyan}
                            onMouseLeave={e => e.target.style.color = t.textMute}>
                            {l}
                        </NavLink>
                    ))}
                    <ThemeToggle isDark={isDark} toggle={toggleTheme} t={t} />
                </div>
            )}

            {/* Mobile Navigation Toggle */}
            {isMobile && (
                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                    <ThemeToggle isDark={isDark} toggle={toggleTheme} t={t} />
                    <button 
                        onClick={toggleMenu}
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isOpen}
                        style={{
                            background: "none", border: "none", cursor: "pointer",
                            width: 30, height: 20, position: "relative",
                            display: "flex", flexDirection: "column", justifyContent: "space-between"
                        }}
                    >
                        <div style={{ width: "100%", height: 2, background: t.textHi, transition: ".3s", transform: isOpen ? "translateY(9px) rotate(45deg)" : "none" }} />
                        <div style={{ width: "100%", height: 2, background: t.textHi, transition: ".3s", opacity: isOpen ? 0 : 1 }} />
                        <div style={{ width: "100%", height: 2, background: t.textHi, transition: ".3s", transform: isOpen ? "translateY(-9px) rotate(-45deg)" : "none" }} />
                    </button>
                </div>
            )}

            {/* Mobile Menu Drawer */}
            {isMobile && (
                <div style={{
                    position: "absolute", top: "100%", left: 0, right: 0,
                    background: t.navBg, backdropFilter: "blur(20px)",
                    height: isOpen ? "100vh" : 0, overflow: "hidden",
                    transition: "height .4s cubic-bezier(0.16, 1, 0.3, 1)",
                    display: "flex", flexDirection: "column", alignItems: "center",
                    paddingTop: isOpen ? 60 : 0
                }}>
                    {navLinks.map(l => (
                        <NavLink key={l} l={l}
                            onClick={() => setIsOpen(false)}
                            style={{
                                ...FONTS.orb, fontSize: "1.5rem", letterSpacing: ".1em",
                                color: t.textHi, textDecoration: "none", marginBottom: 32,
                                opacity: isOpen ? 1 : 0, transition: "opacity .3s .1s",
                                textTransform: "uppercase"
                            }}>
                            {l}
                        </NavLink>
                    ))}
                </div>
            )}
        </nav>
    );
}
