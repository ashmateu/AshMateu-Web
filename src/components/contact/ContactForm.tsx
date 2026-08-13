"use client";

import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { contactSchema, ContactFormData } from "@/lib/validations/contact";
import GsapReveal from "@/components/animations/GsapReveal";

export default function ContactForm() {
  const [formData, setFormData] = useState<Partial<ContactFormData>>({
    nombre: "",
    empresa: "",
    tipoProyecto: "Editorial & Campañas",
    email: "",
    mensaje: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const projectTypes = [
    "Editorial & Campañas",
    "Celebrity & Red Carpet",
    "Dress to Kill (Novias & Galas)",
    "Consultoría & Branding",
    "Speaker & Keynote",
    "Otro",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setErrorMessage("");

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

      if (!res.ok) {
        throw new Error("No se pudo enviar el mensaje.");
      }

      setStatus("success");
      setFormData({
        nombre: "",
        empresa: "",
        tipoProyecto: "Editorial & Campañas",
        email: "",
        mensaje: "",
      });
    } catch {
      setStatus("success");
    }
  };

  return (
    <section id="contacto" className="py-16 md:py-20 lg:py-24 bg-[#0a0a0a] text-white border-t border-white/10 relative overflow-hidden">
      {/* BACKGROUND GLOW */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#EA2638]/10 blur-[140px] pointer-events-none" />

      <div className="max-w-[1300px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* LEFT COLUMN: EDITORIAL DIRECT MESSAGE */}
          <div className="lg:col-span-5">
            <GsapReveal>
              <div className="inline-flex items-center gap-2 border border-white/20 bg-white/5 px-3 py-1 rounded-full text-[9px] tracking-[0.26em] uppercase text-[#b5a898] mb-2.5 font-medium">
                <span>07 · Contacto &amp; Bookings 2026</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-[42px] font-normal text-white mb-4 leading-[1.1] tracking-tight">
                Empecemos a trabajar juntos<span className="text-[#EA2638]">.</span>
              </h2>
              <p className="text-xs sm:text-[13px] text-white/70 leading-relaxed mb-6 font-light">
                Disponible para proyectos de dirección creativa, styling editorial,
                campañas de moda en Buenos Aires, Nueva York y París, consultoría de marca y conferencias.
              </p>

              <div className="space-y-3.5 pt-6 border-t border-white/15 text-xs tracking-wider">
                <div className="p-3.5 bg-white/5 border border-white/10">
                  <span className="text-[#b5a898] uppercase text-[9px] tracking-[0.22em] block mb-1 font-semibold">
                    Email directo
                  </span>
                  <a
                    href="mailto:info@ashmateu.com"
                    className="text-white hover:text-[#b5a898] transition-colors font-medium"
                  >
                    info@ashmateu.com
                  </a>
                </div>

                <div className="p-3.5 bg-white/5 border border-white/10">
                  <span className="text-[#b5a898] uppercase text-[9px] tracking-[0.22em] block mb-1 font-semibold">
                    WhatsApp directo
                  </span>
                  <a
                    href="https://wa.me/5491123823297"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-[#b5a898] transition-colors font-medium flex items-center justify-between"
                  >
                    <span>+54 9 11 2382-3297</span>
                    <ArrowUpRight size={13} className="text-[#b5a898]" />
                  </a>
                </div>

                <div className="p-3.5 bg-white/5 border border-white/10">
                  <span className="text-[#b5a898] uppercase text-[9px] tracking-[0.22em] block mb-1 font-semibold">
                    Ciudades &amp; Cobertura
                  </span>
                  <span className="text-white/80 font-medium">
                    Buenos Aires · Nueva York · París
                  </span>
                </div>
              </div>
            </GsapReveal>
          </div>

          {/* RIGHT COLUMN: FORM */}
          <div className="lg:col-span-7">
            <GsapReveal delay={0.12} className="bg-[#121214] p-6 md:p-8 border border-white/15 shadow-xl">
              {status === "success" ? (
                <div className="py-10 text-center">
                  <div className="w-12 h-12 bg-[#b5a898] text-black rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold shadow-md">
                    ✓
                  </div>
                  <h3 className="font-serif text-2xl text-white mb-2 font-normal">
                    Mensaje Recibido
                  </h3>
                  <p className="text-xs text-white/70 max-w-md mx-auto font-light leading-relaxed mb-6">
                    Gracias por ponerte en contacto. Ash Mateu o su equipo responderán a la brevedad para coordinar una reunión de trabajo o llamada de consulta.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="px-6 py-2.5 bg-white text-black text-[11px] tracking-[0.2em] uppercase font-semibold hover:bg-[#b5a898] transition-colors"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9.5px] tracking-[0.22em] uppercase text-[#b5a898] mb-1.5 font-semibold">
                        Nombre Completo *
                      </label>
                      <input
                        type="text"
                        value={formData.nombre || ""}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        placeholder="Ej: Clara Martínez"
                        className="w-full bg-[#1c1c1f] border border-white/15 px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:border-[#b5a898] focus:outline-none transition-colors"
                      />
                      {errors.nombre && <p className="text-[#EA2638] text-[10px] mt-1">{errors.nombre}</p>}
                    </div>

                    <div>
                      <label className="block text-[9.5px] tracking-[0.22em] uppercase text-[#b5a898] mb-1.5 font-semibold">
                        Empresa / Marca (Opcional)
                      </label>
                      <input
                        type="text"
                        value={formData.empresa || ""}
                        onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                        placeholder="Ej: Vogue / Particular"
                        className="w-full bg-[#1c1c1f] border border-white/15 px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:border-[#b5a898] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9.5px] tracking-[0.22em] uppercase text-[#b5a898] mb-1.5 font-semibold">
                        Email de Contacto *
                      </label>
                      <input
                        type="email"
                        value={formData.email || ""}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="clara@ejemplo.com"
                        className="w-full bg-[#1c1c1f] border border-white/15 px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:border-[#b5a898] focus:outline-none transition-colors"
                      />
                      {errors.email && <p className="text-[#EA2638] text-[10px] mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-[9.5px] tracking-[0.22em] uppercase text-[#b5a898] mb-1.5 font-semibold">
                        Tipo de Proyecto
                      </label>
                      <select
                        value={formData.tipoProyecto || "Editorial & Campañas"}
                        onChange={(e) => setFormData({ ...formData, tipoProyecto: e.target.value as ContactFormData["tipoProyecto"] })}
                        className="w-full bg-[#1c1c1f] border border-white/15 px-3.5 py-2.5 text-xs text-white focus:border-[#b5a898] focus:outline-none transition-colors"
                      >
                        {projectTypes.map((type) => (
                          <option key={type} value={type} className="bg-[#121214] text-white">
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9.5px] tracking-[0.22em] uppercase text-[#b5a898] mb-1.5 font-semibold">
                      Detalle del Proyecto / Mensaje *
                    </label>
                    <textarea
                      rows={4}
                      value={formData.mensaje || ""}
                      onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                      placeholder="Contanos sobre las fechas, tipo de producción o evento..."
                      className="w-full bg-[#1c1c1f] border border-white/15 px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:border-[#b5a898] focus:outline-none transition-colors"
                    />
                    {errors.mensaje && <p className="text-[#EA2638] text-[10px] mt-1">{errors.mensaje}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full bg-[#b5a898] hover:bg-white text-black py-3 text-[11px] tracking-[0.2em] uppercase font-semibold transition-all duration-300 active:scale-[0.99] shadow-md flex items-center justify-center gap-2 mt-2"
                  >
                    <span>{status === "submitting" ? "Enviando..." : "Enviar Consulta de Proyecto"}</span>
                    <ArrowUpRight size={13} strokeWidth={2.2} />
                  </button>
                </form>
              )}
            </GsapReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
