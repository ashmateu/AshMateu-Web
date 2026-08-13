"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
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
        { scale: 1.03, opacity: 0.8 },
        { scale: 1, opacity: 1, duration: 1.4 }
      )
        .fromTo(
          textRef.current?.children || [],
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.15, duration: 1.1 },
          "-=1.0"
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
    <section className="relative w-full h-[100svh] min-h-[660px] flex items-end overflow-hidden bg-gradient-to-r from-[#0a0a0a] via-[#0d1d29] to-[#18425e]">
      {/* ATMOSPHERIC BACKGROUND LIGHTING */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#1f5376]/40 via-transparent to-transparent pointer-events-none" />

      {/* HERO IMAGE CONTAINER: NATURAL FRAMING WITHOUT EXCESSIVE ZOOM */}
      <div
        ref={heroRef}
        className="absolute right-0 top-0 bottom-0 w-full lg:w-[62%] xl:w-[58%] h-full flex items-end justify-end pointer-events-none"
      >
        <div className="relative w-full h-full max-h-[100svh]">
          <Image
            src="/images/hero/hero_cover_pptx.webp"
            alt="Ash Mateu — Creative Direction & High Fashion Styling"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover lg:object-contain object-[center_12%] lg:object-right-bottom filter brightness-[0.96] contrast-[1.04]"
          />
          {/* SEAMLESS FADE TO LEFT (DESKTOP) & TOP/BOTTOM (MOBILE) */}
          <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent w-48" />
          <div className="absolute inset-0 lg:hidden bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/55 to-transparent" />
        </div>
      </div>

      {/* OVERLAY FOR GLOBAL READABILITY */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-transparent to-[#0a0a0a]/30 pointer-events-none" />

      {/* HERO OVERLAID CONTENT (BOTTOM-LEFT ALIGNED LIKE POWERPOINT SLIDE 1 & 2) */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 pb-14 md:pb-20">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <div ref={textRef} className="max-w-2xl text-white">
            <p className="text-[11px] md:text-xs tracking-[0.28em] uppercase text-[#b5a898] mb-3 font-medium">
              Ash Mateu Prieto
            </p>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.05] tracking-tight text-white mb-4 drop-shadow-md">
              Styling <span className="italic font-light">people</span>,
              <br />
              <span className="italic font-light">brands</span> and{" "}
              <span className="italic font-light">ideas</span>
              <span className="text-[#c9a84c]">.</span>
            </h1>

            <p className="text-sm md:text-base font-light text-white/85 tracking-wide mb-6 max-w-xl leading-relaxed">
              Creative Director &amp; Fashion Consultant.
            </p>

            <blockquote className="border-l-2 border-[#b5a898] pl-4 py-1 mb-8 text-xs md:text-sm italic text-white/80 max-w-lg leading-relaxed backdrop-blur-[2px]">
              ‘Construyo identidad a través de estrategias de branding y
              comunicación. Soy especialista en posicionar imagen de marcas y
              personas.’
            </blockquote>

            {/* DIRECT POWERPOINT ACTION LINKS */}
            <div className="flex flex-wrap items-center gap-6 text-xs md:text-sm tracking-[0.2em] uppercase font-medium">
              <Link
                href="/historia"
                className="text-white hover:text-[#b5a898] transition-colors border-b border-white/60 pb-1 hover:border-[#b5a898]"
              >
                MI HISTORIA →
              </Link>
              <Link
                href="/como-trabajo"
                className="text-white hover:text-[#b5a898] transition-colors border-b border-white/60 pb-1 hover:border-[#b5a898]"
              >
                ¿CÓMO TRABAJO? →
              </Link>
            </div>
          </div>

          {/* LOCATIONS & SCROLL INDICATOR */}
          <div
            ref={badgeRef}
            className="flex flex-col items-start lg:items-end text-white/70 text-[10px] tracking-[0.24em] uppercase gap-2"
          >
            <span>Buenos Aires — Nueva York — París</span>
            <div className="flex items-center gap-2 text-[#b5a898] animate-bounce mt-2">
              <span className="text-xs">Scroll</span>
              <span>↓</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
