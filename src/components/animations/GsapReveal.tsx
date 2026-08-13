"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface GsapRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "fade";
  duration?: number;
}

export default function GsapReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.62,
}: GsapRevealProps) {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const el = elRef.current;
    if (!el) return;

    let x = 0;
    let y = 0;

    if (direction === "up") y = 12;
    if (direction === "down") y = -12;
    if (direction === "left") x = 12;
    if (direction === "right") x = -12;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          scale: 0.97,
          filter: "blur(6px)",
          x,
          y,
        },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          x: 0,
          y: 0,
          duration,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [delay, direction, duration]);

  return (
    <div
      ref={elRef}
      className={className}
      style={{ willChange: "transform, opacity, filter" }}
    >
      {children}
    </div>
  );
}
