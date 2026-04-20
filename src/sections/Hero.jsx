import { useTheme } from "../theme/ThemeContext";
import { FONTS } from "../components/styles";
import { useParallax } from "../hooks/useParallax";
import { useIsMobile } from "../hooks/useMediaQuery";
import React, { useState } from "react";

export default function Hero() {
    const { theme: t } = useTheme();
    const offset = useParallax(0.15);
    const isMobile = useIsMobile();
    const [hoveredDoodle, setHoveredDoodle] = useState(null);

    const doodles = [
        {
            id: 'star',
            link: '#skills',
            color: t.accent,
            top: isMobile ? '10%' : '25%', left: isMobile ? '10%' : '15%', rot: -15, scale: isMobile ? 0.5 : 0.8,
            svg: <path d="M50 5 L60 40 L95 40 L65 60 L75 95 L50 75 L25 95 L35 60 L5 40 L40 40 Z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round"/>
        },
        {
            id: 'spiral',
            link: '#projects',
            color: t.cyan,
            top: isMobile ? '15%' : '30%', right: isMobile ? '8%' : '18%', rot: 25, scale: isMobile ? 0.6 : 0.9,
            svg: <path d="M50 50 C 50 15, 85 15, 85 50 C 85 85, 15 85, 15 50 C 15 5, 95 5, 95 50" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
        },
        {
            id: 'heart',
            link: '#about',
            color: t.magenta,
            top: isMobile ? '75%' : '65%', left: isMobile ? '12%' : '20%', rot: -20, scale: isMobile ? 0.5 : 0.7,
            svg: <path d="M50 30 C 50 10, 20 10, 20 30 C 20 50, 50 75, 50 90 C 50 75, 80 50, 80 30 C 80 10, 50 10, 50 30 Z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round"/>
        },
        {
            id: 'arrow',
            link: '#notes',
            color: t.gold,
            top: isMobile ? '80%' : '70%', right: isMobile ? '15%' : '22%', rot: 15, scale: isMobile ? 0.5 : 0.8,
            svg: <path d="M20 80 L80 20 M80 20 L40 20 M80 20 L80 60" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        }
    ];

    return (
        <section
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: isMobile ? "80px 24px 60px" : "100px 40px 60px",
                position: "relative",
                zIndex: 1,
                overflow: "hidden",
            }}
        >
            {/* Interactive Background Doodles */}
            {doodles.map((d) => (
                <a
                    key={d.id}
                    href={d.link}
                    onMouseEnter={() => setHoveredDoodle(d.id)}
                    onMouseLeave={() => setHoveredDoodle(null)}
                    style={{
                        position: 'absolute',
                        top: d.top,
                        left: d.left,
                        right: d.right,
                        color: hoveredDoodle === d.id ? d.color : t.textMute,
                        cursor: 'pointer',
                        transform: `translateY(${offset * 0.15}px) rotate(${d.rot}deg) scale(${hoveredDoodle === d.id ? d.scale * 1.2 : d.scale})`,
                        transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        zIndex: 3,
                        opacity: hoveredDoodle === d.id ? 1 : 0.3,
                        display: 'block',
                        width: isMobile ? 60 : 100, height: isMobile ? 60 : 100
                    }}
                >
                    <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', filter: `drop-shadow(2px 4px 0px ${hoveredDoodle === d.id ? d.color + '44' : 'transparent'})` }}>
                        {d.svg}
                    </svg>
                </a>
            ))}

            {/* Subtitle */}
            <p
                style={{
                    ...FONTS.mono,
                    fontSize: isMobile ? ".55rem" : ".65rem",
                    letterSpacing: isMobile ? ".4em" : ".6em",
                    color: t.textMute,
                    textTransform: "uppercase",
                    marginBottom: 20,
                    opacity: 0.8,
                    transform: `translateY(${-offset * 0.2}px)`,
                    position: "relative",
                    zIndex: 2,
                }}
            >
                engineer · creator · builder · explorer
            </p>

            {/* Main title */}
            <h1
                className="glitch"
                data-text="SYNA"
                style={{
                    ...FONTS.orb,
                    fontWeight: 900,
                    fontSize: isMobile ? "clamp(4rem, 18vw, 6rem)" : "clamp(5rem, 14vw, 10rem)",
                    lineHeight: 0.85,
                    color: t.textHi,
                    textShadow: `0 0 60px ${t.accentGlow}, 4px 4px 0px ${t.accent}`,
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
                    height: 2,
                    margin: isMobile ? "20px auto" : "28px auto",
                    background: t.accent,
                    borderRadius: 2
                }}
            />

            {/* Tagline */}
            <p
                style={{
                    maxWidth: 480,
                    fontSize: isMobile ? ".85rem" : ".95rem",
                    fontWeight: 400,
                    lineHeight: 1.8,
                    color: t.textMute,
                    marginBottom: isMobile ? 36 : 48,
                    letterSpacing: ".03em",
                    transform: `translateY(${offset * 0.05}px)`,
                    position: "relative",
                    zIndex: 2,
                }}
            >
                Crafting intelligent systems at the intersection of{" "}
                <span style={{ color: t.cyan, fontWeight: 700 }}>machine learning</span>,{" "}
                <span style={{ color: t.accent, fontWeight: 700 }}>iOS development</span>, and{" "}
                <span style={{ color: t.gold, fontWeight: 700 }}>creative design</span>.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: "flex", gap: isMobile ? 12 : 32, alignItems: "center", marginBottom: 48, position: "relative", zIndex: 2, flexWrap: "wrap", justifyContent: "center" }}>
                {[
                    { label: "View Work", link: "#projects", color: t.cyan },
                    { label: "Experience", link: "#experience", color: t.magenta },
                    { label: "Read Blog", link: "#notes", color: t.gold },
                    { label: "Connect", link: "#contact", color: t.accent }
                ].map((btn, i) => (
                    <a
                        key={i}
                        href={btn.link}
                        style={{
                            ...FONTS.mono,
                            fontSize: isMobile ? ".55rem" : ".65rem",
                            letterSpacing: ".25em",
                            color: t.textHi,
                            backgroundColor: t.surface,
                            padding: isMobile ? "8px 14px" : "10px 20px",
                            border: `2px solid ${t.borderHi}`,
                            borderRadius: "20px 10px 20px 10px / 10px 20px 10px 20px",
                            boxShadow: isMobile ? `2px 2px 0px ${btn.color}` : `3px 3px 0px ${btn.color}`,
                            textDecoration: "none",
                            textTransform: "uppercase",
                            transition: "all .2s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translate(-2px, -2px)";
                            e.currentTarget.style.boxShadow = `5px 5px 0px ${btn.color}`;
                            e.currentTarget.style.borderColor = btn.color;
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translate(0, 0)";
                            e.currentTarget.style.boxShadow = isMobile ? `2px 2px 0px ${btn.color}` : `3px 3px 0px ${btn.color}`;
                            e.currentTarget.style.borderColor = t.borderHi;
                        }}
                    >
                        {btn.label}
                    </a>
                ))}
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
                    opacity: 0.6,
                }}
            >
                <div
                    style={{
                        width: 2,
                        height: isMobile ? 24 : 32,
                        background: t.textMute,
                        borderRadius: 2,
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