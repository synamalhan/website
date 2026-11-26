import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { ClientOnly } from "vite-react-ssg";
import { useTheme } from "../theme/ThemeContext";
import { FONTS } from "../components/styles";
import { useIsMobile } from "../hooks/useMediaQuery";
import Guard from "../components/Guard";
import H2 from "../components/ui/H2";
const MetalOrca3D = lazy(() => import("../components/MetalOrca3D"));

export default function Workshop() {
    const { theme: t } = useTheme();
    const isMobile = useIsMobile();
    const [exploded, setExploded] = useState(false);
    const [near, setNear] = useState(false);
    const [seen, setSeen] = useState(false); // start the build only once the orca is actually on screen
    const [buildKey, setBuildKey] = useState(0);
    const box = useRef(null);
    // Don't download three.js until the section is about to scroll into view.
    useEffect(() => {
        const io = new IntersectionObserver(([en]) => en.isIntersecting && (setNear(true), io.disconnect()), { rootMargin: "600px" });
        box.current && io.observe(box.current);
        const watch = new IntersectionObserver(([en]) => en.isIntersecting && (setSeen(true), watch.disconnect()), { threshold: 0.4 });
        box.current && watch.observe(box.current);
        return () => { io.disconnect(); watch.disconnect(); };
    }, []);
    const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    return (
        <section id="workshop" style={{ padding: isMobile ? "60px 20px" : "100px 24px", position: "relative", zIndex: 10 }}>
            <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
                <H2 style={{ textAlign: "center" }}>SIDE PROJECT: AN ORCA</H2>
                <p style={{ color: t.textMute, fontSize: "1.05rem", lineHeight: 1.6, maxWidth: "52ch", margin: "0 auto 8px" }}>
                    A Metal Earth-style orca, built in three.js. Thin metal sheets fly in and build it. Then drag to rotate or explode it.
                </p>
                <div ref={box} style={{ height: isMobile ? 380 : 500, marginTop: 24 }}>
                    {near && <Guard><ClientOnly>{() => <Suspense fallback={null}><MetalOrca3D exploded={exploded} reduced={reduced} rotate={!isMobile} play={seen} buildKey={buildKey} /></Suspense>}</ClientOnly></Guard>}
                </div>
                <button type="button" onClick={() => setExploded(e => !e)} aria-pressed={exploded} style={{
                    ...FONTS.mono, fontSize: "0.97rem", letterSpacing: ".14em", padding: "12px 22px", cursor: "pointer", borderRadius: 10,
                    background: "transparent", color: t.textHi, border: `1px solid ${t.borderHi}`,
                }}>{exploded ? "ASSEMBLE" : "EXPLODE VIEW"}</button>
                {!reduced && <button type="button" onClick={() => { setExploded(false); setBuildKey(k => k + 1); }} style={{
                    ...FONTS.mono, fontSize: "0.97rem", letterSpacing: ".14em", padding: "12px 22px", cursor: "pointer", borderRadius: 10, marginLeft: 12,
                    background: "transparent", color: t.textHi, border: `1px solid ${t.borderHi}`,
                }}>REPLAY BUILD</button>}
                {!isMobile && <div style={{ ...FONTS.mono, fontSize: "0.87rem", letterSpacing: ".14em", color: t.textMute, marginTop: 14 }}>DRAG TO ROTATE</div>}
            </div>
        </section>
    );
}
