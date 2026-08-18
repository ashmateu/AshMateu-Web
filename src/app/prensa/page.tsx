import React from "react";
import Image from "next/image";
import { getPressArticles } from "@/lib/data/press";
import ContactForm from "@/components/contact/ContactForm";
import CharacterCoverCard, { CharacterCoverGroup } from "@/components/press/CharacterCoverCard";
import { ExternalLink } from "lucide-react";

export const metadata = {
  title: "Prensa & Portadas de Revista — Ash Mateu",
  description:
    "Archivo oficial unificado por personajes y producciones de más de 150 portadas dirigidas por Ash Mateu en Marie Claire Argentina y publicaciones de lujo.",
};

const characterCoverGroups: CharacterCoverGroup[] = [
  {
    id: "valentina-ferrer",
    characterName: "Valentina Ferrer",
    publication: "Marie Claire Argentina",
    roleOrNote: "Sastrería & Estilo · Alta Joyería",
    badge: "15 Tapas / Spreads",
    covers: [
      { src: "/images/catalog_v2/portadas/1c2c1c68-11f5-4d8f-a4f6-745ea9cc1f32.jpg", title: "Portada Principal — Sastrería & Estilo" },
      { src: "/images/catalog_v2/portadas/1b715713-6f62-473f-9b44-6ef35d664969.jpg", title: "Edición Especial — Alta Joyería" },
      { src: "/images/catalog_v2/36. Valentina Ferrer Marie Claire/MC-047-Tapa Valentina IG.jpg", title: "Portada Oficial — New York Issue" },
      { src: "/images/catalog_v2/36. Valentina Ferrer Marie Claire/MC_VALENTINA_RETOUCHED_0001 copy.jpg", title: "Editorial Look 01 — Sastrería Contemporánea" },
      { src: "/images/catalog_v2/36. Valentina Ferrer Marie Claire/MC_VALENTINA_RETOUCHED_0002.jpg", title: "Editorial Look 02 — Alta Costura" },
      { src: "/images/catalog_v2/36. Valentina Ferrer Marie Claire/MC_VALENTINA_RETOUCHED_0003 copy.jpg", title: "Editorial Look 03 — Manhattan Studio" },
      { src: "/images/catalog_v2/36. Valentina Ferrer Marie Claire/MC_VALENTINA_RETOUCHED_0004 copy.jpg", title: "Editorial Look 04 — Sombrero & Estilo" },
      { src: "/images/catalog_v2/36. Valentina Ferrer Marie Claire/MC_VALENTINA_RETOUCHED_0004_1 copy.jpg", title: "Editorial Look 05 — Vanguardia" },
      { src: "/images/catalog_v2/36. Valentina Ferrer Marie Claire/MC_VALENTINA_RETOUCHED_0005_1 copy.jpg", title: "Editorial Look 06 — Siluetas de Lujo" },
      { src: "/images/catalog_v2/36. Valentina Ferrer Marie Claire/MC_VALENTINA_RETOUCHED_0006_1 copy.jpg", title: "Editorial Look 07 — Blanco y Negro" },
      { src: "/images/catalog_v2/36. Valentina Ferrer Marie Claire/MC_VALENTINA_RETOUCHED_0007_1 copy.jpg", title: "Editorial Look 08 — Retrato Puro" },
      { src: "/images/catalog_v2/36. Valentina Ferrer Marie Claire/MC_VALENTINA_RETOUCHED_0008_1 copy.jpg", title: "Editorial Look 09 — Texturas Orgánicas" },
      { src: "/images/catalog_v2/36. Valentina Ferrer Marie Claire/MC_VALENTINA_RETOUCHED_0010_1 copy.jpg", title: "Editorial Look 10 — Glamour de Moda" },
      { src: "/images/catalog_v2/36. Valentina Ferrer Marie Claire/MC_VALENTINA_RETOUCHED_0011_1 copy.jpg", title: "Editorial Look 11 — Arte de Firma" },
      { src: "/images/catalog_v2/36. Valentina Ferrer Marie Claire/MC_VALENTINA_RETOUCHED_0012 copy.jpg", title: "Editorial Look 12 — Cierre de Portada" },
    ],
  },
  {
    id: "belu-negri",
    characterName: "Belu Negri",
    publication: "DMAG Magazine",
    roleOrNote: "Vanguardia Pop · Editorial",
    badge: "5 Tapas / Spreads",
    covers: [
      { src: "/images/catalog_v2/BELU NEGRI/A.jpg", title: "Tapa Principal — DMAG Cover" },
      { src: "/images/catalog_v2/BELU NEGRI/B.jpg", title: "Look 02 — Cyber Pop Editorial" },
      { src: "/images/catalog_v2/BELU NEGRI/C.jpg", title: "Look 03 — Silueta Urbana" },
      { src: "/images/catalog_v2/BELU NEGRI/D.jpg", title: "Look 04 — Estilismo de Vanguardia" },
      { src: "/images/catalog_v2/BELU NEGRI/E.jpg", title: "Look 05 — Retrato DMAG" },
    ],
  },
  {
    id: "maia-reffico",
    characterName: "Maia Reffico",
    publication: "Marie Claire Argentina",
    roleOrNote: "Edición Aniversario Central",
    badge: "Tapa Principal",
    covers: [
      { src: "/images/catalog_v2/portadas/MC-064-Tapa MAIA RGB.jpg", title: "Tapa Central — Maia Reffico" },
    ],
  },
  {
    id: "santi-talledo",
    characterName: "Santi Talledo",
    publication: "Marie Claire Argentina",
    roleOrNote: "Edición Especial Primavera",
    badge: "Tapa Principal",
    covers: [
      { src: "/images/catalog_v2/portadas/1_TAPA SANTI TALLEDO.jpg", title: "Tapa Disruptiva — Santi Talledo" },
    ],
  },
  {
    id: "juana-burga",
    characterName: "Juana Burga",
    publication: "Marie Claire Argentina",
    roleOrNote: "Top Model Internacional",
    badge: "Tapa Principal",
    covers: [
      { src: "/images/catalog_v2/portadas/Cover-Juani-final-scaled.jpg", title: "Tapa de Lujo — Juana Burga" },
    ],
  },
  {
    id: "moda-estudio-ny",
    characterName: "Moda Estudio New York",
    publication: "Marie Claire Argentina",
    roleOrNote: "NYFW Front Row & Lunares",
    badge: "8 Tapas / Spreads",
    covers: [
      { src: "/images/catalog_v2/Moda estudio tapa lunares New York jpegs/MarieClaire_Cover_2024_014.jpg", title: "Tapa NYFW — Front Row Lincoln Center" },
      { src: "/images/catalog_v2/Moda estudio tapa lunares New York jpegs/MarieClaire_Cover_2024_001.jpg", title: "Editorial Look 01 — Lunares Manhattan" },
      { src: "/images/catalog_v2/Moda estudio tapa lunares New York jpegs/MarieClaire_Cover_2024_009.jpg", title: "Editorial Look 02 — Sastrería de Estudio" },
      { src: "/images/catalog_v2/Moda estudio tapa lunares New York jpegs/MarieClaire_Cover_2024_010.jpg", title: "Editorial Look 03 — Silueta Urbana NY" },
      { src: "/images/catalog_v2/Moda estudio tapa lunares New York jpegs/MarieClaire_Cover_2024_013.jpg", title: "Editorial Look 04 — Look de Pasarela" },
      { src: "/images/catalog_v2/Moda estudio tapa lunares New York jpegs/MarieClaire_Cover_2024_018.jpg", title: "Editorial Look 05 — Estudio New York" },
      { src: "/images/catalog_v2/Moda estudio tapa lunares New York jpegs/MarieClaire_Cover_2024_019.jpg", title: "Editorial Look 06 — Editorial de Firma" },
      { src: "/images/catalog_v2/Moda estudio tapa lunares New York jpegs/MarieClaire_Cover_2024_020.jpg", title: "Editorial Look 07 — Cierre de Colección" },
    ],
  },
  {
    id: "tecnomoda-series",
    characterName: "Tecnomoda Digital Series",
    publication: "Marie Claire Argentina",
    roleOrNote: "Trilogía Digital & Vanguardia",
    badge: "3 Portadas Digitales",
    covers: [
      { src: "/images/catalog_v2/portadas/MC-083-Tapa DIgital-Tecnomoda A.jpg", title: "Tecnomoda Digital A — Futuro & IA" },
      { src: "/images/catalog_v2/portadas/MC-083-Tapa DIgital-Tecnomoda B.jpg", title: "Tecnomoda Digital B — Siluetas 3D" },
      { src: "/images/catalog_v2/portadas/MC-083-Tapa DIgital-Tecnomoda C.jpg", title: "Tecnomoda Digital C — Cyber Fashion" },
    ],
  },
  {
    id: "quioscos-simultaneas",
    characterName: "Cuatro Portadas en Quioscos",
    publication: "Marie Claire Argentina",
    roleOrNote: "Ediciones Simultáneas en Venta",
    badge: "8 Tapas de Colección",
    covers: [
      { src: "/images/catalog_v2/portadas/IMG_0339.jpg", title: "Edición Simultánea Quiosco I" },
      { src: "/images/catalog_v2/portadas/IMG_0340.jpg", title: "Edición Simultánea Quiosco II" },
      { src: "/images/catalog_v2/portadas/IMG_0341.jpg", title: "Edición Simultánea Quiosco III" },
      { src: "/images/catalog_v2/portadas/IMG_0342.jpg", title: "Edición Simultánea Quiosco IV" },
      { src: "/images/catalog_v2/portadas/IMG_0343.jpg", title: "Edición Especial V" },
      { src: "/images/catalog_v2/portadas/IMG_0344.jpg", title: "Edición Especial VI" },
      { src: "/images/catalog_v2/portadas/IMG_0346.jpg", title: "Archivo de Quiosco VII" },
      { src: "/images/catalog_v2/portadas/IMG_0347.jpg", title: "Archivo de Quiosco VIII" },
    ],
  },
  {
    id: "coleccion-20-anos",
    characterName: "Tapas de Colección 20 Años",
    publication: "Marie Claire & Archivo",
    roleOrNote: "Retrospectiva Histórica",
    badge: "6 Portadas Icónicas",
    covers: [
      { src: "/images/catalog_v2/portadas/TAPA1.jpg", title: "Central Park — Moda Flores" },
      { src: "/images/catalog_v2/portadas/TAPA2.jpg", title: "Alta Costura — 20 Años de Dirección" },
      { src: "/images/catalog_v2/portadas/7c275178-47fc-467b-88e7-8f449ff62254.jpg", title: "Colección Resort & Verano" },
      { src: "/images/catalog_v2/PDFS MC/MC-073-Tapa NY.jpg", title: "New York Issue — Manhattan" },
      { src: "/images/catalog_v2/portadas/005 (1).jpg", title: "Colección de Estudio" },
      { src: "/images/catalog_v2/portadas/006 (1).jpg", title: "Retrospectiva Histórica" },
    ],
  },
];

