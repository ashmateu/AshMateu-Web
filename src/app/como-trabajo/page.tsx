import React from "react";
import Image from "next/image";
import Link from "next/link";
import ContactForm from "@/components/contact/ContactForm";
import ConciergeTriggerBanner from "@/components/concierge/ConciergeTriggerBanner";
import GsapReveal from "@/components/animations/GsapReveal";
import { ArrowUpRight } from "lucide-react";

export const metadata = {
  title: "¿Cómo Trabajo? — Styling Services & Metodología — Ash Mateu",
  description:
    "01 Dress to Kill (Personas & Novias) · 02 Empresas & Marcas (Styling & Producciones) · 03 Consultoría & Speaker de Tendencias.",
};

export default function ComoTrabajoPage() {
  return (
    <div className="pt-28 md:pt-36 bg-[#f7f3ee]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-20">
        <GsapReveal>
          <div className="inline-flex items-center gap-2 border border-[#b5a898]/40 bg-white px-3 py-1 rounded-full text-[9px] tracking-[0.26em] uppercase text-[#7a7065] mb-3 font-medium">
            <span>Metodología &amp; Servicios</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-black font-normal mb-6">
            Styling Services
          </h1>
          <p className="text-sm sm:text-base md:text-xl text-black/75 max-w-2xl font-light leading-relaxed mb-12">
            Tres pilares de trabajo diseñados para personas que buscan una imagen inolvidable, marcas que necesitan posicionamiento global y empresas en busca de innovación en tendencias.
          </p>
        </GsapReveal>

        {/* AI CONCIERGE INTERACTIVE BRIEFING BANNER */}
        <ConciergeTriggerBanner />

        {/* PILAR 1: DRESS TO KILL (PERSONAS & NOVIAS) */}
        <section id="personas" className="py-16 border-t border-[#b5a898]/40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-4">
              <span className="text-[11px] tracking-[0.24em] uppercase text-[#b5a898] font-semibold block mb-2">
                Pilar 01 · Personas
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-black mb-4">
                Dress to Kill
              </h2>
              <p className="text-xs md:text-sm text-black/70 leading-relaxed mb-6">
                El vestir no es un accesorio superficial; es una declaración de identidad, seguridad y presencia en ocasiones irrepetibles.
              </p>

              {/* FOTOGRAFÍA HERO DEL PILAR 1 */}
              <div className="relative aspect-[3/4] w-full bg-neutral-200 overflow-hidden shadow-md border border-[#b5a898]/30 hidden lg:block group">
                <Image
                  src="/images/catalog_v2/RED CARPETS/IMG_4680.jpg"
                  alt="Dress to Kill — Galas & Haute Couture"
                  fill
                  sizes="(max-width: 1024px) 100vw, 30vw"
                  className="object-cover object-[center_top] transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-5">
                  <span className="text-[10px] tracking-[0.22em] uppercase text-white font-medium">
                    Haute Couture &amp; Galas VIP
                  </span>
                </div>
              </div>
            </div>

            {/* CUADROS INDIVIDUALES PILAR 1 */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* CUADRO 1: NOVIAS */}
              <div className="bg-white border border-[#b5a898]/30 overflow-hidden flex flex-col justify-between shadow-sm group hover:border-black transition-all duration-300">
                <div>
                  <div className="relative aspect-[16/10] w-full bg-neutral-100 overflow-hidden">
                    <Image
                      src="/images/catalog_v2/RED CARPETS/IMG_7306.jpg"
                      alt="Novias Únicas Fitting"
                      fill
                      sizes="(max-width: 768px) 100vw, 35vw"
                      className="object-cover object-[50%_15%] transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-sm text-white text-[8.5px] tracking-[0.2em] uppercase px-2.5 py-1">
                      Atelier Nupcial
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl mb-2 text-black">Novias Únicas</h3>
                    <p className="text-xs text-black/70 leading-relaxed">
                      <em>‘Que nunca nadie olvide tu vestido.’</em> Acompañamiento integral de estilismo nupcial, elección de diseñador, pruebas de vestuario y asesoramiento estético completo.
                    </p>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <a
                    href="https://wa.me/5491123823297?text=Hola%20Ash,%20quiero%20consultar%20por%20Styling%20de%20Novias"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.16em] uppercase text-black font-semibold border-b border-black/30 pb-0.5 hover:border-black hover:text-[#7a6a5a] transition-colors w-fit"
                  >
                    <span>Consultar fecha de Novias</span>
                    <ArrowUpRight size={13} strokeWidth={2} />
                  </a>
                </div>
              </div>

              {/* CUADRO 2: ALFOMBRAS ROJAS & GALAS */}
              <div className="bg-white border border-[#b5a898]/30 overflow-hidden flex flex-col justify-between shadow-sm group hover:border-black transition-all duration-300">
                <div>
                  <div className="relative aspect-[16/10] w-full bg-neutral-100 overflow-hidden">
                    <Image
                      src="/images/catalog_v2/EMILIA ATTIAS/IMG_4205-1.jpg"
                      alt="Alfombras Rojas & Galas"
                      fill
                      sizes="(max-width: 768px) 100vw, 35vw"
                      className="object-cover object-[50%_20%] transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-sm text-white text-[8.5px] tracking-[0.2em] uppercase px-2.5 py-1">
                      Red Carpet VIP
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl mb-2 text-black">Alfombras Rojas &amp; Galas</h3>
                    <p className="text-xs text-black/70 leading-relaxed">
                      Styling exclusivo para premios internacionales, festivales de cine, red carpets y ocasiones donde el impacto fotográfico y mediático es prioritario.
                    </p>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <a
                    href="https://wa.me/5491123823297?text=Hola%20Ash,%20quiero%20consultar%20por%20Styling%20de%20Gala"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.16em] uppercase text-black font-semibold border-b border-black/30 pb-0.5 hover:border-black hover:text-[#7a6a5a] transition-colors w-fit"
                  >
                    <span>Agendar Styling de Gala</span>
                    <ArrowUpRight size={13} strokeWidth={2} />
                  </a>
                </div>
              </div>

              {/* CUADRO 3: CONSULTORÍA EN IMAGEN */}
              <div className="bg-white border border-[#b5a898]/30 overflow-hidden flex flex-col justify-between shadow-sm group hover:border-black transition-all duration-300">
                <div>
                  <div className="relative aspect-[16/10] w-full bg-neutral-100 overflow-hidden">
                    <Image
                      src="/images/catalog_v2/ASH/IMG_7656-1.jpg"
                      alt="Consultoría en Imagen"
                      fill
                      sizes="(max-width: 768px) 100vw, 35vw"
                      className="object-cover object-[42%_15%] transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-sm text-white text-[8.5px] tracking-[0.2em] uppercase px-2.5 py-1">
                      Fondo de Armario
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl mb-2 text-black">Consultoría en Imagen</h3>
                    <p className="text-xs text-black/70 leading-relaxed">
                      Construcción de fondo de armario, diagnóstico de estilo personal y alineación de la imagen con los objetivos profesionales y vitales.
                    </p>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <a
                    href="https://wa.me/5491123823297?text=Hola%20Ash,%20quiero%20consultar%20por%20Consultoria%20de%20Imagen"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.16em] uppercase text-black font-semibold border-b border-black/30 pb-0.5 hover:border-black hover:text-[#7a6a5a] transition-colors w-fit"
                  >
                    <span>Consultar disponibilidad</span>
                    <ArrowUpRight size={13} strokeWidth={2} />
                  </a>
                </div>
              </div>

              {/* CUADRO 4: FIESTAS & EVENTOS */}
              <div className="bg-white border border-[#b5a898]/30 overflow-hidden flex flex-col justify-between shadow-sm group hover:border-black transition-all duration-300">
                <div>
                  <div className="relative aspect-[16/10] w-full bg-neutral-100 overflow-hidden">
                    <Image
                      src="/images/catalog_v2/VALENTINA ZENERE/Valentina Z 0016.jpg"
                      alt="Fiestas & Eventos Styling"
                      fill
                      sizes="(max-width: 768px) 100vw, 35vw"
                      className="object-cover object-[24%_15%] transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-sm text-white text-[8.5px] tracking-[0.2em] uppercase px-2.5 py-1">
                      Eventos &amp; Celebraciones
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl mb-2 text-black">Fiestas &amp; Eventos</h3>
                    <p className="text-xs text-black/70 leading-relaxed">
                      Para quienes quieren vestir para matar. Curaduría de estilismo completo para celebraciones de alto perfil y noches inolvidables.
                    </p>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <a
                    href="https://wa.me/5491123823297?text=Hola%20Ash,%20quiero%20consultar%20por%20Styling%20para%20Fiestas%20y%20Eventos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.16em] uppercase text-black font-semibold border-b border-black/30 pb-0.5 hover:border-black hover:text-[#7a6a5a] transition-colors w-fit"
                  >
                    <span>Escribir por WhatsApp</span>
                    <ArrowUpRight size={13} strokeWidth={2} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PILAR 2: MARCAS & EMPRESAS (STYLING & PRODUCCIONES) */}
        <section id="marcas" className="py-16 border-t border-[#b5a898]/40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-4">
              <span className="text-[11px] tracking-[0.24em] uppercase text-[#b5a898] font-semibold block mb-2">
                Pilar 02 · Marcas &amp; Empresas
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-black mb-4">
                Styling &amp; Producciones
              </h2>
              <p className="text-xs md:text-sm text-black/70 leading-relaxed mb-6">
                Campañas visuales de moda, dirección de arte y estilismo editorial en Buenos Aires, Nueva York y París.
              </p>

              {/* FOTOGRAFÍA HERO DEL PILAR 2 */}
              <div className="relative aspect-[3/4] w-full bg-neutral-200 overflow-hidden shadow-md border border-[#b5a898]/30 hidden lg:block group">
                <Image
                  src="/images/catalog_v2/MODA CENTRAL PARK/Moda-Purpura-3.jpg"
                  alt="Dirección de Arte & Campañas"
                  fill
                  sizes="(max-width: 1024px) 100vw, 30vw"
                  className="object-cover object-[center_top] transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-5">
                  <span className="text-[10px] tracking-[0.22em] uppercase text-white font-medium">
                    Campañas en NYC &amp; París
                  </span>
                </div>
              </div>
            </div>

            {/* CUADROS INDIVIDUALES PILAR 2 */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* CUADRO 1: CAMPAÑAS */}
              <div className="bg-white border border-[#b5a898]/30 overflow-hidden flex flex-col justify-between shadow-sm group hover:border-black transition-all duration-300">
                <div>
                  <div className="relative aspect-[16/10] w-full bg-neutral-100 overflow-hidden">
                    <Image
                      src="/images/catalog_v2/Campaigns/18405581-fd6b-4f13-bee8-d2a896bbfd5c.jpg"
                      alt="Campañas & Contenidos"
                      fill
                      sizes="(max-width: 768px) 100vw, 35vw"
                      className="object-cover object-[center_top] transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-sm text-white text-[8.5px] tracking-[0.2em] uppercase px-2.5 py-1">
                      Producción Comercial
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl mb-2 text-black">Campañas &amp; Contenidos</h3>
                    <p className="text-xs text-black/70 leading-relaxed">
                      Desarrollo integral desde el concepto hasta la realización en set. Coordinación de equipos creativos, modelos y locaciones internacionales.
                    </p>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <a
                    href="https://wa.me/5491123823297?text=Hola%20Ash,%20quiero%20consultar%20por%20Produccion%20y%20Campana%20de%20Marca"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.16em] uppercase text-black font-semibold border-b border-black/30 pb-0.5 hover:border-black hover:text-[#7a6a5a] transition-colors w-fit"
                  >
                    <span>Consultar Producción</span>
                    <ArrowUpRight size={13} strokeWidth={2} />
                  </a>
                </div>
              </div>

              {/* CUADRO 2: STYLING EDITORIAL */}
              <div className="bg-white border border-[#b5a898]/30 overflow-hidden flex flex-col justify-between shadow-sm group hover:border-black transition-all duration-300">
                <div>
                  <div className="relative aspect-[16/10] w-full bg-neutral-100 overflow-hidden">
                    <Image
                      src="/images/catalog_v2/36. Valentina Ferrer Marie Claire/MC_VALENTINA_RETOUCHED_0001 copy.jpg"
                      alt="Styling Editorial & Publicitario"
                      fill
                      sizes="(max-width: 768px) 100vw, 35vw"
                      className="object-cover object-[center_top] transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-sm text-white text-[8.5px] tracking-[0.2em] uppercase px-2.5 py-1">
                      Editorial &amp; Revistas
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl mb-2 text-black">Styling Editorial &amp; Publicitario</h3>
                    <p className="text-xs text-black/70 leading-relaxed">
                      Construcción de looks de alto impacto para cine, TV, streaming, revistas internacionales y marcas de lujo.
                    </p>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <a
                    href="https://wa.me/5491123823297?text=Hola%20Ash,%20quiero%20consultar%20por%20Styling%20Editorial%20o%20Publicitario"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.16em] uppercase text-black font-semibold border-b border-black/30 pb-0.5 hover:border-black hover:text-[#7a6a5a] transition-colors w-fit"
                  >
                    <span>Consultar Styling</span>
                    <ArrowUpRight size={13} strokeWidth={2} />
                  </a>
                </div>
              </div>

              {/* CUADRO 3: CURADURÍA DE DISEÑO */}
              <div className="bg-white border border-[#b5a898]/30 overflow-hidden flex flex-col justify-between shadow-sm group hover:border-black transition-all duration-300 md:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
                  <div className="relative aspect-[16/10] md:aspect-auto md:col-span-5 bg-neutral-100 overflow-hidden min-h-[220px]">
                    <Image
                      src="/images/catalog_v2/MODA ESTUDIO NY/MarieClaire_Cover_2024_001.jpg"
                      alt="Curaduría de Diseño & Lookbooks"
                      fill
                      sizes="(max-width: 768px) 100vw, 40vw"
                      className="object-cover object-[50%_10%] transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-sm text-white text-[8.5px] tracking-[0.2em] uppercase px-2.5 py-1">
                      Lookbooks &amp; Colecciones
                    </div>
                  </div>
                  <div className="p-6 md:p-8 md:col-span-7 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl mb-3 text-black">Curaduría de Diseño &amp; Lookbooks</h3>
                      <p className="text-xs sm:text-sm text-black/70 leading-relaxed mb-6">
                        Asesoramiento en armado de colecciones, selección de texturas, paleta cromática, diseño de producto y dirección estética de catálogos comerciales.
                      </p>
                    </div>
                    <a
                      href="https://wa.me/5491123823297?text=Hola%20Ash,%20quiero%20consultar%20por%20Curaduria%20de%20Diseno"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.16em] uppercase text-black font-semibold border-b border-black/30 pb-0.5 hover:border-black hover:text-[#7a6a5a] transition-colors w-fit"
                    >
                      <span>Consultar Curaduría</span>
                      <ArrowUpRight size={13} strokeWidth={2} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PILAR 3: ESTRATEGIA & EDUCACIÓN (CONSULTORÍA & SPEAKER) */}
        <section id="consultoria" className="py-16 border-t border-[#b5a898]/40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-4">
              <span className="text-[11px] tracking-[0.24em] uppercase text-[#b5a898] font-semibold block mb-2">
                Pilar 03 · Estrategia &amp; Educación
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-black mb-4">
                Consultoría &amp; Speaker
              </h2>
              <p className="text-xs md:text-sm text-black/70 leading-relaxed mb-6">
                Conferencias y consultoría estratégica sobre macrotendencias globales, nuevas oportunidades de mercado y comportamiento del consumidor.
              </p>

              {/* FOTOGRAFÍA HERO DEL PILAR 3 */}
              <div className="relative aspect-[3/4] w-full bg-neutral-200 overflow-hidden shadow-md border border-[#b5a898]/30 hidden lg:block group">
                <Image
                  src="/images/catalog_v2/ASH/IMG_7664-1.jpg"
                  alt="Ash Mateu Speaker & Keynote"
                  fill
                  sizes="(max-width: 1024px) 100vw, 30vw"
                  className="object-cover object-[center_top] transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-5">
                  <span className="text-[10px] tracking-[0.22em] uppercase text-white font-medium">
                    Keynotes &amp; Formación de Negocios
                  </span>
                </div>
              </div>
            </div>

            {/* CUADROS INDIVIDUALES PILAR 3 */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* CUADRO 1: BRANDING & POSICIONAMIENTO */}
              <div className="bg-white border border-[#b5a898]/30 overflow-hidden flex flex-col justify-between shadow-sm group hover:border-black transition-all duration-300">
                <div>
                  <div className="relative aspect-[16/10] w-full bg-neutral-100 overflow-hidden">
                    <Image
                      src="/images/catalog_v2/portadas/MC-083-Tapa DIgital-Tecnomoda A.jpg"
                      alt="Branding & Posicionamiento de Moda"
                      fill
                      sizes="(max-width: 768px) 100vw, 35vw"
                      className="object-cover object-[center_top] transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-sm text-white text-[8.5px] tracking-[0.2em] uppercase px-2.5 py-1">
                      Estrategia &amp; Futuro
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl mb-2 text-black">Branding &amp; Posicionamiento</h3>
                    <p className="text-xs text-black/70 leading-relaxed">
                      Estrategia de innovación comercial, comunicación de marca y diferenciación en el mercado del lujo y consumo premium.
                    </p>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <a
                    href="https://wa.me/5491123823297?text=Hola%20Ash,%20quiero%20consultar%20por%20Branding%20y%20Estrategia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.16em] uppercase text-black font-semibold border-b border-black/30 pb-0.5 hover:border-black hover:text-[#7a6a5a] transition-colors w-fit"
                  >
                    <span>Consultar Estrategia</span>
                    <ArrowUpRight size={13} strokeWidth={2} />
                  </a>
                </div>
              </div>

              {/* CUADRO 2: SPEAKER */}
              <div className="bg-white border border-[#b5a898]/30 overflow-hidden flex flex-col justify-between shadow-sm group hover:border-black transition-all duration-300">
                <div>
                  <div className="relative aspect-[16/10] w-full bg-neutral-100 overflow-hidden">
                    <Image
                      src="/images/catalog/07_backstage_streetstyle_social/20220402_104713.jpg"
                      alt="Speaker Especializada & Masterclasses"
                      fill
                      sizes="(max-width: 768px) 100vw, 35vw"
                      className="object-cover object-[90%_36%] scale-[1.05] transition-transform duration-500 group-hover:scale-108"
                    />
                    <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-sm text-white text-[8.5px] tracking-[0.2em] uppercase px-2.5 py-1">
                      Conferencias &amp; Keynotes
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl mb-2 text-black">Speaker Especializada</h3>
                    <p className="text-xs text-black/70 leading-relaxed">
                      Conferencias magistrales para empresas, universidades y congresos sobre macrotendencias globales y futuro de la moda.
                    </p>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <a
                    href="https://wa.me/5491123823297?text=Hola%20Ash,%20quiero%20consultar%20por%20Keynote%20o%20Charla"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.16em] uppercase text-black font-semibold border-b border-black/30 pb-0.5 hover:border-black hover:text-[#7a6a5a] transition-colors w-fit"
                  >
                    <span>Agendar Keynote</span>
                    <ArrowUpRight size={13} strokeWidth={2} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <ContactForm />
    </div>
  );
}
