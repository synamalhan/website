import { useMemo, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// A Metal Earth-style orca: a body skinned in faceted printed-metal bands along an upward-curving spine,
// with dorsal fin, flippers, fluke, and a wave stand on an oval base. "Exploded" slides every piece apart.
// Original geometry, built procedurally; the colours echo a real orca (black back, white belly and eye patch).

const BLACK = new THREE.Color("#3b3f4c"), WHITE = new THREE.Color("#f2f2ee"), GRAY = new THREE.Color("#747989");
const BANDS = 14, SIDES = 12, RMAX = 0.74;

const spine = new THREE.CatmullRomCurve3([
    [2.4, 0.05, 0], [1.4, 0.05, 0], [0.2, 0, 0], [-1.0, -0.05, 0], [-1.9, 0.15, 0], [-2.6, 0.55, 0], [-3.0, 1.15, 0], [-3.1, 1.8, 0],
].map(p => new THREE.Vector3(...p)), false, "centripetal");

// Radius along the body (u: 0 = nose, 1 = tail tip): blunt rounded head, fat middle, slim tail stock.
const radius = u => RMAX * Math.max(0.07, Math.pow(Math.sin(Math.PI * (0.12 + 0.88 * Math.pow(u, 0.8))), 0.85));

function frame(u) {
    const C = spine.getPointAt(u), T = spine.getTangentAt(u).normalize();
    // The spine runs head (+x) to tail, so "up" is (T.y, -T.x); Z = T x U keeps the basis right-handed.
    const U = new THREE.Vector3(T.y, -T.x, 0).normalize();
    return { C, T, U, Z: new THREE.Vector3().crossVectors(T, U).normalize() };
}
// Bake a locally-built geometry into world space at spine position u. off = [along, up, side]; rot = extra local rotation.
function place(geo, u, off = [0, 0, 0], rot) {
    const { C, T, U, Z } = frame(u);
    const m = new THREE.Matrix4().makeBasis(T, U, Z).setPosition(C.clone().addScaledVector(T, off[0]).addScaledVector(U, off[1]).addScaledVector(Z, off[2]));
    if (rot) m.multiply(rot);
    return geo.applyMatrix4(m);
}
const extrude = (shape, depth) => { const g = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false }); g.translate(0, 0, -depth / 2); return g; };
const poly = pts => new THREE.Shape(pts.map(([x, y]) => new THREE.Vector2(x, y)));

function bandColor(i, th) {
    const n = ((i + 0.5) * 14) / BANDS; // pattern was designed on 14 bands
    const s = Math.sin(th), c = Math.abs(Math.cos(th));
    if (n < 2 && s < -0.1) return WHITE;                          // lower jaw
    if (n >= 2 && n < 4 && c > 0.5 && s > -0.1 && s < 0.55) return WHITE; // eye patch
    if (n >= 8 && n < 10 && c > 0.6 && s > -0.45 && s < 0.2) return WHITE; // flank patch
    if (s < -0.35 && n < 10) return WHITE;                        // belly
    if (n >= 9 && n < 11 && s > 0.45) return GRAY;                // saddle patch
    return BLACK;
}

// One faceted ring per band; the explode view slides the rings apart along the spine.
function makeBand(i) {
    const u0 = i / BANDS, u1 = (i + 1) / BANDS;
    const ring = u => { const { C, U, Z } = frame(u), r = radius(u); return Array.from({ length: SIDES }, (_, k) => {
        const th = (k / SIDES) * Math.PI * 2;
        return C.clone().addScaledVector(U, r * 0.95 * Math.sin(th)).addScaledVector(Z, r * 0.85 * Math.cos(th)); }); };
    const a = ring(u0), b = ring(u1), mid = frame((u0 + u1) / 2);
    {
        const pos = [], col = [];
        for (let k = 0; k < SIDES; k++) {
            const k2 = (k + 1) % SIDES, color = bandColor(i, ((k + 0.5) / SIDES) * Math.PI * 2);
            const tri = (p, q, r) => [p, q, r].forEach(v => { pos.push(v.x, v.y, v.z); col.push(color.r, color.g, color.b); });
            tri(a[k], b[k], b[k2]); tri(a[k], b[k2], a[k2]);
            if (i === 0) tri(frame(u0).C, a[k2], a[k]); // nose cap
        }
        const g = new THREE.BufferGeometry();
        g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
        g.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
        g.computeVertexNormals();
        const k = (i - (BANDS - 1) / 2) * 0.2;
        return { id: `band-${i}`, geo: g, out: [mid.T.x * k, mid.T.y * k, 0], vc: true };
    }
}

