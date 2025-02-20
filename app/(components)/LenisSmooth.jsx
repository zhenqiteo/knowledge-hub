"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const LenisSmooth = () => {
  const lenisRef = useRef(null);
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });
  }, [pathname]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;

    lenis.on("scroll", (e) => {
      ScrollTrigger.update();
      setShowScrollTop(lenis.scroll > 100); // Show button if scrolled more than 100px
    });

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  const scrollToTop = () => {
    lenisRef.current.scrollTo(0); // Smooth scroll to top
  };

  if (!mounted) {
    return null; // or a loading state
  }

  return (
    <>
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 sm:bottom-6 right-5 sm:right-12 z-50 cursor-pointer transition-opacity duration-300 opacity-80 sm:opacity-40 hover:opacity-60"
        >
          <svg
            className="size-12 sm:size-24"
            viewBox="0 0 96 96"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="47.998" cy="48" r="48" fill="black" />
            <path
              d="M62.1149 53.6104L59.6091 56.1162L47.9976 44.5047L36.386 56.1162L33.8802 53.6104L47.9976 39.493L62.1149 53.6104Z"
              fill="white"
            />
          </svg>
        </button>
      )}
    </>
  );
};

export default LenisSmooth;
