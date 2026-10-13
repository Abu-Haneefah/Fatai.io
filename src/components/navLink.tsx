"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export interface NavLinkProps {
  link: {
    url: string;
    title: string;
  };
}

const NavLink = ({ link }: NavLinkProps) => {
  const pathName = usePathname();
  const isActive = pathName === link.url;

  return (
    <Link
      className={`rounded p-1 transition-colors ${
        isActive ? "bg-black text-white" : "hover:bg-black/10"
      }`}
      href={link.url}
    >
      {link.title}
    </Link>
  );
};

export default NavLink;