function makePieces() {
    const bands = Array.from({ length: BANDS }, (_, i) => makeBand(i));
    const fin = place(extrude(poly([[0.55, 0], [0.1, 0.7], [-0.15, 1.05], [-0.4, 0.35], [-0.55, 0]]), 0.05), 0.31, [0, radius(0.31) * 0.85, 0]);
    const paddle = () => { const s = new THREE.Shape(); s.absellipse(0, -0.5, 0.24, 0.55, 0, Math.PI * 2, false, 0); return extrude(s, 0.04); };
    const flipper = side => place(paddle().rotateZ(-0.45), 0.24, [0, -radius(0.24) * 0.35, side * radius(0.24) * 0.8], new THREE.Matrix4().makeRotationX(side * 0.5));
    const half = [[0, 0.07], [0.25, 0.55], [0.45, 0.95], [0.55, 0.8], [0.34, 0.35], [0.28, 0]];
    const flukeShape = poly([...half, ...half.slice(0, -1).reverse().map(([x, z]) => [x, -z])]);
    const fluke = place(extrude(flukeShape, 0.04).rotateX(-Math.PI / 2), 1, [-0.02, 0, 0]);

    const base = new THREE.Shape(); base.absellipse(0, 0, 2.1, 1.1, 0, Math.PI * 2, false, 0);
    const baseGeo = extrude(base, 0.14).rotateX(-Math.PI / 2).translate(0.3, -1.75, 0);
    // Wave: a flat curling ribbon rising from the base to under the belly.
    const centre = [[-0.3, -1.7], [-0.25, -1.3], [-0.05, -0.95], [0.3, -0.78], [0.7, -0.76]];
    const left = [], right = [];
    centre.forEach(([x, y], i) => { const [nx, ny] = i < centre.length - 1 ? [centre[i + 1][0] - x, centre[i + 1][1] - y] : [x - centre[i - 1][0], y - centre[i - 1][1]];
        const l = Math.hypot(nx, ny), w = 0.2 * (1 - i / 6); left.push([x - (ny / l) * w, y + (nx / l) * w]); right.push([x + (ny / l) * w, y - (nx / l) * w]); });
    const wave = extrude(poly([...left, ...right.reverse()]), 0.7);


    return [
        ...bands,
        { id: "dorsal", geo: fin, out: [0, 0.7, 0], mat: "dark" },
        { id: "flipper-r", geo: flipper(1), out: [0, -0.2, 1.2], mat: "dark" },
        { id: "flipper-l", geo: flipper(-1), out: [0, -0.2, -1.2], mat: "dark" },
        { id: "fluke", geo: fluke, out: [-0.5, 0.4, 0], mat: "dark" },
        { id: "wave", geo: wave, out: [0, -0.35, 0], mat: "blue" },
        { id: "base", geo: baseGeo, out: [0, -0.6, 0], mat: "base" },
    ];
}

const MATS = { eye: "#0b0b0d", dark: "#3b3f4c", blue: "#3d86c6", base: "#1f4f86" };

function Orca({ exploded, reduced }) {
    const pieces = useMemo(makePieces, []);
    const edges = useMemo(() => pieces.map(p => new THREE.EdgesGeometry(p.geo, 8)), [pieces]);
    const refs = useRef([]);
    const group = useRef();
    const e = useRef(0);
    const invalidate = useThree(s => s.invalidate);
    useEffect(() => { invalidate(); }, [exploded, invalidate]);

    useFrame(({ clock }, dt) => {
        e.current = reduced ? (exploded ? 1 : 0) : THREE.MathUtils.damp(e.current, exploded ? 1 : 0, 4, dt);
        pieces.forEach((p, i) => refs.current[i]?.position.set(p.out[0] * e.current, p.out[1] * e.current, p.out[2] * e.current));
        // The whale (not the stand) bobs slightly.
        if (!reduced) group.current.position.y = Math.sin(clock.elapsedTime * 1.1) * 0.05 * (1 - e.current);
    });

    return (
        <group ref={group} position={[0.3, 0.1, 0]}>
            {pieces.map((p, i) => (
                <group key={p.id} ref={el => (refs.current[i] = el)}>
                    <mesh geometry={p.geo}>
                        <meshStandardMaterial vertexColors={!!p.vc} color={p.vc ? "#ffffff" : MATS[p.mat]} flatShading metalness={0.35} roughness={0.5} side={THREE.DoubleSide} />
                    </mesh>
                    <lineSegments geometry={edges[i]}><lineBasicMaterial color="#000000" transparent opacity={0.45} /></lineSegments>
                </group>
            ))}
        </group>
    );
}

// Theme values aren't needed: the model carries its own printed colours.
export default function MetalOrca3D({ exploded, reduced, rotate }) {
    return (
        <Canvas dpr={[1, 1.75]} camera={{ position: [5.2, 2.2, 7.2], fov: 42 }} gl={{ alpha: true }} frameloop={reduced ? "demand" : "always"} style={{ touchAction: "pan-y" }}>
            <ambientLight intensity={1.1} />
            <directionalLight position={[4, 6, 4]} intensity={2.6} />
            <directionalLight position={[-5, 3, -4]} intensity={1.4} />
            <pointLight position={[0, -2, 5]} intensity={20} />
            <Orca exploded={exploded} reduced={reduced} />
            <OrbitControls target={[-0.3, 0.1, 0]} enableZoom={false} enablePan={false} enableRotate={rotate} autoRotate={!reduced && rotate} autoRotateSpeed={0.8}
                minPolarAngle={Math.PI / 6} maxPolarAngle={Math.PI / 1.9} />
        </Canvas>
    );
}
