"use client";

import React from "react";
import Image from "next/image";
import GsapReveal from "@/components/animations/GsapReveal";

interface BrandItem {
  name: string;
  src: string;
  width: number;
  height: number;
  className: string;
}

const brandLogos: BrandItem[] = [
  {
    name: "Chanel",
    src: "/images/brands/chanel.webp",
    width: 155,
    height: 101,
    className: "h-7 sm:h-8 md:h-9 max-w-[95px] sm:max-w-[110px]",
  },
  {
    name: "Louis Vuitton",
    src: "/images/brands/louis_vuitton.webp",
    width: 245,
    height: 295,
    className: "h-8 sm:h-9 md:h-10 max-w-[85px] sm:max-w-[100px]",
  },
  {
    name: "Gucci",
    src: "/images/brands/gucci.webp",
    width: 403,
    height: 67,
    className: "h-4 sm:h-4.5 md:h-5 max-w-[110px] sm:max-w-[130px]",
  },
  {
    name: "Miu Miu",
    src: "/images/brands/miu_miu.webp",
    width: 387,
    height: 64,
    className: "h-4.5 sm:h-5 md:h-5.5 max-w-[115px] sm:max-w-[135px]",
  },
  {
    name: "Dolce & Gabbana",
    src: "/images/brands/dolce_gabbana.webp",
    width: 420,
    height: 35,
    className: "h-3.5 sm:h-4 md:h-4.5 max-w-[125px] sm:max-w-[145px]",
  },
  {
    name: "Marie Claire",
    src: "/images/brands/marie_claire.webp",
    width: 403,
    height: 61,
    className: "h-4.5 sm:h-5 md:h-6 max-w-[120px] sm:max-w-[140px]",
  },
  {
    name: "Nike",
    src: "/images/brands/nike.webp",
    width: 403,
    height: 143,
    className: "h-5 sm:h-6 md:h-6.5 max-w-[75px] sm:max-w-[85px]",
  },
  {
    name: "L'Oréal Paris",
    src: "/images/brands/loreal.webp",
    width: 403,
    height: 76,
    className: "h-4 sm:h-4.5 md:h-5 max-w-[110px] sm:max-w-[130px]",
  },
  {
    name: "Mercedes-Benz",
    src: "/images/brands/mercedes_benz.webp",
    width: 403,
    height: 404,
    className: "h-7 sm:h-8 md:h-9 max-w-[75px] sm:max-w-[85px]",
  },
  {
    name: "Netflix",
    src: "/images/brands/netflix.webp",
    width: 403,
    height: 112,
    className: "h-4.5 sm:h-5 md:h-5.5 max-w-[100px] sm:max-w-[120px]",
  },
];

export default function ClientsStrip() {
  return (
    <section className="py-20 md:py-28 bg-[#f7f3ee] border-b border-[#b5a898]/30 overflow-hidden relative">
      <div className="max-w-[1320px] mx-auto px-6 md:px-12 text-center">
        <GsapReveal>
          {/* BADGE EDITORIAL */}
          <div className="inline-flex items-center gap-2.5 border border-[#b5a898]/40 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[9.5px] font-mono tracking-[0.28em] uppercase text-[#7a6a5a] font-medium mb-14 md:mb-16 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0a0a0a]" />
            <span>Marcas &amp; Publicaciones Seleccionadas</span>
          </div>

          {/* GRILLA EDITORIAL CALIBRADA 5x2 (5 EN FILA 1, 5 EN FILA 2) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center justify-items-center">
            {brandLogos.map((brand, idx) => (
              <div
                key={brand.name}
                className="w-full h-16 sm:h-20 flex items-center justify-center px-4 py-3 transition-all duration-300 group hover:-translate-y-0.5 select-none"
                title={brand.name}
              >
                <Image
                  src={brand.src}
                  alt={`${brand.name} logo`}
                  width={brand.width}
                  height={brand.height}
                  className={`${brand.className} w-auto object-contain opacity-60 group-hover:opacity-100 transition-all duration-300`}
                />
              </div>
            ))}
          </div>
        </GsapReveal>
      </div>
    </section>
  );
}
