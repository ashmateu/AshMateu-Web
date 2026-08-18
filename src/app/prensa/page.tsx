import React from "react";
import Image from "next/image";
import { getPressArticles } from "@/lib/data/press";
import ContactForm from "@/components/contact/ContactForm";
import CircularTestimonials from "@/components/ui/circular-testimonials";
import GsapReveal from "@/components/animations/GsapReveal";
import { Sparkles, BookOpen, ExternalLink, Award } from "lucide-react";

export const metadata = {
  title: "Prensa & Nuevas Portadas — Ash Mateu",
  description:
    "Más de 150 portadas y artículos de moda dirigidos por Ash Mateu en Marie Claire Argentina y publicaciones de lujo.",
};

const featuredCovers = [
  {
    name: "Maia Reffico",
    designation: "Portada Marie Claire — Edición Central",
    quote:
      "La dirección de estilismo de Ash Mateu redefine el glamour juvenil y vanguardista, fusionando alta costura con la frescura escénica internacional.",
    src: "/images/catalog_v2/portadas/MC-064-Tapa MAIA RGB.jpg",
  },
  {
    name: "Valentina Ferrer",
    designation: "Portada Marie Claire — New York Fashion",
    quote:
      "Producción editorial de portada en Nueva York. Una celebración de la elegancia contemporánea, la sastrería impecable y el diseño de autor.",
    src: "/images/catalog_v2/36. Valentina Ferrer Marie Claire/MC-047-Tapa Valentina IG.jpg",
  },
  {
    name: "Santi Talledo",
    designation: "Portada Marie Claire — Edición Especial",
    quote:
      "Una portada disruptiva, audaz y conceptual que rompió esquemas en quioscos y marcó la conversación de la temporada de moda.",
    src: "/images/catalog_v2/portadas/1_TAPA SANTI TALLEDO.jpg",
  },
  {
    name: "Juana Burga",
    designation: "Portada Marie Claire — Top Model Internacional",
    quote:
      "Dirección creativa milimétrica donde la alta costura se encuentra con una narrativa visual limpia, orgánica y cinematográfica.",
    src: "/images/catalog_v2/portadas/Cover-Juani-final-scaled.jpg",
  },
  {
    name: "New York Fashion Week",
    designation: "Portada Marie Claire — Pasarelas Globales",
    quote:
      "Cubriendo el front row de las semanas de la moda globales y traduciendo las macrotendencias en portadas de referencia para Latinoamérica.",
    src: "/images/catalog_v2/Moda estudio tapa lunares New York jpegs/MarieClaire_Cover_2024_014.jpg",
  },
  {
    name: "Tecnomoda & Vanguardia",
    designation: "Portada Marie Claire — Edición Digital",
    quote:
      "Explorando el futuro de la moda, la inteligencia visual y la creación de universos estéticos en la era digital.",
    src: "/images/catalog_v2/portadas/MC-083-Tapa DIgital-Tecnomoda A.jpg",
  },
  {
    name: "Alta Costura & Naturaleza",
    designation: "Portada Marie Claire — Colección de Primavera",
    quote:
      "Sastrería refinada y texturas poéticas en una producción inolvidable de dirección de moda integral.",
    src: "/images/catalog_v2/portadas/TAPA1.jpg",
  },
  {
    name: "Dos Décadas de Editorial",
    designation: "Archivo Histórico — +150 Tapas",
    quote:
      "Veinte años marcando la agenda visual de la moda con más de 150 portadas simultáneas y reconocimientos internacionales.",
    src: "/images/catalog_v2/portadas/TAPA2.jpg",
  },
];

