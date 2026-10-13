// components/sections/TheirTopicContent.jsx
"use client"; // Essential for using Framer Motion and React hooks

import { motion } from "framer-motion";
import Button from "../../../../components/Button";

// Global animation variants for sections (parent containers)
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
      staggerChildren: 0.2, // Children will animate with a delay
      when: "beforeChildren", // Parent animates before children start
    },
  },
};

// Animation variants for individual content blocks (children of sections)
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// Animation variants for list items (even more granular control)
const listItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const TheirTopicContent = () => {
  return (
    <motion.section
      className="container mx-auto py-12 px-4 max-w-4xl" // Consistent max-width for readability
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
    >
      <motion.h1
        className="text-5xl font-extrabold text-gray-900 mb-8 text-center"
        variants={itemVariants}
      >
        The Role of Coding in Modern Education: Building Future-Ready Minds
      </motion.h1>

      {/* Introduction: The Imperative of Digital Literacy */}
      <motion.div
        className="bg-white p-8 md:p-10 rounded-xl shadow-lg border border-gray-100 mb-10"
        variants={itemVariants}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          1. The Imperative of Digital Literacy
        </h2>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-4">
          In our rapidly evolving modern society, where technology isn&apos;t
          just a tool but a fundamental aspect of daily life and global
          progress, it&apos;s undeniable that education must evolve alongside
          it. Merely consuming technology is no longer sufficient;
          understanding, creating, and shaping it is paramount for the next
          generation.
        </p>
        <motion.blockquote
          className="italic border-l-4 border-primary pl-4 py-2 bg-blue-50 text-gray-800 text-xl md:text-2xl"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
        >
          &quot;I strongly believe that every kid, every child, should learn
          coding. We should actually teach them coding in school in the same way
          we teach them physics, geography, literacy, and math.&quot;
          <br />
          <span className="font-semibold text-gray-600">
            — Thomas Dohmke, CEO of GitHub
          </span>
        </motion.blockquote>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed mt-4">
          This powerful statement encapsulates the urgent need to integrate
          coding into the core curriculum, viewing it as a foundational skill
          akin to traditional literacies. Are we preparing our students for a
          world we can&apos;t yet fully imagine without this fundamental
          language?
        </p>
      </motion.div>

      {/* Defining Our Terms */}
      <motion.div
        className="bg-white p-8 md:p-10 rounded-xl shadow-lg border border-gray-100 mb-10"
        variants={itemVariants}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          2. Defining Our Terms
        </h2>
        <h3 className="text-2xl md:text-3xl font-semibold text-secondary mb-3">
          What is Coding?
        </h3>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
          Coding, at its heart, is the process of{" "}
          <strong className="font-semibold text-gray-800">
            writing precise instructions (code) for computers to follow
          </strong>
          , enabling them to perform specific tasks. This is achieved using
          various programming languages such as{" "}
          <code className="bg-gray-100 text-purple-700 px-1 rounded">
            Python
          </code>{" "}
          (great for beginners),{" "}
          <code className="bg-gray-100 text-purple-700 px-1 rounded">
            JavaScript
          </code>{" "}
          (for web interactivity),{" "}
          <code className="bg-gray-100 text-purple-700 px-1 rounded">Java</code>
          ,{" "}
          <code className="bg-gray-100 text-purple-700 px-1 rounded">C++</code>,
          and many more. It&apos;s the new universal language of creation and
          problem-solving in the digital age.
        </p>
        <h3 className="text-2xl md:text-3xl font-semibold text-secondary mb-3">
          What is Modern Education?
        </h3>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
          Modern education is an approach focused on equipping students with the
          knowledge, skills, values, and habits necessary to thrive in
          today&apos;s complex and interconnected world. Crucially, it
          increasingly involves{" "}
          <strong className="font-semibold text-gray-800">
            imparting knowledge by leveraging cutting-edge technologies
          </strong>{" "}
          like AI-powered tools, virtual reality, and collaborative digital
          platforms to enrich and personalize the learning experience.
        </p>
      </motion.div>

      {/* The Transformative Roles Section: Enhanced with more detail and staggered animations */}
      <motion.div
        className="bg-white p-8 md:p-10 rounded-xl shadow-lg border border-gray-100 mb-10"
        variants={itemVariants} // This block also animates in
      >
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
          3. The Transformative Roles of Coding in Education
        </h2>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
          Integrating coding into our educational systems is not merely an
          option but a strategic imperative. Its multifaceted roles contribute
          significantly to holistic student development:
        </p>

        <motion.ul className="list-none space-y-8" variants={sectionVariants}>
          {" "}
          {/* Parent for staggered list items */}
          <motion.li
            className="flex items-start text-lg md:text-xl text-gray-700"
            variants={listItemVariants}
          >
            <span className="font-bold text-primary-600 mr-3 text-2xl flex-shrink-0">
              🧠
            </span>
            <div>
              <strong className="font-semibold text-gray-800">
                Computational Thinking & Problem-Solving:
              </strong>{" "}
              Coding provides a concrete framework for developing critical
              thinking. Students learn to{" "}
              <strong className="font-semibold text-gray-800">decompose</strong>{" "}
              (break down complex problems), identify{" "}
              <strong className="font-semibold text-gray-800">patterns</strong>,
              develop{" "}
              <strong className="font-semibold text-gray-800">
                algorithms
              </strong>{" "}
              (step-by-step solutions), and master{" "}
              <strong className="font-semibold text-gray-800">
                abstraction
              </strong>{" "}
              – fundamental skills applicable across all disciplines, from
              science to daily life. Debugging code also hones perseverance and
              logical deduction.
            </div>
          </motion.li>
          <motion.li
            className="flex items-start text-lg md:text-xl text-gray-700"
            variants={listItemVariants}
          >
            <span className="font-bold text-primary-600 mr-3 text-2xl flex-shrink-0">
              🎨
            </span>
            <div>
              <strong className="font-semibold text-gray-800">
                Fostering Creativity and Expression:
              </strong>{" "}
              Coding transforms students from passive consumers of technology
              into active creators. It&apos;s a powerful medium for
              self-expression, allowing them to bring their unique ideas to
              life, whether designing interactive stories with platforms like{" "}
              <code className="bg-gray-100 text-purple-700 px-1 rounded">
                Scratch
              </code>
              , building simple games, creating digital art, or developing
              innovative applications to express their ideas and solve problems
              relevant to their lives and communities.
            </div>
          </motion.li>
          <motion.li
            className="flex items-start text-lg md:text-xl text-gray-700"
            variants={listItemVariants}
          >
            <span className="font-bold text-primary-600 mr-3 text-2xl flex-shrink-0">
              🌐
            </span>
            <div>
              <strong className="font-semibold text-gray-800">
                Enhancing Digital Literacy & Citizenship:
              </strong>{" "}
              Beyond basic computer usage, coding instills true digital
              literacy. Students gain a deeper understanding of how the digital
              world works, empowering them to critically evaluate online
              information, understand the basics of cybersecurity, recognize
              biases in algorithms, and become responsible digital citizens in
              an increasingly interconnected world.
            </div>
          </motion.li>
          <motion.li
            className="flex items-start text-lg md:text-xl text-gray-700"
            variants={listItemVariants}
          >
            <span className="font-bold text-primary-600 mr-3 text-2xl flex-shrink-0">
              💡
            </span>
            <div>
              <strong className="font-semibold text-gray-800">
                Cultivating Future-Ready Skills:
              </strong>{" "}
              The demand for coding skills extends far beyond traditional tech
              roles. As automation, AI, and data analytics sweep across all
              sectors, foundational coding knowledge becomes an invaluable asset
              across virtually all sectors – from healthcare to finance to
              agriculture. It equips students with the adaptability and
              innovative mindset needed for jobs that don&apos;t even exist yet.
            </div>
          </motion.li>
          <motion.li
            className="flex items-start text-lg md:text-xl text-gray-700"
            variants={listItemVariants}
          >
            <span className="font-bold text-primary-600 mr-3 text-2xl flex-shrink-0">
              🔬
            </span>
            <div>
              <strong className="font-semibold text-gray-800">
                Seamless STEM Integration:
              </strong>{" "}
              Coding provides a practical, hands-on way to make Science,
              Technology, Engineering, and Mathematics concepts tangible and
              exciting. Students can code simulations for scientific
              experiments, program robots (e.g., with{" "}
              <code className="bg-gray-100 text-purple-700 px-1 rounded">
                micro:bit
              </code>
              ), analyze data sets, or build engineering prototypes, making
              learning interactive and deeply engaging across STEM disciplines.
            </div>
          </motion.li>
          <motion.li
            className="flex items-start text-lg md:text-xl text-gray-700"
            variants={listItemVariants}
          >
            <span className="font-bold text-primary-600 mr-3 text-2xl flex-shrink-0">
              💼
            </span>
            <div>
              <strong className="font-semibold text-gray-800">
                Fostering Entrepreneurship and Job Security:
              </strong>{" "}
              With coding skills, students are not just job seekers but
              potential job creators. They learn to identify problems and build
              innovative digital solutions, fostering an entrepreneurial
              mindset. This direct ability to build and iterate increases their
              career resilience and security in a dynamic, ever-changing global
              economy.
            </div>
          </motion.li>
        </motion.ul>
      </motion.div>

      {/* New Section: Approaches to Coding Education */}
      <motion.div
        className="bg-white p-8 md:p-10 rounded-xl shadow-lg border border-gray-100 mb-10"
        variants={itemVariants}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          4. Approaches to Integrating Coding Education
        </h2>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-4">
          Implementing coding education effectively requires diverse strategies
          tailored to different age groups and learning styles:
        </p>
        <motion.ul className="list-none space-y-4" variants={sectionVariants}>
          <motion.li
            className="flex items-start text-lg md:text-xl text-gray-700"
            variants={listItemVariants}
          >
            <span className="font-bold text-secondary-600 mr-3 text-2xl flex-shrink-0">
              ➡️
            </span>
            <div>
              <strong className="font-semibold text-gray-800">
                Curriculum Integration:
              </strong>
              <ul className="list-disc list-inside ml-4 text-base md:text-lg space-y-2 mt-1">
                <li>
                  **Dedicated Computer Science Classes:** Offering specific
                  courses on programming.
                </li>
                <li>
                  **Cross-Curricular Approach:** Weaving coding into existing
                  subjects (e.g., coding a math problem solver, simulating
                  historical events).
                </li>
              </ul>
            </div>
          </motion.li>
          <motion.li
            className="flex items-start text-lg md:text-xl text-gray-700"
            variants={listItemVariants}
          >
            <span className="font-bold text-secondary-600 mr-3 text-2xl flex-shrink-0">
              ➡️
            </span>
            <div>
              <strong className="font-semibold text-gray-800">
                Pedagogical Models:
              </strong>
              <ul className="list-disc list-inside ml-4 text-base md:text-lg space-y-2 mt-1">
                <li>
                  **Block-based Programming:** Tools like Scratch or Blockly are
                  ideal for younger learners, introducing logic without complex
                  syntax.
                </li>
                <li>
                  **Text-based Programming:** Languages like Python or
                  JavaScript for older students, building foundational
                  industry-relevant skills.
                </li>
                <li>
                  **Project-Based Learning:** Students learn by creating
                  real-world projects, fostering deeper understanding and
                  engagement.
                </li>
              </ul>
            </div>
          </motion.li>
          <motion.li
            className="flex items-start text-lg md:text-xl text-gray-700"
            variants={listItemVariants}
          >
            <span className="font-bold text-secondary-600 mr-3 text-2xl flex-shrink-0">
              ➡️
            </span>
            <div>
              <strong className="font-semibold text-gray-800">
                Extracurricular Engagement:
              </strong>
              <ul className="list-disc list-inside ml-4 text-base md:text-lg space-y-2 mt-1">
                <li>
                  **Coding Clubs:** Providing informal environments for
                  exploration.
                </li>
                <li>
                  **Hackathons &amp; Competitions:** Challenging students to
                  apply their skills collaboratively.
                </li>
                <li>
                  **Online Resources:** Leveraging platforms like Code.org, Khan
                  Academy, or specialized bootcamps.
                </li>
              </ul>
            </div>
          </motion.li>
        </motion.ul>
      </motion.div>

      {/* New Section: Challenges and Solutions */}
      <motion.div
        className="bg-white p-8 md:p-10 rounded-xl shadow-lg border border-gray-100 mb-10"
        variants={itemVariants}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          5. Overcoming Challenges in Implementation
        </h2>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-4">
          While the benefits are clear, integrating coding into education
          presents a few challenges that require thoughtful solutions:
        </p>
        <motion.ul className="list-none space-y-6" variants={sectionVariants}>
          <motion.li
            className="flex items-start text-lg md:text-xl text-gray-700"
            variants={listItemVariants}
          >
            <span className="font-bold text-red-500 mr-3 text-2xl flex-shrink-0">
              ❌
            </span>
            <div>
              <strong className="font-semibold text-gray-800">
                Teacher Training:
              </strong>{" "}
              Many educators lack formal computer science backgrounds or
              confidence in teaching coding concepts.
              <br />
              <span className="text-blue-600 font-medium">Solution:</span>{" "}
              Invest in robust, ongoing professional development programs;
              create accessible online courses; foster peer-to-peer learning
              communities; and consider `&quot;`train-the-trainer`&quot;`
              models.
            </div>
          </motion.li>
          <motion.li
            className="flex items-start text-lg md:text-xl text-gray-700"
            variants={listItemVariants}
          >
            <span className="font-bold text-red-500 mr-3 text-2xl flex-shrink-0">
              ❌
            </span>
            <div>
              <strong className="font-semibold text-gray-800">
                Access to Resources &amp; Equity:
              </strong>{" "}
              Disparities in device access, reliable internet connectivity, and
              quality instructional materials can exacerbate educational
              inequalities.
              <br />
              <span className="text-blue-600 font-medium">Solution:</span>{" "}
              Advocate for public funding and grants for technology
              infrastructure; promote the use of affordable open-source tools;
              encourage device donation programs; and develop curricula
              adaptable for low-resource environments.
            </div>
          </motion.li>
          <motion.li
            className="flex items-start text-lg md:text-xl text-gray-700"
            variants={listItemVariants}
          >
            <span className="font-bold text-red-500 mr-3 text-2xl flex-shrink-0">
              ❌
            </span>
            <div>
              <strong className="font-semibold text-gray-800">
                Curriculum Overload:
              </strong>{" "}
              Schools often struggle to fit new subjects and concepts into
              already packed and standardized curricula.
              <br />
              <span className="text-blue-600 font-medium">Solution:</span>{" "}
              Emphasize the cross-curricular benefits of coding, demonstrating
              how it enhances existing subjects (e.g., math, science, art)
              rather than being a separate burden; advocate for flexible,
              project-based learning models.
            </div>
          </motion.li>
        </motion.ul>
      </motion.div>

      {/* Conclusion */}
      <motion.div
        className="bg-white p-8 md:p-10 rounded-xl shadow-lg border border-gray-100"
        variants={itemVariants}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          Conclusion: Empowering the Future
        </h2>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-4">
          The integration of coding into modern education is not merely about
          vocational training; it&apos;s a strategic investment in the
          intellectual, economic, and civic future of our students. By embracing
          coding, we are not just teaching a skill, but cultivating a generation
          of critical thinkers, creative problem-solvers, and empowered digital
          citizens. They will be equipped to not only navigate but also innovate
          within and shape the technological landscape of tomorrow.
        </p>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-semibold border-t-2 border-dashed border-gray-200 pt-4 mt-4">
          Let&apos;s champion coding education as a fundamental right,
          empowering every student to be a creator, not just a consumer, of the
          digital world.
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

export default TheirTopicContent;
