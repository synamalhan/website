import { useEffect, useRef } from "react";

export default function Cursor({ t }) {
    const dot = useRef();
    const ring = useRef();
    useEffect(() => {
        const move = e => {
            dot.current && Object.assign(dot.current.style, { left: `${e.clientX}px`, top: `${e.clientY}px` });
            setTimeout(() => ring.current && Object.assign(ring.current.style, { left: `${e.clientX}px`, top: `${e.clientY}px` }), 85);
        };
        document.addEventListener("mousemove", move);
        return () => document.removeEventListener("mousemove", move);
    }, []);
    return (
        <>
            <div ref={dot} style={{
                position: "fixed", width: 8, height: 8, borderRadius: "50%", background: t.cyan,
                transform: "translate(-50%,-50%)", pointerEvents: "none", zIndex: 9999,
                boxShadow: `0 0 10px ${t.cyan}`, mixBlendMode: "difference"
            }} />
            <div ref={ring} style={{
                position: "fixed", width: 28, height: 28, borderRadius: "50%",
                border: `1px solid ${t.accent}`, transform: "translate(-50%,-50%)",
                pointerEvents: "none", zIndex: 9998, opacity: .5
            }} />
        </>
    );
}
