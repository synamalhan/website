import { useTheme } from "../theme/ThemeContext";
import { FONTS } from "../components/styles";
import { useParallax } from "../hooks/useParallax";
import { useIsMobile } from "../hooks/useMediaQuery";
import React, { lazy, Suspense, useState } from "react";
import { ClientOnly } from "vite-react-ssg";
import { useMediaQuery } from "../hooks/useMediaQuery";
import HeroHighlights from "./HeroHighlights";
const MetalOrca3D = lazy(() => import("../components/MetalOrca3D"));
import resumeUrl from "../assets/SYNA_MALHAN.pdf";

function ResumeButton({ accent, isMobile, t }) {
    const [hovered, setHovered] = useState(false);

    return (
        <a
            href={resumeUrl}
            download
            aria-label="Download resume"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocus={() => setHovered(true)}
            onBlur={() => setHovered(false)}
            style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                padding: isMobile ? "14px 24px" : "16px 30px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.9)",
                background: accent,
                color: t.onAccent,
                boxShadow: hovered ? `0 18px 45px ${accent}44` : `0 12px 30px ${accent}30`,
                transform: hovered ? "translateY(-3px) scale(1.01)" : "translateY(0) scale(1)",
                transition: "transform 0.25s ease, box-shadow 0.25s ease, filter 0.25s ease",
                textDecoration: "none",
                fontWeight: 800,
                fontSize: isMobile ? "0.8rem" : "0.9rem",
                letterSpacing: ".22em",
                ...FONTS.mono,
                textTransform: "uppercase",
                width: isMobile ? "100%" : "auto",
                maxWidth: isMobile ? 360 : 320,
                filter: hovered ? "brightness(1.04)" : "brightness(1)",
                marginBottom: isMobile ? 24 : 32,
            }}
        >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 3v12" />
                <path d="m7 10 5 5 5-5" />
                <path d="M5 20h14" />
            </svg>
            <span>Download Resume</span>
        </a>
    );
}

