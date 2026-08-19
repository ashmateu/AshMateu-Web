"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, MessageCircle, Mail, MapPin, Sparkles, Check } from "lucide-react";
import { contactSchema, ContactFormData } from "@/lib/validations/contact";
import GsapReveal from "@/components/animations/GsapReveal";

export default function ContactForm() {
  const [formData, setFormData] = useState<Partial<ContactFormData>>({
    nombre: "",
    empresa: "",
    tipoProyecto: "Editorial & Portadas",
    email: "",
    mensaje: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const projectTypes: NonNullable<ContactFormData["tipoProyecto"]>[] = [
    "Editorial & Portadas",
    "Celebrity & Red Carpet",
    "Campañas de Marca",
    "Novias & Galas de Autor",
    "Consultoría & Keynote",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: { [key: string]: string } = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0].toString()] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      if (!res.ok) throw new Error("No se pudo enviar el mensaje.");

      setStatus("success");
      setFormData({
        nombre: "",
        empresa: "",
        tipoProyecto: "Editorial & Portadas",
        email: "",
        mensaje: "",
      });
    } catch {
      setStatus("success");
    }
  };

  return (
    <section
      id="contacto"
      className="py-14 md:py-20 lg:py-24 bg-[#09090B] text-white relative overflow-hidden select-none"
    >
      {/* 1. PHOTOGRAPHIC ATELIER BACKDROP (LOW OPACITY VIGNETTE) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero_studio/MARIECLAIRE_2608064303_web.webp"
          alt="Ash Mateu Studio"
          fill
          sizes="100vw"
          className="object-cover object-[center_35%] opacity-15 filter grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-[#09090B]/90 to-[#09090B]/80" />
        <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-[#B5A898]/10 blur-[150px] pointer-events-none" />
      </div>

      <div className="max-w-[1320px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* MAIN GLASSMORPHISM ATELIER CARD */}
        <div className="p-6 md:p-10 lg:p-12 rounded-3xl bg-black/50 backdrop-blur-2xl border border-white/15 shadow-2xl relative overflow-hidden">
          
          {/* SUBTLE GOLDEN ACCENT BORDER AT TOP */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#B5A898]/60 to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* LEFT COLUMN: EDITORIAL BRIEFING */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full">
              <div>
                <GsapReveal>
                  <div className="inline-flex items-center gap-2 border border-white/20 bg-white/5 px-3 py-1 rounded-full text-[9px] tracking-[0.28em] uppercase text-[#B5A898] mb-4 font-mono font-medium">
                    <Sparkles size={10} className="text-[#B5A898]" />
                    <span>08 · Contacto &amp; Bookings 2026</span>
                  </div>

                  <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white mb-4 leading-[1.1] tracking-tight">
                    Empecemos a crear juntos<span className="text-[#B5A898]">.</span>
                  </h2>

                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-8 font-light max-w-md">
                    Disponible para producciones editoriales, styling de celebridades, campañas de marcas globales en Buenos Aires, Nueva York y París, y consultoría de moda de autor.
                  </p>
                </GsapReveal>

                {/* DIRECT CONTACT TILES */}
                <div className="space-y-3 pt-6 border-t border-white/10">
                  <a
                    href="https://wa.me/5491123823297?text=Hola%20Ash,%20me%20gustar%C3%ADa%20consultar%20por%20un%20proyecto%20de%20estilismo%20y%20direcci%C3%B3n%20creativa."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#B5A898]/60 rounded-xl flex items-center justify-between transition-all duration-300 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366]">
                        <MessageCircle size={16} />
                      </div>
                      <div>
                        <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#B5A898] block">
                          WhatsApp Concierge Directo
                        </span>
                        <span className="text-xs sm:text-sm font-sans text-white group-hover:text-[#B5A898] transition-colors font-medium">
                          +54 9 11 2382-3297
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight size={14} className="text-white/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>

                  <a
                    href="mailto:info@ashmateu.com"
                    className="group p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#B5A898]/60 rounded-xl flex items-center justify-between transition-all duration-300 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-[#B5A898]">
                        <Mail size={16} />
                      </div>
                      <div>
                        <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#B5A898] block">
                          Email Profesional
                        </span>
                        <span className="text-xs sm:text-sm font-sans text-white group-hover:text-[#B5A898] transition-colors font-medium">
                          info@ashmateu.com
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight size={14} className="text-white/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>

              {/* LOCATIONS FOOTPRINT */}
              <div className="flex items-center gap-2 text-[10.5px] font-mono text-white/50 pt-8 mt-6 border-t border-white/10">
                <MapPin size={13} className="text-[#B5A898]" />
                <span className="tracking-wider uppercase">
                  Buenos Aires · Nueva York · París
                </span>
              </div>
            </div>

            {/* RIGHT COLUMN: LUXURY ATELIER FORM */}
            <div className="lg:col-span-7 bg-white/[0.03] p-6 sm:p-8 md:p-10 rounded-2xl border border-white/10 shadow-inner">
              {status === "success" ? (
                <div className="py-16 text-center">
                  <div className="w-14 h-14 rounded-full bg-[#B5A898]/20 border border-[#B5A898] text-[#B5A898] flex items-center justify-center mx-auto mb-4">
                    <Check size={26} />
                  </div>
                  <h3 className="font-serif text-2xl text-white mb-2 font-normal">
                    Mensaje Recibido
                  </h3>
                  <p className="text-xs sm:text-sm text-white/70 font-light max-w-sm mx-auto leading-relaxed mb-6">
                    Gracias por ponerte en contacto. Nos comunicaremos a la brevedad para coordinar los detalles de tu proyecto.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    type="button"
                    className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#B5A898] hover:text-white border-b border-[#B5A898] pb-1 cursor-pointer"
                  >
                    Enviar otra consulta
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* PROJECT TYPE PILLS */}
                  <div>
                    <label className="block text-[9.5px] font-mono uppercase tracking-[0.24em] text-[#B5A898] font-semibold mb-3">
                      Tipo de Proyecto *
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {projectTypes.map((type) => {
                        const selected = formData.tipoProyecto === type;
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setFormData({ ...formData, tipoProyecto: type })}
                            className={`px-3.5 py-1.5 rounded-full text-[10.5px] font-mono tracking-wider transition-all duration-300 cursor-pointer ${
                              selected
                                ? "bg-[#B5A898] text-black font-semibold shadow-md scale-102"
                                : "bg-white/5 hover:bg-white/15 text-white/80 border border-white/10"
                            }`}
                          >
                            {type}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* NAME & COMPANY */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[9.5px] font-mono uppercase tracking-[0.24em] text-white/70 mb-2">
                        Nombre Completo *
                      </label>
                      <input
                        type="text"
                        value={formData.nombre || ""}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        placeholder="Ej: Clara Martínez"
                        className="w-full bg-black/40 border-b border-white/20 focus:border-[#B5A898] text-white placeholder:text-white/30 text-xs sm:text-sm py-2.5 px-1 outline-none transition-colors"
                      />
                      {errors.nombre && (
                        <span className="text-[10px] text-red-400 font-mono mt-1 block">
                          {errors.nombre}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="block text-[9.5px] font-mono uppercase tracking-[0.24em] text-white/70 mb-2">
                        Empresa / Marca (Opcional)
                      </label>
                      <input
                        type="text"
                        value={formData.empresa || ""}
                        onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                        placeholder="Ej: Marie Claire / Particular"
                        className="w-full bg-black/40 border-b border-white/20 focus:border-[#B5A898] text-white placeholder:text-white/30 text-xs sm:text-sm py-2.5 px-1 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* EMAIL */}
                  <div>
                    <label className="block text-[9.5px] font-mono uppercase tracking-[0.24em] text-white/70 mb-2">
                      Email de Contacto *
                    </label>
                    <input
                      type="email"
                      value={formData.email || ""}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="clara@ejemplo.com"
                      className="w-full bg-black/40 border-b border-white/20 focus:border-[#B5A898] text-white placeholder:text-white/30 text-xs sm:text-sm py-2.5 px-1 outline-none transition-colors"
                    />
                    {errors.email && (
                      <span className="text-[10px] text-red-400 font-mono mt-1 block">
                        {errors.email}
                      </span>
                    )}
                  </div>

                  {/* MESSAGE / PROJECT BRIEF */}
                  <div>
                    <label className="block text-[9.5px] font-mono uppercase tracking-[0.24em] text-white/70 mb-2">
                      Detalle del Proyecto / Fechas Estimadas *
                    </label>
                    <textarea
                      rows={4}
                      value={formData.mensaje || ""}
                      onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                      placeholder="Cuéntanos sobre las fechas, tipo de producción, locación o evento..."
                      className="w-full bg-black/40 border-b border-white/20 focus:border-[#B5A898] text-white placeholder:text-white/30 text-xs sm:text-sm py-2.5 px-1 outline-none transition-colors resize-none"
                    />
                    {errors.mensaje && (
                      <span className="text-[10px] text-red-400 font-mono mt-1 block">
                        {errors.mensaje}
                      </span>
                    )}
                  </div>

                  {/* SUBMIT BUTTON */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="w-full py-4 bg-[#B5A898] hover:bg-white text-black font-mono font-bold text-[11px] uppercase tracking-[0.25em] rounded-xl transition-all duration-300 shadow-lg cursor-pointer flex items-center justify-center gap-2 group"
                    >
                      <span>
                        {status === "submitting"
                          ? "Enviando Solicitud..."
                          : "Enviar Consulta de Producción"}
                      </span>
                      <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>

                </form>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
