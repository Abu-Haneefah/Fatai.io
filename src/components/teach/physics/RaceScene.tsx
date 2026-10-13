"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useThreeScene } from "@/lib/teach/useThreeScene";
import { projectLabels, type LabelRefs } from "@/lib/teach/htmlLabels";
import { SceneFallback } from "@/components/teach/SceneErrorBoundary";
import { createBoy, type Boy } from "./Boy";
import { Play, RotateCcw } from "lucide-react";

// Both boys: F = 30 N, s = 6 m, so W = 180 J
const FORCE = 30;
const DIST = 6;
const WORK = FORCE * DIST; // 180 J
const SPEED_A = 1; // m/s -> 6 s -> P = 30 W
const SPEED_B = 3; // m/s -> 2 s -> P = 90 W
const LANE_A_Z = -2.2;
const LANE_B_Z = 2.2;
const BOY_OFFSET = 1.2;

export const RaceScene: React.FC = () => {
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
    cameraPosition: [3, 6.5, 13],
    cameraTarget: [3, 1.2, 0],
  });

  // Race state
  const [isRacing, setIsRacing] = useState(false);
  const [timeA, setTimeA] = useState(0);
  const [timeB, setTimeB] = useState(0);
  const [doneA, setDoneA] = useState(false);
  const [doneB, setDoneB] = useState(false);

  const racingRef = useRef(false);
  const travelARef = useRef(0);
  const travelBRef = useRef(0);
  const accARef = useRef(0);
  const accBRef = useRef(0);
  const doneARef = useRef(false);
  const doneBRef = useRef(false);

  const boyARef = useRef<Boy | null>(null);
  const boyBRef = useRef<Boy | null>(null);
  const crateARef = useRef<THREE.Mesh | null>(null);
  const crateBRef = useRef<THREE.Mesh | null>(null);

  // HTML labels (lane names + finish marker)
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
      new THREE.PlaneGeometry(22, 10),
      new THREE.MeshStandardMaterial({ color: 0xd9dee6, roughness: 0.95 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Start line (green) and finish line (dark) at 6 m
    const startLine = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 0.03, 8),
      new THREE.MeshBasicMaterial({ color: 0x22c55e })
    );
    startLine.position.set(0, 0.015, 0);
    scene.add(startLine);

    const finishLine = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 0.03, 8),
      new THREE.MeshBasicMaterial({ color: 0x1f2937 })
    );
    finishLine.position.set(DIST, 0.015, 0);
    scene.add(finishLine);

    // Lane labels (HTML overlays) + finish label
    anchorsRef.current.laneA = new THREE.Vector3(1.5, 3.0, LANE_A_Z);
    anchorsRef.current.laneB = new THREE.Vector3(1.5, 3.0, LANE_B_Z);
    anchorsRef.current.finish = new THREE.Vector3(DIST, 0.35, 4.4);

    // Boys (blue = slow, orange = fast)
    const boyA = createBoy(0x3b82f6);
    boyA.group.rotation.y = Math.PI / 2;
    boyA.group.position.set(-BOY_OFFSET, 0, LANE_A_Z);
    scene.add(boyA.group);
    boyARef.current = boyA;

    const boyB = createBoy(0xf59e0b);
    boyB.group.rotation.y = Math.PI / 2;
    boyB.group.position.set(-BOY_OFFSET, 0, LANE_B_Z);
    scene.add(boyB.group);
    boyBRef.current = boyB;

    // Identical crates
    const crateGeo = new THREE.BoxGeometry(1.2, 1.2, 1.2);
    const crateMat = new THREE.MeshStandardMaterial({
      color: 0xa16207,
      roughness: 0.8,
    });
    const crateA = new THREE.Mesh(crateGeo, crateMat);
    crateA.position.set(0, 0.6, LANE_A_Z);
    crateA.castShadow = true;
    scene.add(crateA);
    crateARef.current = crateA;

    const crateB = new THREE.Mesh(crateGeo.clone(), crateMat.clone());
    crateB.position.set(0, 0.6, LANE_B_Z);
    crateB.castShadow = true;
    scene.add(crateB);
    crateBRef.current = crateB;

    // ---- Animation loop ----
    let lastTime = performance.now();

    const animate = (now: number) => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      // Pause when the scene is off-screen
      if (!isVisibleRef.current) return;

      const delta = Math.min(0.033, (now - lastTime) / 1000);
      lastTime = now;

      if (racingRef.current) {
        // Boy A (slow): 1 m/s -> finishes in 6 s
        if (!doneARef.current && boyARef.current && crateARef.current) {
          accARef.current += delta;
          travelARef.current = Math.min(DIST, travelARef.current + SPEED_A * delta);
          crateARef.current.position.x = travelARef.current;
          boyARef.current.group.position.x = travelARef.current - BOY_OFFSET;
          boyARef.current.update(delta);
          setTimeA(Math.round(accARef.current * 10) / 10);

          if (travelARef.current >= DIST) {
            doneARef.current = true;
            setDoneA(true);
            setTimeA(DIST / SPEED_A); // exactly 6.0 s
            boyARef.current.setPushing(false);
          }
        }

        // Boy B (fast): 3 m/s -> finishes in 2 s
        if (!doneBRef.current && boyBRef.current && crateBRef.current) {
          accBRef.current += delta;
          travelBRef.current = Math.min(DIST, travelBRef.current + SPEED_B * delta);
          crateBRef.current.position.x = travelBRef.current;
          boyBRef.current.group.position.x = travelBRef.current - BOY_OFFSET;
          boyBRef.current.update(delta);
          setTimeB(Math.round(accBRef.current * 10) / 10);

          if (travelBRef.current >= DIST) {
            doneBRef.current = true;
            setDoneB(true);
            setTimeB(DIST / SPEED_B); // exactly 2.0 s
            boyBRef.current.setPushing(false);
          }
        }

        if (doneARef.current && doneBRef.current) {
          racingRef.current = false;
          setIsRacing(false);
        }
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
  const resetRace = () => {
    racingRef.current = false;
    setIsRacing(false);
    travelARef.current = 0;
    travelBRef.current = 0;
    accARef.current = 0;
    accBRef.current = 0;
    doneARef.current = false;
    doneBRef.current = false;
    setTimeA(0);
    setTimeB(0);
    setDoneA(false);
    setDoneB(false);

    if (crateARef.current) crateARef.current.position.x = 0;
    if (crateBRef.current) crateBRef.current.position.x = 0;
    if (boyARef.current) {
      boyARef.current.group.position.x = -BOY_OFFSET;
      boyARef.current.setPushing(false);
    }
    if (boyBRef.current) {
      boyBRef.current.group.position.x = -BOY_OFFSET;
      boyBRef.current.setPushing(false);
    }
  };

  const handleRace = () => {
    if (racingRef.current) return;
    if (doneARef.current && doneBRef.current) resetRace(); // restart a finished race
    racingRef.current = true;
    setIsRacing(true);
    boyARef.current?.setPushing(true);
    boyBRef.current?.setPushing(true);
  };

  const bothDone = doneA && doneB;

  if (hasError) {
    return <SceneFallback />;
  }

  return (
    <div className="relative w-full h-full min-h-[360px] bg-gradient-to-b from-sky-900 to-slate-950 flex flex-col justify-end">
      {/* 3D canvas */}
      <div
        ref={containerRef}
        role="img"
        aria-label="3D scene: two boys pushing identical crates the same 6 metres in different times. Boy A takes 6 seconds, Boy B takes 2 seconds."
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* HTML labels (projected from 3D each frame) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          ref={setLabel("laneA")}
          className="absolute -translate-x-1/2 -translate-y-1/2 text-[11px] font-mono font-bold text-white bg-blue-600/95 px-2 py-1 rounded shadow whitespace-nowrap"
        >
          Boy A (slow)
        </div>
        <div
          ref={setLabel("laneB")}
          className="absolute -translate-x-1/2 -translate-y-1/2 text-[11px] font-mono font-bold text-slate-950 bg-orange-400/95 px-2 py-1 rounded shadow whitespace-nowrap"
        >
          Boy B (fast)
        </div>
        <div
          ref={setLabel("finish")}
          className="absolute -translate-x-1/2 -translate-y-1/2 text-[11px] font-mono font-bold text-slate-800 bg-white/85 px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap"
        >
          6 m &mdash; finish
        </div>
      </div>

      {/* Timers, results and final message */}
      <div className="absolute top-3 left-3 z-10 w-[240px] space-y-2">
        {/* Boy A card */}
        <div className="bg-slate-950/85 backdrop-blur border border-slate-800 rounded-xl p-3 font-mono text-xs shadow-xl space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-blue-400 font-bold">Boy A (slow)</span>
            <span className="text-slate-300">
              t ={" "}
              <span className="text-white font-bold">
                {timeA.toFixed(1)} s
              </span>
            </span>
          </div>
          {doneA ? (
            <div className="text-[11px] bg-blue-950/70 border border-blue-500/40 rounded-lg p-2 text-blue-200">
              W = 180 J, t = 6.0 s, P ={" "}
              <span className="text-blue-400 font-bold">30 W</span>
            </div>
          ) : (
            <div className="text-[11px] text-slate-500">
              {isRacing ? "pushing..." : "waiting for Race!"}
            </div>
          )}
        </div>

        {/* Boy B card */}
        <div className="bg-slate-950/85 backdrop-blur border border-slate-800 rounded-xl p-3 font-mono text-xs shadow-xl space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-orange-400 font-bold">Boy B (fast)</span>
            <span className="text-slate-300">
              t ={" "}
              <span className="text-white font-bold">
                {timeB.toFixed(1)} s
              </span>
            </span>
          </div>
          {doneB ? (
            <div className="text-[11px] bg-orange-950/70 border border-orange-500/40 rounded-lg p-2 text-orange-200">
              W = 180 J, t = 2.0 s, P ={" "}
              <span className="text-orange-400 font-bold">90 W</span>
            </div>
          ) : (
            <div className="text-[11px] text-slate-500">
              {isRacing ? "pushing..." : "waiting for Race!"}
            </div>
          )}
        </div>

        {/* Final message */}
        {bothDone && (
          <div className="bg-gradient-to-r from-blue-600 to-orange-500 text-white text-xs font-bold p-3 rounded-xl shadow-2xl leading-snug">
            Same work, but the faster boy has more power.
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="relative z-10 p-4 bg-slate-950/90 backdrop-blur border-t border-slate-800 flex flex-col md:flex-row md:items-center gap-4 justify-between">
        <p className="font-mono text-xs text-slate-400">
          Both: F = 30 N, s = 6 m &rarr;{" "}
          <span className="text-white font-bold">W = 180 J</span> &nbsp;
          <span className="text-blue-400">A: 180 &divide; 6 = 30 W</span>{" "}
          &nbsp;
          <span className="text-orange-400">B: 180 &divide; 2 = 90 W</span>
        </p>

        <div className="flex items-center gap-2.5">
          <button
            onClick={resetRace}
            className="min-h-[44px] w-11 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center justify-center transition-colors"
            title="Reset"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={handleRace}
            disabled={isRacing}
            className="min-h-[44px] px-6 py-2.5 rounded-xl bg-[#f59e0b] hover:bg-orange-400 text-slate-950 font-bold text-sm flex items-center gap-2 transition-colors disabled:opacity-50 shadow-lg shadow-orange-500/25"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>{isRacing ? "Racing..." : "Race!"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

