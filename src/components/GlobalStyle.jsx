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
      .float-y { animation:floatY 2s ease-in-out infinite; }
    `}</style>
    );
}
