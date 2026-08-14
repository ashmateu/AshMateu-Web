"use client";

import React, { useState } from "react";
import Image from "next/image";
import GsapReveal from "@/components/animations/GsapReveal";
import {
  Sparkles,
  Award,
  Globe2,
  BookOpen,
  Camera,
  Star,
  Layers,
  ArrowUpRight,
  TrendingUp,
  MapPin,
} from "lucide-react";

export default function HighlightsGrid() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const timelineSteps = [
    { year: "2006", label: "Debut 19" },
    { year: "2010", label: "NYFW Front Row" },
    { year: "2015", label: "Studio 150k" },
    { year: "2020", label: "Global Campaign" },
    { year: "2022", label: "Premio UP & MF" },
    { year: "2025", label: "Studio Exit" },
    { year: "2026", label: "20 Años Master" },
  ];

  return (
    <section
      id="highlights"
      className="py-20 md:py-28 bg-[#F5F0EB] text-[#0A0A0A] border-y border-[#B5A898]/40 relative overflow-hidden"
    >
      {/* BACKGROUND TEXTURE GRADIENT ACCENT */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#B5A898]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#E8DEC8]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1360px] mx-auto px-6 md:px-12 relative z-10">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <GsapReveal className="max-w-2xl">
            <div className="flex items-center gap-2.5 mb-2.5">
              <span className="w-5 h-px bg-[#7A6A5A]" />
              <span className="text-[9.5px] tracking-[0.28em] uppercase text-[#7A6A5A] font-semibold">
                01 · Hitos &amp; Trayectoria Editorial
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-normal text-[#0A0A0A] tracking-tight leading-[1.08]">
              Highlights de Carrera
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#121212]/75 font-light mt-3 leading-relaxed max-w-xl">
              Dos décadas liderando producciones de alta costura, semanas de la moda globales y alianzas icónicas fusionadas en un archivo bento cronológico de pasarela.
            </p>
          </GsapReveal>

          {/* RUNWAY TIMELINE PROGRESSION BAR (OPTION 1 TOUCH) */}
          <GsapReveal delay={0.1} className="hidden lg:flex items-center gap-2 bg-white/70 backdrop-blur-md px-4 py-2.5 rounded-full border border-[#B5A898]/40 shadow-xs">
            <span className="text-[9px] tracking-[0.2em] uppercase text-[#7A6A5A] font-bold mr-1">
              Timeline:
            </span>
            <div className="flex items-center gap-2">
              {timelineSteps.map((step, idx) => (
                <React.Fragment key={step.year}>
                  <div className="flex items-center gap-1 text-[9px] font-mono text-[#0A0A0A]/80 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B5A898]" />
                    <span className="font-bold text-[#0A0A0A]">{step.year}</span>
                  </div>
                  {idx < timelineSteps.length - 1 && (
                    <span className="w-3 h-px bg-[#B5A898]/60" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </GsapReveal>
        </div>

        {/* HAUTE BENTO GRID ARCHITECTURE (OPTION 2 + OPTION 1 FUSION) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6">
          
          {/* CARD 1: 20 AÑOS DE CARRERA (HERO MONOLITHIC CARD - 7 COLUMNS) */}
          <div className="md:col-span-12 lg:col-span-7 bg-[#0B0B0B] text-white rounded-2xl p-7 md:p-9 border border-[#B5A898]/30 relative overflow-hidden group shadow-xl flex flex-col justify-between min-h-[380px] md:min-h-[420px]">
            {/* BACKGROUND PHOTO WITH FADE OVERLAY */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/catalog_v2/IMG_4064.jpg"
                alt="Ash Mateu 20 Años de Carrera"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-[center_12%] opacity-35 group-hover:scale-105 transition-transform duration-700 ease-out grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/70 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B] via-[#0B0B0B]/80 to-transparent" />
            </div>

            {/* TOP BADGE & YEAR */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono tracking-[0.2em] uppercase px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-[#E8DEC8] font-bold">
                  2006 — 2026
                </span>
                <span className="text-[9px] tracking-[0.2em] uppercase text-white/60 font-medium">
                  Master Milestone
                </span>
              </div>
              <Sparkles size={16} className="text-[#E8DEC8]" />
            </div>

            {/* MAIN CONTENT */}
            <div className="relative z-10 my-auto py-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-serif italic text-6xl sm:text-7xl md:text-8xl text-white font-light leading-none tracking-tight">
                  20
                </span>
                <span className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#E8DEC8] font-normal">
                  Años de Dirección de Moda
                </span>
              </div>
              <p className="font-sans text-xs sm:text-sm text-white/80 font-light leading-relaxed max-w-lg">
                Moda, comunicación, estrategia, empresas, educación, tendencias, portadas, semanas de la moda globales, noches sin dormir pero bolsos nuevos, Excel y cambios de opinión que construyeron una firma de autor.
              </p>
            </div>

            {/* FOOTER METRICS STRIP */}
            <div className="relative z-10 pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-4 text-[10.5px] font-mono text-white/70">
              <span className="flex items-center gap-1.5">
                <Star size={12} className="text-[#E8DEC8]" /> +150 Portadas Dirigidas
              </span>
              <span className="flex items-center gap-1.5">
                <Globe2 size={12} className="text-[#E8DEC8]" /> 5 Capitales Globales
              </span>
              <span className="flex items-center gap-1.5 text-[#E8DEC8] font-semibold">
                150k Insiders Studio Exit
              </span>
            </div>
          </div>

          {/* CARD 2: +150 TAPAS & REVISTAS (5 COLUMNS) */}
          <div className="md:col-span-6 lg:col-span-5 bg-white rounded-2xl p-7 border border-[#B5A898]/40 shadow-sm relative overflow-hidden group flex flex-col justify-between min-h-[380px] md:min-h-[420px]">
            {/* TOP HEADER */}
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-mono tracking-[0.2em] uppercase px-2 py-0.5 border border-[#B5A898]/50 text-[#7A6A5A] font-bold rounded">
                4 en Quioscos Simultáneas
              </span>
              <span className="text-[10px] text-[#7A6A5A] font-mono font-bold">№ 02</span>
            </div>

            {/* DISPLAY NUMBER & TITLE */}
            <div className="my-2">
              <span className="font-serif italic text-5xl sm:text-6xl text-[#0A0A0A] font-light leading-none block mb-1.5">
                +150
              </span>
              <h3 className="font-serif text-xl font-normal text-[#0A0A0A]">
                Tapas &amp; Producciones Editoriales
              </h3>
              <p className="font-sans text-xs text-[#121212]/70 font-light mt-1.5 leading-relaxed">
                Dirección creativa para Harper’s Bazaar, Marie Claire, ¡HOLA!, L’Officiel y editoriales de alto impacto internacional.
              </p>
            </div>

            {/* MINI COVERS FAN DISPLAY (OPTION 1 CONTACT SHEET STYLE) */}
            <div className="grid grid-cols-3 gap-2.5 pt-3 border-t border-[#B5A898]/30">
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden border border-[#B5A898]/40 shadow-xs group-hover:-translate-y-1 transition-transform duration-300">
                <Image
                  src="/images/catalog_v2/portadas/tapa_marie_claire_argentina.webp"
                  alt="Marie Claire Cover"
                  fill
                  sizes="120px"
                  className="object-cover object-top"
                />
              </div>
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden border border-[#B5A898]/40 shadow-xs group-hover:-translate-y-2 transition-transform duration-300 delay-75">
                <Image
                  src="/images/catalog_v2/portadas/tapa_hola_fashion_juliana_awada.webp"
                  alt="HOLA Fashion Cover"
                  fill
                  sizes="120px"
                  className="object-cover object-top"
                />
              </div>
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden border border-[#B5A898]/40 shadow-xs group-hover:-translate-y-1 transition-transform duration-300 delay-150">
                <Image
                  src="/images/catalog_v2/portadas/tapa_hola_valentina_ferrer.webp"
                  alt="HOLA Cover"
                  fill
                  sizes="120px"
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>

          {/* CARD 3: 5 CIUDADES GLOBALES (4 COLUMNS) */}
          <div className="md:col-span-6 lg:col-span-4 bg-white rounded-2xl p-6 md:p-7 border border-[#B5A898]/40 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-[#7A6A5A] font-bold">
                Residencia &amp; Pasarelas
              </span>
              <MapPin size={14} className="text-[#B5A898]" />
            </div>

            <div>
              <span className="font-serif italic text-4xl sm:text-5xl text-[#0A0A0A] font-light leading-none block mb-1">
                5 CITIES
              </span>
              <p className="font-sans text-xs text-[#121212]/75 font-light leading-relaxed mb-4">
                Ciudades donde viví, trabajé o estudié producciones de pasarela y macrotendencias.
              </p>
            </div>

            {/* CITIES CHIPS GRID */}
            <div className="space-y-1.5 pt-3 border-t border-[#B5A898]/25 font-mono text-[11px]">
              {[
                { city: "Buenos Aires", code: "BUE", role: "Base & Dirección" },
                { city: "New York", code: "NYC", role: "Fashion Week & Editorial" },
                { city: "París", code: "PAR", role: "Haute Couture" },
                { city: "Londres", code: "LON", role: "Central Saint Martins" },
                { city: "Dubái", code: "DXB", role: "Luxury Campaigns" },
              ].map((c) => (
                <div key={c.code} className="flex items-center justify-between py-0.5 text-[#121212]/80">
                  <span className="font-semibold text-black">{c.city}</span>
                  <span className="text-[9px] text-[#7A6A5A] uppercase">{c.role}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CARD 4: RED CARPETS & CELEBRITY STYLING (4 COLUMNS) */}
          <div className="md:col-span-6 lg:col-span-4 bg-[#0B0B0B] text-white rounded-2xl p-6 md:p-7 border border-[#B5A898]/30 shadow-md relative overflow-hidden flex flex-col justify-between group">
            {/* BACKGROUND CELEBRITY ACCENT PHOTO */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none">
              <Image
                src="/images/catalog_v2/VALENTINA ZENERE/IMG_1518.jpg"
                alt="Celebrity Red Carpet"
                fill
                sizes="200px"
                className="object-cover object-top"
              />
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-[#E8DEC8] font-bold">
                  Celebrity Styling
                </span>
                <Camera size={14} className="text-[#E8DEC8]" />
              </div>
              <span className="font-serif italic text-3xl sm:text-4xl text-white font-light leading-none block mb-1">
                RED CARPETS
              </span>
              <p className="font-sans text-xs text-white/70 font-light leading-relaxed mb-4">
                Styling exclusivo para cine, festivales y alfombras rojas internacionales.
              </p>
            </div>

            {/* CELEBRITY LUXURY BADGES */}
            <div className="relative z-10 flex flex-wrap gap-1.5 pt-3 border-t border-white/15">
              {[
                "Dolores Fonzi",
                "Valentina Zenere",
                "Griselda Siciliani",
                "Delfi Chaves",
                "Gimena Accardi",
              ].map((name) => (
                <span
                  key={name}
                  className="text-[9.5px] px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-white/90 font-medium hover:border-[#E8DEC8] hover:text-[#E8DEC8] transition-colors"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>

          {/* CARD 5: STUDIO EXIT & ACADEMIA (4 COLUMNS) */}
          <div className="md:col-span-6 lg:col-span-4 bg-white rounded-2xl p-6 md:p-7 border border-[#B5A898]/40 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-mono tracking-[0.2em] uppercase px-2 py-0.5 bg-[#B5A898]/20 text-[#0A0A0A] font-bold rounded">
                  Exit 2025 · 150k Insiders
                </span>
                <Award size={14} className="text-[#B5A898]" />
              </div>
              <span className="font-serif italic text-3xl sm:text-4xl text-[#0A0A0A] font-light leading-none block mb-1">
                STUDIO &amp; ACADEMY
              </span>
              <p className="font-sans text-xs text-[#121212]/75 font-light leading-relaxed mt-2">
                Fundé la escuela de moda online en 2015 con 150k miembros y la vendí en su totalidad en 2025. Posgrado en Central Saint Martins &amp; Marangoni.
              </p>
            </div>

            {/* PREMIOS & RECONOCIMIENTOS STRIP */}
            <div className="pt-3 border-t border-[#B5A898]/30 flex items-center justify-between text-[10px] font-mono text-[#7A6A5A]">
              <span>🏆 2x Martín Fierro Moda</span>
              <span>🎓 Premio Talento UP</span>
            </div>
          </div>

          {/* CARD 6: NYFW 2010 + DEBUT 19 + STONES COLLAB (FULL ROW 12 COLUMNS - 3 EQUAL MINI BENTOS) */}
          <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* MINI BENTO 1: DEBUT 19 AÑOS */}
            <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#B5A898]/35 flex items-start gap-4 group">
              <span className="font-serif italic text-4xl text-[#0A0A0A] font-light leading-none">
                19
              </span>
              <div>
                <span className="text-[8.5px] font-mono tracking-[0.18em] uppercase text-[#7A6A5A] font-bold block mb-1">
                  2006 · Debut Editorial
                </span>
                <p className="font-sans text-xs text-[#121212]/80 font-light leading-relaxed">
                  La edad en la que empecé a dirigir producciones editoriales en Editorial Perfil.
                </p>
              </div>
            </div>

            {/* MINI BENTO 2: NYFW FRONT ROW */}
            <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#B5A898]/35 flex items-start gap-4 group">
              <span className="font-serif italic text-3xl text-[#0A0A0A] font-light leading-none">
                NYFW
              </span>
              <div>
                <span className="text-[8.5px] font-mono tracking-[0.18em] uppercase text-[#7A6A5A] font-bold block mb-1">
                  2010 · Front Row Cover
                </span>
                <p className="font-sans text-xs text-[#121212]/80 font-light leading-relaxed">
                  Cubriendo el New York Fashion Week desde el front row en Lincoln Center.
                </p>
              </div>
            </div>

            {/* MINI BENTO 3: GLOBAL CAMPAIGN (STONES & CHANDON) */}
            <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#B5A898]/35 flex items-start gap-4 group">
              <span className="font-serif italic text-3xl text-[#0A0A0A] font-light leading-none">
                STONES
              </span>
              <div>
                <span className="text-[8.5px] font-mono tracking-[0.18em] uppercase text-[#7A6A5A] font-bold block mb-1">
                  Global Campaign · Chandon
                </span>
                <p className="font-sans text-xs text-[#121212]/80 font-light leading-relaxed">
                  La colaboración histórica que cambió la escala y el alcance internacional de mis proyectos.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
