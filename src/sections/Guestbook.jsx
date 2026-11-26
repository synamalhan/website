import { useEffect, useState } from "react";
import { useTheme } from "../theme/ThemeContext";
import { FONTS } from "../components/styles";
import { useIsMobile } from "../hooks/useMediaQuery";

const API = () => window.location.hostname === "localhost" ? "http://localhost:3001" : (import.meta.env.VITE_API_URL || "http://localhost:3001");

export default function Guestbook() {
    const { theme: t } = useTheme();
    const isMobile = useIsMobile();
    const [notes, setNotes] = useState([]);
    const [f, setF] = useState({ name: "", message: "", website: "" });
    const [msg, setMsg] = useState("");

    useEffect(() => { fetch(`${API()}/api/guestbook`).then(r => r.json()).then(setNotes).catch(() => {}); }, []);

    const submit = async e => {
        e.preventDefault();
        setMsg("Sending...");
        try {
            const r = await fetch(`${API()}/api/guestbook`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) });
            const d = await r.json();
            if (!r.ok) return setMsg(d.error || "Something went wrong.");
            setF({ name: "", message: "", website: "" });
            setMsg("Thanks! Your note shows up once I've read it.");
        } catch { setMsg("Could not reach the server, try again in a minute."); }
    };

    const field = { ...FONTS.inter, width: "100%", boxSizing: "border-box", padding: "12px 14px", borderRadius: 10, border: `1px solid ${t.border}`, background: t.surface, color: t.textHi, fontSize: ".95rem" };
    return (
        <div style={{ textAlign: "left", marginTop: 56, paddingTop: 40, borderTop: `1px solid ${t.border}` }}>
            <h3 style={{ ...FONTS.orb, fontSize: "1.4rem", color: t.textHi, marginBottom: 6 }}>Or leave a note</h3>
            <p style={{ color: t.textMute, margin: "0 0 20px" }}>Feedback, a favorite project, a book I should read.</p>
            <form onSubmit={submit} className="hover-card" style={{ display: "grid", gap: 12, padding: 22, borderRadius: 16, background: t.surface, border: `1px solid ${t.border}` }}>
                <input aria-label="Your name" placeholder="Name (optional)" maxLength={40} value={f.name} onChange={e => setF({ ...f, name: e.target.value })} style={field} />
                <textarea aria-label="Your note" required minLength={2} maxLength={400} rows={3} placeholder="Your note" value={f.message} onChange={e => setF({ ...f, message: e.target.value })} style={{ ...field, resize: "vertical" }} />
                <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={f.website} onChange={e => setF({ ...f, website: e.target.value })} style={{ position: "absolute", left: "-9999px" }} />
                <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                    <button type="submit" style={{ ...FONTS.mono, letterSpacing: 2, padding: "11px 20px", borderRadius: 10, border: "none", cursor: "pointer", background: t.accent, color: t.onAccent }}>SEND</button>
                    <span role="status" style={{ ...FONTS.mono, fontSize: "0.90rem", color: t.textMute }}>{msg}</span>
                </div>
            </form>
            {notes.length > 0 && (
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14, marginTop: 22 }}>
                    {notes.map((n, i) => (
                        <div key={i} className="hover-card" style={{ padding: "16px 18px", borderRadius: 14, background: t.surface, border: `1px solid ${t.border}` }}>
                            <p style={{ margin: 0, lineHeight: 1.6, color: t.textHi, overflowWrap: "anywhere" }}>{n.message}</p>
                            <div style={{ ...FONTS.mono, fontSize: "0.85rem", color: t.textMute, marginTop: 10 }}>{n.name}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
