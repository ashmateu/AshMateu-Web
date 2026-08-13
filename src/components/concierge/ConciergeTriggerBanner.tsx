"use client";

import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";

export default function ConciergeTriggerBanner() {
  const handleOpen = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-concierge"));
    }
  };

  return (
    <div className="mb-14 p-6 sm:p-8 bg-[#0A0A0A] text-white border border-[#B5A898]/40 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div className="relative z-10 max-w-2xl">
        <div className="inline-flex items-center gap-2 border border-white/20 bg-white/10 px-3 py-1 rounded-full text-[9px] tracking-[0.26em] uppercase text-[#B5A898] mb-3 font-medium">
          <Sparkles size={11} className="text-[#B5A898]" />
          <span>Creative Briefing Interactivo</span>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal leading-snug mb-2">
          Concierge Editorial VIP &amp; Asistente de Styling
        </h3>
        <p className="text-xs sm:text-[13px] text-white/70 font-light leading-relaxed">
          Definí el concepto de tu campaña, evento de novia o consultoría de marca en diálogo directo con nuestra IA curada con la metodología y experiencia de Ash Mateu.
        </p>
      </div>

      <button
        onClick={handleOpen}
        className="group inline-flex items-center gap-3 bg-[#B5A898] hover:bg-white text-black pl-5 pr-2.5 py-2.5 rounded-full text-[11px] tracking-[0.18em] uppercase font-semibold transition-all duration-300 active:scale-[0.98] shadow-md flex-shrink-0 cursor-pointer"
      >
        <span>Iniciar Briefing con IA</span>
        <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
          <ArrowRight size={13} strokeWidth={2.2} />
        </div>
      </button>
    </div>
  );
}
