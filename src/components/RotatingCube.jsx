import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTheme } from '../theme/ThemeContext';

function InteractiveCube({ t }) {
    const meshRef = useRef();
    const [hovered, setHover] = useState(false);
    const mouse = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };
        document.addEventListener('mousemove', handleMouseMove);
        return () => document.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useFrame((state, delta) => {
        // Slowly auto-rotate 
        meshRef.current.rotation.x += delta * (hovered ? 0.8 : 0.2);
        meshRef.current.rotation.y += delta * (hovered ? 1.2 : 0.3);

        // Track the mouse to slightly tilt the cube
        const targetRotX = mouse.current.y * 0.8;
        const targetRotY = mouse.current.x * 0.8;

        meshRef.current.position.x += (mouse.current.x * 1.5 - meshRef.current.position.x) * 0.05;
        meshRef.current.position.y += (mouse.current.y * 1.5 - meshRef.current.position.y) * 0.05;
    });

    return (
        <mesh
            ref={meshRef}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
            scale={hovered ? 1.4 : 1.2}
            position={[0, 0, 0]}
        >
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial
                color={hovered ? t.cyan : t.accent}
                wireframe={true}
                transparent={true}
                opacity={1.0}
                emissive={hovered ? t.cyan : t.accent}
                emissiveIntensity={1.5}
            />
        </mesh>
    );
}

export default function RotatingCube() {
    const { theme: t } = useTheme();
    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.45, overflow: "hidden" }}>
            <Canvas camera={{ position: [0, 0, 8] }} style={{ pointerEvents: "auto" }}>
                <ambientLight intensity={1.2} />
                <pointLight position={[10, 10, 10]} />
                <InteractiveCube t={t} />
            </Canvas>
        </div>
    );
}
