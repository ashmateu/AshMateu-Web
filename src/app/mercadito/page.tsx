import React from "react";
import Image from "next/image";
import { getMercaditoProducts } from "@/lib/mercadito-data";
import MercaditoCatalog from "@/components/mercadito/MercaditoCatalog";
import { Sparkles, ShieldCheck, Gem, Compass } from "lucide-react";

export const metadata = {
  title: "El Mercadito de Ash — Curaduría Vintage & Luxury Pieces",
  description: "Piezas únicas de archivo y lujo curadas por Ash Mateu. Vintage y archivo exclusivo autenticado, bolsos de colección y sastrería de diseñador.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function MercaditoPage() {
  const products = await getMercaditoProducts();

  return (
    <main className="min-h-[100dvh] bg-[#F7F3EE] text-[#0A0A0A] pt-28 md:pt-36 pb-32">
      {/* 1. HERO EDITORIAL LUXURY */}
      <section className="relative max-w-[1440px] mx-auto px-6 md:px-12 mb-16 md:mb-24 overflow-hidden rounded-3xl pt-8 pb-4">
        {/* FOTO B&W DE ASH BUSCANDO ROPA EN EL FONDO CON MÁSCARA EDITORIAL */}
        <div
          className="absolute top-0 right-0 w-full lg:w-[58%] h-full pointer-events-none z-0"
          style={{
            backgroundImage: "url('/images/ash/bts-set.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center 25%",
            filter: "grayscale(100%) contrast(115%) brightness(98%)",
            opacity: 0.42,
            maskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.25) 15%, rgba(0,0,0,0.85) 55%, rgba(0,0,0,1) 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.25) 15%, rgba(0,0,0,0.85) 55%, rgba(0,0,0,1) 100%)",
          }}
        />

        <div className="relative z-10">
          {/* Eyebrow badge */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[10.5px] uppercase tracking-[0.25em] font-semibold bg-white/80 backdrop-blur-sm border border-black/10 text-[#7A6A5A] shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EA2638]" />
              ARCHIVO EXCLUSIVO • PIEZAS 1 DE 1
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-black/10 pb-12">
            <div className="lg:col-span-8 space-y-6">
              <h1 className="font-serif text-[clamp(44px,6.5vw,92px)] leading-[0.94] tracking-[-0.02em] text-[#0A0A0A] font-normal">
                El Mercadito <br />
                <em className="italic font-light text-[#7A6A5A]">de Ash</em>
                <span className="text-[#EA2638] font-serif">.</span>
              </h1>
              
              <p className="max-w-2xl text-[16px] md:text-[18px] text-[#0A0A0A] font-light leading-relaxed">
                Un espacio de hallazgos, tesoros y oportunidades curados bajo mi expertise de estilista. 
                Colecciono por el mundo{" "}
                <span className="bg-[#EA2638] text-white px-2 py-0.5 rounded-sm font-medium inline-block">
                  piezas capaces de darle un subidón
                </span>{" "}
                a cualquier vestidor. Cuentan conmigo para armar el styling juntas.
              </p>

              {/* MANIFIESTO EDITORIAL ESTILO TAPE STICKERS */}
              <div className="inline-flex flex-col items-start gap-1.5 pt-2">
                <span className="bg-white/95 backdrop-blur-xs px-3 py-1 text-xs md:text-sm font-serif italic text-[#0A0A0A] shadow-xs border border-black/5">
                  “Voy por el mundo en busca de hallazgos...
                </span>
                <span className="bg-white/95 backdrop-blur-xs px-3 py-1 text-xs md:text-sm font-serif italic text-[#0A0A0A] shadow-xs border border-black/5">
                  Me aventuro tras prendas capaces de dar un subidón de identidad a quienes se animen.
                </span>
                <span className="bg-[#EA2638] px-3.5 py-1.5 text-[11px] md:text-xs font-sans font-semibold uppercase tracking-[0.2em] text-white shadow-sm">
                  El Mercadito de Ash propone un consumo de moda más estratégico y personal.”
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 text-xs tracking-[0.16em] uppercase text-[#7A6A5A]">
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/85 backdrop-blur-md border border-black/[0.06] shadow-xs">
                <div className="w-5 h-5 rounded-full bg-[#EA2638] text-white flex items-center justify-center text-[10px] font-bold shrink-0">✓</div>
                <span>Autenticidad Verificada · Peritaje de Lujo</span>
              </div>
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/85 backdrop-blur-md border border-black/[0.06] shadow-xs">
                <div className="w-5 h-5 rounded-full bg-[#EA2638] text-white flex items-center justify-center text-[10px] font-bold shrink-0">✦</div>
                <span>Inventario Único 1 de 1 por Pedido</span>
              </div>
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/85 backdrop-blur-md border border-black/[0.06] shadow-xs">
                <div className="w-5 h-5 rounded-full bg-[#EA2638] text-white flex items-center justify-center text-[10px] font-bold shrink-0">⚡</div>
                <span>Checkout Directo + WhatsApp Concierge</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATÁLOGO INTERACTIVO CON FILTROS Y DOUBLE-BEZEL CARDS */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12">
        <MercaditoCatalog initialProducts={products} />
      </section>

      {/* 3. SECCIÓN HOW IT WORKS / CONCIERGE EXPLAINER (Awwwards-Tier) */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 mt-32">
        <div className="p-2 md:p-3 rounded-[2.5rem] bg-black/[0.03] border border-black/10">
          <div className="p-8 md:p-16 rounded-[2rem] bg-white border border-black/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]">
            <div className="max-w-xl mb-12">
              <span className="text-[10.5px] uppercase tracking-[0.25em] text-[#7A6A5A] font-medium block mb-3">
                METODOLOGÍA DE ADQUISICIÓN
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-normal tracking-tight text-[#0A0A0A]">
                ¿Cómo funciona la reserva de piezas únicas?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              <div className="space-y-4">
                <span className="font-serif text-4xl text-[#B5A898]">01</span>
                <h3 className="text-base font-medium tracking-wide uppercase">Selección & Reserva Online</h3>
                <p className="text-sm text-[#0A0A0A]/70 leading-relaxed font-light">
                  Elegís tu pieza de archivo en El Mercadito y completás el checkout directo en la web. Al ser 1 de 1, el producto se reserva inmediatamente a tu nombre.
                </p>
              </div>

              <div className="space-y-4">
                <span className="font-serif text-4xl text-[#B5A898]">02</span>
                <h3 className="text-base font-medium tracking-wide uppercase">Confirmación Personalizada</h3>
                <p className="text-sm text-[#0A0A0A]/70 leading-relaxed font-light">
                  Te conectamos en un click con el Concierge exclusivo de Ash vía WhatsApp para coordinar método de pago preferido, facturación y seguro de envío internacional.
                </p>
              </div>

              <div className="space-y-4">
                <span className="font-serif text-4xl text-[#B5A898]">03</span>
                <h3 className="text-base font-medium tracking-wide uppercase">Inspección & Entrega</h3>
                <p className="text-sm text-[#0A0A0A]/70 leading-relaxed font-light">
                  La prenda es inspeccionada minuciosamente por peritos de autenticación de lujo y entregada en tu puerta con packaging de alta gama y asesoramiento de estilismo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
