import { cx } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

export default function cn(...classes: Parameters<typeof cx>) {
  return twMerge(cx(classes));
}
