import { useRef, useMemo, Suspense, Component, useState, useEffect, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars, Line, useTexture } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import * as THREE from "three";

class GlobeErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch() {}
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

function GlobeFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className="relative w-[60vmin] h-[60vmin] max-w-[520px] max-h-[520px] rounded-full opacity-80"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(0,240,255,0.45), rgba(10,25,47,0) 60%), radial-gradient(circle at 70% 70%, rgba(120,80,255,0.3), transparent 60%), radial-gradient(circle at 50% 50%, rgba(15,30,60,1), rgba(2,8,19,1) 70%)",
          boxShadow:
            "0 0 140px 30px rgba(0,240,255,0.35), inset 0 0 100px rgba(0,240,255,0.25)",
        }}
      />
    </div>
  );
}

const RADIUS = 2;

const CITIES: { name: string; lat: number; lon: number }[] = [
  { name: "Chennai", lat: 13.0827, lon: 80.2707 },
  { name: "Singapore", lat: 1.35, lon: 103.82 },
  { name: "Rotterdam", lat: 51.92, lon: 4.48 },
  { name: "New York", lat: 40.71, lon: -74.0 },
  { name: "Sao Paulo", lat: -23.55, lon: -46.63 },
  { name: "Dubai", lat: 25.2, lon: 55.27 },
  { name: "Shanghai", lat: 31.23, lon: 121.47 },
  { name: "Hamburg", lat: 53.55, lon: 9.99 },
  { name: "Sydney", lat: -33.87, lon: 151.21 },
  { name: "Cape Town", lat: -33.92, lon: 18.42 },
  { name: "Tokyo", lat: 35.68, lon: 139.69 },
  { name: "Los Angeles", lat: 34.05, lon: -118.24 },
];

type TransportKind = "plane" | "ship" | "truck";

const ROUTES: { from: number; to: number; kind: TransportKind }[] = [
  { from: 0, to: 1, kind: "ship" },
  { from: 0, to: 5, kind: "ship" },
  { from: 1, to: 6, kind: "ship" },
  { from: 2, to: 3, kind: "ship" },
  { from: 2, to: 7, kind: "truck" },
  { from: 3, to: 11, kind: "plane" },
  { from: 4, to: 9, kind: "ship" },
  { from: 5, to: 7, kind: "plane" },
  { from: 6, to: 10, kind: "plane" },
  { from: 10, to: 11, kind: "plane" },
  { from: 0, to: 2, kind: "ship" },
  { from: 8, to: 1, kind: "ship" },
  { from: 4, to: 11, kind: "plane" },
  { from: 9, to: 8, kind: "ship" },
];

function latLonToVec3(lat: number, lon: number, r: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

function greatCirclePoints(a: THREE.Vector3, b: THREE.Vector3, segments: number, lift: number) {
  const points: THREE.Vector3[] = [];
  const angle = a.angleTo(b);
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const sinAngle = Math.sin(angle);
    if (sinAngle === 0) {
      points.push(a.clone());
      continue;
    }
    const f = Math.sin((1 - t) * angle) / sinAngle;
    const g = Math.sin(t * angle) / sinAngle;
    const p = a.clone().multiplyScalar(f).add(b.clone().multiplyScalar(g));
    const arcHeight = 1 + lift * Math.sin(Math.PI * t);
    p.normalize().multiplyScalar(RADIUS * arcHeight);
    points.push(p);
  }
  return points;
}

