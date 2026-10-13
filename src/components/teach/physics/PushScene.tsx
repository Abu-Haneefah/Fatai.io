"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useThreeScene } from "@/lib/teach/useThreeScene";
import {
  projectLabels,
  type LabelRefs,
} from "@/lib/teach/htmlLabels";
import { SceneFallback } from "@/components/teach/SceneErrorBoundary";
import { createBoy, type Boy } from "./Boy";
import { Play, RotateCcw } from "lucide-react";

const RULER_MAX = 10; // 0 .. 10 m
const PUSH_SPEED = 2; // m/s, constant
const BOY_OFFSET = 1.2; // boy stands this far behind the load
const WALL_X = 3;

export const PushScene: React.FC = () => {
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
    cameraPosition: [3, 5.5, 13],
    cameraTarget: [4.5, 1, 0],
  });

  // Controls (sliders)
  const [force, setForce] = useState(20); // 10 .. 50 N
  const [distance, setDistance] = useState(5); // 1 .. 10 m

  // Live state
  const [isPushing, setIsPushing] = useState(false);
  const [isWallMode, setIsWallMode] = useState(false);
  const [traveled, setTraveled] = useState(0);
  const [work, setWork] = useState(0);

  // Live mirrors for the animation loop
  const forceRef = useRef(force);
  forceRef.current = force;
  const distanceRef = useRef(distance);
  distanceRef.current = distance;
  const pushingRef = useRef(false);
  const wallModeRef = useRef(false);
  const traveledRef = useRef(0);

  // 3D objects
  const boyRef = useRef<Boy | null>(null);
  const crateRef = useRef<THREE.Mesh | null>(null);
  const wallRef = useRef<THREE.Mesh | null>(null);
  const arrowRef = useRef<THREE.ArrowHelper | null>(null);

  // HTML overlays (numbers + LOAD label), projected from 3D anchors each frame
  const labelRefs = useRef<LabelRefs>({});
  const anchorsRef = useRef<Record<string, THREE.Vector3>>({});
  const setLabel = (key: string) => (el: HTMLDivElement | null) => {
    labelRefs.current[key] = el;
  };

  // Build the scene once
  useEffect(() => {
    if (!isReady || !sceneRef.current) return;
    const scene = sceneRef.current;

    // Light-coloured flat ground
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(30, 10),
      new THREE.MeshStandardMaterial({ color: 0xd9dee6, roughness: 0.95 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Green start line at 0 m
    const startLine = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 0.03, 7),
      new THREE.MeshBasicMaterial({ color: 0x22c55e })
    );
    startLine.position.set(0, 0.015, 0);
    scene.add(startLine);

    // Distance ruler: baseline + tick every 1 m, labels are HTML overlays
    const rulerMat = new THREE.MeshBasicMaterial({ color: 0x475569 });
    const baseline = new THREE.Mesh(
      new THREE.BoxGeometry(RULER_MAX + 0.4, 0.02, 0.06),
      rulerMat
    );
    baseline.position.set(RULER_MAX / 2, 0.012, 2.4);
    scene.add(baseline);

    for (let m = 0; m <= RULER_MAX; m += 1) {
      const tick = new THREE.Mesh(
        new THREE.BoxGeometry(0.05, 0.02, m % 5 === 0 ? 0.6 : 0.35),
        rulerMat
      );
      tick.position.set(m, 0.013, 2.4);
      scene.add(tick);

      anchorsRef.current[`r${m}`] = new THREE.Vector3(m, 0.12, 3.05);
    }

    // The boy (push pose while pushing, standing when stopped)
    const boy = createBoy(0x3b82f6);
    boy.group.rotation.y = Math.PI / 2; // face +x (direction of travel)
    boy.group.position.set(-BOY_OFFSET, 0, 0);
    scene.add(boy.group);
    boyRef.current = boy;

    // Wooden crate ("LOAD")
    const crate = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 1.2, 1.2),
      new THREE.MeshStandardMaterial({ color: 0xa16207, roughness: 0.8 })
    );
    crate.position.set(0, 0.6, 0);
    crate.castShadow = true;
    crate.receiveShadow = true;
    scene.add(crate);
    crateRef.current = crate;
    anchorsRef.current.load = new THREE.Vector3(0, 1.5, 0);

    // Wall (hidden until "Push the wall" is toggled)
    const wall = new THREE.Mesh(
      new THREE.BoxGeometry(0.6, 3, 4),
      new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.9 })
    );
    wall.position.set(WALL_X, 1.5, 0);
    wall.castShadow = true;
    wall.visible = false;
    scene.add(wall);
    wallRef.current = wall;

    // Green force arrow (length grows with the force)
    const arrow = new THREE.ArrowHelper(
      new THREE.Vector3(1, 0, 0),
      new THREE.Vector3(-0.75, 1.5, 0),
      2,
      0x22c55e,
      0.45,
      0.28
    );
    scene.add(arrow);
    arrowRef.current = arrow;

    // ---- Animation loop ----
    let lastTime = performance.now();

    const animate = (now: number) => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      // Pause when the scene is off-screen
      if (!isVisibleRef.current) return;

      const delta = Math.min(0.033, (now - lastTime) / 1000);
      lastTime = now;

      const baseLength = 1.5 + (forceRef.current / 50) * 2;

      if (wallModeRef.current) {
        // Boy strains in place: arrow pulses, nobody moves
        arrow.position.set(WALL_X - 1.9, 2.1, 0);
        arrow.setLength(
          baseLength * (1 + 0.3 * Math.sin(now * 0.006)),
          0.45,
          0.28
        );
        boy.update(delta, 3); // slow, straining steps
      } else if (crateRef.current && boyRef.current) {
        // Force arrow floats just above/behind the crate, pointing forward
        arrow.position.set(crateRef.current.position.x - 0.75, 1.5, 0);
        arrow.setLength(baseLength, 0.45, 0.28);

        if (pushingRef.current) {
          traveledRef.current = Math.min(
            distanceRef.current,
            traveledRef.current + PUSH_SPEED * delta
          );
          crateRef.current.position.x = traveledRef.current;
          boyRef.current.group.position.x = traveledRef.current - BOY_OFFSET;
          boy.update(delta);

          // Live readout (updates every frame while pushing)
          setTraveled(Math.round(traveledRef.current * 10) / 10);
          setWork(
            Math.round(forceRef.current * traveledRef.current * 10) / 10
          );

          if (traveledRef.current >= distanceRef.current) {
            pushingRef.current = false;
            setIsPushing(false);
            boy.setPushing(false);
          }
        } else {
          boy.update(delta);
        }
      }

      // LOAD label follows the crate (hidden while the wall is up)
      const loadEl = labelRefs.current.load;
      if (loadEl) loadEl.style.display = wallModeRef.current ? "none" : "block";
      if (!wallModeRef.current && anchorsRef.current.load && crateRef.current) {
        anchorsRef.current.load.set(
          crateRef.current.position.x,
          1.55,
          0
        );
      }

      // Project the HTML number labels onto the canvas
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
  const resetRun = () => {
    pushingRef.current = false;
    traveledRef.current = 0;
    setIsPushing(false);
    setTraveled(0);
    setWork(0);
    boyRef.current?.setPushing(false);
    if (!wallModeRef.current) {
      if (crateRef.current) crateRef.current.position.x = 0;
      if (boyRef.current) boyRef.current.group.position.x = -BOY_OFFSET;
    }
  };

  const handlePush = () => {
    if (wallModeRef.current || pushingRef.current) return;
    if (traveledRef.current >= distanceRef.current) {
      // Finished the previous run: start again from 0
      traveledRef.current = 0;
      setTraveled(0);
      setWork(0);
      if (crateRef.current) crateRef.current.position.x = 0;
      if (boyRef.current) boyRef.current.group.position.x = -BOY_OFFSET;
    }
    pushingRef.current = true;
    setIsPushing(true);
    boyRef.current?.setPushing(true);
  };

  const changeForce = (value: number) => {
    setForce(value);
    if (!pushingRef.current) resetRun();
  };

  const changeDistance = (value: number) => {
    setDistance(value);
    if (!pushingRef.current) resetRun();
  };

  const toggleWall = () => {
    if (pushingRef.current) return;
    const next = !wallModeRef.current;
    wallModeRef.current = next;
    setIsWallMode(next);
    resetRun();

    if (crateRef.current) crateRef.current.visible = !next;
    if (wallRef.current) wallRef.current.visible = next;
    if (boyRef.current) {
      boyRef.current.group.position.x = next
        ? WALL_X - BOY_OFFSET
        : -BOY_OFFSET;
      boyRef.current.setPushing(next); // strains in place while the wall is up
    }
  };

  const displayDistance = isWallMode ? 0 : traveled;
  const displayWork = isWallMode ? 0 : work;

  if (hasError) {
    return <SceneFallback />;
  }

  return (
    <div className="relative w-full h-full min-h-[360px] bg-gradient-to-b from-sky-900 to-slate-950 flex flex-col justify-end">
      {/* 3D canvas */}
      <div
        ref={containerRef}
        role="img"
        aria-label="3D scene: a boy pushing a wooden crate along a measured floor, with a green force arrow. Use the sliders to set force and distance, then press Push."
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* HTML number labels (projected from 3D each frame) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: RULER_MAX + 1 }, (_, m) => (
          <div
            key={`r${m}`}
            ref={setLabel(`r${m}`)}
            className="absolute -translate-x-1/2 -translate-y-1/2 text-[11px] font-mono font-bold text-slate-800 bg-white/85 px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap"
          >
            {m === RULER_MAX ? `${m} m` : m}
          </div>
        ))}
        <div
          ref={setLabel("load")}
          className="absolute -translate-x-1/2 -translate-y-1/2 text-[11px] font-mono font-bold text-amber-50 bg-amber-700/95 px-2 py-0.5 rounded shadow"
        >
          LOAD
        </div>
      </div>

      {/* Live readout panel */}
      <div className="absolute top-3 left-3 z-10 bg-slate-950/85 backdrop-blur border border-slate-800 rounded-2xl p-4 shadow-xl min-w-[230px] space-y-1 font-mono text-sm">
        <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold pb-1 border-b border-slate-800">
          Live readout
        </div>
        <div className="flex justify-between gap-6">
          <span className="text-slate-400">Force F =</span>
          <span className="text-sky-400 font-bold">{force} N</span>
        </div>
        <div className="flex justify-between gap-6">
          <span className="text-slate-400">Distance s =</span>
          <span className="text-emerald-400 font-bold">
            {displayDistance.toFixed(1)} m
          </span>
        </div>
        <div className="flex justify-between gap-6 pt-1 border-t border-slate-800">
          <span className="text-slate-300">Work W = F &times; s =</span>
          <span className="text-white font-bold text-lg">
            {displayWork.toFixed(1)} J
          </span>
        </div>
        {isWallMode && (
          <p className="text-red-400 font-sans font-semibold text-xs pt-1">
            No movement, so no work: W = 0 J
          </p>
        )}
        {!isWallMode && (
          <p className="text-slate-500 font-sans text-[11px] pt-1">
            Try F = 20 N, s = 5 m &rarr; W = 100 J
          </p>
        )}
      </div>

      {/* Controls */}
      <div className="relative z-10 p-4 bg-slate-950/90 backdrop-blur border-t border-slate-800 flex flex-col md:flex-row md:items-center gap-4 justify-between">
        <div className="flex flex-wrap items-center gap-6">
          {/* Force slider */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-semibold text-slate-300 gap-4">
              <span>Force</span>
              <span className="font-mono text-sky-400">{force} N</span>
            </div>
            <input
              type="range"
              min={10}
              max={50}
              step={1}
              value={force}
              onChange={(e) => changeForce(Number(e.target.value))}
              disabled={isPushing || isWallMode}
              aria-label="Force in newtons"
              className="teach-range w-40"
              style={{ "--range-thumb": "#3b82f6" } as React.CSSProperties}
            />
          </div>

          {/* Distance slider */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-semibold text-slate-300 gap-4">
              <span>Distance</span>
              <span className="font-mono text-orange-400">{distance} m</span>
            </div>
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              value={distance}
              onChange={(e) => changeDistance(Number(e.target.value))}
              disabled={isPushing || isWallMode}
              aria-label="Distance in metres"
              className="teach-range w-40"
              style={{ "--range-thumb": "#f59e0b" } as React.CSSProperties}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={toggleWall}
            disabled={isPushing}
            aria-pressed={isWallMode}
            className={`min-h-[44px] px-4 py-2.5 rounded-xl text-sm font-bold transition-colors disabled:opacity-50 ${
              isWallMode
                ? "bg-red-500 text-white shadow-lg shadow-red-500/25"
                : "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
            }`}
          >
            {isWallMode ? "Pushing a wall..." : "Push the wall"}
          </button>

          <button
            onClick={resetRun}
            disabled={isWallMode}
            className="min-h-[44px] w-11 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center justify-center transition-colors disabled:opacity-50"
            title="Reset"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={handlePush}
            disabled={isPushing || isWallMode}
            className="min-h-[44px] px-6 py-2.5 rounded-xl bg-[#22c55e] hover:bg-green-500 text-slate-950 font-bold text-sm flex items-center gap-2 transition-colors disabled:opacity-50 shadow-lg shadow-green-500/20"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>{isPushing ? "Pushing..." : "Push"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

