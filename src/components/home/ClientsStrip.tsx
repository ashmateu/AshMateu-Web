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
    className: "max-h-7 sm:max-h-8 max-w-[88px] sm:max-w-[98px]",
  },
  {
    name: "Louis Vuitton",
    src: "/images/brands/louis_vuitton.webp",
    width: 245,
    height: 295,
    className: "max-h-8 sm:max-h-9 max-w-[80px] sm:max-w-[90px]",
  },
  {
    name: "Gucci",
    src: "/images/brands/gucci.webp",
    width: 403,
    height: 67,
    className: "max-h-4 sm:max-h-5 max-w-[100px] sm:max-w-[115px]",
  },
  {
    name: "Miu Miu",
    src: "/images/brands/miu_miu.webp",
    width: 387,
    height: 64,
    className: "max-h-4.5 sm:max-h-5 max-w-[105px] sm:max-w-[120px]",
  },
  {
    name: "Dolce & Gabbana",
    src: "/images/brands/dolce_gabbana.webp",
    width: 403,
    height: 47,
    className: "max-h-3.5 sm:max-h-4.5 max-w-[120px] sm:max-w-[135px]",
  },
  {
    name: "Marie Claire",
    src: "/images/brands/marie_claire.webp",
    width: 403,
    height: 61,
    className: "max-h-5 sm:max-h-6 max-w-[110px] sm:max-w-[125px]",
  },
  {
    name: "Nike",
    src: "/images/brands/nike.webp",
    width: 403,
    height: 143,
    className: "max-h-5 sm:max-h-6 max-w-[65px] sm:max-w-[75px]",
  },
  {
    name: "L'Oréal Paris",
    src: "/images/brands/loreal.webp",
    width: 403,
    height: 76,
    className: "max-h-4 sm:max-h-5 max-w-[105px] sm:max-w-[118px]",
  },
  {
    name: "Mercedes-Benz",
    src: "/images/brands/mercedes_benz.webp",
    width: 403,
    height: 404,
    className: "max-h-7 sm:max-h-8 max-w-[65px] sm:max-w-[75px]",
  },
  {
    name: "Netflix",
    src: "/images/brands/netflix.webp",
    width: 403,
    height: 112,
    className: "max-h-4.5 sm:max-h-5.5 max-w-[90px] sm:max-w-[105px]",
  },
];

export default function ClientsStrip() {
  return (
    <section className="py-20 md:py-24 bg-[#f7f3ee] border-b border-[#b5a898]/30 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
        <GsapReveal>
          {/* SECTION PILL BADGE */}
          <div className="inline-flex items-center gap-2 border border-[#b5a898]/40 bg-white/80 backdrop-blur-sm px-3.5 py-1 rounded-full text-[9px] tracking-[0.28em] uppercase text-[#7a7065] font-semibold mb-12 shadow-xs">
            <span>Marcas &amp; Publicaciones Seleccionadas</span>
          </div>

          {/* OPTICALLY NORMALIZED BRAND ISOLOGOS GRID */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-12">
            {brandLogos.map((brand) => (
              <div
                key={brand.name}
                className="group w-28 sm:w-32 md:w-36 h-12 sm:h-14 flex items-center justify-center p-2 transition-transform duration-300 hover:scale-105 select-none"
                title={brand.name}
              >
                <Image
                  src={brand.src}
                  alt={`${brand.name} logo`}
                  width={brand.width}
                  height={brand.height}
                  className={`${brand.className} w-auto h-auto object-contain opacity-65 group-hover:opacity-100 transition-opacity duration-300`}
                />
              </div>
            ))}
          </div>
        </GsapReveal>
      </div>
    </section>
  );
}
