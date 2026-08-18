"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useQueryState } from "nuqs";
import { ArrowUpRight, Sparkles, LayoutGrid, Eye } from "lucide-react";
import { projects } from "@/lib/data/projects";
import GsapReveal from "@/components/animations/GsapReveal";
import LuminaInteractiveList, { LuminaSlide } from "@/components/ui/lumina-interactive-list";

interface PortfolioGalleryProps {
  isStandalone?: boolean;
  className?: string;
}

const CATEGORY_SLIDES: Record<string, LuminaSlide[]> = {
  "Haute Couture": [
    {
      title: "Chanel Haute Couture",
      description: "Producción exclusiva capturada en Manhattan para Marie Claire.",
      media: "/images/extracted/chanel-hc/img-005.webp",
      category: "Haute Couture · París & NYC",
    },
    {
      title: "Chanel Prêt-à-Porter",
      description: "Colección Runway y artesanía textil de alta costura.",
      media: "/images/extracted/chanel-pap/img-000.webp",
      category: "Haute Couture",
    },
    {
      title: "Miu Miu Fall/Winter",
      description: "Estilismo vanguardista y sastrería de autor en estudio.",
      media: "/images/extracted/valentina-miumiu/img-001.webp",
      category: "Haute Couture",
    },
    {
      title: "Chanel Métiers d'Art",
      description: "Bordados artesanales, perlas y siluetas atemporales.",
      media: "/images/extracted/chanel-hc/img-002.webp",
      category: "Haute Couture",
    },
    {
      title: "20 Años de Dirección",
      description: "Retrospectiva histórica de producciones de pasarela.",
      media: "/images/catalog_v2/portadas/TAPA2.jpg",
      category: "Haute Couture",
    },
  ],
  "Editorial": [
    {
      title: "Valentina Ferrer",
      description: "Marie Claire Argentina — Portada Oficial Sastrería & Estilo.",
      media: "/images/catalog_v2/portadas/1c2c1c68-11f5-4d8f-a4f6-745ea9cc1f32.jpg",
      category: "Editorial & Portadas",
    },
    {
      title: "Belu Negri",
      description: "DMAG Magazine — Vanguardia Pop & Cyber Styling.",
      media: "/images/catalog_v2/BELU NEGRI/A.jpg",
      category: "Editorial & Portadas",
    },
    {
      title: "Maia Reffico",
      description: "Marie Claire Argentina — Edición Aniversario Central.",
      media: "/images/catalog_v2/portadas/MC-064-Tapa MAIA RGB.jpg",
      category: "Editorial & Portadas",
    },
    {
      title: "Santi Talledo",
      description: "Marie Claire Argentina — Primavera & Estilismo Disruptivo.",
      media: "/images/catalog_v2/portadas/1_TAPA SANTI TALLEDO.jpg",
      category: "Editorial & Portadas",
    },
    {
      title: "Juana Burga",
      description: "Marie Claire Argentina — Top Model Internacional.",
      media: "/images/catalog_v2/portadas/Cover-Juani-final-scaled.jpg",
      category: "Editorial & Portadas",
    },
  ],
  "Campañas": [
    {
      title: "Gucci Cruise Campaign",
      description: "Sastrería ecuestre, texturas rústicas y accesorios de lujo.",
      media: "/images/extracted/gucci-rural/img-000.webp",
      category: "Campañas & Marcas",
    },
    {
      title: "Dolce & Gabbana Milán",
      description: "Milan Fashion Week Campaign con Leonie Hanne.",
      media: "/images/extracted/leonie-dg/img-000.webp",
      category: "Campañas & Marcas",
    },
    {
      title: "Calu Rivero en NYC",
      description: "Producción urbana contemporánea en Manhattan & Chinatown.",
      media: "/images/extracted/calu-chinatown/img-000.webp",
      category: "Campañas & Marcas",
    },
    {
      title: "Dolce & Gabbana Front Row",
      description: "Milano Alta Moda y estilismo de impacto para pasarela.",
      media: "/images/extracted/leonie-dg/img-003.webp",
      category: "Campañas & Marcas",
    },
  ],
  "Celebrity": [
    {
      title: "Dolores Fonzi en Cannes",
      description: "Gala internacional de cine y alfombras rojas de alta costura.",
      media: "/images/extracted/dolores-fonzi/img-000.webp",
      category: "Celebrity & Galas",
    },
    {
      title: "Netflix Martín Fierro",
      description: "Estilismo exclusivo de celebridades y alfombras rojas.",
      media: "/images/extracted/netflix-mf/img-000.webp",
      category: "Celebrity & Galas",
    },
    {
      title: "Valentina Zenere",
      description: "Gala internacional de cine y moda contemporánea.",
      media: "/images/extracted/valentina-miumiu/img-000.webp",
      category: "Celebrity & Galas",
    },
    {
      title: "Dolores Fonzi — Retrato",
      description: "Retrato de autor en blanco y negro para prensa.",
      media: "/images/fonzi_bw-078.webp",
      category: "Celebrity & Galas",
    },
  ],
};

