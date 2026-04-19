import { useEffect, useRef } from "react";

export default function Cursor({ t }) {
    const mainBlob = useRef();
    const trailBlob = useRef();
    
    useEffect(() => {
        const move = e => {
            mainBlob.current && Object.assign(mainBlob.current.style, { left: `${e.clientX}px`, top: `${e.clientY}px` });
            setTimeout(() => trailBlob.current && Object.assign(trailBlob.current.style, { left: `${e.clientX}px`, top: `${e.clientY}px` }), 120);
        };
        document.addEventListener("mousemove", move);
        return () => document.removeEventListener("mousemove", move);
    }, []);
    
    return (
        <div style={{ pointerEvents: "none", zIndex: 9999 }}>
            <div ref={mainBlob} style={{
                position: "fixed", width: 15, height: 15, 
                background: `radial-gradient(circle at 30% 30%, ${t.cyan}ee, ${t.accent}aa)`,
                borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
                transform: "translate(-50%, -50%)", 
                filter: "blur(2px)",
                mixBlendMode: t.name === "dark" ? "screen" : "multiply",
                animation: "wobbleCursor 4s infinite linear"
            }} />
            <div ref={trailBlob} style={{
                position: "fixed", width: 25, height: 25, 
                background: `radial-gradient(circle at 70% 70%, ${t.magenta}cc, ${t.gold}cc)`,
                borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
                transform: "translate(-50%, -50%)", 
                filter: "blur(4px)",
                mixBlendMode: t.name === "dark" ? "screen" : "multiply", 
                opacity: 0.8,
                animation: "wobbleCursor 5s infinite reverse linear"
            }} />
            <style>{`
                @keyframes wobbleCursor {
                    0% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; transform: translate(-50%, -50%) rotate(0deg); }
                    34% { border-radius: 70% 30% 50% 50% / 30% 30% 70% 70%; }
                    67% { border-radius: 100% 60% 60% 100% / 100% 100% 60% 60%; }
                    100% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; transform: translate(-50%, -50%) rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
