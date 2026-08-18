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
    image: "/images/catalog_v2/portadas/1c2c1c68-11f5-4d8f-a4f6-745ea9cc1f32.jpg",
    imageAlt: "Tapas y Revistas",
  },
  {
    number: "150k",
    category: "COMMUNITY & EXIT",
    badge: "Exit 2025",
    title: "Ash Mateu Studio",
    description: "Comunidad de 150k Insiders en la escuela de moda online que fundé en 2015 y vendí en su totalidad en 2025.",
    image: "/images/catalog_v2/ASH/E0C50A9A-718F-498E-87F3-410FA4D94D3D-1.jpg",
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

        {/* LUXURY BENTO SPREAD (20 AÑOS - PROPOSAL 2 BENTO ARCHITECTURE) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-16 items-stretch">
          
          {/* MAIN HERO BENTO CARD (LEFT: 7 COLS) */}
          <GsapReveal className="lg:col-span-7 bg-white/90 backdrop-blur-md rounded-2xl p-7 sm:p-9 md:p-11 border border-[#B5A898]/40 shadow-xs flex flex-col justify-between relative overflow-hidden group hover:border-[#B5A898]/80 transition-all duration-500">
            {/* AMBIENT WARM TINT */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#4A1525]/5 via-[#C8A870]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div>
              {/* TOP TAGS */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6 relative z-10">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono tracking-[0.24em] uppercase px-3 py-1 bg-[#4A1525]/5 border border-[#4A1525]/20 text-[#4A1525] font-bold rounded-full">
                    2006 — 2026
                  </span>
                  <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-[#7A6A5A] font-semibold">
                    Master Milestone
                  </span>
                </div>
                <span className="text-[8.5px] font-mono tracking-widest uppercase text-[#7A6A5A]/80 hidden sm:inline-block">
                  Direction &amp; Styling
                </span>
              </div>

              {/* MASSIVE HERO HEADLINE */}
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-5 relative z-10">
                <span className="font-serif italic text-6xl sm:text-7xl md:text-8xl text-[#0A0A0A] font-light leading-none tracking-tight">
                  20
                </span>
                <span className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#0A0A0A] font-normal leading-tight">
                  Años de Dirección de Moda
                </span>
              </div>

              {/* MANIFESTO COPY */}
              <p className="font-sans text-xs sm:text-[13.5px] text-[#121212]/80 font-light leading-relaxed max-w-xl mb-8 relative z-10">
                Veinte años de carrera. Moda, comunicación, estrategia, empresas, educación, tendencias, portadas, aviones, noches sin dormir pero bolsos nuevos, Excel y bastantes cambios de opinión que forjaron una mirada de autor en la industria.
              </p>
            </div>

            {/* FULL-LENGTH EDITORIAL STREET STYLE PORTRAIT FRAME */}
            <div className="relative rounded-xl overflow-hidden border border-[#B5A898]/50 shadow-md bg-[#FAF6F0] group/img mt-2">
              <div className="relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5] w-full overflow-hidden">
                <Image
                  src="/images/highlights/ash_paris_portrait_2026.jpg"
                  alt="Ash Mateu 20 Años de Dirección de Moda - Paris Street Style"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover object-[50%_36%] scale-[1.12] group-hover/img:scale-[1.16] transition-transform duration-700 ease-out"
                />
              </div>

              {/* OVERLAY LOOKBOOK CAPTION */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between text-white gap-2">
                <div>
                  <span className="text-[8.5px] font-mono tracking-[0.2em] uppercase text-[#E8D4D8] block font-semibold">
                    📍 Paris Fashion Week · Haute Couture
                  </span>
                  <span className="text-[11px] font-serif text-white/95">
                    Oversized Tailoring &amp; Silk Archive Scarf
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[8.5px] font-mono px-2.5 py-1 bg-white/15 backdrop-blur-md rounded-full border border-white/20 text-white/90">
                    © Ash Mateu Studio
                  </span>
                </div>
              </div>
            </div>

          </GsapReveal>

          {/* SIDE BENTO CARDS COLUMN (RIGHT: 5 COLS) */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:gap-7 justify-between">
            
            {/* BENTO CARD 1: +150 PORTADAS */}
            <GsapReveal delay={0.05} className="bg-white/85 backdrop-blur-md rounded-2xl p-6 sm:p-7 border border-[#B5A898]/40 shadow-xs hover:border-[#4A1525]/40 hover:shadow-md transition-all duration-400 flex flex-col justify-between group">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#4A1525]" />
                    <span className="text-[8.5px] font-mono tracking-[0.22em] uppercase text-[#7A6A5A] font-bold">
                      01 · Publicaciones &amp; Editorial
                    </span>
                  </div>
                  <span className="font-serif text-3xl sm:text-4xl text-[#0A0A0A] font-normal leading-none block group-hover:translate-x-1 transition-transform">
                    +150 Tapas
                  </span>
                </div>
                <div className="relative w-14 h-18 sm:w-16 sm:h-20 rounded-lg overflow-hidden border border-[#B5A898]/50 shadow-xs shrink-0 bg-[#FAF6F0]">
                  <Image
                    src="/images/catalog_v2/portadas/1c2c1c68-11f5-4d8f-a4f6-745ea9cc1f32.jpg"
                    alt="Portadas Históricas"
                    fill
                    sizes="80px"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              <p className="font-sans text-xs text-[#121212]/75 font-light leading-relaxed">
                Cuatro portadas simultáneas en quioscos y más de 150 producciones icónicas dirigidas en dos décadas.
              </p>
              <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#B5A898]/20 text-[9px] font-mono text-[#7A6A5A]">
                <span>Marie Claire &amp; Medios Líderes</span>
                <span className="font-bold text-[#4A1525]">2 Décadas</span>
              </div>
            </GsapReveal>

            {/* BENTO CARD 2: NYFW & HAUTE COUTURE */}
            <GsapReveal delay={0.1} className="bg-white/85 backdrop-blur-md rounded-2xl p-6 sm:p-7 border border-[#B5A898]/40 shadow-xs hover:border-[#4A1525]/40 hover:shadow-md transition-all duration-400 flex flex-col justify-between group">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#C8A870]" />
                    <span className="text-[8.5px] font-mono tracking-[0.22em] uppercase text-[#7A6A5A] font-bold">
                      02 · Coberturas Globales
                    </span>
                  </div>
                  <span className="font-serif text-3xl sm:text-4xl text-[#0A0A0A] font-normal leading-none block group-hover:translate-x-1 transition-transform">
                    Front Row
                  </span>
                </div>
                <div className="relative w-14 h-18 sm:w-16 sm:h-20 rounded-lg overflow-hidden border border-[#B5A898]/50 shadow-xs shrink-0 bg-[#FAF6F0]">
                  <Image
                    src="/images/catalog_v2/Moda estudio tapa lunares New York jpegs/MarieClaire_Cover_2024_014.jpg"
                    alt="NYFW Front Row"
                    fill
                    sizes="80px"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              <p className="font-sans text-xs text-[#121212]/75 font-light leading-relaxed">
                Lincoln Center, Nueva York y Haute Couture París. Coberturas editoriales y front row desde 2010.
              </p>
              <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#B5A898]/20 text-[9px] font-mono text-[#7A6A5A]">
                <span>Nueva York · París · Milán</span>
                <span className="font-bold text-[#C8A870]">Desde 2010</span>
              </div>
            </GsapReveal>

            {/* BENTO CARD 3: 150K INSIDERS & STUDIO EXIT */}
            <GsapReveal delay={0.15} className="bg-white/85 backdrop-blur-md rounded-2xl p-6 sm:p-7 border border-[#B5A898]/40 shadow-xs hover:border-[#4A1525]/40 hover:shadow-md transition-all duration-400 flex flex-col justify-between group">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#1A1A1A]" />
                    <span className="text-[8.5px] font-mono tracking-[0.22em] uppercase text-[#7A6A5A] font-bold">
                      03 · Comunidad &amp; EdTech
                    </span>
                  </div>
                  <span className="font-serif text-3xl sm:text-4xl text-[#0A0A0A] font-normal leading-none block group-hover:translate-x-1 transition-transform">
                    150k Insiders
                  </span>
                </div>
                <div className="relative w-14 h-18 sm:w-16 sm:h-20 rounded-lg overflow-hidden border border-[#B5A898]/50 shadow-xs shrink-0 bg-[#FAF6F0]">
                  <Image
                    src="/images/catalog_v2/ASH/E0C50A9A-718F-498E-87F3-410FA4D94D3D-1.jpg"
                    alt="Ash Mateu Studio Exit"
                    fill
                    sizes="80px"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              <p className="font-sans text-xs text-[#121212]/75 font-light leading-relaxed">
                Escuela de moda online fundada en 2015 y vendida en su totalidad (Exit) en 2025.
              </p>
              <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#B5A898]/20 text-[9px] font-mono text-[#7A6A5A]">
                <span>Ash Mateu Studio</span>
                <span className="font-bold text-[#1A1A1A]">Exit 2025</span>
              </div>
            </GsapReveal>

          </div>

        </div>

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
