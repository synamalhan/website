import { useEffect, useRef } from "react";

export default function OceanBg({ t }) {
    const ref = useRef();
    useEffect(() => {
        const cv = ref.current;
        const ctx = cv.getContext("2d");
        let W, H, raf;
        const pts = [];

        const resize = () => { W = cv.width = window.innerWidth; H = cv.height = window.innerHeight; };
        resize();
        window.addEventListener("resize", resize);

        for (let i = 0; i < 35; i++) pts.push({
            x: Math.random() * 3000, y: Math.random() * 2000,
            vx: (Math.random() - .5) * .3, vy: -(Math.random() * .4 + .06),
            r: Math.random() * 1.8 + .3,
            a: Math.random() * .5 + .08,
            ph: Math.random() * Math.PI * 2, ps: Math.random() * .015 + .003,
            rgb: [t.particle1, t.particle2, t.particle3][Math.floor(Math.random() * 3)],
        });

        const loop = () => {
            ctx.clearRect(0, 0, W, H);
            ctx.fillStyle = t.bg; ctx.fillRect(0, 0, W, H);

            if (t.name === "dark") {
                const rg = ctx.createRadialGradient(W / 2, H * .4, 0, W / 2, H * .4, W * .65);
                rg.addColorStop(0, "rgba(40,6,90,.22)"); rg.addColorStop(1, "transparent");
                ctx.fillStyle = rg; ctx.fillRect(0, 0, W, H);
            }

            pts.forEach(p => {
                p.x += p.vx + Math.sin(p.ph) * .25; p.y += p.vy; p.ph += p.ps;
                if (p.y < -10 || p.x < -10 || p.x > W + 10) { p.x = Math.random() * W; p.y = H + 5; }
                const a = p.a * (.7 + .3 * Math.sin(p.ph));
                ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${p.rgb},${a})`; ctx.fill();
                ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 3.5, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${p.rgb},${a * .08})`; ctx.fill();
            });

            raf = requestAnimationFrame(loop);
        };
        loop();
        return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
    }, [t]);

    return <canvas ref={ref} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
}
