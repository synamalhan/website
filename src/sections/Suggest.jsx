import { useEffect, useState } from "react";
import { useTheme } from "../theme/ThemeContext";
import { FONTS } from "../components/styles";
import { useIsMobile } from "../hooks/useMediaQuery";

const API = () => window.location.hostname === "localhost" ? "http://localhost:3001" : (import.meta.env.VITE_API_URL || "http://localhost:3001");

// Songs come from Spotify's catalog (via our server), books from Open Library. Goodreads has no search API.
const search = (kind, q) => kind === "song"
    ? fetch(`${API()}/api/search-song?q=${encodeURIComponent(q)}`).then(r => r.json())
    : fetch(`https://openlibrary.org/search.json?limit=5&fields=title,author_name,cover_i&q=${encodeURIComponent(q)}`).then(r => r.json())
        .then(d => d.docs.map(b => ({ title: b.title, sub: b.author_name?.[0] || "", img: b.cover_i && `https://covers.openlibrary.org/b/id/${b.cover_i}-S.jpg` })));

const KINDS = { song: { icon: "♪", label: "Song", ph: "Search Spotify for a song..." }, book: { icon: "▤", label: "Book", ph: "Search for a book..." } };

// Visitors suggest a song or book; I read them in the Supabase table (never shown publicly).
export default function Suggest() {
    const { theme: t } = useTheme();
    const isMobile = useIsMobile();
    const [f, setF] = useState({ kind: "song", message: "", name: "", website: "" });
    const [sel, setSel] = useState(null);
    const [hits, setHits] = useState([]);
    const [state, setState] = useState({ status: "idle", text: "" });
    const color = f.kind === "song" ? "#1DB954" : t.cyan;

    useEffect(() => {
        const q = f.message.trim();
        if (sel || q.length < 2) return setHits([]);
        const id = setTimeout(() => search(f.kind, q).then(setHits).catch(() => setHits([])), 300);
        return () => clearTimeout(id);
    }, [f.message, f.kind, sel]);

    const pick = h => { setSel(h); setHits([]); setF(x => ({ ...x, message: `${h.title} - ${h.sub}` })); };
    const clear = () => { setSel(null); setF(x => ({ ...x, message: "" })); };
    const submit = async e => {
        e.preventDefault();
        setState({ status: "sending", text: "Sending..." });
        try {
            const r = await fetch(`${API()}/api/guestbook`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) });
            const d = await r.json();
            if (!r.ok) return setState({ status: "error", text: d.error || "Something went wrong." });
            clear();
            setState({ status: "done", text: "" });
        } catch { setState({ status: "error", text: "Could not reach the server, try again in a minute." }); }
    };

    const input = { ...FONTS.inter, boxSizing: "border-box", width: "100%", padding: "13px 15px", borderRadius: 12, border: `1px solid ${t.border}`, background: t.bg, color: t.textHi, fontSize: ".95rem", boxShadow: "inset 0 2px 4px rgba(0,0,0,.25)" };
    const thumb = h => h.img ? <img src={h.img} alt="" width={40} height={40} style={{ borderRadius: 6, objectFit: "cover", flex: "none" }} /> : <span style={{ width: 40, height: 40, flex: "none", borderRadius: 6, background: t.border }} />;

    return (
        <div className="hover-card" style={{ gridColumn: "1 / -1", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "minmax(0,.8fr) minmax(0,1.4fr)", gap: isMobile ? 18 : 32, alignItems: "center", padding: isMobile ? 20 : 28, background: t.surface, border: `1px solid ${t.border}`, borderLeft: `4px solid ${color}`, borderRadius: 18 }}>
            <div>
                <div style={{ ...FONTS.mono, fontSize: ".68rem", letterSpacing: ".14em", color }}>YOUR TURN</div>
                <div style={{ ...FONTS.orb, fontSize: isMobile ? "1.35rem" : "1.6rem", fontWeight: 800, color: t.textHi, margin: "8px 0", lineHeight: 1.15 }}>Got a song or book for me?</div>
                <p style={{ margin: 0, color: t.textMute, lineHeight: 1.6, fontSize: ".95rem" }}>Search for it and send it over. The best ones end up on my playlist and shelf.</p>
            </div>

            {state.status === "done" ? (
                <div style={{ textAlign: "center", padding: "18px 0" }}>
                    <div style={{ fontSize: "2rem", color }}>{KINDS[f.kind].icon}</div>
                    <div style={{ ...FONTS.inter, fontWeight: 700, color: t.textHi, margin: "6px 0" }}>Added to my list. Thank you!</div>
                    <button type="button" onClick={() => setState({ status: "idle", text: "" })} style={{ ...FONTS.mono, fontSize: ".75rem", letterSpacing: 2, background: "none", border: "none", color, cursor: "pointer" }}>SUGGEST ANOTHER</button>
                </div>
            ) : (
                <form onSubmit={submit} style={{ display: "grid", gap: 12 }}>
                    <div role="tablist" aria-label="Suggestion type" style={{ display: "flex", gap: 6, padding: 4, borderRadius: 12, background: t.bg, width: "fit-content" }}>
                        {Object.entries(KINDS).map(([k, v]) => (
                            <button key={k} type="button" role="tab" aria-selected={f.kind === k} onClick={() => { setF({ ...f, kind: k, message: "" }); setSel(null); }}
                                style={{ ...FONTS.mono, fontSize: ".78rem", letterSpacing: 1.5, padding: "8px 16px", borderRadius: 9, border: "none", cursor: "pointer", background: f.kind === k ? color : "transparent", color: f.kind === k ? "#fff" : t.textMute, boxShadow: f.kind === k ? "0 3px 0 rgba(0,0,0,.3)" : "none" }}>
                                {v.icon} {v.label.toUpperCase()}
                            </button>
                        ))}
                    </div>

                    {sel ? (
                        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: 10, borderRadius: 12, border: `1px solid ${color}`, background: t.bg }}>
                            {thumb(sel)}
                            <div style={{ minWidth: 0, flex: 1 }}>
                                <div style={{ ...FONTS.inter, fontWeight: 700, color: t.textHi, fontSize: ".95rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{sel.title}</div>
                                <div style={{ ...FONTS.inter, color: t.textMute, fontSize: ".82rem" }}>{sel.sub}</div>
                            </div>
                            <button type="button" aria-label="Choose a different one" onClick={clear} style={{ background: "none", border: "none", color: t.textMute, fontSize: "1.3rem", cursor: "pointer", padding: "0 6px" }}>×</button>
                        </div>
                    ) : (
                        <div style={{ position: "relative" }}>
                            <input aria-label="Search" required minLength={2} maxLength={400} autoComplete="off" placeholder={KINDS[f.kind].ph} value={f.message} onChange={e => setF({ ...f, message: e.target.value })} style={input} />
                            {hits.length > 0 && (
                                <ul style={{ position: "absolute", top: "100%", left: 0, right: 0, zIndex: 20, margin: "6px 0 0", padding: 6, listStyle: "none", background: t.surface, border: `1px solid ${t.border}`, borderRadius: 12, boxShadow: "0 16px 30px rgba(0,0,0,.45)" }}>
                                    {hits.map((h, i) => (
                                        <li key={i}>
                                            <button type="button" onClick={() => pick(h)} style={{ display: "flex", gap: 12, alignItems: "center", width: "100%", padding: 8, border: "none", background: "transparent", cursor: "pointer", textAlign: "left", color: t.textHi, borderRadius: 8 }}
                                                onMouseEnter={e => e.currentTarget.style.background = t.bg} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                                                {thumb(h)}
                                                <span style={{ ...FONTS.inter, fontSize: ".9rem", lineHeight: 1.3, minWidth: 0 }}><b>{h.title}</b><br /><span style={{ color: t.textMute }}>{h.sub}</span></span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}

                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                        <input aria-label="Your name" maxLength={40} placeholder="Your name (optional)" value={f.name} onChange={e => setF({ ...f, name: e.target.value })} style={{ ...input, flex: "1 1 160px", width: "auto" }} />
                        <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={f.website} onChange={e => setF({ ...f, website: e.target.value })} style={{ position: "absolute", left: "-9999px" }} />
                        <button type="submit" disabled={state.status === "sending"} style={{ ...FONTS.mono, letterSpacing: 2, padding: "13px 24px", borderRadius: 12, border: "none", cursor: "pointer", background: color, color: "#fff", boxShadow: "0 4px 0 rgba(0,0,0,.35)", flex: isMobile ? "1 1 100%" : "none" }}>SEND IT</button>
                    </div>
                    <span role="status" style={{ ...FONTS.mono, fontSize: ".75rem", color: state.status === "error" ? "#ff6b6b" : t.textMute, minHeight: "1em" }}>{state.text}</span>
                </form>
            )}
        </div>
    );
}
