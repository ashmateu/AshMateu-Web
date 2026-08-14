"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import GsapReveal from "@/components/animations/GsapReveal";

export default function EditorialGaleria() {
  const cards = [
    {
      cat: "01 · Editorial & Trends",
      name: "Capítulos del Blog",
      desc: "Investigaciones de macrotendencias, notas en Marie Claire y Fashion Weeks internacionales.",
      href: "/blog",
      cta: "Leer Artículos",
      image: "/images/catalog/03_fashion_week_paris_canon/4A2A4232.JPEG",
    },
    {
      cat: "02 · Prensa & Medios",
      name: "Nuevas Portadas",
      desc: "Más de 150 portadas y tapas de revistas editoriales producidas a lo largo de 20 años de trayectoria.",
      href: "/prensa",
      cta: "Ver Portadas",
      image: "/images/catalog/08_portadas_editoriales_prensa/0264e934-e30e-4f45-bfce-e6806e3681ac.JPG",
    },
    {
      cat: "03 · Marcas & Set",
      name: "Proyectos & Editoriales",
      desc: "Producciones para Chanel, Miu Miu, Dolce & Gabbana, Gucci, Netflix y alfombras rojas.",
      href: "/galeria",
      cta: "Ver Producciones",
      image: "/images/catalog/01_chanel_alta_costura_studio/_E8A9234.jpg",
    },
    {
      cat: "04 · Dirección Creativa",
      name: "Moodboards & Taylor Made",
      desc: "Construcción conceptual, universos visuales a medida y curaduría estética para marcas y eventos.",
      href: "/como-trabajo",
      cta: "Conocer Servicios",
      image: "/images/catalog/04_celebridades_galas_red_carpet/55E0547F-4668-4B8D-9EC2-2B30A99B8E64.JPG",
    },
  ];

  return (
    <section id="galeria" className="py-16 md:py-20 lg:py-24 bg-[#0a0a0a] text-white relative overflow-hidden">
      {/* BACKGROUND LUXURY LIGHTING */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1a4463]/15 blur-[120px] pointer-events-none" />

      <div className="max-w-[1300px] mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 gap-5">
          <GsapReveal>
            <div className="inline-flex items-center gap-2 border border-white/20 bg-white/5 px-3 py-1 rounded-full text-[9px] tracking-[0.26em] uppercase text-[#b5a898] mb-2.5 font-medium">
              <span>03 · Archivo Visual &amp; Proyectos</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-[42px] font-normal text-white tracking-tight">
              Galería Editorial
            </h2>
          </GsapReveal>
          <Link
            href="/galeria"
            className="group inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-[#b5a898] hover:text-white border-b border-[#b5a898]/40 hover:border-white pb-1 transition-colors w-fit"
          >
            <span>Ver Galería Completa</span>
            <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* 4 EDITORIAL CARDS WITH RICH PHOTOGRAPHIC BACKDROPS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => (
            <GsapReveal
              key={card.name}
              delay={idx * 0.05}
              className="group flex flex-col justify-between p-6 md:p-7 bg-[#141414] border border-white/10 hover:border-white/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl relative overflow-hidden min-h-[380px]"
            >
              {/* PHOTOGRAPHIC BACKGROUND WITH EDITORIAL GRADIENT */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={card.image}
                  alt={card.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover object-[center_top] opacity-35 group-hover:opacity-45 transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/50" />
              </div>

              <div className="relative z-10">
                <span className="text-[9px] tracking-[0.22em] uppercase text-[#b5a898] font-medium block mb-3">
                  {card.cat}
                </span>
                <h3 className="font-serif text-xl text-white font-normal mb-3 group-hover:text-[#b5a898] transition-colors leading-snug">
                  {card.name}
                </h3>
                <p className="text-xs leading-relaxed text-white/70 font-light mb-6">
                  {card.desc}
                </p>
              </div>

              <div className="relative z-10">
                <Link
                  href={card.href}
                  className="group/btn inline-flex items-center justify-between gap-3 bg-white/10 hover:bg-white text-white hover:text-black pl-4 pr-1.5 py-2 rounded-full text-[11px] tracking-[0.16em] uppercase font-semibold transition-all duration-300 active:scale-[0.98] w-full backdrop-blur-sm"
                >
                  <span>{card.cta}</span>
                  <div className="w-5.5 h-5.5 rounded-full bg-white/20 group-hover/btn:bg-black group-hover/btn:text-white text-white flex items-center justify-center transition-all duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">
                    <ArrowUpRight size={12} strokeWidth={2.2} />
                  </div>
                </Link>
              </div>
            </GsapReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
