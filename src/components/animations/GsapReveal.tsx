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
  duration = 0.9,
}: GsapRevealProps) {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const el = elRef.current;
    if (!el) return;

    let x = 0;
    let y = 0;

    if (direction === "up") y = 35;
    if (direction === "down") y = -35;
    if (direction === "left") x = 35;
    if (direction === "right") x = -35;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          x,
          y,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            // Trigger threshold: 3er tercio de la pantalla (2/3 visibles, 1/3 inferior)
            start: "top 66.6%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [delay, direction, duration]);

  return (
    <div ref={elRef} className={className}>
      {children}
    </div>
  );
}
