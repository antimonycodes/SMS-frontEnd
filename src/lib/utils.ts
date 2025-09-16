import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Dynamically import all images from the assets folder using Vite's import.meta.glob
const images = import.meta.glob("/src/assets/*.(png|jpe?g|svg)", {
  eager: true,
  import: "default",
}) as Record<string, string>;

/**
 * Retrieves the image source URL by filename.
 * @param filename - The image filename (e.g., "logo.png").
 * @returns The image URL or an empty string if not found.
 */
export const getImageSrc = (filename: string): string => {
  const path = Object.keys(images).find((key) => key.includes(filename));
  return path ? images[path] : "";
};

export const useRole = (): string | null => {
  // const { role } = useAuthStore();
  // return role || (localStorage.getItem("role") as string | null);
  return localStorage.getItem("role") as string | null;
};

// Custom hook for debouncing values
import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Alternative version with loading state
export function useDebounceWithLoading<T>(
  value: T,
  delay: number
): [T, boolean] {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const [isDebouncing, setIsDebouncing] = useState(false);

  useEffect(() => {
    setIsDebouncing(true);
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      setIsDebouncing(false);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return [debouncedValue, isDebouncing];
}
