"use client";

import React from "react";
import { MonitorX } from "lucide-react";

interface SceneFallbackProps {
  title?: string;
}

/**
 * Friendly fallback shown when WebGL / Three.js is unavailable so a graphics
 * failure can never break a live presentation.
 * (Spec: "3D unavailable, showing static diagram")
 */
export const SceneFallback: React.FC<SceneFallbackProps> = ({
  title = "3D unavailable, showing static diagram",
}) => (
  <div
    role="alert"
    className="w-full h-full min-h-[300px] flex flex-col items-center justify-center gap-4 p-6 bg-slate-950 text-center"
  >
    {/* Simple static SVG diagram as the offline/text alternative */}
    <svg
      viewBox="0 0 260 130"
      className="w-full max-w-xs"
      aria-hidden="true"
    >
      <defs>
        <marker
          id="scene-fallback-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
        </marker>
      </defs>
      <rect x="0" y="0" width="260" height="130" rx="14" fill="#0f172a" />
      {[30, 60, 90, 120, 150, 180, 210].map((x) => (
        <line
          key={x}
          x1={x}
          y1="100"
          x2={x}
          y2="110"
          stroke="#334155"
          strokeWidth="2"
        />
      ))}
      <line x1="20" y1="105" x2="240" y2="105" stroke="#475569" strokeWidth="3" />
      <rect x="55" y="65" width="40" height="40" rx="6" fill="#3b82f6" />
      <line
        x1="100"
        y1="70"
        x2="175"
        y2="70"
        stroke="#38bdf8"
        strokeWidth="5"
        markerEnd="url(#scene-fallback-arrow)"
      />
      <text
        x="130"
        y="58"
        textAnchor="middle"
        fill="#7dd3fc"
        fontSize="12"
        fontFamily="monospace"
      >
        F
      </text>
      <text
        x="75"
        y="125"
        textAnchor="middle"
        fill="#94a3b8"
        fontSize="10"
        fontFamily="monospace"
      >
        static diagram
      </text>
    </svg>

    <div className="space-y-1">
      <p className="flex items-center justify-center gap-2 text-sm font-bold text-amber-400">
        <MonitorX className="w-4 h-4" />
        {title}
      </p>
      <p className="text-xs text-slate-500 max-w-xs">
        The interactive simulation could not start on this device. The lesson
        continues with this diagram.
      </p>
    </div>
  </div>
);

interface SceneErrorBoundaryState {
  hasError: boolean;
}

/** Catches render-time crashes inside dynamically imported Three.js scenes. */
export class SceneErrorBoundary extends React.Component<
  { children: React.ReactNode },
  SceneErrorBoundaryState
> {
  state: SceneErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): SceneErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: unknown): void {
    console.error("3D scene crashed:", error);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return <SceneFallback />;
    }
    return this.props.children;
  }
}
