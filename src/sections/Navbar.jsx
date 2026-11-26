import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../theme/ThemeContext";
import ThemeToggle from "../components/ThemeToggle";
import { FONTS } from "../components/styles";
import { useIsMobile } from "../hooks/useMediaQuery";
import { projects, profile } from "../data/portfolio";
import { EXPERIENCES } from "../data/experience";
import { catColor } from "../components/ProjectCover";

const PAGES = { Work: "/projects", Experience: "/experience", About: "/about", Contact: "/contact" };
const NavLink = ({ l, ...p }) => <Link to={PAGES[l]} {...p} />;

// Hover preview: a small card of what is on the page, built from the same data the page uses.
function Preview({ l, t }) {
    const feat = projects.filter(p => p.featured).sort((a, b) => a.featuredRank - b.featuredRank).slice(0, 4);
    const eyebrow = { ...FONTS.mono, fontSize: "0.85rem", letterSpacing: ".14em", color: t.textMute, marginBottom: 8 };
    const row = { ...FONTS.inter, fontSize: ".85rem", color: t.textHi, display: "flex", alignItems: "center", gap: 8, marginBottom: 6 };
    const dot = c => <span style={{ width: 8, height: 8, borderRadius: 4, background: c, flexShrink: 0 }} />;
    const body = {
        Work: <><div style={eyebrow}>{projects.length} PROJECTS · FEATURED</div>{feat.map(p => <div key={p.id} style={row}>{dot(catColor(t, p.category))}{p.title}</div>)}</>,
        Experience: <><div style={eyebrow}>{EXPERIENCES.length} ROLES · INTERNSHIPS, RESEARCH, TUTORING</div>{EXPERIENCES.slice(0, 4).map(e => <div key={e.id} style={row}>{dot(e.internship ? t.gold : t.cyan)}<span>{e.company}<span style={{ color: t.textMute }}> · {e.role}</span></span></div>)}</>,
        About: <><div style={eyebrow}>ABOUT ME</div><div style={{ ...row, display: "block", lineHeight: 1.5 }}>{profile.degree}, {profile.minor} minor, {profile.school}.</div><div style={{ ...row, display: "block", color: t.textMute, lineHeight: 1.5 }}>Music, books, a metal orca built in three.js.</div></>,
        Contact: <><div style={eyebrow}>LOOKING FOR</div><div style={{ ...row, display: "block", lineHeight: 1.5 }}>{profile.target}</div><div style={{ ...row, color: t.textMute }}>Email · LinkedIn · GitHub · guestbook</div></>,
    }[l];
    return (
        <div role="tooltip" style={{ position: "absolute", top: "100%", [l === "Work" || l === "Experience" ? "left" : "right"]: -16, paddingTop: 18, width: 300, zIndex: 1001 }}>
            <div style={{ padding: "16px 18px", borderRadius: 14, background: t.surface, border: `1px solid ${t.borderHi}`, borderTop: `3px solid ${t.accent}`, boxShadow: "0 18px 40px rgba(0,0,0,.4)", textTransform: "none", letterSpacing: 0 }}>{body}</div>
        </div>
    );
}

export default function Navbar({ navUp }) {
    const { theme: t, isDark, toggleTheme } = useTheme();
    const isMobile = useIsMobile();
    const [isOpen, setIsOpen] = useState(false);
    const [hover, setHover] = useState(null);

    const toggleMenu = () => setIsOpen(!isOpen);

    const navLinks = Object.keys(PAGES);

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
            <Link to="/" aria-label="Home" style={{ ...FONTS.orb, fontWeight: 900, fontSize: isMobile ? "1rem" : "1.2rem", letterSpacing: ".3em", color: t.textHi, position: "relative", textDecoration: "none" }}>
                SY<span style={{ color: t.cyan }}>N</span>A
                <div className="scanbar" style={{
                    position: "absolute", bottom: -3, left: 0, right: 0, height: 1,
                    background: `linear-gradient(90deg,transparent,${t.cyan},transparent)`
                }} />
            </Link>

            {/* Desktop Navigation */}
            {!isMobile && (
                <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
                    {navLinks.map(l => (
                        <div key={l} style={{ position: "relative" }} onMouseEnter={() => setHover(l)} onMouseLeave={() => setHover(null)} onFocus={() => setHover(l)} onBlur={() => setHover(null)}>
                            <NavLink l={l} style={{
                                ...FONTS.mono, fontSize: "0.97rem", letterSpacing: ".12em",
                                color: hover === l ? t.cyan : t.textMute, textDecoration: "none", textTransform: "uppercase",
                                transition: "color .2s"
                            }}>
                                {l}
                            </NavLink>
                            {hover === l && <Preview l={l} t={t} />}
                        </div>
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
