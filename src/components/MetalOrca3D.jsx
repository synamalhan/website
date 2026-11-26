import { useMemo, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

// A Metal Earth-style orca: a body skinned in faceted printed-metal bands along an upward-curving spine,
// with dorsal fin, flippers, fluke, and a wave stand on an oval base. "Exploded" slides every piece apart.
// Original geometry, built procedurally; the colours echo a real orca (black back, white belly and eye patch).

// Sheet-steel tones instead of paint: dark gunmetal, polished silver, brushed grey.
const BLACK = new THREE.Color("#4a505c"), WHITE = new THREE.Color("#e4e7ec"), GRAY = new THREE.Color("#8d94a1");
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

const MATS = { eye: "#0b0b0d", dark: "#4a505c", blue: "#7fa6c9", base: "#5d6573" };
// Shared by every metal surface: mirror-like steel that picks up the room reflections below.
const STEEL = { metalness: 0.92, roughness: 0.3, envMapIntensity: 1.1 };

// Square-by-square build. World space is cut into cubes. For every cube the model occupies, a small square flies in from
// outside and lands; the moment it lands, the real surface inside that cube appears. Landing order sweeps up from the stand
// with noise. The same hash runs in JS (to schedule the flying squares) and in the shader (to reveal the surface).
const CELL = 0.26, BUILD_SECONDS = 4.5, FLY = 0.9, ORIGIN = [0.3, 0.1, 0];
const reveal = { uProg: { value: 0 }, uCell: { value: CELL } };
const fract = x => x - Math.floor(x);
const hash3 = (x, y, z) => { // keep identical to h3 in the shader below
    let qx = fract(x * 0.1031), qy = fract(y * 0.1031), qz = fract(z * 0.1031);
    const d = qx * (qy + 33.33) + qy * (qz + 33.33) + qz * (qx + 33.33);
    qx += d; qy += d; qz += d;
    return fract((qx + qy) * qz);
};
const order = (cy, h) => Math.min(1, Math.max(0, (cy + 2) / 3.6)) * 0.7 + h * 0.3; // 0 = lands first
const withReveal = shader => {
    Object.assign(shader.uniforms, reveal);
    shader.vertexShader = shader.vertexShader
        .replace("#include <common>", "#include <common>\nvarying vec3 vWp;")
        .replace("#include <begin_vertex>", "#include <begin_vertex>\nvWp = (modelMatrix * vec4(transformed, 1.0)).xyz;");
    shader.fragmentShader = shader.fragmentShader
        .replace("#include <common>", `#include <common>
varying vec3 vWp;
uniform float uProg;
uniform float uCell;
float h3(vec3 p){ vec3 q = fract(p * 0.1031); q += dot(q, q.yzx + 33.33); return fract((q.x + q.y) * q.z); }`)
        .replace("#include <clipping_planes_fragment>", `#include <clipping_planes_fragment>
{ vec3 c = floor(vWp / uCell); float cy = (c.y + 0.5) * uCell;
  if (clamp((cy + 2.0) / 3.6, 0.0, 1.0) * 0.7 + h3(c) * 0.3 > uProg) discard; }`);
};

// Every cube the model touches, with a colour, found by sampling points over each triangle.
function sampleCells(pieces) {
    const cells = new Map(), P = [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()], C = new THREE.Color();
    pieces.forEach(p => {
        const pos = p.geo.attributes.position, col = p.geo.attributes.color, index = p.geo.index, base = new THREE.Color(MATS[p.mat] || "#8a8e9c");
        const tris = index ? index.count / 3 : pos.count / 3;
        for (let t = 0; t < tris; t++) {
            const ids = [0, 1, 2].map(k => (index ? index.getX(t * 3 + k) : t * 3 + k));
            ids.forEach((id, k) => P[k].fromBufferAttribute(pos, id).add(new THREE.Vector3(...ORIGIN)));
            if (col) C.setRGB(...[0, 1, 2].reduce((acc, k) => [acc[0] + col.getX(ids[k]) / 3, acc[1] + col.getY(ids[k]) / 3, acc[2] + col.getZ(ids[k]) / 3], [0, 0, 0])); else C.copy(base);
            const n = Math.max(1, Math.ceil(Math.max(P[0].distanceTo(P[1]), P[1].distanceTo(P[2]), P[2].distanceTo(P[0])) / (CELL * 0.5)));
            for (let i = 0; i <= n; i++) for (let j = 0; j <= n - i; j++) {
                const u = i / n, v = j / n, w = 1 - u - v;
                const x = P[0].x * w + P[1].x * u + P[2].x * v, y = P[0].y * w + P[1].y * u + P[2].y * v, z = P[0].z * w + P[1].z * u + P[2].z * v;
                const ix = Math.floor(x / CELL), iy = Math.floor(y / CELL), iz = Math.floor(z / CELL), key = `${ix},${iy},${iz}`;
                if (!cells.has(key)) cells.set(key, { ix, iy, iz, color: C.clone() });
            }
        }
    });
    return [...cells.values()].map(c => {
        const cx = (c.ix + 0.5) * CELL, cy = (c.iy + 0.5) * CELL, cz = (c.iz + 0.5) * CELL;
        const r = [hash3(c.ix + 7, c.iy, c.iz), hash3(c.ix, c.iy + 13, c.iz), hash3(c.ix, c.iy, c.iz + 29)];
        const out = new THREE.Vector3(cx, cy * 0.5, cz).normalize(); // squares arrive from outside the model
        const dist = 4 + r[0] * 5;
        return { ...c, pos: new THREE.Vector3(cx, cy, cz), from: new THREE.Vector3(cx + out.x * dist + (r[1] - 0.5) * 4, cy + out.y * dist + 2 + r[2] * 3, cz + out.z * dist + (r[2] - 0.5) * 4),
            start: (order(cy, hash3(c.ix, c.iy, c.iz)) * BUILD_SECONDS) / 1.01 };
    });
}

// Reflections: without an environment, metal just renders dark.
function Room() {
    const { gl, scene } = useThree();
    useEffect(() => {
        const pm = new THREE.PMREMGenerator(gl), env = pm.fromScene(new RoomEnvironment(), 0.04).texture;
        scene.environment = env;
        return () => { scene.environment = null; env.dispose(); pm.dispose(); };
    }, [gl, scene]);
    return null;
}

function Orca({ exploded, reduced, play, buildKey }) {
    const pieces = useMemo(makePieces, []);
    const edges = useMemo(() => pieces.map(p => new THREE.EdgesGeometry(p.geo, 8)), [pieces]);
    const cells = useMemo(() => sampleCells(pieces), [pieces]);
    const refs = useRef([]);
    const group = useRef();
    const cubes = useRef();
    const e = useRef(0);
    const start = useRef(null);
    const tmp = useMemo(() => new THREE.Object3D(), []);
    useEffect(() => { start.current = null; reveal.uProg.value = reduced ? 1.01 : 0; }, [buildKey, reduced]);
    useEffect(() => { cells.forEach((c, i) => cubes.current?.setColorAt(i, c.color)); if (cubes.current?.instanceColor) cubes.current.instanceColor.needsUpdate = true; }, [cells]);
    const invalidate = useThree(s => s.invalidate);
    useEffect(() => { invalidate(); }, [exploded, invalidate]);

    useFrame(({ clock }, dt) => {
        e.current = reduced ? (exploded ? 1 : 0) : THREE.MathUtils.damp(e.current, exploded ? 1 : 0, 4, dt);
        pieces.forEach((p, i) => refs.current[i]?.position.set(p.out[0] * e.current, p.out[1] * e.current, p.out[2] * e.current));
        if (reduced) return;
        if (play && start.current == null) start.current = clock.elapsedTime;
        const t = start.current == null ? -1 : clock.elapsedTime - start.current;
        // 1.01 (not 1) so even the noisiest cube is guaranteed to show at the end.
        reveal.uProg.value = t < FLY ? 0 : Math.min(1.01, ((t - FLY) / BUILD_SECONDS) * 1.01);
        const flying = t >= 0 && t < FLY + BUILD_SECONDS + 0.1;
        if (cubes.current) {
            cubes.current.visible = flying;
            if (flying) {
                cells.forEach((c, i) => {
                    const f = THREE.MathUtils.clamp((t - c.start) / FLY, 0, 1), k = 1 - (1 - f) ** 3;
                    tmp.position.lerpVectors(c.from, c.pos, k);
                    tmp.rotation.set((1 - k) * 6, (1 - k) * 4, (1 - k) * 3); // tumbling flat sheets
                    tmp.scale.setScalar(f > 0 && f < 1 ? 1 : 0.0001); // hidden before launch and after landing
                    tmp.updateMatrix();
                    cubes.current.setMatrixAt(i, tmp.matrix);
                });
                cubes.current.instanceMatrix.needsUpdate = true;
            }
        }
        // Bob only once the build is done, so the cube grid stays aligned with the model while it builds.
        group.current.position.y = ORIGIN[1] + Math.sin(clock.elapsedTime * 1.1) * 0.05 * (1 - e.current) * THREE.MathUtils.clamp(t - (FLY + BUILD_SECONDS), 0, 1);
    });

    return (
        <>
            <group ref={group} position={ORIGIN}>
                {pieces.map((p, i) => (
                    <group key={p.id} ref={el => (refs.current[i] = el)}>
                        <mesh geometry={p.geo}>
                            <meshStandardMaterial vertexColors={!!p.vc} color={p.vc ? "#ffffff" : MATS[p.mat]} flatShading {...STEEL} side={THREE.DoubleSide} onBeforeCompile={withReveal} />
                        </mesh>
                        <lineSegments geometry={edges[i]}><lineBasicMaterial color="#1a1d24" transparent opacity={0.6} onBeforeCompile={withReveal} /></lineSegments>
                    </group>
                ))}
            </group>
            {!reduced && (
                <instancedMesh ref={cubes} args={[undefined, undefined, cells.length]} frustumCulled={false} visible={false}>
                    <boxGeometry args={[CELL * 1.05, CELL * 0.04, CELL * 0.85]} />
                    <meshStandardMaterial flatShading {...STEEL} />
                </instancedMesh>
            )}
        </>
    );
}

// Theme values aren't needed: the model carries its own printed colours.
export default function MetalOrca3D({ exploded, reduced, rotate, play = true, buildKey = 0 }) {
    return (
        <Canvas dpr={[1, 1.75]} camera={{ position: [5.2, 2.2, 7.2], fov: 42 }} gl={{ alpha: true }} frameloop={reduced ? "demand" : "always"} style={{ touchAction: "pan-y" }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[4, 6, 4]} intensity={2.6} />
            <directionalLight position={[-5, 3, -4]} intensity={1.4} />
            <pointLight position={[0, -2, 5]} intensity={20} />
            <Room />
            <Orca exploded={exploded} reduced={reduced} play={play} buildKey={buildKey} />
            <OrbitControls target={[-0.3, 0.1, 0]} enableZoom={false} enablePan={false} enableRotate={rotate} autoRotate={!reduced && rotate} autoRotateSpeed={0.8}
                minPolarAngle={Math.PI / 6} maxPolarAngle={Math.PI / 1.9} />
        </Canvas>
    );
}
