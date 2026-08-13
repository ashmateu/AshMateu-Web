"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import GsapReveal from "@/components/animations/GsapReveal";

export default function ServicesPillars() {
  const pillars = [
    {
      number: "01",
      category: "Personas & Novias",
      title: "Dress to Kill",
      subtitle: "Construcción de imagen para ocasiones irrepetibles",
      items: [
        { label: "Styling para Novias:", text: "‘Que nunca nadie olvide tu vestido.’ Elección de diseñador, pruebas y asesoramiento integral." },
        { label: "Consultoría en Imagen:", text: "En busca de seguridad, presencia y fondo de armario estratégico." },
        { label: "Alfombras Rojas & Galas:", text: "Styling con impacto fotográfico y mediático garantizado." },
        { label: "Fiestas & Eventos:", text: "Para quienes quieren vestir para matar." },
      ],
      link: "/como-trabajo#personas",
      cta: "Conocer Dress to Kill",
    },
    {
      number: "02",
      category: "Empresas & Marcas",
      title: "Styling & Producciones",
      subtitle: "Dirección de arte y styling de moda internacional",
      items: [
        { label: "Campañas y Contenidos:", text: "Dirección de producciones en Buenos Aires, Nueva York y París." },
        { label: "Styling Editorial & Publicitario:", text: "Construcción de looks de alto impacto para cine, TV, streaming, revistas y marcas globales." },
        { label: "Curaduría de Diseño:", text: "ADN estético, selección de producto y narrativa de colección." },
      ],
      link: "/como-trabajo#marcas",
      cta: "Ver Producciones & Marcas",
    },
    {
      number: "03",
      category: "Estrategia & Speaker",
      title: "Consultoría & Speaker",
      subtitle: "Innovación, macrotendencias y posicionamiento",
      items: [
        { label: "Branding y Posicionamiento:", text: "Estrategia de innovación comercial, marketing de moda y comunicación." },
        { label: "Speaker Especializada:", text: "Conferencias sobre tendencias globales, nuevos negocios del lujo y sociología del consumidor." },
      ],
      link: "/como-trabajo#consultoria",
      cta: "Agendar Consultoría o Keynote",
    },
  ];

  return (
    <section id="servicios" className="py-16 md:py-20 lg:py-24 bg-white border-b border-[#b5a898]/30">
      <div className="max-w-[1300px] mx-auto px-6 md:px-12">
        {/* SECTION HEADER */}
        <GsapReveal className="max-w-2xl mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 border border-[#b5a898]/40 bg-[#f7f3ee] px-3 py-1 rounded-full text-[9px] tracking-[0.26em] uppercase text-[#7a7065] mb-2.5 font-medium">
            <span>02 · Modalidades de Trabajo</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-[42px] font-normal text-black tracking-tight">
            ¿Cómo Trabajo?
          </h2>
          <p className="text-xs sm:text-[13px] text-black/70 font-light mt-2.5 leading-relaxed">
            Tres pilares especializados diseñados para potenciar la presencia de personas, la relevancia de marcas y la visión estratégica de empresas.
          </p>
        </GsapReveal>

        {/* 3 PILLARS WITH DOUBLE BEZEL & HAPTIC CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {pillars.map((pillar, idx) => (
            <GsapReveal
              key={pillar.number}
              delay={idx * 0.06}
              className="group flex flex-col justify-between p-6 md:p-8 border border-[#b5a898]/35 bg-[#FAF7F2] hover:bg-white hover:border-black hover:shadow-lg transition-all duration-500 rounded-none relative"
            >
              <div>
                {/* CARD HEADER */}
                <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-[#b5a898]/25">
                  <span className="text-[9.5px] tracking-[0.24em] uppercase text-[#b5a898] font-semibold">
                    Pilar {pillar.number}
                  </span>
                  <span className="text-[8.5px] tracking-[0.18em] uppercase text-[#7a7065] bg-white px-2.5 py-0.5 border border-[#b5a898]/30 font-medium">
                    {pillar.category}
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl text-black font-normal mb-1.5 group-hover:text-[#b5a898] transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[#7a7065] italic mb-5 font-light">
                  {pillar.subtitle}
                </p>

                {/* ITEMS */}
                <div className="space-y-3 mb-8 text-xs md:text-[12.5px] leading-relaxed text-black/80 font-light">
                  {pillar.items.map((item, i) => (
                    <div key={i} className="pl-3 border-l-2 border-[#b5a898]/40">
                      <strong className="text-black font-medium block text-xs">
                        {item.label}
                      </strong>
                      <span className="text-black/70">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* BUTTON-IN-BUTTON NESTED CTA */}
              <Link
                href={pillar.link}
                className="group/btn inline-flex items-center justify-between gap-3 bg-black hover:bg-[#b5a898] text-white hover:text-black pl-4 pr-1.5 py-2 rounded-full text-[11px] tracking-[0.16em] uppercase font-semibold transition-all duration-300 active:scale-[0.98] shadow-xs w-full"
              >
                <span>{pillar.cta}</span>
                <div className="w-5.5 h-5.5 rounded-full bg-white/20 group-hover/btn:bg-black group-hover/btn:text-white text-white flex items-center justify-center transition-all duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">
                  <ArrowUpRight size={12} strokeWidth={2.2} />
                </div>
              </Link>
            </GsapReveal>
          ))}
        </div>

        {/* DIFERENCIAL BANNER */}
        <GsapReveal delay={0.2} className="mt-12 p-8 md:p-10 bg-[#0a0a0a] text-white border border-white/10 shadow-xl relative overflow-hidden text-center">
          <span className="text-[9.5px] tracking-[0.28em] uppercase text-[#b5a898] font-medium block mb-2.5">
            El Diferencial de Ash Mateu
          </span>
          <p className="font-serif text-xl sm:text-2xl md:text-3xl text-white font-normal leading-snug mb-4 max-w-xl mx-auto">
            ‘Estrategias de precisión, creatividad y recordación.’
          </p>
          <p className="text-xs text-white/70 max-w-lg mx-auto font-light leading-relaxed mb-6">
            Más de dos décadas articulando el lenguaje de la alta costura con objetivos de posicionamiento comercial medible.
          </p>
          <Link
            href="/como-trabajo"
            className="group inline-flex items-center gap-2.5 bg-[#b5a898] hover:bg-white text-black pl-5 pr-1.5 py-2.5 rounded-full text-[11px] tracking-[0.2em] uppercase font-semibold transition-all duration-300 active:scale-[0.98] shadow-md"
          >
            <span>Ver Modalidades &amp; Tarifario</span>
            <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight size={13} strokeWidth={2.2} />
            </div>
          </Link>
        </GsapReveal>
      </div>
    </section>
  );
}
