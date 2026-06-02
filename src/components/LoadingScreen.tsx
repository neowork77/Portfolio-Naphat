'use client';

import { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, ChromaticAberration, Noise } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Constants ────────────────────────────────────────────────────────────────
const TOTAL_DURATION = 5000;
const ASSEMBLE_START = 0;
const ASSEMBLE_END = 2800;
const PULSE_START = 2800;
const PULSE_END = 3600;
const SHATTER_START = 3600;
const SHATTER_END = 4800;

const PIECE_COUNT = 20;
const DUST_COUNT = 300;

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

// ─── Individual shard piece ────────────────────────────────────────────────────
interface ShardProps {
  startPos: THREE.Vector3;
  startRot: THREE.Euler;
  faceIndex: number;
  totalFaces: number;
  phase: 'assembling' | 'pulsing' | 'shattering' | 'done';
  assembleProgress: number;
  shatterProgress: number;
  shatterDir: THREE.Vector3;
  pulseIntensity: number;
}

function Shard({
  startPos,
  startRot,
  faceIndex,
  totalFaces,
  phase,
  assembleProgress,
  shatterProgress,
  shatterDir,
  pulseIntensity,
}: ShardProps) {
  const meshRef = useRef<THREE.Mesh>(null!);

  const stagger = (faceIndex / totalFaces) * 0.45;
  const localProgress = clamp((assembleProgress - stagger) / (1 - stagger), 0, 1);
  const easedProgress = easeInOut(localProgress);

  const theta = (faceIndex / totalFaces) * Math.PI * 2;
  const phi = (faceIndex / totalFaces) * Math.PI;
  const targetPos = new THREE.Vector3(
    Math.sin(phi) * Math.cos(theta) * 0.01,
    Math.cos(phi) * 0.01,
    Math.sin(phi) * Math.sin(theta) * 0.01,
  );

  let pos = new THREE.Vector3().lerpVectors(startPos, targetPos, easedProgress);
  let opacity = lerp(0.0, 1.0, easedProgress);

  if (phase === 'shattering' || phase === 'done') {
    const se = easeInOut(shatterProgress);
    pos = pos.clone().add(shatterDir.clone().multiplyScalar(se * 4.5));
    opacity = lerp(1, 0, shatterProgress);
  }

  const emissiveIntensity = phase === 'pulsing'
    ? pulseIntensity * 5.0 // เพิ่มความสว่างตอน Pulse
    : phase === 'shattering'
      ? lerp(5.0, 0, shatterProgress)
      : 0.2;

  return (
    <mesh ref={meshRef} position={pos} rotation={startRot}>
      <dodecahedronGeometry args={[0.18, 0]} />
      <meshStandardMaterial
        color="#a1a1aa"
        metalness={1}
        roughness={0.1}
        emissive="#0ea5e9" // สีฟ้าสว่างแบบ Cyber
        emissiveIntensity={emissiveIntensity}
        transparent
        opacity={opacity}
      />
    </mesh>
  );
}

