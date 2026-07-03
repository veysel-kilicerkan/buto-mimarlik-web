"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.5, ease: "power3.out" });
    const xDot = gsap.quickTo(dot, "x", { duration: 0.1, ease: "none" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.1, ease: "none" });

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      xDot(e.clientX);
      yDot(e.clientY);
    };

    const onEnter = () => {
      gsap.to(cursor, { scale: 2.2, duration: 0.3, ease: "power2.out" });
    };

    const onLeave = () => {
      gsap.to(cursor, { scale: 1, duration: 0.3, ease: "power2.out" });
    };

    window.addEventListener("mousemove", onMove);

    const interactives = document.querySelectorAll("a, button, input, [data-cursor]");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    const observer = new MutationObserver(() => {
      document.querySelectorAll("a, button, input, [data-cursor]").forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Outer ring */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[200] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{ top: 0, left: 0 }}
      >
        <div className="w-10 h-10 rounded-full border border-white/70" />
      </div>

      {/* Inner dot */}
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[201] -translate-x-1/2 -translate-y-1/2"
        style={{ top: 0, left: 0 }}
      >
        <div className="w-3 h-3 rounded-full bg-earth" />
      </div>
    </>
  );
}
