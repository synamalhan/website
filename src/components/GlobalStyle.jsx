export default function GlobalStyle() {
    return (
        <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800&family=Inter:wght@300;400;600&display=swap');
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

      .glitch { position:relative; display:inline-block; animation:shake 3s infinite; }
      .scanbar { animation:scanLine 3s infinite; border-radius: 5px; }
      .float-y { animation:floatY 2s ease-in-out infinite; }
    `}</style>
    );
}
