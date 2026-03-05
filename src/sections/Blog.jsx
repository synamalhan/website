import { useState, useEffect, useRef } from "react";
import { useTheme } from "../theme/ThemeContext";
import { FONTS } from "../components/styles";
import Label from "../components/ui/Label";
import H2 from "../components/ui/H2";
import { BLOG } from "../data/blog";

export default function Blog() {
    const { theme: t } = useTheme();
    const blogPh = useRef(BLOG.map(() => Math.random() * Math.PI * 2));
    const [bfloat, setBfloat] = useState(BLOG.map(() => ({ x: 0, y: 0, r: 0 })));
    const [selectedPost, setSelectedPost] = useState(null);

    // Stable randomized positions
    const posRef = useRef(BLOG.map((_, i) => ({
        left: `${(i * 20 + Math.random() * 15) % 75 + 5}%`,
        top: `${(i * 15 + Math.random() * 20) % 65 + 10}%`
    })));

    useEffect(() => {
        let raf;
        const loop = () => {
            const tt = Date.now() * .0008;
            setBfloat(BLOG.map((_, i) => ({
                x: Math.cos(tt * .6 + blogPh.current[i]) * 7,
                y: Math.sin(tt * .8 + blogPh.current[i]) * 12,
                r: Math.sin(tt * .4 + blogPh.current[i]) * 1.2,
            })));
            raf = requestAnimationFrame(loop);
        };
        loop(); return () => cancelAnimationFrame(raf);
    }, []);

    useEffect(() => {
        if (selectedPost) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "auto";
    }, [selectedPost]);

    return (
        <section id="notes" style={{ padding: "80px 24px 100px", position: "relative", zIndex: selectedPost ? 1001 : 1, overflow: "visible", maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ marginBottom: 52, textAlign: "center" }}><Label center>// Notes</Label><H2 style={{ textAlign: "center" }}>SIGNAL DRIFT</H2></div>
            <div style={{ position: "relative", height: 550 }}>
                {BLOG.map((post, i) => {
                    const pos = posRef.current[i];
                    const fl = bfloat[i] || { x: 0, y: 0, r: 0 };
                    return (
                        <div key={i}
                            onClick={() => setSelectedPost(post)}
                            style={{
                                position: "absolute", ...pos, width: 280,
                                transform: `translate(${fl.x}px,${fl.y}px) rotate(${fl.r}deg)`,
                                background: t.cardBg, border: `1px solid ${t.border}`, padding: "22px", cursor: "pointer",
                                backdropFilter: "blur(10px)", transition: "all .25s", borderRadius: 2,
                                clipPath: "polygon(0 0,100% 0,100% calc(100% - 12px),calc(100% - 12px) 100%,0 100%)"
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.borderColor = t.cyan;
                                e.currentTarget.style.transform += " scale(1.02)";
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.borderColor = t.border;
                                e.currentTarget.style.transform = `translate(${fl.x}px,${fl.y}px) rotate(${fl.r}deg)`;
                            }}>
                            <div style={{ ...FONTS.mono, fontSize: ".54rem", letterSpacing: ".28em", color: t.cyan, marginBottom: 7 }}>{post.date}</div>
                            <div style={{ ...FONTS.orb, fontWeight: 700, fontSize: ".82rem", color: t.textHi, lineHeight: 1.4, marginBottom: 9 }}>{post.title}</div>
                            <div style={{ fontSize: ".75rem", lineHeight: 1.7, color: t.textMute }}>{post.excerpt}</div>
                        </div>
                    );
                })}
            </div>

            {/* Blog Modal Overlay */}
            {selectedPost && (
                <div
                    onClick={() => setSelectedPost(null)}
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: `${t.bg}cc`,
                        backdropFilter: "blur(12px)",
                        zIndex: 1000,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "40px 24px"
                    }}
                >
                    <div
                        onClick={e => e.stopPropagation()}
                        style={{
                            width: "90%",
                            maxWidth: 800,
                            maxHeight: "85vh",
                            background: t.bg,
                            border: `1px solid ${t.border}`,
                            borderRadius: 24,
                            padding: "48px 32px",
                            position: "relative",
                            display: "flex",
                            flexDirection: "column",
                            boxShadow: `0 40px 100px rgba(0,0,0,0.6)`,
                            animation: "fadeUp .4s cubic-bezier(0.16, 1, 0.3, 1)"
                        }}
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setSelectedPost(null)}
                            style={{
                                position: "absolute",
                                top: 24,
                                right: 24,
                                background: t.surface,
                                border: `1px solid ${t.border}`,
                                color: t.textHi,
                                ...FONTS.mono,
                                cursor: "pointer",
                                fontSize: "0.6rem",
                                padding: "8px 12px",
                                borderRadius: 8,
                                zIndex: 10
                            }}
                        >
                            CLOSE ESC
                        </button>

                        <div style={{ overflowY: "auto", paddingRight: 10 }}>
                            <div style={{ ...FONTS.mono, fontSize: "0.7rem", color: t.cyan, letterSpacing: 2, marginBottom: 12 }}>{selectedPost.date}</div>
                            <H2 style={{ fontSize: "2rem", marginBottom: 24, color: t.accent }}>{selectedPost.title}</H2>
                            <div
                                style={{
                                    ...FONTS.inter,
                                    fontSize: "1rem",
                                    lineHeight: 1.8,
                                    color: t.textMute,
                                    whiteSpace: "pre-wrap"
                                }}
                            >
                                {selectedPost.content}
                            </div>
                        </div>

                        {/* Decoration lines */}
                        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${t.cyan}, ${t.accent}, ${t.magenta})`, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 }} />
                    </div>
                </div>
            )}
        </section>
    );
}
