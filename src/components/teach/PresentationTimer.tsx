"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Play, Pause, RotateCcw, EyeOff, Clock } from "lucide-react";

interface PresentationTimerProps {
  initialSeconds?: number;
  className?: string;
}

export const PresentationTimer: React.FC<PresentationTimerProps> = ({
  initialSeconds = 180, // 3 minutes
  className = "",
}) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const toggleRun = useCallback(() => {
    setIsRunning((prev) => !prev);
  }, []);

  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setSecondsLeft(initialSeconds);
  }, [initialSeconds]);

  const toggleHidden = useCallback(() => {
    setIsHidden((prev) => !prev);
  }, []);

  // Keyboard shortcuts (T to start/pause, H to hide/show)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input or textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement)?.isContentEditable
      ) {
        return;
      }

      if (e.key === "t" || e.key === "T") {
        e.preventDefault();
        toggleRun();
      } else if (e.key === "h" || e.key === "H") {
        e.preventDefault();
        toggleHidden();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleRun, toggleHidden]);

  // Interval timer
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  // Color coding: red in the last 15 seconds
  let colorStyle = "text-emerald-400 border-emerald-500/40 bg-slate-900/90";
  if (secondsLeft <= 15) {
    colorStyle = "text-red-400 border-red-500/70 bg-red-950/90 animate-pulse";
  }

  if (isHidden) {
    return (
      <button
        onClick={toggleHidden}
        title="Show 3-minute presentation timer (Shortcut: H)"
        className="fixed top-16 right-4 z-50 p-2.5 rounded-full bg-slate-900/85 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 shadow-lg backdrop-blur-md transition-all font-mono text-xs flex items-center gap-1.5 min-h-[44px]"
      >
        <Clock className="w-4 h-4" />
        <span>{formattedTime}</span>
      </button>
    );
  }

  return (
    <div
      className={`fixed top-16 right-4 z-50 flex items-center gap-2 p-2 px-3 rounded-full border shadow-2xl backdrop-blur-md transition-all ${colorStyle} ${className}`}
    >
      <Clock className="w-4 h-4 opacity-80" />
      <span className="font-mono text-sm font-bold tracking-wider select-none">
        {formattedTime}
      </span>

      <div className="flex items-center gap-1 pl-2 border-l border-white/10">
        <button
          onClick={toggleRun}
          title={isRunning ? "Pause Timer (T)" : "Start Timer (T)"}
          className="w-8 h-8 rounded-md hover:bg-white/20 transition-colors flex items-center justify-center"
        >
          {isRunning ? (
            <Pause className="w-3.5 h-3.5 text-white" />
          ) : (
            <Play className="w-3.5 h-3.5 text-white" />
          )}
        </button>

        <button
          onClick={resetTimer}
          title="Reset Timer to 3:00"
          className="w-8 h-8 rounded-md hover:bg-white/20 transition-colors flex items-center justify-center"
        >
          <RotateCcw className="w-3.5 h-3.5 text-white" />
        </button>

        <button
          onClick={toggleHidden}
          title="Hide Timer (H)"
          className="w-8 h-8 rounded-md hover:bg-white/20 transition-colors flex items-center justify-center"
        >
          <EyeOff className="w-3.5 h-3.5 text-white" />
        </button>
      </div>
    </div>
  );
};
