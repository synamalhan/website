import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useTheme } from "../theme/ThemeContext";
import { FONTS } from "../components/styles";
import Tag from "../components/ui/Tag";

const months = (s, e) => Math.max(1, Math.round(((e ? Date.parse(e) : Date.now()) - Date.parse(s)) / 2.63e9));

function Section({ title, children, t }) {
    return (
        <div style={{ marginTop: 24 }}>
            <div style={{ ...FONTS.mono, fontSize: ".8rem", letterSpacing: ".14em", color: t.accent, marginBottom: 10 }}>{title}</div>
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
    const body = { ...FONTS.inter, fontSize: "1rem", lineHeight: 1.7, color: t.text };
    const list = items => items.map((x, i) => <div key={i} style={{ ...body, display: "flex", gap: 10, marginBottom: 8 }}><span style={{ color: t.accent }}>•</span>{x}</div>);
    // Portal to <body>: inside a flipping/floating card, `position: fixed` is relative to the transformed card, not the screen.
    return createPortal(
        <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 2000, background: "rgba(0,0,0,.7)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
            <div role="dialog" aria-modal="true" aria-label={`${exp.role} at ${exp.company}`} onClick={e => e.stopPropagation()}
                style={{ background: t.bg, border: `2px solid ${t.accent}`, borderRadius: 20, maxWidth: 720, width: "100%", maxHeight: "88vh", overflowY: "auto", padding: "32px clamp(20px,4vw,40px)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
                    <div>
                        <div style={{ ...FONTS.mono, fontSize: ".85rem", color: t.cyan, letterSpacing: ".1em" }}>{exp.years} · {months(exp.start, exp.end)} mo · {exp.lane.toUpperCase()}{exp.internship ? " · INTERNSHIP" : ""}</div>
                        <h3 style={{ ...FONTS.orb, fontSize: "1.8rem", color: t.textHi, margin: "8px 0 4px" }}>{exp.company}</h3>
                        <div style={{ ...FONTS.inter, fontSize: "1.1rem", color: t.accent, fontWeight: 600 }}>{exp.role}</div>
                    </div>
                    <button ref={closeRef} onClick={onClose} aria-label="Close details" style={{ alignSelf: "flex-start", background: "none", border: `1px solid ${t.border}`, color: t.textHi, borderRadius: 8, width: 40, height: 40, fontSize: "1.2rem", cursor: "pointer" }}>✕</button>
                </div>
                <p style={{ ...body, marginTop: 20 }}>{exp.desc}</p>
                <Section t={t} title="WHAT I BUILT / DID">{list(exp.details)}</Section>
                <Section t={t} title="CONTEXT"><p style={body}>{exp.context}</p></Section>
                <Section t={t} title="IMPACT">{list(exp.impact)}</Section>
                <Section t={t} title="STACK"><div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>{exp.techStack.map(s => <Tag key={s}>{s}</Tag>)}</div></Section>
            </div>
        </div>,
        document.body
    );
}
