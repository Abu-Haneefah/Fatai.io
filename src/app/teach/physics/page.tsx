"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { SlideDeck, SlideData } from "@/components/teach/SlideDeck";
import { SceneErrorBoundary } from "@/components/teach/SceneErrorBoundary";
import { CheckCircle2 } from "lucide-react";

// Three.js scenes: client-side only (ssr: false)
const sceneLoading = () => (
  <div className="w-full h-full flex items-center justify-center bg-slate-950 text-slate-500 font-mono text-xs">
    Loading 3D scene...
  </div>
);

const PushScene = dynamic(
  () =>
    import("@/components/teach/physics/PushScene").then((m) => m.PushScene),
  { ssr: false, loading: sceneLoading }
);

const DropScene = dynamic(
  () =>
    import("@/components/teach/physics/DropScene").then((m) => m.DropScene),
  { ssr: false, loading: sceneLoading }
);

const RaceScene = dynamic(
  () =>
    import("@/components/teach/physics/RaceScene").then((m) => m.RaceScene),
  { ssr: false, loading: sceneLoading }
);

/** Big formula callout used on the lesson slides */
const Formula: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <p
    className={`font-mono font-black text-[#f59e0b] bg-orange-500/10 border border-orange-500/30 rounded-xl px-4 py-3 text-center ${
      className ?? ""
    }`}
  >
    {children}
  </p>
);

/** Slide 5: JAMB 2007 worked example with a "Reveal answer" button */
const Quiz: React.FC = () => {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="bg-blue-950/50 border border-blue-500/40 rounded-2xl p-5 space-y-3">
      <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
        JAMB 2007
      </span>
      <p>
        A boy drags a bag of rice with a force of{" "}
        <strong className="text-sky-400">2 N</strong> at{" "}
        <strong className="text-sky-400">60&deg;</strong> to the floor. Work
        done after <strong className="text-emerald-400">3 m</strong>?
      </p>

      {!revealed ? (
        <button
          onClick={() => setRevealed(true)}
          className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#3b82f6] hover:bg-blue-500 text-white font-bold text-sm transition-colors shadow-lg shadow-blue-500/25"
        >
          Reveal answer
        </button>
      ) : (
        <div className="bg-slate-950/70 border border-slate-700 rounded-xl p-4 font-mono text-sm space-y-1.5 text-slate-200">
          <p>
            <span className="text-slate-500">1.</span> W = F cos&theta; &times; s
          </p>
          <p>
            <span className="text-slate-500">2.</span> = 2 &times; cos60&deg;
            &times; 3
          </p>
          <p>
            <span className="text-slate-500">3.</span> = 2 &times; 0.5 &times; 3
          </p>
          <p className="text-emerald-400 font-bold text-lg pt-1">
            <CheckCircle2 className="inline w-4 h-4 mr-1" />
            = 3 J
          </p>
        </div>
      )}
    </div>
  );
};

/** Slide 6: one-line recap of the three quantities */
const Summary: React.FC = () => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-center space-y-1">
      <span className="text-[11px] uppercase tracking-wider text-blue-400 font-bold">
        Work
      </span>
      <p className="font-mono font-bold text-white">W = F &times; s</p>
    </div>
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-center space-y-1">
      <span className="text-[11px] uppercase tracking-wider text-orange-400 font-bold">
        Energy
      </span>
      <p className="font-mono font-bold text-white">
        &frac12;mv&sup2; and mgh
      </p>
    </div>
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-center space-y-1">
      <span className="text-[11px] uppercase tracking-wider text-emerald-400 font-bold">
        Power
      </span>
      <p className="font-mono font-bold text-white">P = W &divide; t</p>
    </div>
  </div>
);

