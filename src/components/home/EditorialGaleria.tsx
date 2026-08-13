"use client";

import React from "react";
import Link from "next/link";
import GsapReveal from "@/components/animations/GsapReveal";

export default function EditorialGaleria() {
  const cards = [
    {
      cat: "01 · Editorial & Trends",
      name: "Capítulos del Blog",
      desc: "Investigaciones de macrotendencias, notas publicadas en Marie Claire Argentina y análisis de moda internacional.",
      href: "/blog",
      arrow: "Leer artículos ↗",
    },
    {
      cat: "02 · Prensa & Medios",
      name: "Nuevas Portadas",
      desc: "Más de 150 portadas y tapas de revistas editoriales producidas y dirigidas a lo largo de 20 años de trayectoria.",
      href: "/prensa",
      arrow: "Ver portadas ↗",
    },
    {
      cat: "03 · Marcas & Set",
      name: "Proyectos & Editoriales",
      desc: "Producciones para Chanel, Miu Miu, Dolce & Gabbana, Gucci, Netflix y alfombras rojas internacionales.",
      href: "/galeria",
      arrow: "Ver producciones ↗",
    },
    {
      cat: "04 · Dirección Creativa",
      name: "Moodboards & Taylor Made",
      desc: "Construcción conceptual, universos visuales a medida y curaduría estética para marcas y eventos únicos.",
      href: "/como-trabajo",
      arrow: "Conocer servicios ↗",
    },
  ];

  return (
    <section id="galeria" className="py-24 md:py-32 bg-[#0a0a0a] text-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <GsapReveal>
            <p className="text-[11px] tracking-[0.28em] uppercase text-[#b5a898] font-medium mb-3">
              Archivo Visual &amp; Proyectos
            </p>
            <h2 className="font-serif text-3xl md:text-5xl font-normal text-white tracking-tight">
              Galería
            </h2>
          </GsapReveal>
          <Link
            href="/galeria"
            className="text-xs tracking-[0.2em] uppercase text-[#b5a898] hover:text-white border-b border-[#b5a898]/60 pb-1 transition-colors w-fit"
          >
            Ver galería completa →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => (
            <GsapReveal key={card.name} delay={idx * 0.08}>
              <Link
                href={card.href}
                className="group flex flex-col justify-between h-full p-8 md:p-10 bg-[#161616] border border-white/10 hover:border-[#b5a898] hover:bg-[#1c1c1c] transition-all duration-300 min-h-[340px]"
              >
                <div>
                  <span className="text-[10px] tracking-[0.22em] uppercase text-[#b5a898] block mb-4">
                    {card.cat}
                  </span>
                  <h3 className="font-serif text-2xl text-white font-normal mb-4 group-hover:text-[#f7f3ee] transition-colors">
                    {card.name}
                  </h3>
                  <p className="text-xs md:text-sm text-white/65 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
                <div className="pt-6 border-t border-white/10 mt-6 flex items-center gap-2 text-xs tracking-[0.16em] uppercase text-[#b5a898] group-hover:text-white transition-colors">
                  <span>{card.arrow}</span>
                </div>
              </Link>
            </GsapReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
