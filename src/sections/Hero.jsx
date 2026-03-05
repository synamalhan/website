import { useTheme } from "../theme/ThemeContext";
import { FONTS } from "../components/styles";
import { useParallax } from "../hooks/useParallax";
import React from "react";
import SplineBlob from "../components/SplineBlob";

export default function Hero() {
    const { theme: t } = useTheme();
    const offset = useParallax(0.15);

    return (
        <section
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "100px 40px 60px",
                position: "relative",
                zIndex: 1,
                overflow: "hidden",
            }}
        >
            <SplineBlob />
            {/* Subtitle */}
            <p
                style={{
                    ...FONTS.mono,
                    fontSize: ".58rem",
                    letterSpacing: ".6em",
                    color: t.textMute,
                    textTransform: "uppercase",
                    marginBottom: 20,
                    opacity: 0.6,
                    transform: `translateY(${-offset * 0.2}px)`,
                    position: "relative",
                    zIndex: 2,
                }}
            >
                engineer · iOS developer · builder · explorer
            </p>

            {/* Main title */}
            <h1
                className="glitch"
                data-text="SYNA"
                style={{
                    ...FONTS.orb,
                    fontWeight: 900,
                    fontSize: "clamp(5rem, 14vw, 10rem)",
                    lineHeight: 0.85,
                    color: t.textHi,
                    textShadow: `0 0 60px ${t.accentGlow}, 0 0 120px ${t.accentGlow}44`,
                    marginBottom: 0,
                    letterSpacing: ".08em",
                    transform: `translateY(${-offset * 0.1}px)`,
                    position: "relative",
                    zIndex: 2,
                }}
            >
                SYNA
            </h1>

            {/* Thin rule */}
            <div
                style={{
                    width: 60,
                    height: 1,
                    margin: "28px auto",
                    background: `linear-gradient(90deg, transparent, ${t.accent}, transparent)`,
                }}
            />

            {/* Tagline */}
            <p
                style={{
                    maxWidth: 480,
                    fontSize: ".88rem",
                    fontWeight: 300,
                    lineHeight: 1.95,
                    color: t.textMute,
                    marginBottom: 48,
                    letterSpacing: ".03em",
                    transform: `translateY(${offset * 0.05}px)`,
                    position: "relative",
                    zIndex: 2,
                }}
            >
                Crafting intelligent systems at the intersection of{" "}
                <span style={{ color: t.cyan, fontWeight: 400 }}>machine learning</span>,{" "}
                <span style={{ color: t.accent, fontWeight: 400 }}>iOS development</span>, and{" "}
                <span style={{ color: t.magenta, fontWeight: 400 }}>full-stack engineering</span>.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: "flex", gap: 40, alignItems: "center", marginBottom: 48, position: "relative", zIndex: 2 }}>
                <a
                    href="#projects"
                    style={{
                        ...FONTS.mono,
                        fontSize: ".6rem",
                        letterSpacing: ".25em",
                        color: t.textMute,
                        textDecoration: "none",
                        textTransform: "uppercase",
                        position: "relative",
                        paddingBottom: 4,
                        transition: "color .2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = t.cyan)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = t.textMute)}
                >
                    View Work
                </a>
                <span style={{ width: 1, height: 14, background: t.border }} />
                <a
                    href="#contact"
                    style={{
                        ...FONTS.mono,
                        fontSize: ".6rem",
                        letterSpacing: ".25em",
                        color: t.textMute,
                        textDecoration: "none",
                        textTransform: "uppercase",
                        position: "relative",
                        paddingBottom: 4,
                        transition: "color .2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = t.accent)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = t.textMute)}
                >
                    Connect
                </a>
            </div>

            {/* Scroll indicator */}
            <div
                style={{
                    position: "absolute",
                    bottom: 36,
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 8,
                    opacity: 0.35,
                }}
            >
                <div
                    style={{
                        width: 1,
                        height: 32,
                        background: `linear-gradient(to bottom, ${t.textMute}, transparent)`,
                        animation: "pulse 2.5s ease-in-out infinite",
                    }}
                />
                <div style={{ ...FONTS.mono, fontSize: ".45rem", letterSpacing: ".35em", color: t.textMute }}>
                    SCROLL
                </div>
            </div>
        </section>
    );
}