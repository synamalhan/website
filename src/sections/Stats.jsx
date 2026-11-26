import { forwardRef } from "react";
import { useTheme } from "../theme/ThemeContext";
import { FONTS } from "../components/styles";
import { useIsMobile } from "../hooks/useMediaQuery";
import { yearsSinceFirstRole } from "../data/portfolio";

// Professional numbers live right under the hero, not buried among the hobbies. `ref` drives the count-up in useHomeScroll.
const Stats = forwardRef(function Stats({ counts = {} }, ref) {
    const { theme: t } = useTheme();
    const isMobile = useIsMobile();
    const items = [[counts.p, "Projects built"], [counts.a, "iOS apps"], [counts.m, "ML & vision"], [yearsSinceFirstRole(), "Years experience"]];
    return (
        <section ref={ref} style={{ position: "relative", zIndex: 10, padding: isMobile ? "0 20px 20px" : "0 24px 40px" }}>
            <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: `repeat(${isMobile ? 2 : 4}, 1fr)`, gap: 24, padding: "24px 0", borderTop: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}` }}>
                {items.map(([n, label]) => (
                    <div key={label} style={{ textAlign: "center" }}>
                        <div style={{ ...FONTS.orb, fontWeight: 900, fontSize: isMobile ? "2rem" : "2.6rem", color: t.textHi }}>{n || 0}</div>
                        <div style={{ ...FONTS.mono, fontSize: "0.87rem", letterSpacing: ".14em", color: t.textMute, textTransform: "uppercase", marginTop: 4 }}>{label}</div>
                    </div>
                ))}
            </div>
        </section>
    );
});
export default Stats;
