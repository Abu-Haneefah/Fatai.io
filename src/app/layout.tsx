import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TransitionProvider from "@/components/transitionProvider";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jabar Fatai | Frontend Developer Portfolio",
  icons: "/favicon.ico",
  keywords:
    "Jabar Fatai, portfolio, frontend developer, React, Next.js, TypeScript, Tailwind CSS, shadcn, mobile developer, React Native, fintech, modern dashboard",
  description:
    "Portfolio of Jabar Fatai — Results-driven Frontend Developer with 3+ years experience building scalable, high-performance web applications using React, Next.js, and TypeScript.",
  authors: [{ name: "Jabar Fatai" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TransitionProvider>{children}</TransitionProvider>
      </body>
    </html>
  );
}
