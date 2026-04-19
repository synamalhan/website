import React, { useRef, useState, useEffect } from "react";
import { useTheme } from "../theme/ThemeContext";

// Import images directly
import img1 from "../assets/profile/1.jpg";
import img2 from "../assets/profile/2.jpg";
import img3 from "../assets/profile/3.jpg";
import img4 from "../assets/profile/4.jpg";
import img5 from "../assets/profile/5.jpg";
import img6 from "../assets/profile/6.jpg";
import img7 from "../assets/profile/7.jpg";

export default function CircularGallery({
    radius = 240,
    itemWidth = 140,
    itemHeight = 180,
}) {
    const { theme: t } = useTheme();

    // 🎯 physics refs (NO rerender lag)
    const targetRef = useRef(0);
    const currentRef = useRef(0);
    const lastRef = useRef(0);
    const velocityRef = useRef(0);

    const [renderValue, setRenderValue] = useState(0);

    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);

    const images = [img1, img2, img3, img4, img5, img6, img7];

    const length = images.length;

    // 🌊 animation loop (inertia + velocity like OGL)
    useEffect(() => {
        let raf;

        const animate = () => {
            // smooth follow (critical for "flow")
            currentRef.current += (targetRef.current - currentRef.current) * 0.08;

            // velocity (used for distortion feel)
            velocityRef.current = currentRef.current - lastRef.current;
            lastRef.current = currentRef.current;

            setRenderValue(currentRef.current);

            raf = requestAnimationFrame(animate);
        };

        animate();
        return () => cancelAnimationFrame(raf);
    }, []);

    // 🖱️ drag interaction (pushes target, not rotation directly)
    const handlePointerDown = (e) => {
        setIsDragging(true);
        setStartX(e.clientX);
    };

    const handlePointerMove = (e) => {
        if (!isDragging) return;

        const x = e.clientX;
        const diff = x - startX;

        targetRef.current += diff * 0.8; // momentum injection
        setStartX(x);
    };

    const handlePointerUp = () => {
        setIsDragging(false);
    };

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                cursor: isDragging ? "grabbing" : "grab",
                userSelect: "none",
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
        >
            <div
                style={{
                    position: "relative",
                    width: itemWidth,
                    height: itemHeight,
                }}
            >
                {images.map((src, i) => {
                    const angle = (360 / length) * i;

                    // 🌊 FLOW EFFECT CORE
                    const speed = velocityRef.current;

                    // wave distortion (OGL-like motion field)
                    const wave =
                        Math.sin(renderValue * 0.01 + i * 0.6) * 12;

                    // directional smear (drag feel)
                    const flowOffset = speed * 25;

                    // subtle depth scaling
                    const scale =
                        1 - Math.min(Math.abs(speed) * 0.01, 0.12);

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
                                    translateY(${-radius - 20}px)
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

                                transition: isDragging
                                    ? "none"
                                    : "transform 0.08s linear",
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
                                            : "sepia(15%) grayscale(10%)",
                                }}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
