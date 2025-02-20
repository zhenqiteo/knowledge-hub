"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import SidebarComp from "./ui/SidebarComp";
import Button from "./ui/Button";
import { IoChevronDown } from "react-icons/io5";
import LinkEffect from "./ui/LinkEffect";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const NavList = [
  {
    title: "Solutions",
    content: [
      { title: "Solutions1", slug: "/Solutions1" },
      { title: "Solutions2", slug: "/Solutions2" },
      { title: "Solutions3", slug: "/Solutions3" },
    ],
  },
  {
    title: "Industries",
    content: [
      { title: "Industries1", slug: "/Industries1" },
      { title: "Industries2", slug: "/Industries2" },
      { title: "Industries3", slug: "/Industries3" },
    ],
  },
  {
    title: "Resources",
    slug: "/Resources",
  },
  {
    title: "Newsroom",
    slug: "/Newsroom",
  },
  {
    title: "Career",
    slug: "/Career",
  },
  {
    title: "About Us",
    content: [
      { title: "About1", slug: "/About1" },
      { title: "About2", slug: "/About2" },
      { title: "About3", slug: "/About3" },
    ],
  },
];

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef();

  const handleMouseEnter = (index, event) => {
    setActiveDropdown(index);
    const margin = 48;
    const navItemRect = event.currentTarget.getBoundingClientRect();
    const dropdownWidth = 16 * 14; // Approximate dropdown width, adjust as needed
    const screenWidth = window.innerWidth;
    let leftPosition = navItemRect.left;

    if (leftPosition + dropdownWidth > screenWidth) {
      leftPosition = screenWidth - dropdownWidth - margin; // Adjust with some margin
    }

    if (leftPosition < 10) {
      leftPosition = margin; // Adjust with some margin
    }

    setDropdownPosition(leftPosition);
  };

  const handleNavOpen = () => {
    setIsOpen(true);
  };

  const handleNavClose = () => {
    setIsOpen(false);
  };

  const transition = {
    duration: 0.8,
    type: "tween",
    ease: [0.76, 0, 0.24, 1],
  };

  useGSAP(() => {
    const tl = gsap.timeline().to(headerRef.current, {
      background: "#000",
    });
    ScrollTrigger.create({
      trigger: headerRef.current,
      start: "top+=50 top",
      end: "top+=500 top",
      animation: tl,
      scrub: true,
    });
  });

  return (
    <header ref={headerRef} className="fixed top-0 w-full z-[1000] py-5">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={transition}
        className="relative w-full flex max-w-full"
      >
        <div className="max-w-screen-2xl mx-auto px-5 flex-1 flex items-center justify-between rounded-xl text-light">
          <Link href={"/"} name="home link">
            <Image
              src={"/logo.svg"}
              width={300}
              height={200}
              alt="Logo"
              className="h-5 w-auto"
            />
          </Link>
          <div
            onMouseLeave={() => setActiveDropdown(null)}
            className="max-lg:hidden"
          >
            <div className="flex items-center gap-0 font-medium text-xs xl:text-sm">
              {NavList.map((item, index) => {
                const isDisabled = item.content?.length > 0;
                const linkProps = {
                  onMouseEnter: (event) => handleMouseEnter(index, event),
                  className: `group flex items-center gap-2 text-center transition-all duration-300 py-2 px-3 xl:px-4 rounded-lg select-none leading-[1.1]`,
                  target: item.blank ? "_blank" : "_self",
                  rel: item.blank ? "noopener noreferrer" : "",
                };

                return !isDisabled && item.slug ? (
                  <Link {...linkProps} key={index} href={item.slug}>
                    <LinkEffect noicon text={item.title} />
                  </Link>
                ) : (
                  <div {...linkProps} key={index}>
                    <LinkEffect noicon text={item.title} />
                    <div
                      className={`transition-transform duration-300 ${
                        activeDropdown === index
                          ? "rotate-180"
                          : "group-hover:rotate-180"
                      }`}
                    >
                      <IoChevronDown />
                    </div>
                  </div>
                );
              })}
            </div>
            <AnimatePresence>
              {activeDropdown != null && NavList[activeDropdown]?.content && (
                <motion.div
                  initial={{
                    opacity: 0,
                    left: dropdownPosition,
                    y: -20,
                    scale: 0.95,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    left: dropdownPosition,
                    transition: {
                      duration: 0.3,
                      ease: "easeOut",
                    },
                  }}
                  exit={{
                    opacity: 0,
                    y: 0,
                    scale: 0.95,
                    transition: {
                      duration: 0.2,
                      ease: "easeIn",
                    },
                  }}
                  className="origin-top w-[10rem] max-w-full absolute pt-1 top-[calc(100%-0.3rem)]"
                >
                  <div className="bg-black shadow-[0_0.2rem_0.5rem_0_#00000020] backdrop-blur-md rounded-lg p-2 text-sm">
                    <ul className="flex flex-col divide-y divide-white/10">
                      {NavList[activeDropdown]?.content.map(
                        (subItem, subIndex) => (
                          <li key={subIndex} className="flex">
                            <Link
                              className="p-2.5 flex-1 transition-all duration-200 hover:bg-white/5 opacity-70 hover:opacity-100 rounded-lg"
                              href={`${subItem.slug}`}
                            >
                              {subItem.title}
                            </Link>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link
            className="max-lg:hidden"
            href={"/OnlineAdmission"}
            name="admission link"
          >
            <Button rounded btnType="ghost" size="small">
              Contact Us
            </Button>
          </Link>
          <button
            onClick={handleNavOpen}
            className="lg:hidden transition-all duration-300 hover:bg-white/10 h-10 w-10 grid place-content-center rounded-lg text-2xl"
          >
            <FiMenu />
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              key={"Navbar"}
              className="fixed w-full h-screen z-[999] right-0 top-0"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={transition}
                onClick={handleNavClose}
                className="absolute inset-0 bg-dark/50"
              ></motion.div>
              <motion.div
                initial={{ x: "0" }}
                animate={{ x: "-100%" }}
                exit={{
                  x: "0",
                }}
                onAnimationComplete={(definition) => {
                  if (definition.x === "0") {
                    document.body.classList.remove("hide-scrollbar");
                  }
                }}
                transition={transition}
                data-lenis-prevent
                className="p-4 flex flex-col gap-2 absolute left-full top-0 z-10 bg-black text-white h-full max-h-[100dvh] w-[min(380px,90%)] rounded-s-2xl overflow-y-auto"
              >
                <div className="px-2 py-4 mb-4 rounded-xl flex gap-2 items-center justify-between">
                  <Link href={"/"} name="home link">
                    <Image
                      src={"/logo.svg"}
                      width={300}
                      height={200}
                      alt="Logo"
                      className="h-5 w-auto"
                    />
                  </Link>
                  <button
                    onClick={handleNavClose}
                    className="transition-all duration-300 hover:bg-white/10 h-10 w-10 grid place-content-center rounded-full text-2xl"
                  >
                    <RxCross2 />
                  </button>
                </div>
                <SidebarComp data={NavList} handleClose={handleNavClose} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
};

export default Navbar;