// ─── Dust particle system ──────────────────────────────────────────────────────
function DustParticles({ shatterProgress, active }: { shatterProgress: number; active: boolean }) {
  const points = useRef<THREE.Points>(null!);

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(DUST_COUNT * 3);
    const vel = new Float32Array(DUST_COUNT * 3);
    for (let i = 0; i < DUST_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 0.3 + Math.random() * 0.5;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.cos(phi);
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
      vel[i * 3] = (Math.random() - 0.5) * 6; // ระเบิดแรงขึ้น
      vel[i * 3 + 1] = (Math.random() - 0.5) * 6;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return { positions: pos, velocities: vel };
  }, []);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions.slice(), 3));
    return g;
  }, [positions]);

  useFrame(() => {
    if (!active || !points.current) return;
    const attr = points.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    const t = easeInOut(shatterProgress);
    for (let i = 0; i < DUST_COUNT; i++) {
      arr[i * 3] = positions[i * 3] + velocities[i * 3] * t;
      arr[i * 3 + 1] = positions[i * 3 + 1] + velocities[i * 3 + 1] * t;
      arr[i * 3 + 2] = positions[i * 3 + 2] + velocities[i * 3 + 2] * t;
    }
    attr.needsUpdate = true;
  });

  if (!active) return null;

  return (
    <points ref={points} geometry={geo}>
      <pointsMaterial
        color="#38bdf8"
        size={0.03}
        transparent
        opacity={Math.max(0, 1 - shatterProgress * 1.2)}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ─── Scene orchestrator ────────────────────────────────────────────────────────
function Scene({ onDone }: { onDone: () => void }) {
  const { camera } = useThree();

  const pieces = useMemo(() =>
    Array.from({ length: PIECE_COUNT }, (_, i) => {
      const theta = (i / PIECE_COUNT) * Math.PI * 2;
      const r = 4.5 + Math.random() * 2.5; // กระจายกว้างขึ้น
      const yOff = (Math.random() - 0.5) * 4;
      return {
        startPos: new THREE.Vector3(Math.cos(theta) * r, yOff, Math.sin(theta) * r),
        startRot: new THREE.Euler(Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2),
        shatterDir: new THREE.Vector3((Math.random() - 0.5), (Math.random() - 0.5), (Math.random() - 0.5)).normalize(),
        faceIndex: i,
      };
    }), []);

  const [elapsed, setElapsed] = useState(0);
  const [doneFired, setDoneFired] = useState(false);
  const startTime = useRef<number | null>(null);
  const groupRef = useRef<THREE.Group>(null!);
  const wireframeRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (startTime.current === null) startTime.current = clock.getElapsedTime();
    const ms = (clock.getElapsedTime() - startTime.current) * 1000;
    setElapsed(ms);
    if (ms > TOTAL_DURATION && !doneFired) {
      setDoneFired(true);
      onDone();
    }

    // Dynamic Camera Movement (ซูมเข้าช้าๆ แล้วดึงกลับตอนระเบิด)
    const camZ = lerp(6, 4.5, clamp(ms / ASSEMBLE_END, 0, 1));
    if (ms < SHATTER_START) {
      camera.position.z = camZ;
    } else {
      const shatterT = clamp((ms - SHATTER_START) / (SHATTER_END - SHATTER_START), 0, 1);
      camera.position.z = lerp(4.5, 7, easeInOut(shatterT)); // ดึงกล้องออกตอนระเบิด
    }
  });

  const assembleProgress = clamp((elapsed - ASSEMBLE_START) / (ASSEMBLE_END - ASSEMBLE_START), 0, 1);
  const shatterProgress = clamp((elapsed - SHATTER_START) / (SHATTER_END - SHATTER_START), 0, 1);
  const pulseProgress = clamp((elapsed - PULSE_START) / (PULSE_END - PULSE_START), 0, 1);

  const phase = elapsed < ASSEMBLE_END ? 'assembling' : elapsed < PULSE_END ? 'pulsing' : elapsed < SHATTER_END ? 'shattering' : 'done';

  const pulseIntensity = phase === 'pulsing' ? Math.sin(pulseProgress * Math.PI * 3) * 0.5 + 0.5 : 0;

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005; // หมุนเร็วขึ้นนิดนึง
      groupRef.current.rotation.x += 0.002;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y -= 0.008; // ออร่าหมุนสวนทาง
      wireframeRef.current.rotation.z += 0.004;
    }
  });

  return (
    <>
      <spotLight position={[5, 5, 5]} intensity={150} color="#e0f2fe" angle={0.4} penumbra={0.5} />
      <spotLight position={[-5, -5, -5]} intensity={50} color="#3b82f6" angle={0.5} penumbra={0.8} />
      <ambientLight intensity={0.1} color="#0f172a" />

      <group ref={groupRef}>
        {phase !== 'done' && (
          <mesh ref={wireframeRef} scale={phase === 'shattering' ? 1 + shatterProgress * 2 : 1.2}>
            <icosahedronGeometry args={[1, 1]} />
            <meshBasicMaterial
              color="#0ea5e9"
              wireframe
              transparent
              opacity={phase === 'shattering' ? lerp(0.15, 0, shatterProgress) : 0.15}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        )}

        {pieces.map((p) => (
          <Shard
            key={p.faceIndex}
            {...p}
            totalFaces={PIECE_COUNT}
            phase={phase as ShardProps['phase']}
            assembleProgress={assembleProgress}
            shatterProgress={shatterProgress}
            pulseIntensity={pulseIntensity}
          />
        ))}

        <DustParticles shatterProgress={shatterProgress} active={phase === 'shattering' || phase === 'done'} />
      </group>

      {/* Post Processing โหดๆ */}
      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={0.5} mipmapBlur intensity={1.5} />

        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={new THREE.Vector2(
            phase === 'shattering' ? shatterProgress * 0.02 : 0,
            phase === 'shattering' ? shatterProgress * 0.02 : 0
          )}
        />

        {/* @ts-expect-error: @react-three/postprocessing type definition bug */}
        <Noise
          premultiply
          blendFunction={BlendFunction.SOFT_LIGHT}
        />
      </EffectComposer>
    </>
  );
}

