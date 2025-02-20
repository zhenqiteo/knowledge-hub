import ArrowLink from "@/app/(assets)/ArrowLink";
import { cn } from "@/app/(utils)/utils";
import React from "react";

const Pagination = ({
  currentSlide,
  prevClick,
  nextClick,
  length,
  loop = false,
}) => {
  const isFirstSlide = loop ? false : currentSlide <= 0;
  const isLastSlide = loop ? false : currentSlide >= length - 1;

  return (
    <>
      <button
        onClick={prevClick}
        disabled={!loop && isFirstSlide}
        className={cn(
          "disabled:cursor-default disabled:bg-opacity-80 transition-all duration-200 border h-11 w-11 md:h-14 md:w-14 grid place-content-center rounded-full cursor-pointer border-white/30",
          !isFirstSlide && "hover:scale-105 active:scale-100 bg-dark text-white"
        )}
        aria-label="Previous review"
      >
        <ArrowLink className={"w-3 -rotate-[135deg]"} />
      </button>

      <button
        onClick={nextClick}
        disabled={!loop && isLastSlide}
        className={cn(
          "disabled:cursor-default disabled:bg-opacity-80 transition-all duration-200 border h-11 w-11 md:h-14 md:w-14 grid place-content-center rounded-full cursor-pointer border-white/30",
          !isLastSlide && "hover:scale-105 active:scale-100 bg-dark text-white"
        )}
        aria-label="Next review"
      >
        <ArrowLink className={"w-3 rotate-45"} />
      </button>
    </>
  );
};

export default Pagination;
