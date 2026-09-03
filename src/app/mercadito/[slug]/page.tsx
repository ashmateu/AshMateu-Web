import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, getMercaditoProducts } from "@/lib/mercadito-data";
import ProductGallery from "@/components/mercadito/ProductGallery";
import { 
  ArrowLeft, 
  ArrowUpRight, 
  ShieldCheck, 
  Compass, 
  Sparkles, 
  Package, 
  CheckCircle2, 
  ExternalLink 
} from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await getMercaditoProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const isSold = product.status === "sold";
  const isReserved = product.status === "reserved";

  return (
    <main className="min-h-[100dvh] bg-[#F7F3EE] text-[#0A0A0A] pt-28 md:pt-36 pb-32">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* BREADCRUMB VOLVER */}
        <div className="mb-8">
          <Link
            href="/mercadito"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#7A6A5A] hover:text-[#0A0A0A] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver a El Mercadito</span>
          </Link>
        </div>

        {/* LAYOUT EDITORIAL DOS COLUMNAS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* COLUMNA IZQUIERDA: GALERÍA FOTOGRÁFICA INTERACTIVA */}
          <div className="lg:col-span-7">
            <ProductGallery
              images={product.gallery_images}
              productName={product.name}
            />
          </div>

          {/* COLUMNA DERECHA: FICHA EDITORIAL Y CHECKOUT */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* CABECERA */}
            <div className="border-b border-black/10 pb-6">
              <div className="flex items-center justify-between gap-4 mb-3">
                <span className="text-[11px] uppercase tracking-[0.3em] font-semibold text-[#7A6A5A]">
                  {product.designer}
                </span>

                <span className="px-3 py-1 rounded-full text-[9.5px] uppercase tracking-[0.2em] font-semibold bg-black/[0.05] border border-black/10 text-[#0A0A0A]">
                  Pieza Única 1/1
                </span>
              </div>

              <h1 className="font-serif text-3xl md:text-4xl lg:text-[42px] font-normal leading-[1.08] tracking-tight text-[#0A0A0A] mb-4">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-3">
                <span className="font-serif text-3xl md:text-4xl text-[#0A0A0A]">
                  ${product.price.toLocaleString("en-US")}
                </span>
                <span className="text-sm font-sans uppercase tracking-widest text-[#7A6A5A]">
                  {product.currency}
                </span>
                <span className="text-xs text-[#7A6A5A] ml-2 font-light">
                  (Incluye curaduría & gestión aduanera)
                </span>
              </div>
            </div>

            {/* BOTÓN CTA CHECKOUT DIRECTO */}
            <div>
              {isSold ? (
                <div className="p-4 rounded-2xl bg-black/5 text-center text-xs uppercase tracking-[0.2em] text-[#7A6A5A] font-medium">
                  Esta pieza ya fue adquirida por otro coleccionista
                </div>
              ) : isReserved ? (
                <div className="p-4 rounded-2xl bg-[#B5A898]/20 border border-[#B5A898]/40 text-center text-xs uppercase tracking-[0.2em] text-[#0A0A0A] font-medium">
                  Pieza actualmente en proceso de reserva
                </div>
              ) : (
                <Link
                  href={`/mercadito/checkout?pieza=${product.slug}`}
                  className="group w-full flex items-center justify-between pl-8 pr-2 py-2 rounded-full bg-[#0A0A0A] text-white text-xs uppercase tracking-[0.24em] font-medium transition-all duration-300 hover:bg-[#7A6A5A] active:scale-[0.98] shadow-lg shadow-black/10"
                >
                  <span>Reservar & Adquirir Pieza</span>
                  <span className="w-11 h-11 rounded-full bg-white/15 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">
                    <ArrowUpRight className="w-5 h-5 text-white" />
                  </span>
                </Link>
              )}

              <p className="text-[11px] text-[#7A6A5A] text-center mt-3 tracking-wide">
                Al confirmar, se bloquea la pieza para ti y nos contactamos por WhatsApp para finalizar.
              </p>
            </div>

            {/* ASH'S STYLING TIP (Awwwards / Agency Box) */}
            {product.ash_styling_tip && (
              <div className="p-2 rounded-[2rem] bg-black/[0.02] border border-black/10">
                <div className="p-6 rounded-[calc(2rem-0.5rem)] bg-[#FBF8F4] border border-black/[0.04]">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#B5A898]" />
                    <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#7A6A5A]">
                      Styling Note by Ash Mateu
                    </span>
                  </div>
                  <p className="font-serif italic text-[15px] text-[#0A0A0A]/90 leading-relaxed">
                    “{product.ash_styling_tip}”
                  </p>
                </div>
              </div>
            )}

            {/* FICHA TÉCNICA DE COLECCIÓN */}
            <div className="space-y-4 pt-2 border-t border-black/10">
              <h3 className="text-xs uppercase tracking-[0.22em] font-semibold text-[#0A0A0A]">
                Especificaciones de la Pieza
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-white/70 border border-black/[0.06]">
                  <span className="text-[10px] uppercase tracking-[0.16em] text-[#7A6A5A] block mb-1">
                    Condición
                  </span>
                  <span className="font-medium text-[#0A0A0A]">
                    {product.condition_state}
                  </span>
                </div>

                {product.dimensions && (
                  <div className="p-4 rounded-xl bg-white/70 border border-black/[0.06]">
                    <span className="text-[10px] uppercase tracking-[0.16em] text-[#7A6A5A] block mb-1">
                      Medidas
                    </span>
                    <span className="font-medium text-[#0A0A0A]">
                      {product.dimensions}
                    </span>
                  </div>
                )}

                {product.materials && (
                  <div className="sm:col-span-2 p-4 rounded-xl bg-white/70 border border-black/[0.06]">
                    <span className="text-[10px] uppercase tracking-[0.16em] text-[#7A6A5A] block mb-1">
                      Materiales & Herrajes
                    </span>
                    <span className="font-medium text-[#0A0A0A]">
                      {product.materials}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* DESCRIPCIÓN EDITORIAL */}
            {product.description && (
              <div className="pt-2">
                <h3 className="text-xs uppercase tracking-[0.22em] font-semibold text-[#0A0A0A] mb-2">
                  Detalle & Archivo
                </h3>
                <p className="text-xs sm:text-[13px] text-[#0A0A0A]/80 leading-relaxed font-light">
                  {product.description}
                </p>
              </div>
            )}

            {/* GARANTÍAS DE AUTENTICIDAD */}
            <div className="p-5 rounded-2xl bg-white border border-black/10 space-y-3 text-xs text-[#7A6A5A]">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-[#B5A898] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#0A0A0A]">Autenticidad Garantizada:</strong> Peritada por especialistas en archivo y tasadores de lujo internacional.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Package className="w-4 h-4 text-[#B5A898] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#0A0A0A]">Despacho Asegurado:</strong> Entrega puerta a puerta con embalaje de alta gama y seguro integral.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
