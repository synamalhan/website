import { useRef, useEffect } from "react";
import { nodes } from "../data/skills";
export default function NeuralCanvas({ t }) {
    const ref = useRef();
    const mouse = useRef({ x: -999, y: -999 });

    useEffect(() => {
        const cv = ref.current; if (!cv) return;
        const ctx = cv.getContext("2d");
        let raf;
        const resize = () => { cv.width = cv.offsetWidth; cv.height = cv.offsetHeight; };
        resize(); window.addEventListener("resize", resize);


        const edges = [[0, 3], [0, 6], [1, 4], [1, 6], [2, 5], [2, 8], [3, 4], [3, 6], [4, 5], [4, 7], [5, 8], [6, 7], [6, 9], [7, 8], [7, 10], [8, 11], [9, 10], [10, 11], [0, 1], [1, 2]];
        let sigs = [];
        const si = setInterval(() => {
            const e = edges[Math.floor(Math.random() * edges.length)];
            sigs.push({ a: e[0], b: e[1], tt: 0, spd: Math.random() * .012 + .005 });
        }, 380);

        cv.addEventListener("mousemove", e => { const r = cv.getBoundingClientRect(); mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top }; });
        cv.addEventListener("mouseleave", () => { mouse.current = { x: -999, y: -999 }; });

        const loop = () => {
            ctx.clearRect(0, 0, cv.width, cv.height);
            const W = cv.width, H = cv.height, { x: mx, y: my } = mouse.current;

            edges.forEach(([a, b]) => {
                const na = nodes[a], nb = nodes[b], ax = na.x * W, ay = na.y * H, bx = nb.x * W, by = nb.y * H;
                const d = Math.min(Math.hypot(mx - ax, my - ay), Math.hypot(mx - bx, my - by));
                const p = Math.max(0, 1 - d / 170);
                ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by);
                ctx.strokeStyle = `rgba(${t.particle1},${.06 + p * .3})`; ctx.lineWidth = .4 + p * 1.8; ctx.stroke();
            });

            sigs = sigs.filter(s => s.tt <= 1);
            sigs.forEach(s => {
                const na = nodes[s.a], nb = nodes[s.b];
                const x = na.x * W + (nb.x * W - na.x * W) * s.tt, y = na.y * H + (nb.y * H - na.y * H) * s.tt;
                ctx.beginPath(); ctx.arc(x, y, 3.5, 0, Math.PI * 2);
                ctx.fillStyle = na.col; ctx.shadowBlur = 12; ctx.shadowColor = na.col; ctx.fill(); ctx.shadowBlur = 0;
                s.tt += s.spd;
            });

            nodes.forEach(n => {
                const nx = n.x * W, ny = n.y * H, d = Math.hypot(mx - nx, my - ny), p = Math.max(0, 1 - d / 120), r = 10 + p * 9;
                ctx.beginPath(); ctx.arc(nx, ny, r, 0, Math.PI * 2);
                const ng = ctx.createRadialGradient(nx, ny, 0, nx, ny, r);
                ng.addColorStop(0, n.col); ng.addColorStop(1, n.col + "22");
                ctx.fillStyle = ng; ctx.shadowBlur = 14 + p * 20; ctx.shadowColor = n.col; ctx.fill(); ctx.shadowBlur = 0;
                ctx.beginPath(); ctx.arc(nx, ny, r + 3, 0, Math.PI * 2);
                ctx.strokeStyle = n.col + (p > .25 ? "cc" : "33"); ctx.lineWidth = .8; ctx.stroke();
                ctx.font = `500 ${9 + p * 2}px 'Inter',sans-serif`;
                ctx.textAlign = "center"; ctx.fillStyle = p > .25 ? t.textHi : t.textMute; ctx.fillText(n.l, nx, ny + r + 14);
            });
            raf = requestAnimationFrame(loop);
        };
        loop();
        return () => { cancelAnimationFrame(raf); clearInterval(si); window.removeEventListener("resize", resize); };
    }, [t]);

    return <canvas ref={ref} style={{ width: "100%", height: 520, display: "block" }} />;
}
