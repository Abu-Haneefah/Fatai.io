"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function TeachLandingPage() {
  return (
    <div className="h-full overflow-y-auto px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48 py-10 md:py-14 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Physics card */}
          <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-white/60 shadow-xl hover:shadow-2xl transition-shadow"
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/20 mb-5">
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
                    fill="none"
                    stroke="white"
                    strokeWidth="1.5"
                  />
                  <path d="M12 6v12M12 12l4-4M12 12l4 4" stroke="white" strokeWidth="1.5" />
                  <circle cx="12" cy="12" r="2.5" fill="white" />
                </svg>
              </motion.div>
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block">
                Secondary Physics (ages 14&ndash;17)
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                Work, Energy &amp; Power
              </h2>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed mt-3">
              A 3-minute lesson with Three.js animations: the boy pushes a
              load, a ball drops, and two boys race.
            </p>
            <div className="flex flex-wrap gap-2 pt-3">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
                W = F &times; s
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
                KE + PE = constant
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
                P = W &divide; t
              </span>
            </div>
            <Link href="/teach/physics?present=1">
              <button className="mt-4 w-full py-3 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold flex items-center justify-center gap-2 shadow-lg transition-all">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M7 16l5-5 5 5"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Start Presentation
              </button>
            </Link>
          </motion.div>
          {/* Coding card */}
          <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-white/60 shadow-xl hover:shadow-2xl transition-shadow"
          >
            <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20 mb-5">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path
                  d="M8 6l-5 6 5 6M16 6l5 6-5 6"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 block">
                Web Development (ages 13+)
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                HTML &amp; CSS
              </h2>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed mt-3">
              A 3-minute lesson with a live editor: type HTML and CSS and watch
              the page update instantly.
            </p>
            <div className="flex flex-wrap gap-2 pt-3">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
                &lt;h1&gt;
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
                &lt;p&gt;
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
                &lt;button&gt;
              </span>
            </div>
            <Link href="/teach/coding?present=1">
              <button className="mt-4 w-full py-3 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold flex items-center justify-center gap-2 shadow-lg transition-all">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M7 16l5-5 5 5"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Start Presentation
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Interview checklist */}
        <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/60 shadow-lg">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">
            Before you present
          </h3>
          <ul className="space-y-2 text-sm text-slate-700">
            {[
              "Laptop only, camera on, quiet well-lit room, notifications off.",
              "Share the browser tab (not the whole desktop), tab audio off.",
              "Press T to start the 3:00 timer, N to read the speaker notes.",
              "Physics budget: Hook 20s · Work 45s · Energy 50s · Power 45s · Quiz 20s · Summary 20s (aim for ~2:40).",
              "Backup: keep a screenshot/PDF of the slides ready.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <svg
                  className="w-4 h-4 mt-0.5 text-emerald-600 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                  <path
                    d="M8 12.5l2.5 2.5L16 9.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

