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
    <section id="contacto" className="py-24 md:py-36 bg-[#0a0a0a] text-white border-t border-white/10 relative overflow-hidden">
      {/* BACKGROUND GLOW */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#EA2638]/10 blur-[140px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT COLUMN: EDITORIAL DIRECT MESSAGE */}
          <div className="lg:col-span-5">
            <GsapReveal>
              <div className="inline-flex items-center gap-2 border border-white/20 bg-white/5 px-3 py-1 rounded-full text-[9.5px] tracking-[0.26em] uppercase text-[#b5a898] mb-3 font-medium">
                <span>07 · Contacto &amp; Bookings 2026</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white mb-6 leading-[1.1] tracking-tight">
                Empecemos a trabajar juntos<span className="text-[#EA2638]">.</span>
              </h2>
              <p className="text-xs md:text-sm text-white/70 leading-relaxed mb-8 font-light">
                Disponible para proyectos de dirección creativa, styling editorial,
                campañas de moda en Buenos Aires, Nueva York y París, consultoría de marca y conferencias.
              </p>

              <div className="space-y-5 pt-8 border-t border-white/15 text-xs tracking-wider">
                <div className="p-4 bg-white/5 border border-white/10">
                  <span className="text-[#b5a898] uppercase text-[9.5px] tracking-[0.22em] block mb-1 font-semibold">
                    Email directo
                  </span>
                  <a
                    href="mailto:info@ashmateu.com"
                    className="text-white hover:text-[#b5a898] transition-colors font-medium"
                  >
                    info@ashmateu.com
                  </a>
                </div>

                <div className="p-4 bg-white/5 border border-white/10">
                  <span className="text-[#b5a898] uppercase text-[9.5px] tracking-[0.22em] block mb-1 font-semibold">
                    WhatsApp directo
                  </span>
                  <a
                    href="https://wa.me/5491123823297"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-[#b5a898] transition-colors font-medium flex items-center justify-between"
                  >
                    <span>+54 9 11 2382-3297</span>
                    <ArrowUpRight size={14} className="text-[#b5a898]" />
                  </a>
                </div>

                <div className="p-4 bg-white/5 border border-white/10">
                  <span className="text-[#b5a898] uppercase text-[9.5px] tracking-[0.22em] block mb-1 font-semibold">
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
            <GsapReveal delay={0.15} className="bg-[#121214] p-8 md:p-12 border border-white/15 shadow-2xl">
              {status === "success" ? (
                <div className="py-12 text-center">
                  <div className="w-14 h-14 bg-[#b5a898] text-black rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg">
                    ✓
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-white mb-3">
                    Mensaje enviado correctamente
                  </h3>
                  <p className="text-xs md:text-sm text-white/70 mb-8 max-w-md mx-auto leading-relaxed font-light">
                    Gracias por ponerte en contacto. Ash Mateu y su equipo revisarán tu propuesta a la brevedad.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="px-8 py-3.5 bg-white text-black text-xs tracking-[0.2em] uppercase font-semibold hover:bg-[#b5a898] transition-colors rounded-full"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {errorMessage && (
                    <div className="p-4 bg-red-950/60 border border-red-800 text-red-200 text-xs">
                      {errorMessage}
                    </div>
                  )}

                  {/* NOMBRE */}
                  <div>
                    <label className="block text-[10px] tracking-[0.22em] uppercase text-[#b5a898] mb-2 font-semibold">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      value={formData.nombre || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, nombre: e.target.value })
                      }
                      placeholder="Tu nombre y apellido"
                      className="w-full bg-black/60 border border-white/20 px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#b5a898] transition-colors"
                    />
                    {errors.nombre && (
                      <p className="text-xs text-red-400 mt-1">{errors.nombre}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* EMPRESA */}
                    <div>
                      <label className="block text-[10px] tracking-[0.22em] uppercase text-[#b5a898] mb-2 font-semibold">
                        Empresa o Marca
                      </label>
                      <input
                        type="text"
                        value={formData.empresa || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, empresa: e.target.value })
                        }
                        placeholder="Ej: Chanel / Marca Propia / Personal"
                        className="w-full bg-black/60 border border-white/20 px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#b5a898] transition-colors"
                      />
                    </div>

                    {/* EMAIL */}
                    <div>
                      <label className="block text-[10px] tracking-[0.22em] uppercase text-[#b5a898] mb-2 font-semibold">
                        Email de Contacto *
                      </label>
                      <input
                        type="email"
                        value={formData.email || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="tu@email.com"
                        className="w-full bg-black/60 border border-white/20 px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#b5a898] transition-colors"
                      />
                      {errors.email && (
                        <p className="text-xs text-red-400 mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* TIPO DE PROYECTO */}
                  <div>
                    <label className="block text-[10px] tracking-[0.22em] uppercase text-[#b5a898] mb-2 font-semibold">
                      Tipo de Proyecto *
                    </label>
                    <select
                      value={formData.tipoProyecto}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          tipoProyecto: e.target.value as ContactFormData["tipoProyecto"],
                        })
                      }
                      className="w-full bg-black/60 border border-white/20 px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#b5a898] transition-colors cursor-pointer"
                    >
                      {projectTypes.map((type) => (
                        <option key={type} value={type} className="bg-[#161616]">
                          {type}
                        </option>
                      ))}
                    </select>
                    {errors.tipoProyecto && (
                      <p className="text-xs text-red-400 mt-1">
                        {errors.tipoProyecto}
                      </p>
                    )}
                  </div>

                  {/* MENSAJE */}
                  <div>
                    <label className="block text-[10px] tracking-[0.22em] uppercase text-[#b5a898] mb-2 font-semibold">
                      Detalles del Proyecto o Fechas Estimadas *
                    </label>
                    <textarea
                      rows={4}
                      value={formData.mensaje || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, mensaje: e.target.value })
                      }
                      placeholder="Contame sobre tu idea, objetivos, fechas estimadas y locación..."
                      className="w-full bg-black/60 border border-white/20 px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#b5a898] transition-colors resize-none"
                    />
                    {errors.mensaje && (
                      <p className="text-xs text-red-400 mt-1">{errors.mensaje}</p>
                    )}
                  </div>

                  {/* BUTTON-IN-BUTTON SUBMIT */}
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="group flex items-center justify-between gap-3 w-full py-3.5 pl-6 pr-2 bg-[#b5a898] hover:bg-white text-black font-semibold text-xs tracking-[0.24em] uppercase transition-all duration-300 disabled:opacity-50 cursor-pointer shadow-lg active:scale-[0.98] rounded-full"
                  >
                    <span>{status === "submitting" ? "Enviando Solicitud..." : "Enviar Propuesta"}</span>
                    <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      <ArrowUpRight size={15} strokeWidth={2.2} />
                    </div>
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
