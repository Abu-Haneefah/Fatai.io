"use client";

import React, { useState } from "react";
import { SlideDeck, SlideData } from "@/components/teach/SlideDeck";
import { CodePlayground } from "@/components/teach/coding/CodePlayground";
import { Code2, Palette } from "lucide-react";

// ---------- Slide 2 helper: house analogy ----------
const HtmlIntro: React.FC = () => (
  <div className="space-y-4 text-left">
    <p>
      <strong className="text-white">
        HTML = HyperText Markup Language.
      </strong>
    </p>
    <p className="text-xs text-slate-400">
      It is the <strong className="text-white">structure</strong> of a web page:
      the headings, paragraphs, buttons and images.
    </p>

    <div className="rounded-xl border border-slate-700 bg-slate-950/60 p-4">
      <div className="flex items-center gap-2 mb-2 font-mono text-xs text-slate-500">
        <Code2 className="w-3.5 h-3.5" />
        <span>house.svg</span>
      </div>
      {/* Simple plain SVG house: walls + roof */}
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        className="mx-auto block"
        aria-label="A house outline (walls and roof)"
      >
        <polygon
          points="30,90 60,40 90,90"
          className="fill-none stroke-slate-500 stroke-width-3"
        />
        <rect
          x="20"
          y="75"
          width="80"
          height="40"
          className="fill-slate-500 stroke-none"
        />
        <rect
          x="52"
          y="68"
          width="16"
          height="16"
          className="fill-slate-500 stroke-none"
        />
        <rect
          x="40"
          y="80"
          width="40"
          height="6"
          className="fill-slate-600 stroke-none"
        />
      </svg>
      <p className="text-center text-xs text-slate-400 mt-2">
        <span className="font-mono text-slate-400">&lt;h1&gt;</span>,{" "}
        <span className="font-mono text-slate-400">&lt;p&gt;</span>,{" "}
        <span className="font-mono text-slate-400">&lt;button&gt;</span>
      </p>
      <p className="text-center text-xs text-slate-500">
        If a website were a house, HTML is the walls and rooms.
      </p>
    </div>
  </div>
);

// ---------- Slide 3 helper: CSS ON / OFF switch ----------
const CssDemo: React.FC = () => {
  const [on, setOn] = useState(true);

  const styledStyle: React.CSSProperties = on
    ? {
        background: "#0f172a",
        color: "white",
        fontFamily: "system-ui, sans-serif",
        padding: "24px",
        borderRadius: 12,
        textAlign: "center",
      }
    : {
        background: "white",
        color: "black",
        fontFamily: "Georgia, serif",
        padding: "16px",
      };

  const h3Style: React.CSSProperties = {
    color: "#f59e0b",
    marginTop: 0,
  };

  const pStyle: React.CSSProperties = {
    color: on ? "white" : "black",
  };

  const buttonStyle: React.CSSProperties = on
    ? {
        background: "#3b82f6",
        color: "white",
        border: "none",
        padding: "12px 24px",
        borderRadius: 999,
        cursor: "pointer",
        fontWeight: 600,
      }
    : {
        background: "white",
        color: "#1f2937",
        border: "2px solid #3b82f6",
        padding: "10px 20px",
        borderRadius: 0,
        cursor: "pointer",
        fontFamily: "Georgia, serif",
      };

  return (
    <div className="space-y-4">
      <button
        onClick={() => setOn((v) => !v)}
        className="min-h-[44px] px-5 py-2.5 rounded-xl bg-[#f59e0b] hover:bg-orange-400 text-slate-950 font-bold text-sm transition-colors shadow-lg shadow-orange-500/25"
      >
        CSS: {on ? "ON" : "OFF"}
      </button>

      <div
        className="rounded-xl border border-slate-700 p-4 font-sans"
        style={styledStyle}
      >
        <h3 style={h3Style}>My Page</h3>
        <p style={pStyle}>This page is styled!</p>
        <button style={buttonStyle}>Click me</button>
      </div>

      <p className="text-xs text-slate-500 flex items-center gap-1.5">
        <Palette className="w-3.5 h-3.5" />
        Same HTML, different look &mdash; that&apos;s what CSS does.
      </p>
    </div>
  );
};


// ---------- Slide 4 helper: anatomy of one element ----------
const fade = (delay: string) =>
  `teach-fade ${delay === undefined ? "" : `animation-delay:${delay}`}`;

