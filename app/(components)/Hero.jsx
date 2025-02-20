"use client";
import React from "react";
import { Badge } from "./ui/Badge";
import { useCallback, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { isTab } from "../(utils)/utils";
import Pagination from "./ui/Pagination";

const Data = [
  {
    id: 1,
    heading: "Digitalizing Oil & Gas: Supcon's Role in Operational Excellence",
    img: "url(./hero.png)",
  },
  {
    id: 2,
    heading: "TPT - Time-series Pre-trained Transformer",
    img: "url(./hero.png)",
  },
  {
    id: 3,
    heading: "Automation & Safety Control System (Webfield TCS-900 SIS)",
    img: "url(./hero.png)",
  },
];

export const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const controls = useAnimation();
  const slides = [...Data]; // Duplicate slides for seamless looping.

  // Handle infinite loop
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const handleNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const handlePrev = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  return (
    <section
      style={{
        backgroundImage: slides[currentSlide || 0]?.img,
        backgroundSize: "cover",
      }}
      className="relative h-screen flex bg-dark text-light pt-28 md:pt-[8.5rem]"
    >
      <div className="relative z-10 flex-1 flex flex-col justify-between max-w-screen-2xl mx-auto px-5">
        <div className="flex flex-col gap-1">
          <div className="flex gap-2 mb-4">
            <Badge variant="outline" className={"text-light"}>
              Case Studies
            </Badge>
            <Badge variant="outline" className={"text-light"}>
              Oil and Gas
            </Badge>
            <Badge variant="outline" className={"text-light"}>
              AI
            </Badge>
          </div>
          <h1 className="text-[min(10vw,3.5rem)] md:text-[3.5rem] leading-tight max-w-[26ch]">
            {slides[currentSlide || 0]?.heading}
          </h1>
        </div>
        <div className="py-6 md:py-12 grid max-md:gap-6 grid-cols-1 md:grid-cols-4">
          <div className="col-span-1 md:col-span-3 overflow-hidden">
            <div className="flex-1 gap-4 flex flex-nowrap w-fit text-white">
              {slides.map((item, index) => {
                const isFirstVisible = index === currentSlide % slides.length;
                return (
                  <motion.div
                    key={index}
                    className={`flex-shrink-0 w-[calc((100vw-3rem)/1)] md:w-[calc((75vw-4.75rem)/3)] 2xl:w-[calc((1020px-4.75rem)/3)] flex-1 flex flex-col gap-3 transition-opacity duration-300 ${
                      isFirstVisible ? "" : "opacity-20"
                    }`}
                  >
                    <div className="relative bg-grayD h-0.5 w-full">
                      <motion.div
                        animate={
                          isFirstVisible
                            ? { width: ["0%", "100%"] } // Animate from 0% to 100% when visible
                            : { width: "0%" } // Reset to 0% when not visible
                        }
                        transition={{
                          duration: isFirstVisible ? 7 : 0, // 5s animation for visible slides, none for others
                          ease: "linear",
                        }}
                        className="absolute bg-current h-full"
                      ></motion.div>
                    </div>
                    <p className="text-xs">
                      {item.id.toString().padStart(2, "0")}
                    </p>
                    <h5 className="text-base leading-tight capitalize">
                      {item.heading}
                    </h5>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="col-span-1 flex justify-end md:items-end gap-3">
            <Pagination
              prevClick={handlePrev}
              nextClick={handleNext}
              loop
              length={slides.length} // Original number of slides
              currentSlide={currentSlide % Data.length}
            />
          </div>
        </div>
      </div>
      <div className="h-[50%] w-full absolute bottom-0 bg-gradient-to-t from-black to-transparent left-0 pointer-events-none"></div>
    </section>
  );
};
