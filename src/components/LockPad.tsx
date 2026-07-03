"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface LockPadProps {
  onUnlock: () => void;
}

const ROWS = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["*", "0", "#"],
];

export default function LockPad({ onUnlock }: LockPadProps) {
  const [pin, setPin] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const containerRef = useRef<HTMLDivElement>(null);
  const ledRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.92 },
      { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }
    );
  }, []);

  function handleKey(key: string) {
    if (status !== "idle") return;

    if (key === "*") {
      setPin((p) => p.slice(0, -1));
      return;
    }

    if (key === "#") {
      if (pin.length === 0) return;
      triggerUnlock(pin);
      return;
    }

    const next = [...pin, key];
    setPin(next);
    if (next.length === 4) {
      setTimeout(() => triggerUnlock(next), 180);
    }
  }

  function triggerUnlock(digits: string[]) {
    if (digits.length === 0 || status !== "idle") return;
    setStatus("success");

    gsap.to(ledRef.current, {
      backgroundColor: "#4ade80",
      boxShadow: "0 0 8px rgba(74,222,128,0.8)",
      duration: 0.2,
    });

    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.5,
      delay: 0.65,
      ease: "power2.in",
      onComplete: onUnlock,
    });
  }

  return (
    /*
     * Positioned to overlay the door keypad visible at LOCK_FRAME (frame 155).
     * Keypad center in the video frame is at ~50% from left, ~51% from top.
     */
    <div
      className="absolute z-30 pointer-events-none"
      style={{ left: "50%", top: "51%", transform: "translate(-50%, -50%)" }}
    >
      <div
        ref={containerRef}
        className="pointer-events-auto"
        style={{ opacity: 0 }}
      >
        {/* Keypad shell — matches door keypad in the video */}
        <div
          style={{
            width: 95,
            background: "linear-gradient(180deg, #0e1014 0%, #080a0c 100%)",
            borderRadius: 9,
            border: "1px solid rgba(210,215,225,0.20)",
            boxShadow:
              "0 8px 32px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.07), inset 0 -1px 0 rgba(0,0,0,0.6)",
            padding: "10px 8px 10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0,
          }}
        >
          {/* LED indicator dot */}
          <div
            ref={ledRef}
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background:
                pin.length > 0
                  ? "rgba(255,255,255,0.65)"
                  : "rgba(255,255,255,0.18)",
              boxShadow:
                pin.length > 0 ? "0 0 5px rgba(255,255,255,0.4)" : "none",
              transition: "background 0.2s, box-shadow 0.2s",
              marginBottom: 7,
            }}
          />

          {/* 4-digit PIN indicator */}
          <div
            style={{
              display: "flex",
              gap: 7,
              marginBottom: 8,
              padding: "4px 8px",
              borderRadius: 4,
              background: "rgba(255,255,255,0.04)",
            }}
          >
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background:
                    i < pin.length
                      ? "rgba(255,255,255,0.85)"
                      : "rgba(255,255,255,0.15)",
                  boxShadow:
                    i < pin.length
                      ? "0 0 4px rgba(255,255,255,0.5)"
                      : "none",
                  transform: i < pin.length ? "scale(1.15)" : "scale(1)",
                  transition: "background 0.15s, box-shadow 0.15s, transform 0.15s",
                }}
              />
            ))}
          </div>

          {/* Numpad rows */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              width: "100%",
            }}
          >
            {ROWS.map((row, ri) => (
              <div
                key={ri}
                style={{ display: "flex", gap: 1, justifyContent: "center" }}
              >
                {row.map((key) => {
                  const isSymbol = key === "*" || key === "#";
                  return (
                    <button
                      key={key}
                      onClick={() => handleKey(key)}
                      style={{
                        width: 28,
                        height: 25,
                        background: "transparent",
                        border: "none",
                        color: isSymbol
                          ? "rgba(255,255,255,0.26)"
                          : "rgba(255,255,255,0.88)",
                        fontSize: isSymbol ? 10 : 13,
                        fontWeight: isSymbol ? 400 : 500,
                        fontFamily: "var(--font-jakarta), sans-serif",
                        letterSpacing: "0.03em",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 4,
                        transition: "background 0.08s",
                      }}
                      onMouseDown={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background =
                          "rgba(255,255,255,0.12)";
                      }}
                      onMouseUp={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background =
                          "transparent";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background =
                          "transparent";
                      }}
                    >
                      {key}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Fingerprint circle button */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => {
              if (status === "idle" && pin.length > 0) triggerUnlock(pin);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && status === "idle" && pin.length > 0)
                triggerUnlock(pin);
            }}
            style={{
              marginTop: 9,
              width: 33,
              height: 33,
              borderRadius: "50%",
              border: "1.5px solid rgba(255,255,255,0.22)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "border-color 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor =
                "rgba(255,255,255,0.5)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor =
                "rgba(255,255,255,0.22)";
            }}
          >
            <div
              style={{
                width: 19,
                height: 19,
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.18)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
