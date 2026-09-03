"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, ArrowUpRight, Sparkles, Loader2, Camera } from "lucide-react";
import InstagramPostGeneratorModal from "@/components/admin/InstagramPostGeneratorModal";

export default function GuardarPiezaPage() {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [showInstagramModal, setShowInstagramModal] = useState(false);

  useEffect(() => {
    async function processImport() {
      try {
        // 1. Obtener datos del hash (#data=...)
        const hash = window.location.hash;
        if (!hash.includes("data=")) {
          setError("No se encontraron datos de la pieza para guardar.");
          setLoading(false);
          return;
        }

        const jsonStr = decodeURIComponent(hash.replace("#data=", ""));
        const payload = JSON.parse(jsonStr);

        // 2. Enviar a la API local (mismo dominio, jamás bloqueado por CORS)
        const res = await fetch("/api/mercadito/import", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (res.ok && data.success) {
          setProduct(data.product);
          setLoading(false);
        } else {
          setError(data.error || "No se pudo guardar la pieza.");
          setLoading(false);
        }
      } catch (err: any) {
        console.error(err);
        setError("Error al procesar la información de la pieza.");
        setLoading(false);
      }
    }

    processImport();
  }, []);

  return (
    <main className="min-h-[100dvh] bg-[#F7F3EE] text-[#0A0A0A] pt-32 md:pt-40 pb-32 px-6 md:px-12 flex items-center justify-center">
      <div className="max-w-xl w-full">
        <div className="p-3 md:p-4 rounded-[3rem] bg-black/[0.02] border border-black/10">
          <div className="p-8 md:p-12 rounded-[calc(3rem-0.75rem)] bg-white border border-black/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] text-center flex flex-col items-center">
            
            {loading ? (
              <div className="py-12 flex flex-col items-center gap-4">
                <Loader2 className="w-10 h-10 text-[#B5A898] animate-spin" />
                <span className="text-xs uppercase tracking-[0.24em] text-[#7A6A5A]">
                  Guardando pieza en El Mercadito...
                </span>
              </div>
            ) : error ? (
              <div className="py-6 space-y-4">
                <div className="w-14 h-14 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto text-2xl font-serif">
                  !
                </div>
                <h2 className="font-serif text-2xl text-[#0A0A0A]">Detalle en la importación</h2>
                <p className="text-xs text-[#7A6A5A]">{error}</p>
                <Link
                  href="/mercadito"
                  className="inline-block mt-4 text-xs uppercase tracking-[0.2em] text-[#0A0A0A] underline"
                >
                  Volver a El Mercadito
                </Link>
              </div>
            ) : (
              <div className="flex flex-col items-center w-full">
                <div className="w-16 h-16 rounded-full bg-black/[0.03] border border-black/10 flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-8 h-8 text-[#B5A898]" />
                </div>

                <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#7A6A5A] mb-2">
                  CURADURÍA COMPLETADA
                </span>

                <h1 className="font-serif text-3xl md:text-4xl font-normal text-[#0A0A0A] mb-4">
                  ¡Pieza publicada con éxito!
                </h1>

                {product && (
                  <div className="w-full text-left p-5 rounded-2xl bg-[#F7F3EE] border border-black/10 text-xs my-6 flex gap-4 items-center">
                    {product.image_url && (
                      <div className="relative w-16 h-20 rounded-lg overflow-hidden bg-black/5 shrink-0">
                        <Image
                          src={product.image_url}
                          alt={product.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#7A6A5A] block">
                        {product.designer}
                      </span>
                      <strong className="font-serif text-base text-[#0A0A0A] block">
                        {product.name}
                      </strong>
                      <span className="text-xs text-[#0A0A0A] font-medium mt-1 block">
                        ${Number(product.price).toLocaleString("en-US")} {product.currency}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-3 w-full">
                  <button
                    type="button"
                    onClick={() => setShowInstagramModal(true)}
                    className="w-full py-3.5 px-6 rounded-full bg-[#00FF2A] hover:bg-[#00E626] text-[#0A0A0A] text-xs uppercase tracking-[0.2em] font-bold transition-all flex items-center justify-center gap-2 shadow-md active:scale-[0.98]"
                  >
                    <Camera className="w-4 h-4" />
                    <span>📸 Generar Placa de Instagram (1080x1080)</span>
                  </button>

                  <div className="flex flex-col sm:flex-row gap-3 w-full">
                    <Link
                      href={`/mercadito/${product?.slug || ""}`}
                      className="flex-1 py-3 px-6 rounded-full bg-[#0A0A0A] text-white text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#7A6A5A] transition-colors flex items-center justify-center gap-2"
                    >
                      <span>Ver Ficha en la Web</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>

                    <Link
                      href="/mercadito"
                      className="flex-1 py-3 px-6 rounded-full border border-black/15 text-xs uppercase tracking-[0.2em] font-semibold hover:bg-black/5 transition-colors flex items-center justify-center"
                    >
                      Ir al Catálogo
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODAL GENERADOR DE INSTAGRAM TRAS IMPORTAR */}
      {showInstagramModal && product && (
        <InstagramPostGeneratorModal
          product={product}
          onClose={() => setShowInstagramModal(false)}
        />
      )}
    </main>
  );
}
