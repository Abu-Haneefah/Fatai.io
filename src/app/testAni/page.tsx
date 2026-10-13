"use client";

import { motion } from "framer-motion";

export default function TestPage() {
  const variants = {
    variant1: {
      x: 100,
      y: 100,
      backgroundColor: "red",
      transition: { duration: 2, type: "spring", bounce: 0.5 },
    },
    variant2: {
      x: 200,
      y: 200,
      backgroundColor: "blue",
      transition: { duration: 2, delay: 3, type: "spring", bounce: 0.5 },
    },
  };

  return (
    <div className="h-full flex items-center justify-center py-12">
      <motion.div
        className="w-96 h-96 bg-red-400 rounded"
        variants={variants}
        animate="variant2"
      />
    </div>
  );
}
