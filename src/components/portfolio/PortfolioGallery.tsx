"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useQueryState } from "nuqs";
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
        isStandalone ? "pt-2 pb-16 md:pb-24" : "py-16 md:py-24"
      } bg-[#f7f3ee] ${className}`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-10 gap-6">
          <GsapReveal>
            <p className="text-[11px] tracking-[0.28em] uppercase text-[#7a7065] font-medium mb-2">
              {isStandalone
                ? "Archivo Visual & Proyectos · 08 Producciones"
                : "08 Proyectos Editoriales"}
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-black tracking-tight">
              {isStandalone ? "Galería & Portfolio" : "Selected Works"}
            </h2>
          </GsapReveal>

          {/* URL-SYNCED FILTER BUTTONS */}
          <div className="flex flex-wrap gap-2 text-xs tracking-[0.16em] uppercase">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={`px-4 py-2 border transition-all duration-200 cursor-pointer ${
                  category === cat.value
                    ? "bg-black text-white border-black"
                    : "bg-white text-black/70 border-[#b5a898]/40 hover:border-black"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* PROJECTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProjects.map((project, idx) => (
            <GsapReveal key={project.id} delay={idx * 0.06}>
              <Link
                href={`/projects/${project.slug}`}
                className="group block bg-white border border-[#b5a898]/30 overflow-hidden hover:border-black transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100">
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover object-[center_18%] group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[9px] tracking-[0.2em] uppercase px-2.5 py-1">
                    {project.category}
                  </div>
                </div>

                <div className="p-5">
                  <span className="text-[9.5px] tracking-[0.2em] uppercase text-[#7a7065] block mb-1">
                    {project.location} · {project.year}
                  </span>
                  <h3 className="font-serif text-lg text-black font-normal leading-snug group-hover:text-[#b5a898] transition-colors mb-2 line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-xs text-black/65 line-clamp-2 leading-relaxed font-light mb-4">
                    {project.summary}
                  </p>
                  <span className="text-[10px] tracking-[0.18em] uppercase font-semibold text-black border-b border-black/30 pb-0.5 group-hover:border-black">
                    Ver Proyecto →
                  </span>
                </div>
              </Link>
            </GsapReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
