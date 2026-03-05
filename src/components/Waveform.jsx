import { useEffect, useRef } from "react";

export default function Waveform({ t }) {
    const ref = useRef();
    useEffect(() => {
        const cv = ref.current; if (!cv) return;
        const ctx = cv.getContext("2d"); let raf, tt = 0;
        const resize = () => { cv.width = cv.offsetWidth; cv.height = 90; };
        resize(); window.addEventListener("resize", resize);
        const waves = [
            { f: .038, a: 22, spd: 1.5, col: t.accent, w: 1.8 },
            { f: .058, a: 15, spd: 2.3, col: t.cyan, w: 1.3 },
            { f: .027, a: 28, spd: 1.0, col: t.magenta, w: .9 },
        ];
        const loop = () => {
            ctx.clearRect(0, 0, cv.width, cv.height);
            const W = cv.width, cy = 45;
            waves.forEach(wv => {
                ctx.beginPath();
                for (let x = 0; x < W; x += 2) {
                    const y = cy + Math.sin(x * wv.f + tt * wv.spd) * wv.a * Math.sin(x * .005 + .6);
                    x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
                }
                ctx.strokeStyle = wv.col; ctx.lineWidth = wv.w; ctx.stroke();
            });
            tt += .05; raf = requestAnimationFrame(loop);
        };
        loop();
        return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
    }, [t]);
    return <canvas ref={ref} style={{ width: "100%", height: 90, display: "block" }} />;
}
