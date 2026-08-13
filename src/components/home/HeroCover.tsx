"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";

export default function HeroCover() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        heroRef.current,
        { scale: 1.04, opacity: 0.85 },
        { scale: 1, opacity: 1, duration: 1.6 }
      )
        .fromTo(
          textRef.current?.children || [],
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.16, duration: 1.2 },
          "-=1.1"
        )
        .fromTo(
          badgeRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.6"
        );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative w-full h-[100svh] min-h-[660px] flex items-end overflow-hidden bg-[#0a0a0a]">
      {/* FULL-SCREEN HERO BACKGROUND IMAGE (FULL-BLEED PPTX BLUEPRINT) */}
      <div ref={heroRef} className="absolute inset-0 w-full h-full">
        <Image
          src="/images/hero/hero_cover_pptx.webp"
          alt="Ash Mateu — Creative Direction & High Fashion Styling"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_15%] sm:object-[60%_18%] filter brightness-[0.92] contrast-[1.03]"
        />
        {/* EDITORIAL VIGNETTE GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/25" />
      </div>

      {/* HERO OVERLAID CONTENT (BOTTOM-LEFT ALIGNED LIKE POWERPOINT SLIDE 1 & 2) */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 pb-14 md:pb-20">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <div ref={textRef} className="max-w-2xl text-white">
            {/* MICROSCOPIC EYEBROW BADGE WITH RED ACCENT DOT */}
            <div className="inline-flex items-center gap-2 border border-white/20 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-[9.5px] tracking-[0.26em] uppercase text-[#b5a898] mb-4 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EA2638] animate-pulse" />
              <span>Ash Mateu Prieto</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.04] tracking-tight text-white mb-4 drop-shadow-md">
              Styling <span className="italic font-light">people</span>,
              <br />
              <span className="italic font-light">brands</span> and{" "}
              <span className="italic font-light">ideas</span>
              <span className="text-[#EA2638]">.</span>
            </h1>

            <p className="text-sm md:text-base font-light text-white/85 tracking-wide mb-6 max-w-xl leading-relaxed">
              Creative Director &amp; Fashion Consultant.
            </p>

            <blockquote className="border-l-2 border-[#b5a898] pl-4 py-1 mb-8 text-xs md:text-sm italic text-white/75 max-w-lg leading-relaxed backdrop-blur-[2px]">
              ‘Construyo identidad a través de estrategias de branding y
              comunicación. Soy especialista en posicionar imagen de marcas y
              personas.’
            </blockquote>

            {/* BUTTON-IN-BUTTON NESTED ACTION LINKS */}
            <div className="flex flex-wrap items-center gap-4 text-xs tracking-[0.2em] uppercase font-medium">
              <Link
                href="/historia"
                className="group inline-flex items-center gap-3 bg-white text-black pl-5 pr-2 py-2 rounded-full font-semibold transition-all duration-300 hover:bg-[#b5a898] active:scale-[0.98] shadow-md"
              >
                <span>Mi Historia</span>
                <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight size={13} strokeWidth={2.2} />
                </div>
              </Link>
              <Link
                href="/como-trabajo"
                className="group inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 text-white border border-white/30 pl-5 pr-2 py-2 rounded-full font-medium transition-all duration-300 active:scale-[0.98] backdrop-blur-sm"
              >
                <span>¿Cómo Trabajo?</span>
                <div className="w-6 h-6 rounded-full bg-white/20 text-white flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight size={13} strokeWidth={2.2} />
                </div>
              </Link>
            </div>
          </div>

          {/* LOCATIONS & SCROLL INDICATOR */}
          <div
            ref={badgeRef}
            className="flex flex-col items-start lg:items-end text-white/70 text-[10px] tracking-[0.24em] uppercase gap-2.5"
          >
            <div className="flex items-center gap-2 border-b border-white/20 pb-1">
              <span>Buenos Aires · Nueva York · París</span>
            </div>
            <div className="flex items-center gap-2 text-[#b5a898] animate-bounce mt-1">
              <span className="text-xs">Scroll</span>
              <span>↓</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
