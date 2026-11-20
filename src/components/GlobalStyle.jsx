export default function GlobalStyle() {
    return (
        <style>{`
      *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
      html { scroll-behavior:smooth; }
      body { overflow-x:hidden; cursor:none; }
      ::-webkit-scrollbar { width:6px; }
      ::-webkit-scrollbar-thumb { border-radius:4px; background:var(--accent,#f5a623); }

      @keyframes fadeUp   { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
      @keyframes pulse    { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.6);opacity:.5} }
      @keyframes scanLine { 0%,100%{transform:scaleX(.6);opacity:.2} 50%{transform:scaleX(1);opacity:.9} }
      @keyframes floatY   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
      @keyframes completeAnim { 0%,100%{opacity:.7;transform:translateX(-50%) scale(1)} 50%{opacity:1;transform:translateX(-50%) scale(1.02)} }
      @keyframes g1 { 0%,87%,100%{opacity:0;transform:translate(-2px,-2px)} 90%{opacity:.7;transform:translate(-4px,0)} 94%{opacity:0} }
      @keyframes g2 { 0%,87%,100%{opacity:0;transform:translate(2px,2px)}  90%{opacity:.7;transform:translate(4px,0)}  94%{opacity:0} }

      .quirk:nth-child(odd){rotate:-1.2deg} .quirk:nth-child(even){rotate:1.2deg} .quirk{transition:rotate .25s ease,translate .25s ease,filter .25s ease} .quirk:hover{rotate:0deg}
      .wobble:hover{animation:shake .35s ease 2}
      @keyframes shake { 0%{transform:rotate(0deg)} 25%{transform:rotate(-1deg)} 50%{transform:rotate(0deg)} 75%{transform:rotate(1deg)} 100%{transform:rotate(0deg)} }

      @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; } }

      .glitch { position:relative; display:inline-block; animation:shake 3s infinite; }
      .scanbar { animation:scanLine 3s infinite; border-radius: 5px; }
      /* Hover/focus feedback for everything clickable. Uses the separate "translate" property so it never fights inline transforms. */
      a[href], button, [role="button"], select, summary, label[for] { transition: translate .2s ease, filter .2s ease, box-shadow .2s ease, border-color .2s ease, background-color .2s ease, opacity .2s ease; }
      @media (hover: hover) {
        a[href]:hover, button:not(:disabled):hover, [role="button"]:hover, summary:hover { translate: 0 -2px; filter: brightness(1.12); }
        select:hover { filter: brightness(1.12); }
      }
      a[href]:active, button:not(:disabled):active, [role="button"]:active { translate: 0 0; filter: brightness(.95); }
      a[href]:focus-visible, button:focus-visible, [role="button"]:focus-visible, select:focus-visible { outline: 2px solid currentColor; outline-offset: 3px; }
      /* Cards: lift with a soft shadow. filter: drop-shadow works even where cards set their own inline box-shadow. */
      .hover-card, [style*="cursor: pointer"] { transition: translate .25s ease, filter .25s ease; }
      @media (hover: hover) {
        .hover-card:hover, div[style*="cursor: pointer"]:hover, a.hover-card:hover { translate: 0 -4px; filter: drop-shadow(0 14px 20px rgba(0,0,0,.35)); }
      }
      /* 3D depth: cards keep their own space, children float forward, and a stacked "thickness" edge sits below. */
      .hover-card { position: relative; transform-style: preserve-3d; will-change: transform; border-radius: 16px;
        box-shadow: inset 0 1px 0 rgba(255,255,255,.38), inset 0 -2px 0 rgba(0,0,0,.4), 0 5px 0 rgba(0,0,0,.4), 0 16px 26px rgba(0,0,0,.3);
        transition: transform .15s ease-out, translate .25s ease, filter .25s ease, box-shadow .25s ease; }
      /* Specular glare: invisible until hovered, then follows the cursor. */
      .hover-card::before { content: ""; position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 3; opacity: 0; transition: opacity .25s;
        background: radial-gradient(circle at var(--mx, 25%) var(--my, 0%), rgba(255,255,255,.16), transparent 55%); }
      .hover-card:hover::before { opacity: 1; }
      .hover-card > * { transform: translateZ(24px); }
      .hover-card:hover { box-shadow: inset 0 1px 0 rgba(255,255,255,.5), inset 0 -2px 0 rgba(0,0,0,.45), 0 9px 0 rgba(0,0,0,.4), 0 26px 40px rgba(0,0,0,.4); }
      .hover-card:active { translate: 0 4px; box-shadow: inset 0 2px 6px rgba(0,0,0,.45), 0 2px 0 rgba(0,0,0,.4); }
      section[id] { scroll-margin-top: 80px; }
      .float-y { animation:floatY 2s ease-in-out infinite; }
    `}</style>
    );
}
