"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import GsapReveal from "@/components/animations/GsapReveal";
import { CoverflowCarousel, CoverflowSlide } from "@/components/ui/coverflow-carousel";

const visualDiarySlides: CoverflowSlide[] = [
  {
    src: "/images/catalog/03_fashion_week_paris_canon/4A2A4418.JPEG",
    alt: "Ash Mateu en Paris Fashion Week Street Style",
    title: "Paris Fashion Week · Street Style",
    subtitle: "París, Francia",
    meta: [
      { label: "Locación", value: "Place Vendôme" },
      { label: "Temporada", value: "Haute Couture" },
      { label: "Cobertura", value: "Front Row & Street" },
    ],
  },
  {
    src: "/images/catalog/01_chanel_alta_costura_studio/_E8A9215.jpg",
    alt: "Producción Chanel Haute Couture Studio",
    title: "Chanel Haute Couture · Studio Fitting",
    subtitle: "París / Buenos Aires",
    meta: [
      { label: "Maison", value: "Chanel" },
      { label: "Estilismo", value: "Alta Costura" },
      { label: "Dirección", value: "Ash Mateu" },
    ],
  },
  {
    src: "/images/catalog/03_fashion_week_paris_canon/4A2A4232.JPEG",
    alt: "Ash Mateu en Fashion Week Fitting & Shows",
    title: "Grand Palais · Fitting & Shows",
    subtitle: "París, Francia",
    meta: [
      { label: "Evento", value: "Paris FW" },
      { label: "Backstage", value: "Accesos VIP" },
      { label: "Año", value: "2024 — 2026" },
    ],
  },
  {
    src: "/images/hero_studio/MARIECLAIRE_2608064419_web.webp",
    alt: "Ash Mateu Retrato Editorial de Moda",
    title: "Editorial Portrait · Marie Claire Session",
    subtitle: "Estudio de Moda",
    meta: [
      { label: "Publicación", value: "Marie Claire" },
      { label: "Sastrería", value: "Oversized Tailoring" },
      { label: "Rol", value: "Directora de Moda" },
    ],
  },
  {
    src: "/images/catalog/03_fashion_week_paris_canon/4A2A4184.JPEG",
    alt: "Ash Mateu Cobertura de Moda Internacional",
    title: "Tuileries Gardens · Fashion Dispatch",
    subtitle: "París, Francia",
    meta: [
      { label: "Medio", value: "Marie Claire & Digital" },
      { label: "Tema", value: "Macrotendencias" },
      { label: "Formato", value: "Diario Visual" },
    ],
  },
  {
    src: "/images/hero_studio/MARIECLAIRE_2608064351_web.webp",
    alt: "Ash Mateu Dirección Creativa & Styling",
    title: "Creative Direction & Styling Suite",
    subtitle: "New York / Manhattan",
    meta: [
      { label: "Ciudad", value: "Nueva York" },
      { label: "Concepto", value: "Contemporary Minimal" },
      { label: "Paleta", value: "Neutrals & Gold" },
    ],
  },
  {
    src: "/images/catalog_v2/ASH/IMG_0682-1.jpg",
    alt: "Ash Mateu Retrato de Autor",
    title: "Retrato de Autor · Trayectoria",
    subtitle: "Buenos Aires",
    meta: [
      { label: "Archivo", value: "Editorial Perfil" },
      { label: "Hito", value: "Debut Profesional" },
      { label: "Enfoque", value: "Visión de Firma" },
    ],
  },
  {
    src: "/images/catalog_v2/ASH/IMG_7663-1.jpg",
    alt: "Ash Mateu Studio Exit 2025",
    title: "Studio Founder & Academy",
    subtitle: "Comunidad 150k Insiders",
    meta: [
      { label: "Comunidad", value: "150,000 Alumnos" },
      { label: "Industria", value: "Educación de Moda" },
      { label: "Exit", value: "2025" },
    ],
  },
];

export default function InstagramStrip() {
  return (
    <section className="py-8 md:py-10 lg:py-12 bg-[#0a0a0a] text-white border-t border-white/10 relative overflow-hidden">
      <div className="max-w-[1360px] mx-auto px-6 md:px-12 relative z-10">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 md:mb-6 gap-4 pb-4 border-b border-white/10">
          <GsapReveal>
            <div className="inline-flex items-center gap-2 border border-white/20 bg-white/5 px-3.5 py-1 rounded-full text-[9px] font-mono tracking-[0.26em] uppercase text-[#b5a898] mb-2.5 font-semibold">
              <span>03 · Diario Visual &amp; Coberturas</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white tracking-tight">
              @ashmateu
            </h2>
            <p className="text-xs sm:text-sm text-white/60 font-light mt-2 max-w-md">
              Crónicas visuales, backstages de semanas de la moda internacionales, fittings y producciones de autor.
            </p>
          </GsapReveal>

          <GsapReveal delay={0.1}>
            <a
              href="https://www.instagram.com/ashmateu"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 text-[11px] font-mono tracking-[0.22em] uppercase text-[#b5a898] hover:text-white border-b border-[#b5a898]/40 hover:border-white pb-1.5 transition-all w-fit font-medium"
            >
              <span>Seguir en Instagram</span>
              <ArrowUpRight
                size={14}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#b5a898] group-hover:text-white"
              />
            </a>
          </GsapReveal>
        </div>

        {/* 3D COVERFLOW INTERACTIVE CAROUSEL */}
        <div className="relative">
          <CoverflowCarousel
            slides={visualDiarySlides}
            rotate={38}
            depth={0.65}
            perspective={3.2}
            falloff={0.52}
            fade={0.12}
            cardWidth="clamp(220px, 26vw, 340px)"
            gap={0.08}
            loop={true}
            showCaption={false}
            showNavigation={true}
            showPagination={true}
            label="Diario Visual Ash Mateu"
          />
        </div>

      </div>
    </section>
  );
}
