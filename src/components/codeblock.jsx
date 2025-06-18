// components/ui/CodeBlock.jsx
'use client';
import { motion } from "framer-motion";


const CodeBlock = ({ children, language = "html", title = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-code-bg rounded-lg shadow-xl mb-6 mt-4 overflow-hidden"
    >
      {title && (
        <div className="bg-gray-700 text-gray-200 text-sm font-semibold px-4 py-2 border-b border-gray-600">
          {title}
        </div>
      )}
      <pre className="p-4 text-code-text text-sm font-mono overflow-x-auto">
        <code className={`language-${language}`}>
          {/* We'll use basic regex for highlighting since a full syntax highlighter is overkill for this example */}
          {children.split("\n").map((line, index) => (
            <span key={index} className="block">
              {line
                .split(
                  /(function|const|let|var|return|if|else|for|while|import|export|from|class|this|\.|\(|\)|\[|\]|\{|\}|;|=|>|<|\+|-|\*|\/)/g
                )
                .map((part, pIdx) => {
                  if (
                    part.match(
                      /^(function|const|let|var|return|if|else|for|while|import|export|from|class|this)$/
                    )
                  ) {
                    return (
                      <span key={pIdx} className="text-code-keyword">
                        {part}
                      </span>
                    );
                  } else if (part.match(/^['"].*['"]$/)) {
                    return (
                      <span key={pIdx} className="text-code-string">
                        {part}
                      </span>
                    );
                  } else if (part.match(/^\/\/.*/)) {
                    return (
                      <span key={pIdx} className="text-code-comment">
                        {part}
                      </span>
                    );
                  } else if (part.match(/^\d+(\.\d+)?$/)) {
                    return (
                      <span key={pIdx} className="text-code-number">
                        {part}
                      </span>
                    );
                  }
                  return part;
                })}
            </span>
          ))}
        </code>
      </pre>
    </motion.div>
  );
};

export default CodeBlock;
