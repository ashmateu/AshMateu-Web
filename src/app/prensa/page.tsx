import React from "react";
import Image from "next/image";
import ContactForm from "@/components/contact/ContactForm";

export const metadata = {
  title: "Prensa & Portadas — Ash Mateu",
  description:
    "Más de 150 portadas y tapas de revistas editoriales producidas por Ash Mateu.",
};

const covers = [
  { src: "/images/hero/marie_claire_cover.webp", title: "Marie Claire Argentina — Portada" },
  { src: "/images/extracted/valentina-miumiu/img-000.webp", title: "Valentina Ferrer × Miu Miu" },
  { src: "/images/extracted/chanel-hc/img-005.webp", title: "Chanel Haute Couture NYC" },
  { src: "/images/extracted/dolores-fonzi/img-003.webp", title: "Dolores Fonzi — Marie Claire" },
  { src: "/images/extracted/leonie-dg/img-003.webp", title: "Leonie Hanne × Dolce & Gabbana" },
  { src: "/images/hero_studio/MARIECLAIRE_2608064304_web.webp", title: "Ash Mateu Marie Claire Edición Especial" },
];

export default function PrensaPage() {
  return (
    <div className="pt-28 md:pt-36 bg-[#f7f3ee]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-20">
        <p className="text-[11px] tracking-[0.28em] uppercase text-[#7a7065] font-medium mb-3">
          Medios &amp; Publicaciones
        </p>
        <h1 className="font-serif text-4xl md:text-6xl text-black font-normal mb-8">
          Prensa &amp; Nuevas Portadas
        </h1>
        <p className="text-base md:text-lg text-black/75 max-w-2xl font-light leading-relaxed mb-16">
          Más de 150 tapas producidas a lo largo de 20 años de trayectoria editorial en medios internacionales y nacionales.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {covers.map((cov, i) => (
            <div
              key={i}
              className="bg-white border border-[#b5a898]/30 overflow-hidden group hover:border-black transition-all"
            >
              <div className="relative aspect-[3/4] w-full bg-neutral-100">
                <Image
                  src={cov.src}
                  alt={cov.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-[center_16%] group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-lg text-black font-normal">
                  {cov.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ContactForm />
    </div>
  );
}
