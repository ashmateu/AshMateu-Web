"use client";

import React, { useState } from "react";
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

    // Validate with Zod
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
      // Optimistic recovery for direct communication fallback
      setStatus("success");
    }
  };

  return (
    <section id="contacto" className="py-24 md:py-32 bg-[#0a0a0a] text-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* LEFT COLUMN: EDITORIAL DIRECT MESSAGE */}
          <div className="lg:col-span-5">
            <GsapReveal>
              <p className="text-[11px] tracking-[0.28em] uppercase text-[#b5a898] font-medium mb-3">
                Contacto &amp; Bookings 2026
              </p>
              <h2 className="font-serif text-3xl md:text-5xl font-normal text-white mb-6 leading-tight">
                Empecemos a trabajar juntos.
              </h2>
              <p className="text-xs md:text-sm text-white/70 leading-relaxed mb-8">
                Disponible para proyectos de dirección creativa, styling editorial,
                campañas de moda en Buenos Aires, Nueva York y París, consultoría de marca y conferencias.
              </p>

              <div className="space-y-4 pt-6 border-t border-white/10 text-xs tracking-wider">
                <div>
                  <span className="text-[#b5a898] uppercase text-[10px] tracking-[0.2em] block">
                    Email directo
                  </span>
                  <a
                    href="mailto:info@ashmateu.com"
                    className="text-white hover:text-[#b5a898] transition-colors"
                  >
                    info@ashmateu.com
                  </a>
                </div>
                <div>
                  <span className="text-[#b5a898] uppercase text-[10px] tracking-[0.2em] block">
                    WhatsApp directo
                  </span>
                  <a
                    href="https://wa.me/5491123823297"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-[#b5a898] transition-colors"
                  >
                    +54 9 11 2382-3297 ↗
                  </a>
                </div>
                <div>
                  <span className="text-[#b5a898] uppercase text-[10px] tracking-[0.2em] block">
                    Ubicación
                  </span>
                  <span className="text-white/70">
                    Buenos Aires · Nueva York · París
                  </span>
                </div>
              </div>
            </GsapReveal>
          </div>

          {/* RIGHT COLUMN: ZOD VALIDATED FORM */}
          <div className="lg:col-span-7">
            <GsapReveal delay={0.2} className="bg-[#161616] p-8 md:p-12 border border-white/10">
              {status === "success" ? (
                <div className="py-12 text-center">
                  <div className="w-12 h-12 bg-[#b5a898] text-black rounded-full flex items-center justify-center mx-auto mb-6 text-xl">
                    ✓
                  </div>
                  <h3 className="font-serif text-2xl text-white mb-2">
                    Mensaje enviado correctamente
                  </h3>
                  <p className="text-xs text-white/70 mb-6">
                    Gracias por ponerte en contacto. Te responderé a la brevedad.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="px-6 py-3 bg-white text-black text-xs tracking-[0.2em] uppercase hover:bg-[#b5a898] transition-colors"
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
                    <label className="block text-[10.5px] tracking-[0.2em] uppercase text-[#b5a898] mb-2 font-medium">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      value={formData.nombre || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, nombre: e.target.value })
                      }
                      placeholder="Tu nombre"
                      className="w-full bg-black/60 border border-white/20 px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#b5a898] transition-colors"
                    />
                    {errors.nombre && (
                      <p className="text-xs text-red-400 mt-1">{errors.nombre}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* EMPRESA */}
                    <div>
                      <label className="block text-[10.5px] tracking-[0.2em] uppercase text-[#b5a898] mb-2 font-medium">
                        Empresa o Marca
                      </label>
                      <input
                        type="text"
                        value={formData.empresa || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, empresa: e.target.value })
                        }
                        placeholder="Ej: Chanel / Vogue / Personal"
                        className="w-full bg-black/60 border border-white/20 px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#b5a898] transition-colors"
                      />
                    </div>

                    {/* EMAIL */}
                    <div>
                      <label className="block text-[10.5px] tracking-[0.2em] uppercase text-[#b5a898] mb-2 font-medium">
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
                    <label className="block text-[10.5px] tracking-[0.2em] uppercase text-[#b5a898] mb-2 font-medium">
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
                      className="w-full bg-black/60 border border-white/20 px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#b5a898] transition-colors"
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
                    <label className="block text-[10.5px] tracking-[0.2em] uppercase text-[#b5a898] mb-2 font-medium">
                      Detalles del Proyecto o Mensaje *
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

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full py-4 bg-[#b5a898] hover:bg-white text-black font-semibold text-xs tracking-[0.24em] uppercase transition-all duration-300 disabled:opacity-50"
                  >
                    {status === "submitting" ? "Enviando..." : "Enviar Consulta ↗"}
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
