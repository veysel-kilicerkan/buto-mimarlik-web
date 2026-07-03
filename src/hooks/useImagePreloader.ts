"use client";

import { useState, useEffect, useRef } from "react";
import { TOTAL_FRAMES, getFrameUrl } from "@/lib/constants";

interface PreloaderResult {
  progress: number;
  isLoaded: boolean;
  images: HTMLImageElement[];
}

export function useImagePreloader(): PreloaderResult {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    const promises = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
      return new Promise<HTMLImageElement>((resolve) => {
        const img = new Image();
        img.src = getFrameUrl(i);
        img.onload = () => {
          loadedCount++;
          setProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
          resolve(img);
        };
        img.onerror = () => {
          loadedCount++;
          setProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
          resolve(img);
        };
        images[i] = img;
      });
    });

    Promise.all(promises).then((loaded) => {
      imagesRef.current = loaded;
      setIsLoaded(true);
    });
  }, []);

  return { progress, isLoaded, images: imagesRef.current };
}
