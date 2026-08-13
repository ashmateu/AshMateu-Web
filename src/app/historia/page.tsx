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
  return (
    <div className="pt-28 md:pt-36 bg-[#f7f3ee]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-20">
        <p className="text-[11px] tracking-[0.28em] uppercase text-[#7a7065] font-medium mb-3">
          Biografía &amp; Trayectoria
        </p>
        <h1 className="font-serif text-4xl md:text-6xl text-black font-normal mb-16">
          Mi Historia
        </h1>

        {/* BIO CONTENT WITH MARIE CLAIRE PORTRAITS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
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

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] bg-neutral-200 overflow-hidden shadow-lg border border-[#b5a898]/30">
              <Image
                src="/images/hero_studio/MARIECLAIRE_2608064304_web.webp"
                alt="Ash Mateu Marie Claire Studio"
                fill
                sizes="(max-width: 768px) 100vw, 30vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[3/4] bg-neutral-200 overflow-hidden shadow-lg border border-[#b5a898]/30 sm:translate-y-8">
              <Image
                src="/images/hero_studio/MARIECLAIRE_2608064351_web.webp"
                alt="Ash Mateu Editorial Portrait"
                fill
                sizes="(max-width: 768px) 100vw, 30vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* HIGHLIGHTS SECTION */}
      <HighlightsGrid />

      <ContactForm />
    </div>
  );
}
