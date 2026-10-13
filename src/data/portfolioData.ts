export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  year: string;
  category: "Fintech" | "E-commerce" | "Dashboard" | "EdTech" | "Web App";
  description: string;
  details?: string[];
  techStack: string[];
  image: string;
  liveUrl: string;
  githubUrl?: string;
  featured: boolean;
  color: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  grade: string;
}

export const RESUME_INFO = {
  name: "Jabar Fatai",
  role: "Frontend Developer",
  subRole: "React • Next.js • TypeScript | Mobile Developer, React Native",
  email: "aabdfatahi@gmail.com",
  phone: "+234 906 911 5484",
  summary:
    "Results-driven Frontend Developer with 3+ years of experience in JavaScript, React, and Next.js. Skilled in building scalable, high-performance web applications with responsive, user-focused interfaces. Passionate about delivering impactful digital solutions in remote environments.",
  cvDownloadUrl: "/Jabar_Fatai_CV.pdf",
  github: "https://github.com/Abu-Haneefah",
  linkedin:
    "https://www.linkedin.com/in/fatai-jabar-9309a4279?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  facebook: "https://www.facebook.com/profile.php?id=61565759282922",
  education: {
    degree: "BSc Physics Education",
    period: "2019 - 2023",
    institution: "University of Nigeria, Nsukka",
    cgpa: "4.72 / 5.0 (First Class Honours)",
  },
  certification: {
    title: "Frontend Developer Professional Certificate",
    issuer: "SwiftStack Academy",
    date: "12/7/2020",
  },
  skills: {
    languages: ["TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3"],
    frameworks: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "Shadcn UI",
      "Bootstrap",
      "jQuery",
    ],
    stateAndForms: ["Zustand", "React Hook Form", "Zod"],
    tools: [
      "Git",
      "GitHub",
      "REST APIs",
      "Vercel",
      "Netlify",
      "Vite",
      "Cursor",
    ],
    databases: ["MySQL", "MongoDB"],
    mobile: ["React Native"],
    softSkills: ["Problem Solving", "Self-learning", "Adaptability"],
  },
};

