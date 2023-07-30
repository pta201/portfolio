import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFacebookAvatar(id: string) {
  return `https://graph.facebook.com/${id}/picture`;
}
