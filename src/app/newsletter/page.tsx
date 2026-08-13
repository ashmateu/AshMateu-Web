import React from "react";
import Image from "next/image";
import Link from "next/link";
import ContactForm from "@/components/contact/ContactForm";

export const metadata = {
  title: "Newsletter & Archivo Marie Claire / Trends — Ash Mateu",
  description:
    "Suscríbete a la newsletter de Ash Mateu y accede a todas sus columnas, notas de investigación en Marie Claire y publicaciones de tendencias.",
};

const publications = [
  {
    id: "mc-01",
    source: "Marie Claire Argentina",
    title: "El fin del algoritmo: Por qué las marcas de lujo vuelven a la intuición",
    category: "Investigación & Macrotendencias",
    date: "Febrero 2026",
    image: "/images/extracted/chanel-hc/img-005.webp",
    url: "/blog#tendencias-marketing-moda-2026",
    summary:
      "Una reflexión profunda sobre el agotamiento del marketing cuantitativo y el renacimiento de la curaduría cultural con propósito en las casas de lujo.",
  },
  {
    id: "mc-02",
    source: "Marie Claire Argentina · Cobertura Internacional",
    title: "Crónicas desde París: Las siluetas que definirán la próxima década",
    category: "Fashion Week · Front Row",
    date: "Enero 2026",
    image: "/images/extracted/valentina-miumiu/img-000.webp",
    url: "/blog#paris-fashion-week-cronica",
    summary:
      "Cobertura exclusiva desde el front row parisino: sastrería deconstruida, textiles sostenibles y la nueva elegancia post-minimalista.",
  },
  {
    id: "blog-01",
    source: "Blog & Trends · Ash Mateu",
    title: "Que nunca nadie olvide tu vestido: La guía definitiva de estilismo nupcial",
    category: "Dress to Kill · Novias",
    date: "Diciembre 2025",
    image: "/images/hero_studio/MARIECLAIRE_2608064304_web.webp",
    url: "/blog#guia-styling-novias",
    summary:
      "Cómo elegir tu vestido de novia sin perder tu personalidad en el intento y creando un look que trascienda las tendencias pasajeras.",
  },
  {
    id: "mc-03",
    source: "Marie Claire Argentina · Especial Alta Costura",
    title: "Chanel Haute Couture en Nueva York: Anatomía de una producción histórica",
    category: "Producción Editorial",
    date: "Noviembre 2025",
    image: "/images/extracted/chanel-hc/img-000.webp",
    url: "/projects/chanel-hc",
    summary:
      "El detrás de escena y la visión estética de la producción realizada en las calles de Nueva York con prendas exclusivas de Alta Costura.",
  },
  {
    id: "mc-04",
    source: "Marie Claire Argentina · Tapa",
    title: "Dolores Fonzi: El poder de la autenticidad y el cine independiente",
    category: "Celebrity Styling & Portada",
    date: "Septiembre 2025",
    image: "/images/extracted/dolores-fonzi/img-003.webp",
    url: "/projects/dolores-fonzi",
    summary:
      "Dirección de styling para la portada de Dolores Fonzi tras el estreno de Blondi y su proyección en festivales internacionales.",
  },
  {
    id: "blog-02",
    source: "Blog & Trends · Ash Mateu",
    title: "De la pasarela a la calle: Cómo decodificar los micro-trends de TikTok",
    category: "Análisis Sociológico",
    date: "Agosto 2025",
    image: "/images/extracted/leonie-dg/img-003.webp",
    url: "/blog",
    summary:
      "Diferencias entre modas efímeras de redes sociales y tendencias estructurales que perduran en el fondo de armario.",
  },
];

export default function NewsletterPage() {
  return (
    <div className="pt-28 md:pt-36 bg-[#f7f3ee]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-20">
        {/* HEADER */}
        <div className="max-w-3xl mb-16">
          <p className="text-[11px] tracking-[0.28em] uppercase text-[#7a7065] font-medium mb-3">
            Editorial &amp; Archivo de Publicaciones
          </p>
          <h1 className="font-serif text-4xl md:text-6xl text-black font-normal mb-6">
            Newsletter &amp; Notas de Ash Mateu
          </h1>
          <p className="text-base md:text-lg text-black/75 font-light leading-relaxed">
            Investigaciones, columnas de opinión en Marie Claire Argentina, análisis de Fashion Weeks internacionales y reflexiones sobre la industria de la moda.
          </p>
        </div>

        {/* NEWSLETTER SIGNUP BOX */}
        <div className="bg-[#0a0a0a] text-white p-8 md:p-12 mb-20 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="text-[10px] tracking-[0.25em] text-[#b5a898] uppercase font-medium block mb-2">
              Edición Mensual Privada
            </span>
            <h2 className="font-serif text-2xl md:text-4xl font-normal mb-4">
              Recibí los análisis de tendencias antes de que salgan a la calle
            </h2>
            <p className="text-xs md:text-sm text-white/70 font-light leading-relaxed mb-8">
              Curaduría directa de Ash Mateu: reportes de Fashion Week (París, Milán, NY), reflexiones de branding y notas exclusivas para la comunidad editorial.
            </p>

            <form
              action="https://formspree.io/f/mqaeavog"
              method="POST"
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                name="email"
                placeholder="Ingresá tu correo electrónico..."
                required
                className="flex-grow bg-white/10 border border-white/20 text-white placeholder-white/40 px-5 py-3 text-xs tracking-wider focus:outline-none focus:border-[#b5a898]"
              />
              <button
                type="submit"
                className="bg-[#b5a898] hover:bg-white text-black font-medium text-xs tracking-[0.2em] uppercase px-8 py-3 transition-colors duration-300"
              >
                Suscribirme
              </button>
            </form>
          </div>
        </div>

        {/* ARTICLES & MARIE CLAIRE NOTES GRID */}
        <div className="mb-12">
          <h2 className="font-serif text-2xl md:text-3xl text-black font-normal mb-8">
            Todas las notas publicadas
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publications.map((item) => (
              <article
                key={item.id}
                className="bg-white border border-[#b5a898]/30 overflow-hidden flex flex-col justify-between group hover:border-black transition-all duration-300"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full bg-neutral-100 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-[center_18%] group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-white text-[9px] tracking-[0.2em] uppercase px-2.5 py-1">
                      {item.source}
                    </div>
                  </div>

                  <div className="p-6 md:p-8">
                    <div className="flex items-center justify-between text-[10px] tracking-[0.2em] uppercase text-[#7a7065] mb-3">
                      <span>{item.category}</span>
                      <span>{item.date}</span>
                    </div>
                    <h3 className="font-serif text-xl text-black font-normal leading-snug mb-3 group-hover:text-[#b5a898] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-black/70 leading-relaxed font-light">
                      {item.summary}
                    </p>
                  </div>
                </div>

                <div className="p-6 md:p-8 pt-0">
                  <Link
                    href={item.url}
                    className="inline-block text-xs tracking-[0.16em] uppercase font-semibold text-black border-b border-black/30 pb-0.5 group-hover:border-black"
                  >
                    Leer nota completa →
                  </Link>
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
