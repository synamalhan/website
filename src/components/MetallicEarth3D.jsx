import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Environment, Float } from "@react-three/drei";
import * as THREE from "three";
import { EARTH_FACTS } from "../data/earthFacts";

/* ── Metallic material presets ── */
function useMetal(color = "#8a9bb0", roughness = 0.25, metalness = 0.92) {
    return useMemo(() => new THREE.MeshStandardMaterial({
        color, roughness, metalness, side: THREE.DoubleSide,
    }), [color, roughness, metalness]);
}

/* ── Single Data Node ── */
function Node({ id, position, index, total, progress, onHover, onClick, isHovered }) {
    const ref = useRef();
    const visible = progress > 0.5 + (index / total) * 0.2;

    const hue = (index / total) * 360;
    const color = `hsl(${hue}, 55%, 50%)`;
    const mat = useMemo(() => new THREE.MeshStandardMaterial({
        color, roughness: 0.35, metalness: 0.7,
        emissive: isHovered ? color : "#000000",
        emissiveIntensity: isHovered ? 0.4 : 0,
    }), [color, isHovered]);

    if (!visible) return null;

    return (
        <group position={position} ref={ref}>
            <mesh
                material={mat}
                onPointerOver={(e) => { e.stopPropagation(); onHover(index); }}
                onPointerOut={(e) => { e.stopPropagation(); onHover(null); }}
                onClick={(e) => { e.stopPropagation(); onClick(index); }}
            >
                <boxGeometry args={[0.2, 0.2, 0.2]} />
            </mesh>

            {/* Window */}
            <mesh position={[0, 0, 0.101]}>
                <planeGeometry args={[0.1, 0.1]} />
                <meshStandardMaterial color="#22d3ee" transparent opacity={0.5} emissive="#22d3ee" emissiveIntensity={0.3} />
            </mesh>

            {/* Icon label */}
            <Html position={[0, 0, 0.2]} center distanceFactor={6} style={{ pointerEvents: "none" }} zIndexRange={[100, 0]}>
                <div style={{ fontSize: "14px", filter: "drop-shadow(0 0 4px rgba(0,0,0,0.5))", userSelect: "none" }}>
                    {EARTH_FACTS[index]?.icon}
                </div>
            </Html>

            {/* Hover glow ring */}
            {isHovered && (
                <mesh position={[0, 0, 0]}>
                    <torusGeometry args={[0.3, 0.02, 8, 32]} />
                    <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} transparent opacity={0.6} />
                </mesh>
            )}
        </group>
    );
}

