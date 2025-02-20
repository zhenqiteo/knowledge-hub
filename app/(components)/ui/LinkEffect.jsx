import React from "react";
import ArrowLink from "@/app/(assets)/ArrowLink";
import { cn } from "@/app/(utils)/utils";

export default function LinkEffect({
  text,
  noicon,
  textClass,
  hoverColor,
  iconClass,
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-[0.3em] text-inherit font-[inherit] leading-[1.5] whitespace-nowrap relative group py-2",
        textClass
      )}
    >
      <span className="relative flex overflow-hidden">
        <span className="duration-500 group-hover:-translate-y-full">
          {text}
        </span>
        <span
          className={cn(
            "absolute top-0 left-0 translate-y-full transition-transform duration-500 ease group-hover:translate-y-0",
            hoverColor
          )}
        >
          {text}
        </span>
      </span>
      {!noicon && (
        <span className={cn("relative flex h-full overflow-hidden", iconClass)}>
          <span className="flex flex-1 p-[0.3em] h-full transition-transform duration-500 ease group-hover:-translate-y-full group-hover:translate-x-full ">
            <ArrowLink className="w-[1ch]" />
          </span>
          <span
            className={cn(
              "p-[0.3em] absolute top-0 left-0 translate-x-[-100%] translate-y-full group-hover:translate-y-0 group-hover:translate-x-0 transition-transform duration-500 ease",
              hoverColor
            )}
          >
            <ArrowLink className="w-[1ch]" />
          </span>
        </span>
      )}
    </span>
  );
}
