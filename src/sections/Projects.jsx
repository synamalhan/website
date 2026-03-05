import { useState, useEffect } from "react";
import { useTheme } from "../theme/ThemeContext";
import { FONTS } from "../components/styles";
import Label from "../components/ui/Label";
import H2 from "../components/ui/H2";
import ProjectThumb from "../components/ProjectThumb";
import { categorizedProjects } from "../data/projects";

function FlippableProjectCard({ project, index, theme: t }) {
    const [flipped, setFlipped] = useState(false);

    return (
        <div
            onClick={(e) => {
                e.stopPropagation();
                setFlipped(!flipped);
            }}
            style={{
                height: 380,
                perspective: "1200px",
                cursor: "pointer",
                width: "100%"
            }}
        >
            <div style={{
                position: "relative",
                width: "100%",
                height: "100%",
                transition: "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
                transformStyle: "preserve-3d",
                transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)"
            }}>
                {/* FRONT */}
                <div style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backfaceVisibility: "hidden",
                    background: t.surface,
                    border: `1px solid ${t.border}`,
                    borderRadius: 16,
                    padding: "32px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    overflow: "hidden",
                    transformStyle: "preserve-3d",
                    boxShadow: `0 10px 30px rgba(0,0,0,0.3)`
                }}>
                    {/* Index Number like Career cards */}
                    <div style={{
                        position: "absolute",
                        top: 20,
                        right: 24,
                        ...FONTS.mono,
                        fontSize: "2.5rem",
                        fontWeight: 900,
                        color: t.textHi,
                        opacity: 0.05,
                        transform: "translateZ(20px)"
                    }}>
                        {String(index + 1).padStart(2, '0')}
                    </div>

                    <div style={{ transform: "translateZ(40px)", height: "100%", display: "flex", flexDirection: "column" }}>
                        <div style={{
                            ...FONTS.orb,
                            fontSize: "1.3rem",
                            color: t.accent,
                            fontWeight: 800,
                            lineHeight: 1.2,
                            marginBottom: 16
                        }}>{project.title}</div>

                        <div style={{ marginBottom: 20 }}>
                            <div style={{ ...FONTS.mono, fontSize: "0.6rem", color: t.textMute, letterSpacing: 1, marginBottom: 8, textTransform: "uppercase" }}>Motivation</div>
                            <div style={{ ...FONTS.inter, fontSize: "0.85rem", color: t.textHi, lineHeight: 1.5 }}>{project.motivation}</div>
                        </div>

                        <div style={{ marginTop: "auto" }}>
                            <div style={{ ...FONTS.mono, fontSize: "0.6rem", color: t.textMute, letterSpacing: 1, marginBottom: 8, textTransform: "uppercase" }}>Tech Stack</div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                                {project.techStack.map(s => (
                                    <span key={s} style={{
                                        fontSize: "0.65rem",
                                        ...FONTS.mono,
                                        color: t.cyan,
                                        background: `${t.cyan}10`,
                                        padding: "2px 6px",
                                        borderRadius: 4,
                                        border: `1px solid ${t.cyan}30`
                                    }}>{s}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* BACK */}
                <div style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backfaceVisibility: "hidden",
                    background: t.bg,
                    border: `1.5px solid ${t.accent}`,
                    borderRadius: 16,
                    padding: "32px",
                    transform: "rotateY(180deg)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    transformStyle: "preserve-3d",
                    boxShadow: `0 0 30px ${t.accent}22`
                }}>
                    <div style={{ transform: "translateZ(50px)" }}>
                        <div style={{ ...FONTS.mono, fontSize: "0.6rem", color: t.accent, letterSpacing: 2, marginBottom: 12, textTransform: "uppercase" }}>Implementation</div>
                        <div style={{
                            ...FONTS.inter,
                            fontSize: "0.9rem",
                            color: t.textMute,
                            lineHeight: 1.6,
                            marginBottom: 24
                        }}>{project.details}</div>

                        {project.link && (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noreferrer"
                                onClick={e => e.stopPropagation()}
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 8,
                                    ...FONTS.mono,
                                    color: t.textHi,
                                    textDecoration: "none",
                                    fontSize: "0.7rem",
                                    padding: "8px 16px",
                                    border: `1px solid ${t.border}`,
                                    borderRadius: 6,
                                    background: t.surface,
                                    transition: "all 0.2s"
                                }}
                                onMouseEnter={e => e.currentTarget.style.borderColor = t.accent}
                                onMouseLeave={e => e.currentTarget.style.borderColor = t.border}
                            >
                                VIEW REPOSITORY ↗
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Projects() {
    const { theme: t } = useTheme();
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        if (selectedCategory) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "auto";
    }, [selectedCategory]);

    return (
        <section id="projects" style={{ padding: "120px 24px", position: "relative", zIndex: selectedCategory ? 1001 : 1, maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 72 }}>
                <Label center>// Portfolio</Label>
                <H2 style={{ textAlign: "center" }}>DATA<br />MANIFOLD</H2>
            </div>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "24px"
            }}>
                {categorizedProjects.map((cat, i) => (
                    <div
                        key={i}
                        onClick={() => setSelectedCategory(cat)}
                        style={{
                            background: t.surface,
                            border: `1px solid ${t.border}`,
                            borderRadius: 12,
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                            position: "relative",
                            overflow: "hidden",
                            display: "flex",
                            flexDirection: "column",
                            height: 300
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.borderColor = cat.colors[0];
                            e.currentTarget.style.transform = "translateY(-5px)";
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.borderColor = t.border;
                            e.currentTarget.style.transform = "translateY(0)";
                        }}
                    >
                        <div style={{ height: 140, position: "relative", overflow: "hidden" }}>
                            <ProjectThumb type={cat.type} colors={cat.colors} t={t} />
                            <div style={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                width: "100%",
                                height: "50%",
                                background: `linear-gradient(to top, ${t.surface}, transparent)`
                            }} />
                        </div>

                        <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column" }}>
                            <div style={{ ...FONTS.orb, fontSize: "1.2rem", color: t.textHi, fontWeight: 800, marginBottom: 8 }}>
                                {cat.title}
                            </div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: "auto" }}>
                                {cat.tags.map(tag => (
                                    <span key={tag} style={{ ...FONTS.mono, fontSize: "0.55rem", color: t.textMute }}>{tag}</span>
                                ))}
                            </div>
                            <div style={{
                                marginTop: 16,
                                ...FONTS.mono,
                                fontSize: "0.65rem",
                                color: cat.colors[0],
                                letterSpacing: 1
                            }}>
                                [ EXPLORE {cat.projects.length} PIECES ]
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Centered Modal */}
            {selectedCategory && (
                <div
                    onClick={() => setSelectedCategory(null)}
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: `${t.bg}cc`,
                        backdropFilter: "blur(12px)",
                        zIndex: 1000,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "40px 24px"
                    }}
                >
                    <div
                        onClick={e => e.stopPropagation()}
                        style={{
                            width: "90%",
                            maxWidth: 1000,
                            maxHeight: "85vh",
                            background: t.bg,
                            border: `1px solid ${t.border}`,
                            borderRadius: 24,
                            padding: "48px 32px",
                            position: "relative",
                            display: "flex",
                            flexDirection: "column",
                            boxShadow: `0 40px 100px rgba(0,0,0,0.6)`
                        }}
                    >
                        {/* Modal Header */}
                        <div style={{ marginBottom: 40, borderBottom: `1px solid ${t.border}`, paddingBottom: 24 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                <div>
                                    <div style={{ ...FONTS.mono, color: t.cyan, fontSize: "0.8rem", marginBottom: 8 }}>CATEGORY</div>
                                    <H2 style={{ fontSize: "1.8rem", margin: 0 }}>{selectedCategory.title}</H2>
                                </div>
                                <button
                                    onClick={() => setSelectedCategory(null)}
                                    style={{
                                        background: t.surface,
                                        border: `1px solid ${t.border}`,
                                        color: t.textHi,
                                        ...FONTS.mono,
                                        cursor: "pointer",
                                        fontSize: "0.7rem",
                                        padding: "8px 16px",
                                        borderRadius: 8
                                    }}
                                >
                                    CLOSE ESC
                                </button>
                            </div>
                        </div>

                        {/* Scrolling Content */}
                        <div style={{
                            overflowY: "auto",
                            paddingRight: 10,
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                            gap: "24px"
                        }}>
                            {selectedCategory.projects.map((proj, idx) => (
                                <FlippableProjectCard key={idx} index={idx} project={proj} theme={t} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
