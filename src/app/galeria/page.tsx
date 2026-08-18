import React, { Suspense } from "react";
import PortfolioGallery from "@/components/portfolio/PortfolioGallery";
import ContactForm from "@/components/contact/ContactForm";

export const metadata = {
  title: "Fashion Gallery & Producciones — Ash Mateu",
  description:
    "Archivo visual de producciones editoriales, campañas de moda y celebrity styling de Ash Mateu en Chanel, Miu Miu, Dolce & Gabbana, Gucci y Marie Claire.",
};

export default function GaleriaPage() {
  return (
    <div className="pt-24 md:pt-32 bg-[#F7F3EE] min-h-screen">
      <Suspense
        fallback={
          <div className="py-24 text-center text-xs tracking-widest uppercase text-[#7A6A5A]">
            Cargando Archivo Visual...
          </div>
        }
      >
        <PortfolioGallery isStandalone={true} />
      </Suspense>
      <ContactForm />
    </div>
  );
}