export default function Hero() {
    const { theme: t } = useTheme();
    const offset = useParallax(0.15);
    const isMobile = useIsMobile();
    const wide = useMediaQuery("(min-width: 1100px)"); // orca only where it fits beside the centred text
    const [exploded, setExploded] = useState(false);
    const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return (
        <section
            style={{
                minHeight: "100svh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: wide ? "left" : "center",
                padding: isMobile ? "88px 24px 72px" : "110px 32px 80px",
                position: "relative",
                zIndex: 1,
                overflow: "hidden",
            }}
        >
            <style>{`
                @keyframes floatSoft {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-6px); }
                }
                @keyframes pulseGlow {
                    0%, 100% { opacity: 0.55; transform: translateY(0); }
                    50% { opacity: 0.9; transform: translateY(4px); }
                }
            `}</style>

            <div
                style={{
                    position: "relative",
                    zIndex: 2,
                    width: "100%",
                    maxWidth: 1280,
                    display: "flex",
                    flexDirection: wide ? "row" : "column",
                    gap: wide ? 48 : isMobile ? 24 : 32,
                    alignItems: "center",
                }}
            >
                <div style={{ flex: wide ? "1 1 55%" : undefined, minWidth: 0, width: "100%" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: wide ? "flex-start" : "center", justifyContent: "center", width: "100%", order: 0 }}>
                    <p
                        style={{
                            ...FONTS.mono,
                            fontSize: isMobile ? ".52rem" : ".6rem",
                            letterSpacing: isMobile ? ".38em" : ".48em",
                            color: t.textMute,
                            textTransform: "uppercase",
                            margin: "0 0 16px",
                            opacity: 0.82,
                            transform: `translateY(${-offset * 0.2}px)`,
                            position: "relative",
                            zIndex: 2,
                        }}
                    >
                        engineer · creator · builder · explorer
                    </p>

                    <h1
                        className="glitch"
                        data-text="SYNA"
                        style={{
                            ...FONTS.orb,
                            fontWeight: 900,
                            fontSize: isMobile ? "clamp(4rem, 18vw, 6.2rem)" : "clamp(5.2rem, 11vw, 8.8rem)",
                            lineHeight: 0.84,
                            color: t.textHi,
                            textShadow: `0 0 62px ${t.accentGlow}, 4px 4px 0px ${t.accent}`,
                            margin: 0,
                            letterSpacing: ".08em",
                            transform: `translateY(${-offset * 0.1}px)`,
                            position: "relative",
                            zIndex: 2,
                        }}
                    >
                        SYNA
                    </h1>

                    <div
                        style={{
                            width: 80,
                            height: 2,
                            margin: wide ? "26px 0 22px" : isMobile ? "20px auto 18px" : "26px auto 22px",
                            background: `linear-gradient(90deg, transparent, ${t.accent}, transparent)`,
                            borderRadius: 2,
                            boxShadow: `0 0 18px ${t.accentGlow}`,
                        }}
                    />

                    <p
                        style={{
                            maxWidth: isMobile ? 560 : 620,
                            fontSize: isMobile ? ".82rem" : ".95rem",
                            fontWeight: 400,
                            lineHeight: 1.7,
                            color: t.textMute,
                            margin: isMobile ? "0 0 26px" : "0 0 28px",
                            letterSpacing: ".03em",
                            transform: `translateY(${offset * 0.05}px)`,
                            position: "relative",
                            zIndex: 2,
                            whiteSpace: isMobile ? "normal" : "normal",
                        }}
                    >
                        Crafting intelligent systems at the intersection of{" "}
                        <span style={{ color: t.cyan, fontWeight: 700 }}>machine learning</span>,{" "}
                        <span style={{ color: t.accent, fontWeight: 700 }}>iOS development</span>, and{" "}
                        <span style={{ color: t.gold, fontWeight: 700 }}>creative design</span>.
                    </p>

                    <p style={{ ...FONTS.mono, fontSize: isMobile ? ".62rem" : ".7rem", letterSpacing: ".12em", color: t.textHi, margin: "0 0 22px", position: "relative", zIndex: 2, textTransform: "uppercase" }}>
                        BS Computer Science @ ASU · Data Science minor · Class of 2027 · Seeking ML/AI/SWE new-grad roles
                    </p>

                    <ResumeButton accent={t.accent} isMobile={isMobile} t={t} />

                    <div
                        style={{
                            display: "flex",
                            gap: isMobile ? 10 : 16,
                            alignItems: "center",
                            flexWrap: "wrap",
                            justifyContent: wide ? "flex-start" : "center",
                            position: "relative",
                            zIndex: 2,
                        }}
                    >
                        {[
                            { label: "View Work", link: "#projects", color: t.cyan },
                            { label: "Experience", link: "#experience", color: t.magenta },
                            { label: "Connect", link: "#contact", color: t.accent },
                        ].map((btn, index) => (
                            <a
                                key={index}
                                href={btn.link}
                                style={{
                                    ...FONTS.mono,
                                    fontSize: isMobile ? ".54rem" : ".62rem",
                                    letterSpacing: ".24em",
                                    color: t.textHi,
                                    background: "transparent",
                                    padding: isMobile ? "9px 13px" : "10px 16px",
                                    border: `1px solid rgba(255,255,255,0.86)`,
                                    borderRadius: "999px",
                                    boxShadow: `2px 2px 0px ${btn.color}`,
                                    textDecoration: "none",
                                    textTransform: "uppercase",
                                    transition: "all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = "translate(-2px, -2px)";
                                    e.currentTarget.style.boxShadow = `4px 4px 0px ${btn.color}`;
                                    e.currentTarget.style.borderColor = btn.color;
                                    e.currentTarget.style.background = `${btn.color}12`;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = "translate(0, 0)";
                                    e.currentTarget.style.boxShadow = `2px 2px 0px ${btn.color}`;
                                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.86)";
                                    e.currentTarget.style.background = "transparent";
                                }}
                            >
                                {btn.label}
                            </a>
                        ))}
                    </div>
                </div>

                <HeroHighlights left={wide} />
                </div>
                {wide && (
                    <div style={{ flex: "1 1 45%", minWidth: 0, textAlign: "center" }}>
                        <p style={{ color: t.textMute, fontSize: ".9rem", lineHeight: 1.6, maxWidth: "40ch", margin: "0 auto 8px" }}>
                            I build Metal Earth kits and I think best near the ocean. So here is an orca on a wave, in the style of a Metal Earth kit.
                        </p>
                        <div style={{ height: 460 }}>
                            <ClientOnly>{() => <Suspense fallback={null}><MetalOrca3D exploded={exploded} reduced={reduced} rotate /></Suspense>}</ClientOnly>
                        </div>
                        <button type="button" onClick={() => setExploded(e => !e)} aria-pressed={exploded} style={{
                            ...FONTS.mono, fontSize: ".85rem", letterSpacing: ".14em", padding: "12px 22px", cursor: "pointer", borderRadius: 10,
                            background: "transparent", color: t.textHi, border: `1px solid ${t.borderHi}`,
                        }}>{exploded ? "ASSEMBLE" : "EXPLODE VIEW"}</button>
                        <div style={{ ...FONTS.mono, fontSize: ".75rem", letterSpacing: ".14em", color: t.textMute, marginTop: 14 }}>DRAG TO ROTATE</div>
                    </div>
                )}
            </div>
        </section>
    );
}