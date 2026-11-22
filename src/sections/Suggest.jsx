import { useEffect, useState } from "react";
import { useTheme } from "../theme/ThemeContext";
import { FONTS } from "../components/styles";

const API = () => window.location.hostname === "localhost" ? "http://localhost:3001" : (import.meta.env.VITE_API_URL || "http://localhost:3001");

// Songs come from Spotify's catalog (via our server), books from Open Library. Goodreads has no search API.
const search = (kind, q) => kind === "song"
    ? fetch(`${API()}/api/search-song?q=${encodeURIComponent(q)}`).then(r => r.json())
    : fetch(`https://openlibrary.org/search.json?limit=5&fields=title,author_name,cover_i&q=${encodeURIComponent(q)}`).then(r => r.json())
        .then(d => d.docs.map(b => ({ title: b.title, sub: b.author_name?.[0] || "", img: b.cover_i && `https://covers.openlibrary.org/b/id/${b.cover_i}-S.jpg` })));

// Visitors suggest a song or book; I read them in the Supabase table (never shown publicly).
export default function Suggest() {
    const { theme: t } = useTheme();
    const [f, setF] = useState({ kind: "song", message: "", name: "", website: "" });
    const [msg, setMsg] = useState("");
    const [hits, setHits] = useState([]);
    const [picked, setPicked] = useState(false);

    useEffect(() => {
        const q = f.message.trim();
        if (picked || q.length < 2) return setHits([]);
        const id = setTimeout(() => search(f.kind, q).then(setHits).catch(() => setHits([])), 300);
        return () => clearTimeout(id);
    }, [f.message, f.kind, picked]);
    const submit = async e => {
        e.preventDefault();
        setMsg("Sending...");
        try {
            const r = await fetch(`${API()}/api/guestbook`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) });
            const d = await r.json();
            if (!r.ok) return setMsg(d.error || "Something went wrong.");
            setF({ ...f, message: "" }); setPicked(false);
            setMsg("Got it, thank you! It goes on my list.");
        } catch { setMsg("Could not reach the server, try again in a minute."); }
    };
    const input = { ...FONTS.inter, boxSizing: "border-box", padding: "11px 13px", borderRadius: 10, border: `1px solid ${t.border}`, background: t.bg, color: t.textHi, fontSize: ".92rem" };
    return (
        <form onSubmit={submit} className="hover-card" style={{ gridColumn: "1 / -1", display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", padding: 16, background: t.surface, border: `1px solid ${t.border}`, borderLeft: `4px solid ${t.accent}`, borderRadius: 16 }}>
            <div style={{ ...FONTS.mono, fontSize: ".68rem", letterSpacing: ".14em", color: t.accent, flexBasis: "100%" }}>GOT A RECOMMENDATION?</div>
            <select aria-label="Type" value={f.kind} onChange={e => { setF({ ...f, kind: e.target.value, message: "" }); setPicked(false); }} style={input}>
                <option value="song">Song</option>
                <option value="book">Book</option>
            </select>
            <div style={{ position: "relative", flex: "2 1 220px", display: "flex" }}>
                <input aria-label="Title and artist or author" required minLength={2} maxLength={400} autoComplete="off" placeholder={f.kind === "song" ? "Search a song..." : "Search a book..."} value={f.message} onChange={e => { setF({ ...f, message: e.target.value }); setPicked(false); }} style={{ ...input, width: "100%" }} />
                {hits.length > 0 && (
                    <ul style={{ position: "absolute", top: "100%", left: 0, right: 0, zIndex: 20, margin: "4px 0 0", padding: 4, listStyle: "none", background: t.surface, border: `1px solid ${t.border}`, borderRadius: 10, boxShadow: "0 12px 24px rgba(0,0,0,.4)" }}>
                        {hits.map((h, i) => (
                            <li key={i}>
                                <button type="button" onClick={() => { setF({ ...f, message: `${h.title} - ${h.sub}` }); setPicked(true); setHits([]); }} style={{ display: "flex", gap: 10, alignItems: "center", width: "100%", padding: 6, border: "none", background: "transparent", cursor: "pointer", textAlign: "left", color: t.textHi, borderRadius: 8 }}>
                                    {h.img ? <img src={h.img} alt="" width={36} height={36} style={{ borderRadius: 4, objectFit: "cover" }} /> : <span style={{ width: 36, height: 36 }} />}
                                    <span style={{ ...FONTS.inter, fontSize: ".88rem", lineHeight: 1.3 }}><b>{h.title}</b><br /><span style={{ color: t.textMute }}>{h.sub}</span></span>
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <input aria-label="Your name" maxLength={40} placeholder="Your name (optional)" value={f.name} onChange={e => setF({ ...f, name: e.target.value })} style={{ ...input, flex: "1 1 140px" }} />
            <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={f.website} onChange={e => setF({ ...f, website: e.target.value })} style={{ position: "absolute", left: "-9999px" }} />
            <button type="submit" style={{ ...FONTS.mono, letterSpacing: 2, padding: "11px 18px", borderRadius: 10, border: "none", cursor: "pointer", background: t.accent, color: t.onAccent }}>SUGGEST</button>
            <span role="status" style={{ ...FONTS.mono, fontSize: ".75rem", color: t.textMute, flexBasis: "100%" }}>{msg}</span>
        </form>
    );
}
