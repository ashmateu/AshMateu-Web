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
    <section className="py-20 bg-[#f7f3ee] border-b border-[#b5a898]/30 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
        <GsapReveal>
          <div className="inline-flex items-center gap-2 border border-[#b5a898]/40 bg-white px-3 py-1 rounded-full text-[9px] tracking-[0.28em] uppercase text-[#7a7065] font-semibold mb-10">
            <span>Marcas &amp; Publicaciones Seleccionadas</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 md:gap-14 font-serif text-lg sm:text-xl md:text-2xl text-black/70 tracking-widest uppercase">
            {clients.map((client, idx) => (
              <React.Fragment key={client}>
                <span className="hover:text-black hover:scale-105 transition-all duration-300 select-none cursor-default">
                  {client}
                </span>
                {idx < clients.length - 1 && (
                  <span className="text-[#b5a898]/60 text-xs hidden sm:inline select-none">
                    ◆
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        </GsapReveal>
      </div>
    </section>
  );
}
