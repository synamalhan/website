import { forwardRef, useEffect, useRef } from "react";
import { useReading } from "../hooks/useReading";
import uboat from "../assets/metalearth.png";
import { yearsSinceFirstRole, profile } from "../data/portfolio";
import { motion } from "framer-motion";
import { useTheme } from "../theme/ThemeContext";
import { FONTS } from "../components/styles";
import { useIsMobile } from "../hooks/useMediaQuery";
import Label from "../components/ui/Label";
import H2 from "../components/ui/H2";
import SimpleCarousel from "../components/SimpleCarousel";
import resume from "../assets/SYNA_MALHAN.pdf";
import { useState } from "react";
import Suggest from "./Suggest";

import img1 from "../assets/profile/1.jpg";
import img2 from "../assets/profile/2.jpg";
import img3 from "../assets/profile/3.jpg";
import img4 from "../assets/profile/4.jpg";
import img5 from "../assets/profile/5.jpg";
import img6 from "../assets/profile/6.jpg";
import img7 from "../assets/profile/7.jpg";

import { useSpotifySync } from "../hooks/useSpotifySync";

const galleryItems = [
    {
        image: img1,
        title: "This is me",
        description: ""
    },

    {
        image: img5,
        title: "Billu",
        description: "We looked after this little guy for a while."
    },

    {
        image: img7,
        title: "A small build",
        description: "A metal earth model!"
    }
];

const idleMessages = [
    "Taking a sonic breather.",
    "Refueling my neural playlist.",
    "Currently enjoying the sound of silence.",
    "Tuning out to tune in.",
    "My ears are in deep-focus mode."
];