export default function PhysicsTeachPage() {
  const slides: SlideData[] = [
    // Slide 1: Title (0:20)
    {
      id: "title",
      title: "Work, Energy and Power",
      content: (
        <div className="space-y-4 text-center">
          <p className="text-sm sm:text-base text-slate-400 font-bold">
            Why does pushing a heavy load make you tired?
          </p>
          <p className="text-xs text-slate-500 italic">
            A three-minute micro-lesson for secondary school students
          </p>
        </div>
      ),
      notes:
        "Hello, I'm Jabar Fatai. Today in three minutes: work, energy and power.",
    },

    // Slide 2: WORK (0:45)
    {
      id: "work",
      title: "Work",
      content: (
        <div className="space-y-4 text-left">
          <p className="text-slate-200">
            <strong className="text-white">
              Work is the product of a force and the distance moved in the
              direction of the force.
            </strong>
          </p>
          <Formula>W = F &times; s</Formula>
          <p className="text-slate-200">
            If the force is at an angle:{" "}
            <span className="font-mono">W = F cos&theta; &times; s</span>
          </p>
          <p className="text-xs text-slate-400">Unit: Joules (J)</p>
          <p className="text-[11px] text-slate-500 italic">
            Scene A: the boy pushing the load
          </p>
        </div>
      ),
      scene: (
        <SceneErrorBoundary>
          <PushScene />
        </SceneErrorBoundary>
      ),
      notes:
        "Work is force times distance. Watch the boy push the load. The more "
        + "force, or the longer the distance, the more work is done. If he "
        + "pushes a wall and it doesn't move, the distance is zero, so the "
        + "work is zero.",
    },

    // Slide 3: ENERGY (0:50)
    {
      id: "energy",
      title: "Energy",
      content: (
        <div className="space-y-4 text-left">
          <p className="text-slate-200">
            <strong className="text-white">
              Energy is the capacity to do work.
            </strong>
          </p>
          <Formula>KE = &frac12;mv&sup2;</Formula>
          <p className="text-xs text-slate-400">energy in motion</p>
          <Formula className="bg-sky-500/10 border-sky-500/30 text-sky-300">
            PE = mgh
          </Formula>
          <p className="text-xs text-slate-400">energy at a height</p>
          <p className="text-[11px] text-slate-500 italic">
            Scene B: a ball dropping
          </p>
        </div>
      ),
      scene: (
        <SceneErrorBoundary>
          <DropScene />
        </SceneErrorBoundary>
      ),
      notes:
        "Energy is the ability to do work. At the top the ball has potential "
        + "energy. As it falls, that changes into kinetic energy.",
    },

    // Slide 4: POWER (0:45)
    {
      id: "power",
      title: "Power",
      content: (
        <div className="space-y-4 text-left">
          <p className="text-slate-200">
            <strong className="text-white">
              Power is the rate of doing work.
            </strong>
          </p>
          <Formula>P = W &divide; t</Formula>
          <p className="text-xs text-slate-400">
            also <span className="font-mono">P = F &times; v</span>
          </p>
          <p className="text-xs text-slate-400">
            Unit: Watts (W) &mdash; which is Joules per second.
          </p>
          <p className="text-xs text-slate-400">1 horse power = 746 W</p>
          <p className="text-[11px] text-slate-500 italic">
            Scene C: two boys pushing identical loads
          </p>
        </div>
      ),
      scene: (
        <SceneErrorBoundary>
          <RaceScene />
        </SceneErrorBoundary>
      ),
      notes:
        "Power is how fast the work is done. Both boys do the same work, but "
        + "the faster boy has more power.",
    },

    // Slide 5: Quiz (0:20)
    {
      id: "quiz",
      title: "Quick check",
      content: <Quiz />,
      notes:
        "Try this exam question yourself before I reveal it: 2 times cos 60, "
        + "which is 0.5, times 3, gives 3 joules.",
    },

    // Slide 6: Summary (0:20)
    {
      id: "summary",
      title: "Summary",
      content: <Summary />,
      notes: "To recap: work, energy, power. Thank you for listening.",
    },
  ];

  return <SlideDeck slides={slides} />;
}

