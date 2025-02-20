"use client";

import Image from "next/image";
import React from "react";
import { Badge } from "../ui/Badge";
import { LuAlarmClock } from "react-icons/lu";
import { FaRegFilePdf } from "react-icons/fa6";
import { MdOutlineFileDownload } from "react-icons/md";
import Link from "next/link";

const Card = ({ item }) => {
  const handleDownload = () => {
    if (item.file) {
      window.open(item.file.link, "_blank");
    }
  };

  return (
    <div className="group col-span-1 flex flex-col gap-2 md:gap-3 border-b border-black/30 pb-2 sm:pb-3">
      <div className="w-full aspect-video sm:aspect-[1.5] overflow-hidden mb-2 md:mb-3 bg-black/10 rounded-md">
        <Image
          src={item.img}
          alt={item.heading}
          width={400}
          height={400}
          className="object-cover block w-full transition-transform duration-300"
        />
      </div>
      <div className="w-full flex gap-2 flex-wrap whitespace-nowrap">
        {item.categories?.map((cat, index) => {
          return (
            <Badge key={index} variant="outline" className={"text-sec"}>
              {cat}
            </Badge>
          );
        })}
      </div>
      {item.heading && (
        <Link
          href={item.slug || ""}
          className="font-medium text-xl md:text-2xl leading-tight"
        >
          {item.heading}
        </Link>
      )}
      {item.sub && (
        <p className="text-sm md:text-base text-grayD">{item.sub}</p>
      )}
      <div className="mt-auto md:h-9 flex items-center gap-2 text-sm text-grayD w-full">
        <small>{item.date}</small>
        {item.time && (
          <>
            <hr className="w-px h-3 bg-current align-middle" />
            <small className="flex items-center gap-1">
              <LuAlarmClock /> {item.time}
            </small>
          </>
        )}
        {item.file && (
          <>
            <hr className="w-px h-3 bg-current align-middle" />
            <div className="flex-grow flex justify-between gap-2 items-center">
              <small className="flex items-center gap-1">
                <FaRegFilePdf /> {item.file.size}
              </small>
              <button
                onClick={handleDownload}
                className="border border-black/30 size-7 md:size-9 grid place-content-center rounded-full text-base"
              >
                <MdOutlineFileDownload />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
