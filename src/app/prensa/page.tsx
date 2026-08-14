import React from "react";
import Image from "next/image";
import { getPressArticles } from "@/lib/data/press";
import ContactForm from "@/components/contact/ContactForm";

export const metadata = {
  title: "Prensa & Artículos Marie Claire — Ash Mateu",
  description:
    "Más de 150 portadas y notas editoriales publicadas por Ash Mateu en Marie Claire Argentina y medios de moda.",
};

const covers = [
  { src: "/images/hero/marie_claire_cover.webp", title: "Marie Claire Argentina — Portada" },
  { src: "/images/extracted/valentina-miumiu/img-000.webp", title: "Valentina Ferrer × Miu Miu" },
  { src: "/images/extracted/chanel-hc/img-005.webp", title: "Chanel Haute Couture NYC" },
  { src: "/images/extracted/dolores-fonzi/img-003.webp", title: "Dolores Fonzi — Marie Claire" },
  { src: "/images/extracted/leonie-dg/img-003.webp", title: "Leonie Hanne × Dolce & Gabbana" },
  { src: "/images/hero_studio/MARIECLAIRE_2608064304_web.webp", title: "Ash Mateu Marie Claire Edición Especial" },
];

export default async function PrensaPage() {
  const articles = await getPressArticles();

  return (
    <div className="pt-28 md:pt-36 bg-[#f7f3ee]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-20">
        {/* HEADER */}
        <p className="text-[11px] tracking-[0.28em] uppercase text-[#7a7065] font-medium mb-3">
          Medios &amp; Publicaciones
        </p>
        <h1 className="font-serif text-4xl md:text-6xl text-black font-normal mb-8">
          Prensa &amp; Nuevas Portadas
        </h1>
        <p className="text-base md:text-lg text-black/75 max-w-2xl font-light leading-relaxed mb-16">
          Más de 150 tapas producidas y decenas de artículos publicados a lo largo de 20 años de trayectoria editorial en Marie Claire Argentina y medios internacionales.
        </p>

        {/* COVERS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {covers.map((cov, i) => (
            <div
              key={i}
              className="bg-white border border-[#b5a898]/30 overflow-hidden group hover:border-black transition-all shadow-sm hover:shadow-md"
            >
              <div className="relative aspect-[3/4] w-full bg-neutral-100">
                <Image
                  src={cov.src}
                  alt={cov.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-[center_top] group-hover:scale-105 transition-transform duration-500"
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

        {/* MARIE CLAIRE PUBLISHED ARTICLES SECTION */}
        <div className="pt-12 border-t border-[#b5a898]/40">
          <p className="text-[11px] tracking-[0.28em] uppercase text-[#7a7065] font-medium mb-3">
            Columnas &amp; Coberturas
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-black font-normal mb-10">
            Artículos en Marie Claire Argentina
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((art, idx) => (
              <article
                key={art.id || idx}
                className="bg-white border border-[#b5a898]/30 overflow-hidden flex flex-col justify-between group hover:border-black transition-all duration-300 shadow-sm"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full bg-neutral-100 overflow-hidden">
                    {art.cover_url ? (
                      <Image
                        src={art.cover_url}
                        alt={art.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover object-[center_18%] group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#0a0a0a] text-white p-6">
                        <span className="font-serif text-lg text-[#b5a898] italic text-center">
                          {art.publication}
                        </span>
                      </div>
                    )}
                    <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-sm text-white text-[8.5px] tracking-[0.2em] uppercase px-2.5 py-1">
                      {art.publication}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between text-[9.5px] tracking-[0.2em] uppercase text-[#7a7065] mb-2">
                      <span>{art.category || "Editorial"}</span>
                      <span>{art.publication_date}</span>
                    </div>
                    <h3 className="font-serif text-lg text-black font-normal leading-snug mb-3 group-hover:text-[#b5a898] transition-colors line-clamp-2">
                      {art.title}
                    </h3>
                    {art.excerpt && (
                      <p className="text-xs text-black/70 leading-relaxed font-light line-clamp-3">
                        {art.excerpt}
                      </p>
                    )}
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <a
                    href={art.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-[11px] tracking-[0.16em] uppercase font-semibold text-black border-b border-black/30 pb-0.5 group-hover:border-black"
                  >
                    Leer nota en Marie Claire ↗
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <ContactForm />
    </div>
  );
}
