import { useEffect } from "react";

// Gives every .hover-card a mouse-follow 3D tilt. One delegated listener; cards with their own inline transform or float animation are skipped.
export default function Tilt3D() {
    useEffect(() => {
        if (!matchMedia("(hover: hover)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        let cur = null;
        const reset = () => { if (cur) { cur.style.transform = ""; cur.style.removeProperty("--mx"); cur.style.removeProperty("--my"); cur = null; } };
        const move = e => {
            const el = e.target.closest?.(".hover-card, .tilt-only");
            if (el !== cur) reset();
            if (!el || el.classList.contains("float-y") || (el !== cur && el.style.transform)) return;
            cur = el;
            const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
            el.style.setProperty("--mx", `${((x + 0.5) * 100).toFixed(0)}%`); el.style.setProperty("--my", `${((y + 0.5) * 100).toFixed(0)}%`); // light follows the cursor
            el.style.transform = `perspective(900px) rotateX(${(-y * 10).toFixed(2)}deg) rotateY(${(x * 12).toFixed(2)}deg) scale(1.02)`;
        };
        addEventListener("pointermove", move);
        addEventListener("blur", reset);
        return () => { removeEventListener("pointermove", move); removeEventListener("blur", reset); };
    }, []);
    return null;
}
