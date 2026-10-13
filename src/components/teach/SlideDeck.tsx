"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  X,
  Maximize,
  Minimize,
} from "lucide-react";
import { PresentationTimer } from "./PresentationTimer";

export interface SlideData {
  id: string;
  title: string;
  content: React.ReactNode;
  scene?: React.ReactNode;
  notes: string;
}

interface SlideDeckProps {
  slides: SlideData[];
  backHref?: string;
}

/**
 * Simple full-screen slide shell for the 3-minute micro-teaching pages.
 *
 * Keyboard: ArrowRight / Space / PageDown = next, ArrowLeft / PageUp = previous,
 * F = fullscreen, N = speaker notes, T = timer, H = hide timer.
 * Opening with ?present=1 enters fullscreen automatically.
 */
export const SlideDeck: React.FC<SlideDeckProps> = ({
  slides,
  backHref = "/teach",
}) => {
  const [index, setIndex] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const total = slides.length;
  const slide = slides[index];

  const nextSlide = useCallback(() => {
    setIndex((i) => (i < total - 1 ? i + 1 : i));
  }, [total]);

  const prevSlide = useCallback(() => {
    setIndex((i) => (i > 0 ? i - 1 : i));
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target?.isContentEditable
      ) {
        return;
      }

      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        nextSlide();
      } else if (
        e.key === "ArrowLeft" ||
        e.key === "PageUp"
      ) {
        e.preventDefault();
        prevSlide();
      } else if (e.key === "f" || e.key === "F") {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === "n" || e.key === "N") {
        e.preventDefault();
        setShowNotes((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide, toggleFullscreen]);

  // Presentation Mode: ?present=1 opens the deck straight into fullscreen
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !new URLSearchParams(window.location.search).has("present")
    ) {
      return;
    }
    // Small delay so the slide has painted before the browser enters fullscreen
    const timer = window.setTimeout(() => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    }, 400);
    return () => window.clearTimeout(timer);
  }, []);

  // Keep fullscreen state in sync (Esc exits fullscreen natively)
  useEffect(() => {
    const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  const progress = ((index + 1) / total) * 100;

  return (
    <div className="relative w-full h-[100dvh] bg-gradient-to-b from-[#0b1020] to-[#111827] text-slate-100 flex flex-col overflow-hidden font-sans">
      {/* Header: exit, progress text, panel toggles */}
      <header className="h-14 px-4 sm:px-6 flex items-center justify-between border-b border-slate-800 bg-slate-950/70 backdrop-blur-sm shrink-0 z-30">
        <a
          href={backHref}
          className="text-sm font-semibold px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors min-h-[44px] flex items-center"
        >
          &larr; Exit
        </a>

        <span className="font-mono text-base text-slate-300 tracking-wider">
          {index + 1} / {total}
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowNotes((prev) => !prev)}
            title="Speaker notes (Key: N)"
            className={`min-h-[44px] px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors ${
              showNotes
                ? "bg-amber-500/25 text-amber-300 border border-amber-500/50"
                : "bg-slate-800 hover:bg-slate-700 text-slate-300"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">Notes (N)</span>
          </button>

          <button
            onClick={toggleFullscreen}
            title="Toggle fullscreen (Key: F)"
            className="min-h-[44px] w-11 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
          >
            {isFullscreen ? (
              <Minimize className="w-4 h-4" />
            ) : (
              <Maximize className="w-4 h-4" />
            )}
          </button>
        </div>
      </header>

      {/* Thin progress bar */}
      <div className="w-full h-1 bg-slate-900 shrink-0">
        <div
          className="h-full bg-gradient-to-r from-[#3b82f6] to-[#f59e0b] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Slide area: text (top on phones, left on laptops) + 3D scene */}
      <main className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="w-full h-full flex flex-col md:flex-row overflow-y-auto md:overflow-hidden"
          >
            {/* Text column */}
            <div
              className={`px-6 py-8 sm:px-8 lg:px-12 flex flex-col justify-center overflow-y-auto shrink-0 ${
                slide.scene
                  ? "w-full md:w-[42%]"
                  : "w-full max-w-4xl mx-auto items-start"
              }`}
            >
              <h1
                className="font-black tracking-tight text-white leading-[1.05]"
                style={{ fontSize: "clamp(2.25rem, 4vw, 3.5rem)" }}
              >
                {slide.title}
              </h1>

              <div
                className="mt-5 text-slate-200 leading-relaxed space-y-4"
                style={{ fontSize: "clamp(1.15rem, 1.4vw, 1.35rem)" }}
              >
                {slide.content}
              </div>
            </div>

            {/* 3D scene / interactive column */}
            {slide.scene && (
              <div className="w-full md:flex-1 h-[52vh] md:h-full relative overflow-hidden bg-slate-950/50 border-t md:border-t-0 md:border-l border-slate-800">
                {slide.scene}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer: previous / next */}
      <footer className="h-16 px-4 sm:px-6 flex items-center justify-between border-t border-slate-800 bg-slate-950/70 backdrop-blur-sm shrink-0 z-30">
        <button
          onClick={prevSlide}
          disabled={index === 0}
          className="min-h-[44px] px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-slate-800 text-slate-100 font-semibold text-sm flex items-center gap-1 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Previous</span>
        </button>

        <span className="hidden sm:block text-xs text-slate-500">
          Use &larr; &rarr; to move &bull; F for fullscreen
        </span>

        <button
          onClick={nextSlide}
          disabled={index === total - 1}
          className="min-h-[44px] px-4 py-2 rounded-xl bg-[#3b82f6] hover:bg-blue-500 disabled:opacity-30 disabled:hover:bg-[#3b82f6] text-white font-semibold text-sm flex items-center gap-1 transition-colors"
        >
          <span>Next</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </footer>

      {/* Speaker notes panel (Key: N) - sits under the slide, above the footer */}
      <AnimatePresence>
        {showNotes && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-x-0 bottom-16 z-40 max-h-[45vh] overflow-y-auto bg-slate-900/95 border-t-2 border-amber-500/60 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] p-5 sm:p-6 backdrop-blur-md"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <BookOpen className="w-4 h-4" />
                <span>
                  Speaker notes &mdash; slide {index + 1}: {slide.title}
                </span>
              </div>
              <button
                onClick={() => setShowNotes(false)}
                aria-label="Close speaker notes"
                className="p-2 rounded-md text-slate-400 hover:text-white min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="pt-4 text-slate-200 italic leading-relaxed">
              &ldquo;{slide.notes}&rdquo;
            </p>
            <p className="pt-3 text-xs text-slate-500">
              Press{" "}
              <span className="font-mono bg-slate-800 px-1.5 py-0.5 rounded">
                N
              </span>{" "}
              to hide this panel.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3:00 countdown timer (T = start/pause, H = hide) */}
      <PresentationTimer initialSeconds={180} />
    </div>
  );
};
