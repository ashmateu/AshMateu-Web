"use client";

import React from "react";
import GsapReveal from "@/components/animations/GsapReveal";

interface HighlightItem {
  display: string;
  category: string;
  badge?: string;
  text: string;
  gridClass: string;
  tags?: string[];
}

const highlights: HighlightItem[] = [
  {
    display: "19",
    category: "DEBUT EDITORIAL",
    text: "La edad en la que empecé a dirigir producciones editoriales en Editorial Perfil.",
    gridClass: "col-span-12 md:col-span-5 md:col-start-1",
  },
  {
    display: "NYFW",
    category: "FRONT ROW COVER",
    text: "Septiembre 2010. Cubriendo el New York Fashion Week desde el front row por primera vez.",
    gridClass: "col-span-12 md:col-span-5 md:col-start-8 md:mt-24 lg:mt-32",
  },
  {
    display: "STUDIO",
    category: "COMMUNITY & EXIT",
    badge: "Exit 2025",
    text: "Comunidad de 150k Insiders en la escuela de moda online que fundé en 2015 y vendí en su totalidad en 2025.",
    gridClass: "col-span-12 md:col-span-6 md:col-start-2 md:mt-12 lg:mt-16",
  },
  {
    display: "STONES",
    category: "GLOBAL CAMPAIGN",
    badge: "Chandon",
    text: "La colaboración histórica que cambió la escala y el alcance internacional de los proyectos a mi cargo.",
    gridClass: "col-span-12 md:col-span-5 md:col-start-8 md:mt-20 lg:mt-28",
  },
  {
    display: "+150",
    category: "TAPAS & REVISTAS",
    text: "Cuatro portadas simultáneas en quioscos y más de 150 portadas en dos décadas de dirección creativa.",
    gridClass: "col-span-12 md:col-span-5 md:col-start-1 md:mt-16 lg:mt-20",
  },
  {
    display: "RED CARPETS",
    category: "CELEBRITY STYLING",
    text: "Styling exclusivo para cine, festivales y alfombras rojas internacionales.",
    tags: [
      "Dolores Fonzi",
      "Griselda Siciliani",
      "Valentina Zenere",
      "Delfi Chaves",
      "Gimena Accardi",
    ],
    gridClass: "col-span-12 md:col-span-6 md:col-start-7 md:mt-24 lg:mt-32",
  },
  {
    display: "5 CITIES",
    category: "GLOBAL RESIDENCY",
    text: "Ciudades donde viví, trabajé o estudié producciones de pasarela y macrotendencias.",
    tags: ["Buenos Aires", "Nueva York", "París", "Londres", "Dubái"],
    gridClass: "col-span-12 md:col-span-5 md:col-start-2 md:mt-14 lg:mt-16",
  },
  {
    display: "ACADEMY",
    category: "LONDRES · MILÁN",
    text: "Central Saint Martins y Marangoni. Volví a estudiar después de años de profesión porque el mundo cambió tanto que sentí empezar de cero.",
    gridClass: "col-span-12 md:col-span-5 md:col-start-8 md:mt-20 lg:mt-24",
  },
  {
    display: "2 MF",
    category: "PREMIOS DE LA MODA",
    text: "Dos nominaciones a los Martín Fierro de la Moda (Mejor Influencer & Mejor Tapa de Revista).",
    gridClass: "col-span-12 md:col-span-5 md:col-start-1 md:mt-16 lg:mt-20",
  },
  {
    display: "UP 2022",
    category: "RECONOCIMIENTO",
    text: "Premio Talento UP otorgado por la Universidad de Palermo por trayectoria profesional destacada.",
    gridClass: "col-span-12 md:col-span-5 md:col-start-7 md:mt-20 lg:mt-24",
  },
  {
    display: "20",
    category: "AÑOS DE CARRERA",
    badge: "2006 — 2026",
    text: "Veinte años de carrera. Moda, comunicación, estrategia, empresas, educación, tendencias, portadas, aviones, noches sin dormir pero bolsos nuevos, Excel y bastantes cambios de opinión.",
    gridClass: "col-span-12 md:col-span-10 md:col-start-2 md:mt-28 lg:mt-36 pt-16 md:pt-20 border-t border-[#B5A898]/40",
  },
];

export default function HighlightsGrid() {
  return (
    <section
      id="highlights"
      className="py-28 md:py-36 lg:py-44 bg-[#F7F3EE] border-y border-[#B5A898]/40 relative overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        {/* SECTION HEADER (AVANT-GARDE EDITORIAL) */}
        <GsapReveal className="max-w-3xl mb-24 md:mb-32">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-6 h-px bg-[#7A6A5A]" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#7A6A5A] font-semibold">
              01 · Hitos &amp; Trayectoria Editorial
            </span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-[#0A0A0A] tracking-tight leading-[1.08]">
            Highlights de Carrera
          </h2>
          <p className="font-sans text-sm md:text-[15px] text-[#121212]/75 font-light mt-4 leading-relaxed max-w-xl">
            Veinte años de dirección creativa, semanas de la moda globales y producciones icónicas dispuestas en un collage asimétrico de pasarela.
          </p>
        </GsapReveal>

        {/* 12-COLUMN ASYMMETRIC COLLAGE GRID */}
        <div className="grid grid-cols-12 gap-x-6 md:gap-x-10 gap-y-16 md:gap-y-0">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className={`${item.gridClass} group transition-all duration-300`}
            >
              <GsapReveal
                delay={idx * 0.04}
                className="relative pl-6 md:pl-8 border-l border-[#B5A898]/40 hover:border-black transition-colors duration-400"
              >
                {/* CATEGORY HEADER */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[10px] tracking-[0.26em] uppercase text-[#7A6A5A] font-semibold">
                    № {String(idx + 1).padStart(2, "0")} · {item.category}
                  </span>
                  {item.badge && (
                    <span className="text-[8.5px] tracking-[0.18em] uppercase px-2 py-0.5 border border-[#B5A898]/60 text-[#0A0A0A] font-medium">
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* GIANT DISPLAY NUMBER (BODONI MODA ITALIC) */}
                <div className="mb-4">
                  <span className="font-serif italic font-light text-5xl sm:text-6xl md:text-7xl lg:text-[96px] text-[#0A0A0A] leading-none block -ml-1 tracking-tighter group-hover:translate-x-1 transition-transform duration-300">
                    {item.display}
                  </span>
                </div>

                {/* PARAGRAPH TEXT (INTER 300) */}
                <p className="font-sans text-[13.5px] md:text-[14.5px] leading-[1.75] text-[#121212]/80 font-light max-w-md">
                  {item.text}
                </p>

                {/* EDITORIAL CHIPS / METADATA TAGS */}
                {item.tags && (
                  <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-[#B5A898]/25">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] tracking-[0.14em] uppercase text-[#7A6A5A] px-2.5 py-1 border border-[#B5A898]/30 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </GsapReveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
