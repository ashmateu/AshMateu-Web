"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/lib/data/projects";
import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react";

interface ProjectNavigationFooterProps {
  prevProject: Project | null;
  nextProject: Project | null;
}

export default function ProjectNavigationFooter({
  prevProject,
  nextProject,
}: ProjectNavigationFooterProps) {
  return (
    <section className="mt-20 pt-12 border-t border-[#b5a898]/40">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-10">
        <span className="text-[10px] font-mono tracking-[0.28em] uppercase text-[#7a6a5a] font-semibold">
          Explorar Más Producciones
        </span>
        <Link
          href="/galeria"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#0a0a0a] hover:text-[#7a6a5a] transition-colors"
        >
          <LayoutGrid size={14} />
          <span>Ver Archivo Completo</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* PREVIOUS PROJECT */}
        {prevProject ? (
          <Link
            href={`/projects/${prevProject.slug}`}
            className="group flex items-center gap-5 p-4 rounded-xl border border-[#b5a898]/30 bg-white/70 backdrop-blur-sm hover:border-[#0a0a0a] transition-all duration-300 shadow-2xs"
          >
            <div className="relative w-20 h-24 sm:w-24 sm:h-28 rounded-lg overflow-hidden bg-neutral-200 shrink-0 border border-[#b5a898]/20">
              <Image
                src={prevProject.coverImage}
                alt={prevProject.title}
                fill
                sizes="100px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-between py-1">
              <div className="inline-flex items-center gap-1 text-[9.5px] font-mono tracking-wider uppercase text-[#7a6a5a]">
                <ArrowLeft size={11} className="transition-transform group-hover:-translate-x-1" />
                <span>Anterior</span>
              </div>
              <h4 className="font-serif text-lg sm:text-xl text-[#0a0a0a] group-hover:text-black line-clamp-1">
                {prevProject.title}
              </h4>
              <span className="text-[10px] uppercase tracking-wider text-[#7a6a5a]/80 font-mono">
                {prevProject.category} · {prevProject.year}
              </span>
            </div>
          </Link>
        ) : (
          <div className="hidden md:block" />
        )}

        {/* NEXT PROJECT */}
        {nextProject ? (
          <Link
            href={`/projects/${nextProject.slug}`}
            className="group flex items-center justify-between gap-5 p-4 rounded-xl border border-[#b5a898]/30 bg-white/70 backdrop-blur-sm hover:border-[#0a0a0a] transition-all duration-300 shadow-2xs"
          >
            <div className="flex flex-col justify-between py-1 text-left">
              <div className="inline-flex items-center gap-1 text-[9.5px] font-mono tracking-wider uppercase text-[#7a6a5a]">
                <span>Siguiente</span>
                <ArrowRight size={11} className="transition-transform group-hover:translate-x-1" />
              </div>
              <h4 className="font-serif text-lg sm:text-xl text-[#0a0a0a] group-hover:text-black line-clamp-1">
                {nextProject.title}
              </h4>
              <span className="text-[10px] uppercase tracking-wider text-[#7a6a5a]/80 font-mono">
                {nextProject.category} · {nextProject.year}
              </span>
            </div>
            <div className="relative w-20 h-24 sm:w-24 sm:h-28 rounded-lg overflow-hidden bg-neutral-200 shrink-0 border border-[#b5a898]/20">
              <Image
                src={nextProject.coverImage}
                alt={nextProject.title}
                fill
                sizes="100px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </Link>
        ) : (
          <div className="hidden md:block" />
        )}
      </div>
    </section>
  );
}
