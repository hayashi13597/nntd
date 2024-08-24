import { dataTypes } from "@/app/page";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sortData(data: any[]) {
  // sort data by nameInGame
  data.sort((a: dataTypes, b: dataTypes) =>
    a.nameInGame.localeCompare(b.nameInGame)
  );

  // sort data by order
  data.sort((a: dataTypes, b: dataTypes) => a.order - b.order);

  // sort data by role
  data.sort((a: dataTypes, b: dataTypes) => a.role - b.role);

  return data;
}

export function debounce(func: Function, timeout = 300) {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
}
