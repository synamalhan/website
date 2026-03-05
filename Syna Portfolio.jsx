import { useState, useEffect, useRef, useCallback } from "react";

/* ─────────────────────────────────────────────
   THEME  — all colours live here
───────────────────────────────────────────── */
const THEMES = {
  dark: {
    bg:         "#06040f",
    surface:    "#0e0b1e",
    border:     "rgba(123,47,255,0.18)",
    borderHi:   "rgba(123,47,255,0.55)",
    text:       "#c8d0e0",
    textMute:   "rgba(180,190,210,0.45)",
    textHi:     "#ffffff",
    accent:     "#8b5cf6",   // purple
    accentGlow: "rgba(139,92,246,0.35)",
    cyan:       "#22d3ee",
    cyanGlow:   "rgba(34,211,238,0.3)",
    magenta:    "#e040fb",
    gold:       "#f59e0b",
    particle1:  "123,47,255",
    particle2:  "34,211,238",
    particle3:  "224,64,251",
    navBg:      "rgba(6,4,15,0.92)",
    cardBg:     "rgba(14,11,30,0.85)",
    metalHi:    "#c8d8ec",
    metalMid:   "#6a7a90",
    metalLo:    "#1a2238",
    name:       "dark",
  },
  light: {
    bg:         "#f4f2fa",
    surface:    "#ffffff",
    border:     "rgba(139,92,246,0.2)",
    borderHi:   "rgba(139,92,246,0.6)",
    text:       "#3a3550",
    textMute:   "rgba(80,70,120,0.5)",
    textHi:     "#1a1530",
    accent:     "#7c3aed",
    accentGlow: "rgba(124,58,237,0.2)",
    cyan:       "#0891b2",
    cyanGlow:   "rgba(8,145,178,0.2)",
    magenta:    "#c026d3",
    gold:       "#d97706",
    particle1:  "139,92,246",
    particle2:  "8,145,178",
    particle3:  "192,38,211",
    navBg:      "rgba(244,242,250,0.94)",
    cardBg:     "rgba(255,255,255,0.92)",
    metalHi:    "#8090a8",
    metalMid:   "#4a5878",
    metalLo:    "#c8d0e0",
    name:       "light",
  },
};

