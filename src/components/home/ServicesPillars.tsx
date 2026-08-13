"use client";

import React from "react";
import Link from "next/link";
import GsapReveal from "@/components/animations/GsapReveal";

export default function ServicesPillars() {
  const pillars = [
    {
      number: "01",
      category: "Personas · Dress to Kill",
      title: "Dress to Kill",
      items: [
        { label: "Styling para novias:", text: "Que nunca nadie olvide tu vestido." },
        { label: "Consultoría en Imagen:", text: "En busca de seguridad e identidad." },
        { label: "Alfombras rojas & galas:", text: "Un ojo experto y detallista para ocasiones únicas." },
        { label: "Fiestas & eventos:", text: "Para quienes quieren vestir para matar." },
      ],
      link: "/como-trabajo#personas",
      cta: "Conocer Dress to Kill →",
    },
    {
      number: "02",
      category: "Empresas & Marcas",
      title: "Styling & Producciones",
      items: [
        { label: "Campañas y contenidos:", text: "Dirección de producciones en Buenos Aires, Nueva York y París." },
        { label: "Styling editorial & publicitario:", text: "Construcción de looks de alto impacto para cine, TV, revistas y marcas globales." },
        { label: "Curaduría de diseño y producto:", text: "Concepto, estética y narrativa de colección." },
      ],
      link: "/como-trabajo#marcas",
      cta: "Ver producciones & marcas →",
    },
    {
      number: "03",
      category: "Consultoría & Conferencias",
      title: "Consultoría & Speaker",
      items: [
        { label: "Branding y posicionamiento:", text: "Estrategia de innovación, marketing y comunicación." },
        { label: "Speaker especializada:", text: "Análisis de nuevas oportunidades de mercado, estudios de tendencias mundiales con bajadas locales, y sociología del comportamiento del consumidor." },
      ],
      link: "/como-trabajo#consultoria",
      cta: "Agendar consultoría o charla →",
    },
  ];

  return (
    <section id="servicios" className="py-24 md:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <GsapReveal className="mb-16 md:mb-20">
          <p className="text-[11px] tracking-[0.28em] uppercase text-[#7a7065] font-medium mb-3">
            Servicios para los que me podés contratar
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-normal text-[#0a0a0a] tracking-tight">
            ¿Cómo Trabajo?
          </h2>
        </GsapReveal>

        {/* 3 PILLARS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => (
            <GsapReveal
              key={pillar.number}
              delay={idx * 0.1}
              className="flex flex-col justify-between p-8 md:p-10 border border-[#b5a898]/30 bg-[#f7f3ee]/40 hover:bg-white hover:border-black hover:shadow-xl transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] tracking-[0.24em] uppercase text-[#b5a898] font-medium">
                    {pillar.number} · {pillar.category}
                  </span>
                </div>
                <h3 className="font-serif text-2xl md:text-3xl text-black font-normal mb-6">
                  {pillar.title}
                </h3>
                <div className="space-y-3 mb-8 text-xs md:text-[13.5px] leading-relaxed text-black/80">
                  {pillar.items.map((item, i) => (
                    <p key={i}>
                      <strong className="text-black font-medium">{item.label} </strong>
                      <span className="text-black/70">{item.text}</span>
                    </p>
                  ))}
                </div>
              </div>

              <Link
                href={pillar.link}
                className="inline-flex items-center text-xs tracking-[0.18em] uppercase font-semibold text-black hover:text-[#b5a898] transition-colors border-b border-black/30 hover:border-[#b5a898] pb-1 w-fit"
              >
                {pillar.cta}
              </Link>
            </GsapReveal>
          ))}
        </div>

        {/* DIFERENCIAL BANNER (SLIDE 9) */}
        <GsapReveal delay={0.3} className="mt-16 p-8 md:p-12 bg-[#f7f3ee] border border-[#b5a898]/30 text-center">
          <p className="text-[10px] tracking-[0.24em] uppercase text-[#7a7065] font-medium mb-3">
            Mi diferencial
          </p>
          <p className="font-serif text-2xl md:text-4xl text-black font-normal leading-snug mb-6 max-w-2xl mx-auto">
            ‘Estrategias de precisión, creatividad y recordación.’
          </p>
          <Link
            href="/como-trabajo"
            className="inline-block px-8 py-4 bg-black text-white text-xs tracking-[0.2em] uppercase font-medium hover:bg-[#b5a898] hover:text-black transition-colors"
          >
            Ver detalle de modalidades &amp; tarifario →
          </Link>
        </GsapReveal>
      </div>
    </section>
  );
}
