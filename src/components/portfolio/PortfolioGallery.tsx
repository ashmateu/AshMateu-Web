"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useQueryState } from "nuqs";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data/projects";
import GsapReveal from "@/components/animations/GsapReveal";

interface PortfolioGalleryProps {
  isStandalone?: boolean;
  className?: string;
}

const CATEGORIES = [
  { label: "Todo el Archivo", value: "all" },
  { label: "Haute Couture", value: "Haute Couture" },
  { label: "Editorial & Portadas", value: "Editorial" },
  { label: "Campañas & Marcas", value: "Campañas" },
  { label: "Celebrity & Galas", value: "Celebrity" },
];

export default function PortfolioGallery({
  isStandalone = false,
  className = "",
}: PortfolioGalleryProps) {
  const [category, setCategory] = useQueryState("category", {
    defaultValue: "all",
  });

  const filteredProjects =
    category === "all" || !category
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
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 md:mb-16 gap-8 border-b border-[#B5A898]/30 pb-8">
          <GsapReveal>
            <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.28em] uppercase text-[#7A6A5A] font-medium mb-3 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0A0A0A]" />
              <span>
                {isStandalone
                  ? "Archivo Visual de Moda & Producciones"
                  : "05 · Selección Curada"}
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#0A0A0A] font-normal tracking-tight leading-[1.05]">
              {isStandalone ? "Fashion Gallery" : "Selected Works"}
            </h2>
          </GsapReveal>

          {/* FILTROS TIPOGRÁFICOS EDITORIALES CON CONTEO */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 md:gap-8 text-xs tracking-[0.22em] uppercase font-medium">
            {CATEGORIES.map((c) => {
              const active = (category || "all") === c.value;
              const count =
                c.value === "all"
                  ? projects.length
                  : projects.filter((p) => p.category === c.value).length;

              return (
                <button
                  key={c.value}
                  onClick={() =>
                    setCategory(c.value === "all" ? null : c.value)
                  }
                  className={`pb-1.5 transition-all duration-300 text-[11px] sm:text-xs cursor-pointer flex items-center gap-1.5 ${
                    active
                      ? "text-[#0A0A0A] border-b-2 border-[#0A0A0A] font-semibold"
                      : "text-[#7A6A5A]/70 hover:text-[#0A0A0A] border-b-2 border-transparent"
                  }`}
                >
                  <span>{c.label}</span>
                  <span
                    className={`text-[9.5px] font-mono transition-opacity ${
                      active ? "text-[#0A0A0A]/70 font-semibold" : "text-[#7A6A5A]/50"
                    }`}
                  >
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ARCHIVO EN GRILLA EDITORIAL ASIMÉTRICA */}
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
                delay={idx * 0.04}
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
