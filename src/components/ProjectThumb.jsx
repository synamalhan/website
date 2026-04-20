import { useEffect, useRef } from "react";
import { addAlpha } from "./styles";

export default function ProjectThumb({ type, colors, t }) {
    const ref = useRef();
    
    useEffect(() => {
        const cv = ref.current; if (!cv) return;
        const ctx = cv.getContext("2d"); let raf, tt = 0;
        const setup = () => { cv.width = cv.offsetWidth || 300; cv.height = 150; };
        setup(); window.addEventListener("resize", setup);
        const [c1, c2] = colors;

        const drawSketchLine = (x1, y1, x2, y2) => {
            ctx.beginPath();
            ctx.moveTo(x1 + (Math.random()-0.5)*3, y1 + (Math.random()-0.5)*3);
            ctx.lineTo(x2 + (Math.random()-0.5)*3, y2 + (Math.random()-0.5)*3);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x1 + (Math.random()-0.5)*3, y1 + (Math.random()-0.5)*3);
            ctx.lineTo(x2 + (Math.random()-0.5)*3, y2 + (Math.random()-0.5)*3);
            ctx.stroke();
        };

        const drawSketchRect = (x, y, w, h) => {
            drawSketchLine(x, y, x+w, y);
            drawSketchLine(x+w, y, x+w, y+h);
            drawSketchLine(x+w, y+h, x, y+h);
            drawSketchLine(x, y+h, x, y);
        };

        const drawSketchCircle = (cx, cy, r) => {
            ctx.beginPath();
            for(let a=0; a<Math.PI*2; a+=0.3) {
                const nx = cx + Math.cos(a) * (r + (Math.random()-0.5)*2);
                const ny = cy + Math.sin(a) * (r + (Math.random()-0.5)*2);
                a===0 ? ctx.moveTo(nx, ny) : ctx.lineTo(nx, ny);
            }
            ctx.closePath();
            ctx.stroke();
            
            ctx.beginPath();
            for(let a=0; a<Math.PI*2; a+=0.3) {
                const nx = cx + Math.cos(a) * (r + (Math.random()-0.5)*2);
                const ny = cy + Math.sin(a) * (r + (Math.random()-0.5)*2);
                a===0 ? ctx.moveTo(nx, ny) : ctx.lineTo(nx, ny);
            }
            ctx.closePath();
            ctx.stroke();
        };

        const loop = () => {
            const W = cv.width, H = cv.height;
            // Darker background
            ctx.fillStyle = t.name === 'dark' ? '#111115' : '#e8e5dc';
            ctx.fillRect(0, 0, W, H);
            
            // Soft glowing blob in the center
            const bg = ctx.createRadialGradient(W/2, H/2, 10, W/2, H/2, W/1.2);
            bg.addColorStop(0, addAlpha(c1, "33"));
            bg.addColorStop(1, "transparent");
            ctx.fillStyle = bg;
            ctx.fillRect(0, 0, W, H);

            // Subtle chaotic sketch noise in the background
            ctx.strokeStyle = t.name === 'dark' ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
            ctx.lineWidth = 0.5;
            for (let i = 0; i < 15; i++) {
                drawSketchLine(Math.random()*W, Math.random()*H, Math.random()*W, Math.random()*H);
            }

            ctx.lineWidth = 1.5;
            
            if (type === "ios") {
                const px = W / 2, py = H / 2;
                ctx.strokeStyle = c1;
                drawSketchRect(px - 24, py - 44, 48, 88);
                ctx.strokeStyle = addAlpha(c2, "aa");
                drawSketchRect(px - 19, py - 37, 38, 66);
                drawSketchCircle(px, py + 35, 3);
            } else if (type === "ml") {
                for (let i = 0; i < 12; i++) { 
                    const x = (i * 53 + tt * 16) % W, y = (i * 37 + tt * 11) % H; 
                    ctx.strokeStyle = i % 2 ? addAlpha(c1, "cc") : addAlpha(c2, "cc");
                    drawSketchCircle(x, y, 6 + Math.sin(tt+i)*3);
                }
                for (let i = 0; i < 3; i++) {
                    const y = H * (i + 1) / 4;
                    ctx.beginPath();
                    for (let x = 0; x < W; x += 10) {
                        const yv = y + Math.sin((x + tt * 50 + i * 40) * .08) * 14 + (Math.random()-0.5)*3;
                        x === 0 ? ctx.moveTo(x, yv) : ctx.lineTo(x, yv);
                    }
                    ctx.strokeStyle = i % 2 ? addAlpha(c1, "66") : addAlpha(c2, "66");
                    ctx.stroke();
                }
            } else if (type === "fullstack") {
                const lx = W / 2, ly = H / 2 - 10;
                ctx.strokeStyle = addAlpha(c1, "dd");
                drawSketchRect(lx - 40, ly - 25, 80, 50);
                ctx.strokeStyle = addAlpha(c2, "aa");
                drawSketchRect(lx - 55, ly + 25, 110, 8);
                // "Code" lines drawn sketch-style
                for (let i = 0; i < 4; i++) {
                    const y = ly - 15 + i * 10;
                    ctx.strokeStyle = i % 2 ? addAlpha(c1, "88") : addAlpha(c2, "88");
                    drawSketchLine(lx - 30, y, lx + 30, y);
                }
            } else if (type === "vision") {
                const cx = W / 2, cy = H / 2;
                const blink = (Math.sin(tt * 1.6) + 1) / 2;
                ctx.strokeStyle = c1;
                // Eye outline
                ctx.beginPath();
                ctx.ellipse(cx, cy, 45, 20 * blink + 5, 0, 0, Math.PI * 2);
                ctx.stroke();
                // Hand drawn second stroke to make it messy
                ctx.beginPath();
                ctx.ellipse(cx + 1, cy + 1, 46, 21 * blink + 6, 0.05, 0, Math.PI * 2);
                ctx.stroke();
                
                ctx.strokeStyle = c2;
                drawSketchCircle(cx, cy, 14);
            } else if (type === "hackathon") {
                const cx = W / 2, cy = H / 2;
                ctx.strokeStyle = c1;
                drawSketchCircle(cx, cy, 28);
                ctx.strokeStyle = c2;
                ctx.beginPath();
                for (let i = 0; i < 5; i++) {
                    const a = i * (Math.PI * 2) / 5;
                    const x = cx + Math.cos(a) * 14 + (Math.random()-0.5)*2;
                    const y = cy + Math.sin(a) * 14 + (Math.random()-0.5)*2;
                    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
                }
                ctx.closePath();
                ctx.stroke();
            } else if (type === "creative") {
                for (let i = 0; i < 5; i++) {
                    ctx.beginPath();
                    for (let x = 0; x <= W; x += 8) {
                        const y = H / 2 + Math.sin(x * .02 + tt * 2 + i) * 20 + (Math.random()-0.5)*6;
                        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
                    }
                    ctx.strokeStyle = i % 2 ? addAlpha(c1, "99") : addAlpha(c2, "99");
                    ctx.stroke();
                    // duplicate stroke
                    ctx.beginPath();
                    for (let x = 0; x <= W; x += 8) {
                        const y = H / 2 + Math.sin(x * .02 + tt * 2 + i) * 20 + (Math.random()-0.5)*6;
                        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
                    }
                    ctx.stroke();
                }
            } else if (type === "tools") {
                const drawGear = (x, y, r, teeth, col) => {
                    ctx.strokeStyle = col;
                    drawSketchCircle(x, y, r);
                    for (let i = 0; i < teeth; i++) {
                        const a = i * (Math.PI * 2) / teeth;
                        drawSketchLine(
                            x + Math.cos(a)*r, y + Math.sin(a)*r,
                            x + Math.cos(a)*(r+8), y + Math.sin(a)*(r+8)
                        );
                    }
                };
                drawGear(W / 2 - 25, H / 2, 16, 8, c1);
                drawGear(W / 2 + 25, H / 2, 14, 8, c2);
            } else {
                for(let i=0; i<8; i++) {
                    ctx.strokeStyle = addAlpha(c1, "cc");
                    drawSketchCircle(W/2 + (Math.random()-0.5)*50, H/2 + (Math.random()-0.5)*30, Math.random()*20 + 5);
                }
            }
            tt += .04; raf = requestAnimationFrame(loop);
        };
        loop();
        return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", setup); };
    }, [t, type, colors]);
    
    return <canvas ref={ref} style={{ width: "100%", height: 150, display: "block", borderRadius: "12px 12px 0 0" }} />;
}
