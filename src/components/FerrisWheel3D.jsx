import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Environment, Float } from "@react-three/drei";
import * as THREE from "three";
import { GONDOLA_FACTS } from "../data/gondolaFacts";

/* ── Metallic material presets ── */
function useMetal(color = "#8a9bb0", roughness = 0.25, metalness = 0.92) {
    return useMemo(() => new THREE.MeshStandardMaterial({
        color, roughness, metalness, side: THREE.DoubleSide,
    }), [color, roughness, metalness]);
}

/* ── Single spoke beam ── */
function Spoke({ angle, innerR, outerR, progress, index, total }) {
    const mat = useMetal("#7a8a9e", 0.3, 0.88);
    const visible = progress > (index / total) * 0.4 + 0.15;
    if (!visible) return null;

    const length = outerR - innerR;
    const midR = (innerR + outerR) / 2;

    return (
        <group rotation={[0, 0, angle]}>
            <mesh position={[midR, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={mat}>
                <cylinderGeometry args={[0.04, 0.04, length, 6]} />
            </mesh>
        </group>
    );
}

/* ── Single gondola pod ── */
function Gondola({ angle, radius, index, progress, onHover, onClick, isHovered, rotation }) {
    const ref = useRef();
    const total = GONDOLA_FACTS.length;
    const visible = progress > 0.5 + (index / total) * 0.2;

    const x = Math.cos(angle + rotation) * radius;
    const y = Math.sin(angle + rotation) * radius;

    const hue = (index / total) * 360;
    const color = `hsl(${hue}, 55%, 50%)`;
    const mat = useMemo(() => new THREE.MeshStandardMaterial({
        color, roughness: 0.35, metalness: 0.7,
        emissive: isHovered ? color : "#000000",
        emissiveIntensity: isHovered ? 0.4 : 0,
    }), [color, isHovered]);

    if (!visible) return null;

    return (
        <group position={[x, y, 0]} ref={ref}>
            {/* Hanging arm */}
            <mesh position={[0, 0.15, 0]}>
                <cylinderGeometry args={[0.02, 0.02, 0.3, 4]} />
                <meshStandardMaterial color="#6a7a8e" metalness={0.9} roughness={0.3} />
            </mesh>

            {/* Pod body */}
            <mesh
                position={[0, -0.1, 0]}
                material={mat}
                onPointerOver={(e) => { e.stopPropagation(); onHover(index); }}
                onPointerOut={(e) => { e.stopPropagation(); onHover(null); }}
                onClick={(e) => { e.stopPropagation(); onClick(index); }}
            >
                <boxGeometry args={[0.28, 0.32, 0.22]} />
            </mesh>

            {/* Window */}
            <mesh position={[0, -0.02, 0.115]}>
                <planeGeometry args={[0.18, 0.12]} />
                <meshStandardMaterial color="#22d3ee" transparent opacity={0.5} emissive="#22d3ee" emissiveIntensity={0.3} />
            </mesh>

            {/* Icon label */}
            <Html position={[0, -0.1, 0.2]} center distanceFactor={6} style={{ pointerEvents: "none" }}>
                <div style={{ fontSize: "14px", filter: "drop-shadow(0 0 4px rgba(0,0,0,0.5))", userSelect: "none" }}>
                    {GONDOLA_FACTS[index]?.icon}
                </div>
            </Html>

            {/* Hover glow ring */}
            {isHovered && (
                <mesh position={[0, -0.1, 0]}>
                    <torusGeometry args={[0.25, 0.015, 8, 32]} />
                    <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} transparent opacity={0.6} />
                </mesh>
            )}
        </group>
    );
}

/* ── Main Ferris Wheel scene ── */
function FerrisWheelScene({ progress, onGondolaHover, onGondolaClick, hoveredGondola }) {
    const wheelRef = useRef();
    const rotationRef = useRef(0);

    const OUTER_R = 3.2;
    const INNER_R = 2.5;
    const HUB_R = 0.45;
    const NUM = 16;

    const rimMat = useMetal("#8a9aae", 0.2, 0.95);
    const innerRimMat = useMetal("#6a7a8e", 0.28, 0.9);
    const hubMat = useMetal("#a0b0c4", 0.15, 0.95);
    const legMat = useMetal("#5a6a7e", 0.25, 0.9);
    const baseMat = useMetal("#4a5a6e", 0.3, 0.88);

    useFrame((_, delta) => {
        rotationRef.current += delta * 0.15;
        if (wheelRef.current) {
            wheelRef.current.rotation.z = rotationRef.current;
        }
    });

    const easeOut = (t) => 1 - Math.pow(1 - t, 3);

    // Assembly piece visibility with fly-in
    const pieceAnim = (stage, totalStages = 12) => {
        const raw = Math.max(0, Math.min(1, progress * totalStages - stage));
        const opacity = Math.min(1, raw * 3);
        const offset = (1 - easeOut(raw)) * 8;
        return { visible: progress * totalStages > stage, opacity, offset };
    };

    const p0 = pieceAnim(0);  // base
    const p1 = pieceAnim(1);  // legs
    const p2 = pieceAnim(2);  // hub
    const p3 = pieceAnim(3);  // inner spokes
    const p4 = pieceAnim(4);  // outer spokes
    const p5 = pieceAnim(5);  // inner rim
    const p6 = pieceAnim(6);  // outer rim
    const p8 = pieceAnim(8);  // cross bracing
    const p10 = pieceAnim(10); // decorative
    const p11 = pieceAnim(11); // lights

    return (
        <>
            {/* Lighting */}
            <ambientLight intensity={0.3} />
            <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow color="#e8f0ff" />
            <directionalLight position={[-4, 3, -3]} intensity={0.4} color="#8b9aff" />
            <pointLight position={[0, 0, 4]} intensity={0.8} color="#22d3ee" distance={12} />
            <pointLight position={[0, -4, 2]} intensity={0.5} color="#8b5cf6" distance={10} />

            {/* Base platform */}
            {p0.visible && (
                <group position={[0, -OUTER_R - 1.8 - p0.offset, 0]}>
                    <mesh material={baseMat}>
                        <boxGeometry args={[4, 0.15, 1.2]} />
                    </mesh>
                    <mesh position={[0, 0.1, 0]} material={rimMat}>
                        <boxGeometry args={[3.6, 0.06, 1]} />
                    </mesh>
                    {/* Rivets */}
                    {[-1.5, -0.75, 0, 0.75, 1.5].map((rx, i) => (
                        <mesh key={i} position={[rx, 0.14, 0.45]}>
                            <sphereGeometry args={[0.03, 8, 8]} />
                            <meshStandardMaterial color="#b0c0d0" metalness={0.95} roughness={0.2} />
                        </mesh>
                    ))}
                </group>
            )}

            {/* Support legs — A-frame */}
            {p1.visible && (
                <group position={[0, -p1.offset * 0.5, 0]}>
                    {[-1, 1].map((side) => (
                        <group key={side}>
                            {/* Main leg */}
                            <mesh
                                position={[side * 0.8, -OUTER_R / 2 - 0.5, 0]}
                                rotation={[0, 0, side * -0.18]}
                                material={legMat}
                            >
                                <boxGeometry args={[0.18, OUTER_R + 1.4, 0.18]} />
                            </mesh>
                            {/* Cross brace */}
                            <mesh
                                position={[side * 0.6, -OUTER_R / 2 - 0.8, 0]}
                                rotation={[0, 0, side * 0.5]}
                                material={innerRimMat}
                            >
                                <boxGeometry args={[0.06, 1.6, 0.08]} />
                            </mesh>
                        </group>
                    ))}
                    {/* Top crossbar */}
                    <mesh position={[0, 0.35, 0]} material={rimMat}>
                        <boxGeometry args={[1.2, 0.1, 0.14]} />
                    </mesh>
                </group>
            )}

            {/* Rotating wheel group */}
            <group ref={wheelRef}>
                {/* Central hub */}
                {p2.visible && (
                    <group position={[0, 0, p2.offset * 0.3]}>
                        <mesh material={hubMat}>
                            <cylinderGeometry args={[HUB_R, HUB_R, 0.3, 32]} rotation={[Math.PI / 2, 0, 0]} />
                        </mesh>
                        <mesh rotation={[Math.PI / 2, 0, 0]}>
                            <torusGeometry args={[HUB_R + 0.05, 0.04, 8, 32]} />
                            <meshStandardMaterial color="#90a0b4" metalness={0.95} roughness={0.15} />
                        </mesh>
                        {/* Hub bolts */}
                        {Array.from({ length: 8 }).map((_, i) => {
                            const a = (i / 8) * Math.PI * 2;
                            return (
                                <mesh key={i} position={[Math.cos(a) * (HUB_R - 0.08), Math.sin(a) * (HUB_R - 0.08), 0.16]}>
                                    <sphereGeometry args={[0.035, 8, 8]} />
                                    <meshStandardMaterial color="#c0d0e0" metalness={0.95} roughness={0.1} />
                                </mesh>
                            );
                        })}
                        {/* Centre cap */}
                        <mesh position={[0, 0, 0.18]}>
                            <sphereGeometry args={[0.12, 16, 16]} />
                            <meshStandardMaterial color="#d0e0f0" metalness={0.98} roughness={0.08} emissive="#22d3ee" emissiveIntensity={0.15} />
                        </mesh>
                    </group>
                )}

                {/* Inner spokes */}
                {p3.visible && Array.from({ length: NUM }).map((_, i) => (
                    <Spoke key={`inner-${i}`} angle={(i / NUM) * Math.PI * 2} innerR={HUB_R} outerR={INNER_R} progress={progress} index={i} total={NUM} />
                ))}

                {/* Outer spokes */}
                {p4.visible && Array.from({ length: NUM }).map((_, i) => (
                    <Spoke key={`outer-${i}`} angle={(i / NUM) * Math.PI * 2} innerR={INNER_R} outerR={OUTER_R - 0.1} progress={progress} index={i} total={NUM} />
                ))}

                {/* Inner structural ring */}
                {p5.visible && (
                    <mesh rotation={[Math.PI / 2, 0, 0]}>
                        <torusGeometry args={[INNER_R, 0.06, 8, 64]} />
                        <meshStandardMaterial color="#7a8a9e" metalness={0.9} roughness={0.25} />
                    </mesh>
                )}

                {/* Outer rim */}
                {p6.visible && (
                    <group>
                        <mesh rotation={[Math.PI / 2, 0, 0]} material={rimMat}>
                            <torusGeometry args={[OUTER_R, 0.1, 12, 64]} />
                        </mesh>
                        {/* Outer edge ring */}
                        <mesh rotation={[Math.PI / 2, 0, 0]}>
                            <torusGeometry args={[OUTER_R + 0.12, 0.025, 8, 64]} />
                            <meshStandardMaterial color="#6a7a8e" metalness={0.92} roughness={0.2} />
                        </mesh>
                        {/* Rim rivets */}
                        {Array.from({ length: 32 }).map((_, i) => {
                            const a = (i / 32) * Math.PI * 2;
                            return (
                                <mesh key={i} position={[Math.cos(a) * OUTER_R, Math.sin(a) * OUTER_R, 0.12]}>
                                    <sphereGeometry args={[0.025, 6, 6]} />
                                    <meshStandardMaterial color="#a0b0c4" metalness={0.95} roughness={0.15} />
                                </mesh>
                            );
                        })}
                    </group>
                )}

                {/* Cross bracing */}
                {p8.visible && Array.from({ length: NUM }).map((_, i) => {
                    const a1 = (i / NUM) * Math.PI * 2;
                    const a2 = ((i + 1) / NUM) * Math.PI * 2;
                    const r1 = INNER_R * 0.6;
                    const r2 = (INNER_R + OUTER_R) / 2;
                    const x1 = Math.cos(a1) * r1, y1 = Math.sin(a1) * r1;
                    const x2 = Math.cos(a2) * r2, y2 = Math.sin(a2) * r2;
                    const dx = x2 - x1, dy = y2 - y1;
                    const len = Math.sqrt(dx * dx + dy * dy);
                    const angle = Math.atan2(dy, dx);
                    return (
                        <mesh key={i} position={[(x1 + x2) / 2, (y1 + y2) / 2, 0]} rotation={[0, 0, angle]}>
                            <boxGeometry args={[len, 0.025, 0.025]} />
                            <meshStandardMaterial color="#5a6a7e" metalness={0.85} roughness={0.35} transparent opacity={0.7} />
                        </mesh>
                    );
                })}
            </group>

            {/* Gondolas — NOT part of wheel rotation group, they counter-rotate to hang down */}
            {Array.from({ length: NUM }).map((_, i) => (
                <Gondola
                    key={i}
                    index={i}
                    angle={(i / NUM) * Math.PI * 2}
                    radius={OUTER_R + 0.25}
                    progress={progress}
                    rotation={rotationRef.current}
                    onHover={onGondolaHover}
                    onClick={onGondolaClick}
                    isHovered={hoveredGondola === i}
                />
            ))}

            {/* Decorative lights along rim */}
            {p11.visible && Array.from({ length: 48 }).map((_, i) => {
                const a = (i / 48) * Math.PI * 2 + rotationRef.current;
                const hue = (i / 48) * 360;
                return (
                    <mesh key={i} position={[Math.cos(a) * (OUTER_R + 0.02), Math.sin(a) * (OUTER_R + 0.02), 0.14]}>
                        <sphereGeometry args={[0.025, 6, 6]} />
                        <meshStandardMaterial
                            color={`hsl(${hue}, 80%, 65%)`}
                            emissive={`hsl(${hue}, 80%, 65%)`}
                            emissiveIntensity={0.8 + 0.4 * Math.sin(Date.now() * 0.005 + i)}
                            transparent
                            opacity={0.9}
                        />
                    </mesh>
                );
            })}
        </>
    );
}

/* ── Exported wrapper ── */
export default function FerrisWheel3D({ progress, t, onGondolaHover, onGondolaClick, hoveredGondola }) {
    return (
        <div style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
            <Canvas
                camera={{ position: [0, 0, 9], fov: 50 }}
                gl={{ antialias: true, alpha: true }}
                style={{ background: "transparent" }}
                dpr={[1, 2]}
            >
                <FerrisWheelScene
                    progress={progress}
                    onGondolaHover={onGondolaHover}
                    onGondolaClick={onGondolaClick}
                    hoveredGondola={hoveredGondola}
                />
            </Canvas>
        </div>
    );
}
