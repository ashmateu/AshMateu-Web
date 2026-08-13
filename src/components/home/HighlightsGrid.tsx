"use client";

import React from "react";
import GsapReveal from "@/components/animations/GsapReveal";
import { Sparkles, Pin } from "lucide-react";

interface HighlightNote {
  number: string;
  label?: string;
  tag: string;
  text: string;
  badge?: string;
  tags?: string[];
  className?: string;
  paperBg: string;
  borderColor: string;
  tapeColor?: string;
  tilt: string;
  tapePosition?: "center" | "left" | "right" | "clip";
}

const highlightsNotes: HighlightNote[] = [
  {
    number: "19",
    label: "Años",
    tag: "Debut Editorial",
    text: "La edad en la que empecé a dirigir producciones editoriales en Editorial Perfil.",
    className: "lg:col-span-1",
    paperBg: "bg-[#FFF2EB]", // Warm peach
    borderColor: "border-[#F5D5C4]",
    tapeColor: "bg-[#F7D8C0]/85 border-[#E6BF9E]/60",
    tilt: "rotate-[-1.2deg]",
    tapePosition: "center",
  },
  {
    number: "Sept 2010",
    label: "New York",
    tag: "NYFW",
    text: "La primera vez que viajo a cubrir el New York Fashion Week desde el front row.",
    className: "lg:col-span-1",
    paperBg: "bg-[#EDF5FD]", // Soft sky blue
    borderColor: "border-[#D0E3F7]",
    tapeColor: "bg-[#D6E6F7]/85 border-[#B5D3F2]/60",
    tilt: "rotate-[1.4deg]",
    tapePosition: "right",
  },
  {
    number: "+150k",
    label: "Insiders",
    tag: "Inside Studios",
    badge: "Exit 2025",
    text: "Comunidad de Insiders en la escuela de moda online que fundé en 2015 y vendí en su totalidad en 2025.",
    className: "md:col-span-2 lg:col-span-2",
    paperBg: "bg-[#FAF7F0]", // Handmade ivory deckle
    borderColor: "border-[#E4DBC8]",
    tapeColor: "bg-[#EAE0CD]/85 border-[#D4C4A9]/60",
    tilt: "rotate-[-0.6deg]",
    tapePosition: "clip",
  },
  {
    number: "The Rolling Stones",
    tag: "Campaña Global",
    badge: "Chandon",
    text: "La colaboración histórica que cambió la escala de los proyectos que me llegaban.",
    className: "lg:col-span-1",
    paperBg: "bg-[#FDF0F4]", // Pastel blush pink
    borderColor: "border-[#F7D2DE]",
    tapeColor: "bg-[#F9D6E2]/85 border-[#EBB6C7]/60",
    tilt: "rotate-[1.1deg]",
    tapePosition: "center",
  },
  {
    number: "4 Portadas",
    label: "Simultáneas",
    tag: "+150 Tapas",
    text: "Cuatro tapas simultáneas en puestos de revistas y más de 150 portadas en 20 años de carrera.",
    className: "lg:col-span-1",
    paperBg: "bg-[#FEFAE8]", // Butter sticky note
    borderColor: "border-[#F7EEBE]",
    tapeColor: "bg-[#F9EFBE]/85 border-[#E8D98C]/60",
    tilt: "rotate-[-1.5deg]",
    tapePosition: "left",
  },
  {
    number: "Red Carpets",
    tag: "Celebrity Styling",
    text: "Styling exclusivo para cine, festivales y galas internacionales.",
    tags: [
      "Dolores Fonzi",
      "Griselda Siciliani",
      "Valentina Zenere",
      "Delfi Chaves",
      "Gimena Accardi",
    ],
    className: "md:col-span-2 lg:col-span-2",
    paperBg: "bg-[#EFF7F2]", // Soft sage mint
    borderColor: "border-[#D1E8DA]",
    tapeColor: "bg-[#D6EBE0]/85 border-[#B3D6C1]/60",
    tilt: "rotate-[0.8deg]",
    tapePosition: "center",
  },
  {
    number: "Global",
    label: "5 Ciudades",
    tag: "Internacional",
    text: "Ciudades donde viví, trabajé o estudié producciones y tendencias.",
    tags: ["Buenos Aires", "Nueva York", "París", "Londres", "Dubái"],
    className: "md:col-span-2 lg:col-span-2",
    paperBg: "bg-[#F5F0FB]", // Lavender pastel note
    borderColor: "border-[#E1D4F4]",
    tapeColor: "bg-[#E5D7F7]/85 border-[#C9B1E8]/60",
    tilt: "rotate-[-1.1deg]",
    tapePosition: "right",
  },
  {
    number: "Saint Martins",
    label: "+ Marangoni",
    tag: "Londres · Milán",
    text: "Volví a estudiar después de años de profesión porque el mundo cambió tanto que sentí empezar de cero.",
    className: "lg:col-span-1",
    paperBg: "bg-[#F0F8F5]", // Seafoam mint
    borderColor: "border-[#D2EAE1]",
    tapeColor: "bg-[#D5EDE3]/85 border-[#B1D8C9]/60",
    tilt: "rotate-[1.3deg]",
    tapePosition: "left",
  },
  {
    number: "2 Martín Fierro",
    label: "de la Moda",
    tag: "Premios 2019",
    text: "Dos nominaciones a los Martín Fierro de la Moda (Mejor Influencer & Mejor Tapa de Revista).",
    className: "lg:col-span-1",
    paperBg: "bg-[#FFF5EB]", // Soft apricot
    borderColor: "border-[#FADFC5]",
    tapeColor: "bg-[#FCE1CA]/85 border-[#ECC39F]/60",
    tilt: "rotate-[-0.9deg]",
    tapePosition: "center",
  },
  {
    number: "Talento UP",
    label: "Orgullo 2022",
    tag: "Universidad de Palermo",
    text: "Reconocimiento otorgado por la Universidad de Palermo por trayectoria profesional destacada.",
    className: "lg:col-span-1",
    paperBg: "bg-[#F2F4FD]", // Cloud blue
    borderColor: "border-[#D6DCF7]",
    tapeColor: "bg-[#D8DFF9]/85 border-[#BAC5F0]/60",
    tilt: "rotate-[1.2deg]",
    tapePosition: "right",
  },
  {
    number: "20 Años",
    label: "de Carrera",
    tag: "Visión & Trayectoria",
    badge: "2006 — 2026",
    text: "Moda, comunicación, estrategia, empresas, educación, tendencias, portadas, aviones, noches sin dormir pero bolsos nuevos, Excel y bastantes cambios de opinión.",
    className: "md:col-span-2 lg:col-span-4",
    paperBg: "bg-[#FAF5ED]", // Atelier master parchment
    borderColor: "border-[#E7DEC9]",
    tapeColor: "bg-[#E9DFCA]/85 border-[#D2C2A1]/60",
    tilt: "rotate-[-0.4deg]",
    tapePosition: "clip",
  },
];

