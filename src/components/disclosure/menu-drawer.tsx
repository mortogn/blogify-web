"use client";

import React, { FC, Fragment, useState } from "react";
import Button from "../common/button";
import { MenuIcon, XIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { stagger } from "framer-motion";

type Props = {
  items: {
    label: string;
    href: string;
  }[];
};

const staggerMenuItem = stagger(0.1, { startDelay: 0.2 });

const MenuDrawer: FC<Props> = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDrawer = () => {
    setIsOpen(true);
  };

  const closeDrawer = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={openDrawer} size="icon" variant="ghost">
        <MenuIcon className="size-8" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              x: 400,
            }}
            animate={{ x: 0 }}
            exit={{
              x: 400,
            }}
            transition={{ duration: 0.3, type: "tween" }}
            className="fixed top-0 right-0 bottom-0 w-full bg-gray-800 text-white z-20 flex flex-col items-center justify-center"
          >
            <Button className="absolute top-10 right-10" size="icon" aria-label="Close the menu drawer" variant="ghost" onClick={closeDrawer}>
              <XIcon />
            </Button>
            <nav className="">
              <ul className="flex flex-col items-center justify-center ">
                {items.map((item, i) => (
                  <motion.li key={item.href} initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.04, type: "tween" }}>
                    <Link onClick={closeDrawer} className="font-medium w-full text-center text-3xl py-4 block" href={item.href}>
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MenuDrawer;
