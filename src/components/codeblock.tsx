"use client";

import { motion } from "framer-motion";
import React from "react";

interface CodeBlockProps {
  children: string;
  language?: string;
  title?: string;
}

const CodeBlock = ({ children, language = "html", title = "" }: CodeBlockProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-slate-900 rounded-xl shadow-xl mb-6 mt-4 overflow-hidden border border-slate-800"
    >
      {title && (
        <div className="bg-slate-800 text-slate-200 text-xs font-mono font-semibold px-4 py-2 border-b border-slate-700/60">
          {title}
        </div>
      )}
      <pre className="p-4 text-emerald-300 text-xs sm:text-sm font-mono overflow-x-auto leading-relaxed">
        <code className={`language-${language}`}>
          {children.split("\n").map((line, index) => (
            <span key={index} className="block">
              {line}
            </span>
          ))}
        </code>
      </pre>
    </motion.div>
  );
};

export default CodeBlock;
