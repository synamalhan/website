export default function GlobalStyle() {
    return (
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
}
