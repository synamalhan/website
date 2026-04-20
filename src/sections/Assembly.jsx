import { forwardRef, useState, useCallback } from "react";
import { useTheme } from "../theme/ThemeContext";
import { FONTS } from "../components/styles";
import { useIsMobile } from "../hooks/useMediaQuery";
import MetallicEarth3D from "../components/MetallicEarth3D";
import Label from "../components/ui/Label";
import H2 from "../components/ui/H2";
import { PIECES } from "../data/pieces";
import { EARTH_FACTS } from "../data/earthFacts";

const Assembly = forwardRef(function Assembly({ prog, inAssembly }, ref) {
    const { theme: t } = useTheme();
    const isMobile = useIsMobile();
    const [hoveredNode, setHoveredNode] = useState(null);
    const [clickedNode, setClickedNode] = useState(null);

    const activeNode = clickedNode ?? hoveredNode;
    const activeFact = activeNode !== null ? EARTH_FACTS[activeNode] : null;

    const onNodeHover = useCallback((idx) => {
        setHoveredNode(idx);
        if (idx === null) setClickedNode(null);
    }, []);

    const onNodeClick = useCallback((idx) => {
        setClickedNode(prev => prev === idx ? null : idx);
    }, []);

    return (
        <>
            {/* Scroll anchor wrapper with sticky inner content */}
            <div id="globe" ref={ref} style={{
                height: "100vh", position: "relative", zIndex: 1,
                background: prog < 1 ? t.bg : "transparent"
            }}>
                {/* Sticky fullscreen overlay */}
                <div style={{
                    position: "sticky", top: 0, height: "100vh", width: "100%", zIndex: 5,
                    pointerEvents: inAssembly ? "auto" : "none",
                    opacity: inAssembly ? 1 : 0,
                    transition: "opacity .5s",
                    overflow: "hidden"
                }}>
                    <MetallicEarth3D
                        progress={prog}
                        t={t}
                        onNodeHover={onNodeHover}
                        onNodeClick={onNodeClick}
                        hoveredNode={activeNode}
                    />

                    {/* Meta Panel (Bio & Progress) */}
                    <div style={{ 
                        position: "absolute", 
                        left: isMobile ? 24 : 52, 
                        right: isMobile ? 24 : "auto",
                        top: isMobile ? 80 : "50%", 
                        transform: isMobile ? "none" : "translateY(-50%)", 
                        zIndex: 10, 
                        maxWidth: isMobile ? "none" : 260, 
                        pointerEvents: "none" 
                    }}>
                        <Label>// Model Assembly</Label>
                        <H2 style={{ fontSize: isMobile ? "1.8rem" : "clamp(1.5rem,3vw,2.4rem)", marginBottom: isMobile ? 8 : 16 }}>
                            {isMobile ? "PIECE BY PIECE" : <>PIECE<br />BY<br />PIECE</>}
                        </H2>
                        
                        {!isMobile && (
                            <p style={{ fontSize: ".85rem", lineHeight: 1.85, color: t.textMute, fontWeight: 300, marginBottom: 20 }}>
                                A Metal Earth globe — each stamped steel panel flies in and locks into place as you scroll.
                            </p>
                        )}

                        <div style={{ display: "flex", flexDirection: isMobile ? "row" : "column", alignItems: isMobile ? "center" : "flex-start", gap: isMobile ? 12 : 0 }}>
                            <div style={{ ...FONTS.mono, fontSize: isMobile ? ".55rem" : ".6rem", letterSpacing: ".2em", color: t.cyan, marginBottom: isMobile ? 0 : 6 }}>
                                {Math.round(prog * 100)}% ASSEMBLED
                            </div>
                            <div style={{ flex: 1, height: 2, background: t.border, borderRadius: 2, width: isMobile ? "auto" : "100%" }}>
                                <div style={{
                                    height: "100%", width: `${prog * 100}%`,
                                    background: `linear-gradient(90deg,${t.accent},${t.cyan})`,
                                    borderRadius: 2, boxShadow: `0 0 8px ${t.cyanGlow}`, transition: "width .06s"
                                }} />
                            </div>
                        </div>

                        {/* Node fact tooltip */}
                        {activeFact && (
                            <div style={{
                                marginTop: isMobile ? 16 : 24, padding: isMobile ? "12px 16px" : "14px 18px",
                                background: t.cardBg, border: `1px solid ${t.cyan}`,
                                borderRadius: isMobile ? 8 : 4, backdropFilter: "blur(12px)",
                                animation: "fadeUp .3s ease-out",
                                pointerEvents: "none",
                            }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                    <div style={{ fontSize: isMobile ? "1.2rem" : "1.4rem" }}>{activeFact.icon}</div>
                                    <div>
                                        <div style={{ ...FONTS.mono, fontSize: ".55rem", letterSpacing: ".12em", color: t.cyan, marginBottom: 2, textTransform: "uppercase" }}>
                                            Fact #{(activeNode ?? 0) + 1}
                                        </div>
                                        <div style={{ fontSize: isMobile ? ".75rem" : ".8rem", lineHeight: 1.6, color: t.text }}>
                                            {activeFact.fact}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Desktop Checklist (hidden on mobile) */}
                    {!isMobile && (
                        <div style={{ position: "absolute", right: 44, top: "50%", transform: "translateY(-50%)", zIndex: 10, display: "flex", flexDirection: "column", gap: 8, pointerEvents: "none" }}>
                            {PIECES.map((lbl, i) => {
                                const done = prog > (i + 1) / 12, active = !done && prog > i / 12;
                                return (
                                    <div key={lbl} style={{
                                        display: "flex", alignItems: "center", gap: 8, ...FONTS.mono, fontSize: ".54rem",
                                        letterSpacing: ".14em", color: done ? t.accent : active ? t.cyan : t.textMute + "66", transition: "color .4s"
                                    }}>
                                        <div style={{
                                            width: 5, height: 5, borderRadius: "50%", background: "currentColor", flexShrink: 0,
                                            boxShadow: active ? `0 0 8px ${t.cyan}` : done ? `0 0 5px ${t.accent}` : "none",
                                            animation: active ? "pulse 1s ease-in-out infinite" : "none"
                                        }} />
                                        {done ? "✓ " : active ? "▶ " : ""}{lbl}
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Watermark (simplified on mobile) */}
                    {!isMobile && (
                        <div style={{
                            position: "absolute", top: 85, left: "50%", transform: "translateX(-50%)", ...FONTS.mono,
                            fontSize: ".56rem", letterSpacing: ".45em", color: t.textMute, opacity: .35, pointerEvents: "none", whiteSpace: "nowrap"
                        }}>
              // METAL EARTH · GLOBE //
                        </div>
                    )}

                    {/* Nudge */}
                    {prog < .04 && (
                        <div className="float-y" style={{
                            position: "absolute", bottom: isMobile ? 32 : 46, left: "50%", transform: "translateX(-50%)",
                            ...FONTS.mono, fontSize: ".56rem", letterSpacing: ".3em", color: t.textMute, textAlign: "center", pointerEvents: "none",
                            width: "100%"
                        }}>
                            ↓ {isMobile ? "SWIPE" : "SCROLL"} TO ASSEMBLE
                        </div>
                    )}

                    {/* Node hint */}
                    {prog > 0.6 && !activeFact && (
                        <div style={{
                            position: "absolute", bottom: isMobile ? 80 : 100, left: "50%", transform: "translateX(-50%)",
                            ...FONTS.mono, fontSize: ".5rem", letterSpacing: ".25em", color: t.textMute, opacity: 0.5,
                            pointerEvents: "none", textAlign: "center", width: "100%"
                        }}>
                            {isMobile ? "TAP A DATA NODE" : "CLICK A DATA NODE TO DISCOVER A FACT"}
                        </div>
                    )}

                    {/* Complete badge */}
                    {prog >= .98 && (
                        <div style={{
                            position: "absolute", bottom: isMobile ? 40 : 52, left: "50%", transform: "translateX(-50%)", ...FONTS.mono,
                            fontSize: isMobile ? ".55rem" : ".65rem", letterSpacing: ".32em", color: t.cyan, textAlign: "center", pointerEvents: "none",
                            border: `1px solid ${t.cyanGlow}`, padding: isMobile ? "7px 16px" : "9px 22px", background: t.surface,
                            animation: "completeAnim 2s ease-in-out infinite", width: isMobile ? "80%" : "auto"
                        }}>
                            ✦ ASSEMBLY COMPLETE
                        </div>
                    )}
                </div>
            </div>
        </>
    );
});

export default Assembly;
