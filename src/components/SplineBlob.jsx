import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
    MeshDistortMaterial,
    Sphere,
    Float,
    Environment,
    ContactShadows,
    MeshTransmissionMaterial,
    Edges
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { useTheme } from "../theme/ThemeContext";

function CyberBackground() {
    const { theme: t } = useTheme();
    const group = useRef();
    useFrame((state) => {
        const et = state.clock.getElapsedTime();
        group.current.position.z = Math.sin(et * 0.5) * 2;
    });

    return (
        <group ref={group}>
            {/* Floor Grid */}
            <gridHelper args={[50, 50, t.cyan + "22", t.border + "11"]} position={[0, -5, 0]} rotation={[0, 0, 0]} />

            {/* Building Silhouettes */}
            {Array.from({ length: 15 }).map((_, i) => (
                <mesh key={i} position={[(i - 7) * 4, -2, -10]} scale={[1.5, 5 + Math.random() * 10, 1]}>
                    <boxGeometry />
                    <meshBasicMaterial color={t.bg} transparent opacity={0.4} />
                    <Edges color={t.cyan + "33"} />
                </mesh>
            ))}
        </group>
    );
}

function Blob() {
    const { theme: t } = useTheme();
    const meshRef = useRef();
    const [hovered, setHovered] = useState(false);
    const mouse = useRef(new THREE.Vector2(0, 0));

    useFrame((state) => {
        const { x, y } = state.mouse;
        mouse.current.lerp(new THREE.Vector2(x, y), 0.1);

        if (meshRef.current) {
            meshRef.current.position.x = mouse.current.x * 2.5;
            meshRef.current.position.y = mouse.current.y * 2.5;
            meshRef.current.rotation.x += 0.005;
            meshRef.current.rotation.y += 0.008;

            // Misshapen wobble
            const t = state.clock.elapsedTime;
            meshRef.current.scale.x = 1.2 + Math.sin(t * 1.5) * 0.3;
            meshRef.current.scale.y = 1 + Math.cos(t * 2.1) * 0.4;
            meshRef.current.scale.z = 1.1 + Math.sin(t * 1.2) * 0.25;
        }
    });

    return (
        <Float speed={3} rotationIntensity={1.5} floatIntensity={2}>
            <mesh
                ref={meshRef}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                <icosahedronGeometry args={[1.5, 3]} />
                <MeshTransmissionMaterial
                    backside
                    samples={16}
                    resolution={512}
                    transmission={1}
                    roughness={0.02}
                    thickness={1.5}
                    ior={1.1}
                    chromaticAberration={0.3}
                    anisotropy={0.5}
                    distortion={1.2}
                    distortionScale={0.8}
                    temporalDistortion={0.5}
                    color="#ffffff"
                    attenuationDistance={1}
                    attenuationColor="#ffffff"
                />
            </mesh>
        </Float>
    );
}

function Rig() {
    return useFrame((state) => {
        state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.mouse.x * 3, 0.05);
        state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.mouse.y * 3, 0.05);
        state.camera.lookAt(0, 0, 0);
    });
}

export default function SplineBlob() {
    const { theme: t } = useTheme();

    return (
        <div style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
            pointerEvents: "none"
        }}>
            <Canvas
                shadows
                camera={{ position: [0, 2, 12], fov: 45 }}
                gl={{ antialias: true, alpha: true, stencil: false, depth: true }}
                style={{ pointerEvents: "auto" }}
            >
                <ambientLight intensity={0.4} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />

                <pointLight position={[-8, 5, 2]} intensity={2} color="#a855f7" />
                <pointLight position={[8, -5, 2]} intensity={2} color="#22c55e" />
                <pointLight position={[0, 0, 8]} intensity={1.5} color="#3b82f6" />

                <CyberBackground />

                <Environment preset="night" />
                <Rig />

                <EffectComposer multisampling={4}>
                    <Bloom luminanceThreshold={0.4} mipmapBlur intensity={1.0} radius={0.5} />
                </EffectComposer>
            </Canvas>
        </div>
    );
}
