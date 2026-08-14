import React from "react";
import Image from "next/image";
import HighlightsGrid from "@/components/home/HighlightsGrid";
import GsapReveal from "@/components/animations/GsapReveal";
import ContactForm from "@/components/contact/ContactForm";

export const metadata = {
  title: "Mi Historia — Ash Mateu",
  description:
    "Bio, trayectoria y visión de Ash Mateu Prieto, Directora Creativa y Consultora de Moda.",
};

export default function HistoriaPage() {
  const visualMoments = [
    {
      title: "Dirección de Set & Estudio Chanel",
      subtitle: "Curaduría de siluetas, iluminación y tomas con cámara Canon 5D Mark IV",
      location: "Estudio Editorial",
      src: "/images/catalog/01_chanel_alta_costura_studio/_E8A9273.jpg",
      aspect: "aspect-[3/4]",
      colSpan: "md:col-span-6 lg:col-span-4",
      objectPosition: "object-[center_top]",
    },
    {
      title: "Backstage & Fittings en París",
      subtitle: "Preparación de estilismos y pruebas previas a desfiles en Fashion Week",
      location: "París, Francia",
      src: "/images/catalog/03_fashion_week_paris_canon/4A2A4232.JPEG",
      aspect: "aspect-[3/4]",
      colSpan: "md:col-span-6 lg:col-span-4",
      objectPosition: "object-[center_top]",
    },
    {
      title: "Detrás de Escena & Camarines",
      subtitle: "Montaje de looks, peinado, maquillaje y ajustes finales en tiempo real",
      location: "Backstage",
      src: "/images/catalog/07_backstage_streetstyle_social/5D65B19A-8BA5-4EE7-BB44-B017D4518A86.JPG",
      aspect: "aspect-[3/4]",
      colSpan: "md:col-span-6 lg:col-span-4",
      objectPosition: "object-[center_top]",
    },
    {
      title: "Atelier & Fittings de Alta Costura",
      subtitle: "Dress to Kill: Pruebas de vestuario personalizadas, bordados y caídas",
      location: "Atelier Privado",
      src: "/images/catalog/06_novias_dress_to_kill_fittings/10FC7C4D-46E5-4E08-A279-F765448AEF47.JPG",
      aspect: "aspect-[4/5]",
      colSpan: "md:col-span-6 lg:col-span-6",
      objectPosition: "object-[center_top]",
    },
    {
      title: "Cobertura en Vivo & Fotografía",
      subtitle: "Captura de street style y momentos de pasarela en Fashion Week",
      location: "Semana de la Moda",
      src: "/images/catalog/03_fashion_week_paris_canon/20240209_123533.JPEG",
      aspect: "aspect-[4/5]",
      colSpan: "md:col-span-6 lg:col-span-6",
      objectPosition: "object-[center_top]",
    },
    {
      title: "Set de Luces & Pruebas de Cámara",
      subtitle: "Tomas de alta resolución y calibración de contrastes en estudio",
      location: "Set Fotográfico",
      src: "/images/catalog/01_chanel_alta_costura_studio/_E8A9245.jpg",
      aspect: "aspect-[3/4]",
      colSpan: "md:col-span-6 lg:col-span-4",
      objectPosition: "object-[center_top]",
    },
    {
      title: "Producción de Moda & Backstage Social",
      subtitle: "Dinámica en set con equipos creativos, modelos y estilistas",
      location: "Producción Editorial",
      src: "/images/catalog/07_backstage_streetstyle_social/90339CAC-4406-4A23-84E6-987F38D6FB4D.JPG",
      aspect: "aspect-[3/4]",
      colSpan: "md:col-span-6 lg:col-span-4",
      objectPosition: "object-[center_top]",
    },
    {
      title: "Inside Studios & Masterclasses",
      subtitle: "Enseñando el detrás de escena de la industria de la moda (+150k Insiders)",
      location: "Masterclasses & Workshops",
      src: "/images/catalog/07_backstage_streetstyle_social/20220402_104713.jpg",
      aspect: "aspect-[3/4]",
      colSpan: "md:col-span-6 lg:col-span-4",
      objectPosition: "object-[center_10%]",
    },
  ];

  return (
    <div className="pt-28 md:pt-36 bg-[#f7f3ee]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-16">
        <GsapReveal>
          <div className="inline-flex items-center gap-2 border border-[#b5a898]/40 bg-white px-3 py-1 rounded-full text-[9px] tracking-[0.26em] uppercase text-[#7a7065] mb-3 font-medium">
            <span>Biografía &amp; Trayectoria</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-black font-normal mb-12 md:mb-16">
            Mi Historia
          </h1>
        </GsapReveal>

        {/* BIO CONTENT CON FOTOGRAFÍA EDITORIAL PRINCIPAL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20 md:mb-28">
          <div className="lg:col-span-6 space-y-6 text-sm md:text-base leading-relaxed text-black/80 font-light">
            <p>
              Descendiente de españoles, nací en un barrio fundado por alemanes.
              Desde los seis años hasta la adolescencia fui gimnasta de alto
              rendimiento, y ahí aprendí casi todo lo que después me sirvió para
              trabajar: disciplina, convicción en los procesos y esa capacidad un
              poco absurda de repetir algo durante meses confiando en que
              eventualmente iba a salir.
            </p>
            <p>
              A los 19 años ya trabajaba en Editorial Perfil montando
              producciones de moda. Ese universo editorial terminó convirtiéndose
              en otra universidad y en una relación que todavía continúa: hoy
              trabajo en Marie Claire Argentina investigando, escribiendo y
              realizando coberturas internacionales de Fashion Weeks.
            </p>
            <p>
              Chanel, Louis Vuitton, Miu Miu, Dolce &amp; Gabbana, Gucci, Nike,
              L&apos;Oréal, Mercedes Benz. Tapa de Marie Claire Argentina más
              veces de las que recuerdo con exactitud. Styling para Dolores Fonzi,
              Griselda Siciliani, Valentina Zenere y buena parte del elenco de
              Netflix Argentina.
            </p>
            <p>
              En 2015 fundé Inside Studios, escuela de moda online que llegó a
              tener más de 150.000 Insiders en toda la región y que vendí en su
              totalidad en 2025.
            </p>
            <blockquote className="border-l-2 border-[#b5a898] pl-6 py-2 my-8 font-serif text-xl md:text-2xl text-black font-normal italic leading-snug">
              ‘Si tengo que encontrar un hilo entre todo esto, es bastante simple:
              me gusta leer. Leer personas, marcas, culturas, momentos, y
              transformar eso en una identidad, una estrategia o una idea que
              pueda salir al mundo.’
            </blockquote>
          </div>

          {/* RETRATOS EDITORIALES DE ALTA DEFINICIÓN */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="relative aspect-[3/4] bg-neutral-200 overflow-hidden shadow-xl border border-[#b5a898]/40 group">
              <Image
                src="/images/catalog/03_fashion_week_paris_canon/4A2A4418.JPEG"
                alt="Ash Mateu en París Fashion Week"
                fill
                sizes="(max-width: 768px) 100vw, 30vw"
                className="object-cover object-[center_top] transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-[10px] tracking-[0.2em] uppercase text-white font-medium">
                  París · Fashion Week
                </span>
              </div>
            </div>
            <div className="relative aspect-[3/4] bg-neutral-200 overflow-hidden shadow-xl border border-[#b5a898]/40 sm:translate-y-8 group">
              <Image
                src="/images/catalog/04_celebridades_galas_red_carpet/799ECE02-0FCE-471E-9522-93736499E55D.JPG"
                alt="Ash Mateu Red Carpet & Galas"
                fill
                sizes="(max-width: 768px) 100vw, 30vw"
                className="object-cover object-[center_top] transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-[10px] tracking-[0.2em] uppercase text-white font-medium">
                  Red Carpet &amp; Galas
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ARCHIVO VISUAL Y GALERÍA EDITORIAL DE ASH */}
        <div className="mt-20 md:mt-28 pt-16 border-t border-[#b5a898]/40">
          <GsapReveal className="max-w-2xl mb-12">
            <span className="text-[10px] tracking-[0.28em] uppercase text-[#7a7065] font-medium block mb-2">
              Archivo Visual
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-black font-normal">
              Momentos de Carrera &amp; Backstage
            </h2>
            <p className="text-xs sm:text-sm text-black/70 font-light mt-3 leading-relaxed">
              Registros visuales en Fashion Weeks internacionales, galas, fittings privados y dirección de arte en set.
            </p>
          </GsapReveal>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {visualMoments.map((item, idx) => (
              <GsapReveal
                key={item.title}
                delay={idx * 0.08}
                className={`${item.colSpan} group relative bg-white border border-[#b5a898]/30 overflow-hidden shadow-md flex flex-col justify-between`}
              >
                <div className={`relative w-full ${item.aspect} overflow-hidden bg-neutral-100`}>
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className={`object-cover ${item.objectPosition} transition-transform duration-700 group-hover:scale-105`}
                  />
                  <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] tracking-[0.2em] uppercase text-white font-medium">
                    {item.location}
                  </div>
                </div>
                <div className="p-5 bg-white border-t border-[#b5a898]/20">
                  <h3 className="font-serif text-lg text-black mb-1 group-hover:text-[#7a6a5a] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-black/60 font-light">
                    {item.subtitle}
                  </p>
                </div>
              </GsapReveal>
            ))}
          </div>
        </div>
      </div>

      {/* HIGHLIGHTS SECTION */}
      <HighlightsGrid />

      <ContactForm />
    </div>
  );
}