const MusicTile = ({ t, counts, isMobile, sync }) => {
    const { isPlaying, title, artist, parsedLyrics, currentProgress, currentUri } = sync;

    const currentIndex = parsedLyrics.findIndex((l, i) =>
        currentProgress >= l.time && (i === parsedLyrics.length - 1 || currentProgress < parsedLyrics[i + 1].time)
    );

    const lyricWindow = isPlaying && currentIndex !== -1 ? {
        prev: parsedLyrics[currentIndex - 1]?.text,
        curr: parsedLyrics[currentIndex]?.text,
        next: parsedLyrics[currentIndex + 1]?.text
    } : null;

    const [showPlayer, setShowPlayer] = useState(false);
        
    // Store latest progress to use inside iframe callback
    const progressRef = useRef(currentProgress);
    useEffect(() => {
        progressRef.current = currentProgress;
    }, [currentProgress]);

    const playerDivRef = useRef(null);

    useEffect(() => {
        if (!showPlayer) return;
        let isCancelled = false;

        const loadPlayer = (IFrameAPI) => {
            if (isCancelled || !playerDivRef.current) return;
            
            playerDivRef.current.innerHTML = '<div id="spotify-embed-mnt"></div>';
            const mountPoint = playerDivRef.current.querySelector('#spotify-embed-mnt');

            const options = {
                uri: currentUri,
                width: '100%',
                height: '80',
                theme: t.name === 'dark' ? '0' : '1'
            };

            const callback = (EmbedController) => {
                if (isCancelled) {
                    EmbedController.destroy();
                    return;
                }
                EmbedController.addListener('ready', () => {
                    EmbedController.seek(Math.floor(progressRef.current / 1000));
                });
            };

            IFrameAPI.createController(mountPoint, options, callback);
        };

        if (!window.onSpotifyIframeApiReady) {
            window.onSpotifyIframeApiReady = (IFrameAPI) => {
                window.SpotifyIframeAPI = IFrameAPI;
                loadPlayer(IFrameAPI);
            };
        } else if (window.SpotifyIframeAPI) {
            loadPlayer(window.SpotifyIframeAPI);
        }

        const scriptId = 'spotify-api-script';
        if (!document.getElementById(scriptId)) {
            const script = document.createElement('script');
            script.id = scriptId;
            script.src = "https://open.spotify.com/embed/iframe-api/v1";
            script.async = true;
            document.body.appendChild(script);
        }

        return () => {
            isCancelled = true;
        };
    }, [showPlayer, currentUri, t.name]);

    const idleMessage = idleMessages[Math.floor(Date.now() / 30000) % idleMessages.length];
    const hasLyrics = parsedLyrics.length > 0;

    return (
        <motion.div
            className="hover-card"
            whileHover={{ y: -5, boxShadow: isPlaying ? `0 10px 40px rgba(29, 185, 84, 0.3)` : `0 10px 30px ${t.accent}15` }}
            style={{
                background: isPlaying ? `linear-gradient(135deg, ${t.surface}90, rgba(29, 185, 84, 0.1))` : '#000',
                border: isPlaying ? `1px solid rgba(29, 185, 84, 0.4)` : 'none',
                borderLeft: isPlaying ? `4px solid #1DB954` : 'none',
                borderRadius: "24px",
                padding: isPlaying ? (isMobile ? "20px" : "32px") : 0,
                height: "100%",
                position: "relative",
                overflow: "hidden",
                backdropFilter: "blur(12px)",
                transition: "all 0.5s ease",
                display: "flex",
                flexDirection: "column",
                gridColumn: isMobile ? "span 1" : "span 2",
                gridRow: isMobile ? "auto" : "span 2",
                justifyContent: 'center'
            }}
        >
            {isPlaying ? (
                <>
                    <div style={{
                        ...FONTS.mono,
                        fontSize: "0.65rem",
                        color: '#1DB954',
                        letterSpacing: '2px',
                        marginBottom: "20px",
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        justifyContent: 'center'
                    }}>
                        <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }}>●</motion.span>
                        <span>LIVE NOW</span>
                    </div>

                    <div style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        minHeight: '120px'
                    }}>
                        <div style={{
                            ...FONTS.orb,
                            fontWeight: 800,
                            color: t.textHi,
                            lineHeight: 1.4,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px',
                            textAlign: 'center'
                        }}>
                            {hasLyrics ? (
                                lyricWindow ? (
                                    <>
                                        <div style={{ fontSize: "0.9rem", opacity: 0.15 }}>{lyricWindow.prev || " "}</div>
                                        <div style={{ fontSize: "1.5rem", opacity: 1, color: '#1DB954' }}>{lyricWindow.curr}</div>
                                        <div style={{ fontSize: "0.9rem", opacity: 0.15 }}>{lyricWindow.next || " "}</div>
                                    </>
                                ) : (
                                    <div style={{ fontSize: "1.1rem", opacity: 0.4 }}>(Syncing...)</div>
                                )
                            ) : (
                                <div style={{ fontSize: "1.4rem", color: '#1DB954' }}>{title}</div>
                            )}
                        </div>
                    </div>

                    <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', paddingTop: '20px' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{
                                ...FONTS.mono,
                                fontSize: '0.85rem',
                                color: '#1DB954',
                                fontWeight: 800,
                                letterSpacing: '2px',
                                textTransform: 'uppercase'
                            }}>
                                {title}
                            </div>
                            <div style={{ ...FONTS.mono, fontSize: '0.7rem', color: t.textMute, opacity: 0.6 }}>
                                {artist}
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
                            {currentUri?.startsWith('spotify:track:') && (
                                <button
                                    onClick={() => setShowPlayer(!showPlayer)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        padding: '12px 24px',
                                        background: showPlayer ? 'rgba(29, 185, 84, 0.2)' : '#1DB954',
                                        border: `1px solid #1DB954`,
                                        borderRadius: '30px',
                                        color: showPlayer ? '#1DB954' : 'white',
                                        ...FONTS.mono,
                                        fontSize: '0.75rem',
                                        fontWeight: 700,
                                        letterSpacing: '1px',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s'
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                                    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                                >
                                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                        {showPlayer ? (
                                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                                        ) : (
                                            <path d="M8 5v14l11-7z" />
                                        )}
                                    </svg>
                                    {showPlayer ? "CLOSE PLAYER" : "PLAY HERE"}
                                </button>
                            )}
                        </div>

                        {showPlayer && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    zIndex: 50,
                                    padding: isMobile ? "15px" : "24px",
                                    paddingBottom: isMobile ? "10px" : "15px",
                                    background: `linear-gradient(to top, rgba(0,0,0,0.95) 60%, transparent)`,
                                    borderBottomLeftRadius: '24px',
                                    borderBottomRightRadius: '24px',
                                    boxShadow: `0 -10px 40px rgba(29, 185, 84, 0.2)`
                                }}
                            >
                                <div ref={playerDivRef} style={{ width: '100%', borderRadius: '12px', overflow: 'hidden' }}></div>
                            </motion.div>
                        )}
                    </div>
                </>
            ) : (
                <iframe
                    data-testid="embed-iframe"
                    title="Spotify playlist player"
                    style={{ borderRadius: '24px', border: 'none', width: '100%', height: '100%', minHeight: '352px' }}
                    src={`https://open.spotify.com/embed/playlist/0Uggezps9kTbnOpFB7ovff?utm_source=generator&theme=${t.name === 'dark' ? '0' : '1'}`}
                    frameBorder="0"
                    allowFullScreen=""
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                ></iframe>
            )}
        </motion.div>
    );
};

