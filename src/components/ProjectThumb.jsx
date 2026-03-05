import { useEffect, useRef } from "react";

export default function ProjectThumb({ type, colors, t }) {
    const ref = useRef();
    useEffect(() => {
        const cv = ref.current; if (!cv) return;
        const ctx = cv.getContext("2d"); let raf, tt = 0;
        const setup = () => { cv.width = cv.offsetWidth || 300; cv.height = 150; };
        setup(); window.addEventListener("resize", setup);
        const [c1, c2] = colors;
        const loop = () => {
            const W = cv.width, H = cv.height;
            ctx.clearRect(0, 0, W, H);
            const bg = ctx.createLinearGradient(0, 0, W, H);
            bg.addColorStop(0, c1 + "15"); bg.addColorStop(1, c2 + "15");
            ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
            ctx.strokeStyle = c1 + "18"; ctx.lineWidth = .5;
            for (let x = 0; x < W; x += 20) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
            for (let y = 0; y < H; y += 20) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
            if (type === "ios") {
                const px = W / 2, py = H / 2;
                ctx.beginPath(); ctx.roundRect(px - 24, py - 44, 48, 88, 7);
                ctx.fillStyle = "rgba(80,90,110,.4)"; ctx.fill(); ctx.strokeStyle = c1 + "bb"; ctx.lineWidth = 1.2; ctx.stroke();
                ctx.beginPath(); ctx.roundRect(px - 19, py - 37, 38, 66, 4);
                const sg = ctx.createLinearGradient(px, py - 37, px, py + 29); sg.addColorStop(0, c1 + "35"); sg.addColorStop(1, c2 + "18");
                ctx.fillStyle = sg; ctx.fill();
                for (let i = 0; i < 3; i++) { ctx.beginPath(); for (let x = px - 17; x <= px + 17; x += 2) { const y = py - 8 + i * 13 + Math.sin((x + tt * 38) * .2) * 5; x === px - 17 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.strokeStyle = i % 2 ? c1 + "99" : c2 + "99"; ctx.lineWidth = 1.2; ctx.stroke(); }
                ctx.beginPath(); ctx.roundRect(px - 10, py + 35, 20, 3, 2); ctx.fillStyle = "#ffffff44"; ctx.fill();
            } else if (type === "ml") {
                for (let i = 0; i < 20; i++) { const x = (i * 53 + tt * 16) % W, y = (i * 37 + tt * 11) % H; ctx.beginPath(); ctx.arc(x, y, 2.5, 0, Math.PI * 2); ctx.fillStyle = i % 2 ? c1 : c2; ctx.globalAlpha = .35 + .4 * Math.sin(tt + i); ctx.fill(); ctx.globalAlpha = 1; }
                for (let i = 0; i < 4; i++) { const y = H * (i + 1) / 5; ctx.beginPath(); for (let x = 0; x < W; x += 3) { const yv = y + Math.sin((x + tt * 50 + i * 40) * .08) * 14; x === 0 ? ctx.moveTo(x, yv) : ctx.lineTo(x, yv); } ctx.strokeStyle = i % 2 ? c1 + "66" : c2 + "66"; ctx.lineWidth = 1.2; ctx.stroke(); }
            } else if (type === "fullstack") {
                const lx = W / 2, ly = H / 2 - 10;

                // laptop screen
                ctx.beginPath();
                ctx.roundRect(lx - 40, ly - 25, 80, 50, 5);
                ctx.fillStyle = "rgba(80,90,110,.35)";
                ctx.fill();
                ctx.strokeStyle = c1 + "bb";
                ctx.lineWidth = 1.2;
                ctx.stroke();

                // keyboard base
                ctx.beginPath();
                ctx.roundRect(lx - 55, ly + 25, 110, 8, 3);
                ctx.fillStyle = "rgba(120,130,150,.25)";
                ctx.fill();

                // moving "code" lines
                for (let i = 0; i < 5; i++) {
                    const y = ly - 18 + i * 8;
                    ctx.beginPath();
                    for (let x = lx - 34; x < lx + 34; x += 2) {
                        const yy = y + Math.sin((x * .15) + tt * 3 + i) * 1.5;
                        x === lx - 34 ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy);
                    }
                    ctx.strokeStyle = i % 2 ? c1 + "aa" : c2 + "aa";
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            } else if (type === "vision") {
                const cx = W / 2, cy = H / 2;

                const blink = (Math.sin(tt * 1.6) + 1) / 2;

                // bigger eye
                ctx.beginPath();
                ctx.ellipse(cx, cy, 50, 24 * blink + 3, 0, 0, Math.PI * 2);
                ctx.strokeStyle = c1 + "cc";
                ctx.lineWidth = 2;
                ctx.stroke();

                // iris
                ctx.beginPath();
                ctx.arc(cx, cy, 12, 0, Math.PI * 2);
                ctx.fillStyle = c2 + "cc";
                ctx.fill();

                // pupil
                ctx.beginPath();
                ctx.arc(cx, cy, 5, 0, Math.PI * 2);
                ctx.fillStyle = "#ffffffaa";
                ctx.fill();
            } else if (type === "hackathon") {
                const cx = W / 2, cy = H / 2;

                const rotY = Math.cos(tt); // fake Y axis rotation

                ctx.save();
                ctx.translate(cx, cy);
                ctx.scale(rotY, 1); // compress horizontally to simulate 3D flip

                // bigger medal
                ctx.beginPath();
                ctx.arc(0, 0, 28, 0, Math.PI * 2);
                ctx.fillStyle = c1 + "66";
                ctx.fill();
                ctx.strokeStyle = c1;
                ctx.lineWidth = 1.6;
                ctx.stroke();

                // bigger star
                ctx.beginPath();
                for (let i = 0; i < 5; i++) {
                    const a = i * (Math.PI * 2) / 5;
                    const x = Math.cos(a) * 13;
                    const y = Math.sin(a) * 13;
                    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
                }
                ctx.closePath();
                ctx.strokeStyle = c2;
                ctx.lineWidth = 1.3;
                ctx.stroke();

                ctx.restore();
            } else if (type === "creative") {
                for (let i = 0; i < 6; i++) {
                    ctx.beginPath();
                    for (let x = 0; x <= W; x += 3) {
                        const y =
                            H / 2 +
                            Math.sin(x * .02 + tt * 2 + i) * 25 +
                            Math.cos(x * .01 + i * 2) * 10;

                        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
                    }

                    ctx.strokeStyle = i % 2 ? c1 + "88" : c2 + "88";
                    ctx.lineWidth = 2;
                    ctx.stroke();
                }
            } else if (type === "tools") {

                const drawGear = (x, y, r, teeth, rot, col) => {
                    ctx.save();
                    ctx.translate(x, y);
                    ctx.rotate(rot);

                    for (let i = 0; i < teeth; i++) {
                        const a = i * (Math.PI * 2) / teeth;

                        ctx.beginPath();
                        ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r);
                        ctx.lineTo(Math.cos(a) * (r + 7), Math.sin(a) * (r + 7));
                        ctx.strokeStyle = col;
                        ctx.lineWidth = 1.6;
                        ctx.stroke();
                    }

                    ctx.beginPath();
                    ctx.arc(0, 0, r, 0, Math.PI * 2);
                    ctx.strokeStyle = col;
                    ctx.lineWidth = 1.4;
                    ctx.stroke();

                    ctx.restore();
                };

                // bigger gears
                drawGear(W / 2 - 28, H / 2, 18, 10, tt, c1);
                drawGear(W / 2 + 28, H / 2, 15, 10, -tt * 1.2, c2);
            }
            else {
                for (let i = 0; i < 7; i++) { const sx = Math.floor((i * 67 + tt * .3) % W / 20) * 20, sy = Math.floor((i * 43) % H / 20) * 20; ctx.beginPath(); ctx.arc(sx, sy, 3.5, 0, Math.PI * 2); ctx.fillStyle = c1; ctx.shadowBlur = 7; ctx.shadowColor = c1; ctx.fill(); ctx.shadowBlur = 0; if (i > 0) { const tx = Math.floor((i * 41 + tt * .2) % W / 20) * 20, ty = Math.floor((i * 31) % H / 20) * 20; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(tx, ty); ctx.strokeStyle = c1 + "44"; ctx.lineWidth = .9; ctx.stroke(); } }
            }
            tt += .04; raf = requestAnimationFrame(loop);
        };
        loop();
        return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", setup); };
    }, [t]);
    return <canvas ref={ref} style={{ width: "100%", height: 150, display: "block" }} />;
}
