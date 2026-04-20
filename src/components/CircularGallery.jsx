import React, { useRef, useState, useEffect } from "react";
import { useTheme } from "../theme/ThemeContext";

import img1 from "../assets/profile/1.jpg";
import img2 from "../assets/profile/2.jpg";
import img3 from "../assets/profile/3.jpg";
import img4 from "../assets/profile/4.jpg";
import img5 from "../assets/profile/5.jpg";
import img6 from "../assets/profile/6.jpg";
import img7 from "../assets/profile/7.jpg";

export default function CircularGallery({
    radius = 240,
    itemWidth = 200,
    itemHeight = 200,
}) {
    const { theme: t } = useTheme();

    const rotationRef = useRef(0);
    const targetRotationRef = useRef(0);
    const lastRef = useRef(0);
    const velocityRef = useRef(0);
    const isDraggingRef = useRef(false);
    const startXRef = useRef(0);

    const [renderValue, setRenderValue] = useState(0);

    const images = [img1, img2, img3, img4, img5, img6, img7];
    const length = images.length;

    // 🌪️ animation loop (MOMENTUM + AUTO-ROTATION)
    useEffect(() => {
        let raf;

        const animate = () => {
            // 🔄 Auto-rotation (very slow)
            if (!isDraggingRef.current) {
                targetRotationRef.current += 0.0015;
            }

            // 🌊 Damping / Inertia (Smooth follow)
            rotationRef.current += (targetRotationRef.current - rotationRef.current) * 0.05;

            velocityRef.current = rotationRef.current - lastRef.current;
            lastRef.current = rotationRef.current;

            setRenderValue(rotationRef.current);

            raf = requestAnimationFrame(animate);
        };

        animate();
        return () => cancelAnimationFrame(raf);
    }, []);

    const handlePointerDown = (e) => {
        isDraggingRef.current = true;
        startXRef.current = e.clientX;
    };

    const handlePointerMove = (e) => {
        if (!isDraggingRef.current) return;
        const dx = e.clientX - startXRef.current;
        targetRotationRef.current += dx * 0.003; // Drag sensitivity
        startXRef.current = e.clientX;
    };

    const handlePointerUp = () => {
        isDraggingRef.current = false;
    };

    return (
        <div
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end", 
                overflow: "hidden",
                userSelect: "none",
                cursor: isDraggingRef.current ? "grabbing" : "grab"
            }}
        >
            {/* 🧭 LOWERED CENTER CONTAINER */}
            <div
                style={{
                    position: "relative",
                    width: itemWidth,
                    height: itemHeight,
                    transform: "translateY(120px)",
                }}
            >
                {images.map((src, i) => {
                    const angle = (360 / length) * i + renderValue * 50;

                    const speed = velocityRef.current;

                    const wave = Math.sin(renderValue * 2 + i * 0.6) * 10;
                    const flowOffset = speed * 25;
                    const scale = 1 - Math.min(Math.abs(speed) * 0.015, 0.12);

                    return (
                        <div
                            key={i}
                            style={{
                                position: "absolute",
                                width: itemWidth,
                                height: itemHeight,
                                left: 0,
                                top: 0,
                                transform: `
                                    rotateZ(${angle}deg)
                                    translateY(${-radius}px)
                                    translateX(${wave + flowOffset}px)
                                    scale(${scale})
                                `,
                                background: t.cardBg,
                                border: `2px solid ${t.accent}66`,
                                padding: "8px",
                                borderRadius: "16px",
                                boxShadow: `
                                    0 15px 35px rgba(0,0,0,0.12),
                                    inset 0 0 10px ${t.accent}33
                                `,
                                transition: "transform 0.08s linear",
                            }}
                        >
                            <img
                                src={src}
                                alt={`profile-${i}`}
                                draggable={false}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    borderRadius: "12px",
                                    filter:
                                        t.name === "dark"
                                            ? "grayscale(30%) contrast(1.1)"
                                            : "sepia(10%) grayscale(10%)",
                                }}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}