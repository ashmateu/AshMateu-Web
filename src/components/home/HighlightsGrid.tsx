"use client";

import React from "react";
import { highlightsData } from "@/lib/data/highlights";
import GsapReveal from "@/components/animations/GsapReveal";

export default function HighlightsGrid() {
  return (
    <section id="highlights" className="py-24 md:py-32 bg-[#f7f3ee] border-y border-[#b5a898]/20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <GsapReveal className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <p className="text-[11px] tracking-[0.28em] uppercase text-[#7a7065] font-medium mb-3">
            Hitos &amp; Trayectoria
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-normal text-[#0a0a0a] tracking-tight">
            Highlights
          </h2>
        </GsapReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {highlightsData.map((item, idx) => (
            <GsapReveal
              key={item.id}
              delay={idx * 0.05}
              className={`flex flex-col justify-between p-8 transition-all duration-300 border ${
                item.featured
                  ? "md:col-span-2 bg-[#FAF7F2] border-[#b5a898] shadow-sm"
                  : "bg-white border-[#b5a898]/30 hover:border-black hover:shadow-lg"
              }`}
            >
              <div>
                <span className="font-serif text-2xl md:text-3xl text-black block mb-3 font-normal leading-tight">
                  {item.number}
                </span>
                <p className="text-xs md:text-[13.5px] leading-relaxed text-black/75">
                  {item.text}
                </p>
              </div>
            </GsapReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
