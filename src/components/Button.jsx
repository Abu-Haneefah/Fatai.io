// components/ui/Button.jsx
"use client";
import { motion } from "framer-motion";
import Link from "next/link"; // Use next/link for internal navigation

const Button = ({
  href,
  onClick,
  children,
  variant = "primary",
  className = "",
}) => {
  const baseClasses =
    "font-semibold py-2 px-4 rounded-lg transition-all duration-300 ease-in-out text-center";

  const variants = {
    primary:
      "bg-primary text-white hover:bg-blue-700 active:bg-blue-800 shadow-md hover:shadow-lg",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400 shadow-sm hover:shadow-md",
    outline:
      "bg-transparent border border-primary text-primary hover:bg-primary hover:text-white active:bg-blue-700 shadow-sm hover:shadow-md",
  };

  const buttonContent = (
    <motion.button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );

  return href ? (
    <Link href={href} passHref>
      {buttonContent}
    </Link>
  ) : (
    buttonContent
  );
};

export default Button;
