"use client";

import React from "react";
import Image from "next/image";
import GsapReveal from "@/components/animations/GsapReveal";

interface HighlightItem {
  number: string;
  label?: string;
  tag?: string;
  text: string;
  image: string;
  badge?: string;
  className?: string;
  tags?: string[];
}

const highlights: HighlightItem[] = [
  {
    number: "19",
    label: "Años",
    tag: "Debut Editorial",
    image: "/images/hero/marie_claire_cover.webp",
    text: "La edad en la que empecé a dirigir producciones editoriales en Editorial Perfil.",
    className: "lg:col-span-1",
  },
  {
    number: "Sept 2010",
    label: "New York",
    tag: "NYFW",
    image: "/images/extracted/chanel-hc/img-005.webp",
    text: "La primera vez que viajo a cubrir el New York Fashion Week desde el front row.",
    className: "lg:col-span-1",
  },
  {
    number: "+150k",
    label: "Insiders",
    tag: "Inside Studios",
    image: "/images/hero_studio/MARIECLAIRE_2608064351_web.webp",
    badge: "Exit 2025",
    text: "Comunidad de Insiders en la escuela de moda online que fundé en 2015 y vendí en su totalidad en 2025.",
    className: "md:col-span-2 lg:col-span-2 bg-[#FAF7F2] border-[#b5a898] shadow-sm",
  },
  {
    number: "The Rolling Stones",
    tag: "Campaña Global",
    image: "/images/extracted/netflix-mf/img-000.webp",
    badge: "Chandon",
    text: "La colaboración histórica que cambió la escala de los proyectos que me llegaban.",
    className: "lg:col-span-1",
  },
  {
    number: "4 Portadas",
    label: "Simultáneas",
    tag: "+150 Tapas",
    image: "/images/extracted/dolores-fonzi/img-003.webp",
    text: "Cuatro tapas simultáneas en puestos de revistas y más de 150 portadas en 20 años de carrera.",
    className: "lg:col-span-1",
  },
  {
    number: "Red Carpets",
    tag: "Celebrity Styling",
    image: "/images/extracted/valentina-miumiu/img-000.webp",
    text: "Styling exclusivo para cine, festivales y galas internacionales.",
    tags: ["Dolores Fonzi", "Griselda Siciliani", "Valentina Zenere", "Delfi Chaves", "Gimena Accardi"],
    className: "md:col-span-2 lg:col-span-2",
  },
  {
    number: "Global",
    label: "5 Ciudades",
    tag: "Internacional",
    image: "/images/extracted/leonie-dg/img-003.webp",
    text: "Ciudades donde viví, trabajé o estudié producciones y tendencias.",
    tags: ["Buenos Aires", "Nueva York", "París", "Londres", "Dubái"],
    className: "md:col-span-2 lg:col-span-2",
  },
  {
    number: "Saint Martins",
    label: "+ Marangoni",
    tag: "Londres · Milán",
    image: "/images/hero_studio/MARIECLAIRE_2608064380_web.webp",
    text: "Volví a estudiar después de años de profesión porque el mundo cambió tanto que sentí empezar de cero.",
    className: "lg:col-span-1",
  },
  {
    number: "2 Martín Fierro",
    label: "de la Moda",
    tag: "Premios 2019",
    image: "/images/extracted/netflix-mf/img-004.webp",
    text: "Dos nominaciones a los Martín Fierro de la Moda (Mejor Influencer & Mejor Tapa de Revista).",
    className: "lg:col-span-1",
  },
  {
    number: "Talento UP",
    label: "Orgullo 2022",
    tag: "Universidad de Palermo",
    image: "/images/hero_studio/MARIECLAIRE_2608064419_web.webp",
    text: "Reconocimiento otorgado por la Universidad de Palermo por trayectoria profesional destacada.",
    className: "lg:col-span-1",
  },
  {
    number: "20 Años",
    label: "de Carrera",
    tag: "Visión & Trayectoria",
    image: "/images/hero_studio/MARIECLAIRE_2608064304_web.webp",
    badge: "2006 — 2026",
    text: "Moda, comunicación, estrategia, empresas, educación, tendencias, portadas, aviones, noches sin dormir pero bolsos nuevos, Excel y bastantes cambios de opinión.",
    className: "md:col-span-2 lg:col-span-3 bg-[#FAF7F2] border-[#b5a898] shadow-sm",
  },
];

export default function HighlightsGrid() {
  return (
    <section
      id="highlights"
      className="py-20 md:py-28 bg-[#f7f3ee] border-y border-[#b5a898]/30 relative overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* SECTION HEADER */}
        <GsapReveal className="max-w-2xl mb-14 md:mb-16">
          <span className="text-[10.5px] tracking-[0.28em] uppercase text-[#7a7065] font-medium block mb-2">
            01 · Hitos &amp; Trayectoria
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-black tracking-tight">
            Highlights de Carrera
          </h2>
          <p className="text-xs md:text-sm text-black/70 font-light mt-3 leading-relaxed">
            Veinte años de dirección creativa, semanas de la moda globales y producciones icónicas ilustradas a través de su archivo visual.
          </p>
        </GsapReveal>

        {/* ASYMMETRIC STITCH BENTO GRID WITH IMAGES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, idx) => (
            <GsapReveal
              key={idx}
              delay={idx * 0.03}
              className={`group flex flex-col justify-between bg-white border border-[#b5a898]/35 overflow-hidden hover:border-black transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${
                item.className || ""
              }`}
            >
              <div>
                {/* EDITORIAL IMAGE HEADER */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
                  <Image
                    src={item.image}
                    alt={item.tag || item.number}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover object-[center_18%] group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* CATEGORY & BADGE OVERLAYS */}
                  <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-sm text-white text-[8.5px] tracking-[0.2em] uppercase px-2.5 py-1 font-medium">
                    № {String(idx + 1).padStart(2, "0")} · {item.tag}
                  </div>
                  {item.badge && (
                    <div className="absolute top-3 right-3 bg-[#b5a898] text-black text-[8.5px] tracking-[0.18em] uppercase px-2 py-0.5 font-bold shadow-sm">
                      {item.badge}
                    </div>
                  )}
                </div>

                {/* CARD BODY CONTENT */}
                <div className="p-6 pb-4">
                  {/* NUMBER / TITLE */}
                  <div className="mb-2">
                    <span className="font-serif text-2xl sm:text-3xl text-black font-normal leading-none block">
                      {item.number}
                    </span>
                    {item.label && (
                      <span className="text-[10.5px] tracking-[0.2em] uppercase text-[#7a7065] font-medium block mt-1">
                        {item.label}
                      </span>
                    )}
                  </div>

                  {/* DESCRIPTION */}
                  <p className="text-xs md:text-[13px] leading-relaxed text-black/75 font-light">
                    {item.text}
                  </p>
                </div>
              </div>

              {/* PILL CHIPS FOR CITIES / CELEBRITIES */}
              {item.tags && (
                <div className="px-6 pb-6 pt-2">
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#b5a898]/20">
                    {item.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[9px] tracking-[0.14em] uppercase bg-[#f0ebe3] text-black/80 px-2 py-0.5 border border-[#b5a898]/30 font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </GsapReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
