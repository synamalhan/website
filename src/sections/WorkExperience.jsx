import { useState } from "react";
import { useTheme } from "../theme/ThemeContext";
import { FONTS } from "../components/styles";
import Label from "../components/ui/Label";
import H2 from "../components/ui/H2";
import { EXPERIENCES } from "../data/experience";

export default function WorkExperience() {
    const { theme: t } = useTheme();
    const [flipped, setFlipped] = useState({});

    const toggleFlip = (i) => {
        setFlipped(prev => ({ ...prev, [i]: !prev[i] }));
    };

    return (
        <section id="experience" style={{ padding: "120px 24px", position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 72 }}>
                <Label center>// Experience</Label>
                <H2 style={{ textAlign: "center" }}>CAREER<br />TRAJECTORY</H2>
                <p style={{ ...FONTS.mono, fontSize: "0.7rem", color: t.textMute, marginTop: 12 }}>CLICK CARDS TO EXPLORE DEPTH</p>
            </div>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "40px",
                padding: "0 20px"
            }}>
                {EXPERIENCES.map((exp, i) => (
                    <div
                        key={i}
                        onClick={() => toggleFlip(i)}
                        style={{
                            height: 450,
                            perspective: "1500px",
                            cursor: "pointer"
                        }}
                    >
                        <div style={{
                            position: "relative",
                            width: "100%",
                            height: "100%",
                            transition: "transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                            transformStyle: "preserve-3d",
                            transform: flipped[i] ? "rotateY(180deg)" : "rotateY(0deg)"
                        }}>
                            {/* FRONT */}
                            <div style={{
                                position: "absolute",
                                width: "100%",
                                height: "100%",
                                backfaceVisibility: "hidden",
                                background: t.surface,
                                border: `1px solid ${t.border}`,
                                borderRadius: 20,
                                padding: "40px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                textAlign: "center",
                                transformStyle: "preserve-3d",
                                boxShadow: `0 20px 40px rgba(0,0,0,0.4)`
                            }}>
                                {/* Floating Logo Front - High Depth */}
                                <div style={{
                                    position: "absolute",
                                    top: -20,
                                    left: -10,
                                    width: 80,
                                    height: 80,
                                    borderRadius: 16,
                                    overflow: "hidden",
                                    border: `1px solid ${t.border}`,
                                    boxShadow: `0 10px 20px rgba(0,0,0,0.3)`,
                                    transform: "translateZ(100px) rotateZ(5deg)",
                                    pointerEvents: "none",
                                    zIndex: 10,
                                    backgroundColor: t.name === "dark" ? "rgba(255, 255, 255, 0.07)" : "rgba(255, 255, 255, 0.8)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: 12,
                                    backdropFilter: "blur(4px)"
                                }}>
                                    <img src={exp.logo} alt="logo" style={{ width: "100%", height: "100%", objectFit: "contain", filter: t.name === "dark" ? "brightness(1.1) contrast(1.1)" : "none" }} />
                                </div>

                                <div style={{
                                    ...FONTS.mono,
                                    fontSize: "0.8rem",
                                    color: t.cyan,
                                    marginBottom: 12,
                                    letterSpacing: 2,
                                    transform: "translateZ(40px)"
                                }}>{exp.years}</div>
                                <div style={{
                                    ...FONTS.orb,
                                    fontSize: exp.company.length > 20 ? "1.6rem" : "1.8rem",
                                    color: t.textHi,
                                    fontWeight: 900,
                                    marginBottom: 4,
                                    letterSpacing: -0.5,
                                    lineHeight: 1.1,
                                    transform: "translateZ(70px)"
                                }}>{exp.company}</div>
                                <div style={{
                                    ...FONTS.inter,
                                    fontSize: "1rem",
                                    color: t.accent,
                                    fontWeight: 600,
                                    marginBottom: 20,
                                    transform: "translateZ(50px)"
                                }}>{exp.role}</div>

                                {/* Description on Front */}
                                <div style={{
                                    ...FONTS.inter,
                                    fontSize: exp.desc.length > 100 ? "0.85rem" : "0.95rem",
                                    color: t.textMute,
                                    lineHeight: 1.5,
                                    maxWidth: "100%",
                                    transform: "translateZ(30px)"
                                }}>
                                    {exp.desc}
                                </div>

                                <div style={{
                                    width: 40,
                                    height: 2,
                                    background: t.accent,
                                    marginTop: 30,
                                    boxShadow: `0 0 10px ${t.accent}`,
                                    transform: "translateZ(40px)"
                                }} />
                            </div>

                            {/* BACK */}
                            <div style={{
                                position: "absolute",
                                width: "100%",
                                height: "100%",
                                backfaceVisibility: "hidden",
                                background: t.bg,
                                border: `2px solid ${t.accent}`,
                                borderRadius: 20,
                                padding: "32px",
                                transform: "rotateY(180deg)",
                                display: "flex",
                                flexDirection: "column",
                                transformStyle: "preserve-3d",
                                boxShadow: `0 0 50px ${t.accent}33`
                            }}>
                                {/* Floating Logo Back - Maximum Depth */}
                                <div style={{
                                    position: "absolute",
                                    top: -20,
                                    right: -10,
                                    width: 100,
                                    height: 100,
                                    borderRadius: 20,
                                    overflow: "hidden",
                                    border: `2px solid ${t.cyan}`,
                                    boxShadow: `0 0 30px ${t.cyanGlow}`,
                                    transform: "translateZ(130px) rotateZ(-8deg)",
                                    pointerEvents: "none",
                                    zIndex: 10,
                                    backgroundColor: t.name === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.9)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: 15,
                                    backdropFilter: "blur(8px)"
                                }}>
                                    <img src={exp.logo} alt="logo" style={{ width: "100%", height: "100%", objectFit: "contain", filter: t.name === "dark" ? "brightness(1.1) contrast(1.1)" : "none" }} />
                                </div>

                                {/* Title - Also floats high */}
                                <div style={{
                                    ...FONTS.inter,
                                    fontSize: "1.2rem",
                                    color: t.textHi,
                                    fontWeight: 700,
                                    marginBottom: 10,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 12,
                                    marginTop: 10,
                                    transform: "translateZ(80px)"
                                }}>
                                    <span style={{ width: 4, height: 20, background: t.cyan, borderRadius: 2 }} />
                                    Key Highlights
                                </div>

                                {/* Scrollable details - Base depth */}
                                <div style={{
                                    flex: 1,
                                    overflowY: "auto",
                                    paddingRight: 8,
                                    maskImage: "linear-gradient(to bottom, black 90%, transparent)",
                                    WebkitMaskImage: "linear-gradient(to bottom, black 90%, transparent)",
                                    transform: "translateZ(40px)",
                                    scrollbarWidth: "none"
                                }}>
                                    <style>{`
                                        div::-webkit-scrollbar { display: none; }
                                    `}</style>

                                    <div style={{ marginBottom: 24 }}>
                                        {Array.isArray(exp.details) ? exp.details.map((detail, idx) => (
                                            <div key={idx} style={{
                                                ...FONTS.inter,
                                                fontSize: exp.details.length > 3 ? "0.85rem" : "0.9rem",
                                                color: t.textMute,
                                                lineHeight: 1.5,
                                                marginBottom: 12,
                                                display: "flex",
                                                gap: 8
                                            }}>
                                                <span style={{ color: t.accent }}>•</span>
                                                {detail}
                                            </div>
                                        )) : (
                                            <div style={{ ...FONTS.inter, fontSize: "0.9rem", color: t.textMute, lineHeight: 1.6 }}>{exp.details}</div>
                                        )}
                                    </div>
                                </div>

                                {/* Tech Stack - Medium Depth */}
                                <div style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 6,
                                    marginBottom: 20,
                                    marginTop: 15,
                                    transform: "translateZ(60px)"
                                }}>
                                    {exp.techStack.map((tech, idx) => (
                                        <span key={idx} style={{
                                            ...FONTS.mono,
                                            fontSize: "0.6rem",
                                            padding: "4px 10px",
                                            background: `${t.accent}15`,
                                            border: `1px solid ${t.accent}30`,
                                            borderRadius: 4,
                                            color: t.accent,
                                            textTransform: "uppercase",
                                            letterSpacing: 0.5
                                        }}>
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div style={{
                                    ...FONTS.mono,
                                    fontSize: "0.65rem",
                                    color: t.textMute,
                                    letterSpacing: 2,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 8,
                                    opacity: 0.6,
                                    transform: "translateZ(30px)"
                                }}>
                                    <span style={{ width: 15, height: 1, background: t.accent }} />
                                    BACK TO SUMMARY
                                </div>
                            </div>

                            {/* Background depth element */}
                            <div style={{
                                position: "absolute",
                                inset: 0,
                                background: `radial-gradient(circle at top right, ${t.accent}11, transparent)`,
                                borderRadius: 20,
                                pointerEvents: "none",
                                transform: "translateZ(1px)"
                            }} />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
