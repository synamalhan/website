import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Seo from "../components/Seo";
import { useTheme } from "../theme/ThemeContext";
import { FONTS } from "../components/styles";
import Tag from "../components/ui/Tag";
import PageNav from "../components/PageNav";
import ProjectImage from "../components/ProjectImage";
import { useIsMobile } from "../hooks/useMediaQuery";
import { projects, categories, skills } from "../data/portfolio";
import { statusLabel } from "../data/format";

const catTitle = type => categories.find(c => c.type === type)?.title;
const years = [...new Set(projects.map(p => p.year).filter(Boolean))].sort((a, b) => b - a);
const usedSkills = skills.filter(s => projects.some(p => p.skills.includes(s.id)));
const usedCats = categories.filter(c => projects.some(p => p.category === c.type));

export default function ArchivePage() {
    const { theme: t } = useTheme();
    const isMobile = useIsMobile();
    const [q, setQ] = useState("");
    const [cat, setCat] = useState("");
    const [year, setYear] = useState("");
    const [params] = useSearchParams();
    const [skill, setSkill] = useState(params.get("skill") || "");

    const list = useMemo(() => {
        const needle = q.trim().toLowerCase();
        return projects
            .filter(p => (!cat || p.category === cat) && (!year || String(p.year) === year) && (!skill || p.skills.includes(skill))
                && (!needle || [p.title, p.summary, ...p.stack].join(" ").toLowerCase().includes(needle)))
            .sort((a, b) => (b.featured - a.featured) || ((a.featuredRank ?? 99) - (b.featuredRank ?? 99)) || ((b.year ?? 0) - (a.year ?? 0)));
    }, [q, cat, year, skill]);

    const field = { ...FONTS.inter, fontSize: "1rem", padding: "10px 12px", background: t.surface, color: t.text, border: `1px solid ${t.border}`, borderRadius: 8 };
    const link = { color: t.accent, ...FONTS.mono, fontSize: ".85rem", letterSpacing: ".1em" };
    const reset = () => { setQ(""); setCat(""); setYear(""); setSkill(""); };
    const pick = (s, c) => { setSkill(s); setCat(c); setQ(""); setYear(""); document.getElementById("results")?.scrollIntoView({ behavior: "smooth" }); };

    const active = q.trim() || cat || year || skill;
    const catColor = type => categories.find(c => c.type === type)?.colors[0] || t.accent;
    const chip = on => ({ ...FONTS.inter, fontSize: ".92rem", padding: "7px 14px", borderRadius: 999, cursor: "pointer", whiteSpace: "nowrap",
        background: on ? t.accent : "transparent", color: on ? "#fff" : t.text, border: `1px solid ${on ? t.accent : t.border}` });
    const Row = ({ p }) => (
        <li className="hover-card" style={{ background: t.surface, border: `1px solid ${t.border}`, borderLeft: `4px solid ${catColor(p.category)}`, borderRadius: 12, padding: "14px 16px", display: "grid", gap: 8 }}>
            <Link to={`/projects/${p.id}`} style={{ ...FONTS.inter, fontWeight: 600, fontSize: "1.05rem", lineHeight: 1.35, color: t.textHi, textDecoration: "none" }}>{p.title}</Link>
            <div style={{ ...FONTS.mono, fontSize: ".75rem", color: t.textMute }}>
                {catTitle(p.category)}{p.year ? ` · ${p.year}` : ""}{p.status === "in-progress" ? <span style={{ color: t.gold }}> · IN PROGRESS</span> : ""}
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                {p.stack.slice(0, 3).map(x => <Tag key={x}>{x}</Tag>)}
                {p.featured && <Link to="/#featured" style={{ ...link, textDecoration: "none" }} aria-label="Featured project">★</Link>}
            </div>
        </li>
    );
    const FeaturedCard = ({ p }) => (
        <li style={{ listStyle: "none" }}>
            <Link to={`/projects/${p.id}`} className="hover-card" style={{ display: "grid", gap: 10, padding: 12, textDecoration: "none", background: t.surface, border: `1px solid ${t.border}`, borderRadius: 14, height: "100%" }}>
                <ProjectImage project={p} ratio="16 / 10" />
                <div style={{ padding: "0 4px 4px" }}>
                    <div style={{ ...FONTS.inter, fontWeight: 600, color: t.textHi, lineHeight: 1.3 }}>{p.title}</div>
                    <div style={{ ...FONTS.mono, fontSize: ".72rem", color: p.status === "in-progress" ? t.gold : t.textMute, marginTop: 6 }}>{p.status === "in-progress" ? "IN PROGRESS · " : ""}{catTitle(p.category)}</div>
                </div>
            </Link>
        </li>
    );
    const grid = n => ({ listStyle: "none", display: "grid", gridTemplateColumns: isMobile ? "minmax(0,1fr)" : `repeat(${n}, minmax(0, 1fr))`, gap: 14 });
    const featuredList = list.filter(p => p.featured), rest = list.filter(p => !p.featured);
    const h2 = { ...FONTS.mono, fontSize: ".8rem", letterSpacing: ".16em", color: t.accent, margin: "32px 0 14px" };

    return (
        <>
            <PageNav current="projects" />
            <main style={{ position: "relative", zIndex: 10, maxWidth: 1100, margin: "0 auto", padding: "40px 20px 96px" }}>
                <Seo title="All Projects | Syna Malhan" description={`Archive of ${projects.length} projects across ML, computer vision, full-stack and iOS.`} path="/projects" />
                <h1 style={{ ...FONTS.orb, fontSize: "clamp(2rem,4.6vw,3.2rem)", color: t.textHi, lineHeight: 1.1 }}>ALL PROJECTS</h1>
                <p style={{ color: t.textMute, fontSize: "1.1rem", margin: "12px 0 28px" }}>{projects.length} projects across ML, vision, full-stack and iOS. Featured work comes first.</p>

                <div role="group" aria-label="Filter by category" style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
                    <button type="button" onClick={() => setCat("")} aria-pressed={!cat} style={chip(!cat)}>All</button>
                    {usedCats.map(c => <button key={c.type} type="button" onClick={() => setCat(cat === c.type ? "" : c.type)} aria-pressed={cat === c.type} style={chip(cat === c.type)}>
                        {c.title} · {projects.filter(p => p.category === c.type).length}</button>)}
                </div>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20 }} role="search">
                    <input aria-label="Search projects" placeholder="Search title, summary, tech" value={q} onChange={e => setQ(e.target.value)} style={{ ...field, flex: "1 1 260px" }} />
                    <select aria-label="Year" value={year} onChange={e => setYear(e.target.value)} style={field}>
                        <option value="">All years</option>{years.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                    <select aria-label="Skill" value={skill} onChange={e => setSkill(e.target.value)} style={field}>
                        <option value="">All skills</option>{usedSkills.map(sk => <option key={sk.id} value={sk.id}>{sk.label}</option>)}
                    </select>
                    {active && <button type="button" onClick={reset} style={{ ...field, cursor: "pointer" }}>Clear filters</button>}
                </div>

                <details className="hover-card" style={{ marginBottom: 8, background: t.surface, border: `1px solid ${t.border}`, borderRadius: 12, padding: "4px 16px" }}>
                    <summary style={{ ...link, cursor: "pointer", padding: "12px 0" }}>SKILLS × CATEGORIES MATRIX</summary>
                    <p style={{ color: t.textMute, margin: "0 0 12px", fontSize: ".95rem" }}>Projects using each skill, by category. Click a number to filter.</p>
                    <div style={{ overflowX: "auto", paddingBottom: 12 }}>
                        <table style={{ borderCollapse: "collapse", fontSize: ".92rem", color: t.text }}>
                            <thead><tr><th scope="col" style={{ textAlign: "left", padding: 6 }}>Skill</th>
                                {usedCats.map(c => <th key={c.type} scope="col" style={{ padding: 6, ...FONTS.mono, fontSize: ".68rem", maxWidth: 96, color: catColor(c.type) }}>{c.title}</th>)}</tr></thead>
                            <tbody>{usedSkills.map(sk => (
                                <tr key={sk.id} style={{ borderTop: `1px solid ${t.border}` }}>
                                    <th scope="row" style={{ textAlign: "left", padding: 6, fontWeight: 600, whiteSpace: "nowrap" }}>{sk.label}</th>
                                    {usedCats.map(c => {
                                        const n = projects.filter(p => p.category === c.type && p.skills.includes(sk.id)).length;
                                        return <td key={c.type} style={{ textAlign: "center", padding: 4 }}>
                                            {n ? <button type="button" onClick={() => pick(sk.id, c.type)} aria-label={`${sk.label} in ${c.title}: ${n}`}
                                                style={{ cursor: "pointer", minWidth: 34, padding: "5px 0", background: `${catColor(c.type)}${n > 4 ? "88" : n > 1 ? "55" : "2a"}`, color: t.textHi, border: "none", borderRadius: 6 }}>{n}</button> : ""}
                                        </td>;
                                    })}
                                </tr>))}
                            </tbody>
                        </table>
                    </div>
                </details>

                <div id="results" aria-live="polite" style={{ ...FONTS.mono, fontSize: ".85rem", color: t.textMute, margin: "20px 0 4px" }}>{list.length} of {projects.length} shown</div>
                {active ? (
                    <ul style={{ ...grid(2), marginTop: 14 }}>{list.map(p => <Row key={p.id} p={p} />)}</ul>
                ) : <>
                    <h2 style={h2}>★ FEATURED</h2>
                    <ul style={grid(3)}>{featuredList.map(p => <FeaturedCard key={p.id} p={p} />)}</ul>
                    <h2 style={h2}>EVERYTHING ELSE</h2>
                    <ul style={grid(2)}>{rest.map(p => <Row key={p.id} p={p} />)}</ul>
                </>}
                {list.length === 0 && <p style={{ color: t.textMute, marginTop: 20 }}>No projects match those filters.</p>}
            </main>
        </>
    );
}
