import { useEffect, useRef } from "react";

export default function CyberCityBg({ t }) {
    const ref = useRef();

    useEffect(() => {
        const cv = ref.current;
        const ctx = cv.getContext("2d");
        let W, H, raf;

        const buildings = [];
        const particles = [];
        const gridPoints = [];

        const resize = () => {
            W = cv.width = window.innerWidth;
            H = cv.height = window.innerHeight;
            initScene();
        };

        const initScene = () => {
            buildings.length = 0;
            const count = 30;
            for (let i = 0; i < count; i++) {
                buildings.push({
                    x: (i / count) * W * 1.2 - W * 0.1,
                    w: 40 + Math.random() * 80,
                    h: 150 + Math.random() * 400,
                    z: 0.5 + Math.random() * 2,
                    speed: 0.1 + Math.random() * 0.2,
                    hue: Math.random() > 0.5 ? t.cyan : t.magenta
                });
            }

            particles.length = 0;
            for (let i = 0; i < 60; i++) {
                particles.push({
                    x: Math.random() * W,
                    y: Math.random() * H,
                    s: Math.random() * 2 + 1,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: -(Math.random() * 1 + 0.5),
                    color: i % 2 === 0 ? t.cyan : t.accent
                });
            }
        };

        window.addEventListener("resize", resize);
        resize();

        const drawGrid = (tt) => {
            ctx.strokeStyle = t.border + "11";
            ctx.lineWidth = 1;
            const size = 60;
            const off = (tt * 20) % size;

            ctx.beginPath();
            for (let x = off; x < W; x += size) {
                ctx.moveTo(x, 0); ctx.lineTo(x, H);
            }
            for (let y = off; y < H; y += size) {
                ctx.moveTo(0, y); ctx.lineTo(W, y);
            }
            ctx.stroke();
        };

        const loop = () => {
            const tt = Date.now() * 0.001;
            ctx.clearRect(0, 0, W, H);
            ctx.fillStyle = t.bg; ctx.fillRect(0, 0, W, H);

            // Subtle base glow
            const rg = ctx.createRadialGradient(W / 2, H, 0, W / 2, H, W);
            rg.addColorStop(0, t.accent + "11"); rg.addColorStop(1, "transparent");
            ctx.fillStyle = rg; ctx.fillRect(0, 0, W, H);

            drawGrid(tt);

            // Draw Buildings (Silhouettes with glow edges)
            buildings.forEach(b => {
                b.x -= b.speed;
                if (b.x + b.w < 0) b.x = W + b.w;

                const parallaxX = b.x;
                ctx.fillStyle = b.hue + "08";
                ctx.fillRect(parallaxX, H - b.h, b.w, b.h);

                // Top rim light
                ctx.strokeStyle = b.hue + "33";
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(parallaxX, H - b.h);
                ctx.lineTo(parallaxX + b.w, H - b.h);
                ctx.stroke();

                // Windows
                ctx.fillStyle = b.hue + "22";
                const rows = 10, cols = 3;
                const winW = b.w / (cols * 2), winH = 4;
                for (let r = 0; r < rows; r++) {
                    for (let c = 0; c < cols; c++) {
                        if (Math.sin(tt + b.x + r) > 0.5) {
                            ctx.fillRect(parallaxX + c * winW * 2 + winW / 2, H - b.h + 20 + r * 15, winW, winH);
                        }
                    }
                }
            });

            // Particles / Neon Rain
            particles.forEach(p => {
                p.x += p.vx; p.y += p.vy;
                if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }

                ctx.fillStyle = p.color;
                ctx.globalAlpha = 0.4;
                ctx.fillRect(p.x, p.y, 1, p.s * 10);
                ctx.globalAlpha = 1;
            });

            raf = requestAnimationFrame(loop);
        };

        loop();
        return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
    }, [t]);

    return <canvas ref={ref} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
}