export const PROJECTS: Project[] = [
  {
    id: "shanono-bank",
    title: "Shanono Bank Frontend",
    subtitle: "Production Fintech Web Application",
    year: "2025",
    category: "Fintech",
    description:
      "Built and maintained a production-grade fintech web application for Shanono Bank, delivering secure onboarding, authentication, user dashboards, bank transfers, and bill payment features using React and TypeScript.",
    details: [
      "Secure user onboarding & multi-factor authentication",
      "Real-time user financial dashboards & analytics",
      "Interbank transfers, payments & statement generation",
      "Investment card features and beneficiary management",
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Next.js", "REST APIs"],
    image: "/shashot.png",
    liveUrl: "https://myshanonobank.com",
    featured: true,
    color: "from-blue-600/20 via-sky-500/10 to-indigo-600/20",
  },
  {
    id: "tandt-deals",
    title: "T & T Deals Marketplace",
    subtitle: "High-Performance E-commerce Platform",
    year: "2025",
    category: "E-commerce",
    description:
      "Collaborated with a cross-functional engineering team to develop and ship the T and T Deals platform, implementing core e-commerce workflows, responsive UI, and seamless user experiences.",
    details: [
      "End-to-end shopping catalog, dynamic filtering & search",
      "Interactive cart, order management & checkout flows",
      "Highly responsive mobile-first UI with lightning performance",
    ],
    techStack: ["Next.js", "Tailwind CSS", "TypeScript", "REST APIs"],
    image: "/e-commerce2.PNG",
    liveUrl: "https://tandtdeals.ng/",
    featured: true,
    color: "from-amber-600/20 via-orange-500/10 to-red-600/20",
  },
  {
    id: "modern-dashboard",
    title: "Modern Dashboard",
    subtitle: "Analytics & Business Intelligence Dashboard",
    year: "2024",
    category: "Dashboard",
    description:
      "Built a sleek, responsive dashboard for analytics and business management. Integrated reusable UI components with TypeScript, shadcn and Tailwind.",
    details: [
      "Modern metrics, real-time KPI visualization, & revenue charts",
      "Modular shadcn and Tailwind UI component architecture",
      "Lightweight, performant data views with responsive grids",
    ],
    techStack: ["Next.js", "Tailwind CSS", "TypeScript", "Shadcn UI"],
    image: "/shad-dashboard.PNG",
    liveUrl: "https://modern-dashbaord.vercel.app/",
    featured: true,
    color: "from-emerald-600/20 via-teal-500/10 to-cyan-600/20",
  },
  {
    id: "school-management",
    title: "School Management App",
    subtitle: "Full-Featured School & Student Portal",
    year: "2024",
    category: "EdTech",
    description:
      "Developed a full-featured dashboard for managing students, classes, attendance, and analytics. Implemented state management with Zustand and forms with React Hook Form + Zod.",
    details: [
      "Student, faculty, exam, and attendance management",
      "Strict form validation and schema validation with Zod",
      "Predictable client-side state handling with Zustand",
    ],
    techStack: [
      "Next.js",
      "Tailwind CSS",
      "TypeScript",
      "Zustand",
      "React Hook Form",
      "Zod",
    ],
    image: "/school_admin.PNG",
    liveUrl:
      "https://school-management-dahboard-3n3wojjq9-abu-haneefah-s-projects.vercel.app/list/exams?_vercel_share=wkPlg9t0VBzzn5ZpYSd9JR1QChtMn52h",
    featured: true,
    color: "from-violet-600/20 via-purple-500/10 to-pink-600/20",
  },
  {
    id: "loop-freight",
    title: "Loop Freight Logistics",
    subtitle: "Digital Logistics & Fleet Platform",
    year: "2024",
    category: "Web App",
    description:
      "Engineered an interactive, responsive freight operations landing and tracking experience tailored for enterprise cargo movement.",
    techStack: ["Next.js", "Tailwind CSS", "TypeScript", "Framer Motion"],
    image: "/loopshot.png",
    liveUrl:
      "https://loop-frieght-e3caqcu4b-abu-haneefah-s-projects.vercel.app/",
    featured: false,
    color: "from-slate-600/20 via-zinc-500/10 to-neutral-600/20",
  },
  {
    id: "real-estate",
    title: "Real Estate Portal",
    subtitle: "Property Listings & Real Estate Web App",
    year: "2024",
    category: "Web App",
    description:
      "Modern real estate web application featuring property search, category filtering, responsive gallery previews, and inquiry booking.",
    techStack: ["React", "Tailwind CSS", "TypeScript"],
    image: "/ecommerce4.PNG",
    liveUrl: "https://real-estate-ten-gray.vercel.app",
    featured: false,
    color: "from-rose-600/20 via-pink-500/10 to-red-600/20",
  },
];

export const EXPERIENCES: Experience[] = [
  {
    role: "Frontend Developer",
    company: "Miraton Madador Group (MMG)",
    period: "March 2025 – Present",
    description: [
      "Built and maintained scalable, responsive web applications using React, Next.js, and TypeScript in a remote-first, distributed team environment.",
      "Collaborated asynchronously with designers, backend engineers, and product managers across time zones using Git-based workflows and documented processes.",
      "Developed reusable UI components with Tailwind CSS, reducing development time by 30% and ensuring design consistency across projects.",
      "Modernized legacy frontend systems by migrating to React, improving maintainability and reducing bugs by 60%.",
      "Integrated REST APIs, implemented robust form validation, and handled edge cases to ensure reliable user experiences.",
      "Optimized performance through code splitting, lazy loading, and efficient state management, improving page load speed by 40%.",
      "Took ownership of frontend features from requirements to deployment, ensuring quality, accessibility, and on-time delivery in a remote setup.",
      "Implemented multi-language feature support.",
    ],
  },
  {
    role: "Frontend Developer",
    company: "ForthBridge Technologies",
    period: "March 2024 – March 2025",
    description: [
      "Implemented pixel-perfect user interfaces from Figma designs using React, Next.js, and Tailwind CSS.",
      "Built dynamic dashboards and data-driven pages with efficient state and props management.",
      "Integrated REST APIs and handled loading, error, and empty states for smooth user experiences.",
      "Developed form-heavy workflows with client-side validation and user feedback mechanisms.",
      "Improved application scalability by organizing codebases into modular, maintainable structures.",
    ],
  },
  {
    role: "Frontend Developer",
    company: "Excel Tech",
    period: "October 2023 – March 2024",
    description: [
      "Built and deployed 10+ responsive web applications using React and Next.js, improving page load performance by 40%.",
      "Designed and maintained a reusable component library with Tailwind CSS, reducing development time by 30% across projects.",
      "Refactored and migrated legacy frontend codebases to React, improving maintainability and reducing bugs by 60%.",
      "Collaborated with backend engineers and designers to deliver scalable, production-ready features.",
      "Optimized UI performance and accessibility through efficient component architecture and best practices.",
    ],
  },
];
