import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../theme/ThemeContext';

function useMetal(color, roughness = 0.3, metalness = 0.8) {
    return useMemo(() => new THREE.MeshStandardMaterial({
        color, roughness, metalness,
        emissive: color, emissiveIntensity: 0.15
    }), [color, roughness, metalness]);
}

function Gear({ position, radius, teeth, color, speed, offsetAngle = 0 }) {
    const ref = useRef();
    const mat = useMetal(color);

    useFrame((_, delta) => {
        if (ref.current) {
            ref.current.rotation.z += delta * speed;
        }
    });

    return (
        <group position={position} ref={ref} rotation={[0, 0, offsetAngle]}>
            {/* Hub cutout */}
            <mesh material={mat} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[radius * 0.7, radius * 0.7, 0.2, 32]} />
            </mesh>
            {/* Center axle */}
            <mesh material={mat} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[radius * 0.15, radius * 0.15, 0.3, 16]} />
            </mesh>
            {/* Rim */}
            <mesh material={mat} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[radius, radius * 0.8, 0.25, 32]} />
            </mesh>
            {/* Spokes */}
            {Array.from({ length: 4 }).map((_, i) => (
                <mesh key={i} material={mat} rotation={[0, 0, i * Math.PI / 4]}>
                    <boxGeometry args={[radius * 1.6, 0.12, 0.12]} />
                </mesh>
            ))}
            {/* Teeth */}
            {Array.from({ length: teeth }).map((_, i) => {
                const a = (i / teeth) * Math.PI * 2;
                return (
                    <mesh key={i} material={mat} position={[Math.cos(a) * radius, Math.sin(a) * radius, 0]} rotation={[0, 0, a]}>
                        <boxGeometry args={[0.22, 0.15, 0.2]} />
                    </mesh>
                )
            })}
        </group>
    );
}

function GearSystem({ t }) {
    const groupRef = useRef();

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
            groupRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.3) * 0.15;
        }
    });

    // Pitch radii roughly equal outer radius for positioning
    // R1 = 1.2, T1 = 16
    // R2 = 0.8, T2 = 10 -> Dist = 2.0 (Pos: 1.7, 1.05)
    // R3 = 0.95, T3 = 12 -> Dist = 2.15 (Pos: -1.8, -1.18)

    return (
        <group ref={groupRef} scale={1.3}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 8, 5]} intensity={1.8} color="#ffffff" />
            <directionalLight position={[-4, -3, -5]} intensity={0.8} color="#8b9aff" />

            {/* Center gear */}
            <Gear position={[0, 0, 0]} radius={1.2} teeth={16} color={t.accent} speed={0.5} offsetAngle={0} />
            {/* Right-Top gear */}
            <Gear position={[1.7, 1.05, 0]} radius={0.8} teeth={10} color={t.cyan} speed={-0.5 * 16 / 10} offsetAngle={0.1} />
            {/* Left-Bottom gear */}
            <Gear position={[-1.8, -1.18, 0]} radius={0.95} teeth={12} color={t.magenta} speed={-0.5 * 16 / 12} offsetAngle={0.25} />
        </group>
    );
}

export default function Gears3D() {
    const { theme: t } = useTheme();
    return (
        <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
            <Canvas camera={{ position: [0, 0, 7.5], fov: 40 }} dpr={1} gl={{ antialias: true, alpha: true }}>
                <Float speed={2} rotationIntensity={0.2} floatIntensity={1.5}>
                    <GearSystem t={t} />
                </Float>
            </Canvas>
        </div>
    );
}
