import React from "react";
import Image from "next/image";
import Link from "next/link";
import ContactForm from "@/components/contact/ContactForm";

export const metadata = {
  title: "¿Cómo Trabajo? — Ash Mateu",
  description:
    "01 Dress to Kill (Personas & Novias) · 02 Empresas & Marcas (Styling & Producciones) · 03 Consultoría & Speaker de Tendencias.",
};

export default function ComoTrabajoPage() {
  return (
    <div className="pt-28 md:pt-36 bg-[#f7f3ee]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-20">
        <p className="text-[11px] tracking-[0.28em] uppercase text-[#7a7065] font-medium mb-3">
          Metodología &amp; Servicios
        </p>
        <h1 className="font-serif text-4xl md:text-6xl text-black font-normal mb-8">
          ¿Cómo Trabajo?
        </h1>
        <p className="text-base md:text-xl text-black/75 max-w-2xl font-light leading-relaxed mb-16">
          Tres pilares de trabajo diseñados para personas que buscan una imagen inolvidable, marcas que necesitan posicionamiento global y empresas en busca de innovación en tendencias.
        </p>

        {/* PILAR 1 */}
        <section id="personas" className="py-12 border-t border-[#b5a898]/40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-4">
              <span className="text-[11px] tracking-[0.24em] uppercase text-[#b5a898] font-medium block mb-2">
                Pilar 01 · Personas
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-black mb-4">
                Dress to Kill
              </h2>
              <p className="text-xs md:text-sm text-black/70 leading-relaxed">
                El vestir no es un accesorio superficial; es una declaración de identidad, seguridad y presencia.
              </p>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 border border-[#b5a898]/30">
                <h3 className="font-serif text-xl mb-2 text-black">Novias Únicas</h3>
                <p className="text-xs text-black/70 leading-relaxed mb-4">
                  <em>‘Que nunca nadie olvide tu vestido.’</em> Acompañamiento integral de estilismo nupcial, elección de diseñador, pruebas de vestuario y asesoramiento estético completo.
                </p>
                <a
                  href="https://wa.me/5491123823297?text=Hola%20Ash,%20quiero%20consultar%20por%20Styling%20de%20Novias"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] tracking-[0.16em] uppercase text-black font-medium border-b border-black/30 pb-0.5"
                >
                  Consultar fecha de Novias ↗
                </a>
              </div>
              <div className="bg-white p-6 border border-[#b5a898]/30">
                <h3 className="font-serif text-xl mb-2 text-black">Alfombras Rojas &amp; Galas</h3>
                <p className="text-xs text-black/70 leading-relaxed mb-4">
                  Styling exclusivo para premios internacionales, festivales de cine, red carpets y ocasiones donde el impacto fotográfico y mediático es prioritario.
                </p>
                <a
                  href="https://wa.me/5491123823297?text=Hola%20Ash,%20quiero%20consultar%20por%20Styling%20de%20Gala"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] tracking-[0.16em] uppercase text-black font-medium border-b border-black/30 pb-0.5"
                >
                  Agendar Styling de Gala ↗
                </a>
              </div>
              <div className="bg-white p-6 border border-[#b5a898]/30">
                <h3 className="font-serif text-xl mb-2 text-black">Consultoría en Imagen</h3>
                <p className="text-xs text-black/70 leading-relaxed mb-4">
                  Construcción de fondo de armario, diagnóstico de estilo personal y alineación de la imagen con los objetivos profesionales y vitales.
                </p>
                <a
                  href="https://wa.me/5491123823297?text=Hola%20Ash,%20quiero%20consultar%20por%20Consultoria%20de%20Imagen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] tracking-[0.16em] uppercase text-black font-medium border-b border-black/30 pb-0.5"
                >
                  Consultar disponibilidad ↗
                </a>
              </div>
              <div className="bg-white p-6 border border-[#b5a898]/30">
                <h3 className="font-serif text-xl mb-2 text-black">Fiestas &amp; Eventos</h3>
                <p className="text-xs text-black/70 leading-relaxed mb-4">
                  Para quienes quieren vestir para matar. Curaduría de estilismo completo para celebraciones de alto perfil.
                </p>
                <a
                  href="https://wa.me/5491123823297"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] tracking-[0.16em] uppercase text-black font-medium border-b border-black/30 pb-0.5"
                >
                  Escribir por WhatsApp ↗
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* PILAR 2 */}
        <section id="marcas" className="py-16 border-t border-[#b5a898]/40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-4">
              <span className="text-[11px] tracking-[0.24em] uppercase text-[#b5a898] font-medium block mb-2">
                Pilar 02 · Marcas &amp; Empresas
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-black mb-4">
                Styling &amp; Producciones
              </h2>
              <p className="text-xs md:text-sm text-black/70 leading-relaxed">
                Campañas visuales de moda, dirección de arte y estilismo editorial en Buenos Aires, Nueva York y París.
              </p>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 border border-[#b5a898]/30">
                <h3 className="font-serif text-xl mb-2 text-black">Campañas &amp; Contenidos</h3>
                <p className="text-xs text-black/70 leading-relaxed">
                  Desarrollo integral desde el concepto hasta la realización en set. Coordinación de equipos creativos, modelos y locaciones internacionales.
                </p>
              </div>
              <div className="bg-white p-6 border border-[#b5a898]/30">
                <h3 className="font-serif text-xl mb-2 text-black">Styling Editorial &amp; Publicitario</h3>
                <p className="text-xs text-black/70 leading-relaxed">
                  Construcción de looks de alto impacto para cine, TV, streaming, revistas y marcas de lujo.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PILAR 3 */}
        <section id="consultoria" className="py-16 border-t border-[#b5a898]/40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-4">
              <span className="text-[11px] tracking-[0.24em] uppercase text-[#b5a898] font-medium block mb-2">
                Pilar 03 · Estrategia &amp; Educación
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-black mb-4">
                Consultoría &amp; Speaker
              </h2>
              <p className="text-xs md:text-sm text-black/70 leading-relaxed">
                Conferencias y consultoría estratégica sobre macrotendencias globales, nuevas oportunidades de mercado y comportamiento del consumidor.
              </p>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 border border-[#b5a898]/30">
                <h3 className="font-serif text-xl mb-2 text-black">Branding &amp; Posicionamiento</h3>
                <p className="text-xs text-black/70 leading-relaxed">
                  Definición de identidad estética, ADN de marca, curaduría de producto y estrategia de innovación comercial.
                </p>
              </div>
              <div className="bg-white p-6 border border-[#b5a898]/30">
                <h3 className="font-serif text-xl mb-2 text-black">Speaker &amp; Keynotes</h3>
                <p className="text-xs text-black/70 leading-relaxed">
                  Disertaciones y masterclasses sobre tendencias mundiales de moda, lujo, sociología del consumidor y nuevos negocios.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <ContactForm />
    </div>
  );
}
