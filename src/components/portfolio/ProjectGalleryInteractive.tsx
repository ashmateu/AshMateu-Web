"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Project } from "@/lib/data/projects";
import ImageLightboxModal, { LightboxImage } from "@/components/ui/ImageLightboxModal";
import ProjectNavigationFooter from "@/components/portfolio/ProjectNavigationFooter";
import { Maximize2, MessageSquare } from "lucide-react";

interface ProjectGalleryInteractiveProps {
  project: Project;
  prevProject: Project | null;
  nextProject: Project | null;
}

export default function ProjectGalleryInteractive({
  project,
  prevProject,
  nextProject,
}: ProjectGalleryInteractiveProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  const allImages: LightboxImage[] = [
    {
      src: project.coverImage,
      title: `${project.title} — Portada Principal`,
      caption: `${project.category} · ${project.location} (${project.year})`,
    },
    ...project.images.map((src, i) => ({
      src,
      title: `${project.title} — Look ${(i + 1).toString().padStart(2, "0")}`,
      caption: `Dirección Creativa & Styling: Ash Mateu · ${project.client}`,
    })),
  ];

  const handleOpenLightbox = (index: number) => {
    setActiveImageIdx(index);
    setLightboxOpen(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Hola Ash, estuve viendo la producción de "${project.title}" y me interesa consultar por un servicio de estilismo / dirección creativa similar.`
  );

  return (
    <>
      {/* MAIN COVER IMAGE WITH CLICK TO EXPAND */}
      <div
        onClick={() => handleOpenLightbox(0)}
        className="group relative aspect-[16/10] w-full bg-neutral-200 overflow-hidden mb-16 shadow-xl border border-[#b5a898]/30 rounded-2xl cursor-pointer"
        title="Hacé click para ver en pantalla completa"
      >
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_18%] transition-transform duration-700 ease-out group-hover:scale-103"
        />
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Maximize2 size={16} />
        </div>
      </div>

      {/* DESCRIPTION & WHATSAPP DIRECT ACTION */}
      <div className="max-w-3xl mx-auto my-16 text-center">
        <p className="font-serif text-lg sm:text-xl md:text-2xl text-black/85 font-normal leading-relaxed mb-8">
          {project.description}
        </p>
        <a
          href={`https://wa.me/5491123823297?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 bg-[#0a0a0a] text-white px-6 py-3 rounded-full text-xs font-mono tracking-widest uppercase hover:bg-black/80 transition-all shadow-md hover:scale-102 cursor-pointer"
        >
          <MessageSquare size={14} className="text-[#25D366]" />
          <span>Consultar por una producción similar</span>
        </a>
      </div>

      {/* GALLERY GRID (LOOKS) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
        {project.images.map((img, i) => {
          const lightboxIndex = i + 1;
          return (
            <div
              key={i}
              onClick={() => handleOpenLightbox(lightboxIndex)}
              className="group relative aspect-[3/4] bg-neutral-100 overflow-hidden border border-[#b5a898]/30 shadow-md rounded-xl cursor-pointer"
              title="Hacé click para expandir"
            >
              <Image
                src={img}
                alt={`${project.title} - ${i + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-[center_18%] hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Maximize2 size={15} />
              </div>
            </div>
          );
        })}
      </div>

      {/* CROSS-PROJECT NAVIGATION (PREVIOUS / NEXT) */}
      <ProjectNavigationFooter
        prevProject={prevProject}
        nextProject={nextProject}
      />

      {/* FULL-SCREEN LIGHTBOX MODAL */}
      <ImageLightboxModal
        isOpen={lightboxOpen}
        images={allImages}
        currentIndex={activeImageIdx}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(idx) => setActiveImageIdx(idx)}
      />
    </>
  );
}