/* ─────────────────────────────────────────────
   GLOBAL STYLES injected once
───────────────────────────────────────────── */
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap');
    *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
    html { scroll-behavior:smooth; }
    body { overflow-x:hidden; cursor:none; }
    ::-webkit-scrollbar { width:3px; }
    ::-webkit-scrollbar-thumb { border-radius:2px; background:#8b5cf6; }

    @keyframes fadeUp   { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
    @keyframes pulse    { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.6);opacity:.5} }
    @keyframes scanLine { 0%,100%{transform:scaleX(.6);opacity:.2} 50%{transform:scaleX(1);opacity:.9} }
    @keyframes floatY   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
    @keyframes completeAnim { 0%,100%{opacity:.7;transform:translateX(-50%) scale(1)} 50%{opacity:1;transform:translateX(-50%) scale(1.02)} }
    @keyframes g1 { 0%,87%,100%{opacity:0;transform:translate(-2px,-2px)} 90%{opacity:.7;transform:translate(-4px,0)} 94%{opacity:0} }
    @keyframes g2 { 0%,87%,100%{opacity:0;transform:translate(2px,2px)}  90%{opacity:.7;transform:translate(4px,0)}  94%{opacity:0} }

    .glitch { position:relative; }
    .glitch::before,.glitch::after { content:attr(data-text);position:absolute;top:0;left:0;width:100%;height:100%;font-family:inherit;font-size:inherit;font-weight:inherit; }
    .glitch::before { color:#22d3ee; clip-path:polygon(0 0,100% 0,100% 42%,0 42%); animation:g1 4s infinite; }
    .glitch::after  { color:#e040fb; clip-path:polygon(0 58%,100% 58%,100% 100%,0 100%); animation:g2 4s infinite; }
    .scanbar { animation:scanLine 3s infinite; }
    .float-y { animation:floatY 2s ease-in-out infinite; }
  `}</style>
);

/* ─────────────────────────────────────────────
   CURSOR
───────────────────────────────────────────── */
function Cursor({ t }) {
  const dot  = useRef();
  const ring = useRef();
  useEffect(() => {
    const move = e => {
      dot.current  && Object.assign(dot.current.style,  { left:`${e.clientX}px`, top:`${e.clientY}px` });
      setTimeout(() => ring.current && Object.assign(ring.current.style, { left:`${e.clientX}px`, top:`${e.clientY}px` }), 85);
    };
    document.addEventListener("mousemove", move);
    return () => document.removeEventListener("mousemove", move);
  }, []);
  return (
    <>
      <div ref={dot} style={{ position:"fixed", width:8, height:8, borderRadius:"50%", background:t.cyan,
        transform:"translate(-50%,-50%)", pointerEvents:"none", zIndex:9999,
        boxShadow:`0 0 10px ${t.cyan}`, mixBlendMode:"difference" }} />
      <div ref={ring} style={{ position:"fixed", width:28, height:28, borderRadius:"50%",
        border:`1px solid ${t.accent}`, transform:"translate(-50%,-50%)",
        pointerEvents:"none", zIndex:9998, opacity:.5 }} />
    </>
  );
}

/* ─────────────────────────────────────────────
   OCEAN BACKGROUND — minimised particle count
───────────────────────────────────────────── */
function OceanBg({ t }) {
  const ref = useRef();
  useEffect(() => {
    const cv = ref.current;
    const ctx = cv.getContext("2d");
    let W, H, raf;
    const pts = [];

    const resize = () => { W = cv.width = window.innerWidth; H = cv.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 90; i++) pts.push({
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
        const rg = ctx.createRadialGradient(W/2, H*.4, 0, W/2, H*.4, W*.65);
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

  return <canvas ref={ref} style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none" }} />;
}

/* ─────────────────────────────────────────────
   ROCKET DRAW — all metal rocket rendering
   centred at (0, 0) = rocket bottom
───────────────────────────────────────────── */
function buildRocketPieces(t) {
  const easeOut = v => 1 - Math.pow(1 - v, 3);
  const N = 12;

  function mg(ctx, x1, y1, x2, y2) {
    const g = ctx.createLinearGradient(x1, y1, x2, y2);
    g.addColorStop(0,  t.metalHi);
    g.addColorStop(.35, t.metalMid);
    g.addColorStop(.75, t.metalLo);
    g.addColorStop(1,  t.name === "dark" ? "#070c18" : "#d0d8ec");
    return g;
  }
  function mr(ctx, x, y, r) {
    const g = ctx.createRadialGradient(x - r*.3, y - r*.3, 0, x, y, r);
    g.addColorStop(0, t.metalHi); g.addColorStop(.45, t.metalMid);
    g.addColorStop(1, t.metalLo); return g;
  }
  function rivet(ctx, x, y, r = 2) {
    const g = ctx.createRadialGradient(x - r*.3, y - r*.3, 0, x, y, r);
    g.addColorStop(0, t.metalHi); g.addColorStop(1, t.metalLo);
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = g; ctx.fill();
    ctx.strokeStyle = "rgba(0,0,0,.4)"; ctx.lineWidth = .4; ctx.stroke();
  }
  function seam(ctx, x1, y1, x2, y2) {
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
    ctx.strokeStyle = "rgba(0,0,0,.35)"; ctx.lineWidth = 1; ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x1, y1+.7); ctx.lineTo(x2, y2+.7);
    ctx.strokeStyle = "rgba(255,255,255,.08)"; ctx.lineWidth = .5; ctx.stroke();
  }

  return function drawRocket(ctx, progress) {
    function piece(i, ox, oy, drawFn) {
      if (progress * N < i) return;
      const raw = Math.min(1, progress * N - i);
      const et  = easeOut(raw);
      ctx.save();
      ctx.globalAlpha = Math.min(1, raw * 3);
      ctx.translate(ox * (1 - et), oy * (1 - et));
      ctx.rotate((1 - et) * Math.PI * (i % 2 === 0 ? .7 : -.7));
      drawFn(ctx);
      ctx.restore();
    }

    // 0 — LAUNCH PLATFORM
    piece(0, 0, 650, ctx => {
      const by = -22, bw = 210;
      ctx.beginPath();
      ctx.moveTo(-bw/2+10, by); ctx.lineTo(bw/2-10, by);
      ctx.lineTo(bw/2, by+22); ctx.lineTo(-bw/2, by+22); ctx.closePath();
      ctx.fillStyle = mg(ctx, -bw/2, by, bw/2, by+22); ctx.fill();
      ctx.strokeStyle = t.cyan + "88"; ctx.lineWidth = 1.2; ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-bw/2+12, by+1); ctx.lineTo(bw/2-12, by+1);
      ctx.strokeStyle = t.cyan; ctx.lineWidth = 1.2; ctx.stroke();
      for (let i = -4; i <= 4; i++) { rivet(ctx, i*22, by+4); rivet(ctx, i*22, by+18); }
      // truss
      for (const lx of [-72,-36,0,36,72]) {
        ctx.beginPath(); ctx.moveTo(lx, by+22); ctx.lineTo(lx-7, by+50);
        ctx.strokeStyle = t.metalMid + "60"; ctx.lineWidth = 1.3; ctx.stroke();
        ctx.beginPath(); ctx.moveTo(lx, by+22); ctx.lineTo(lx+7, by+50);
        ctx.strokeStyle = t.metalMid + "40"; ctx.lineWidth = 1; ctx.stroke();
      }
      const gg = ctx.createRadialGradient(0, by+30, 0, 0, by+30, 130);
      gg.addColorStop(0, "rgba(123,47,255,.3)"); gg.addColorStop(1, "transparent");
      ctx.fillStyle = gg; ctx.fillRect(-130, by, 260, 90);
    });

    // 1 — ENGINE BELLS
    piece(1, -500, 480, ctx => {
      for (const ex of [-40, 0, 40]) {
        ctx.beginPath();
        ctx.moveTo(ex-13,-22); ctx.lineTo(ex+13,-22); ctx.lineTo(ex+20,18); ctx.lineTo(ex-20,18); ctx.closePath();
        const bg = ctx.createLinearGradient(ex-20,-22,ex+20,18);
        bg.addColorStop(0, t.metalHi); bg.addColorStop(.5, t.metalMid); bg.addColorStop(1, t.metalLo);
        ctx.fillStyle = bg; ctx.fill();
        ctx.strokeStyle = t.accent + "88"; ctx.lineWidth = 1; ctx.stroke();
        // inner glow
        ctx.beginPath(); ctx.ellipse(ex, 16, 14, 5, 0, 0, Math.PI*2);
        const ig = ctx.createRadialGradient(ex,16,0,ex,16,15);
        ig.addColorStop(0, t.magenta + "dd"); ig.addColorStop(1, t.accent + "11");
        ctx.fillStyle = ig; ctx.fill();
        ctx.beginPath(); ctx.ellipse(ex,-22,13,5,0,0,Math.PI*2);
        ctx.strokeStyle = t.cyan + "77"; ctx.lineWidth = 1; ctx.stroke();
        for (let r = 0; r < 6; r++) rivet(ctx, ex+Math.cos(r/6*Math.PI*2)*12, -22+Math.sin(r/6*Math.PI*2)*5, 1.8);
      }
    });

    // 2 — S-I LOWER BODY
    piece(2, 580, 180, ctx => {
      const [bw,bh,by] = [86,95,-22-95];
      ctx.beginPath(); ctx.rect(-bw/2, by, bw, bh);
      ctx.fillStyle = mg(ctx,-bw/2,by,bw/2,by+bh); ctx.fill();
      ctx.strokeStyle = t.border; ctx.lineWidth = .8; ctx.stroke();
      for (let i = 1; i < 4; i++) seam(ctx,-bw/2+2,by+i*bh/4,bw/2-2,by+i*bh/4);
      for (let i = 0; i < 4; i++) { rivet(ctx,-bw/2+5,by+12+i*20); rivet(ctx,bw/2-5,by+12+i*20); }
    });

    // 3 — S-I UPPER BODY
    piece(3, -580, 100, ctx => {
      const [bw,bh,by] = [86,105,-22-95-105];
      ctx.beginPath(); ctx.rect(-bw/2,by,bw,bh);
      ctx.fillStyle = mg(ctx,-bw/2,by,bw/2,by+bh); ctx.fill();
      ctx.strokeStyle = t.border; ctx.lineWidth = .8; ctx.stroke();
      for (let i = 1; i < 4; i++) seam(ctx,-bw/2+2,by+i*bh/4,bw/2-2,by+i*bh/4);
      // NASA stripe
      ctx.beginPath(); ctx.rect(-bw/2, by+bh*.38, bw, bh*.1);
      ctx.fillStyle = t.cyan + "18"; ctx.fill();
      ctx.strokeStyle = t.cyan + "55"; ctx.lineWidth = .7; ctx.stroke();
      ctx.font = "bold 7px 'JetBrains Mono',monospace"; ctx.fillStyle = t.cyan + "88"; ctx.textAlign = "center";
      ctx.fillText("USA", 0, by+bh*.46);
      for (let i = 0; i < 5; i++) { rivet(ctx,-bw/2+5,by+10+i*18); rivet(ctx,bw/2-5,by+10+i*18); }
    });

    // 4 — DELTA FINS
    piece(4, 420, 460, ctx => {
      for (const [fx, sc] of [[-43, 1], [43, -1]]) {
        ctx.save(); ctx.scale(sc, 1);
        ctx.beginPath();
        ctx.moveTo(43*.6,-22); ctx.lineTo(78,55); ctx.lineTo(78,100); ctx.lineTo(43*.6,74); ctx.closePath();
        const fg = ctx.createLinearGradient(43,-22,78,100);
        fg.addColorStop(0, t.metalHi); fg.addColorStop(.5, t.metalMid); fg.addColorStop(1, t.metalLo);
        ctx.fillStyle = fg; ctx.fill();
        ctx.strokeStyle = t.accent + "66"; ctx.lineWidth = 1; ctx.stroke();
        ctx.beginPath(); ctx.moveTo(43*.6,-22); ctx.lineTo(78,55);
        ctx.strokeStyle = "rgba(255,255,255,.15)"; ctx.lineWidth = .8; ctx.stroke();
        ctx.restore();
      }
    });

    // 5 — INTERSTAGE RING
    piece(5, -580, -80, ctx => {
      const [rw,rh,ry] = [86, 28, -22-95-105-28];
      ctx.beginPath(); ctx.rect(-rw/2,ry,rw,rh);
      ctx.fillStyle = mg(ctx,-rw/2,ry,rw/2,ry+rh); ctx.fill();
      ctx.strokeStyle = t.cyan + "66"; ctx.lineWidth = 1.2; ctx.stroke();
      for (let i = 0; i < 9; i++) rivet(ctx,-rw/2+10+i*(rw-20)/8, ry+rh/2, 2.5);
      ctx.beginPath(); ctx.moveTo(-rw/2+3,ry+rh/2); ctx.lineTo(rw/2-3,ry+rh/2);
      ctx.strokeStyle = t.magenta + "77"; ctx.lineWidth = 1.8; ctx.setLineDash([5,7]); ctx.stroke(); ctx.setLineDash([]);
    });

    // 6 — S-II BODY
    piece(6, 500, -380, ctx => {
      const [bw,bh,by] = [70,108,-22-95-105-28-108];
      ctx.beginPath(); ctx.rect(-bw/2,by,bw,bh);
      ctx.fillStyle = mg(ctx,-bw/2,by,bw/2,by+bh); ctx.fill();
      ctx.strokeStyle = t.border; ctx.lineWidth = .8; ctx.stroke();
      for (let i = 1; i < 5; i++) seam(ctx,-bw/2+2,by+i*bh/5,bw/2-2,by+i*bh/5);
      for (let i = 0; i < 5; i++) { rivet(ctx,-bw/2+5,by+10+i*18); rivet(ctx,bw/2-5,by+10+i*18); }
    });

    // 7 — S-II ENGINE
    piece(7, 500, -480, ctx => {
      const ey = -22-95-105-28-108;
      ctx.beginPath(); ctx.rect(-36,ey,72,20);
      ctx.fillStyle = mg(ctx,-36,ey,36,ey+20); ctx.fill();
      ctx.strokeStyle = t.cyan + "55"; ctx.lineWidth = 1; ctx.stroke();
      for (let i = 0; i < 7; i++) rivet(ctx,-26+i*8.5,ey+10,2);
      ctx.beginPath(); ctx.moveTo(-17,ey+20); ctx.lineTo(17,ey+20); ctx.lineTo(23,ey+50); ctx.lineTo(-23,ey+50); ctx.closePath();
      ctx.fillStyle = mg(ctx,0,ey+20,0,ey+50); ctx.fill();
      ctx.strokeStyle = t.accent + "77"; ctx.lineWidth = 1; ctx.stroke();
      ctx.beginPath(); ctx.ellipse(0,ey+48,16,6,0,0,Math.PI*2);
      const ig = ctx.createRadialGradient(0,ey+48,0,0,ey+48,17);
      ig.addColorStop(0,t.magenta+"cc"); ig.addColorStop(1,t.accent+"11"); ctx.fillStyle=ig; ctx.fill();
    });

    // 8 — COMMAND MODULE
    piece(8, 0, -680, ctx => {
      const [cw,ch,cy] = [60,78,-22-95-105-28-108-32-78];
      ctx.beginPath(); ctx.roundRect(-cw/2,cy,cw,ch,[4,4,0,0]);
      ctx.fillStyle = mg(ctx,-cw/2,cy,cw/2,cy+ch); ctx.fill();
      ctx.strokeStyle = t.border; ctx.lineWidth = .8; ctx.stroke();
      // windows
      for (const [wx,wy,wr] of [[-13,cy+16,6],[13,cy+16,6],[0,cy+34,5]]) {
        ctx.beginPath(); ctx.arc(wx,wy,wr,0,Math.PI*2);
        const wg = ctx.createRadialGradient(wx-2,wy-2,0,wx,wy,wr);
        wg.addColorStop(0,t.cyan+"cc"); wg.addColorStop(.6,t.cyan+"55"); wg.addColorStop(1,t.cyan+"11");
        ctx.fillStyle=wg; ctx.fill(); ctx.strokeStyle=t.cyan+"aa"; ctx.lineWidth=1; ctx.stroke();
        ctx.beginPath(); ctx.arc(wx-wr*.3,wy-wr*.3,wr*.3,0,Math.PI*2); ctx.fillStyle="rgba(255,255,255,.3)"; ctx.fill();
      }
      // solar stubs
      for (const spx of [-cw/2-20, cw/2+2]) {
        ctx.beginPath(); ctx.rect(spx,cy+18,20,28);
        ctx.fillStyle = t.name==="dark" ? "rgba(0,15,50,.7)" : "rgba(180,200,240,.4)"; ctx.fill();
        ctx.strokeStyle = t.cyan+"55"; ctx.lineWidth=.7; ctx.stroke();
        for (let r=0;r<4;r++) for (let c=0;c<2;c++) {
          ctx.beginPath(); ctx.rect(spx+c*9+1,cy+19+r*6,8,5);
          ctx.fillStyle = t.name==="dark" ? "rgba(0,80,160,.4)" : "rgba(100,150,220,.35)"; ctx.fill();
          ctx.strokeStyle = t.cyan+"33"; ctx.lineWidth=.4; ctx.stroke();
        }
      }
      for (let i=1;i<4;i++) seam(ctx,-cw/2+2,cy+i*ch/4,cw/2-2,cy+i*ch/4);
      for (let i=0;i<5;i++) { rivet(ctx,-cw/2+4,cy+8+i*13,1.8); rivet(ctx,cw/2-4,cy+8+i*13,1.8); }
    });

    // 9 — ESCAPE TOWER
    piece(9, 440, -700, ctx => {
      const ty = -22-95-105-28-108-32-78;
      for (let i = 0; i < 5; i++) {
        const ly = ty - i*13;
        ctx.beginPath(); ctx.moveTo(-11,ly); ctx.lineTo(11,ly-13); ctx.strokeStyle=t.metalMid+"70"; ctx.lineWidth=1; ctx.stroke();
        ctx.beginPath(); ctx.moveTo(11,ly);  ctx.lineTo(-11,ly-13); ctx.strokeStyle=t.metalMid+"44"; ctx.lineWidth=.7; ctx.stroke();
        ctx.beginPath(); ctx.moveTo(-11,ly); ctx.lineTo(-11,ly-13); ctx.strokeStyle=t.metalMid+"88"; ctx.lineWidth=1.4; ctx.stroke();
        ctx.beginPath(); ctx.moveTo(11,ly);  ctx.lineTo(11,ly-13);  ctx.strokeStyle=t.metalMid+"88"; ctx.lineWidth=1.4; ctx.stroke();
      }
      const aty = ty-65;
      ctx.beginPath(); ctx.ellipse(0,aty,10,20,0,0,Math.PI*2);
      ctx.fillStyle=mr(ctx,0,aty,12); ctx.fill(); ctx.strokeStyle=t.magenta+"66"; ctx.lineWidth=1; ctx.stroke();
      ctx.beginPath(); ctx.rect(-11,aty-7,22,6); ctx.fillStyle="rgba(200,40,40,.5)"; ctx.fill();
      ctx.strokeStyle="rgba(255,70,70,.4)"; ctx.lineWidth=.5; ctx.stroke();
      for (let r=0;r<3;r++) rivet(ctx,-6+r*6,aty-4,1.6);
    });

    // 10 — NOSE CONE
    piece(10, 0, -800, ctx => {
      const ny = -22-95-105-28-108-32-78-8;
      ctx.beginPath();
      ctx.moveTo(0,ny-58); ctx.quadraticCurveTo(-22,ny-14,-24,ny); ctx.lineTo(24,ny); ctx.quadraticCurveTo(22,ny-14,0,ny-58); ctx.closePath();
      const ng = ctx.createLinearGradient(-24,ny-58,24,ny);
      ng.addColorStop(0,t.metalHi); ng.addColorStop(.35,t.metalMid); ng.addColorStop(.8,t.metalLo); ng.addColorStop(1,t.metalLo);
      ctx.fillStyle=ng; ctx.fill(); ctx.strokeStyle=t.metalMid+"66"; ctx.lineWidth=.8; ctx.stroke();
      for (let i=1;i<5;i++) {
        const fr=i/5, ny2=ny-58+58*fr, nx2=24*Math.sin(fr*Math.PI)*.85;
        ctx.beginPath(); ctx.moveTo(-nx2,ny2); ctx.lineTo(nx2,ny2);
        ctx.strokeStyle="rgba(0,0,0,.2)"; ctx.lineWidth=.6; ctx.stroke();
      }
      const tg=ctx.createRadialGradient(0,ny-57,0,0,ny-57,5);
      tg.addColorStop(0,t.cyan+"ff"); tg.addColorStop(1,t.cyan+"00");
      ctx.beginPath(); ctx.arc(0,ny-57,4,0,Math.PI*2); ctx.fillStyle=tg; ctx.fill();
    });

    // 11 — IGNITION GLOW
    piece(11, 0, 0, ctx => {
      const ey=20, now=Date.now()*.002;
      for (const [ex,ei] of [[-40,0],[0,1],[40,2]]) {
        const ph=55+Math.sin(now*3+ei*1.4)*14;
        const pg=ctx.createRadialGradient(ex,ey+ph*.5,1,ex,ey+ph*.5,26);
        pg.addColorStop(0,"rgba(255,210,60,.75)"); pg.addColorStop(.25,"rgba(255,90,20,.5)");
        pg.addColorStop(.6,t.magenta+"55"); pg.addColorStop(1,"transparent");
        ctx.beginPath(); ctx.ellipse(ex,ey+ph*.5,12+Math.sin(now*4+ei)*2,ph/2,0,0,Math.PI*2); ctx.fillStyle=pg; ctx.fill();
        const fg=ctx.createRadialGradient(ex,ey+ph*.2,0,ex,ey+ph*.25,8);
        fg.addColorStop(0,"rgba(255,255,200,.9)"); fg.addColorStop(1,"transparent");
        ctx.beginPath(); ctx.ellipse(ex,ey+ph*.25,4,ph*.28,0,0,Math.PI*2); ctx.fillStyle=fg; ctx.fill();
      }
      const floorG=ctx.createRadialGradient(0,ey+55,0,0,ey+55,145);
      floorG.addColorStop(0,t.magenta+"33"); floorG.addColorStop(.4,t.accent+"22"); floorG.addColorStop(1,"transparent");
      ctx.fillStyle=floorG; ctx.fillRect(-145,ey,290,170);
    });
  };
}

/* ─────────────────────────────────────────────
   ROCKET ASSEMBLY CANVAS
───────────────────────────────────────────── */
function RocketCanvas({ progress, t }) {
  const ref     = useRef();
  const progRef = useRef(progress);
  const themeRef= useRef(t);
  progRef.current  = progress;
  themeRef.current = t;

  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext("2d");
    let raf, lastStage = -1;
    let sparks = [];

    const addSparks = (x, y, col) => {
      for (let i = 0; i < 35; i++) {
        const a = Math.random()*Math.PI*2, spd = Math.random()*6+1;
        sparks.push({ x, y, vx:Math.cos(a)*spd, vy:Math.sin(a)*spd, life:1, col });
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
        addSparks(W/2+(Math.random()-.5)*70, H*.68+(Math.random()-.5)*100, cols[stage%cols.length]);
        lastStage = stage;
      }

      ctx.save();
      ctx.translate(W/2, H * .7);
      buildRocketPieces(th)(ctx, p);
      ctx.restore();

      sparks = sparks.filter(s => s.life > 0);
      sparks.forEach(s => {
        ctx.beginPath(); ctx.arc(s.x, s.y, 2.2, 0, Math.PI*2);
        ctx.fillStyle = s.col + Math.floor(s.life*255).toString(16).padStart(2,"0");
        ctx.fill();
        s.x+=s.vx; s.y+=s.vy; s.vx*=.93; s.vy*=.93; s.life-=.022;
      });

      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={ref} style={{ position:"absolute", inset:0, width:"100%", height:"100%", display:"block" }} />;
}

/* ─────────────────────────────────────────────
   NEURAL CANVAS
───────────────────────────────────────────── */
function NeuralCanvas({ t }) {
  const ref   = useRef();
  const mouse = useRef({ x:-999, y:-999 });

  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext("2d");
    let raf;
    const resize = () => { cv.width=cv.offsetWidth; cv.height=cv.offsetHeight; };
    resize(); window.addEventListener("resize", resize);

    const nodes = [
      {l:"Swift",    x:.11,y:.25,col:"#f87171"}, {l:"SwiftUI", x:.11,y:.52,col:"#fb923c"},
      {l:"ARKit",    x:.11,y:.78,col:"#facc15"}, {l:"Python",  x:.3, y:.18,col:"#34d399"},
      {l:"PyTorch",  x:.3, y:.44,col:"#22d3ee"}, {l:"CUDA",    x:.3, y:.70,col:"#60a5fa"},
      {l:"CoreML",   x:.52,y:.28,col:"#c084fc"}, {l:"TF",      x:.52,y:.54,col:"#8b5cf6"},
      {l:"Metal",    x:.52,y:.78,col:"#a78bfa"}, {l:"Three.js",x:.73,y:.35,col:"#22d3ee"},
      {l:"WebGL",    x:.73,y:.62,col:"#67e8f9"}, {l:"GSAP",    x:.89,y:.48,col:"#f0abfc"},
    ];
    const edges = [[0,3],[0,6],[1,4],[1,6],[2,5],[2,8],[3,4],[3,6],[4,5],[4,7],[5,8],[6,7],[6,9],[7,8],[7,10],[8,11],[9,10],[10,11],[0,1],[1,2]];
    let sigs = [];
    const si = setInterval(() => {
      const e = edges[Math.floor(Math.random()*edges.length)];
      sigs.push({ a:e[0], b:e[1], tt:0, spd:Math.random()*.012+.005 });
    }, 380);

    cv.addEventListener("mousemove", e => { const r=cv.getBoundingClientRect(); mouse.current={x:e.clientX-r.left,y:e.clientY-r.top}; });
    cv.addEventListener("mouseleave", () => { mouse.current={x:-999,y:-999}; });

    const loop = () => {
      ctx.clearRect(0,0,cv.width,cv.height);
      const W=cv.width, H=cv.height, {x:mx,y:my}=mouse.current;

      edges.forEach(([a,b]) => {
        const na=nodes[a],nb=nodes[b],ax=na.x*W,ay=na.y*H,bx=nb.x*W,by=nb.y*H;
        const d = Math.min(Math.hypot(mx-ax,my-ay),Math.hypot(mx-bx,my-by));
        const p = Math.max(0,1-d/170);
        ctx.beginPath(); ctx.moveTo(ax,ay); ctx.lineTo(bx,by);
        ctx.strokeStyle=`rgba(${t.particle1},${.06+p*.3})`; ctx.lineWidth=.4+p*1.8; ctx.stroke();
      });

      sigs = sigs.filter(s=>s.tt<=1);
      sigs.forEach(s => {
        const na=nodes[s.a],nb=nodes[s.b];
        const x=na.x*W+(nb.x*W-na.x*W)*s.tt, y=na.y*H+(nb.y*H-na.y*H)*s.tt;
        ctx.beginPath(); ctx.arc(x,y,3.5,0,Math.PI*2);
        ctx.fillStyle=na.col; ctx.shadowBlur=12; ctx.shadowColor=na.col; ctx.fill(); ctx.shadowBlur=0;
        s.tt+=s.spd;
      });

      nodes.forEach(n => {
        const nx=n.x*W,ny=n.y*H,d=Math.hypot(mx-nx,my-ny),p=Math.max(0,1-d/120),r=10+p*9;
        ctx.beginPath(); ctx.arc(nx,ny,r,0,Math.PI*2);
        const ng=ctx.createRadialGradient(nx,ny,0,nx,ny,r);
        ng.addColorStop(0,n.col); ng.addColorStop(1,n.col+"22");
        ctx.fillStyle=ng; ctx.shadowBlur=14+p*20; ctx.shadowColor=n.col; ctx.fill(); ctx.shadowBlur=0;
        ctx.beginPath(); ctx.arc(nx,ny,r+3,0,Math.PI*2);
        ctx.strokeStyle=n.col+(p>.25?"cc":"33"); ctx.lineWidth=.8; ctx.stroke();
        ctx.font=`500 ${9+p*2}px 'Inter',sans-serif`;
        ctx.textAlign="center"; ctx.fillStyle=p>.25?t.textHi:t.textMute; ctx.fillText(n.l,nx,ny+r+14);
      });
      raf=requestAnimationFrame(loop);
    };
    loop();
    return () => { cancelAnimationFrame(raf); clearInterval(si); window.removeEventListener("resize",resize); };
  }, [t]);

  return <canvas ref={ref} style={{width:"100%",height:520,display:"block"}}/>;
}

/* ─────────────────────────────────────────────
   WAVEFORM
───────────────────────────────────────────── */
function Waveform({ t }) {
  const ref = useRef();
  useEffect(() => {
    const cv=ref.current; if(!cv) return;
    const ctx=cv.getContext("2d"); let raf,tt=0;
    const resize=()=>{ cv.width=cv.offsetWidth; cv.height=90; };
    resize(); window.addEventListener("resize",resize);
    const waves=[
      {f:.038,a:22,spd:1.5,col:t.accent,w:1.8},
      {f:.058,a:15,spd:2.3,col:t.cyan,w:1.3},
      {f:.027,a:28,spd:1.0,col:t.magenta,w:.9},
    ];
    const loop=()=>{
      ctx.clearRect(0,0,cv.width,cv.height);
      const W=cv.width,cy=45;
      waves.forEach(wv=>{
        ctx.beginPath();
        for(let x=0;x<W;x+=2){
          const y=cy+Math.sin(x*wv.f+tt*wv.spd)*wv.a*Math.sin(x*.005+.6);
          x===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
        }
        ctx.strokeStyle=wv.col; ctx.lineWidth=wv.w; ctx.shadowBlur=8; ctx.shadowColor=wv.col; ctx.stroke(); ctx.shadowBlur=0;
      });
      tt+=.05; raf=requestAnimationFrame(loop);
    };
    loop();
    return()=>{ cancelAnimationFrame(raf); window.removeEventListener("resize",resize); };
  },[t]);
  return <canvas ref={ref} style={{width:"100%",height:90,display:"block"}}/>;
}

/* ─────────────────────────────────────────────
   PROJECT THUMB
───────────────────────────────────────────── */
function ProjectThumb({ type, colors, t }) {
  const ref = useRef();
  useEffect(() => {
    const cv=ref.current; if(!cv) return;
    const ctx=cv.getContext("2d"); let raf,tt=0;
    const setup=()=>{ cv.width=cv.offsetWidth||300; cv.height=150; };
    setup(); window.addEventListener("resize",setup);
    const [c1,c2]=colors;
    const loop=()=>{
      const W=cv.width,H=cv.height;
      ctx.clearRect(0,0,W,H);
      const bg=ctx.createLinearGradient(0,0,W,H);
      bg.addColorStop(0,c1+"15"); bg.addColorStop(1,c2+"15");
      ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);
      ctx.strokeStyle=c1+"18"; ctx.lineWidth=.5;
      for(let x=0;x<W;x+=20){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
      for(let y=0;y<H;y+=20){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
      if(type==="ios"){
        const px=W/2,py=H/2;
        ctx.beginPath(); ctx.roundRect(px-24,py-44,48,88,7);
        ctx.fillStyle="rgba(80,90,110,.4)"; ctx.fill(); ctx.strokeStyle=c1+"bb"; ctx.lineWidth=1.2; ctx.stroke();
        ctx.beginPath(); ctx.roundRect(px-19,py-37,38,66,4);
        const sg=ctx.createLinearGradient(px,py-37,px,py+29); sg.addColorStop(0,c1+"35"); sg.addColorStop(1,c2+"18");
        ctx.fillStyle=sg; ctx.fill();
        for(let i=0;i<3;i++){ctx.beginPath();for(let x=px-17;x<=px+17;x+=2){const y=py-8+i*13+Math.sin((x+tt*38)*.2)*5;x===px-17?ctx.moveTo(x,y):ctx.lineTo(x,y);}ctx.strokeStyle=i%2?c1+"99":c2+"99";ctx.lineWidth=1.2;ctx.stroke();}
        ctx.beginPath(); ctx.roundRect(px-10,py+35,20,3,2); ctx.fillStyle="#ffffff44"; ctx.fill();
      } else if(type==="ml"){
        for(let i=0;i<20;i++){const x=(i*53+tt*16)%W,y=(i*37+tt*11)%H;ctx.beginPath();ctx.arc(x,y,2.5,0,Math.PI*2);ctx.fillStyle=i%2?c1:c2;ctx.globalAlpha=.35+.4*Math.sin(tt+i);ctx.fill();ctx.globalAlpha=1;}
        for(let i=0;i<4;i++){const y=H*(i+1)/5;ctx.beginPath();for(let x=0;x<W;x+=3){const yv=y+Math.sin((x+tt*50+i*40)*.08)*14;x===0?ctx.moveTo(x,yv):ctx.lineTo(x,yv);}ctx.strokeStyle=i%2?c1+"66":c2+"66";ctx.lineWidth=1.2;ctx.stroke();}
      } else {
        for(let i=0;i<7;i++){const sx=Math.floor((i*67+tt*.3)%W/20)*20,sy=Math.floor((i*43)%H/20)*20;ctx.beginPath();ctx.arc(sx,sy,3.5,0,Math.PI*2);ctx.fillStyle=c1;ctx.shadowBlur=7;ctx.shadowColor=c1;ctx.fill();ctx.shadowBlur=0;if(i>0){const tx=Math.floor((i*41+tt*.2)%W/20)*20,ty=Math.floor((i*31)%H/20)*20;ctx.beginPath();ctx.moveTo(sx,sy);ctx.lineTo(tx,ty);ctx.strokeStyle=c1+"44";ctx.lineWidth=.9;ctx.stroke();}}
      }
      tt+=.04; raf=requestAnimationFrame(loop);
    };
    loop();
    return()=>{ cancelAnimationFrame(raf); window.removeEventListener("resize",setup); };
  },[t]);
  return <canvas ref={ref} style={{width:"100%",height:150,display:"block"}}/>;
}

/* ─────────────────────────────────────────────
   THEME TOGGLE BUTTON
───────────────────────────────────────────── */
function ThemeToggle({ isDark, toggle, t }) {
  return (
    <button onClick={toggle} style={{
      display:"flex", alignItems:"center", gap:8,
      background:t.surface, border:`1px solid ${t.border}`,
      borderRadius:20, padding:"6px 14px", cursor:"pointer",
      fontFamily:"'JetBrains Mono',monospace", fontSize:".65rem",
      letterSpacing:".1em", color:t.text, transition:"all .25s",
    }}>
      <span style={{fontSize:"1rem"}}>{isDark ? "☀" : "◑"}</span>
      {isDark ? "LIGHT" : "DARK"}
    </button>
  );
}

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const PROJECTS = [
  { title:"NEURAL TIDE",    type:"ios",   tag:"iOS",   desc:"Real-time ocean data vis with CoreML tidal prediction. SwiftUI + Metal shaders.",  tags:["SwiftUI","CoreML","Metal"],    colors:["#f97316","#e040fb"] },
  { title:"FORGE DIFFUSE",  type:"ml",    tag:"ML",    desc:"Generative diffusion model for metallic texture synthesis. 50k material scans.",    tags:["PyTorch","Diffusion","CUDA"],  colors:["#8b5cf6","#22d3ee"] },
  { title:"AXIOM AR",       type:"ios",   tag:"iOS",   desc:"AR assembly guide for Metal Earth models via ARKit pose estimation.",               tags:["ARKit","RealityKit","Swift"],  colors:["#22d3ee","#a78bfa"] },
  { title:"CURRENT GNN",    type:"ml",    tag:"ML",    desc:"Graph net predicting ocean currents from satellite imagery. On-device inference.",   tags:["GNN","PyG","Satellite"],      colors:["#a78bfa","#facc15"] },
  { title:"VOID PULSE",     type:"ios",   tag:"iOS",   desc:"Ambient music app with ML-driven soundscapes reacting to CoreMotion data.",         tags:["AVFoundation","CoreMotion"],   colors:["#e040fb","#8b5cf6"] },
  { title:"CHROME ATLAS",   type:"build", tag:"Build", desc:"Hand-assembled Metal Earth globe with IoT sensors streaming live data.",            tags:["Metal Earth","IoT","ESP32"],   colors:["#facc15","#22d3ee"] },
];

const BLOG = [
  { date:"2025.03.12", title:"Metal Earth as System Architecture", excerpt:"How physical model assembly teaches patience and precision in software design." },
  { date:"2025.02.28", title:"Diffusion Models for Materials",      excerpt:"Training generative models on metallic textures using PyTorch." },
  { date:"2025.02.10", title:"SwiftUI + Metal Shaders",             excerpt:"Apple's UI framework meets GPU shaders for underwater effects." },
  { date:"2025.01.22", title:"GNNs for Ocean Dynamics",             excerpt:"Predicting fluid flow from satellite data with graph nets." },
];

const PIECES = ["LAUNCH PLATFORM","ENGINE BELLS","S-I LOWER BODY","S-I UPPER BODY","DELTA FINS","INTERSTAGE RING","S-II BODY","S-II ENGINE","COMMAND MODULE","ESCAPE TOWER","NOSE CONE","IGNITION"];

/* ─────────────────────────────────────────────
   MAIN
───────────────────────────────────────────── */
export default function SynaPortfolio() {
  const [isDark, setIsDark]   = useState(true);
  const [prog,   setProg]     = useState(0);
  const [inAssembly, setInAssembly] = useState(false);
  const [navUp,  setNavUp]    = useState(false);
  const [counts, setCounts]   = useState({p:0,a:0,m:0,y:0});
  const [ctrDone,setCtrDone]  = useState(false);

  const t = isDark ? THEMES.dark : THEMES.light;

  const asmRef = useRef();
  const abtRef = useRef();
  const blogPh = useRef(BLOG.map(() => Math.random()*Math.PI*2));
  const [bfloat, setBfloat] = useState(BLOG.map(()=>({x:0,y:0,r:0})));

  // Blog float
  useEffect(() => {
    let raf;
    const loop = () => {
      const tt = Date.now()*.0008;
      setBfloat(BLOG.map((_,i)=>({
        x: Math.cos(tt*.6+blogPh.current[i])*7,
        y: Math.sin(tt*.8+blogPh.current[i])*12,
        r: Math.sin(tt*.4+blogPh.current[i])*1.2,
      })));
      raf = requestAnimationFrame(loop);
    };
    loop(); return () => cancelAnimationFrame(raf);
  }, []);
  // ── ASSEMBLY SCROLL GATE ─────────────────────────────────────────
  // Intercepts wheel/touch while the anchor div is at viewport top.
  // Advances prog 0→1 before letting page scroll continue.
  const progRef = useRef(0);
  const touchY  = useRef(null);

  useEffect(() => { progRef.current = prog; }, [prog]);

  useEffect(() => {
    const entered = () => {
      if (!asmRef.current) return false;
      return asmRef.current.getBoundingClientRect().top <= 2;
    };

    const onWheel = (e) => {
      if (!entered()) return;
      if (e.deltaY > 0 && progRef.current < 1) {
        e.preventDefault();
        const step = Math.min(Math.abs(e.deltaY), 150) / 150 * 0.07;
        const next = Math.min(1, progRef.current + step);
        progRef.current = next; setProg(next);
      } else if (e.deltaY < 0 && progRef.current > 0) {
        e.preventDefault();
        const step = Math.min(Math.abs(e.deltaY), 150) / 150 * 0.07;
        const next = Math.max(0, progRef.current - step);
        progRef.current = next; setProg(next);
      }
    };

    const onTouchStart = (e) => { touchY.current = e.touches[0].clientY; };
    const onTouchMove  = (e) => {
      if (!entered() || touchY.current === null) return;
      const dy = touchY.current - e.touches[0].clientY;
      touchY.current = e.touches[0].clientY;
      if (dy > 0 && progRef.current < 1) {
        e.preventDefault();
        progRef.current = Math.min(1, progRef.current + Math.abs(dy) * 0.007);
        setProg(progRef.current);
      } else if (dy < 0 && progRef.current > 0) {
        e.preventDefault();
        progRef.current = Math.max(0, progRef.current - Math.abs(dy) * 0.007);
        setProg(progRef.current);
      }
    };

    const onScroll = () => {
      setNavUp(window.scrollY > 50);
      if (asmRef.current) {
        const top = asmRef.current.getBoundingClientRect().top;
        setInAssembly(top <= 2 && top > -window.innerHeight * 0.8);
      }
      if (abtRef.current && !ctrDone &&
          abtRef.current.getBoundingClientRect().top < window.innerHeight * .82) {
        setCtrDone(true);
        [{k:"p",t:42},{k:"a",t:6},{k:"m",t:15},{k:"y",t:3}].forEach(({k,t:target}) => {
          let c = 0; const step = target / 55;
          const id = setInterval(() => {
            c = Math.min(c + step, target);
            setCounts(prev => ({...prev, [k]: Math.floor(c)}));
            if (c >= target) clearInterval(id);
          }, 22);
        });
      }
    };

    window.addEventListener("wheel",      onWheel,      { passive: false, capture: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove",  onTouchMove,  { passive: false, capture: true });
    window.addEventListener("scroll",     onScroll,     { passive: true });
    return () => {
      window.removeEventListener("wheel",      onWheel,      { capture: true });
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove",  onTouchMove,  { capture: true });
      window.removeEventListener("scroll",     onScroll);
    };
  }, [ctrDone]);

  // shared style helpers
  const mono  = { fontFamily:"'JetBrains Mono',monospace" };
  const orb   = { fontFamily:"'Orbitron',sans-serif" };
  const inter = { fontFamily:"'Inter',sans-serif" };

  const Label = ({ children, center }) => (
    <div style={{ display:"flex",alignItems:"center",gap:10,...mono,fontSize:".62rem",letterSpacing:".35em",
      color:t.cyan,textTransform:"uppercase",marginBottom:10,justifyContent:center?"center":"flex-start" }}>
      <span style={{width:22,height:1,background:t.cyan,display:"inline-block"}}/>
      {children}
    </div>
  );
  const H2 = ({ children, style={} }) => (
    <h2 style={{ ...orb,fontWeight:900,fontSize:"clamp(1.8rem,3.8vw,3rem)",lineHeight:1.05,
      color:t.textHi,marginBottom:14,...style }}>{children}</h2>
  );
  const Tag = ({ children }) => (
    <span style={{ ...mono,fontSize:".5rem",letterSpacing:".14em",padding:"3px 8px",
      border:`1px solid ${t.border}`,color:t.textMute,textTransform:"uppercase",borderRadius:2 }}>{children}</span>
  );

  const btnBase = {
    ...orb, fontWeight:700, fontSize:".62rem", letterSpacing:".18em", padding:"12px 28px",
    textDecoration:"none", textTransform:"uppercase", transition:"all .25s", display:"inline-block",
    clipPath:"polygon(7px 0%,100% 0%,calc(100% - 7px) 100%,0% 100%)",
  };

  return (
    <div style={{ background:t.bg, color:t.text, ...inter, overflowX:"hidden", minHeight:"100vh", transition:"background .4s, color .4s" }}>
      <GlobalStyle />
      <OceanBg t={t} />
      <Cursor t={t} />

      {/* ── NAV ── */}
      <nav style={{
        position:"fixed",top:0,left:0,right:0,zIndex:1000,
        display:"flex",justifyContent:"space-between",alignItems:"center",
        padding:"16px 56px",
        background: navUp ? t.navBg : "transparent",
        backdropFilter: navUp ? "blur(14px)" : "none",
        borderBottom: navUp ? `1px solid ${t.border}` : "1px solid transparent",
        transition:"all .35s",
      }}>
        <div style={{ ...orb,fontWeight:900,fontSize:"1.2rem",letterSpacing:".3em",color:t.textHi,position:"relative" }}>
          SY<span style={{color:t.cyan}}>N</span>A
          <div className="scanbar" style={{ position:"absolute",bottom:-3,left:0,right:0,height:1,
            background:`linear-gradient(90deg,transparent,${t.cyan},transparent)` }}/>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:32}}>
          {["About","Skills","Projects","Notes","Contact"].map(l=>(
            <a key={l} href={`#${l.toLowerCase()}`} style={{ ...mono,fontSize:".65rem",letterSpacing:".16em",
              color:t.textMute,textDecoration:"none",textTransform:"uppercase",
              transition:"color .2s", ":hover":{color:t.cyan} }}
              onMouseEnter={e=>e.target.style.color=t.cyan}
              onMouseLeave={e=>e.target.style.color=t.textMute}>
              {l}
            </a>
          ))}
          <ThemeToggle isDark={isDark} toggle={()=>setIsDark(d=>!d)} t={t}/>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",
        justifyContent:"center",textAlign:"center",padding:"100px 40px 60px",position:"relative",zIndex:1 }}>
        <p style={{ ...mono,fontSize:".62rem",letterSpacing:".5em",color:t.cyan,textTransform:"uppercase",marginBottom:16,opacity:.85 }}>
          // engineer · builder · explorer
        </p>
        <h1 className="glitch" data-text="SYNA" style={{ ...orb,fontWeight:900,
          fontSize:"clamp(4.5rem,12vw,9rem)",lineHeight:.9,color:t.textHi,
          textShadow:`0 0 40px ${t.accentGlow}`,marginBottom:8 }}>SYNA</h1>
        <div style={{ ...orb,fontWeight:700,fontSize:"clamp(.9rem,2.5vw,1.8rem)",letterSpacing:".32em",
          color:"transparent",WebkitTextStroke:`1px ${t.accent}`,marginBottom:6 }}>BUILDER</div>
        <div style={{ ...mono,fontWeight:500,fontSize:"clamp(.55rem,1.3vw,.85rem)",letterSpacing:".45em",
          color:t.magenta,marginBottom:32 }}>NEURAL · METAL · OCEAN</div>
        <p style={{ maxWidth:520,fontSize:".98rem",fontWeight:300,lineHeight:1.85,color:t.textMute,marginBottom:36,letterSpacing:".02em" }}>
          Crafting intelligent systems at the intersection of iOS development, machine learning, and cyber-metal aesthetics.
        </p>
        <div style={{display:"flex",gap:16}}>
          <a href="#projects" style={{ ...btnBase,background:`linear-gradient(135deg,${t.accent},${t.magenta})`,
            color:"#fff",boxShadow:`0 0 24px ${t.accentGlow}` }}
            onMouseEnter={e=>e.currentTarget.style.boxShadow=`0 0 40px ${t.accentGlow},0 4px 20px rgba(0,0,0,.3)`}
            onMouseLeave={e=>e.currentTarget.style.boxShadow=`0 0 24px ${t.accentGlow}`}>
            View Work
          </a>
          <a href="#contact" style={{ ...btnBase,background:"transparent",color:t.cyan,
            border:`1px solid ${t.cyan}`,boxShadow:`0 0 12px ${t.cyanGlow}` }}
            onMouseEnter={e=>e.currentTarget.style.background=t.cyan+"18"}
            onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
            Connect
          </a>
        </div>
        <div style={{ position:"absolute",bottom:36,left:"50%",transform:"translateX(-50%)",
          display:"flex",flexDirection:"column",alignItems:"center",gap:6,
          ...mono,fontSize:".55rem",letterSpacing:".28em",color:t.textMute }}>
          <div style={{width:16,height:26,border:`1px solid ${t.textMute}`,borderRadius:8,position:"relative"}}>
            <div style={{position:"absolute",top:4,left:"50%",transform:"translateX(-50%)",
              width:2,height:5,background:t.cyan,borderRadius:2,animation:"pulse 2s infinite"}}/>
          </div>
          SCROLL
        </div>
      </section>

      {/* ── ASSEMBLY ──
           Anchor div scrolls into view normally.
           Fixed overlay intercepts wheel until prog=1.
      */}
      {/* This invisible div is the scroll anchor */}
      <div ref={asmRef} style={{height:"100vh",position:"relative",zIndex:1,
        background: prog < 1 ? t.bg : "transparent"}} />

      {/* Fixed fullscreen rocket overlay — shown while assembling */}
      <div style={{
        position:"fixed", inset:0, zIndex:5,
        pointerEvents:"none",
        opacity: inAssembly ? 1 : 0,
        transition:"opacity .5s",
      }}>
        <RocketCanvas progress={prog} t={t}/>

        {/* Left panel */}
        <div style={{position:"absolute",left:52,top:"50%",transform:"translateY(-50%)",zIndex:10,maxWidth:260,pointerEvents:"none"}}>
          <Label>// Model Assembly</Label>
          <H2 style={{fontSize:"clamp(1.5rem,3vw,2.4rem)"}}>PIECE<br/>BY<br/>PIECE</H2>
          <p style={{fontSize:".85rem",lineHeight:1.85,color:t.textMute,fontWeight:300,marginBottom:20}}>
            A Fascinations-style sheet-metal Saturn V — each stamped panel flies in and locks into place as you scroll.
          </p>
          <div style={{...mono,fontSize:".6rem",letterSpacing:".2em",color:t.cyan,marginBottom:6}}>
            {Math.round(prog*100)}% ASSEMBLED
          </div>
          <div style={{height:2,background:t.border,borderRadius:2}}>
            <div style={{height:"100%",width:`${prog*100}%`,
              background:`linear-gradient(90deg,${t.accent},${t.cyan})`,
              borderRadius:2,boxShadow:`0 0 8px ${t.cyanGlow}`,transition:"width .06s"}}/>
          </div>
        </div>

        {/* Right checklist */}
        <div style={{position:"absolute",right:44,top:"50%",transform:"translateY(-50%)",zIndex:10,display:"flex",flexDirection:"column",gap:8,pointerEvents:"none"}}>
          {PIECES.map((lbl,i) => {
            const done=prog>(i+1)/12, active=!done&&prog>i/12;
            return (
              <div key={lbl} style={{display:"flex",alignItems:"center",gap:8,...mono,fontSize:".54rem",
                letterSpacing:".14em",color:done?t.accent:active?t.cyan:t.textMute+"66",transition:"color .4s"}}>
                <div style={{width:5,height:5,borderRadius:"50%",background:"currentColor",flexShrink:0,
                  boxShadow:active?`0 0 8px ${t.cyan}`:done?`0 0 5px ${t.accent}`:"none",
                  animation:active?"pulse 1s ease-in-out infinite":"none"}}/>
                {done?"✓ ":active?"▶ ":""}{lbl}
              </div>
            );
          })}
        </div>

        {/* Watermark */}
        <div style={{position:"absolute",top:85,left:"50%",transform:"translateX(-50%)",...mono,
          fontSize:".56rem",letterSpacing:".45em",color:t.textMute,opacity:.35,pointerEvents:"none",whiteSpace:"nowrap"}}>
          // FASCINATIONS · METAL EARTH MODEL //
        </div>

        {/* Nudge */}
        {prog < .04 && (
          <div className="float-y" style={{position:"absolute",bottom:46,left:"50%",transform:"translateX(-50%)",
            ...mono,fontSize:".56rem",letterSpacing:".3em",color:t.textMute,textAlign:"center",pointerEvents:"none"}}>
            ↓ SCROLL TO ASSEMBLE
          </div>
        )}

        {/* Complete badge */}
        {prog >= .98 && (
          <div style={{position:"absolute",bottom:52,left:"50%",transform:"translateX(-50%)",...mono,
            fontSize:".65rem",letterSpacing:".32em",color:t.cyan,textAlign:"center",pointerEvents:"none",
            border:`1px solid ${t.cyanGlow}`,padding:"9px 22px",background:t.surface,
            animation:"completeAnim 2s ease-in-out infinite"}}>
            ✦ ASSEMBLY COMPLETE — KEEP SCROLLING ↓
          </div>
        )}
      </div>

      {/* ── ABOUT ── */}
      <section id="about" ref={abtRef} style={{padding:"110px 72px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:72,alignItems:"center",position:"relative",zIndex:1}}>
        {/* Simple metallic ring visual instead of heavy gears — minimal */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:420,position:"relative"}}>
          <svg width="340" height="340" viewBox="0 0 340 340" style={{position:"absolute"}}>
            {[130,105,82,58].map((r,i) => (
              <circle key={r} cx="170" cy="170" r={r}
                fill="none" stroke={[t.accent,t.cyan,t.magenta,t.accent][i]}
                strokeWidth={[1.2,.7,.5,1.5][i]}
                strokeDasharray={i===3?"4 6":"none"}
                opacity={[.35,.2,.15,.4][i]}
                style={{transformOrigin:"170px 170px",animation:`rotate${i} ${[12,8,20,6][i]}s linear infinite`}}/>
            ))}
            <text x="170" y="178" textAnchor="middle" style={{...orb,fontWeight:900,fontSize:28,fill:t.textHi,opacity:.9}}>SY</text>
            <text x="170" y="202" textAnchor="middle" style={{...mono,fontSize:10,fill:t.textMute,letterSpacing:4}}>BUILDER</text>
          </svg>
          <style>{`
            @keyframes rotate0{from{transform:rotate(0)}to{transform:rotate(360deg)}}
            @keyframes rotate1{from{transform:rotate(0)}to{transform:rotate(-360deg)}}
            @keyframes rotate2{from{transform:rotate(0)}to{transform:rotate(360deg)}}
            @keyframes rotate3{from{transform:rotate(0)}to{transform:rotate(-360deg)}}
          `}</style>
        </div>
        <div>
          <Label>// About Me</Label>
          <H2>FORGED<br/>IN CODE</H2>
          <p style={{fontSize:".95rem",lineHeight:1.9,color:t.textMute,fontWeight:300,marginBottom:32}}>
            I'm Syna — a tech & maker enthusiast building at the boundary of machine intelligence and physical craft. From Metal Earth models to SwiftUI apps to neural nets — if it can be assembled, I'll build it.
          </p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
            {[{n:counts.p,l:"Projects"},{n:counts.a,l:"iOS Apps"},{n:counts.m,l:"ML Models"},{n:counts.y,l:"Years"}].map((s,i)=>(
              <div key={i} style={{background:t.surface,border:`1px solid ${t.border}`,padding:"18px",
                clipPath:"polygon(10px 0%,100% 0%,calc(100% - 10px) 100%,0% 100%)",
                transition:"border-color .25s",cursor:"default"}}
                onMouseEnter={e=>e.currentTarget.style.borderColor=t.borderHi}
                onMouseLeave={e=>e.currentTarget.style.borderColor=t.border}>
                <div style={{...orb,fontWeight:900,fontSize:"2rem",color:t.cyan}}>{s.n}</div>
                <div style={{...mono,fontSize:".6rem",letterSpacing:".15em",color:t.textMute,marginTop:3,textTransform:"uppercase"}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" style={{padding:"80px 72px 100px",position:"relative",zIndex:1}}>
        <div style={{textAlign:"center",marginBottom:52}}>
          <Label center>// Skills</Label>
          <H2 style={{textAlign:"center"}}>SYNAPTIC<br/>ARCHITECTURE</H2>
          <p style={{...mono,fontSize:".6rem",color:t.textMute,letterSpacing:".22em",marginTop:6}}>HOVER TO ACTIVATE</p>
        </div>
        <NeuralCanvas t={t}/>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" style={{padding:"80px 72px 100px",position:"relative",zIndex:1}}>
        <div style={{marginBottom:52}}><Label>// Projects</Label><H2>DATA MANIFOLD</H2></div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:22}}>
          {PROJECTS.map((p,i) => (
            <div key={i} style={{background:t.cardBg,border:`1px solid ${t.border}`,overflow:"hidden",
              clipPath:"polygon(0 0,calc(100% - 18px) 0,100% 18px,100% 100%,18px 100%,0 calc(100% - 18px))",
              transition:"all .35s",backdropFilter:"blur(8px)",cursor:"pointer"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=t.borderHi;e.currentTarget.style.transform="translateY(-5px)";e.currentTarget.style.boxShadow=`0 18px 50px ${t.accentGlow}`;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=t.border;e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="";}}>
              <div style={{position:"relative"}}>
                <ProjectThumb type={p.type} colors={p.colors} t={t}/>
                <div style={{position:"absolute",top:8,right:8,...mono,fontSize:".52rem",letterSpacing:".16em",
                  padding:"3px 9px",background:t.cardBg+"ee",border:`1px solid ${t.cyan}`,color:t.cyan,textTransform:"uppercase",borderRadius:2}}>
                  {p.tag}
                </div>
              </div>
              <div style={{padding:"18px 20px 22px"}}>
                <div style={{...orb,fontWeight:700,fontSize:".88rem",color:t.textHi,letterSpacing:".05em",marginBottom:6}}>{p.title}</div>
                <div style={{fontSize:".78rem",lineHeight:1.7,color:t.textMute,marginBottom:14}}>{p.desc}</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                  {p.tags.map(tag=><Tag key={tag}>{tag}</Tag>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WAVEFORM ── */}
      <section style={{padding:"30px 72px 50px",position:"relative",zIndex:1}}>
        <div style={{border:`1px solid ${t.border}`,padding:"18px 0",background:t.surface+"88",backdropFilter:"blur(6px)",borderRadius:2}}>
          <Waveform t={t}/>
        </div>
      </section>

      {/* ── BLOG ── */}
      <section id="notes" style={{padding:"80px 72px 100px",position:"relative",zIndex:1,overflow:"hidden"}}>
        <div style={{marginBottom:52}}><Label>// Notes</Label><H2>SIGNAL DRIFT</H2></div>
        <div style={{position:"relative",height:440}}>
          {BLOG.map((post,i) => {
            const positions=[{left:"1%",top:"3%"},{left:"30%",top:"40%"},{left:"57%",top:"3%"},{left:"16%",top:"56%"}];
            const fl=bfloat[i]||{x:0,y:0,r:0};
            return (
              <div key={i} style={{position:"absolute",...positions[i],width:275,
                transform:`translate(${fl.x}px,${fl.y}px) rotate(${fl.r}deg)`,
                background:t.cardBg,border:`1px solid ${t.border}`,padding:"22px",cursor:"pointer",
                backdropFilter:"blur(10px)",transition:"border-color .25s",borderRadius:2,
                clipPath:"polygon(0 0,100% 0,100% calc(100% - 12px),calc(100% - 12px) 100%,0 100%)"}}
                onMouseEnter={e=>e.currentTarget.style.borderColor=t.borderHi}
                onMouseLeave={e=>e.currentTarget.style.borderColor=t.border}>
                <div style={{...mono,fontSize:".54rem",letterSpacing:".28em",color:t.cyan,marginBottom:7}}>{post.date}</div>
                <div style={{...orb,fontWeight:700,fontSize:".82rem",color:t.textHi,lineHeight:1.4,marginBottom:9}}>{post.title}</div>
                <div style={{fontSize:".75rem",lineHeight:1.7,color:t.textMute}}>{post.excerpt}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{padding:"90px 72px 80px",textAlign:"center",position:"relative",zIndex:1}}>
        <Label center>// Contact</Label>
        <h2 className="glitch" data-text="LET'S BUILD" style={{...orb,fontWeight:900,
          fontSize:"clamp(2.2rem,6vw,5rem)",color:t.textHi,marginBottom:14}}>LET'S BUILD</h2>
        <p style={{fontSize:".95rem",color:t.textMute,maxWidth:460,margin:"0 auto 44px",lineHeight:1.85}}>
          Whether it's ML, iOS, or a Metal Earth model — I'm always open to connecting with fellow builders.
        </p>
        <div style={{display:"flex",justifyContent:"center",gap:28,flexWrap:"wrap",marginBottom:44}}>
          {[{icon:"⌘",l:"GitHub"},{icon:"◈",l:"LinkedIn"},{icon:"✦",l:"Twitter"},{icon:"✉",l:"Email"}].map(c=>(
            <a key={c.l} href="#" style={{display:"flex",flexDirection:"column",alignItems:"center",gap:7,
              textDecoration:"none",color:t.textMute,...mono,fontSize:".58rem",letterSpacing:".18em",
              textTransform:"uppercase",transition:"color .2s"}}
              onMouseEnter={e=>{e.currentTarget.style.color=t.cyan;e.currentTarget.querySelector(".ico").style.borderColor=t.cyan;e.currentTarget.querySelector(".ico").style.boxShadow=`0 0 16px ${t.cyanGlow}`;}}
              onMouseLeave={e=>{e.currentTarget.style.color=t.textMute;e.currentTarget.querySelector(".ico").style.borderColor=t.border;e.currentTarget.querySelector(".ico").style.boxShadow="none";}}>
              <div className="ico" style={{width:46,height:46,border:`1px solid ${t.border}`,
                display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.2rem",
                clipPath:"polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)",
                background:t.surface,transition:"all .2s"}}>{c.icon}</div>
              {c.l}
            </a>
          ))}
        </div>
        <a href="mailto:syna@builder.dev" style={{...btnBase,background:`linear-gradient(135deg,${t.accent},${t.magenta})`,
          color:"#fff",boxShadow:`0 0 24px ${t.accentGlow}`}}
          onMouseEnter={e=>e.currentTarget.style.boxShadow=`0 0 44px ${t.accentGlow}`}
          onMouseLeave={e=>e.currentTarget.style.boxShadow=`0 0 24px ${t.accentGlow}`}>
          TRANSMIT MESSAGE
        </a>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{borderTop:`1px solid ${t.border}`,padding:"24px 72px",display:"flex",
        justifyContent:"space-between",alignItems:"center",position:"relative",zIndex:1}}>
        <div style={{...orb,fontWeight:900,fontSize:".8rem",letterSpacing:".3em",color:t.textMute}}>SYNA</div>
        <div style={{...mono,fontSize:".54rem",letterSpacing:".18em",color:t.textMute,opacity:.5,textTransform:"uppercase"}}>© 2025 cyber-metal ocean</div>
        <div style={{display:"flex",alignItems:"center",gap:7,...mono,fontSize:".54rem",letterSpacing:".16em",color:t.textMute,textTransform:"uppercase"}}>
          <div style={{width:6,height:6,background:"#22c55e",borderRadius:"50%",boxShadow:"0 0 7px #22c55e",animation:"pulse 2s ease-in-out infinite"}}/>
          online
        </div>
      </footer>
    </div>
  );
}
