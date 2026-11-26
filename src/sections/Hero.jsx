import { useTheme } from "../theme/ThemeContext";
import { FONTS } from "../components/styles";
import TechText from "../components/TechText";
import { useIsMobile } from "../hooks/useMediaQuery";
import resumeUrl from "../assets/SYNA_MALHAN.pdf";

const Btn = ({ shadow, t, isMobile, ...p }) => (
    <a {...p} style={{
        ...FONTS.mono, fontSize: isMobile ? ".8rem" : ".85rem", letterSpacing: ".14em", textTransform: "uppercase", textDecoration: "none",
        padding: isMobile ? "13px 20px" : "15px 26px", borderRadius: 999, transition: "transform .2s",
        background: "transparent", color: t.textHi, border: `1px solid ${t.borderHi}`, fontWeight: 500, boxShadow: `3px 3px 0 ${shadow}`,
    }} onMouseEnter={e => e.currentTarget.style.transform = "translate(-2px,-2px)"} onMouseLeave={e => e.currentTarget.style.transform = ""} />
);

export default function Hero() {
    const { theme: t } = useTheme();
    const isMobile = useIsMobile();
    return (
        <section style={{
            minHeight: "100svh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
            textAlign: "center", padding: isMobile ? "88px 24px 72px" : "110px 32px 80px", position: "relative", zIndex: 1,
        }}>
            <h1 aria-label="SYNA" style={{ margin: 0, width: "100%", maxWidth: 900, height: isMobile ? 130 : 200 }}>
                <TechText text="SYNA" fontFamily="Bricolage Grotesque, sans-serif" fontWeight={800} fontSize={isMobile ? 110 : 190} letterSpacing={0.08}
                    color={t.textHi} accentColor={t.accent} accentColors={[t.cyan, t.accent, t.gold, t.magenta]} align="center" reveal="letter" clickKick />
            </h1>
            <p style={{ ...FONTS.inter, fontSize: isMobile ? "1.1rem" : "1.45rem", fontWeight: 700, lineHeight: 1.5, color: t.textHi, margin: "28px 0 36px" }}>
                BS Computer Science @ ASU · Data Science minor · Graduating May 2027<br />
                <span style={{ color: t.accent }}>Looking for ML / AI / SWE new-grad roles</span>
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
                <Btn shadow={t.cyan} t={t} isMobile={isMobile} href="#featured">See my work</Btn>
                <Btn shadow={t.gold} t={t} isMobile={isMobile} href={resumeUrl} download="Syna_Malhan_Resume.pdf">Resume</Btn>
                <Btn shadow={t.magenta} t={t} isMobile={isMobile} href={`${import.meta.env.BASE_URL}contact`}>Contact</Btn>
            </div>
        </section>
    );
}
