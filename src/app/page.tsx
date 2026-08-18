import React, { Suspense } from "react";
import HeroCover from "@/components/home/HeroCover";
import HighlightsGrid from "@/components/home/HighlightsGrid";
import ServicesPillars from "@/components/home/ServicesPillars";
import EditorialGaleria from "@/components/home/EditorialGaleria";
import PortfolioGallery from "@/components/portfolio/PortfolioGallery";
import VlogSection from "@/components/vlog/VlogSection";
import ClientsStrip from "@/components/home/ClientsStrip";
import InstagramStrip from "@/components/home/InstagramStrip";
import ContactForm from "@/components/contact/ContactForm";

export default function HomePage() {
  return (
    <>
      {/* 1. HERO COVER (FULL-SCREEN PPTX BLUEPRINT) */}
      <HeroCover />

      {/* 2. INSTAGRAM FEED / DIARIO VISUAL & COBERTURAS */}
      <InstagramStrip />

      {/* 3. HIGHLIGHTS GRID (SLIDE 6) */}
      <HighlightsGrid />

      {/* 4. ¿CÓMO TRABAJO? / 3 PILLARS (SLIDES 8, 9, 10) */}
      <ServicesPillars />

      {/* 5. GALERÍA EDITORIAL (SLIDE 11) */}
      <EditorialGaleria />

      {/* 6. PORTFOLIO SELECTED WORKS (8 PROJECTS RSC + URL STATE WITH SUSPENSE) */}
      <Suspense fallback={<div className="py-20 text-center text-xs tracking-widest uppercase text-black/50">Cargando Portfolio...</div>}>
        <PortfolioGallery />
      </Suspense>

      {/* 7. VLOG & SHORTS / MASTERCLASSES (SLIDE 12) */}
      <VlogSection />

      {/* 8. CLIENTS MARQUEE */}
      <ClientsStrip />

      {/* 9. CONTACT FORM + ZOD */}
      <ContactForm />
    </>
  );
}
