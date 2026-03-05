export default function buildRocketPieces(t) {
    const easeOut = v => 1 - Math.pow(1 - v, 3);
    const N = 12;

    /* ── metallic gradient helpers ── */
    function metalLinear(ctx, x1, y1, x2, y2, shine = 0) {
        const g = ctx.createLinearGradient(x1, y1, x2, y2);
        const hi = t.metalHi;
        const mid = t.metalMid;
        const lo = t.metalLo;
        const dark = t.name === "dark" ? "#070c18" : "#d0d8ec";
        g.addColorStop(0, hi);
        g.addColorStop(0.15, mid);
        g.addColorStop(0.35, hi);  // specular highlight band
        g.addColorStop(0.55, mid);
        g.addColorStop(0.78, lo);
        g.addColorStop(1, dark);
        return g;
    }

    function metalRadial(ctx, cx, cy, r) {
        const g = ctx.createRadialGradient(cx - r * 0.25, cy - r * 0.25, 0, cx, cy, r);
        g.addColorStop(0, t.metalHi);
        g.addColorStop(0.3, t.metalMid);
        g.addColorStop(0.7, t.metalLo);
        g.addColorStop(1, t.name === "dark" ? "#0a1020" : "#b8c4d8");
        return g;
    }

    function rivet(ctx, x, y, r = 2.2) {
        const g = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, 0, x, y, r);
        g.addColorStop(0, "#e8eef8");
        g.addColorStop(0.5, t.metalHi);
        g.addColorStop(1, t.metalLo);
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.fill();
        ctx.strokeStyle = "rgba(0,0,0,.5)"; ctx.lineWidth = 0.5; ctx.stroke();
    }

    function metalPanel(ctx, x, y, w, h, angle = 0) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.rect(-w / 2, -h / 2, w, h);
        ctx.fillStyle = metalLinear(ctx, -w / 2, -h / 2, w / 2, h / 2);
        ctx.fill();
        ctx.strokeStyle = "rgba(0,0,0,.35)";
        ctx.lineWidth = 0.6;
        ctx.stroke();
        // seam highlight
        ctx.beginPath();
        ctx.moveTo(-w / 2 + 1, -h / 2 + 0.5);
        ctx.lineTo(w / 2 - 1, -h / 2 + 0.5);
        ctx.strokeStyle = "rgba(255,255,255,.12)";
        ctx.lineWidth = 0.4;
        ctx.stroke();
        ctx.restore();
    }

    /* ── Ferris wheel constants ── */
    const CX = 0, CY = -220;       // wheel centre (relative to canvas centre which is at bottom)
    const OUTER_R = 195;            // outer rim radius
    const INNER_R = 155;
    const HUB_R = 28;
    const NUM_GONDOLAS = 16;
    const GONDOLA_W = 18, GONDOLA_H = 22;

    return function drawFerrisWheel(ctx, progress) {
        const now = Date.now() * 0.0003;    // slow rotation for animation

        function piece(i, ox, oy, drawFn) {
            if (progress * N < i) return;
            const raw = Math.min(1, progress * N - i);
            const et = easeOut(raw);
            ctx.save();
            ctx.globalAlpha = Math.min(1, raw * 3);
            ctx.translate(ox * (1 - et), oy * (1 - et));
            ctx.rotate((1 - et) * Math.PI * (i % 2 === 0 ? 0.6 : -0.6));
            drawFn(ctx);
            ctx.restore();
        }

        /* 0 — BASE PLATFORM */
        piece(0, 0, 450, ctx => {
            // Ground platform — trapezoidal metal base
            const pw = 240, ph = 24, py = 0;
            ctx.beginPath();
            ctx.moveTo(-pw / 2 + 14, py); ctx.lineTo(pw / 2 - 14, py);
            ctx.lineTo(pw / 2, py + ph); ctx.lineTo(-pw / 2, py + ph);
            ctx.closePath();
            ctx.fillStyle = metalLinear(ctx, -pw / 2, py, pw / 2, py + ph);
            ctx.fill();
            ctx.strokeStyle = t.cyan + "55"; ctx.lineWidth = 1; ctx.stroke();

            // top edge highlight
            ctx.beginPath();
            ctx.moveTo(-pw / 2 + 16, py + 1); ctx.lineTo(pw / 2 - 16, py + 1);
            ctx.strokeStyle = t.cyan + "88"; ctx.lineWidth = 1.2; ctx.stroke();

            // rivets along platform
            for (let i = -5; i <= 5; i++) { rivet(ctx, i * 20, py + 6); rivet(ctx, i * 20, py + 18); }

            // subtle ground glow
            const gg = ctx.createRadialGradient(0, py + 20, 0, 0, py + 20, 140);
            gg.addColorStop(0, t.accent + "22"); gg.addColorStop(1, "transparent");
            ctx.fillStyle = gg; ctx.fillRect(-150, py, 300, 80);
        });

        /* 1 — SUPPORT COLUMNS — two A-frame legs */
        piece(1, -500, 300, ctx => {
            for (const side of [-1, 1]) {
                const bx = side * 70;
                const topX = side * 22;

                // Main leg
                ctx.beginPath();
                ctx.moveTo(bx - 8, 0); ctx.lineTo(bx + 8, 0);
                ctx.lineTo(topX + 5, CY + OUTER_R + 30);
                ctx.lineTo(topX - 5, CY + OUTER_R + 30);
                ctx.closePath();
                ctx.fillStyle = metalLinear(ctx, bx - 8, CY + OUTER_R + 30, bx + 8, 0);
                ctx.fill();
                ctx.strokeStyle = "rgba(0,0,0,.4)"; ctx.lineWidth = 0.7; ctx.stroke();

                // Specular edge
                ctx.beginPath();
                ctx.moveTo(bx - 6, 0); ctx.lineTo(topX - 3, CY + OUTER_R + 30);
                ctx.strokeStyle = "rgba(255,255,255,.12)"; ctx.lineWidth = 1.2; ctx.stroke();

                // Cross brace on leg
                const midY = (0 + CY + OUTER_R + 30) / 2;
                const midX = (bx + topX) / 2;
                ctx.beginPath();
                ctx.moveTo(midX - 14 * side, midY - 30);
                ctx.lineTo(midX + 6 * side, midY + 30);
                ctx.strokeStyle = t.metalMid + "77"; ctx.lineWidth = 2; ctx.stroke();

                // Rivets along leg
                for (let j = 0; j < 5; j++) {
                    const frac = (j + 1) / 6;
                    const rx = bx + (topX - bx) * frac;
                    const ry = 0 + (CY + OUTER_R + 30 - 0) * frac;
                    rivet(ctx, rx, ry, 2);
                }
            }

            // Crossbar connecting the two legs
            const crossY = CY + OUTER_R + 35;
            ctx.beginPath();
            ctx.rect(-30, crossY, 60, 8);
            ctx.fillStyle = metalLinear(ctx, -30, crossY, 30, crossY + 8);
            ctx.fill();
            ctx.strokeStyle = t.cyan + "44"; ctx.lineWidth = 0.8; ctx.stroke();
            for (let i = -3; i <= 3; i++) rivet(ctx, i * 8, crossY + 4, 1.8);
        });

        /* 2 — CENTRAL HUB */
        piece(2, 400, -500, ctx => {
            // Outer hub ring
            ctx.beginPath(); ctx.arc(CX, CY, HUB_R + 6, 0, Math.PI * 2);
            ctx.fillStyle = metalRadial(ctx, CX, CY, HUB_R + 6);
            ctx.fill();
            ctx.strokeStyle = t.cyan + "66"; ctx.lineWidth = 1.2; ctx.stroke();

            // Inner hub
            ctx.beginPath(); ctx.arc(CX, CY, HUB_R - 4, 0, Math.PI * 2);
            ctx.fillStyle = metalRadial(ctx, CX, CY, HUB_R - 4);
            ctx.fill();
            ctx.strokeStyle = "rgba(0,0,0,.4)"; ctx.lineWidth = 0.8; ctx.stroke();

            // Hub bolts
            for (let i = 0; i < 8; i++) {
                const a = (i / 8) * Math.PI * 2;
                rivet(ctx, CX + Math.cos(a) * (HUB_R - 1), CY + Math.sin(a) * (HUB_R - 1), 2.5);
            }

            // Centre cap
            ctx.beginPath(); ctx.arc(CX, CY, 8, 0, Math.PI * 2);
            const cg = ctx.createRadialGradient(CX - 2, CY - 2, 0, CX, CY, 8);
            cg.addColorStop(0, "#f0f4ff"); cg.addColorStop(0.5, t.metalHi); cg.addColorStop(1, t.metalMid);
            ctx.fillStyle = cg; ctx.fill();
            ctx.strokeStyle = "rgba(0,0,0,.3)"; ctx.lineWidth = 0.6; ctx.stroke();
        });

        /* 3 — INNER SPOKES */
        piece(3, -500, -400, ctx => {
            for (let i = 0; i < NUM_GONDOLAS; i++) {
                const angle = (i / NUM_GONDOLAS) * Math.PI * 2 + now;
                const ex = CX + Math.cos(angle) * INNER_R * 0.55;
                const ey = CY + Math.sin(angle) * INNER_R * 0.55;
                ctx.beginPath();
                ctx.moveTo(CX, CY); ctx.lineTo(ex, ey);
                ctx.strokeStyle = metalLinear(ctx, CX, CY, ex, ey);
                ctx.lineWidth = 3;
                ctx.stroke();
                // Edge highlight
                ctx.beginPath();
                ctx.moveTo(CX + Math.cos(angle) * 12, CY + Math.sin(angle) * 12);
                ctx.lineTo(ex, ey);
                ctx.strokeStyle = "rgba(255,255,255,.08)";
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        });

        /* 4 — OUTER SPOKES */
        piece(4, 500, -300, ctx => {
            for (let i = 0; i < NUM_GONDOLAS; i++) {
                const angle = (i / NUM_GONDOLAS) * Math.PI * 2 + now;
                const sx = CX + Math.cos(angle) * INNER_R * 0.55;
                const sy = CY + Math.sin(angle) * INNER_R * 0.55;
                const ex = CX + Math.cos(angle) * (OUTER_R - 8);
                const ey = CY + Math.sin(angle) * (OUTER_R - 8);
                ctx.beginPath();
                ctx.moveTo(sx, sy); ctx.lineTo(ex, ey);
                ctx.strokeStyle = metalLinear(ctx, sx, sy, ex, ey);
                ctx.lineWidth = 2.4;
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(sx, sy); ctx.lineTo(ex, ey);
                ctx.strokeStyle = "rgba(255,255,255,.06)";
                ctx.lineWidth = 0.8;
                ctx.stroke();
            }
        });

        /* 5 — STRUCTURAL RING — inner ring for rigidity */
        piece(5, -400, -200, ctx => {
            ctx.beginPath();
            ctx.arc(CX, CY, INNER_R, 0, Math.PI * 2);
            ctx.strokeStyle = metalLinear(ctx, CX - INNER_R, CY, CX + INNER_R, CY);
            ctx.lineWidth = 5;
            ctx.stroke();

            // Inner edge highlight
            ctx.beginPath();
            ctx.arc(CX, CY, INNER_R - 2, 0, Math.PI * 2);
            ctx.strokeStyle = "rgba(255,255,255,.08)";
            ctx.lineWidth = 0.8;
            ctx.stroke();

            // Panel joints
            for (let i = 0; i < NUM_GONDOLAS; i++) {
                const a = (i / NUM_GONDOLAS) * Math.PI * 2 + now;
                rivet(ctx, CX + Math.cos(a) * INNER_R, CY + Math.sin(a) * INNER_R, 2.2);
            }
        });

        /* 6 — GONDOLA MOUNTS — metal brackets hanging from rim */
        piece(6, 400, 350, ctx => {
            for (let i = 0; i < NUM_GONDOLAS; i++) {
                const angle = (i / NUM_GONDOLAS) * Math.PI * 2 + now;
                const rx = CX + Math.cos(angle) * OUTER_R;
                const ry = CY + Math.sin(angle) * OUTER_R;
                const gx = CX + Math.cos(angle) * (OUTER_R + 14);
                const gy = CY + Math.sin(angle) * (OUTER_R + 14);

                // Bracket arm
                ctx.beginPath();
                ctx.moveTo(rx, ry); ctx.lineTo(gx, gy);
                ctx.strokeStyle = t.metalHi;
                ctx.lineWidth = 2.5;
                ctx.stroke();
                ctx.strokeStyle = "rgba(0,0,0,.35)";
                ctx.lineWidth = 0.5;
                ctx.stroke();

                // Pivot rivet
                rivet(ctx, rx, ry, 2.8);
            }
        });

        /* 7 — GONDOLAS — the hanging pods */
        piece(7, -450, 400, ctx => {
            for (let i = 0; i < NUM_GONDOLAS; i++) {
                const angle = (i / NUM_GONDOLAS) * Math.PI * 2 + now;
                const gx = CX + Math.cos(angle) * (OUTER_R + 14);
                const gy = CY + Math.sin(angle) * (OUTER_R + 14);

                ctx.save();
                ctx.translate(gx, gy);
                // Gondolas always hang down (gravity)
                const swing = Math.sin(now * 2 + i) * 0.03;

                ctx.beginPath();
                ctx.roundRect(-GONDOLA_W / 2, -2, GONDOLA_W, GONDOLA_H, [2, 2, 5, 5]);
                const gg = ctx.createLinearGradient(-GONDOLA_W / 2, 0, GONDOLA_W / 2, GONDOLA_H);
                const hue = (i / NUM_GONDOLAS) * 360;
                const baseCol = `hsl(${hue}, 55%, ${t.name === "dark" ? 45 : 55}%)`;
                const darkCol = `hsl(${hue}, 45%, ${t.name === "dark" ? 25 : 35}%)`;
                gg.addColorStop(0, baseCol);
                gg.addColorStop(1, darkCol);
                ctx.fillStyle = gg;
                ctx.fill();
                ctx.strokeStyle = "rgba(0,0,0,.4)";
                ctx.lineWidth = 0.7;
                ctx.stroke();

                // Window
                ctx.beginPath();
                ctx.roundRect(-GONDOLA_W / 2 + 3, 3, GONDOLA_W - 6, 8, 2);
                const wg = ctx.createLinearGradient(0, 3, 0, 11);
                wg.addColorStop(0, t.cyan + "88");
                wg.addColorStop(1, t.cyan + "22");
                ctx.fillStyle = wg;
                ctx.fill();
                ctx.strokeStyle = t.cyan + "55";
                ctx.lineWidth = 0.5;
                ctx.stroke();

                ctx.restore();
            }
        });

        /* 8 — DECORATIVE TRIM — etched details on hub and legs */
        piece(8, 0, -600, ctx => {
            // Decorative hub rings
            for (const r of [HUB_R + 10, HUB_R + 14]) {
                ctx.beginPath();
                ctx.arc(CX, CY, r, 0, Math.PI * 2);
                ctx.strokeStyle = t.accent + "33";
                ctx.lineWidth = 0.8;
                ctx.setLineDash([4, 6]);
                ctx.stroke();
                ctx.setLineDash([]);
            }

            // Decorative stamp marks on ring
            for (let i = 0; i < 8; i++) {
                const a = (i / 8) * Math.PI * 2 + now * 0.5;
                const dx = CX + Math.cos(a) * (HUB_R + 12);
                const dy = CY + Math.sin(a) * (HUB_R + 12);
                ctx.beginPath();
                ctx.arc(dx, dy, 1.5, 0, Math.PI * 2);
                ctx.fillStyle = t.magenta + "55";
                ctx.fill();
            }

            // "METAL EARTH" engraved text on hub
            ctx.save();
            ctx.font = "bold 5px 'JetBrains Mono',monospace";
            ctx.fillStyle = t.cyan + "66";
            ctx.textAlign = "center";
            ctx.fillText("METAL EARTH", CX, CY + HUB_R + 22);
            ctx.restore();
        });

        /* 9 — CROSS BRACING — diagonal struts between spokes */
        piece(9, 500, -500, ctx => {
            for (let i = 0; i < NUM_GONDOLAS; i++) {
                const a1 = (i / NUM_GONDOLAS) * Math.PI * 2 + now;
                const a2 = ((i + 1) / NUM_GONDOLAS) * Math.PI * 2 + now;
                // Inner cross
                const r1 = INNER_R * 0.4, r2 = INNER_R * 0.75;
                const x1 = CX + Math.cos(a1) * r1;
                const y1 = CY + Math.sin(a1) * r1;
                const x2 = CX + Math.cos(a2) * r2;
                const y2 = CY + Math.sin(a2) * r2;
                ctx.beginPath();
                ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
                ctx.strokeStyle = t.metalMid + "55";
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        });

        /* 10 — OUTER RIM — the main circular rail */
        piece(10, 0, -700, ctx => {
            // Outer rim — thick metallic band
            ctx.beginPath();
            ctx.arc(CX, CY, OUTER_R, 0, Math.PI * 2);
            ctx.strokeStyle = metalLinear(ctx, CX - OUTER_R, CY - OUTER_R, CX + OUTER_R, CY + OUTER_R);
            ctx.lineWidth = 8;
            ctx.stroke();

            // Outer rim edge highlights
            ctx.beginPath();
            ctx.arc(CX, CY, OUTER_R + 3.5, 0, Math.PI * 2);
            ctx.strokeStyle = "rgba(255,255,255,.06)";
            ctx.lineWidth = 0.5;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(CX, CY, OUTER_R - 3.5, 0, Math.PI * 2);
            ctx.strokeStyle = "rgba(0,0,0,.2)";
            ctx.lineWidth = 0.5;
            ctx.stroke();

            // Rivets along outer rim
            for (let i = 0; i < NUM_GONDOLAS * 2; i++) {
                const a = (i / (NUM_GONDOLAS * 2)) * Math.PI * 2 + now;
                rivet(ctx, CX + Math.cos(a) * OUTER_R, CY + Math.sin(a) * OUTER_R, 2);
            }

            // Stamped panel lines
            for (let i = 0; i < NUM_GONDOLAS; i++) {
                const a = (i / NUM_GONDOLAS) * Math.PI * 2 + now;
                const x1 = CX + Math.cos(a) * (OUTER_R - 4);
                const y1 = CY + Math.sin(a) * (OUTER_R - 4);
                const x2 = CX + Math.cos(a) * (OUTER_R + 4);
                const y2 = CY + Math.sin(a) * (OUTER_R + 4);
                ctx.beginPath();
                ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
                ctx.strokeStyle = "rgba(0,0,0,.2)";
                ctx.lineWidth = 0.6;
                ctx.stroke();
            }
        });

        /* 11 — LIGHTS & GLOW — fairy lights along rim + glow effects */
        piece(11, 0, 0, ctx => {
            // Rim lights
            for (let i = 0; i < NUM_GONDOLAS * 3; i++) {
                const a = (i / (NUM_GONDOLAS * 3)) * Math.PI * 2 + now;
                const lx = CX + Math.cos(a) * (OUTER_R + 1);
                const ly = CY + Math.sin(a) * (OUTER_R + 1);
                const flicker = 0.6 + 0.4 * Math.sin(now * 12 + i * 1.3);
                const hue = (i / (NUM_GONDOLAS * 3)) * 360;
                const col = `hsla(${hue}, 80%, 70%, ${flicker * 0.8})`;

                ctx.beginPath();
                ctx.arc(lx, ly, 2, 0, Math.PI * 2);
                ctx.fillStyle = col;
                ctx.shadowBlur = 8;
                ctx.shadowColor = col;
                ctx.fill();
                ctx.shadowBlur = 0;
            }

            // Hub glow
            const hg = ctx.createRadialGradient(CX, CY, 0, CX, CY, HUB_R + 30);
            hg.addColorStop(0, t.cyan + "22");
            hg.addColorStop(0.5, t.accent + "0a");
            hg.addColorStop(1, "transparent");
            ctx.beginPath();
            ctx.arc(CX, CY, HUB_R + 30, 0, Math.PI * 2);
            ctx.fillStyle = hg;
            ctx.fill();

            // Ground reflection
            const gr = ctx.createRadialGradient(0, 20, 0, 0, 20, 160);
            gr.addColorStop(0, t.magenta + "18");
            gr.addColorStop(0.4, t.accent + "0c");
            gr.addColorStop(1, "transparent");
            ctx.fillStyle = gr;
            ctx.fillRect(-180, -10, 360, 120);

            // Spoke glow pulse
            for (let i = 0; i < NUM_GONDOLAS; i++) {
                const angle = (i / NUM_GONDOLAS) * Math.PI * 2 + now;
                const pulse = 0.3 + 0.3 * Math.sin(now * 5 + i * 0.8);
                const sx = CX + Math.cos(angle) * (INNER_R * 0.7);
                const sy = CY + Math.sin(angle) * (INNER_R * 0.7);
                const sg = ctx.createRadialGradient(sx, sy, 0, sx, sy, 12);
                sg.addColorStop(0, t.cyan + Math.floor(pulse * 50).toString(16).padStart(2, "0"));
                sg.addColorStop(1, "transparent");
                ctx.beginPath();
                ctx.arc(sx, sy, 12, 0, Math.PI * 2);
                ctx.fillStyle = sg;
                ctx.fill();
            }
        });
    };
}
