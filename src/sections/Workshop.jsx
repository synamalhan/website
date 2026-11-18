import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { ClientOnly } from "vite-react-ssg";
import { useTheme } from "../theme/ThemeContext";
import { FONTS } from "../components/styles";
import { useIsMobile, useMediaQuery } from "../hooks/useMediaQuery";
import Label from "../components/ui/Label";
import H2 from "../components/ui/H2";
const MetalOrca3D = lazy(() => import("../components/MetalOrca3D"));

export default function Workshop() {
    const { theme: t } = useTheme();
    const isMobile = useIsMobile();
    const inHero = useMediaQuery("(min-width: 1100px)"); // the hero shows the orca at this width
    const [exploded, setExploded] = useState(false);
    const [near, setNear] = useState(false);
    const box = useRef(null);
    // Don't download three.js until the section is about to scroll into view.
    useEffect(() => {
        const io = new IntersectionObserver(([en]) => en.isIntersecting && (setNear(true), io.disconnect()), { rootMargin: "600px" });
        box.current && io.observe(box.current);
        return () => io.disconnect();
    }, []);
    const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (inHero) return null;
    return (
        <section id="workshop" style={{ padding: isMobile ? "60px 20px" : "100px 24px", position: "relative", zIndex: 10 }}>
            <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
                <Label center>// Off the clock</Label>
                <H2 style={{ textAlign: "center" }}>METAL EARTH</H2>
                <p style={{ color: t.textMute, fontSize: "1.05rem", lineHeight: 1.6, maxWidth: "52ch", margin: "0 auto 8px" }}>
                    I build Metal Earth kits and I think best near the ocean. So here is an orca on a wave, in the style of a Metal Earth kit.
                </p>
                <div ref={box} style={{ height: isMobile ? 380 : 500, marginTop: 24 }}>
                    {near && <ClientOnly>{() => <Suspense fallback={null}><MetalOrca3D exploded={exploded} reduced={reduced} rotate={!isMobile} /></Suspense>}</ClientOnly>}
                </div>
                <button type="button" onClick={() => setExploded(e => !e)} aria-pressed={exploded} style={{
                    ...FONTS.mono, fontSize: ".85rem", letterSpacing: ".14em", padding: "12px 22px", cursor: "pointer", borderRadius: 10,
                    background: "transparent", color: t.textHi, border: `1px solid ${t.borderHi}`,
                }}>{exploded ? "ASSEMBLE" : "EXPLODE VIEW"}</button>
                {!isMobile && <div style={{ ...FONTS.mono, fontSize: ".75rem", letterSpacing: ".14em", color: t.textMute, marginTop: 14 }}>DRAG TO ROTATE</div>}
            </div>
        </section>
    );
}