export default function HighlightsGrid() {
  return (
    <section
      id="highlights"
      className="py-24 md:py-32 bg-[#F3EFEA] border-y border-[#b5a898]/30 relative overflow-hidden"
    >
      {/* SUBTLE MOODBOARD BACKGROUND TEXTURE & AMBIENCE */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        {/* SECTION HEADER */}
        <GsapReveal className="max-w-2xl mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 border border-[#b5a898]/50 bg-white/70 backdrop-blur-sm px-3.5 py-1 rounded-full text-[10px] tracking-[0.26em] uppercase text-[#7a7065] font-medium mb-3 shadow-xs">
            <Pin size={11} className="text-[#c9a84c]" />
            <span>01 · Hitos &amp; Moodboard Editorial</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-black tracking-tight">
            Highlights de Carrera
          </h2>
          <p className="text-xs md:text-sm text-black/75 font-light mt-3 leading-relaxed">
            Veinte años de dirección creativa, semanas de la moda globales y producciones icónicas ordenadas como notas de atelier.
          </p>
        </GsapReveal>

        {/* COLORFUL EDITORIAL PAPER NOTES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 md:gap-8 pt-3">
          {highlightsNotes.map((item, idx) => (
            <GsapReveal
              key={idx}
              delay={idx * 0.03}
              className={`group relative flex flex-col justify-between p-7 md:p-8 rounded-[3px] border ${item.paperBg} ${item.borderColor} shadow-[0_12px_28px_-6px_rgba(0,0,0,0.08),0_3px_8px_-2px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_35px_-8px_rgba(0,0,0,0.14)] ${item.tilt} hover:rotate-0 hover:z-20 ${
                item.className || ""
              }`}
            >
              {/* REALISTIC WASHI TAPE / GOLD CLIP */}
              {item.tapePosition === "clip" ? (
                /* LUXURY GOLD METALLIC PAPER CLIP */
                <div
                  className="absolute -top-3.5 left-7 w-6 h-10 rounded-full border-2 border-[#c9a84c] bg-transparent shadow-sm pointer-events-none opacity-90 transition-transform group-hover:scale-105"
                  style={{
                    boxShadow: "1px 2px 4px rgba(0,0,0,0.15)",
                  }}
                />
              ) : (
                /* TRANSLUCENT WASHI TAPE STRIP */
                <div
                  className={`absolute -top-3 w-16 h-4 rounded-[1px] border backdrop-blur-[1px] shadow-xs pointer-events-none transition-transform group-hover:rotate-0 ${
                    item.tapeColor
                  } ${
                    item.tapePosition === "left"
                      ? "left-6 rotate-[-2deg]"
                      : item.tapePosition === "right"
                      ? "right-6 rotate-[3deg]"
                      : "left-1/2 -translate-x-1/2 rotate-[-1deg]"
                  }`}
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255,255,255,0.4) 4px, rgba(255,255,255,0.4) 8px)",
                  }}
                />
              )}

              {/* CARD TOP INFO */}
              <div>
                {/* TAG & BADGE */}
                <div className="flex items-center justify-between gap-2 mb-4 pb-2 border-b border-black/8">
                  <span className="text-[9.5px] tracking-[0.22em] uppercase text-black/60 font-semibold">
                    № {String(idx + 1).padStart(2, "0")} · {item.tag}
                  </span>
                  {item.badge && (
                    <span className="bg-black text-white text-[8.5px] tracking-[0.16em] uppercase px-2.5 py-0.5 rounded-[2px] font-semibold shadow-xs">
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* NUMBER / TITLE */}
                <div className="mb-3">
                  <span className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#121212] font-normal leading-tight block tracking-tight">
                    {item.number}
                  </span>
                  {item.label && (
                    <span className="text-[11px] tracking-[0.18em] uppercase text-black/60 font-medium block mt-1">
                      {item.label}
                    </span>
                  )}
                </div>

                {/* TEXT (ULTRA CRISP & LEGIBLE) */}
                <p className="text-[12.5px] md:text-[13px] leading-relaxed text-[#1a1a1a]/85 font-light">
                  {item.text}
                </p>
              </div>

              {/* PILL CHIPS FOR CITIES / CELEBRITIES */}
              {item.tags && (
                <div className="flex flex-wrap gap-1.5 mt-6 pt-4 border-t border-black/10">
                  {item.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[9px] tracking-[0.14em] uppercase bg-white/80 text-black/85 px-2.5 py-1 rounded-[2px] border border-black/10 font-medium shadow-xs"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </GsapReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
