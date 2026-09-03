import React from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, ExternalLink, Bookmark, Puzzle, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Importador The RealReal — El Mercadito de Ash",
  description: "Instrucciones y extensión para importar piezas a El Mercadito de Ash.",
};

export default function ImportadorPage() {
  return (
    <main className="min-h-[100dvh] bg-[#F7F3EE] text-[#0A0A0A] pt-32 md:pt-40 pb-32 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            href="/mercadito"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#7A6A5A] hover:text-[#0A0A0A] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver a El Mercadito</span>
          </Link>
        </div>

        {/* HEADER */}
        <div className="border-b border-black/10 pb-8 mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.25em] font-semibold bg-black/[0.04] border border-black/10 text-[#7A6A5A]">
              <Sparkles className="w-3 h-3 text-[#B5A898]" />
              HERRAMIENTA DE CURADURÍA
            </span>
          </div>
          <h1 className="font-serif text-3xl md:text-5xl font-normal tracking-tight text-[#0A0A0A] mb-4">
            Cómo importar piezas desde The RealReal
          </h1>
          <p className="text-sm md:text-base text-[#7A6A5A] leading-relaxed max-w-2xl font-light">
            Tenés la mini-extensión para Brave / Chrome. Te coloca un botón directo dentro de The RealReal para publicar en la web de Ash en 3 segundos.
          </p>
        </div>

        {/* OPCIÓN RECOMENDADA: EXTENSIÓN DE BRAVE / CHROME */}
        <div className="p-3 rounded-[2.5rem] bg-black/[0.02] border border-black/10 mb-12">
          <div className="p-8 md:p-12 rounded-[calc(2.5rem-0.75rem)] bg-white border border-black/[0.06] shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-serif text-lg">
                <Puzzle className="w-5 h-5 text-[#B5A898]" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#B5A898] block">
                  OPCIÓN RECOMENDADA (INFALIBLE)
                </span>
                <h2 className="font-serif text-2xl text-[#0A0A0A]">
                  Instalar la Extensión de Brave / Chrome
                </h2>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#7A6A5A] leading-relaxed">
              Brave y Chrome bloquean scripts de favoritos por seguridad interna (CSP) en sitios grandes como The RealReal. 
              Por eso creamos una extensión nativa que vive en tu carpeta <strong>ashmateu-web/extension-trr</strong>.
            </p>

            <div className="space-y-4 pt-2 border-t border-black/10 text-xs">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-black/[0.05] flex items-center justify-center font-mono font-bold shrink-0">1</span>
                <div>
                  <strong className="text-[#0A0A0A] block">Abrí las extensiones de tu navegador</strong>
                  <span className="text-[#7A6A5A]">
                    En una pestaña nueva de Brave o Chrome, escribí: <code className="px-1.5 py-0.5 rounded bg-black/5 font-mono text-[11px]">brave://extensions</code> (o <code className="px-1.5 py-0.5 rounded bg-black/5 font-mono text-[11px]">chrome://extensions</code>).
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-black/[0.05] flex items-center justify-center font-mono font-bold shrink-0">2</span>
                <div>
                  <strong className="text-[#0A0A0A] block">Activá el "Modo de desarrollador"</strong>
                  <span className="text-[#7A6A5A]">
                    Es la palanca que está arriba a la derecha de la pantalla de extensiones.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-black/[0.05] flex items-center justify-center font-mono font-bold shrink-0">3</span>
                <div>
                  <strong className="text-[#0A0A0A] block">Click en "Cargar descomprimida" (Load unpacked)</strong>
                  <span className="text-[#7A6A5A]">
                    Apretá el botón que aparece arriba a la izquierda y seleccioná la carpeta:
                    <br />
                    <code className="inline-block mt-1 px-2 py-1 rounded bg-black/5 font-mono text-[11px] text-[#0A0A0A]">
                      /Users/mariano_rosso/Downloads/ashmateu-web/extension-trr
                    </code>
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-black/[0.05] flex items-center justify-center font-mono font-bold shrink-0">4</span>
                <div>
                  <strong className="text-[#0A0A0A] block">¡Listo! Andá a The RealReal</strong>
                  <span className="text-[#7A6A5A]">
                    Entrá a cualquier producto en <a href="https://www.therealreal.com" target="_blank" rel="noopener noreferrer" className="underline text-[#0A0A0A]">therealreal.com</a>. Vas a ver un botón flotante abajo a la derecha: <strong>"✦ Publicar en El Mercadito"</strong>. Al clickearlo, extrae todo al instante y lo publica.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ACCESO RÁPIDO A MERCADITO */}
        <div className="p-6 rounded-2xl bg-black text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-serif text-lg text-white">Ir a El Mercadito</h4>
            <p className="text-xs text-white/70">Ver el catálogo actual de piezas curadas.</p>
          </div>
          <Link
            href="/mercadito"
            className="px-6 py-3 rounded-full bg-white text-black text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#B5A898] transition-colors shrink-0"
          >
            Ver El Mercadito ↗
          </Link>
        </div>
      </div>
    </main>
  );
}