// All slides combined for "all" option
const ALL_SLIDES: LuminaSlide[] = [
  ...CATEGORY_SLIDES["Haute Couture"].slice(0, 2),
  ...CATEGORY_SLIDES["Editorial"].slice(0, 2),
  ...CATEGORY_SLIDES["Campañas"].slice(0, 1),
  ...CATEGORY_SLIDES["Celebrity"].slice(0, 1),
];

export default function PortfolioGallery({
  isStandalone = false,
  className = "",
}: PortfolioGalleryProps) {
  const [category, setCategory] = useQueryState("category", {
    defaultValue: "all",
  });

  const [viewMode, setViewMode] = useState<"lumina" | "grid">("lumina");

  const categories = [
    { label: "Todo el Archivo", value: "all" },
    { label: "Haute Couture", value: "Haute Couture" },
    { label: "Editorial & Portadas", value: "Editorial" },
    { label: "Campañas & Marcas", value: "Campañas" },
    { label: "Celebrity & Galas", value: "Celebrity" },
  ];

  const currentSlides = useMemo(() => {
    if (!category || category === "all") return ALL_SLIDES;
    return CATEGORY_SLIDES[category] || ALL_SLIDES;
  }, [category]);

  const filteredProjects =
    category === "all"
      ? projects
      : projects.filter((p) => p.category === category);

  return (
    <section
      id="portfolio"
      className={`${
        isStandalone ? "pt-4 pb-20 md:pb-28" : "py-16 md:py-24 lg:py-28"
      } bg-[#F7F3EE] ${className}`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* CABECERA EDITORIAL DE ALTA COSTURA */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 md:mb-12 gap-8 border-b border-[#B5A898]/30 pb-8">
          <GsapReveal>
            <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.28em] uppercase text-[#7A6A5A] font-medium mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0A0A0A]" />
              <span>
                {isStandalone
                  ? "Archivo Visual de Moda & Producciones"
                  : "04 · Selección Curada"}
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#0A0A0A] font-normal tracking-tight leading-[1.05]">
              {isStandalone ? "Fashion Gallery" : "Selected Works"}
            </h2>
          </GsapReveal>

          {/* FILTROS TIPOGRÁFICOS EDITORIALES */}
          <div className="flex flex-wrap items-center justify-between lg:justify-end gap-6 sm:gap-8">
            <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-xs tracking-[0.22em] uppercase font-medium">
              {categories.map((c) => {
                const active = category === c.value;
                return (
                  <button
                    key={c.value}
                    onClick={() =>
                      setCategory(c.value === "all" ? null : c.value)
                    }
                    className={`pb-1.5 transition-all duration-300 text-[11px] sm:text-xs cursor-pointer ${
                      active
                        ? "text-[#0A0A0A] border-b-2 border-[#0A0A0A] font-semibold"
                        : "text-[#7A6A5A]/70 hover:text-[#0A0A0A] border-b-2 border-transparent"
                    }`}
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>

            {/* TOGGLE VIEW MODE (LUMINA SHADER / GRID) */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-full border border-[#B5A898]/40 shadow-2xs">
              <button
                onClick={() => setViewMode("lumina")}
                type="button"
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase transition-all cursor-pointer ${
                  viewMode === "lumina"
                    ? "bg-[#0A0A0A] text-white shadow-xs font-semibold"
                    : "text-[#7A6A5A] hover:text-black"
                }`}
              >
                <Sparkles size={11} />
                <span>Cinemático</span>
              </button>
              <button
                onClick={() => setViewMode("grid")}
                type="button"
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase transition-all cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-[#0A0A0A] text-white shadow-xs font-semibold"
                    : "text-[#7A6A5A] hover:text-black"
                }`}
              >
                <LayoutGrid size={11} />
                <span>Grilla</span>
              </button>
            </div>
          </div>
        </div>

        {/* 1. LUMINA WEBGL SHADER CINEMATIC LIST (ACTIVO AL ENTRAR A LAS OPCIONES) */}
        {viewMode === "lumina" ? (
          <div className="mb-12">
            <LuminaInteractiveList
              key={category || "all"}
              slides={currentSlides}
              effect="glass"
              autoSlideSpeed={5000}
            />
          </div>
        ) : null}

        {/* 2. ARCHIVO EN GRILLA EDITORIAL ASIMÉTRICA */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 lg:gap-12">
          {filteredProjects.map((project, idx) => {
            const isFeatured = idx % 5 === 0;
            const isWide = idx % 5 === 3;
            const colSpan = isFeatured
              ? "md:col-span-8 lg:col-span-8"
              : isWide
              ? "md:col-span-6 lg:col-span-6"
              : "md:col-span-6 lg:col-span-4";

            const aspectClass = isFeatured
              ? "aspect-[16/10] md:aspect-[16/11]"
              : isWide
              ? "aspect-[4/5]"
              : "aspect-[3/4]";

            const formattedNumber = (idx + 1).toString().padStart(2, "0");

            return (
              <GsapReveal
                key={project.id}
                delay={idx * 0.05}
                className={`${colSpan} group relative`}
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="block relative overflow-hidden bg-neutral-200 border border-[#B5A898]/30 shadow-md group-hover:border-[#0A0A0A] transition-colors duration-500 rounded-xl"
                >
                  <div className={`relative w-full ${aspectClass} overflow-hidden`}>
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      sizes={
                        isFeatured
                          ? "(max-width: 768px) 100vw, 70vw"
                          : "(max-width: 768px) 100vw, 35vw"
                      }
                      className="object-cover object-[center_top] transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* OVERLAY EDITORIAL COMPLETO AL POSAR EL PUNTERO (HOVER) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400 flex flex-col justify-between p-5 md:p-6 pointer-events-none">
                      <div className="flex items-center justify-between transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <span className="bg-[#F7F3EE]/95 backdrop-blur-md px-3 py-1 text-[9.5px] tracking-[0.24em] uppercase text-[#0A0A0A] font-semibold border border-[#B5A898]/40 shadow-sm rounded">
                          {project.category}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center">
                          <ArrowUpRight size={14} />
                        </div>
                      </div>

                      <div className="transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                        <span className="font-serif text-sm italic text-[#b5a898] block mb-1">
                          Nº {formattedNumber}
                        </span>
                        <h3 className="font-serif text-xl sm:text-2xl text-white font-normal leading-snug">
                          {project.client}
                        </h3>
                        <span className="text-[10px] tracking-[0.24em] uppercase text-white/75 font-light block mt-1.5">
                          {project.location} · {project.year}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </GsapReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
