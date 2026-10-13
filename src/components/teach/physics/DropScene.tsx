"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useThreeScene } from "@/lib/teach/useThreeScene";
import { projectLabels, type LabelRefs } from "@/lib/teach/htmlLabels";
import { SceneFallback } from "@/components/teach/SceneErrorBoundary";
import { Play, RotateCcw } from "lucide-react";

const G = 10; // m/s^2 (simplified)
const M = 1; // kg (simplified)
const BALL_R = 0.4;

export const DropScene: React.FC = () => {
  const {
    containerRef,
    sceneRef,
    rendererRef,
    cameraRef,
    isReady,
    animFrameIdRef,
    isVisibleRef,
    hasError,
  } = useThreeScene({
    cameraPosition: [2, 6, 16],
    cameraTarget: [-0.5, 5, 0],
  });

  // Controls
  const [height, setHeight] = useState(5); // 1 .. 10 m
  const [isFalling, setIsFalling] = useState(false);

  // Live energy readout
  const [pe, setPe] = useState(M * G * 5); // starts fully potential
  const [ke, setKe] = useState(0);

  // Live mirrors for the loop
  const heightRef = useRef(height);
  heightRef.current = height;
  const fallingRef = useRef(false);
  const yRef = useRef(height + BALL_R);
  const vRef = useRef(0);
  const totalRef = useRef(M * G * height);

  // 3D objects
  const ballRef = useRef<THREE.Mesh | null>(null);

  // HTML labels (height ruler + live height beside the ball)
  const labelRefs = useRef<LabelRefs>({});
  const anchorsRef = useRef<Record<string, THREE.Vector3>>({});
  const setLabel = (key: string) => (el: HTMLDivElement | null) => {
    labelRefs.current[key] = el;
  };

  const resetToTop = (targetHeight: number, falling: boolean) => {
    vRef.current = 0;
    yRef.current = targetHeight + BALL_R;
    totalRef.current = M * G * targetHeight;
    fallingRef.current = falling;
    setIsFalling(falling);
    setPe(Math.round(totalRef.current * 10) / 10);
    setKe(0);
    if (ballRef.current) ballRef.current.position.y = yRef.current;
  };

  // Build the scene once
  useEffect(() => {
    if (!isReady || !sceneRef.current) return;
    const scene = sceneRef.current;

    // Light-coloured flat ground
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(14, 8),
      new THREE.MeshStandardMaterial({ color: 0xd9dee6, roughness: 0.95 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Height ruler on the side (ticks every 1 m, labels are HTML overlays)
    const rulerMat = new THREE.MeshBasicMaterial({ color: 0x475569 });
    const pole = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 10.4, 0.08),
      rulerMat
    );
    pole.position.set(-2.5, 5.2, 0);
    scene.add(pole);

    for (let m = 0; m <= 10; m += 1) {
      const tick = new THREE.Mesh(
        new THREE.BoxGeometry(0.45, 0.03, 0.06),
        rulerMat
      );
      tick.position.set(-2.28, m, 0);
      scene.add(tick);
      anchorsRef.current[`h${m}`] = new THREE.Vector3(-3.15, m, 0);
    }

    // The ball
    const ball = new THREE.Mesh(
      new THREE.SphereGeometry(BALL_R, 28, 22),
      new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.4 })
    );
    ball.position.set(0, yRef.current, 0);
    ball.castShadow = true;
    scene.add(ball);
    ballRef.current = ball;
    anchorsRef.current.hb = new THREE.Vector3(0.9, yRef.current, 0);

    // ---- Animation loop ----
    let lastTime = performance.now();

    const animate = (now: number) => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      // Pause when the scene is off-screen
      if (!isVisibleRef.current) return;

      const delta = Math.min(0.02, (now - lastTime) / 1000);
      lastTime = now;

      if (fallingRef.current && ballRef.current) {
        // v += g * delta, then y -= v * delta (simple Euler integration)
        vRef.current += G * delta;
        yRef.current -= vRef.current * delta;

        if (yRef.current <= BALL_R) {
          yRef.current = BALL_R;
          vRef.current = 0;
          fallingRef.current = false;
          setIsFalling(false);
        }

        ballRef.current.position.y = yRef.current;

        const h = Math.max(0, yRef.current - BALL_R);
        const currentPE = M * G * h;
        const currentKE = 0.5 * M * vRef.current * vRef.current;
        setPe(Math.round(currentPE * 10) / 10);
        setKe(Math.round(currentKE * 10) / 10);
      }

      // Live height label follows the ball
      if (anchorsRef.current.hb && ballRef.current) {
        anchorsRef.current.hb.set(0.9, ballRef.current.position.y, 0);
      }

      const renderer = rendererRef.current;
      const camera = cameraRef.current;
      if (renderer && camera) {
        projectLabels(
          labelRefs.current,
          anchorsRef.current,
          camera,
          renderer.domElement.clientWidth,
          renderer.domElement.clientHeight
        );
      }
    };

    animate(performance.now());
  }, [isReady, sceneRef, animFrameIdRef, isVisibleRef, rendererRef, cameraRef]);

  // ---- Controls ----
  const handleDrop = () => {
    resetToTop(heightRef.current, true);
  };

  const handleReset = () => {
    resetToTop(heightRef.current, false);
  };

  const changeHeight = (value: number) => {
    setHeight(value);
    heightRef.current = value;
    if (!fallingRef.current) resetToTop(value, false);
  };

  // Bars are normalised so PE + KE always fills the same total bar
  const sum = Math.max(0.001, pe + ke);
  const pePct = (pe / sum) * 100;
  const kePct = (ke / sum) * 100;

  if (hasError) {
    return <SceneFallback />;
  }

  return (
    <div className="relative w-full h-full min-h-[360px] bg-gradient-to-b from-sky-900 to-slate-950 flex flex-col justify-end">
      {/* 3D canvas */}
      <div
        ref={containerRef}
        role="img"
        aria-label="3D scene: a ball held above the ground beside a height ruler, with live potential and kinetic energy bars. Choose a height and press Drop."
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* HTML labels (projected from 3D each frame) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 11 }, (_, m) => (
          <div
            key={`h${m}`}
            ref={setLabel(`h${m}`)}
            className="absolute -translate-x-1/2 -translate-y-1/2 text-[11px] font-mono font-bold text-slate-800 bg-white/85 px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap"
          >
            {m === 10 ? "10 m" : m}
          </div>
        ))}
        <div
          ref={setLabel("hb")}
          className="absolute -translate-x-1/2 -translate-y-1/2 text-[11px] font-mono font-bold text-white bg-red-500/95 px-2 py-0.5 rounded shadow whitespace-nowrap"
        >
          h = {(pe / (M * G)).toFixed(1)} m
        </div>
      </div>

      {/* Live energy bars */}
      <div className="absolute top-3 left-3 z-10 bg-slate-950/85 backdrop-blur border border-slate-800 rounded-2xl p-4 shadow-xl w-[250px] space-y-3">
        <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
          Energy bars (m = 1 kg, g = 10 m/s&sup2;)
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-sky-300 font-bold">PE = mgh</span>
            <span className="text-sky-300 font-bold">{pe.toFixed(1)} J</span>
          </div>
          <div className="h-4 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-sky-500 transition-[width] duration-75"
              style={{ width: `${pePct}%` }}
            />
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-orange-400 font-bold">
              KE = &frac12;mv&sup2;
            </span>
            <span className="text-orange-400 font-bold">{ke.toFixed(1)} J</span>
          </div>
          <div className="h-4 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-orange-500 transition-[width] duration-75"
              style={{ width: `${kePct}%` }}
            />
          </div>
        </div>

        <p className="text-[11px] text-slate-400 border-t border-slate-800 pt-2">
          PE + KE stays the same.
        </p>
      </div>

      {/* Controls */}
      <div className="relative z-10 p-4 bg-slate-950/90 backdrop-blur border-t border-slate-800 flex flex-col md:flex-row md:items-center gap-4 justify-between">
        <div className="space-y-1">
          <div className="flex justify-between text-xs font-semibold text-slate-300 gap-4">
            <span>Height</span>
            <span className="font-mono text-sky-400">{height} m</span>
          </div>
          <input
            type="range"
            min={1}
            max={10}
            step={1}
            value={height}
            onChange={(e) => changeHeight(Number(e.target.value))}
            disabled={isFalling}
            aria-label="Drop height in metres"
            className="teach-range w-64 sm:w-80"
            style={{ "--range-thumb": "#3b82f6" } as React.CSSProperties}
          />
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleReset}
            className="min-h-[44px] w-11 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center justify-center transition-colors"
            title="Reset ball to the top"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={handleDrop}
            disabled={isFalling}
            className="min-h-[44px] px-6 py-2.5 rounded-xl bg-[#3b82f6] hover:bg-blue-500 text-white font-bold text-sm flex items-center gap-2 transition-colors disabled:opacity-50 shadow-lg shadow-blue-500/25"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>{isFalling ? "Falling..." : "Drop"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

