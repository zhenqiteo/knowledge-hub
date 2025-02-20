import { cn } from "@/app/(utils)/utils";
import React from "react";

const Button = ({
  children,
  full = false,
  rounded = false,
  btnType = "main",
  size = "default",
  className,
  innerClass,
  ...props
}) => {
  const Types = {
    main: "bg-dark hover:bg-dark",
    sec: "bg-sec hover:bg-secD",
    ghost: "bg-transparent",
    link: "bg-transparent text-dark hover:bg-black/10",
  };

  const BTypes = {
    main: "border-dark hover:border-dark",
    sec: "border-sec hover:border-secD",
    ghost: "border-white/50 hover:border-white",
    link: "border-white/50 hover:border-white",
  };

  const Sizes = {
    default: "gap-2 h-9 md:h-12 px-7 text-sm md:text-base",
    small: "gap-2 h-7 md:h-8 px-5 text-xs md:text-sm",
  };

  const BSizes = {
    default: "border-[2px] p-[1px]",
    small: "border-[1px] p-[2px]",
  };

  const isFit = full ? "w-full" : "max-w-fit";

  return (
    <button
      {...props}
      className={cn(
        "group cursor-pointer border-opacity-0 bg-transparent transition-all duration-500 hover:border-opacity-100 text-light font-medium",
        isFit,
        rounded ? "rounded-full" : "rounded-[calc(0.5rem+3px)]",
        BTypes[btnType],
        BSizes[size],
        className
      )}
    >
      <div
        className={cn(
          "relative transition-all duration-500 overflow-hidden !leading-[1.1] flex items-center",
          isFit,
          rounded ? "rounded-full" : "rounded-lg",
          Types[btnType],
          Sizes[size],
          innerClass
        )}
      >
        {children}
        <div
          className={cn(
            "absolute rotate-[30deg] scale-y-150 bg-light/20 transition-all duration-700 -left-16 top-1/2 -translate-y-1/2 h-[200%] w-12  group-hover:left-[calc(100%+1rem)] group-active::-left-16"
          )}
        />
      </div>
    </button>
  );
};

export default Button;
