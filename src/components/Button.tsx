"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

export interface CustomButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  target?: string;
  rel?: string;
}

const CustomButton = ({
  href,
  onClick,
  children,
  variant = "primary",
  className = "",
  target,
  rel,
}: CustomButtonProps) => {
  const baseClasses =
    "font-semibold py-2 px-4 rounded-lg transition-all duration-300 ease-in-out text-center inline-block";

  const variants = {
    primary:
      "bg-slate-900 text-white hover:bg-slate-800 shadow-md hover:shadow-lg",
    secondary:
      "bg-slate-100 text-slate-800 hover:bg-slate-200 shadow-xs hover:shadow-sm",
    outline:
      "bg-transparent border border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white shadow-xs hover:shadow-sm",
  };

  const buttonContent = (
    <motion.button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );

  return href ? (
    <Link href={href} target={target} rel={rel}>
      {buttonContent}
    </Link>
  ) : (
    buttonContent
  );
};

export default CustomButton;
