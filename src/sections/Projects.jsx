import { useState, useEffect } from "react";
import { useTheme } from "../theme/ThemeContext";
import { FONTS, addAlpha } from "../components/styles";
import { useIsMobile } from "../hooks/useMediaQuery";
import Label from "../components/ui/Label";
import H2 from "../components/ui/H2";
import ProjectThumb from "../components/ProjectThumb";
import { categorizedProjects } from "../data/projects";
import { useProjectCardLink } from "../hooks/useProjectCardLink";

function FlippableProjectCard({ project, index, theme: t, primaryColor, categoryAnchorId, onOpen }) {
    const isMobile = useIsMobile();
    const [flipped, setFlipped] = useState(false);
    const accentColor = primaryColor || t.accent;

    const handleCardLink = (event) => {
        event.stopPropagation();
        if (project.anchorId && onOpen) {
            onOpen(categoryAnchorId, project.anchorId);
        }
    };

    return (
        <div
            id={project.anchorId}
            onClick={(e) => {
                e.stopPropagation();
                setFlipped(!flipped);
            }}
            style={{
                height: isMobile ? 320 : 380,
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
                    padding: isMobile ? "24px" : "32px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    overflow: "visible",
                    transformStyle: "preserve-3d",
                    boxShadow: `0 10px 30px rgba(0,0,0,0.3)`
                }}>
                    {/* Index Number */}
                    <div style={{
                        position: "absolute",
                        top: isMobile ? 12 : 20,
                        right: isMobile ? 16 : 24,
                        ...FONTS.mono,
                        fontSize: isMobile ? "2rem" : "2.5rem",
                        fontWeight: 900,
                        color: t.textHi,
                        opacity: 0.05,
                        transform: "translateZ(20px)"
                    }}>
                        {String(index + 1).padStart(2, '0')}
                    </div>

                    {/* Content */}
                    <div style={{ transform: isMobile ? "translateZ(30px)" : "translateZ(40px)", height: "100%", display: "flex", flexDirection: "column" }}>
                        <div style={{
                            ...FONTS.orb,
                            fontSize: isMobile ? "1.1rem" : "1.3rem",
                            color: accentColor,
                            fontWeight: 800,
                            lineHeight: 1.2,
                            marginBottom: isMobile ? 12 : 16
                        }}>{project.title}</div>

                        <div style={{ marginBottom: isMobile ? 12 : 20 }}>
                            <div style={{ ...FONTS.mono, fontSize: "0.55rem", color: t.textMute, letterSpacing: 1, marginBottom: 6, textTransform: "uppercase" }}>Motivation</div>
                            <div style={{ ...FONTS.inter, fontSize: isMobile ? "0.8rem" : "0.85rem", color: t.textHi, lineHeight: 1.5 }}>{project.motivation}</div>
                        </div>

                        <div style={{ marginTop: "auto" }}>
                            <div style={{ ...FONTS.mono, fontSize: "0.55rem", color: t.textMute, letterSpacing: 1, marginBottom: 6, textTransform: "uppercase" }}>Tech Stack</div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                                {project.techStack.slice(0, isMobile ? 4 : project.techStack.length).map(s => (
                                    <span key={s} style={{
                                        fontSize: "0.6rem",
                                        ...FONTS.mono,
                                        color: accentColor,
                                        background: addAlpha(accentColor, "10"),
                                        padding: "2px 6px",
                                        borderRadius: 4,
                                        border: `1px solid ${addAlpha(accentColor, "30")}`
                                    }}>{s}</span>
                                ))}
                                {isMobile && project.techStack.length > 4 && (
                                    <span style={{ fontSize: "0.6rem", ...FONTS.mono, color: t.textMute }}>+{project.techStack.length - 4} more</span>
                                )}
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
                    border: `1.5px solid ${accentColor}`,
                    borderRadius: 16,
                    transform: "rotateY(180deg)",
                    boxShadow: `0 0 30px ${addAlpha(accentColor, "22")}`
                }}>
                    <div style={{
                        width: "100%",
                        height: "100%",
                        overflowY: "auto",
                        padding: isMobile ? "16px" : "24px",
                        boxSizing: "border-box"
                    }}>
                        <div style={{
                            background: `${t.surface}`,
                            border: `1px solid ${addAlpha(accentColor, "33")}`,
                            borderRadius: 12,
                            padding: isMobile ? "20px" : "28px",
                            boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 2px 8px ${addAlpha(accentColor, "15")}, inset 0 1px 0 ${addAlpha(accentColor, "18")}`
                        }}>
                            <div style={{ ...FONTS.mono, fontSize: "0.55rem", color: accentColor, letterSpacing: 2, marginBottom: 10, textTransform: "uppercase" }}>Details</div>
                            <div style={{
                                ...FONTS.inter,
                                fontSize: isMobile ? "0.8rem" : "0.9rem",
                                color: t.textMute,
                                lineHeight: 1.6,
                                marginBottom: 20
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
                                        fontSize: "0.65rem",
                                        padding: "6px 12px",
                                        border: `1px solid ${t.border}`,
                                        borderRadius: 6,
                                        background: t.surface,
                                        transition: "all 0.2s"
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.borderColor = t.borderHi}
                                    onMouseLeave={e => e.currentTarget.style.borderColor = t.border}
                                >
                                    VIEW REPO ↗
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Projects() {
    const { theme: t } = useTheme();
    const isMobile = useIsMobile();
    const { openProjectCard } = useProjectCardLink();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [targetProjectId, setTargetProjectId] = useState(null);

    useEffect(() => {
        if (selectedCategory) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "auto";
    }, [selectedCategory]);

    useEffect(() => {
        const syncFromHash = () => {
            const hash = window.location.hash.replace("#", "");
            if (!hash) {
                setSelectedCategory(null);
                setTargetProjectId(null);
                return;
            }

            const matchingProject = categorizedProjects
                .flatMap((cat) => cat.projects)
                .find((proj) => proj.anchorId === hash);

            if (matchingProject) {
                const matchingCategory = categorizedProjects.find((cat) =>
                    cat.projects.some((proj) => proj.anchorId === hash)
                );
                setTargetProjectId(hash);
                setSelectedCategory(matchingCategory || null);
                return;
            }

            const matchingCategory = categorizedProjects.find((cat) => cat.anchorId === hash);
            if (matchingCategory) {
                setTargetProjectId(null);
                setSelectedCategory(matchingCategory);
            }
        };

        const handleOpenProject = (event) => {
            const { categoryAnchorId, projectAnchorId } = event.detail || {};

            if (categoryAnchorId) {
                const matchingCategory = categorizedProjects.find((cat) => cat.anchorId === categoryAnchorId);
                if (matchingCategory) {
                    setSelectedCategory(matchingCategory);
                    setTargetProjectId(projectAnchorId || null);
                    window.location.hash = projectAnchorId || categoryAnchorId;
                    return;
                }
            }

            if (projectAnchorId) {
                openProjectByAnchor(projectAnchorId);
            }
        };

        syncFromHash();
        window.addEventListener("hashchange", syncFromHash);
        window.addEventListener("open-project", handleOpenProject);
        return () => {
            window.removeEventListener("hashchange", syncFromHash);
            window.removeEventListener("open-project", handleOpenProject);
        };
    }, []);

    useEffect(() => {
        if (!selectedCategory || !targetProjectId) return;

        const timer = window.setTimeout(() => {
            const targetId = targetProjectId || selectedCategory?.anchorId;
            const target = targetId ? document.getElementById(targetId) : null;
            if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        }, 180);

        return () => window.clearTimeout(timer);
    }, [selectedCategory, targetProjectId]);

    const openCategory = (cat, projectAnchorId = null) => {
        setSelectedCategory(cat);
        setTargetProjectId(projectAnchorId);

        if (projectAnchorId) {
            window.location.hash = projectAnchorId;
        } else if (cat.anchorId) {
            window.location.hash = cat.anchorId;
        } else {
            window.history.replaceState(null, "", window.location.pathname + window.location.search);
        }
    };

    const openProjectByAnchor = (projectAnchorId) => {
        const matchingProject = categorizedProjects
            .flatMap((cat) => cat.projects)
            .find((proj) => proj.anchorId === projectAnchorId);

        if (!matchingProject) return;

        const matchingCategory = categorizedProjects.find((cat) =>
            cat.projects.some((proj) => proj.anchorId === projectAnchorId)
        );

        setSelectedCategory(matchingCategory || null);
        setTargetProjectId(projectAnchorId);
        window.location.hash = projectAnchorId;
    };

    const closeModal = () => {
        setSelectedCategory(null);
        setTargetProjectId(null);
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
    };

    return (
        <section id="projects" style={{ padding: isMobile ? "80px 24px" : "120px 24px", position: "relative", zIndex: selectedCategory ? 1001 : 1, maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: isMobile ? 48 : 72 }}>
                <Label center>// Portfolio</Label>
                <H2 style={{ textAlign: "center" }}>MY<br />PROJECTS</H2>
            </div>

            <div style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "24px"
            }}>
                {categorizedProjects.map((cat, i) => (
                    <div
                        key={i}
                        id={cat.anchorId}
                        onClick={() => openCategory(cat)}
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
                            height: isMobile ? 260 : 300,
                            scrollMarginTop: isMobile ? 100 : 120
                        }}
                        onMouseEnter={e => {
                            if (isMobile) return;
                            e.currentTarget.style.borderColor = t.borderHi;
                            e.currentTarget.style.transform = "translateY(-5px)";
                        }}
                        onMouseLeave={e => {
                            if (isMobile) return;
                            e.currentTarget.style.borderColor = t.border;
                            e.currentTarget.style.transform = "translateY(0)";
                        }}
                    >
                        <div style={{ height: isMobile ? 120 : 140, position: "relative", overflow: "hidden" }}>
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

                        <div style={{ padding: isMobile ? "20px" : "24px", flex: 1, display: "flex", flexDirection: "column" }}>
                            <div style={{ ...FONTS.orb, fontSize: isMobile ? "1.1rem" : "1.2rem", color: t.textHi, fontWeight: 800, marginBottom: 8 }}>
                                {cat.title}
                            </div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: "auto" }}>
                                {cat.tags.slice(0, isMobile ? 3 : cat.tags.length).map(tag => (
                                    <span key={tag} style={{ ...FONTS.mono, fontSize: "0.55rem", color: t.textMute }}>{tag}</span>
                                ))}
                            </div>
                            <div style={{
                                marginTop: 16,
                                ...FONTS.mono,
                                fontSize: "0.6rem",
                                color: cat.colors[0],
                                letterSpacing: 1
                            }}>
                                [ {isMobile ? "VIEW" : `EXPLORE ${cat.projects.length} PIECES`} ]
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {selectedCategory && (
                <div
                    onClick={closeModal}
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: addAlpha(t.bg, "cc"),
                        backdropFilter: "blur(12px)",
                        zIndex: 1000,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: isMobile ? "20px 16px" : "40px 24px"
                    }}
                >
                    <div
                        onClick={e => e.stopPropagation()}
                        style={{
                            width: "100%",
                            maxWidth: 1000,
                            maxHeight: isMobile ? "92vh" : "85vh",
                            background: t.bg,
                            border: `1px solid ${t.borderHi}`,
                            borderRadius: isMobile ? 16 : 24,
                            padding: isMobile ? "24px 16px" : "48px 32px",
                            position: "relative",
                            display: "flex",
                            flexDirection: "column",
                            boxShadow: `0 40px 100px rgba(0,0,0,0.6), 0 0 40px ${addAlpha(selectedCategory.colors[0], "11")}`
                        }}
                    >
                        {/* Modal Header */}
                        <div style={{ marginBottom: isMobile ? 24 : 40, borderBottom: `1px solid ${t.border}`, paddingBottom: isMobile ? 16 : 24 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                <div>
                                    <div style={{ ...FONTS.mono, color: selectedCategory.colors[0], fontSize: "0.7rem", marginBottom: 6 }}>CATEGORY</div>
                                    <H2 style={{ fontSize: isMobile ? "1.4rem" : "1.8rem", margin: 0 }}>{selectedCategory.title}</H2>
                                </div>
                                <button
                                    onClick={closeModal}
                                    style={{
                                        background: t.surface,
                                        border: `1px solid ${addAlpha(selectedCategory.colors[0], "44")}`,
                                        color: t.textHi,
                                        ...FONTS.mono,
                                        cursor: "pointer",
                                        fontSize: "0.6rem",
                                        padding: "6px 12px",
                                        borderRadius: 8
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.borderColor = t.borderHi}
                                    onMouseLeave={e => e.currentTarget.style.borderColor = t.border}
                                >
                                    CLOSE
                                </button>
                            </div>
                        </div>

                        {/* Scrolling Content */}
                        <div style={{
                            overflowY: "auto",
                            paddingRight: 6,
                            display: "grid",
                            gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(280px, 1fr))",
                            gap: isMobile ? "20px" : "24px"
                        }}>
                            {selectedCategory.projects.map((proj, idx) => (
                                <FlippableProjectCard
                                    key={idx}
                                    index={idx}
                                    project={proj}
                                    theme={t}
                                    primaryColor={selectedCategory.colors[0]}
                                    categoryAnchorId={selectedCategory.anchorId}
                                    onOpen={openProjectCard}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
