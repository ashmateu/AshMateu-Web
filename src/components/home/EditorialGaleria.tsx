"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import GsapReveal from "@/components/animations/GsapReveal";

export default function EditorialGaleria() {
  const cards = [
    {
      cat: "01 · Editorial & Trends",
      name: "Capítulos del Blog",
      desc: "Investigaciones de macrotendencias, notas publicadas en Marie Claire Argentina y análisis de moda internacional.",
      href: "/blog",
      cta: "Leer Artículos",
    },
    {
      cat: "02 · Prensa & Medios",
      name: "Nuevas Portadas",
      desc: "Más de 150 portadas y tapas de revistas editoriales producidas y dirigidas a lo largo de 20 años de trayectoria.",
      href: "/prensa",
      cta: "Ver Portadas",
    },
    {
      cat: "03 · Marcas & Set",
      name: "Proyectos & Editoriales",
      desc: "Producciones para Chanel, Miu Miu, Dolce & Gabbana, Gucci, Netflix y alfombras rojas internacionales.",
      href: "/galeria",
      cta: "Ver Producciones",
    },
    {
      cat: "04 · Dirección Creativa",
      name: "Moodboards & Taylor Made",
      desc: "Construcción conceptual, universos visuales a medida y curaduría estética para marcas y eventos únicos.",
      href: "/como-trabajo",
      cta: "Conocer Servicios",
    },
  ];

  return (
    <section id="galeria" className="py-24 md:py-36 bg-[#0a0a0a] text-white relative overflow-hidden">
      {/* BACKGROUND LUXURY LIGHTING */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1a4463]/15 blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <GsapReveal>
            <div className="inline-flex items-center gap-2 border border-white/20 bg-white/5 px-3 py-1 rounded-full text-[9.5px] tracking-[0.26em] uppercase text-[#b5a898] mb-3 font-medium">
              <span>03 · Archivo Visual &amp; Proyectos</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white tracking-tight">
              Galería Editorial
            </h2>
          </GsapReveal>
          <Link
            href="/galeria"
            className="group inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#b5a898] hover:text-white border-b border-[#b5a898]/40 hover:border-white pb-1 transition-colors w-fit"
          >
            <span>Ver Galería Completa</span>
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* 4 EDITORIAL PLate CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => (
            <GsapReveal key={card.name} delay={idx * 0.07}>
              <Link
                href={card.href}
                className="group flex flex-col justify-between h-full p-8 md:p-9 bg-[#121214] border border-white/10 hover:border-[#b5a898] transition-all duration-500 min-h-[360px] shadow-lg active:scale-[0.98]"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 mb-6 border-b border-white/10">
                    <span className="text-[9.5px] tracking-[0.22em] uppercase text-[#b5a898] font-semibold">
                      {card.cat}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl text-white font-normal mb-4 group-hover:text-[#b5a898] transition-colors leading-snug">
                    {card.name}
                  </h3>
                  <p className="text-xs text-white/65 leading-relaxed font-light">
                    {card.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10 mt-8 flex items-center justify-between text-[11px] tracking-[0.18em] uppercase text-[#b5a898] group-hover:text-white transition-colors">
                  <span>{card.cta}</span>
                  <div className="w-6 h-6 rounded-full bg-white/10 group-hover:bg-[#b5a898] group-hover:text-black text-[#b5a898] flex items-center justify-center transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <ArrowUpRight size={13} strokeWidth={2.2} />
                  </div>
                </div>
              </Link>
            </GsapReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