const allCatalogCovers = [
  { src: "/images/catalog_v2/portadas/1_TAPA SANTI TALLEDO.jpg", title: "Marie Claire — Santi Talledo", date: "Edición Primavera" },
  { src: "/images/catalog_v2/portadas/Cover-Juani-final-scaled.jpg", title: "Marie Claire — Juana Burga", date: "Alta Costura" },
  { src: "/images/catalog_v2/portadas/MC-064-Tapa MAIA RGB.jpg", title: "Marie Claire — Maia Reffico", date: "Edición Aniversario" },
  { src: "/images/catalog_v2/36. Valentina Ferrer Marie Claire/MC-047-Tapa Valentina IG.jpg", title: "Marie Claire — Valentina Ferrer", date: "New York Issue" },
  { src: "/images/catalog_v2/Moda estudio tapa lunares New York jpegs/MarieClaire_Cover_2024_014.jpg", title: "Marie Claire — NYFW Front Row", date: "Pasarela NY" },
  { src: "/images/catalog_v2/portadas/MC-083-Tapa DIgital-Tecnomoda A.jpg", title: "Marie Claire — Tecnomoda Digital", date: "Vanguardia" },
  { src: "/images/catalog_v2/portadas/MC-083-Tapa DIgital-Tecnomoda B.jpg", title: "Marie Claire — Tecnomoda B", date: "Edición Especial" },
  { src: "/images/catalog_v2/portadas/MC-083-Tapa DIgital-Tecnomoda C.jpg", title: "Marie Claire — Tecnomoda C", date: "Tendencias" },
  { src: "/images/catalog_v2/portadas/TAPA1.jpg", title: "Marie Claire — Portada Especial", date: "Central Park" },
  { src: "/images/catalog_v2/portadas/TAPA2.jpg", title: "Marie Claire — Alta Costura", date: "Editorial de Firma" },
  { src: "/images/catalog_v2/portadas/005 (1).jpg", title: "Marie Claire — Colección Estudio", date: "Moda & Estilo" },
  { src: "/images/catalog_v2/portadas/006 (1).jpg", title: "Marie Claire — Portada Archivo", date: "Colección Exclusiva" },
];

export default async function PrensaPage() {
  const articles = await getPressArticles();

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
            Prensa &amp; Nuevas Portadas
          </h1>
          <p className="text-sm md:text-base text-[#121212]/75 max-w-2xl font-light leading-relaxed">
            Más de 150 portadas producidas y decenas de artículos publicados a lo largo de 20 años de dirección editorial en Marie Claire Argentina y medios de moda internacionales.
          </p>
        </div>

        {/* CIRCULAR 3D TESTIMONIALS / COVERS SHOWCASE */}
        <div className="mb-24 bg-white/70 backdrop-blur-md rounded-3xl p-6 md:p-12 border border-[#B5A898]/40 shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-6">
            <span className="text-[9px] font-mono tracking-[0.24em] uppercase text-[#7A6A5A] font-semibold block mb-1">
              Colección Destacada
            </span>
            <h2 className="font-serif text-2xl md:text-3xl text-[#0A0A0A] font-normal">
              Portadas &amp; Citas Editoriales
            </h2>
            <p className="text-xs text-[#121212]/70 font-light mt-1">
              Navega con las flechas o arrastra para explorar las portadas más icónicas en vista 3D giratoria.
            </p>
          </div>

          <div className="flex justify-center">
            <CircularTestimonials
              testimonials={featuredCovers}
              autoplay={true}
              colors={{
                name: "#0a0a0a",
                designation: "#7a6a5a",
                testimony: "#1f1f1f",
                arrowBackground: "#0a0a0a",
                arrowForeground: "#f7f3ee",
                arrowHoverBackground: "#b5a898",
              }}
              fontSizes={{
                name: "2rem",
                designation: "0.85rem",
                quote: "1.15rem",
              }}
            />
          </div>
        </div>

        {/* FULL ARCHIVE COVERS GRID */}
        <div className="pt-12 border-t border-[#B5A898]/40 mb-24">
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="text-[9px] tracking-[0.28em] uppercase text-[#7A6A5A] font-semibold font-mono block mb-1">
                Catálogo Completo
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#0A0A0A] font-normal">
                Archivo de Portadas de Revista
              </h2>
            </div>
            <span className="text-[11px] font-mono text-[#7A6A5A] hidden sm:inline-block">
              {allCatalogCovers.length} Portadas en Archivo
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {allCatalogCovers.map((cov, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-[#B5A898]/40 overflow-hidden group hover:border-black transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between"
              >
                <div className="relative aspect-[3/4] w-full bg-[#FAF6F0] overflow-hidden">
                  <Image
                    src={cov.src}
                    alt={cov.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                    className="object-cover object-[center_top] group-hover:scale-104 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded text-[8px] font-mono font-bold tracking-wider uppercase text-[#0A0A0A] border border-[#B5A898]/30">
                    {cov.date}
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <h3 className="font-serif text-sm text-[#0A0A0A] font-normal truncate">
                    {cov.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MARIE CLAIRE PUBLISHED ARTICLES SECTION */}
        <div className="pt-12 border-t border-[#B5A898]/40 mb-24">
          <div className="mb-10">
            <span className="text-[9px] tracking-[0.28em] uppercase text-[#7A6A5A] font-semibold font-mono block mb-1">
              Columnas &amp; Coberturas
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#0A0A0A] font-normal">
              Artículos en Marie Claire Argentina
            </h2>
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

        {/* CONTACT BANNER */}
        <ContactForm />

      </div>
    </div>
  );
}
