// lib/utils.ts
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function isMobile() {
  return typeof window !== "undefined" && window.innerWidth < 640;
}

export function isTab() {
  return typeof window !== "undefined" && window.innerWidth < 768;
}
