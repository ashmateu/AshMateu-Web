"use client";

import React from "react";
import Image from "next/image";
import GsapReveal from "@/components/animations/GsapReveal";
import { Sparkles, Star, Globe2 } from "lucide-react";

interface Milestone {
  number: string;
  category: string;
  badge?: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

const milestones: Milestone[] = [
  {
    number: "19",
    category: "DEBUT EDITORIAL",
    badge: "2006",
    title: "Editorial Perfil",
    description: "La edad en la que empecé a dirigir producciones editoriales en Editorial Perfil.",
    image: "/images/catalog_v2/ASH/IMG_0682-1.jpg",
    imageAlt: "Debut Editorial 19 Años",
  },
  {
    number: "NYFW",
    category: "FRONT ROW COVER",
    badge: "2010",
    title: "Lincoln Center",
    description: "Septiembre 2010. Cubriendo el New York Fashion Week desde el front row por primera vez.",
    image: "/images/catalog_v2/Moda estudio tapa lunares New York jpegs/MarieClaire_Cover_2024_014.jpg",
    imageAlt: "NYFW Front Row",
  },
  {
    number: "+150",
    category: "TAPAS & REVISTAS",
    badge: "2 Décadas",
    title: "Dirección Creativa",
    description: "Cuatro portadas simultáneas en quioscos y más de 150 portadas en dos décadas de carrera.",
    image: "/images/catalog_v2/portadas/TAPA1.jpg",
    imageAlt: "Tapas y Revistas",
  },
  {
    number: "150k",
    category: "COMMUNITY & EXIT",
    badge: "Exit 2025",
    title: "Ash Mateu Studio",
    description: "Comunidad de 150k Insiders en la escuela de moda online que fundé en 2015 y vendí en su totalidad en 2025.",
    image: "/images/catalog_v2/ASH/IMG_7663-1.jpg",
    imageAlt: "Studio Exit",
  },
];

export default function HighlightsGrid() {
  return (
    <section
      id="highlights"
      className="py-20 md:py-28 lg:py-32 bg-[#F7F3EE] text-[#0A0A0A] border-y border-[#B5A898]/40 relative overflow-hidden"
    >
      <div className="max-w-[1320px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* SECTION HEADER (MATCHING HERO COVER AESTHETICS) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 pb-8 border-b border-[#B5A898]/30 gap-6">
          <GsapReveal className="max-w-2xl">
            <div className="flex items-center gap-2.5 mb-2.5">
              <span className="w-6 h-px bg-[#7A6A5A]" />
              <span className="text-[9px] tracking-[0.28em] uppercase text-[#7A6A5A] font-semibold font-mono">
                01 · Hitos &amp; Trayectoria
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-normal text-[#0A0A0A] tracking-tight leading-[1.08]">
              Highlights de Carrera
            </h2>
          </GsapReveal>

          <GsapReveal delay={0.1} className="max-w-md">
            <p className="font-sans text-xs sm:text-[13px] text-[#121212]/75 font-light leading-relaxed">
              Dos décadas de dirección creativa, semanas de la moda globales y producciones icónicas organizadas en una composición editorial limpia de alta costura.
            </p>
          </GsapReveal>
        </div>

        {/* MASTER FEATURED SPREAD (20 AÑOS - HERO EDITORIAL SPREAD) */}
        <GsapReveal className="bg-white/80 backdrop-blur-md rounded-2xl p-8 md:p-12 lg:p-14 border border-[#B5A898]/40 shadow-xs mb-16 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* LEFT COLUMN: NARRATIVE & DISPLAY NUMBER */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[9px] font-mono tracking-[0.24em] uppercase px-3 py-1 bg-[#F7F3EE] border border-[#B5A898]/50 text-[#7A6A5A] font-bold rounded-full">
                    2006 — 2026
                  </span>
                  <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-[#7A6A5A]">
                    Master Milestone
                  </span>
                </div>

                <div className="flex items-baseline gap-4 mb-4">
                  <span className="font-serif italic text-6xl sm:text-7xl md:text-8xl text-[#0A0A0A] font-light leading-none tracking-tight">
                    20
                  </span>
                  <span className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#0A0A0A] font-normal leading-tight">
                    Años de Dirección de Moda
                  </span>
                </div>

                <p className="font-sans text-xs sm:text-[13.5px] text-[#121212]/80 font-light leading-relaxed max-w-xl">
                  Veinte años de carrera. Moda, comunicación, estrategia, empresas, educación, tendencias, portadas, aviones, noches sin dormir pero bolsos nuevos, Excel y bastantes cambios de opinión que forjaron una mirada de autor en la industria.
                </p>
              </div>

              {/* THREE REFINED PILLARS UNDER MASTER */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 mt-8 border-t border-[#B5A898]/30 text-[11px] font-mono">
                <div>
                  <span className="text-[#7A6A5A] text-[9px] uppercase tracking-wider block mb-1">
                    01 · Portadas
                  </span>
                  <span className="font-semibold text-black text-xs sm:text-[13px] font-serif">
                    +150 Tapas Dirigidas
                  </span>
                </div>
                <div>
                  <span className="text-[#7A6A5A] text-[9px] uppercase tracking-wider block mb-1">
                    02 · Trayectoria
                  </span>
                  <span className="font-semibold text-black text-xs sm:text-[13px] font-serif">
                    NYFW &amp; Haute Couture
                  </span>
                </div>
                <div>
                  <span className="text-[#7A6A5A] text-[9px] uppercase tracking-wider block mb-1">
                    03 · Comunidad
                  </span>
                  <span className="font-semibold text-black text-xs sm:text-[13px] font-serif">
                    150k Insiders Exit
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: HIGH-RES EDITORIAL PORTRAIT */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden border border-[#B5A898]/40 shadow-md bg-[#FAF6F0]">
                <Image
                  src="/images/hero/hero_cover_pptx.webp"
                  alt="Ash Mateu 20 Años"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-[center_10%] hover:scale-102 transition-transform duration-700 ease-out"
                />
              </div>
              <div className="flex justify-between items-center text-[9px] font-mono text-[#7A6A5A] mt-2 px-1">
                <span>© Ash Mateu Studio</span>
                <span>Editorial Portrait</span>
              </div>
            </div>

          </div>
        </GsapReveal>

        {/* FOUR REFINED EDITORIAL COLUMNS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-16">
          {milestones.map((m, idx) => (
            <GsapReveal
              key={m.number}
              delay={idx * 0.05}
              className="flex flex-col justify-between group pt-4 border-t border-[#B5A898]/40 hover:border-black transition-colors duration-400"
            >
              <div>
                {/* PHOTO CONTAINER WITH CLEAN WARM BORDER */}
                <div className="relative aspect-[4/5] rounded-lg overflow-hidden border border-[#B5A898]/40 mb-5 shadow-xs bg-[#FAF6F0]">
                  <Image
                    src={m.image}
                    alt={m.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover object-[center_top] group-hover:scale-103 transition-transform duration-500"
                  />
                </div>

                {/* NUMBER & CATEGORY */}
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[8.5px] font-mono tracking-[0.2em] uppercase text-[#7A6A5A] font-semibold">
                    № {String(idx + 1).padStart(2, "0")} · {m.category}
                  </span>
                </div>

                <div className="mb-2">
                  <span className="font-serif italic font-light text-4xl sm:text-5xl text-[#0A0A0A] leading-none block group-hover:translate-x-1 transition-transform duration-300">
                    {m.number}
                  </span>
                </div>

                <h3 className="font-serif text-base font-normal text-[#0A0A0A] mb-1.5">
                  {m.title}
                </h3>

                <p className="font-sans text-xs text-[#121212]/75 font-light leading-relaxed">
                  {m.description}
                </p>
              </div>
            </GsapReveal>
          ))}
        </div>

        {/* BOTTOM METADATA SPREAD: 5 CITIES, RED CARPETS & ACADEMY */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-[#B5A898]/40 text-xs">
          
          {/* 5 CITIES */}
          <GsapReveal delay={0.05} className="pl-4 border-l border-[#B5A898]/40">
            <span className="text-[9px] font-mono tracking-[0.24em] uppercase text-[#7A6A5A] font-semibold block mb-1.5">
              01 · Residencia Global
            </span>
            <span className="font-serif text-xl font-normal text-[#0A0A0A] block mb-2">
              5 Ciudades
            </span>
            <p className="text-[#121212]/75 font-light leading-relaxed mb-3">
              Buenos Aires · Nueva York · París · Londres · Dubái.
            </p>
            <span className="text-[9px] font-mono text-[#7A6A5A]">
              Pasarelas &amp; Producciones Internacionales
            </span>
          </GsapReveal>

          {/* RED CARPETS & CELEBRITIES */}
          <GsapReveal delay={0.1} className="pl-4 border-l border-[#B5A898]/40">
            <span className="text-[9px] font-mono tracking-[0.24em] uppercase text-[#7A6A5A] font-semibold block mb-1.5">
              02 · Celebrity Styling
            </span>
            <span className="font-serif text-xl font-normal text-[#0A0A0A] block mb-2">
              Red Carpets &amp; Cine
            </span>
            <p className="text-[#121212]/75 font-light leading-relaxed mb-3">
              Dolores Fonzi, Valentina Zenere, Griselda Siciliani, Delfi Chaves, Gimena Accardi.
            </p>
            <span className="text-[9px] font-mono text-[#7A6A5A]">
              Festivales &amp; Alfombras Rojas
            </span>
          </GsapReveal>

          {/* ACADEMY & AWARDS */}
          <GsapReveal delay={0.15} className="pl-4 border-l border-[#B5A898]/40">
            <span className="text-[9px] font-mono tracking-[0.24em] uppercase text-[#7A6A5A] font-semibold block mb-1.5">
              03 · Formación &amp; Premios
            </span>
            <span className="font-serif text-xl font-normal text-[#0A0A0A] block mb-2">
              Academy &amp; Reconocimientos
            </span>
            <p className="text-[#121212]/75 font-light leading-relaxed mb-3">
              Central Saint Martins &amp; Marangoni. 2x Martín Fierro de la Moda &amp; Premio Talento UP.
            </p>
            <span className="text-[9px] font-mono text-[#7A6A5A]">
              Londres · Milán · Buenos Aires
            </span>
          </GsapReveal>

        </div>

      </div>
    </section>
  );
}
