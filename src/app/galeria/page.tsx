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
    <div className="pt-24 md:pt-32 bg-[#f7f3ee]">
      <Suspense
        fallback={
          <div className="py-20 text-center text-xs tracking-widest uppercase text-black/50">
            Cargando Galería...
          </div>
        }
      >
        <PortfolioGallery isStandalone={true} />
      </Suspense>
      <EditorialGaleria />
      <ContactForm />
    </div>
  );
}