// ─── Public component ──────────────────────────────────────────────────────────
export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(true);
  const [sceneReady, setSceneReady] = useState(false);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setSceneReady(true), 80);
    return () => clearTimeout(t);
  }, []);

  // วงจรของตัวเลขเปอร์เซ็นต์
  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const updateCounter = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const currentPercent = Math.min(Math.floor((progress / 3600) * 100), 100); // ให้เต็ม 100 ตอนจบช่วง Pulse

      setPercent(currentPercent);

      if (currentPercent < 100) {
        animationFrame = requestAnimationFrame(updateCounter);
      }
    };

    animationFrame = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const handleDone = () => {
    setTimeout(() => setVisible(false), 400);
    setTimeout(onComplete, 1100);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: sceneReady ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#050505', // ดำสนิทเพื่อให้ Bloom ชัดเจน
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ width: '100vw', height: '100vh', position: 'absolute', inset: 0 }}>
            <Canvas camera={{ position: [0, 0, 6], fov: 50 }} gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }} dpr={[1, 1.5]}>
              <Scene onDone={handleDone} />
            </Canvas>
          </div>

          {/* Digital Tech Counter */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: percent === 100 ? 0 : 1, scale: percent === 100 ? 1.1 : 1 }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'absolute',
              bottom: '10%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              pointerEvents: 'none',
            }}
          >
            {/* 1. แก้ไขส่วนตัวเลข % */}
            <div style={{
              fontFamily: 'monospace',
              fontSize: '1.1rem',
              color: '#38bdf8',
              letterSpacing: '0.05em',
              textShadow: '0 0 10px rgba(56,189,248,0.5)',
              fontVariantNumeric: 'tabular-nums', // ทำให้ตัวเลขแต่ละตัวมีความกว้างเท่ากันเป๊ะเวลาวิ่ง
              marginLeft: '0.05em', // ชดเชย letterSpacing ของตัวเลข
            }}>
              {percent.toString().padStart(2, '0')}%
            </div>

            {/* หลอดพลังงาน */}
            <div style={{
              marginTop: '8px',
              width: '100px',
              height: '1px',
              background: 'rgba(255,255,255,0.1)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <motion.div
                style={{ height: '100%', background: '#38bdf8', boxShadow: '0 0 8px #38bdf8' }}
                animate={{ width: `${percent}%` }}
                transition={{ ease: "linear", duration: 0.1 }}
              />
            </div>

            {/* 2. แก้ไขข้อความ Loading */}
            <motion.div
              style={{
                marginTop: '12px',
                fontFamily: 'monospace',
                fontSize: '0.65rem',
                color: '#38bdf8',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                marginRight: '-0.3em', // <-- จุดสำคัญ: ตัดระยะห่างส่วนเกินหลังตัว G ออกเพื่อให้ตรงกึ่งกลางพอดี
              }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              Loading
            </motion.div>
          </motion.div>

          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.8) 100%)',
            pointerEvents: 'none',
          }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}