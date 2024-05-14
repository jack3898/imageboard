import { clsx as classNameExtend, type ClassValue } from "clsx";
import { twMerge as tailwindMerge } from "tailwind-merge";

/**
 * Intelligently merge tailwind classes together and trim whitespace.
 */
export function cn(...inputs: ClassValue[]): string {
  return tailwindMerge(classNameExtend(inputs));
}
