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
        isStandalone ? "pt-2 pb-16 md:pb-20" : "py-16 md:py-20 lg:py-24"
      } bg-[#f7f3ee] ${className}`}
    >
      <div className="max-w-[1300px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-10 gap-5">
          <GsapReveal>
            <div className="inline-flex items-center gap-2 border border-[#b5a898]/40 bg-white px-3 py-1 rounded-full text-[9px] tracking-[0.26em] uppercase text-[#7a7065] mb-2.5 font-medium">
              <span>
                {isStandalone
                  ? "Archivo Visual & Proyectos · 08 Producciones"
                  : "04 · Producciones Seleccionadas"}
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-[42px] font-normal text-black tracking-tight">
              {isStandalone ? "Galería & Portfolio" : "Selected Works"}
            </h2>
          </GsapReveal>

          {/* URL-SYNCED FILTER PILL BUTTONS */}
          <div className="flex flex-wrap gap-1.5 text-xs tracking-[0.16em] uppercase">
            {categories.map((c) => {
              const active = category === c.value;
              return (
                <button
                  key={c.value}
                  onClick={() => setCategory(c.value === "all" ? null : c.value)}
                  className={`px-3 py-1.5 rounded-full border text-[10.5px] transition-all duration-300 ${
                    active
                      ? "bg-black text-white border-black shadow-sm font-semibold"
                      : "bg-white/80 text-black/70 border-[#b5a898]/40 hover:border-black hover:text-black font-medium"
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 8 PROJECTS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7">
          {filteredProjects.map((project, idx) => (
            <GsapReveal
              key={project.id}
              delay={idx * 0.04}
              className="group flex flex-col justify-between bg-white border border-[#b5a898]/35 hover:border-black transition-all duration-400 hover:-translate-y-1 hover:shadow-xl relative overflow-hidden"
            >
              <Link href={`/projects/${project.slug}`} className="block relative aspect-[4/5] overflow-hidden bg-black/5">
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm text-white text-[8.5px] tracking-[0.2em] uppercase px-2 py-0.5 font-medium">
                  {project.category}
                </span>
              </Link>

              <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 bg-white">
                <div>
                  <span className="text-[8.5px] tracking-[0.2em] uppercase text-[#7a7065] font-medium block mb-1">
                    {project.client} · {project.year}
                  </span>
                  <h3 className="font-serif text-base sm:text-lg text-black font-normal group-hover:text-[#b5a898] transition-colors leading-tight mb-2">
                    {project.title}
                  </h3>
                  <p className="text-[11.5px] text-black/65 font-light line-clamp-2 leading-relaxed mb-4">
                    {project.description}
                  </p>
                </div>

                <Link
                  href={`/projects/${project.slug}`}
                  className="group/btn inline-flex items-center justify-between gap-2 bg-black hover:bg-[#b5a898] text-white hover:text-black pl-3.5 pr-1.5 py-1.5 rounded-full text-[10px] tracking-[0.16em] uppercase font-semibold transition-all duration-300 active:scale-[0.98] w-full mt-auto"
                >
                  <span>Ver Proyecto</span>
                  <div className="w-5 h-5 rounded-full bg-white/20 group-hover/btn:bg-black group-hover/btn:text-white text-white flex items-center justify-center transition-all duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">
                    <ArrowUpRight size={11} strokeWidth={2.2} />
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
