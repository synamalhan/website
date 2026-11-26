import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { useTheme } from "../theme/ThemeContext";
import { FONTS } from "../components/styles";
import Tag from "../components/ui/Tag";
import Navbar from "../sections/Navbar";
import Footer from "../sections/Footer";
import ProjectCover, { catColor as hue } from "../components/ProjectCover";
import { useIsMobile } from "../hooks/useMediaQuery";
import { projects, categories } from "../data/portfolio";
import { statusLabel } from "../data/format";

const catTitle = type => categories.find(c => c.type === type)?.title;
const years = [...new Set(projects.map(p => p.year).filter(Boolean))].sort((a, b) => b - a);
const usedCats = categories.filter(c => projects.some(p => p.category === c.type));

export default function ArchivePage() {
    const { theme: t } = useTheme();
    const isMobile = useIsMobile();
    const [q, setQ] = useState("");
    const [cat, setCat] = useState("");
    const [year, setYear] = useState("");

    const list = useMemo(() => {
        const needle = q.trim().toLowerCase();
        return projects
            .filter(p => (!cat || p.category === cat) && (!year || String(p.year) === year)
                && (!needle || [p.title, p.summary, ...p.stack].join(" ").toLowerCase().includes(needle)))
            .sort((a, b) => (b.featured - a.featured) || ((a.featuredRank ?? 99) - (b.featuredRank ?? 99)) || ((b.year ?? 0) - (a.year ?? 0)));
    }, [q, cat, year]);

    const field = { ...FONTS.inter, fontSize: "1rem", padding: "10px 12px", background: t.surface, color: t.text, border: `1px solid ${t.border}`, borderRadius: 8 };
    const link = { color: t.accent, ...FONTS.mono, fontSize: ".85rem", letterSpacing: ".1em" };
    const reset = () => { setQ(""); setCat(""); setYear(""); };

    const active = q.trim() || cat || year;
    const catColor = type => hue(t, type);
    const tab = on => ({ ...FONTS.inter, fontSize: "1rem", fontWeight: on ? 700 : 500, padding: "12px 2px", marginRight: 26, cursor: "pointer", whiteSpace: "nowrap", flex: "none",
        background: "none", border: "none", borderBottom: `2px solid ${on ? t.accent : "transparent"}`, color: on ? t.textHi : t.textMute });
    const Row = ({ p }) => (
        <li className="hover-card" style={{ background: `${catColor(p.category)}14`, border: `1px solid ${catColor(p.category)}44`, borderLeft: `4px solid ${catColor(p.category)}`, borderRadius: 12, padding: "14px 16px", display: "grid", gap: 8 }}>
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
            <Link to={`/projects/${p.id}`} className="hover-card" style={{ display: "grid", gap: 10, padding: 12, textDecoration: "none", background: `${catColor(p.category)}14`, border: `1px solid ${catColor(p.category)}55`, borderRadius: 14, height: "100%" }}>
                <ProjectCover p={p} />
                <div style={{ padding: "0 4px 4px" }}>
                    <div style={{ ...FONTS.inter, fontWeight: 600, color: t.textHi, lineHeight: 1.3 }}>{p.title}</div>
                    <div style={{ ...FONTS.mono, fontSize: ".72rem", color: p.status === "in-progress" ? t.gold : catColor(p.category), marginTop: 6 }}>{p.status === "in-progress" ? "IN PROGRESS · " : ""}{catTitle(p.category)}</div>
                </div>
            </Link>
        </li>
    );
    const grid = n => ({ listStyle: "none", display: "grid", gridTemplateColumns: isMobile ? "minmax(0,1fr)" : `repeat(${n}, minmax(0, 1fr))`, gap: 14 });
    const featuredList = list.filter(p => p.featured), rest = list.filter(p => !p.featured);
    const h2 = { ...FONTS.orb, fontSize: "1.4rem", color: t.textHi, margin: "48px 0 18px" };

    return (
        <>
            <Navbar navUp />
            <main style={{ position: "relative", zIndex: 10, maxWidth: 1100, margin: "0 auto", padding: "120px 20px 96px" }}>
                <Seo title="All Projects | Syna Malhan" description={`Archive of ${projects.length} projects across ML, computer vision, full-stack and iOS.`} path="/projects" />
                <h1 style={{ ...FONTS.orb, fontSize: "clamp(2.2rem,5vw,3.6rem)", color: t.textHi, lineHeight: 1.1 }}>WORK</h1>
                <p style={{ color: t.textMute, fontSize: "1.1rem", margin: "12px 0 28px" }}>Selected projects first, then everything else. Filter by category, year or tech.</p>

                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 8 }} role="search">
                    <input aria-label="Search projects" placeholder="Search projects" value={q} onChange={e => setQ(e.target.value)} style={{ ...field, flex: "1 1 260px" }} />
                    <select aria-label="Year" value={year} onChange={e => setYear(e.target.value)} style={field}>
                        <option value="">All years</option>{years.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                    {active && <button type="button" onClick={reset} style={{ ...field, cursor: "pointer" }}>Clear</button>}
                </div>
                <div role="group" aria-label="Filter by category" style={{ display: "flex", overflowX: "auto", borderBottom: `1px solid ${t.border}`, scrollbarWidth: "none" }}>
                    <button type="button" onClick={() => setCat("")} aria-pressed={!cat} style={tab(!cat)}>All</button>
                    {usedCats.map(c => <button key={c.type} type="button" onClick={() => setCat(cat === c.type ? "" : c.type)} aria-pressed={cat === c.type} style={tab(cat === c.type)}>{c.title}</button>)}
                </div>

                <div id="results" aria-live="polite" style={{ ...FONTS.mono, fontSize: ".85rem", color: t.textMute, margin: "16px 0 0" }}>{list.length} of {projects.length} projects</div>
                {active ? (
                    <ul style={{ ...grid(2), marginTop: 14 }}>{list.map(p => <Row key={p.id} p={p} />)}</ul>
                ) : <>
                    <h2 style={h2}>SELECTED WORK</h2>
                    <ul style={grid(3)}>{featuredList.map(p => <FeaturedCard key={p.id} p={p} />)}</ul>
                    <h2 style={h2}>MORE PROJECTS</h2>
                    <ul style={grid(2)}>{rest.map(p => <Row key={p.id} p={p} />)}</ul>
                </>}
                {list.length === 0 && <p style={{ color: t.textMute, marginTop: 20 }}>No projects match those filters.</p>}
            </main>
            <Footer />
        </>
    );
}