const BentoBox = ({ children, style = {}, colSpan = 1, rowSpan = 1, hover = true }) => {
    const { theme: t } = useTheme();
    const isMobile = useIsMobile();

    return (
        <motion.div
            className="hover-card"
            whileHover={hover ? { y: -5, boxShadow: `0 10px 30px ${t.accent}15`, borderColor: `${t.accent}40` } : {}}
            style={{
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
                flexDirection: "column",
                gridColumn: isMobile ? "span 1" : `span ${colSpan}`,
                gridRow: isMobile ? "auto" : `span ${rowSpan}`,
                ...style
            }}
        >
            {children}
        </motion.div>
    );
};

const About = forwardRef(function About({ counts = {} }, ref) {
    const { theme: t } = useTheme();
    const isMobile = useIsMobile();
    const sync = useSpotifySync();
    const book = useReading()[0];
    const song = sync.isPlaying ? { label: "NOW PLAYING", title: sync.title, sub: sync.artist, img: sync.albumImageUrl }
        : sync.lastPlayed ? { label: "LAST PLAYED", title: sync.lastPlayed.title, sub: sync.lastPlayed.artist, img: sync.lastPlayed.albumImageUrl } : null;
    const model = profile.currently?.metalEarth;
    const cards = [
        song && { ...song, color: "#1DB954" },
        book && { label: "NOW READING", title: book.title, sub: book.author, img: book.cover, link: book.link, color: t.cyan, tall: true },
        model && { label: "ON THE DESK", title: model.name, sub: "Metal Earth", img: uboat, link: model.link, color: t.gold, wide: true },
    ].filter(Boolean);
    const bentoStyles = {
        grid: {
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)",
            gridAutoRows: "minmax(180px, auto)",
            gap: "16px",
            maxWidth: 1200,
            margin: "0 auto"
        }
    };


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
                    <p style={{ fontSize: "1rem", lineHeight: 1.7, color: t.textHi, fontWeight: 400, marginBottom: 16 }}>
                        Hi, I'm <span style={{ color: t.accent, fontWeight: 700 }}>Syna</span>. I teach computers to find patterns, then spend an unreasonable amount of time making the result look good.
                    </p>

                    <p style={{ fontSize: "0.95rem", lineHeight: 1.7, color: t.textMute, fontWeight: 400, marginBottom: 16 }}>
                        <span style={{ color: t.cyan }}>Machine learning</span> hooked me because every model is a small mystery. At Micron my clustering pipeline sorts chip failures by root cause, and it runs in production, so the mystery is solved daily.
                    </p>

                    <p style={{ fontSize: "0.95rem", lineHeight: 1.7, color: t.textMute, fontWeight: 400, marginBottom: 18 }}>
                        The guy on my playlist cover is the reason I code at all. Thank you, Codemy.com. Offline I bend tiny metal sheets into <span style={{ color: t.gold }}>Metal Earth</span> models and read a lot. My best thinking happens near the ocean, which is how an orca ended up on this page.
                    </p>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 24 }}>
                        {[["Metal Earth builder", t.gold, -2], ["Bookworm", t.cyan, 1.5], ["Ocean thinker", t.accent, -1], ["Tutor, CS + math", t.magenta, 2]].map(([label, c, r]) => (
                            <span key={label} className="wobble" style={{ ...FONTS.mono, fontSize: ".72rem", letterSpacing: ".08em", padding: "6px 12px", borderRadius: 8, color: c, border: `1.5px dashed ${c}`, rotate: `${r}deg`, textTransform: "uppercase" }}>{label}</span>
                        ))}
                    </div>
                    <a
                        href={resume}
                        download="Syna_Malhan_Resume.pdf"
                        style={{
                            alignSelf: 'flex-start',
                            padding: "12px 24px",
                            background: t.accent,
                            color: t.onAccent,
                            borderRadius: "12px",
                            textDecoration: "none",
                            ...FONTS.mono,
                            fontSize: "0.75rem",
                            letterSpacing: "2px",
                            boxShadow: `0 8px 16px ${t.accent}33`,
                            transition: "transform 0.2s"
                        }}
                    >
                        RESUME
                    </a>
                </BentoBox>

                {/* 2. GALLERY BOX (2x2) */}
                <BentoBox colSpan={2} rowSpan={2} style={{ padding: 0 }}>
                    <SimpleCarousel items={galleryItems} />
                </BentoBox>

                {/* 3. DYNAMIC MUSIC & LYRICS BOX (2x2) */}
                <MusicTile t={t} counts={counts} isMobile={isMobile} sync={sync} />

                {/* STATS BOXES */}
                <BentoBox colSpan={1} rowSpan={1} style={{ justifyContent: 'center', borderLeft: `4px solid ${t.cyan}` }}>
                    <div style={{ ...FONTS.orb, fontWeight: 900, fontSize: "2.5rem", color: t.textHi }}>{counts.p || 0}</div>
                    <div style={{ ...FONTS.mono, fontSize: "0.65rem", letterSpacing: "2px", color: t.textMute, marginTop: 4, textTransform: "uppercase" }}>Projects</div>
                </BentoBox>
                <BentoBox colSpan={1} rowSpan={1} style={{ justifyContent: 'center', borderLeft: `4px solid ${t.accent}` }}>
                    <div style={{ ...FONTS.orb, fontWeight: 900, fontSize: "2.5rem", color: t.textHi }}>{counts.a || 0}</div>
                    <div style={{ ...FONTS.mono, fontSize: "0.65rem", letterSpacing: "2px", color: t.textMute, marginTop: 4, textTransform: "uppercase" }}>iOS Projects</div>
                </BentoBox>
                <BentoBox colSpan={1} rowSpan={1} style={{ justifyContent: 'center', borderLeft: `4px solid ${t.magenta}` }}>
                    <div style={{ ...FONTS.orb, fontWeight: 900, fontSize: "2.5rem", color: t.textHi }}>{counts.m || 0}</div>
                    <div style={{ ...FONTS.mono, fontSize: "0.65rem", letterSpacing: "2px", color: t.textMute, marginTop: 4, textTransform: "uppercase" }}>ML & Vision Projects</div>
                </BentoBox>

                {/* 5. YEARS EXPERIENCE BOX (1x1) */}
                <BentoBox colSpan={1} rowSpan={1} style={{ justifyContent: 'center', borderLeft: `4px solid ${t.gold}` }}>
                    <div style={{ ...FONTS.orb, fontWeight: 900, fontSize: "2.5rem", color: t.textHi }}>{yearsSinceFirstRole()}</div>
                    <div style={{ ...FONTS.mono, fontSize: "0.65rem", letterSpacing: "2px", color: t.textMute, marginTop: 4, textTransform: "uppercase" }}>Years Exp</div>
                </BentoBox>
                {cards.length > 0 && (
                    <div style={{ gridColumn: "1 / -1", display: "grid", gridTemplateColumns: isMobile ? "1fr" : `repeat(${cards.length}, minmax(0, 1fr))`, gap: 16 }}>
                        {cards.map(c => {
                            const Tag = c.link ? "a" : "div";
                            return (
                                <Tag key={c.label} {...(c.link ? { href: c.link, target: "_blank", rel: "noopener noreferrer" } : {})} className="hover-card"
                                    style={{ display: "flex", gap: 16, alignItems: "center", padding: 16, textDecoration: "none", background: t.surface, border: `1px solid ${t.border}`, borderLeft: `4px solid ${c.color}`, borderRadius: 16, color: t.text, minWidth: 0 }}>
                                    <div style={{ flex: "none", width: c.wide ? 130 : c.tall ? 72 : 88, height: c.tall ? 108 : 88, borderRadius: 8, overflow: "hidden", background: c.wide ? "transparent" : t.bg, boxShadow: c.wide ? "none" : "0 6px 14px rgba(0,0,0,.4)" }}>
                                        {c.img && <img src={c.img} alt={`${c.title} cover`} style={{ width: "100%", height: "100%", objectFit: c.wide ? "contain" : "cover", display: "block", filter: c.wide ? "drop-shadow(0 6px 8px rgba(0,0,0,.5))" : undefined }} />}
                                    </div>
                                    <div style={{ minWidth: 0 }}>
                                        <div style={{ ...FONTS.mono, fontSize: ".68rem", letterSpacing: ".14em", color: c.color, marginBottom: 6 }}>{c.label}</div>
                                        <div style={{ ...FONTS.inter, fontWeight: 700, fontSize: "1.05rem", color: t.textHi, lineHeight: 1.25 }}>{c.title}</div>
                                        <div style={{ ...FONTS.inter, fontSize: ".9rem", color: t.textMute, marginTop: 2 }}>{c.sub}</div>
                                    </div>
                                </Tag>
                            );
                        })}
                    </div>
                )}
                <Suggest />
            </div>
        </section>
    );
});



export default About;
