"use client";

import React, { useMemo, useState } from "react";
import { Lightbulb, RotateCcw } from "lucide-react";

/**
 * Live HTML + CSS playground used on the coding lesson's final slide.
 *
 * The student can type into the two editors (live preview updates), or press
 * "Show me" on each of the 4 steps to have the code filled in for them.
 */

type Step = {
  n: string;
  label: string;
  target: "html" | "css";
  code: string;
  code2?: string;
  code3?: string;
};

const STEPS: Step[] = [
  {
    n: "1",
    label: "Add a heading",
    target: "html",
    code: "<h1>Hello, BRINT!</h1>",
  },
  {
    n: "2",
    label: "Add a paragraph and a button",
    target: "html",
    code: "<p>I am learning HTML and CSS.</p>",
    code2: "<button>Click me</button>",
  },
  {
    n: "3",
    label: "Style the page (CSS)",
    target: "css",
    code: "body { font-family: sans-serif; background: #0f172a; }",
    code2: "h1 { color: #f59e0b; }",
    code3: "p { color: white; }",
  },
  {
    n: "4",
    label: "Style the button (CSS)",
    target: "css",
    code: "button { background: #3b82f6; color: white; border-radius: 8px; padding: 10px 20px; }",
    code2: "button:hover { background: #22c55e; }",
  },
];

const editorClass =
  "w-full min-h-[150px] bg-slate-950 border border-slate-700 rounded-xl p-3 font-mono text-sm text-slate-100 leading-relaxed resize-y focus:outline-none focus:ring-2 focus:ring-sky-500/60";

export const CodePlayground: React.FC = () => {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [stepIndex, setStepIndex] = useState(0);

  // Assemble the preview document for the sandboxed iframe
  const srcDoc = useMemo(
    () => `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      body { margin: 16px; }
      ${css}
    </style>
  </head>
  <body>
    ${html}
  </body>
</html>`,
    [html, css]
  );

  /** Fill in the current step's code (editable afterwards) and move on. */
  const applyStep = (index: number) => {
    const step = STEPS[index];
    if (step.target === "html") {
      setHtml((prev) =>
        [prev, step.code, step.code2, step.code3].filter(Boolean).join("\n")
      );
    } else {
      setCss((prev) =>
        [prev, step.code, step.code2, step.code3].filter(Boolean).join("\n")
      );
    }
    if (index < STEPS.length - 1) setStepIndex(index + 1);
  };

  const reset = () => {
    setHtml("");
    setCss("");
    setStepIndex(0);
  };

  const currentStep = STEPS[stepIndex];

  return (
    <div className="flex flex-col gap-3 h-full text-slate-200">
      {/* Guided steps */}
      <div className="flex flex-wrap gap-2">
        {STEPS.map((step, i) => (
          <button
            key={step.n}
            onClick={() => applyStep(i)}
            title={`Show me: ${step.label}`}
            className={`min-h-[44px] px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors border ${
              i === stepIndex
                ? "bg-amber-500/20 border-amber-500/50 text-amber-300"
                : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-slate-900/60 flex items-center justify-center font-mono">
              {step.n}
            </span>
            <span className="hidden sm:inline">{step.label}</span>
            <span className="sm:hidden">Step {step.n}</span>
          </button>
        ))}
        <button
          onClick={reset}
          title="Clear the editors"
          className="min-h-[44px] px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 transition-colors border border-slate-700"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </button>
      </div>

      {/* Hint for the current step */}
      <p className="text-xs text-slate-400 flex items-center gap-2">
        <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        <span>
          Step {currentStep.n}: {currentStep.label} &mdash; type it in the{" "}
          {currentStep.target === "html" ? "HTML" : "CSS"} editor, or click the
          step to fill it in.{" "}
          <span className="italic text-slate-500">
            Challenge: make the button turn green when you hover over it.
          </span>
        </span>
      </p>

      {/* Editors + live preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1 min-h-0">
        <div className="flex flex-col gap-2 min-h-0">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
            index.html
          </span>
          <textarea
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            spellCheck={false}
            placeholder="<h1>Hello, BRINT!</h1>"
            className={editorClass}
            aria-label="HTML editor"
          />
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            style.css
          </span>
          <textarea
            value={css}
            onChange={(e) => setCss(e.target.value)}
            spellCheck={false}
            placeholder="h1 { color: orange; }"
            className={editorClass}
            aria-label="CSS editor"
          />
        </div>

        <div className="flex flex-col gap-2 min-h-0">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Live preview
          </span>
          <iframe
            title="Live preview"
            srcDoc={srcDoc}
            sandbox=""
            className="w-full flex-1 min-h-[200px] bg-white rounded-xl border border-slate-700"
          />
        </div>
      </div>
    </div>
  );
};
