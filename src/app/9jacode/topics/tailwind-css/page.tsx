// components/sections/MyTopicContent.jsx
"use client"; // Essential for using Framer Motion and hooks

import { motion } from "framer-motion";
import Button from "../../../../components/Button";
import CodeBlock from "../../../../components/codeblock";
// Ensure these paths are correct for your project structure
// If Button and CodeBlock are directly in components/ui, you might need to adjust

// Animation variants for sections
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
      staggerChildren: 0.2, // Animate children with a delay
      when: "beforeChildren", // Parent animates before children
    },
  },
};

// Animation variants for individual content blocks within sections
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const MyTopicContent = () => {
  return (
    <motion.section
      className="container mx-auto py-12 px-4 max-w-4xl" // Added max-width for better readability
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
    >
      <motion.h1
        className="text-5xl font-extrabold text-gray-900 mb-8 text-center"
        variants={itemVariants}
      >
        Mastering Web Styling with Tailwind CSS
      </motion.h1>

      {/* Introduction Section */}
      <motion.div
        className="bg-white p-8 md:p-10 rounded-xl shadow-lg border border-gray-100 mb-10"
        variants={itemVariants}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          1. What is Tailwind CSS?
        </h2>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-4">
          Tailwind CSS is a{" "}
          <strong className="text-primary-700">
            utility-first CSS framework
          </strong>{" "}
          that makes building responsive and modern UIs incredibly fast. Unlike
          traditional frameworks like Bootstrap, which come with many
          pre-designed components, Tailwind provides you with{" "}
          <strong className="font-semibold text-gray-800">
            complete control in styling
          </strong>
          .
        </p>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
          With its responsive utility classes, you can access small,
          single-purpose styles like{" "}
          <code className="bg-gray-100 text-purple-700 px-1 rounded">
            text-lg
          </code>
          ,{" "}
          <code className="bg-gray-100 text-purple-700 px-1 rounded">flex</code>
          ,{" "}
          <code className="bg-gray-100 text-purple-700 px-1 rounded">
            hover:bg-blue-200
          </code>
          ,{" "}
          <code className="bg-gray-100 text-purple-700 px-1 rounded">
            rounded
          </code>
          ,{" "}
          <code className="bg-gray-100 text-purple-700 px-1 rounded">grid</code>
          , and{" "}
          <code className="bg-gray-100 text-purple-700 px-1 rounded">
            shadow-xl
          </code>
          . These classes are reusable and allow you to create unique UIs from
          scratch by combining them.
        </p>
      </motion.div>

      {/* How it Works / The JIT Compiler */}
      <motion.div
        className="bg-white p-8 md:p-10 rounded-xl shadow-lg border border-gray-100 mb-10"
        variants={itemVariants}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          2. How Tailwind Works: The JIT Compiler
        </h2>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-4">
          Tailwind CSS utilizes a powerful engine called the{" "}
          <strong className="text-secondary-700">
            Just-In-Time (JIT) compiler
          </strong>
          . This compiler scans your HTML, JavaScript, and any other template
          files for all the utility classes you&apos;ve used.
        </p>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
          The brilliant part? It then generates{" "}
          <strong className="font-semibold text-gray-800">
            only the CSS required
          </strong>{" "}
          for those specific classes and outputs a tiny, optimized CSS file.
          This process helps you build components faster, drastically reduces
          your CSS bundle size, and ultimately makes your website load
          incredibly fast.
        </p>
      </motion.div>

      {/* Comparison Section */}
      <motion.div
        className="bg-white p-8 md:p-10 rounded-xl shadow-lg border border-gray-100 mb-10"
        variants={itemVariants}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
          3. Traditional CSS vs. Tailwind CSS: A Comparison
        </h2>

        {/* Traditional CSS Example */}
        <h3 className="text-2xl md:text-3xl font-semibold text-secondary mb-4">
          Traditional CSS Approach
        </h3>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-4">
          Let&apos;s see how we typically style an element using normal CSS:
        </p>
        <CodeBlock title="HTML" language="html">
          {`<div class="container-center">
  My Centered Content
</div>`}
        </CodeBlock>
        <CodeBlock title="CSS" language="css">
          {`/* CSS */
.container-center {
  display: flex;
  align-items: center;
  justify-content: center;
}`}
        </CodeBlock>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed mt-4 mb-8">
          This involves writing separate CSS rules for a custom class name.
        </p>

        {/* Tailwind CSS Example */}
        <h3 className="text-2xl md:text-3xl font-semibold text-secondary mb-4">
          Tailwind CSS Approach
        </h3>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-4">
          With Tailwind, we apply utility classes directly to the HTML:
        </p>
        <CodeBlock title="HTML (Tailwind)" language="html">
          {`<div class="flex items-center justify-center h-screen">
  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
</div>`}
        </CodeBlock>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed mt-4">
          Here, `flex`, `items-center`, `justify-center` handle the centering,
          `h-screen` sets height, and `text-3xl`, `font-bold`, `underline` style
          the text directly. This eliminates the need to jump between files or
          invent class names.
        </p>
      </motion.div>

      {/* Addressing Misconceptions */}
      <motion.div
        className="bg-white p-8 md:p-10 rounded-xl shadow-lg border border-gray-100 mb-10"
        variants={itemVariants}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          4. Is Tailwind Just &quot;Inline Styling&quot;? (Myth Debunked)
        </h2>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-4">
          Some might initially perceive Tailwind CSS as merely &quot;inline
          styling&quot; due to the classes being applied directly in the HTML.
          However, this is a significant misconception.
        </p>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
          True inline styles (e.g.,{" "}
          <code className="bg-gray-100 text-purple-700 px-1 rounded">
            &lt;div style=&quot;display: flex;&quot;&gt;
          </code>
          ) are limited: they cannot use media queries for responsiveness,
          cannot apply pseudo-classes like `:hover` or `:focus`, and are very
          difficult to manage.
          <br />
          <br />
          Tailwind&apos;s utility classes are still proper CSS classes, which
          means they fully support{" "}
          <strong className="font-semibold text-gray-800">
            responsive design (e.g.,{" "}
            <code className="bg-gray-100 text-purple-700 px-1 rounded">
              md:flex
            </code>
            )
          </strong>{" "}
          and{" "}
          <strong className="font-semibold text-gray-800">
            pseudo-classes (e.g.,{" "}
            <code className="bg-gray-100 text-purple-700 px-1 rounded">
              hover:bg-blue-700
            </code>
            )
          </strong>
          . The JIT compiler ensures that only the CSS you actually use is
          bundled, keeping your stylesheets lean and performant.
        </p>
      </motion.div>

      {/* Testing Tailwind */}
      <motion.div
        className="bg-white p-8 md:p-10 rounded-xl shadow-lg border border-gray-100 mb-10"
        variants={itemVariants}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          5. Trying Out Tailwind CSS
        </h2>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-4">
          You can easily experiment with Tailwind CSS using{" "}
          <strong className="font-semibold text-gray-800">Tailwind Play</strong>
          , an online sandbox that allows you to write HTML with Tailwind
          classes and see the results instantly. For a real project, you&apos;d
          go through the installation process (as discussed earlier).
        </p>
        <div className="flex justify-center mt-6">
          <Button
            href="https://play.tailwindcss.com/"
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
          >
            Visit Tailwind Play
          </Button>
        </div>
      </motion.div>

      {/* Conclusion */}
      <motion.div
        className="bg-white p-8 md:p-10 rounded-xl shadow-lg border border-gray-100"
        variants={itemVariants}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          Conclusion
        </h2>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
          Tailwind CSS offers a modern, efficient, and highly customizable
          approach to web styling. By empowering developers with granular
          control and an optimized workflow, it&apos;s quickly becoming a
          preferred choice for building beautiful, responsive, and performant
          user interfaces.
        </p>
      </motion.div>

      <div className="mt-12 text-center">
        <Button href="/" variant="primary">
          Back to Home
        </Button>
      </div>
    </motion.section>
  );
};

export default MyTopicContent;
