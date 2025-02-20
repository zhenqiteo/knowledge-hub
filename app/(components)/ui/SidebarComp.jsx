"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { IoChevronDown } from "react-icons/io5";

import { motion } from "framer-motion";
import Button from "./Button";

const smoothDropdown = {
  hidden: {
    height: 0,
    transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
  },
  visible: {
    height: "auto",
    transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
  },
};

const SubMenu = React.memo(({ item, handleClose }) => {
  const [subnav, setSubnav] = useState(false);
  const showSubnav = useCallback(() => setSubnav((prev) => !prev), []);

  return (
    <>
      {item.content ? (
        <div
          onClick={showSubnav}
          className="transition-all duration-300 flex justify-between items-center text-sm py-3 px-4 rounded-lg hover:bg-white/10 cursor-pointer"
        >
          <span>{item.title}</span>
          <IoChevronDown
            className={`transition-transform duration-300 ${
              subnav ? "rotate-180" : ""
            }`}
          />
        </div>
      ) : (
        <Link
          href={item.slug}
          onClick={handleClose}
          target={item.blank ? "_blank" : undefined}
          rel={item.blank ? "noopener noreferrer" : undefined}
          className="transition-all duration-300 flex justify-between items-center text-sm py-3 px-4 rounded-lg hover:bg-white/10 cursor-pointer"
        >
          {item.title}
        </Link>
      )}
      {item.content && (
        <motion.div
          initial="hidden"
          animate={subnav ? "visible" : "hidden"}
          variants={smoothDropdown}
          className="text-sm overflow-hidden flex flex-col"
        >
          {item.content.map((subItem, index) => (
            <Link
              href={subItem.slug}
              onClick={handleClose}
              key={index}
              className="mt-1 flex pl-8 items-center gap-1 text-white"
            >
              -
              <div className="transition-all duration-300 flex justify-between items-center py-2 px-3 rounded-lg hover:bg-white/10 cursor-pointer">
                {subItem.title}
              </div>
            </Link>
          ))}
          <div className="h-1" />
        </motion.div>
      )}
    </>
  );
});

SubMenu.displayName = "SubMenu";

export default function SidebarComp({ data, handleClose }) {
  return (
    <motion.div className="flex flex-col divide-y divide-white/10">
      {data.map((item, index) => (
        <SubMenu handleClose={handleClose} item={item} key={index} />
      ))}
      <Link
        href="/OnlineAdmission"
        onClick={handleClose}
        className="sm:hidden pt-4"
      >
        <Button size="small">Contact Us</Button>
      </Link>
    </motion.div>
  );
}
