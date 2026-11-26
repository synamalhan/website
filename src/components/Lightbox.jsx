import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useTheme } from "../theme/ThemeContext";
import { FONTS } from "./styles";

// Full-screen image viewer. items: [{ url, alt }]. Esc closes, arrow keys / buttons step, clicking the backdrop closes.
export default function Lightbox({ items, index, onIndex, onClose }) {
    const { theme: t } = useTheme();
    const n = items.length, step = d => onIndex((index + d + n) % n);
    useEffect(() => {
        const key = e => e.key === "Escape" ? onClose() : e.key === "ArrowRight" ? step(1) : e.key === "ArrowLeft" && step(-1);
        window.addEventListener("keydown", key);
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => { window.removeEventListener("keydown", key); document.body.style.overflow = prev; };
    });
    const it = items[index];
    const btn = { position: "absolute", background: "rgba(0,0,0,.55)", color: "#fff", border: `1px solid ${t.borderHi}`, borderRadius: 999, width: 44, height: 44, fontSize: "1.2rem", cursor: "pointer" };
    return createPortal(
        <div role="dialog" aria-modal="true" aria-label="Image viewer" onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 2000, background: "rgba(0,0,0,.88)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "56px 16px 16px" }}>
            <img src={it.url} alt={it.alt} onClick={e => e.stopPropagation()} style={{ maxWidth: "100%", maxHeight: "calc(100vh - 120px)", objectFit: "contain", borderRadius: 10, background: "#fff" }} />
            <div style={{ ...FONTS.mono, fontSize: ".78rem", letterSpacing: ".08em", color: "#ddd", marginTop: 12, textAlign: "center", maxWidth: "70ch" }}>{it.alt}{n > 1 ? `  ·  ${index + 1} / ${n}` : ""}</div>
            <button aria-label="Close" onClick={onClose} style={{ ...btn, top: 14, right: 14 }}>✕</button>
            {n > 1 && <>
                <button aria-label="Previous image" onClick={e => { e.stopPropagation(); step(-1); }} style={{ ...btn, left: 14, top: "50%" }}>←</button>
                <button aria-label="Next image" onClick={e => { e.stopPropagation(); step(1); }} style={{ ...btn, right: 14, top: "50%" }}>→</button>
            </>}
        </div>,
        document.body
    );
}
