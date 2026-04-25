import { forwardRef, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../theme/ThemeContext";
import { FONTS } from "../components/styles";
import { useIsMobile } from "../hooks/useMediaQuery";
import Label from "../components/ui/Label";
import H2 from "../components/ui/H2";
import SimpleCarousel from "../components/SimpleCarousel";
import resume from "../assets/SYNA_MALHAN.pdf";

import img1 from "../assets/profile/1.jpg";
import img2 from "../assets/profile/2.jpg";
import img3 from "../assets/profile/3.jpg";
import img4 from "../assets/profile/4.jpg";
import img5 from "../assets/profile/5.jpg";
import img6 from "../assets/profile/6.jpg";
import img7 from "../assets/profile/7.jpg";

import { useSpotifySync } from "../hooks/useSpotifySync";

const galleryItems = [
    { image: img1, title: "ENGINEER", description: "Crafting robust and scalable systems." },
    { image: img2, title: "BUILDER", description: "Turning complex ideas into interactive reality." },
    { image: img3, title: "EXPLORER", description: "Constantly pushing the boundaries of technology." },
    { image: img4, title: "AI / ML", description: "Designing intelligent systems for the future." },
    { image: img5, title: "MOBILE", description: "Creating fluid experiences on every device." },
    { image: img6, title: "CREATIVE", description: "Where sophisticated code meets artistic vision." },
    { image: img7, title: "DESIGN", description: "Finding elegance in every pixel and interaction." }
];

const idleMessages = [
    "Taking a sonic breather.",
    "Silence is golden, but code is louder.",
    "Refueling my neural playlist.",
    "Currently enjoying the sound of silence.",
    "Tuning out to tune in.",
    "My ears are in deep-focus mode."
];

const About = forwardRef(function About({ counts = {} }, ref) {
    const { theme: t } = useTheme();
    const isMobile = useIsMobile();
    const { isPlaying, title, artist, parsedLyrics, currentProgress } = useSpotifySync();

    const currentLyricLine = isPlaying 
        ? ([...parsedLyrics].reverse().find(l => currentProgress >= l.time)?.text || title || "♪")
        : idleMessages[Math.floor(Date.now() / 30000) % idleMessages.length];

    const bentoStyles = {
        box: {
            background: `${t.surface}80`,
            border: `1px solid ${t.border}`,
            borderRadius: "24px",
            padding: "24px",
            height: "100%",
            position: "relative",
            overflow: "hidden",
            backdropFilter: "blur(12px)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            display: "flex",
            flexDirection: "column"
        },
        grid: {
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)",
            gridAutoRows: "minmax(180px, auto)",
            gap: "16px",
            maxWidth: 1200,
            margin: "0 auto"
        }
    };

    const BentoBox = ({ children, style = {}, colSpan = 1, rowSpan = 1, hover = true }) => (
        <motion.div
            whileHover={hover ? { y: -5, boxShadow: `0 10px 30px ${t.accent}15`, borderColor: `${t.accent}40` } : {}}
            style={{
                ...bentoStyles.box,
                gridColumn: isMobile ? "span 1" : `span ${colSpan}`,
                gridRow: isMobile ? "auto" : `span ${rowSpan}`,
                ...style
            }}
        >
            {children}
        </motion.div>
    );

    return (
        <section
            id="about"
            ref={ref}
            style={{
                padding: isMobile ? "60px 20px" : "clamp(100px, 12vw, 160px) 24px",
                position: "relative",
                zIndex: 10
            }}
        >
            <div style={bentoStyles.grid}>
                {/* 1. BIO BOX (2x2) */}
                <BentoBox colSpan={2} rowSpan={2} style={{ justifyContent: 'center' }}>
                    <Label>// About Me</Label>
                    <H2 style={{ fontSize: isMobile ? '2.5rem' : '3.5rem', marginBottom: '20px' }}>ABOUT<br />ME</H2>
                    <p style={{
                        fontSize: "1rem",
                        lineHeight: 1.7,
                        color: t.textHi,
                        fontWeight: 400,
                        marginBottom: 16
                    }}>
                        I'm <span style={{ color: t.accent, fontWeight: 700 }}>Syna Malhan</span>, a developer crafting at the intersection of machine intelligence and human intuition.
                    </p>
                    <p style={{
                        fontSize: "0.9rem",
                        lineHeight: 1.6,
                        color: t.textMute,
                        fontWeight: 300,
                        marginBottom: 24
                    }}>
                        I build tools that are functional yet visually stunning, focusing on <span style={{ color: t.cyan }}>AI/ML and iOS development</span>. My goal is to create code that feels personal and empathetic.
                    </p>
                    <a
                        href={resume}
                        download
                        style={{
                            alignSelf: 'flex-start',
                            padding: "12px 24px",
                            background: t.accent,
                            color: "#fff",
                            borderRadius: "12px",
                            textDecoration: "none",
                            ...FONTS.mono,
                            fontSize: "0.75rem",
                            letterSpacing: "2px",
                            boxShadow: `0 8px 16px ${t.accent}33`,
                            transition: "transform 0.2s"
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                        onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                    >
                        RESUME
                    </a>
                </BentoBox>

                {/* 2. GALLERY BOX (2x2) */}
                <BentoBox colSpan={2} rowSpan={2} style={{ padding: 0 }}>
                    <SimpleCarousel items={galleryItems} />
                </BentoBox>

                {/* 3. SPOTIFY BOX (2x2) */}
                <BentoBox colSpan={2} rowSpan={2} style={{ padding: 0, background: '#000', border: 'none' }}>
                    <iframe 
                        data-testid="embed-iframe" 
                        style={{ 
                            borderRadius: '24px',
                            border: 'none',
                            width: '100%',
                            height: '100%',
                            minHeight: '352px'
                        }} 
                        src={`https://open.spotify.com/embed/playlist/0Uggezps9kTbnOpFB7ovff?utm_source=generator&theme=${t.name === 'dark' ? '0' : '1'}`} 
                        frameBorder="0" 
                        allowFullScreen="" 
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                        loading="lazy"
                    ></iframe>
                </BentoBox>

                {/* 4 & 5. STATS BOXES (1x1 each) */}
                {[
                    { n: counts.p || 0, l: "Projects", color: t.cyan },
                    { n: counts.a || 0, l: "iOS Apps", color: t.accent }
                ].map((s, i) => (
                    <BentoBox key={i} colSpan={1} rowSpan={1} style={{ justifyContent: 'center', borderLeft: `4px solid ${s.color}` }}>
                        <div style={{ ...FONTS.orb, fontWeight: 900, fontSize: "2.5rem", color: t.textHi }}>{s.n}</div>
                        <div style={{ ...FONTS.mono, fontSize: "0.65rem", letterSpacing: "2px", color: t.textMute, marginTop: 4, textTransform: "uppercase" }}>{s.l}</div>
                    </BentoBox>
                ))}

                {/* 7 & 8. STATS BOXES & MUSIC BOX */}
                <BentoBox colSpan={1} rowSpan={1} style={{ justifyContent: 'center', borderLeft: `4px solid ${t.magenta}` }}>
                    <div style={{ ...FONTS.orb, fontWeight: 900, fontSize: "2.5rem", color: t.textHi }}>{counts.m || 0}</div>
                    <div style={{ ...FONTS.mono, fontSize: "0.65rem", letterSpacing: "2px", color: t.textMute, marginTop: 4, textTransform: "uppercase" }}>ML Models</div>
                </BentoBox>

                <BentoBox colSpan={1} rowSpan={1} style={{ 
                    justifyContent: 'center', 
                    borderLeft: `4px solid ${isPlaying ? '#1DB954' : t.gold}`,
                    background: isPlaying ? 'rgba(29, 185, 84, 0.05)' : 'transparent'
                }}>
                    <div style={{ 
                        ...FONTS.mono, 
                        fontSize: "0.5rem", 
                        color: isPlaying ? '#1DB954' : t.textMute, 
                        letterSpacing: '1px', 
                        marginBottom: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                    }}>
                        {isPlaying && <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }}>●</motion.span>}
                        {isPlaying ? "CURRENTLY LISTENING" : "TAKING A BREAK"}
                    </div>
                    
                    <div style={{ 
                        ...FONTS.orb, 
                        fontWeight: 700, 
                        fontSize: isPlaying ? "0.85rem" : "0.9rem", 
                        color: t.textHi,
                        lineHeight: 1.4,
                        maxHeight: '4.2em',
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical'
                    }}>
                        {currentLyricLine}
                    </div>

                    {isPlaying && (
                        <div style={{ ...FONTS.mono, fontSize: '0.6rem', color: t.textMute, marginTop: '8px', opacity: 0.6 }}>
                            {title} — {artist}
                        </div>
                    )}
                </BentoBox>

                {/* 6. FUN FACT BOX (FULL WIDTH 4x1) */}
                <BentoBox colSpan={isMobile ? 1 : 4} rowSpan={1} style={{
                    justifyContent: 'center',
                    background: `linear-gradient(135deg, ${t.surface}80, ${t.accent}10)`
                }}>
                    <div style={{ display: "flex", gap: "24px", alignItems: "center", justifyContent: 'center' }}>
                        <div style={{ fontSize: "2.5rem" }}>🔧</div>
                        <div>
                            <div style={{ ...FONTS.mono, fontSize: "0.7rem", color: t.accent, letterSpacing: '2px', marginBottom: '4px' }}>FUN FACT</div>
                            <div style={{ fontSize: "1rem", color: t.text, lineHeight: 1.5 }}>
                                I build <strong style={{ color: t.textHi }}>Metal Earth</strong> — tiny, intricate 3D puzzles from laser-cut metal sheets.
                            </div>
                        </div>
                    </div>
                </BentoBox>
            </div>
        </section>
    );
});



export default About;
