import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { profile } from "../data/portfolio";
import { useTheme } from "../theme/ThemeContext";
import { FONTS } from "../components/styles";
import { useIsMobile } from "../hooks/useMediaQuery";
import H2 from "../components/ui/H2";
import Guestbook from "./Guestbook";

export default function Contact() {
    const { theme: t } = useTheme();
    const isMobile = useIsMobile();
    const { email, linkedin, github } = profile.links;
    const links = [
        { icon: <FaLinkedin aria-hidden="true" />, text: "LinkedIn", href: linkedin },
        { icon: <FaGithub aria-hidden="true" />, text: "GitHub", href: github },
    ];
    return (
        <section id="contact" style={{ padding: isMobile ? "60px 24px 80px" : "80px 24px 120px", position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto", textAlign: "center", color: t.text }}>
            <H2 style={{ textAlign: "center", fontSize: isMobile ? "2.5rem" : "3.5rem" }}>LET'S CONNECT</H2>
            <p style={{ fontSize: "1.1rem", lineHeight: 1.7, color: t.textMute, margin: "8px auto 32px", maxWidth: "50ch" }}>
                I'm looking for ML, AI and software engineering new-grad roles. The fastest way to reach me is email.
            </p>
            <a href={`mailto:${email}`} style={{
                display: "inline-flex", alignItems: "center", gap: 12, padding: "16px 28px", borderRadius: 14, textDecoration: "none",
                background: t.accent, color: t.onAccent, ...FONTS.mono, fontSize: "1rem", letterSpacing: ".06em", boxShadow: `0 10px 28px ${t.accent}44`,
            }}><FaEnvelope aria-hidden="true" /> {email}</a>
            <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap", marginTop: 22 }}>
                {links.map(l => (
                    <a key={l.text} href={l.href} target="_blank" rel="noopener noreferrer" style={{
                        display: "inline-flex", alignItems: "center", gap: 10, padding: "12px 20px", borderRadius: 12, textDecoration: "none",
                        color: t.textHi, border: `1px solid ${t.borderHi}`, ...FONTS.inter, fontSize: "1rem",
                    }}>{l.icon} {l.text}</a>
                ))}
            </div>
            <Guestbook />
        </section>
    );
}
