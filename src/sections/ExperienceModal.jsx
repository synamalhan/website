import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useTheme } from "../theme/ThemeContext";
import { FONTS } from "../components/styles";
import { internshipWork } from "../data/portfolio";

const months = (s, e) => Math.max(1, Math.round(((e ? Date.parse(e) : Date.now()) - Date.parse(s)) / 2.63e9));

// Each kind of material gets its own colored box.
function Section({ title, color, children }) {
    return (
        <div style={{ marginTop: 18, padding: "16px 18px", borderRadius: 12, background: `${color}14`, border: `1px solid ${color}44`, borderLeft: `4px solid ${color}` }}>
            <div style={{ ...FONTS.mono, fontSize: "0.87rem", letterSpacing: ".14em", color, fontWeight: 700, marginBottom: 12 }}>{title}</div>
            {children}
        </div>
    );
}

export default function ExperienceModal({ exp, onClose }) {
    const { theme: t } = useTheme();
    const closeRef = useRef();
    useEffect(() => {
        const key = e => e.key === "Escape" && onClose();
        window.addEventListener("keydown", key);
        closeRef.current?.focus();
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => { window.removeEventListener("keydown", key); document.body.style.overflow = prev; };
    }, [onClose]);
    const work = internshipWork.filter(w => w.experienceId === exp.id);
    const body = { ...FONTS.inter, fontSize: "1rem", lineHeight: 1.7, color: t.text, margin: 0 };
    const list = items => items.map((x, i) => <div key={i} style={{ ...body, display: "flex", gap: 10, marginBottom: 8 }}><span style={{ color: t.cyan }}>•</span>{x}</div>);
    // Portal to <body>: inside a flipping/floating card, `position: fixed` is relative to the transformed card, not the screen.
    return createPortal(
        <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 2000, background: "rgba(0,0,0,.7)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
            <div role="dialog" aria-modal="true" aria-label={`${exp.role} at ${exp.company}`} onClick={e => e.stopPropagation()}
                style={{ background: t.bg, border: `1px solid ${t.borderHi}`, borderTop: `5px solid ${t.accent}`, borderRadius: 16, maxWidth: 680, width: "100%", maxHeight: "88vh", overflowY: "auto", padding: "32px clamp(20px,4vw,40px)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
                    <div>
                        <h3 style={{ ...FONTS.orb, fontSize: "1.7rem", color: t.textHi, margin: "0 0 4px" }}>{exp.company}</h3>
                        <div style={{ ...FONTS.inter, fontSize: "1.1rem", color: t.textHi, fontWeight: 600 }}>{exp.role}</div>
                        <div style={{ ...FONTS.mono, fontSize: "0.92rem", letterSpacing: ".08em", color: t.textMute, marginTop: 6 }}>{exp.years} · {months(exp.start, exp.end)} mo{exp.internship ? " · Internship" : ""}</div>
                    </div>
                    <button ref={closeRef} onClick={onClose} aria-label="Close details" style={{ alignSelf: "flex-start", background: "none", border: `1px solid ${t.border}`, color: t.textHi, borderRadius: 8, width: 40, height: 40, fontSize: "1.2rem", cursor: "pointer" }}>✕</button>
                </div>
                <p style={{ ...body, marginTop: 20, padding: "14px 18px", borderRadius: 12, background: t.surface, border: `1px solid ${t.border}` }}>{exp.context}</p>
                <Section color={t.cyan} title="WHAT I DID">{list(exp.details)}</Section>
                {work.length > 0 && (
                    <Section color={t.gold} title="PROJECTS">
                        {work.map(w => (
                            <div key={w.id} style={{ padding: "14px 16px", marginTop: 10, borderRadius: 10, background: t.surface, border: `1px solid ${t.border}` }}>
                                <div style={{ ...FONTS.inter, fontWeight: 700, fontSize: "1.05rem", color: t.textHi }}>{w.title}</div>
                                <div style={{ ...body, color: t.textMute, fontSize: ".9rem", margin: "2px 0 8px" }}>{w.problemType}</div>
                                <p style={{ ...body, marginBottom: 6 }}>{w.role}</p>
                                <p style={{ ...body, marginBottom: 6 }}>{w.impact}</p>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{w.tools.map(x => <span key={x} style={{ ...FONTS.mono, fontSize: "0.85rem", padding: "3px 8px", borderRadius: 6, background: `${t.gold}1f`, border: `1px solid ${t.gold}44`, color: t.textHi }}>{x}</span>)}</div>
                            </div>
                        ))}
                    </Section>
                )}
                <Section color={t.green} title="IMPACT">{list(exp.impact)}</Section>
                <Section color={t.accent} title="TECH STACK">
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{exp.techStack.map(x => <span key={x} style={{ ...FONTS.mono, fontSize: "0.86rem", padding: "4px 10px", borderRadius: 6, background: `${t.accent}1f`, border: `1px solid ${t.accent}44`, color: t.textHi }}>{x}</span>)}</div>
                </Section>
            </div>
        </div>,
        document.body
    );
}
