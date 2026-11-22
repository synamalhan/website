import { useEffect, useState } from "react";
import { useTheme } from "../theme/ThemeContext";
import { FONTS } from "../components/styles";
import { useIsMobile } from "../hooks/useMediaQuery";
import Label from "../components/ui/Label";
import H2 from "../components/ui/H2";

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
        <section id="guestbook" style={{ padding: isMobile ? "60px 24px" : "80px 24px", position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto", color: t.text }}>
            <div style={{ textAlign: "center" }}>
                <Label center>// Guestbook</Label>
                <H2 style={{ textAlign: "center" }}>LEAVE A NOTE</H2>
                <p style={{ color: t.textMute, margin: "8px auto 28px", maxWidth: "50ch" }}>Feedback, a favorite project, a book I should read. Notes appear after I approve them.</p>
            </div>
            <form onSubmit={submit} className="hover-card" style={{ display: "grid", gap: 12, padding: 22, borderRadius: 16, background: t.surface, border: `1px solid ${t.border}` }}>
                <input aria-label="Your name" placeholder="Name (optional)" maxLength={40} value={f.name} onChange={e => setF({ ...f, name: e.target.value })} style={field} />
                <textarea aria-label="Your note" required minLength={2} maxLength={400} rows={3} placeholder="Your note" value={f.message} onChange={e => setF({ ...f, message: e.target.value })} style={{ ...field, resize: "vertical" }} />
                <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={f.website} onChange={e => setF({ ...f, website: e.target.value })} style={{ position: "absolute", left: "-9999px" }} />
                <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                    <button type="submit" style={{ ...FONTS.mono, letterSpacing: 2, padding: "11px 20px", borderRadius: 10, border: "none", cursor: "pointer", background: t.accent, color: t.onAccent }}>SEND</button>
                    <span role="status" style={{ ...FONTS.mono, fontSize: ".78rem", color: t.textMute }}>{msg}</span>
                </div>
            </form>
            {notes.length > 0 && (
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14, marginTop: 22 }}>
                    {notes.map((n, i) => (
                        <div key={i} className="hover-card" style={{ padding: "16px 18px", borderRadius: 14, background: t.surface, border: `1px solid ${t.border}` }}>
                            <p style={{ margin: 0, lineHeight: 1.6, color: t.textHi, overflowWrap: "anywhere" }}>{n.message}</p>
                            <div style={{ ...FONTS.mono, fontSize: ".72rem", color: t.textMute, marginTop: 10 }}>{n.name}</div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