/* ── Main Metallic Earth scene ── */
function EarthScene({ progress, onNodeHover, onNodeClick, hoveredNode }) {
    const groupRef = useRef();
    const earthRef = useRef();
    const rotationRef = useRef(0);

    const R = 3.0; // Globe radius

    const baseMat = useMetal("#4a5a6e", 0.3, 0.88);
    const mountMat = useMetal("#5a6a7e", 0.25, 0.9);
    const ringMat = useMetal("#8a9aae", 0.2, 0.95);
    const ribMat = useMetal("#6a7a8e", 0.28, 0.9);
    const coreMat = useMetal("#a0b0c4", 0.15, 0.95);
    const orbitMat = useMetal("#b0c0d0", 0.3, 0.8);
    const oceanicMat = useMetal("#203040", 0.5, 0.8);

    useFrame((_, delta) => {
        rotationRef.current += delta * 0.15;
        if (earthRef.current) {
            earthRef.current.rotation.y = rotationRef.current;
        }
        if (groupRef.current) {
            groupRef.current.rotation.y = rotationRef.current * 0.5; // satellites orbit
        }
    });

    const easeOut = (t) => 1 - Math.pow(1 - t, 3);

    const pieceAnim = (stage, totalStages = 12) => {
        const raw = Math.max(0, Math.min(1, progress * totalStages - stage));
        const opacity = Math.min(1, raw * 3);
        const offset = (1 - easeOut(raw)) * 8;
        return { visible: progress * totalStages > stage, opacity, offset };
    };

    const p0 = pieceAnim(0);  // BASE STAND
    const p1 = pieceAnim(1);  // AXIAL TILT MOUNT
    const p2 = pieceAnim(2);  // EQUATORIAL RING
    const p3 = pieceAnim(3);  // PRIME MERIDIAN
    const p4 = pieceAnim(4);  // LATITUDINAL BANDS
    const p5 = pieceAnim(5);  // LONGITUDINAL RIBS
    const p6 = pieceAnim(6);  // INNER CORE
    const p7 = pieceAnim(7);  // CONTINENTAL PLATES
    const p8 = pieceAnim(8);  // OCEANIC GRID
    const p9 = pieceAnim(9);  // DATA NODES
    const p10 = pieceAnim(10); // ORBITAL TRACKS
    const p11 = pieceAnim(11); // SATELLITE ARRAY

    const getNodes = useMemo(() => {
        const nodes = [];
        const n = EARTH_FACTS.length;
        const phi = Math.PI * (3 - Math.sqrt(5));
        for (let i = 0; i < n; i++) {
            const y = 1 - (i / (n - 1)) * 2;
            const radius = Math.sqrt(1 - y * y);
            const theta = phi * i;
            const x = Math.cos(theta) * radius;
            const z = Math.sin(theta) * radius;
            nodes.push(new THREE.Vector3(x * (R + 0.1), y * (R + 0.1), z * (R + 0.1)));
        }
        return nodes;
    }, [R]);

    return (
        <>
            <ambientLight intensity={0.8} />
            <directionalLight position={[5, 8, 5]} intensity={2.2} castShadow color="#ffffff" />
            <directionalLight position={[-4, 3, -3]} intensity={1.2} color="#8b9aff" />
            <pointLight position={[0, 0, 4]} intensity={1.5} color="#22d3ee" distance={12} />
            <pointLight position={[0, -4, 2]} intensity={1.2} color="#8b5cf6" distance={10} />

            <group scale={0.75} position={[0, -0.6, 0]}>
                {/* BASE STAND */}
                {p0.visible && (
                    <group position={[0, -R - 1.5 - p0.offset, 0]}>
                        <mesh material={baseMat}>
                            <cylinderGeometry args={[2, 2.5, 0.4, 32]} />
                        </mesh>
                        <mesh position={[0, 0.3, 0]} material={ringMat}>
                            <cylinderGeometry args={[1.8, 2, 0.2, 32]} />
                        </mesh>
                    </group>
                )}

                {/* AXIAL TILT MOUNT */}
                {p1.visible && (
                    <group position={[0, -p1.offset * 0.5, 0]}>
                        <mesh position={[0, -R - 0.5, 0]} material={mountMat}>
                            <cylinderGeometry args={[0.3, 0.3, 1.6, 16]} />
                        </mesh>
                        <mesh rotation={[0, 0, Math.PI / 8]} material={mountMat}>
                            <torusGeometry args={[R + 0.6, 0.15, 16, 64, Math.PI]} />
                        </mesh>
                        {/* Poles */}
                        <mesh position={[Math.sin(-Math.PI / 8) * (R + 0.6), Math.cos(-Math.PI / 8) * (R + 0.6), 0]} rotation={[0, 0, -Math.PI / 8]} material={coreMat}>
                            <cylinderGeometry args={[0.1, 0.1, 0.4, 8]} />
                        </mesh>
                        <mesh position={[Math.sin(Math.PI - Math.PI / 8) * (R + 0.6), Math.cos(Math.PI - Math.PI / 8) * (R + 0.6), 0]} rotation={[0, 0, Math.PI - Math.PI / 8]} material={coreMat}>
                            <cylinderGeometry args={[0.1, 0.1, 0.4, 8]} />
                        </mesh>
                    </group>
                )}

                {/* Rotating Earth Body */}
                <group ref={earthRef} rotation={[0, 0, Math.PI / 8]}>

                    {/* INNER CORE */}
                    {p6.visible && (
                        <mesh material={coreMat} scale={[1 - p6.offset, 1 - p6.offset, 1 - p6.offset]}>
                            <sphereGeometry args={[R * 0.3, 32, 32]} />
                        </mesh>
                    )}

                    {/* EQUATORIAL RING */}
                    {p2.visible && (
                        <mesh rotation={[Math.PI / 2, 0, 0]} material={ringMat} scale={[1 + p2.offset, 1 + p2.offset, 1 + p2.offset]}>
                            <torusGeometry args={[R, 0.08, 16, 64]} />
                        </mesh>
                    )}

                    {/* PRIME MERIDIAN */}
                    {p3.visible && (
                        <mesh material={ringMat} scale={[1 + p3.offset, 1 + p3.offset, 1 + p3.offset]}>
                            <torusGeometry args={[R, 0.08, 16, 64]} />
                        </mesh>
                    )}

                    {/* LATITUDINAL BANDS */}
                    {p4.visible && (
                        <group>
                            {[-0.6, -0.3, 0.3, 0.6].map((y, i) => {
                                const currentR = Math.sqrt(R * R - (y * R) * (y * R));
                                return (
                                    <mesh key={`lat-${i}`} position={[0, y * R, 0]} rotation={[Math.PI / 2, 0, 0]} material={ribMat}>
                                        <torusGeometry args={[currentR, 0.04, 8, 64]} />
                                    </mesh>
                                );
                            })}
                        </group>
                    )}

                    {/* LONGITUDINAL RIBS */}
                    {p5.visible && (
                        <group>
                            {Array.from({ length: 8 }).map((_, i) => (
                                <mesh key={`lon-${i}`} rotation={[0, (i / 8) * Math.PI, 0]} material={ribMat}>
                                    <torusGeometry args={[R, 0.04, 8, 64]} />
                                </mesh>
                            ))}
                        </group>
                    )}

                    {/* CONTINENTAL PLATES - Base opaque sphere */}
                    {p7.visible && (
                        <>
                            <mesh material={oceanicMat}>
                                <sphereGeometry args={[R - 0.1, 32, 32]} />
                            </mesh>
                            <mesh material={coreMat}>
                                {/* Abstract continents: icosahedron with some detail */}
                                <icosahedronGeometry args={[R - 0.05, 2]} />
                            </mesh>
                        </>
                    )}

                    {/* OCEANIC GRID */}
                    {p8.visible && (
                        <mesh material={ribMat} wireframe>
                            <sphereGeometry args={[R, 16, 16]} />
                        </mesh>
                    )}

                    {/* DATA NODES */}
                    {p9.visible && getNodes.map((pos, i) => (
                        <Node
                            key={i} id={i} position={pos} index={i} total={EARTH_FACTS.length}
                            progress={progress} onHover={onNodeHover} onClick={onNodeClick}
                            isHovered={hoveredNode === i}
                        />
                    ))}
                </group>

                {/* Orbitals & Satellites (outer elements) */}
                <group ref={groupRef} rotation={[Math.PI / 8, 0, 0]}>
                    {/* ORBITAL TRACKS */}
                    {p10.visible && (
                        <>
                            <mesh rotation={[Math.PI / 2, 0, 0]} material={orbitMat}>
                                <torusGeometry args={[R + 1.2, 0.02, 8, 64]} />
                            </mesh>
                            <mesh rotation={[Math.PI / 2, Math.PI / 4, 0]} material={orbitMat}>
                                <torusGeometry args={[R + 1.5, 0.02, 8, 64]} />
                            </mesh>
                        </>
                    )}

                    {/* SATELLITE ARRAY */}
                    {p11.visible && Array.from({ length: 12 }).map((_, i) => {
                        const a = (i / 12) * Math.PI * 2;
                        return (
                            <mesh key={`sat-${i}`} position={[Math.cos(a) * (R + 1.2), 0, Math.sin(a) * (R + 1.2)]}>
                                <boxGeometry args={[0.1, 0.05, 0.2]} />
                                <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={1} />
                            </mesh>
                        )
                    })}
                </group>
            </group>
        </>
    );
}

export default function MetallicEarth3D({ progress, t, onNodeHover, onNodeClick, hoveredNode }) {
    return (
        <div style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
            <Canvas
                camera={{ position: [0, 0, 11], fov: 50 }}
                gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
                style={{ background: "transparent" }}
                dpr={1}
            >
                <EarthScene
                    progress={progress}
                    onNodeHover={onNodeHover}
                    onNodeClick={onNodeClick}
                    hoveredNode={hoveredNode}
                />
            </Canvas>
        </div>
    );
}