function CityPoints() {
  const positions = useMemo(
    () => CITIES.map((c) => latLonToVec3(c.lat, c.lon, RADIUS * 1.005)),
    []
  );
  return (
    <group>
      {positions.map((p, i) => (
        <group key={i} position={p}>
          <mesh>
            <sphereGeometry args={[0.04, 14, 14]} />
            <meshBasicMaterial color="#00f0ff" />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.09, 16, 16]} />
            <meshBasicMaterial color="#00f0ff" transparent opacity={0.18} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function ArcLine({ points, color }: { points: THREE.Vector3[]; color: string }) {
  return (
    <Line 
      points={points} 
      color={color} 
      lineWidth={1.5} 
      transparent 
      opacity={0.5} 
      blending={THREE.AdditiveBlending}
      depthWrite={false}
    />
  );
}

function SimplePlane({ color }: { color: string }) {
  return (
    <group rotation={[-Math.PI / 2, 0, 0]}>
      <mesh>
        <coneGeometry args={[0.015, 0.05, 3]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh>
        <coneGeometry args={[0.025, 0.06, 3]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}

function SimpleShip({ color }: { color: string }) {
  return (
    <group>
      <mesh>
        <boxGeometry args={[0.015, 0.01, 0.05]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh>
        <boxGeometry args={[0.025, 0.02, 0.06]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}

function SimpleTruck({ color }: { color: string }) {
  return (
    <group>
      <mesh>
        <boxGeometry args={[0.012, 0.012, 0.025]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh>
        <boxGeometry args={[0.02, 0.02, 0.035]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}

function MovingTransport({
  points,
  speed,
  kind,
  surfaceOffset,
}: {
  points: THREE.Vector3[];
  speed: number;
  kind: TransportKind;
  surfaceOffset: number;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = ((state.clock.getElapsedTime() * speed) % 1 + 1) % 1;
    const idx = t * (points.length - 1);
    const i = Math.floor(idx);
    const f = idx - i;
    const a = points[i];
    const b = points[Math.min(i + 1, points.length - 1)];
    const pos = new THREE.Vector3().lerpVectors(a, b, f);

    // Surface-hugging offset
    const normal = pos.clone().normalize();
    pos.add(normal.clone().multiplyScalar(surfaceOffset));

    ref.current.position.copy(pos);

    // Orient along travel direction
    const tangent = b.clone().sub(a).normalize();
    const up = pos.clone().normalize();
    const m = new THREE.Matrix4();
    m.lookAt(new THREE.Vector3(0, 0, 0), tangent, up);
    ref.current.quaternion.setFromRotationMatrix(m);
  });

  const color = kind === "plane" ? "#aee9ff" : kind === "ship" ? "#00f0ff" : "#7c5cff";

  return (
    <group ref={ref}>
      {kind === "plane" && <SimplePlane color={color} />}
      {kind === "ship" && <SimpleShip color={color} />}
      {kind === "truck" && <SimpleTruck color={color} />}
    </group>
  );
}

function Globe() {
  const groupRef = useRef<THREE.Group>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  
  const [colorMap, specularMap, normalMap, cloudsMap] = useTexture([
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png'
  ]);
  
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0015;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.0018;
    }
  });

  const routes = useMemo(
    () =>
      ROUTES.map((r) => {
        const a = latLonToVec3(CITIES[r.from].lat, CITIES[r.from].lon, RADIUS * 1.005);
        const b = latLonToVec3(CITIES[r.to].lat, CITIES[r.to].lon, RADIUS * 1.005);
        // Planes get higher arcs, ships/trucks hug surface
        const lift = r.kind === "plane" ? 0.4 : 0.05;
        const pts = greatCirclePoints(a, b, 96, lift);
        return { ...r, pts };
      }),
    []
  );

  return (
    <group ref={groupRef}>
      {/* Realistic globe surface */}
      <mesh>
        <sphereGeometry args={[RADIUS, 64, 64]} />
        <meshPhongMaterial
          map={colorMap}
          specularMap={specularMap}
          normalMap={normalMap}
          specular={new THREE.Color(0x333333)}
          shininess={15}
        />
      </mesh>
      {/* Clouds */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[RADIUS * 1.01, 64, 64]} />
        <meshPhongMaterial
          map={cloudsMap}
          transparent={true}
          opacity={0.4}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
      {/* Enhanced atmospheric glow */}
      <mesh>
        <sphereGeometry args={[RADIUS * 1.08, 64, 64]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.08} side={THREE.BackSide} />
      </mesh>
      <mesh>
        <sphereGeometry args={[RADIUS * 1.16, 48, 48]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.06} side={THREE.BackSide} />
      </mesh>

      <CityPoints />

      {routes.map((r, i) => (
        <group key={i}>
          <ArcLine
            points={r.pts}
            color={r.kind === "plane" ? "#aee9ff" : r.kind === "ship" ? "#00f0ff" : "#7c5cff"}
          />
          <MovingTransport
            points={r.pts}
            speed={0.05 + (i % 6) * 0.012}
            kind={r.kind}
            surfaceOffset={r.kind === "plane" ? 0.02 : r.kind === "ship" ? 0.04 : 0.05}
          />
        </group>
      ))}
    </group>
  );
}

function ResponsiveCamera() {
  const { camera, size } = useThree();
  useEffect(() => {
    // Move camera further on narrow viewports so globe always fits
    const aspect = size.width / Math.max(size.height, 1);
    let z = 6.2;
    if (size.width < 480) z = 7.8;
    else if (size.width < 768) z = 7.0;
    if (aspect < 0.7) z += 0.8;
    camera.position.set(0, 0, z);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [camera, size.width, size.height]);
  return null;
}

export function Hero() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="relative w-full min-h-[100dvh] flex items-center pt-40 pb-16 overflow-hidden">
      <div className={`absolute left-0 right-0 bottom-0 z-0 ${isMobile ? 'pointer-events-none' : ''}`} style={{ top: '80px' }}>
        {mounted && (
          <GlobeErrorBoundary fallback={<GlobeFallback />}>
            <Suspense fallback={<GlobeFallback />}>
              <Canvas camera={{ position: [0, 0, 6.5], fov: 45 }} dpr={[1, 2]} className={isMobile ? 'pointer-events-none' : ''}>
                <ResponsiveCamera />
                <ambientLight intensity={1.2} />
                <pointLight position={[10, 10, 10]} intensity={1.2} color="#00f0ff" />
                <pointLight position={[-10, 10, 10]} intensity={1.0} color="#7c5cff" />
                <pointLight position={[0, -10, -10]} intensity={0.5} color="#ffffff" />
                <Stars radius={120} depth={60} count={3500} factor={4} saturation={0} fade speed={1} />
                <Globe />
                {!isMobile && (
                  <OrbitControls enableZoom={false} enablePan={true} minDistance={3} maxDistance={15} autoRotate autoRotateSpeed={0.3} />
                )}
              </Canvas>
            </Suspense>
          </GlobeErrorBoundary>
        )}
      </div>

      {/* Soft vignette so text stays readable */}
      <div className={`absolute left-0 right-0 bottom-0 z-[1] pointer-events-none ${isMobile ? 'bg-[radial-gradient(ellipse_at_center,_rgba(2,8,19,0.85),_transparent_75%)]' : 'bg-[radial-gradient(ellipse_at_left,_rgba(2,8,19,0.85),_transparent_60%)]'}`} style={{ top: '80px' }} />      
      {/* Mobile touch restriction overlay - blocks pointer events on top/bottom */}
      {isMobile && (
        <>
          <div className="absolute top-0 left-0 right-0 h-1/3 z-10 pointer-events-auto" style={{ background: 'transparent' }} />
          <div className="absolute bottom-0 left-0 right-0 h-1/4 z-10 pointer-events-auto" style={{ background: 'transparent' }} />
        </>
      )}
      <div className="container relative z-10 mx-auto px-4 pointer-events-none">
        <div className="max-w-3xl mx-auto md:mx-0 flex flex-col md:block items-center text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]">
            Connecting Global <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
              Trade Seamlessly
            </span>
          </h1>
          <p className="text-base sm:text-xl text-white/70 mb-10 max-w-xl leading-relaxed">
            Trusted export partner across Agri, Leather, Textile & Chemical sectors. We deliver excellence to every corner of the world.
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pointer-events-auto">
            {/* <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(0,240,255,0.4)]">
              Explore Products
            </Button> */}
            {/* <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm">
              Get Quote
            </Button> */}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-[2]" />
    </section>
  );
}
