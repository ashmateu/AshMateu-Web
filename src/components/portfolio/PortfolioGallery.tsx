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

export default function PortfolioGallery({
  isStandalone = false,
  className = "",
}: PortfolioGalleryProps) {
  const [category, setCategory] = useQueryState("category", {
    defaultValue: "all",
  });

  const categories = [
    { label: "Todos", value: "all" },
    { label: "Editorial", value: "Editorial" },
    { label: "Campañas", value: "Campañas" },
    { label: "Celebrity", value: "Celebrity" },
    { label: "Haute Couture", value: "Haute Couture" },
  ];

  const filteredProjects =
    category === "all"
      ? projects
      : projects.filter((p) => p.category === category);

  return (
    <section
      id="portfolio"
      className={`${
        isStandalone ? "pt-2 pb-20 md:pb-28" : "py-24 md:py-36"
      } bg-[#f7f3ee] ${className}`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 gap-6">
          <GsapReveal>
            <div className="inline-flex items-center gap-2 border border-[#b5a898]/40 bg-white px-3 py-1 rounded-full text-[9.5px] tracking-[0.26em] uppercase text-[#7a7065] mb-3 font-medium">
              <span>
                {isStandalone
                  ? "Archivo Visual & Proyectos · 08 Producciones"
                  : "04 · Producciones Seleccionadas"}
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-black tracking-tight">
              {isStandalone ? "Galería & Portfolio" : "Selected Works"}
            </h2>
          </GsapReveal>

          {/* URL-SYNCED FILTER PILL BUTTONS */}
          <div className="flex flex-wrap gap-2 text-xs tracking-[0.16em] uppercase">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={`px-4 py-2 border transition-all duration-300 cursor-pointer text-[11px] font-medium ${
                  category === cat.value
                    ? "bg-black text-white border-black shadow-sm"
                    : "bg-white text-black/70 border-[#b5a898]/40 hover:border-black hover:text-black"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* PROJECTS GRID (CONCENTRIC DOUBLE BEZEL) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProjects.map((project, idx) => (
            <GsapReveal key={project.id} delay={idx * 0.05}>
              <Link
                href={`/projects/${project.slug}`}
                className="group flex flex-col justify-between bg-white border border-[#b5a898]/35 overflow-hidden hover:border-black transition-all duration-500 shadow-sm hover:shadow-xl h-full active:scale-[0.98]"
              >
                <div>
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100">
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover object-[center_18%] group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-sm text-white text-[8.5px] tracking-[0.2em] uppercase px-2.5 py-1 font-medium">
                      {project.category}
                    </div>
                  </div>

                  <div className="p-6 pb-4">
                    <span className="text-[9.5px] tracking-[0.22em] uppercase text-[#7a7065] block mb-1.5 font-medium">
                      {project.location} · {project.year}
                    </span>
                    <h3 className="font-serif text-xl text-black font-normal leading-snug group-hover:text-[#b5a898] transition-colors mb-2 line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-xs text-black/65 line-clamp-2 leading-relaxed font-light mb-4">
                      {project.summary}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-[#b5a898]/20 mt-2 flex items-center justify-between text-[10.5px] tracking-[0.18em] uppercase font-semibold text-black group-hover:text-[#b5a898] transition-colors">
                  <span>Ver Proyecto</span>
                  <div className="w-6 h-6 rounded-full bg-[#f0ebe3] group-hover:bg-black group-hover:text-white text-black flex items-center justify-center transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
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
