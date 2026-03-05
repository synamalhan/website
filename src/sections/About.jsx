import { forwardRef } from "react";
import { useTheme } from "../theme/ThemeContext";
import { FONTS } from "../components/styles";
import Label from "../components/ui/Label";
import H2 from "../components/ui/H2";
import OrbitalRings3D from "../components/OrbitalRings3D";
import resume from "../assets/SYNA_MALHAN.pdf";

const About = forwardRef(function About({ counts }, ref) {
    const { theme: t } = useTheme();

    return (
        <section
            id="about"
            ref={ref}
            style={{
                padding: "clamp(60px, 10vw, 120px) 24px",
                position: "relative",
                zIndex: 10,
                maxWidth: 1200,
                margin: "0 auto"
            }}
        >
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "60px",
                alignItems: "start"
            }}>
                {/* Left Side: Bio & Stats */}
                <div style={{ transform: "translateZ(20px)" }}>
                    <Label>// About Me</Label>
                    <H2>CRAFTSMAN &<br />CODE-MAKER</H2>

                    <p style={{
                        fontSize: "1.05rem",
                        lineHeight: 1.8,
                        color: t.textHi,
                        fontWeight: 400,
                        marginBottom: 20
                    }}>
                        I'm <span style={{ color: t.accent, fontWeight: 700 }}>Syna Malhan</span>, a passionate developer and problem-solver driven by curiosity and creativity.
                    </p>

                    <p style={{
                        fontSize: "0.95rem",
                        lineHeight: 1.7,
                        color: t.textMute,
                        fontWeight: 300,
                        marginBottom: 20
                    }}>
                        With a strong background in <span style={{ color: t.cyan, fontWeight: 500 }}>AI, Data Science, and iOS Development</span>, I love building intelligent systems that are both functional and visually stunning. Whether it's architecting Swift solutions or training neural nets, I focus on building tools that are accessible, empathetic, and human.
                    </p>

                    <p style={{
                        fontSize: "0.95rem",
                        lineHeight: 1.7,
                        color: t.textMute,
                        fontWeight: 300,
                        marginBottom: 32
                    }}>
                        Outside of code, I explore ways to bring ideas to life — through research, hackathons, or intricate physical puzzles. I thrive at the boundary of machine intelligence and physical craft.
                    </p>

                    {/* Fun Fact Box */}
                    <div style={{
                        background: `${t.accent}10`,
                        border: `1px solid ${t.accent}30`,
                        padding: "20px",
                        borderRadius: "16px",
                        marginBottom: 40,
                        display: "flex",
                        gap: "16px",
                        alignItems: "center"
                    }}>
                        <div style={{ fontSize: "1.5rem" }}>🔧</div>
                        <div style={{ fontSize: "0.85rem", color: t.text, lineHeight: 1.5 }}>
                            <strong style={{ color: t.accent }}>Fun Fact:</strong> I like to build Metal Earth models — tiny, intricate 3D puzzles made from laser-cut metal sheets.
                        </div>
                    </div>

                    {/* Dynamic Stats Grid */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
                        {[
                            { n: counts.p, l: "Projects", color: t.cyan },
                            { n: counts.a, l: "iOS Apps", color: t.accent },
                            { n: counts.m, l: "ML Models", color: t.magenta },
                            { n: counts.y, l: "Years Exp", color: t.gold }
                        ].map((s, i) => (
                            <div key={i} style={{
                                background: t.surface,
                                border: `1px solid ${t.border}`,
                                padding: "24px",
                                borderRadius: "12px",
                                transition: "all 0.3s ease",
                                borderLeft: `4px solid ${s.color}`
                            }}>
                                <div style={{ ...FONTS.orb, fontWeight: 900, fontSize: "2.2rem", color: t.textHi }}>{s.n}</div>
                                <div style={{ ...FONTS.mono, fontSize: "0.65rem", letterSpacing: "2px", color: t.textMute, marginTop: 4, textTransform: "uppercase" }}>{s.l}</div>
                            </div>
                        ))}
                    </div>

                    <a
                        href={resume}
                        download
                        style={{
                            display: "inline-block",
                            marginTop: "40px",
                            padding: "16px 32px",
                            background: t.accent,
                            color: "#fff",
                            borderRadius: "12px",
                            textDecoration: "none",
                            ...FONTS.mono,
                            fontSize: "0.8rem",
                            letterSpacing: "2px",
                            boxShadow: `0 10px 20px ${t.accent}33`,
                            transition: "transform 0.2s"
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                        onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                    >
                        DOWNLOAD RESUME
                    </a>
                </div>

                {/* Right Side: Orbital Rings & Spotify */}
                <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
                    {/* Visual Anchor */}
                    <div style={{
                        height: 400,
                        position: "relative",
                        background: `radial-gradient(circle at center, ${t.accent}0a, transparent)`,
                        borderRadius: "24px",
                        border: `1px solid ${t.border}`
                    }}>
                        <OrbitalRings3D />
                    </div>

                    {/* Spotify Player */}
                    <div style={{
                        borderRadius: "20px",
                        overflow: "hidden",
                        border: `1px solid ${t.border}`,
                        boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                    }}>
                        <iframe
                            title="Spotify"
                            src="https://open.spotify.com/embed/playlist/0Uggezps9kTbnOpFB7ovff?utm_source=generator&theme=0"
                            width="100%"
                            height="352"
                            frameBorder="0"
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"
                            style={{ borderRadius: "12px", border: "none" }}
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
});

export default About;
