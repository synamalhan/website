import { useEffect, useRef } from "react";
import buildRocketPieces from "./buildRocketPieces";

export default function RocketCanvas({ progress, t }) {
    const ref = useRef();
    const progRef = useRef(progress);
    const themeRef = useRef(t);
    progRef.current = progress;
    themeRef.current = t;

    useEffect(() => {
        const cv = ref.current; if (!cv) return;
        const ctx = cv.getContext("2d");
        let raf, lastStage = -1;
        let sparks = [];

        const addSparks = (x, y, col) => {
            for (let i = 0; i < 35; i++) {
                const a = Math.random() * Math.PI * 2, spd = Math.random() * 6 + 1;
                sparks.push({ x, y, vx: Math.cos(a) * spd, vy: Math.sin(a) * spd, life: 1, col });
            }
        };

        const resize = () => { cv.width = cv.offsetWidth; cv.height = cv.offsetHeight; };
        resize(); window.addEventListener("resize", resize);

        const loop = () => {
            resize();
            const W = cv.width, H = cv.height;
            ctx.clearRect(0, 0, W, H);
            const p = progRef.current;
            const th = themeRef.current;
            const stage = Math.floor(p * 12);

            if (stage !== lastStage && stage > 0) {
                const cols = [th.cyan, th.magenta, th.accent, th.gold, th.cyan];
                addSparks(W / 2 + (Math.random() - .5) * 70, H * .68 + (Math.random() - .5) * 100, cols[stage % cols.length]);
                lastStage = stage;
            }

            ctx.save();
            ctx.translate(W / 2, H * .7);
            buildRocketPieces(th)(ctx, p);
            ctx.restore();

            sparks = sparks.filter(s => s.life > 0);
            sparks.forEach(s => {
                ctx.beginPath(); ctx.arc(s.x, s.y, 2.2, 0, Math.PI * 2);
                ctx.fillStyle = s.col + Math.floor(s.life * 255).toString(16).padStart(2, "0");
                ctx.fill();
                s.x += s.vx; s.y += s.vy; s.vx *= .93; s.vy *= .93; s.life -= .022;
            });

            raf = requestAnimationFrame(loop);
        };
        loop();
        return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
    }, []);

    return <canvas ref={ref} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }} />;
}
