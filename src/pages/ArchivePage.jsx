import { useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { useTheme } from "../theme/ThemeContext";
import { FONTS } from "../components/styles";
import Navbar from "../sections/Navbar";
import Footer from "../sections/Footer";
import ProjectCover, { catColor } from "../components/ProjectCover";
import { useIsMobile } from "../hooks/useMediaQuery";
import { projects, categories } from "../data/portfolio";

const SHOWN = 2;
const featured = projects.filter(p => p.featured).sort((a, b) => a.featuredRank - b.featuredRank);
const building = projects.filter(p => p.status === "in-progress");
// Strongest first: featured, then projects with measured results, a public repo, a write-up, and finally the newest.
const score = p => (p.featured ? 100 : 0) + (p.metrics?.length ? 10 : 0) + (p.links?.repo ? 5 : 0) + (p.caseStudy ? 3 : 0) + (p.year ?? 0) / 10000;
const groups = categories
    .map(c => ({ ...c, list: projects.filter(p => p.category === c.type && p.status !== "in-progress").sort((a, b) => score(b) - score(a)) }))
    .filter(g => g.list.length);

function Badge({ children, color, t }) {
    return <span style={{ ...FONTS.mono, fontSize: ".78rem", letterSpacing: ".08em", padding: "2px 8px", borderRadius: 6, color: t.textHi, background: `${color}26`, border: `1px solid ${color}66` }}>{children}</span>;
}

// Closed: just the topic. Flip it to see its projects, so the page stays calm until you ask for more.
function CategoryCard({ g, open, onMore }) {
    const { theme: t } = useTheme();
    const [flipped, setFlipped] = useState(!!open);
    const c = catColor(t, g.type);
    const shown = open ? g.list : g.list.slice(0, SHOWN);
    const face = { gridArea: "1 / 1", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", background: `${c}14`, border: `1px solid ${c}55`, borderTop: `5px solid ${c}`, borderRadius: 18, padding: "28px 28px 24px", display: "flex", flexDirection: "column" };
    const count = `${g.list.length} PROJECT${g.list.length > 1 ? "S" : ""}`;
    return (
        <section aria-label={g.title} style={{ perspective: 1400, display: "grid" }}>
            <div style={{ display: "grid", minHeight: open ? undefined : 400, transformStyle: "preserve-3d", transition: "transform .6s cubic-bezier(.3,.7,.2,1)", transform: flipped ? "rotateY(180deg)" : "none" }}>
                {/* FRONT */}
                <button type="button" inert={flipped} onClick={() => setFlipped(true)} aria-label={`${g.title}: show ${g.list.length} projects`}
                    style={{ ...face, background: `${c}14`, cursor: "pointer", textAlign: "left", justifyContent: "center", minHeight: 170, color: "inherit" }}>
                    <span style={{ ...FONTS.orb, fontWeight: 800, fontSize: "1.55rem", lineHeight: 1.15, color: t.textHi }}>{g.title}</span>
                    <span style={{ ...FONTS.mono, fontSize: ".9rem", letterSpacing: ".1em", color: c, margin: "8px 0 14px" }}>{count}</span>
                    <span style={{ ...FONTS.mono, fontSize: ".85rem", letterSpacing: ".12em", color: t.textMute }}>FLIP TO SEE THEM ↻</span>
                </button>
                {/* BACK */}
                <div inert={!flipped} style={{ ...face, transform: "rotateY(180deg)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 14 }}>
                        <div>
                            <h2 style={{ ...FONTS.orb, fontWeight: 800, fontSize: "1.3rem", lineHeight: 1.15, color: t.textHi }}>{g.title}</h2>
                            <div style={{ ...FONTS.mono, fontSize: ".85rem", letterSpacing: ".1em", color: c, marginTop: 4 }}>{count}</div>
                        </div>
                        <button type="button" onClick={() => setFlipped(false)} aria-label={`Flip ${g.title} back`} style={{ ...FONTS.mono, fontSize: ".85rem", letterSpacing: ".1em", color: c, background: "none", border: `1px solid ${c}66`, borderRadius: 8, padding: "6px 10px", cursor: "pointer", flex: "none" }}>BACK ↻</button>
                    </div>
                    <ul style={{ listStyle: "none", display: "grid", gap: 14, flex: 1 }}>
                        {shown.map(p => (
                            <li key={p.id}>
                                <Link to={`/projects/${p.id}`} style={{ display: "block", padding: "12px 14px", borderRadius: 12, background: t.surface, border: `1px solid ${t.border}`, textDecoration: "none" }}>
                                    <div style={{ ...FONTS.inter, fontWeight: 700, fontSize: "1.02rem", lineHeight: 1.3, color: t.textHi }}>{p.title}</div>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center", marginTop: 8 }}>
                                        {p.year && <span style={{ ...FONTS.mono, fontSize: ".85rem", color: t.textMute }}>{p.year}</span>}
                                        {p.internship && <Badge color={t.gold} t={t}>INTERNSHIP</Badge>}
                                        {p.metrics?.length > 0 && <Badge color={t.green} t={t}>RESULTS</Badge>}
                                        {p.links?.repo && <Badge color={c} t={t}>REPO</Badge>}
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    {g.list.length > SHOWN && !open && (
                        <button type="button" onClick={onMore} style={{ ...FONTS.mono, fontSize: ".9rem", letterSpacing: ".1em", color: c, background: "none", border: "none", cursor: "pointer", padding: "14px 0 0", textAlign: "left" }}>
                            {`+ ${g.list.length - SHOWN} MORE →`}
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
}

export default function ArchivePage() {
    const { theme: t } = useTheme();
    const isMobile = useIsMobile();
    const [cat, setCat] = useState("");
    const tab = on => ({ ...FONTS.inter, fontSize: "1.05rem", fontWeight: on ? 800 : 600, padding: "12px 2px", marginRight: 26, cursor: "pointer", whiteSpace: "nowrap", flex: "none",
        background: "none", border: "none", borderBottom: `3px solid ${on ? t.accent : "transparent"}`, color: on ? t.textHi : t.textMute });
    const h2 = { ...FONTS.orb, fontWeight: 800, fontSize: "1.6rem", color: t.textHi, margin: "0 0 24px" };
    const [soon, setSoon] = useState(false);
    // "+ N more" opens that topic's tab (all its projects) and scrolls to the tabs.
    const showTab = type => { setCat(type); document.getElementById("topics")?.scrollIntoView({ behavior: "smooth", block: "start" }); };
    const shown = cat ? groups.filter(g => g.type === cat) : groups;
    return (
        <>
            <Navbar navUp />
            <main style={{ position: "relative", zIndex: 10, maxWidth: 1100, margin: "0 auto", padding: "120px 20px 96px" }}>
                <Seo title="Work | Syna Malhan" description={`${projects.length} projects across ML, computer vision, full-stack and iOS, grouped by topic.`} path="/projects" />
                <h1 style={{ ...FONTS.orb, fontWeight: 800, fontSize: "clamp(2.4rem,5.4vw,4rem)", color: t.textHi, lineHeight: 1.1 }}>WORK</h1>

                <h2 style={h2}>SELECTED WORK</h2>
                <ul style={{ listStyle: "none", display: "grid", gridTemplateColumns: isMobile ? "minmax(0,1fr)" : "repeat(3, minmax(0, 1fr))", gap: 24 }}>
                    {featured.map(p => {
                        const c = catColor(t, p.category);
                        return (
                            <li key={p.id}>
                                <Link to={`/projects/${p.id}`} className="hover-card" style={{ display: "grid", gap: 10, padding: 12, textDecoration: "none", background: `${c}14`, border: `1px solid ${c}55`, borderRadius: 14, height: "100%", alignContent: "start" }}>
                                    <ProjectCover p={p} />
                                    <div style={{ padding: "0 4px 4px" }}>
                                        <div style={{ ...FONTS.inter, fontWeight: 700, color: t.textHi, lineHeight: 1.3 }}>{p.title}</div>
                                        <div style={{ ...FONTS.mono, fontSize: ".85rem", color: c, marginTop: 6 }}>{categories.find(x => x.type === p.category)?.title}</div>
                                    </div>
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                <div id="topics" role="group" aria-label="Filter by category" style={{ scrollMarginTop: 80, display: "flex", overflowX: "auto", borderBottom: `1px solid ${t.border}`, scrollbarWidth: "none", margin: "80px 0 36px" }}>
                    <button type="button" onClick={() => setCat("")} aria-pressed={!cat} style={tab(!cat)}>All</button>
                    {groups.map(g => <button key={g.type} type="button" onClick={() => setCat(cat === g.type ? "" : g.type)} aria-pressed={cat === g.type} style={tab(cat === g.type)}>{g.title}</button>)}
                </div>

                <div style={{ display: "grid", gridTemplateColumns: isMobile || cat ? "minmax(0,1fr)" : "repeat(2, minmax(0, 1fr))", gap: 32, alignItems: "stretch" }}>
                    {shown.map(g => <CategoryCard key={g.type + cat} g={g} open={!!cat} onMore={() => showTab(g.type)} />)}
                </div>

                {building.length > 0 && (
                    <section aria-label="Still to be made" style={{ marginTop: 88, borderRadius: 18, border: `2px dashed ${t.gold}88`, background: `${t.gold}10`, overflow: "hidden" }}>
                        <button type="button" onClick={() => setSoon(o => !o)} aria-expanded={soon} style={{ ...FONTS.orb, fontWeight: 800, fontSize: "1.4rem", color: t.textHi, background: "none", border: "none", cursor: "pointer", width: "100%", textAlign: "left", padding: "24px 28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span>STILL TO BE MADE <span style={{ ...FONTS.mono, fontSize: ".95rem", color: t.gold }}>({building.length})</span></span>
                            <span aria-hidden style={{ color: t.gold, transition: "transform .3s", transform: soon ? "rotate(180deg)" : "none" }}>▾</span>
                        </button>
                        {soon && <div style={{ padding: "0 28px 28px" }}>
                            <p style={{ color: t.textMute, fontSize: "1rem", lineHeight: 1.6, margin: "0 0 20px" }}>In progress right now. No results are reported for these until they are measured.</p>
                            <ul style={{ listStyle: "none", display: "grid", gridTemplateColumns: isMobile ? "minmax(0,1fr)" : "repeat(2, minmax(0, 1fr))", gap: 16 }}>
                                {building.map(p => (
                                    <li key={p.id}>
                                        <Link to={`/projects/${p.id}`} className="hover-card" style={{ display: "block", padding: "14px 16px", borderRadius: 12, background: t.surface, border: `1px solid ${t.border}`, borderLeft: `4px solid ${catColor(t, p.category)}`, textDecoration: "none" }}>
                                            <div style={{ ...FONTS.inter, fontWeight: 700, fontSize: "1.02rem", lineHeight: 1.3, color: t.textHi }}>{p.title}</div>
                                            <div style={{ ...FONTS.mono, fontSize: ".85rem", letterSpacing: ".08em", color: t.gold, marginTop: 8 }}>IN PROGRESS · {categories.find(c => c.type === p.category)?.title.toUpperCase()}</div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>}
                    </section>
                )}
            </main>
            <Footer />
        </>
    );
}
