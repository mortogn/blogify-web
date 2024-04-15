"use client";

import React, { FC, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import cn from "@/utils/cn";

type Props = {
  label: string;
  href: string;
};

const NavItem: FC<Props> = ({ href, label }) => {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);

  const onMouseEnter = () => {
    setIsHovered(true);
  };
  const onMouseExit = () => {
    setIsHovered(false);
  };

  return (
    <li onMouseEnter={onMouseEnter} onMouseLeave={onMouseExit} className="relative px-4 py-2">
      <Link
        className={cn("relative z-10 font-space-grotesk font-medium transition-colors", {
          "text-white delay-75": pathname === href,
        })}
        href={href}
      >
        {label}
      </Link>

      {pathname === href && <motion.div layout layoutId="nav-hover-indicator" transition={{ duration: 0.5, type: "spring" }} className="absolute inset-0 bg-slate-800 rounded-md backdrop-invert" />}
    </li>
  );
};

NavItem.displayName = "NavItem";

export default NavItem;