const TagDiagram: React.FC = () => (
  <div className="space-y-6">
    {/* HTML line with coloured parts */}
    <div className="text-center">
      <div
        className="inline-block font-mono leading-1"
        style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.4rem)" }}
      >
        <span className="text-blue-400">&lt;p&gt;</span>
        <span className="text-emerald-400">Hello, world!</span>
        <span className="text-rose-400">&lt;/p&gt;</span>
      </div>

      {/* Labelled arrows below */}
      <div className="grid grid-cols-3 gap-2 pt-2 text-sm font-mono">
        <span className={fade("0.2s")}>
          <span className="text-blue-400 mr-1">&uarr;</span>
          <span className="text-blue-300">Opening tag</span>
        </span>
        <span className={fade("0.5s")}>
          <span className="text-emerald-400 mr-1">&uarr;</span>
          <span className="text-emerald-300">Content</span>
        </span>
        <span className={fade("0.8s")}>
          <span className="text-rose-400 mr-1">&uarr;</span>
          <span className="text-rose-300">Closing tag</span>
          <span className="text-rose-400/70 text-[10px]">(slash = close)</span>
        </span>
      </div>
    </div>

    {/* Element = opening + content + closing */}
    <div
      className="teach-fade rounded-t-xl border border-amber-400/60 bg-amber-500/5 px-4 pt-3"
      style={{ animationDelay: "1.1s" }}
    >
      <span className="text-xs text-amber-300 font-bold">
        Element = opening tag + content + closing tag
      </span>
    </div>

    {/* Table of common tags */}
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="text-xs text-slate-400 border-b border-slate-700">
            <th className="py-2 font-mono font-bold">Tag</th>
            <th className="py-2 font-mono font-bold">What it makes</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["h1", "A big heading"],
            ["p", "A paragraph"],
            ["button", "A clickable button"],
          ].map(([tag, meaning]) => (
            <tr key={tag} className="border-b border-slate-800 text-slate-200">
              <td className="py-2 font-mono font-bold text-sky-300">
                &lt;{tag}&gt;
              </td>
              <td className="py-2 text-slate-400">{meaning}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);


// ---------- Slide 5 helper: instructions beside the playground ----------
const LetCode: React.FC = () => (
  <div className="space-y-3 text-slate-200">
    <p className="text-sm">
      Follow the 4 steps in the panel. You can type the code live or click a
      step to have it added for you.
    </p>
    <p className="text-xs text-slate-500 italic">
      Your challenge: make the button turn green when you hover over it. Thank
      you.
    </p>
  </div>
);

export default function CodingTeachPage() {
  const slides: SlideData[] = [
    // Slide 1: What is coding? (0:20)
    {
      id: "what-is-coding",
      title: "What is coding?",
      content: (
        <div className="space-y-5 text-left">
          <p>
            <strong className="text-white">
              Coding is giving instructions to a computer.
            </strong>
          </p>
          <p className="text-xs text-slate-400">
            Computers are fast, but they only do exactly what we tell them.
            Code is how we tell them.
          </p>
          <div className="grid grid-cols-3 gap-3 text-center text-xs text-slate-400">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 space-y-1">
              <span className="text-xl">📱</span>
              <p>Apps</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 space-y-1">
              <span className="text-xl">🎮</span>
              <p>Games</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 space-y-1">
              <span className="text-xl">🌐</span>
              <p>Websites</p>
            </div>
          </div>
          <p className="text-xs text-slate-500 italic">
            Everything on your phone is made of code.
          </p>
        </div>
      ),
      notes:
        "Coding is simply giving instructions to a computer. Today we will look "
        + "at how websites are built, with two languages: HTML and CSS.",
    },

    // Slide 2: What is HTML? (0:35)
    {
      id: "html",
      title: "What is HTML?",
      content: <HtmlIntro />,
      notes:
        "HTML is the structure of a web page. If a website were a house, HTML "
        + "is the walls and rooms. It gives us headings, paragraphs and buttons.",
    },

    // Slide 3: What is CSS? (0:35)
    {
      id: "css",
      title: "What is CSS?",
      content: (
        <div className="space-y-4 text-left">
          <p>
            <strong className="text-white">
              CSS = Cascading Style Sheets.
            </strong>
          </p>
          <p className="text-xs text-slate-400">
            It controls how the page{" "}
            <strong className="text-white">looks</strong>: colours, sizes, fonts
            and spacing.
          </p>
          <CssDemo />
        </div>
      ),
      notes:
        "CSS is the style: colours, fonts and spacing. Watch: CSS off, plain "
        + "and boring. CSS on, colourful. Same page, different look.",
    },

    // Slide 4: Tags and elements (0:30)
    {
      id: "tags",
      title: "Tags and elements",
      content: <TagDiagram />,
      notes:
        "A tag is a keyword in angle brackets. Most tags come in pairs: an "
        + "opening tag and a closing tag with a slash. The opening tag, the "
        + "content and the closing tag together make an element.",
    },

    // Slide 5: Let's write code! (1:10)
    {
      id: "live",
      title: "Let's write code!",
      content: <LetCode />,
      scene: (
        <div className="w-full h-full min-h-[320px] flex flex-col p-2">
          <CodePlayground />
        </div>
      ),
      notes:
        "(Live coding, following the 4 steps.) End with: \"Your challenge: "
        + "make the button turn green when you hover over it. Thank you.\"",
    },
  ];

  return <SlideDeck slides={slides} />;
}