export default async function PrensaPage() {
  const articles = await getPressArticles();

  const totalIndividualCovers = characterCoverGroups.reduce(
    (acc, group) => acc + group.covers.length,
    0
  );

  return (
    <div className="pt-28 md:pt-36 bg-[#F7F3EE] text-[#0A0A0A] min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-24">
        
        {/* HEADER */}
        <div className="mb-14 pb-8 border-b border-[#B5A898]/40">
          <div className="flex items-center gap-2.5 mb-2.5">
            <span className="w-6 h-px bg-[#7A6A5A]" />
            <span className="text-[9.5px] tracking-[0.28em] uppercase text-[#7A6A5A] font-semibold font-mono">
              Medios &amp; Publicaciones
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#0A0A0A] font-normal tracking-tight mb-4">
            Prensa &amp; Portadas de Revista
          </h1>
          <p className="text-sm md:text-base text-[#121212]/75 max-w-2xl font-light leading-relaxed">
            Archivo oficial de más de 150 portadas producidas y decenas de artículos publicados a lo largo de 20 años de dirección editorial en Marie Claire Argentina, DMAG y publicaciones internacionales.
          </p>
        </div>

        {/* 1. MARIE CLAIRE PUBLISHED ARTICLES SECTION (COLUMN & COVERTURAS) */}
        <div className="mb-24">
          <div className="mb-10">
            <span className="text-[9px] tracking-[0.28em] uppercase text-[#7A6A5A] font-semibold font-mono block mb-1">
              Columnas &amp; Coberturas
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#0A0A0A] font-normal">
              Artículos en Marie Claire Argentina
            </h2>
            <p className="text-xs text-[#121212]/70 font-light mt-1">
              Columnas de opinión, notas de investigación y coberturas internacionales escritas y publicadas por Ash Mateu.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((art, idx) => (
              <article
                key={art.id || idx}
                className="bg-white rounded-xl border border-[#B5A898]/40 overflow-hidden flex flex-col justify-between group hover:border-black transition-all duration-300 shadow-xs hover:shadow-md"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full bg-[#FAF6F0] overflow-hidden">
                    {art.cover_url ? (
                      <Image
                        src={art.cover_url}
                        alt={art.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover object-[center_18%] group-hover:scale-104 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#0A0A0A] text-white p-6">
                        <span className="font-serif text-lg text-[#B5A898] italic text-center">
                          {art.publication}
                        </span>
                      </div>
                    )}
                    <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm text-white text-[8px] font-mono tracking-[0.2em] uppercase px-2.5 py-1 rounded">
                      {art.publication}
                    </div>
                  </div>

                  <div className="p-6">
                    <span className="text-[9px] font-mono text-[#7A6A5A] block mb-2">
                      {art.publication_date
                        ? new Date(art.publication_date).toLocaleDateString("es-AR", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "Editorial Marie Claire"}
                    </span>
                    <h3 className="font-serif text-lg md:text-xl text-[#0A0A0A] font-normal leading-snug mb-3 group-hover:text-[#7A6A5A] transition-colors">
                      {art.title}
                    </h3>
                    <p className="font-sans text-xs text-[#121212]/70 font-light leading-relaxed line-clamp-3">
                      {art.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-[#B5A898]/20 mt-4 flex items-center justify-between">
                  {art.url ? (
                    <a
                      href={art.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-[0.16em] text-[#0A0A0A] font-bold hover:text-[#7A6A5A] transition-colors"
                    >
                      <span>Leer en Marie Claire</span>
                      <ExternalLink size={11} />
                    </a>
                  ) : (
                    <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-[#7A6A5A]">
                      Edición Impresa
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* 2. CHARACTER-BASED UNIFIED COVERS GRID (CATÁLOGO COMPLETO) */}
        <div className="pt-12 border-t border-[#B5A898]/40 mb-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-[9px] tracking-[0.28em] uppercase text-[#7A6A5A] font-semibold font-mono block mb-1">
                Catálogo Completo
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#0A0A0A] font-normal">
                Archivo Histórico de Portadas
              </h2>
              <p className="text-xs text-[#121212]/70 font-light mt-1">
                Portadas agrupadas por personaje y serie editorial. Desliza o usa las flechas en cada tarjeta para explorar todas las tapas.
              </p>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="text-[11px] font-mono text-[#7A6A5A] bg-white px-3.5 py-1.5 rounded-full border border-[#B5A898]/40 shadow-2xs">
                {characterCoverGroups.length} Series · {totalIndividualCovers} Tapas
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {characterCoverGroups.map((group, idx) => (
              <CharacterCoverCard
                key={group.id}
                group={group}
                autoplayIntervalMs={3600 + (idx % 4) * 450}
              />
            ))}
          </div>
        </div>

        {/* CONTACT BANNER */}
        <ContactForm />

      </div>
    </div>
  );
}
