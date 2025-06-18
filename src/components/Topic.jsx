"use client";
import { motion } from "framer-motion";
import Button from "./Button";

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
  hover: {
    scale: 1.03,
    boxShadow:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  },
  tap: { scale: 0.98 },
};

const TopicSelection = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <h2 className="text-4xl font-bold text-center text-gray-900 mb-10 md:mb-16">
        Explore My Presentation Topics
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Box 1: My Topic (Tailwind CSS) */}
        <motion.div
          className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center border border-gray-100"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h3 className="text-3xl font-bold text-primary mb-4">
            My Passion: Tailwind CSS
          </h3>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Dive into the world of utility-first CSS and discover how Tailwind
            CSS streamlines web development, offering unparalleled control and
            performance.
          </p>
          <Button
            href="/9jacode/topics/tailwind-css"
            variant="secondary"
            className="mt-12"
          >
            View Tailwind CSS Presentation
          </Button>
        </motion.div>

        {/* Box 2: Their Topic (The Role of Coding in Modern Education) */}
        <motion.div
          className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center border border-gray-100"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }} // Slight delay for the second card
        >
          <h3 className="text-3xl font-bold text-secondary mb-4">
            Topic:The Role of Coding in Modern Education
          </h3>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Explore the transformative impact of coding in modern education,
            from fostering computational thinking to preparing the next
            generation for a digital future.
          </p>
          <Button
            href="/9jacode/topics/coding-in-education"
            variant="secondary"
            className="mt-auto"
          >
            View Coding in Education Presentation
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default TopicSelection;
