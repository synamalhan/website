import { Link, useParams } from "react-router-dom";
import Seo from "../components/Seo";
import { useTheme } from "../theme/ThemeContext";
import { FONTS } from "../components/styles";
import { useIsMobile } from "../hooks/useMediaQuery";
import Tag from "../components/ui/Tag";
import PageNav from "../components/PageNav";
import { projects, categories } from "../data/portfolio";
import { projectImage } from "../data/assets";
import { statusLabel } from "../data/format";

const featured = projects.filter(p => p.featured).sort((a, b) => a.featuredRank - b.featuredRank);

export default function ProjectPage() {
    const { theme: t } = useTheme();
    const isMobile = useIsMobile();
    const { id } = useParams();
    const p = projects.find(x => x.id === id);
    if (!p) return <main style={{ padding: 40, position: "relative", zIndex: 10 }}><Link to="/">← Back home</Link></main>;

    const cs = p.caseStudy;
    const cat = categories.find(c => c.type === p.category);
    const color = cat?.colors[0] || t.accent;
    const status = statusLabel(p);
    const diagram = p.images.find(i => i.kind === "diagram");
    const fi = featured.findIndex(x => x.id === p.id);
    const prev = fi >= 0 && featured[(fi - 1 + featured.length) % featured.length];
    const next = fi >= 0 && featured[(fi + 1) % featured.length];

    const card = { background: t.surface, border: `1px solid ${t.border}`, borderRadius: 16, padding: "22px 24px" };
    const body = { fontSize: "1.05rem", lineHeight: 1.75, color: t.text, maxWidth: "68ch" };
    const eyebrow = { ...FONTS.mono, fontSize: ".78rem", letterSpacing: ".16em", color };
    const Sec = ({ title, children }) => <section style={{ marginTop: 44 }}><h2 style={{ ...eyebrow, marginBottom: 14 }}>{title}</h2>{children}</section>;
    const btn = primary => ({ ...FONTS.mono, fontSize: ".8rem", letterSpacing: ".1em", textDecoration: "none", padding: "11px 18px", borderRadius: 10,
        background: primary ? t.accent : "transparent", color: primary ? "#fff" : t.textHi, border: `1px solid ${primary ? t.accent : t.borderHi}` });

    return (
        <>
            <PageNav current="featured" />
            <main style={{ position: "relative", zIndex: 10, maxWidth: 1100, margin: "0 auto", padding: "40px 20px 96px" }}>
                <Seo title={`${p.title} | Syna Malhan`} description={p.summary} path={`/projects/${p.id}`} />

                <header>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", marginBottom: 16 }}>
                        <span style={{ ...eyebrow, padding: "5px 12px", border: `1px solid ${color}`, borderRadius: 999 }}>{cat?.title.toUpperCase()}</span>
                        {p.year && <span style={{ ...FONTS.mono, fontSize: ".78rem", color: t.textMute }}>{p.year}</span>}
                        {status && <span style={{ ...FONTS.mono, fontSize: ".78rem", letterSpacing: ".06em", color: t.gold, padding: "5px 12px", border: `1px solid ${t.gold}`, borderRadius: 999 }}>{status.toUpperCase()}</span>}
                    </div>
                    <h1 style={{ ...FONTS.orb, fontSize: "clamp(2rem,4.6vw,3.2rem)", color: t.textHi, lineHeight: 1.12, maxWidth: "20ch" }}>{p.title}</h1>
                    <p style={{ ...body, color: t.textMute, fontSize: "1.2rem", marginTop: 18 }}>{p.summary}</p>
                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 26 }}>
                        {p.links.repo && <a href={p.links.repo} style={btn(true)}>VIEW REPOSITORY ↗</a>}
                        {p.links.demo && <a href={p.links.demo} style={btn(false)}>LIVE DEMO ↗</a>}
                        {p.links.video && <a href={p.links.video} style={btn(false)}>WATCH DEMO ↗</a>}
                    </div>
                </header>

                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "minmax(0,1fr)" : "minmax(0,1fr) 270px", gap: 40, alignItems: "start" }}>
                    <div>
                        {diagram && (
                            <Sec title="ARCHITECTURE">
                                <figure style={{ margin: 0 }}>
                                    <img src={projectImage(diagram.src)} alt={diagram.alt} style={{ width: "100%", display: "block", borderRadius: 14, border: `1px solid ${t.border}`, background: "#fff" }} />
                                    <figcaption style={{ ...FONTS.mono, fontSize: ".75rem", color: t.textMute, marginTop: 10 }}>Diagram from the project repository.</figcaption>
                                </figure>
                            </Sec>
                        )}

                        {cs ? <>
                            <Sec title="PROBLEM"><p style={body}>{cs.problem}</p></Sec>
                            <Sec title="KEY DECISIONS AND TRADE-OFFS">
                                <div style={{ display: "grid", gap: 14 }}>
                                    {cs.decisions.map((x, i) => (
                                        <div key={x.choice} className="hover-card" style={{ ...card, display: "grid", gridTemplateColumns: isMobile ? "minmax(0,1fr)" : "1fr 1fr", gap: isMobile ? 12 : 28, borderLeft: `4px solid ${color}` }}>
                                            <div>
                                                <div style={{ ...FONTS.mono, fontSize: ".72rem", letterSpacing: ".14em", color: t.textMute, marginBottom: 6 }}>DECISION {i + 1}</div>
                                                <div style={{ fontSize: "1.02rem", lineHeight: 1.55, color: t.textHi, fontWeight: 600 }}>{x.choice}</div>
                                            </div>
                                            <div>
                                                <div style={{ ...FONTS.mono, fontSize: ".72rem", letterSpacing: ".14em", color: t.textMute, marginBottom: 6 }}>TRADE-OFF</div>
                                                <div style={{ fontSize: "1rem", lineHeight: 1.6, color: t.text }}>{x.tradeoff}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Sec>
                            <Sec title="RESULT">
                                {p.metrics.length > 0 && (
                                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 14, marginBottom: 18 }}>
                                        {p.metrics.map(m => (
                                            <div key={m.label} className="hover-card" style={card}>
                                                <div style={{ ...FONTS.orb, fontSize: "1.45rem", fontWeight: 800, color: t.textHi, lineHeight: 1.2 }}>{m.value}</div>
                                                <div style={{ fontSize: ".92rem", color: t.textMute, marginTop: 8, lineHeight: 1.45 }}>{m.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <p style={body}>{cs.result || (status ? "Not built yet. No results are reported until they are measured." : "No measured results are published for this project yet.")}</p>
                            </Sec>
                        </> : <Sec title="OVERVIEW"><p style={body}>{p.details}</p></Sec>}
                    </div>

                    <aside style={{ ...card, position: isMobile ? "static" : "sticky", top: 84, marginTop: isMobile ? 0 : 44, display: "grid", gap: 22 }} aria-label="Project facts">
                        {cs && <div><div style={{ ...eyebrow, marginBottom: 8 }}>MY ROLE</div><div style={{ fontSize: ".98rem", lineHeight: 1.55, color: t.text }}>{cs.role}</div></div>}
                        <div>
                            <div style={{ ...eyebrow, marginBottom: 10 }}>STACK</div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{p.stack.map(s => <Tag key={s}>{s}</Tag>)}</div>
                        </div>
                        {p.links.repo && <a href={p.links.repo} style={{ ...eyebrow, color: t.accent, textDecoration: "none" }}>GITHUB ↗</a>}
                    </aside>
                </div>

                <nav aria-label="More projects" style={{ marginTop: 72, paddingTop: 24, borderTop: `1px solid ${t.border}`, display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
                    {prev ? <Link to={`/projects/${prev.id}`} style={{ textDecoration: "none", color: t.textHi }}><div style={{ ...eyebrow, color: t.textMute }}>← PREVIOUS FEATURED</div><div style={{ marginTop: 4, fontWeight: 600 }}>{prev.title}</div></Link> : <span />}
                    <Link to="/projects" style={{ ...btn(false), alignSelf: "center" }}>ALL {projects.length} PROJECTS</Link>
                    {next ? <Link to={`/projects/${next.id}`} style={{ textDecoration: "none", color: t.textHi, textAlign: "right" }}><div style={{ ...eyebrow, color: t.textMute }}>NEXT FEATURED →</div><div style={{ marginTop: 4, fontWeight: 600 }}>{next.title}</div></Link> : <span />}
                </nav>
            </main>
        </>
    );
}
