import { Inter } from "next/font/google";
import "./globals.css";
import TransitionProvider from "../components/transitionProvider";



const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Fatai.io",
  icons: "/favicon.ico", 
  keywords: "portfolio, web developer, software engineer",
  description: "A portfolio website for Fatai",
  authors: [{ name: "Fatai" }], 
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
     <TransitionProvider>
     {children}
     </TransitionProvider>
         
         
      </body>
    </html>
  );
}