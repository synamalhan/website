import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function OceanBg({ t }) {
    const { scrollY } = useScroll();

    // Generate random splotches only once on mount
    const [splotches] = useState(() => {
        const colors = [t.accent, t.cyan, t.magenta, t.gold];
        const items = [];
        for (let i = 0; i < 15; i++) {
            items.push({
                x: Math.random() * 100, // percentage
                y: Math.random() * 5000, // absolute px spread out vertically
                size: Math.random() * 400 + 300,
                color: colors[Math.floor(Math.random() * colors.length)],
                opacity: Math.random() * 0.15 + 0.1,
                speed: Math.random() * 0.6 + 0.2 // parallax speed
            });
        }
        return items;
    });

    return (
        <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", background: t.bg, overflow: "hidden" }}>
            {/* Splotches Container */}
            <div style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
                {splotches.map((s, i) => {
                    const y = useTransform(scrollY, val => -val * s.speed);
                    return (
                        <motion.div
                            key={i}
                            style={{
                                position: "absolute",
                                left: `${s.x}%`,
                                top: `${s.y}px`,
                                width: s.size,
                                height: s.size,
                                borderRadius: "50%",
                                background: s.color,
                                opacity: s.opacity,
                                filter: "blur(120px)",
                                transform: "translate(-50%, -50%)",
                                y
                            }}
                        />
                    );
                })}
            </div>
            
            {/* Noise Overlay */}
            <div style={{ position: "absolute", inset: 0, backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.06%22/%3E%3C/svg%3E")', backgroundSize: '200px' }}></div>
        </div>
    );
}
