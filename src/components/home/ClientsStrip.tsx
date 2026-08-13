"use client";

import React from "react";
import GsapReveal from "@/components/animations/GsapReveal";

export default function ClientsStrip() {
  const clients = [
    "Chanel",
    "Louis Vuitton",
    "Miu Miu",
    "Dolce & Gabbana",
    "Gucci",
    "Marie Claire",
    "Nike",
    "L'Oréal",
    "Mercedes-Benz",
    "Netflix",
  ];

  return (
    <section className="py-20 bg-[#f7f3ee] border-b border-[#b5a898]/20 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
        <GsapReveal>
          <p className="text-[10px] tracking-[0.28em] uppercase text-[#7a7065] font-medium mb-8">
            Marcas &amp; Publicaciones Seleccionadas
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 font-serif text-xl md:text-2xl text-black/75 tracking-wider">
            {clients.map((client) => (
              <span
                key={client}
                className="hover:text-black transition-colors select-none"
              >
                {client}
              </span>
            ))}
          </div>
        </GsapReveal>
      </div>
    </section>
  );
}
