import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import profile from "../assets/profile.jpeg";
import { TextureLoader } from "three";

function OrbitalRing({ radius = 2, color = "purple", speed = 0.2, tilt = 0, dashScale = 1 }) {
    const ref = useRef();

    // create circle points for a smoother look
    const segments = 256;
    const points = [];
    for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * 2 * Math.PI;
        points.push(new THREE.Vector3(radius * Math.cos(theta), radius * Math.sin(theta), 0));
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    useFrame((state, delta) => {
        ref.current.rotation.z += delta * speed;
        // Subtle wobble
        ref.current.rotation.x = tilt + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
        ref.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.5) * 0.05;
    });

    return (
        <line ref={ref} geometry={geometry} computeLineDistances>
            <lineDashedMaterial
                color={color}
                dashSize={0.03}
                gapSize={0.12 * dashScale}
                transparent
                opacity={0.6}
            />
        </line>
    );
}

function CenterProfile() {
    const profileTex = new TextureLoader().load(profile);

    return (
        <group>
            {/* Glow ring around profile */}
            <mesh scale={1.05}>
                <circleGeometry args={[1.4, 64]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
            </mesh>
            <mesh>
                <circleGeometry args={[1.4, 64]} />
                <meshBasicMaterial map={profileTex} side={THREE.DoubleSide} />
            </mesh>
            {/* Border ring */}
            <line geometry={new THREE.BufferGeometry().setFromPoints(
                Array.from({ length: 65 }, (_, i) => {
                    const t = (i / 64) * Math.PI * 2;
                    return new THREE.Vector3(1.4 * Math.cos(t), 1.4 * Math.sin(t), 0);
                })
            )}>
                <lineBasicMaterial color="#ffffff" transparent opacity={0.3} />
            </line>
        </group>
    );
}

export default function OrbitalRings2D() {
    return (
        <div
            style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
            }}
        >
            <Canvas camera={{ position: [0, 0, 7] }} gl={{ alpha: true }}>
                <ambientLight intensity={1} />
                <pointLight position={[0, 0, 5]} intensity={2} />

                <CenterProfile />

                {/* complex 3D orbital rings - dotted style and increased radii */}
                <OrbitalRing radius={1.8} color="#a855f7" speed={0.6} tilt={0.2} dashScale={0.8} />
                <OrbitalRing radius={2.2} color="#10b981" speed={-0.4} tilt={-0.3} dashScale={1.2} />
                <OrbitalRing radius={2.6} color="#6366f1" speed={0.3} tilt={0.5} dashScale={1.5} />
                <OrbitalRing radius={3.0} color="#ec4899" speed={-0.2} tilt={-0.4} dashScale={2} />
                <OrbitalRing radius={3.4} color="#f59e0b" speed={0.15} tilt={0.6} dashScale={1} />
                <OrbitalRing radius={3.9} color="#06b6d4" speed={-0.1} tilt={-0.1} dashScale={3} />
            </Canvas>
        </div>
    );
}