import { forwardRef } from "react";
import { useReading } from "../hooks/useReading";
import uboat from "../assets/metalearth.png";
import { profile } from "../data/portfolio";
import { motion } from "framer-motion";
import { useTheme } from "../theme/ThemeContext";
import { FONTS } from "../components/styles";
import { useIsMobile } from "../hooks/useMediaQuery";
import H2 from "../components/ui/H2";
import SimpleCarousel from "../components/SimpleCarousel";
import Suggest from "./Suggest";

import img1 from "../assets/profile/1.jpg";
import img2 from "../assets/profile/2.jpg";
import img3 from "../assets/profile/3.jpg";
import img4 from "../assets/profile/4.jpg";
import img5 from "../assets/profile/5.jpg";
import img6 from "../assets/profile/6.jpg";
import img7 from "../assets/profile/7.jpg";


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

// Just the playlist: no live "now playing" sync.
const Playlist = ({ t, isMobile }) => (
    <div className="hover-card" style={{ borderRadius: 24, overflow: "hidden", background: "#000", gridColumn: isMobile ? "span 1" : "span 4", display: "flex" }}>
        <iframe
            title="Spotify playlist player"
            style={{ borderRadius: 24, border: "none", width: "100%", height: "100%", minHeight: 352, height: 352 }}
            src={`https://open.spotify.com/embed/playlist/0Uggezps9kTbnOpFB7ovff?utm_source=generator&theme=${t.name === "dark" ? "0" : "1"}`}
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
        />
    </div>
);

// The story, in the order I'd tell it. Each block gets its own colour.
const STORY = [
    { key: "cyan", title: "WHY MACHINE LEARNING", text: "I love machine learning because it can make sense of messy things. Data often looks like noise at first, but a good model finds the pattern hidden inside it, and that pattern can help predict what comes next. What I keep chasing is the moment when something that made no sense finally starts to." },
    { key: "accent", title: "THE OCEAN", text: "I love the ocean. Someday I want to swim with whales and see belugas and orcas in the wild. The one problem is that I hate the feeling of sand on my feet, so I am still working out how to love the ocean without the beach." },
    { key: "gold", title: "METAL EARTH", text: "I build Metal Earth models. They prick your fingers, and you twist and pinch tiny wires until a flat sheet turns into something real. It feels like playing as much as building, and I like how it leaves me feeling, and having the finished model on my desk afterwards." },
    { key: "magenta", title: "BOOKS", text: "I have always read fiction. Lately I have been trying to get into classics and historical books, to grow my brain a bit." },
];

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

const About = forwardRef(function About({ }, ref) {
    const { theme: t } = useTheme();
    const isMobile = useIsMobile();
    const book = useReading()[0];
    const model = profile.currently?.metalEarth;
    const cards = [
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
                {/* 1. WHO I AM */}
                <BentoBox colSpan={4} style={{ justifyContent: "center" }}>
                    <H2 style={{ fontSize: isMobile ? "2.5rem" : "3.5rem", marginBottom: 20 }}>ABOUT ME</H2>
                    <p style={{ fontSize: "1.1rem", lineHeight: 1.75, color: t.textHi, marginBottom: 16, maxWidth: "75ch" }}>
                        Hi, I'm <span style={{ color: t.accent, fontWeight: 700 }}>Syna</span>. I'm a computer science student at Arizona State with a data science minor, and I build machine learning systems and iOS apps. At Micron that meant a clustering pipeline that groups chip failures by root cause. On my own it is things like an iPhone app that learns a new object from a single photo.
                    </p>
                    <p style={{ fontSize: "1.05rem", lineHeight: 1.75, color: t.textMute, maxWidth: "75ch" }}>
                        I have been doing this for a long time. As a kid I spent my summers at robotics and coding camps, and not because anyone made me. I did it because it was fun. I learned to code from Codemy.com tutorials, and I never really stopped. The camps turned into projects, then internships and research, and I still get the same feeling when something I built finally works.
                    </p>
                </BentoBox>

                {STORY.map(x => (
                    <BentoBox key={x.title} colSpan={2} style={{ background: `${t[x.key]}14`, border: `1px solid ${t[x.key]}55`, borderTop: `4px solid ${t[x.key]}`, justifyContent: "center" }}>
                        <div style={{ ...FONTS.mono, fontSize: "1rem", letterSpacing: ".14em", color: t[x.key], marginBottom: 12 }}>{x.title}</div>
                        <p style={{ fontSize: "1.02rem", lineHeight: 1.7, color: t.text }}>{x.text}</p>
                    </BentoBox>
                ))}

                {/* 2. GALLERY BOX (2x2) */}
                <BentoBox colSpan={2} rowSpan={2} style={{ padding: 0 }}>
                    <SimpleCarousel items={galleryItems} />
                </BentoBox>

                {cards.length > 0 && (
                    <div style={{ gridColumn: isMobile ? "1 / -1" : "span 2", gridRow: isMobile ? "auto" : "span 2", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gridAutoRows: "1fr", gap: 16 }}>
                        {cards.map(c => {
                            const Tag = c.link ? "a" : "div";
                            return (
                                <Tag key={c.label} {...(c.link ? { href: c.link, target: "_blank", rel: "noopener noreferrer" } : {})} className="hover-card"
                                    style={{ display: "flex", flexDirection: isMobile ? "row" : "column", gap: 16, alignItems: "center", justifyContent: isMobile ? "flex-start" : "center", textAlign: isMobile ? "left" : "center", padding: 16, textDecoration: "none", background: `${c.color}14`, border: `1px solid ${c.color}55`, borderTop: `4px solid ${c.color}`, borderRadius: 16, color: t.text, minWidth: 0 }}>
                                    <div style={{ flex: "none", width: c.wide ? (isMobile ? 130 : 170) : c.tall ? (isMobile ? 72 : 110) : 88, height: c.tall ? (isMobile ? 108 : 165) : (isMobile ? 88 : 110), borderRadius: 8, overflow: "hidden", background: c.wide ? "transparent" : t.bg, boxShadow: c.wide ? "none" : "0 6px 14px rgba(0,0,0,.4)" }}>
                                        {c.img && <img src={c.img} alt={`${c.title} cover`} style={{ width: "100%", height: "100%", objectFit: c.wide ? "contain" : "cover", display: "block", filter: c.wide ? "drop-shadow(0 6px 8px rgba(0,0,0,.5))" : undefined }} />}
                                    </div>
                                    <div style={{ minWidth: 0 }}>
                                        <div style={{ ...FONTS.mono, fontSize: "0.85rem", letterSpacing: ".14em", color: c.color, marginBottom: 6 }}>{c.label}</div>
                                        <div style={{ ...FONTS.inter, fontWeight: 700, fontSize: "1.05rem", color: t.textHi, lineHeight: 1.25 }}>{c.title}</div>
                                        <div style={{ ...FONTS.inter, fontSize: ".9rem", color: t.textMute, marginTop: 2 }}>{c.sub}</div>
                                    </div>
                                </Tag>
                            );
                        })}
                    </div>
                )}
                {/* 3. PLAYLIST (full width, under the gallery and tiles) */}
                <Playlist t={t} isMobile={isMobile} />

                <Suggest />
            </div>
        </section>
    );
});



export default About;
