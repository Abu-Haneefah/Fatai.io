"use client";

import { motion } from "framer-motion";
import Button from "./Button";
import { BookOpen, Sparkles } from "lucide-react";

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  hover: {
    scale: 1.02,
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
  },
  tap: { scale: 0.98 },
};

const TopicSelection = () => {
  return (
    <div className="container mx-auto py-12 px-4 max-w-5xl">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-slate-900 mb-10 md:mb-14">
        Explore Presentation Topics
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Box 1: Tailwind CSS */}
        <motion.div
          className="bg-white/95 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border border-slate-200 backdrop-blur-sm"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
        >
          <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-3">
            Tailwind CSS Architecture
          </h3>
          <p className="text-slate-600 mb-8 leading-relaxed text-sm sm:text-base">
            Dive into the world of utility-first CSS and discover how Tailwind CSS streamlines web development, offering unparalleled control and design consistency.
          </p>
          <Button
            href="/9jacode/topics/tailwind-css"
            variant="secondary"
            className="mt-auto"
          >
            View Presentation
          </Button>
        </motion.div>

        {/* Box 2: The Role of Coding in Modern Education */}
        <motion.div
          className="bg-white/95 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border border-slate-200 backdrop-blur-sm"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
          transition={{ delay: 0.1 }}
        >
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-3">
            Coding in Modern Education
          </h3>
          <p className="text-slate-600 mb-8 leading-relaxed text-sm sm:text-base">
            Explore the transformative impact of coding in modern education, from fostering computational thinking to preparing the next generation for a digital future.
          </p>
          <Button
            href="/9jacode/topics/coding-in-education"
            variant="secondary"
            className="mt-auto"
          >
            View Presentation
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default TopicSelection;
