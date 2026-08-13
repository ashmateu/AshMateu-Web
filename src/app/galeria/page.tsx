import React, { Suspense } from "react";
import PortfolioGallery from "@/components/portfolio/PortfolioGallery";
import EditorialGaleria from "@/components/home/EditorialGaleria";
import ContactForm from "@/components/contact/ContactForm";

export const metadata = {
  title: "Galería & Portfolio — Ash Mateu",
  description:
    "Archivo visual de producciones editoriales, campañas de moda y celebrity styling de Ash Mateu.",
};

export default function GaleriaPage() {
  return (
    <div className="pt-28 md:pt-36 bg-[#f7f3ee]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-8">
        <p className="text-[11px] tracking-[0.28em] uppercase text-[#7a7065] font-medium mb-3">
          Archivo Visual &amp; Proyectos
        </p>
        <h1 className="font-serif text-4xl md:text-6xl text-black font-normal mb-6">
          Galería &amp; Portfolio
        </h1>
      </div>

      <Suspense fallback={<div className="py-20 text-center text-xs tracking-widest uppercase text-black/50">Cargando Galería...</div>}>
        <PortfolioGallery />
      </Suspense>
      <EditorialGaleria />
      <ContactForm />
    </div>
  );
}
