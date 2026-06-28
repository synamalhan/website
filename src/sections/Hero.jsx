import { useTheme } from "../theme/ThemeContext";
import { FONTS } from "../components/styles";
import { useParallax } from "../hooks/useParallax";
import { useIsMobile } from "../hooks/useMediaQuery";
import React, { useState } from "react";
import resumeUrl from "../assets/SYNA_MALHAN.pdf";
import { heroSpotlightProjects } from "../data/projects";
import { useProjectCardLink } from "../hooks/useProjectCardLink";

function SpotlightProject({ title, description, tech, accent, href, onClick, isMobile, t }) {
    const [hovered, setHovered] = useState(false);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    const handleMove = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        setTilt({ x: (x - 0.5) * 8, y: (0.5 - y) * 8 });
    };

    const handleLeave = () => {
        setHovered(false);
        setTilt({ x: 0, y: 0 });
    };

    return (
        <a
            href={href}
            onClick={onClick}
            aria-label={`View spotlight project: ${title}`}
            onMouseEnter={() => setHovered(true)}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            onFocus={() => setHovered(true)}
            onBlur={handleLeave}
            style={{
                position: "relative",
                display: "block",
                width: "100%",
                maxWidth: isMobile ? 320 : 280,
                padding: isMobile ? "20px 20px 18px" : "22px 22px 20px",
                borderRadius: 24,
                border: "1px solid rgba(255,255,255,0.8)",
                background: hovered ? `${accent}11` : t.cardBg,
                backdropFilter: "blur(18px)",
                boxShadow: hovered
                    ? `0 20px 70px ${accent}28, inset 0 1px 0 rgba(255,255,255,0.22)`
                    : `0 16px 50px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.16)`,
                transform: hovered
                    ? `translateY(-6px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale(1.01)`
                    : `translateY(0) rotateX(0deg) rotateY(0deg) scale(1)`,
                transition: "transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.35s ease, background 0.35s ease, border-color 0.35s ease",
                textDecoration: "none",
                color: t.textHi,
                overflow: "hidden",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: `radial-gradient(circle at top left, ${accent}22, transparent 56%)`,
                    opacity: hovered ? 1 : 0.7,
                    pointerEvents: "none",
                }}
            />
            <div style={{ position: "relative", zIndex: 1 }}>
                <div
                    style={{
                        ...FONTS.mono,
                        fontSize: "0.6rem",
                        letterSpacing: ".32em",
                        color: t.textMute,
                        textTransform: "uppercase",
                        marginBottom: 12,
                        opacity: 0.85,
                    }}
                >
                    Spotlight Project
                </div>
                <h3
                    style={{
                        ...FONTS.orb,
                        fontSize: isMobile ? "1.15rem" : "1.2rem",
                        fontWeight: 800,
                        margin: "0 0 8px",
                        lineHeight: 1.2,
                        color: t.textHi,
                    }}
                >
                    {title}
                </h3>
                <p
                    style={{
                        fontSize: isMobile ? "0.9rem" : "0.92rem",
                        lineHeight: 1.6,
                        color: t.textMute,
                        margin: "0 0 14px",
                    }}
                >
                    {description}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
                    {tech.map((item) => (
                        <span
                            key={item}
                            style={{
                                border: `1px solid ${accent}44`,
                                borderRadius: 999,
                                padding: "6px 10px",
                                fontSize: "0.72rem",
                                color: accent,
                                background: `${accent}12`,
                                ...FONTS.mono,
                                letterSpacing: ".1em",
                                textTransform: "uppercase",
                            }}
                        >
                            {item}
                        </span>
                    ))}
                </div>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        color: accent,
                        letterSpacing: ".12em",
                        textTransform: "uppercase",
                        ...FONTS.mono,
                    }}
                >
                    <span>View Project</span>
                    <span aria-hidden="true">→</span>
                </div>
            </div>
        </a>
    );
}

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
                color: "#ffffff",
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
    const { openProjectCard } = useProjectCardLink();
    const [hoveredDoodle, setHoveredDoodle] = useState(null);

    const doodles = [
        {
            id: "star",
            link: "#skills",
            color: t.accent,
            top: isMobile ? "8%" : "24%",
            left: isMobile ? "6%" : "12%",
            rot: -15,
            scale: isMobile ? 0.5 : 0.8,
            delay: "0s",
            svg: <path d="M50 5 L60 40 L95 40 L65 60 L75 95 L50 75 L25 95 L35 60 L5 40 L40 40 Z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />,
        },
        {
            id: "spiral",
            link: "#projects",
            color: t.cyan,
            top: isMobile ? "16%" : "28%",
            right: isMobile ? "4%" : "16%",
            rot: 24,
            scale: isMobile ? 0.58 : 0.9,
            delay: "1.2s",
            svg: <path d="M50 50 C 50 15, 85 15, 85 50 C 85 85, 15 85, 15 50 C 15 5, 95 5, 95 50" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />,
        },
        {
            id: "heart",
            link: "#about",
            color: t.magenta,
            top: isMobile ? "74%" : "64%",
            left: isMobile ? "8%" : "18%",
            rot: -20,
            scale: isMobile ? 0.48 : 0.7,
            delay: "0.8s",
            svg: <path d="M50 30 C 50 10, 20 10, 20 30 C 20 50, 50 75, 50 90 C 50 75, 80 50, 80 30 C 80 10, 50 10, 50 30 Z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />,
        },
        {
            id: "arrow",
            link: "#notes",
            color: t.gold,
            top: isMobile ? "78%" : "70%",
            right: isMobile ? "10%" : "20%",
            rot: 15,
            scale: isMobile ? 0.48 : 0.8,
            delay: "1.6s",
            svg: <path d="M20 80 L80 20 M80 20 L40 20 M80 20 L80 60" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />,
        },
    ];

    const spotlightProjects = heroSpotlightProjects;

    const handleSpotlightClick = (project) => (event) => {
        event.preventDefault();
        openProjectCard(project.anchorId, project.projectAnchorId);
    };

    return (
        <section
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: isMobile ? "88px 24px 72px" : "110px 32px 80px",
                position: "relative",
                zIndex: 1,
                overflow: "hidden",
                background: `radial-gradient(circle at top left, ${t.accentGlow}, transparent 34%), radial-gradient(circle at 80% 20%, ${t.cyanGlow}, transparent 26%), linear-gradient(135deg, ${t.bg}, ${t.surface})`,
            }}
        >
            <style>{`
                @keyframes floatDoodle {
                    0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
                    50% { transform: translate3d(0, -10px, 0) rotate(4deg); }
                }
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
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.14) 1px, transparent 1px)`,
                    backgroundSize: "18px 18px",
                    opacity: 0.18,
                    pointerEvents: "none",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    inset: "8% 12% auto",
                    height: 260,
                    background: `linear-gradient(90deg, transparent, ${t.accentGlow}, transparent)`,
                    filter: "blur(60px)",
                    opacity: 0.2,
                    pointerEvents: "none",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    inset: "auto 8% 8% auto",
                    width: 220,
                    height: 220,
                    background: `radial-gradient(circle, ${t.cyanGlow}, transparent 70%)`,
                    filter: "blur(40px)",
                    opacity: 0.3,
                    pointerEvents: "none",
                }}
            />

            {doodles.map((d) => (
                <a
                    key={d.id}
                    href={d.link}
                    onMouseEnter={() => setHoveredDoodle(d.id)}
                    onMouseLeave={() => setHoveredDoodle(null)}
                    style={{
                        position: "absolute",
                        top: d.top,
                        left: d.left,
                        right: d.right,
                        color: hoveredDoodle === d.id ? d.color : t.textMute,
                        cursor: "pointer",
                        transform: `translateY(${offset * 0.15}px) rotate(${d.rot}deg) scale(${hoveredDoodle === d.id ? d.scale * 1.12 : d.scale})`,
                        transition: "all 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)",
                        zIndex: 3,
                        opacity: hoveredDoodle === d.id ? 0.9 : 0.28,
                        display: "block",
                        width: isMobile ? 58 : 96,
                        height: isMobile ? 58 : 96,
                        animation: `floatDoodle 6.5s ease-in-out infinite`,
                        animationDelay: d.delay,
                    }}
                >
                    <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%", filter: `drop-shadow(2px 4px 0px ${hoveredDoodle === d.id ? d.color + "44" : "transparent"})` }}>
                        {d.svg}
                    </svg>
                </a>
            ))}

            <div
                style={{
                    position: "relative",
                    zIndex: 2,
                    width: "100%",
                    maxWidth: 1280,
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "minmax(220px, 1fr) minmax(360px, 1.05fr) minmax(220px, 1fr)",
                    gap: isMobile ? 24 : 36,
                    alignItems: "center",
                }}
            >
                {!isMobile && (
                    <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                        <div style={{ width: "100%", maxWidth: 280 }}>
                            <SpotlightProject
                                title={spotlightProjects[0].title}
                                description={spotlightProjects[0].description}
                                tech={spotlightProjects[0].tech}
                                accent={t[spotlightProjects[0].accent]}
                                href={`#${spotlightProjects[0].anchorId}`}
                                onClick={handleSpotlightClick(spotlightProjects[0])}
                                isMobile={isMobile}
                                t={t}
                            />
                        </div>
                    </div>
                )}

                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
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
                            margin: isMobile ? "20px auto 18px" : "26px auto 22px",
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

                    <ResumeButton accent={t.accent} isMobile={isMobile} t={t} />

                    <div
                        style={{
                            display: "flex",
                            gap: isMobile ? 10 : 16,
                            alignItems: "center",
                            flexWrap: "wrap",
                            justifyContent: "center",
                            position: "relative",
                            zIndex: 2,
                        }}
                    >
                        {[
                            { label: "View Work", link: "#projects", color: t.cyan },
                            { label: "Experience", link: "#experience", color: t.magenta },
                            { label: "Read Blog", link: "#notes", color: t.gold },
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

                {!isMobile && (
                    <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                        <div style={{ width: "100%", maxWidth: 280 }}>
                            <SpotlightProject
                                title={spotlightProjects[1].title}
                                description={spotlightProjects[1].description}
                                tech={spotlightProjects[1].tech}
                                accent={t[spotlightProjects[1].accent]}
                                href={`#${spotlightProjects[1].anchorId}`}
                                onClick={handleSpotlightClick(spotlightProjects[1])}
                                isMobile={isMobile}
                                t={t}
                            />
                        </div>
                    </div>
                )}
            </div>

            <div
                style={{
                    position: "absolute",
                    bottom: 28,
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 10,
                    opacity: 0.75,
                    zIndex: 3,
                }}
            >
                <div
                    style={{
                        width: 24,
                        height: 38,
                        border: `1px solid ${t.textMute}`,
                        borderRadius: 999,
                        display: "flex",
                        justifyContent: "center",
                        paddingTop: 6,
                        animation: "floatSoft 2.4s ease-in-out infinite",
                    }}
                >
                    <div
                        style={{
                            width: 2,
                            height: 8,
                            background: t.textMute,
                            borderRadius: 2,
                            animation: "pulseGlow 2.2s ease-in-out infinite",
                        }}
                    />
                </div>
                <div style={{ ...FONTS.mono, fontSize: ".48rem", letterSpacing: ".35em", color: t.textMute }}>
                    SCROLL
                </div>
            </div>
        </section>
    );
}