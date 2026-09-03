"use client";

import React, { useState, useRef, useEffect } from "react";
import { LuxuryProduct } from "@/types/mercadito";
import { X, Download, Copy, Check, Sparkles, Sliders } from "lucide-react";

interface Props {
  product: LuxuryProduct;
  onClose: () => void;
}

export default function InstagramPostGeneratorModal({ product, onClose }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [template, setTemplate] = useState<"prelove" | "editorial">("prelove");

  // Precios y cálculo de retail estimado si no existe
  const estimatedRetail = Math.round(product.price * 1.35);

  // Estados editables en vivo
  const [title, setTitle] = useState("PRE-LOVE");
  const [subtitle, setSubtitle] = useState(
    product.ash_styling_tip ? `-${product.ash_styling_tip}-` : "-Perfecta para el día a día-"
  );
  const [retailPrice, setRetailPrice] = useState(estimatedRetail.toString());
  const [findingPrice, setFindingPrice] = useState(product.price.toString());
  const [condition, setCondition] = useState<string>(product.condition_state || "Excelente estado.");
  const [measurements, setMeasurements] = useState({
    depth: "17 cm",
    width: "33,5 cm",
    height: "27,5 cm",
    handle: "12 cm",
    strap: "55 cm",
  });

  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);

  // Renderizar en Canvas
  useEffect(() => {
    drawCanvas();
  }, [template, title, subtitle, retailPrice, findingPrice, condition, measurements, product]);

  const drawCanvas = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setGenerating(true);

    // Dimensiones estándar Instagram Feed (1080 x 1080 px en alta definición)
    const W = 1080;
    const H = 1080;
    canvas.width = W;
    canvas.height = H;

    // Cargar imagen principal y secundaria
    const loadImg = (url: string): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        const img = new window.Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = () => {
          const fallback = new window.Image();
          fallback.onload = () => resolve(fallback);
          fallback.onerror = reject;
          fallback.src = url;
        };
        img.src = url;
      });
    };

    let mainImg: HTMLImageElement | null = null;
    let secondaryImg: HTMLImageElement | null = null;

    try {
      mainImg = await loadImg(product.image_url);
      if (product.gallery_images && product.gallery_images.length > 1) {
        secondaryImg = await loadImg(product.gallery_images[1]);
      } else {
        secondaryImg = mainImg;
      }
    } catch (e) {
      console.warn("No se pudieron cargar todas las imágenes remotas con CORS:", e);
    }

    if (template === "prelove") {
      // -------------------------------------------------------------
      // PLANTILLA A: FICHA TÉCNICA PRE-LOVE (VERDE NEÓN)
      // -------------------------------------------------------------
      // Fondo blanco puro
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, W, H);

      // TÍTULO: PRE-LOVE (Impact Italic estilo revista)
      ctx.fillStyle = "#0A0A0A";
      ctx.font = "italic 900 86px 'Impact', 'Arial Black', sans-serif";
      ctx.letterSpacing = "2px";
      ctx.fillText(title.toUpperCase(), 140, 140);

      // SUBTÍTULO CURSIVO: -Frase de estilo-
      ctx.fillStyle = "#0A0A0A";
      ctx.font = "italic 400 38px 'Georgia', serif";
      ctx.fillText(subtitle, 340, 205);

      // RETAIL PRICE TACHADO
      if (retailPrice) {
        ctx.fillStyle = "#0A0A0A";
        ctx.font = "italic 900 36px 'Impact', 'Arial Black', sans-serif";
        const retailText = `Retail Price $${Number(retailPrice).toLocaleString("en-US")}.-`;
        ctx.fillText(retailText, 370, 290);
        
        // Línea de tachado
        const textWidth = ctx.measureText(retailText).width;
        ctx.strokeStyle = "#0A0A0A";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(370, 278);
        ctx.lineTo(370 + textWidth, 278);
        ctx.stroke();
      }

      // PRECIO HALLAZGO (CON HIGHLIGHT VERDE NEÓN)
      const findingText = `Precio Hallazgo $${Number(findingPrice).toLocaleString("en-US")}.-`;
      ctx.font = "italic 900 48px 'Impact', 'Arial Black', sans-serif";
      const findingMetrics = ctx.measureText(findingText);
      const tagW = findingMetrics.width + 24;
      const tagH = 58;

      // Resaltador verde neón
      ctx.fillStyle = "#00FF2A";
      ctx.fillRect(370, 310, tagW, tagH);

      // Texto de precio hallazgo
      ctx.fillStyle = "#0A0A0A";
      ctx.fillText(findingText, 382, 355);

      // MEDIDAS ALINEADAS A LA DERECHA/CENTRO
      ctx.fillStyle = "#0A0A0A";
      ctx.font = "900 25px 'Impact', 'Arial Black', sans-serif";
      ctx.textAlign = "right";
      let measureY = 420;
      const lineHeight = 34;

      if (measurements.depth) {
        ctx.fillText(`Profundidad: ${measurements.depth}`, 730, measureY);
        measureY += lineHeight;
      }
      if (measurements.width) {
        ctx.fillText(`Ancho: ${measurements.width}`, 730, measureY);
        measureY += lineHeight;
      }
      if (measurements.height) {
        ctx.fillText(`Altura: ${measurements.height}`, 730, measureY);
        measureY += lineHeight;
      }
      if (measurements.handle) {
        ctx.fillText(`Asa: ${measurements.handle}`, 730, measureY);
        measureY += lineHeight;
      }
      if (measurements.strap) {
        ctx.fillText(`Correa: ${measurements.strap}`, 730, measureY);
      }
      ctx.textAlign = "left"; // reset

      // BLOQUE DE CONDICIONES (CON FONDO VERDE NEÓN)
      ctx.fillStyle = "#00FF2A";
      ctx.fillRect(690, 620, 315, 38);

      ctx.fillStyle = "#0A0A0A";
      ctx.font = "900 24px 'Impact', 'Arial Black', sans-serif";
      ctx.fillText("CONDICIONES: Pre-Love.", 696, 647);

      ctx.fillStyle = "#0A0A0A";
      ctx.font = "900 26px 'Impact', 'Arial Black', sans-serif";
      ctx.fillText(condition, 690, 685);

      // IMAGEN SECUNDARIA (ÁNGULO / ARRIBA IZQUIERDA)
      if (secondaryImg) {
        try {
          ctx.save();
          const secW = 270;
          const secH = 290;
          ctx.drawImage(secondaryImg, 50, 180, secW, secH);
          ctx.restore();
        } catch (e) {
          console.warn("Fallo al dibujar imagen secundaria:", e);
        }
      }

      // IMAGEN PRINCIPAL PROTAGONISTA (CENTRO INFERIOR)
      if (mainImg) {
        try {
          ctx.save();
          const mainW = 500;
          const mainH = 460;
          const mainX = 140;
          const mainY = 510;
          ctx.drawImage(mainImg, mainX, mainY, mainW, mainH);
          ctx.restore();
        } catch (e) {
          console.warn("Fallo al dibujar imagen principal:", e);
        }
      }

      // TAG DE MARCA AL PIE
      ctx.fillStyle = "#7A6A5A";
      ctx.font = "italic 600 20px 'Georgia', serif";
      ctx.fillText("@elmercaditodeash", 140, 1020);

    } else {
      // -------------------------------------------------------------
      // PLANTILLA B: EDITORIAL TAPE STICKERS (DEL POST DE INSTAGRAM)
      // -------------------------------------------------------------
      // Fondo editorial crema/neutro
      ctx.fillStyle = "#F7F3EE";
      ctx.fillRect(0, 0, W, H);

      // Si hay imagen principal, dibujarla centrada
      if (mainImg) {
        try {
          ctx.drawImage(mainImg, 90, 140, 900, 800);
        } catch (e) {
          console.warn(e);
        }
      }

      // FUNCIÓN AUXILIAR PARA DIBUJAR CINTA / STICKER BLANCO
      const drawTapeText = (text: string, x: number, y: number, font: string, isBlackBg = false) => {
        ctx.font = font;
        const metrics = ctx.measureText(text);
        const padX = 18;
        const padY = 12;
        const bgW = metrics.width + padX * 2;
        const bgH = parseInt(font.match(/\d+px/)?.[0] || "36") + padY * 1.5;

        // Cinta de fondo con sombra sutil
        ctx.fillStyle = isBlackBg ? "#0A0A0A" : "#FFFFFF";
        ctx.shadowColor = "rgba(0,0,0,0.15)";
        ctx.shadowBlur = 10;
        ctx.shadowOffsetY = 4;
        ctx.fillRect(x, y - bgH + padY * 0.8, bgW, bgH);
        ctx.shadowColor = "transparent";

        // Texto
        ctx.fillStyle = isBlackBg ? "#FFFFFF" : "#0A0A0A";
        ctx.fillText(text, x + padX, y);
      };

      // TÍTULO CON STICKERS
      drawTapeText(product.designer.toUpperCase(), 80, 140, "italic 900 44px 'Impact', 'Arial Black', sans-serif");
      drawTapeText(product.name, 80, 210, "italic 900 36px 'Impact', 'Arial Black', sans-serif");

      // FRASE EDITORIAL DE ASH
      drawTapeText("“Voy por el mundo en busca de hallazgos...", 120, 840, "italic 400 34px 'Georgia', serif");
      drawTapeText(subtitle.replace(/-/g, ""), 120, 900, "italic 400 32px 'Georgia', serif");

      // PRECIO EN CINTA NEGRA
      const priceBadge = `PRECIO HALLAZGO: $${Number(findingPrice).toLocaleString("en-US")} USD`;
      drawTapeText(priceBadge, 120, 970, "900 30px 'Impact', sans-serif", true);

      // MARCA DE AGUA AL PIE DERECHO
      ctx.fillStyle = "#FFFFFF";
      drawTapeText("@elmercaditodeash", 680, 1020, "italic 600 24px 'Georgia', serif");
    }

    setGenerating(false);
  };

  // Descargar imagen generada
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `instagram-mercadito-${product.slug || "pieza"}.png`;
    link.href = canvas.toDataURL("image/png", 1.0);
    link.click();
  };

  // Copiar al portapapeles para pegar en WhatsApp / Telegram / Photoshop
  const handleCopyClipboard = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        await navigator.clipboard.write([
          new ClipboardItem({
            "image/png": blob,
          }),
        ]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }, "image/png");
    } catch (err) {
      console.warn("No se pudo copiar directo:", err);
      handleDownload();
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-8 overflow-y-auto">
      <div className="bg-[#F7F3EE] rounded-[2.5rem] border border-black/15 shadow-2xl max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* HEADER MODAL */}
        <div className="p-6 md:px-8 border-b border-black/10 flex items-center justify-between bg-white/60">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#7A6A5A]">
                EL MERCADITO DE ASH
              </span>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold tracking-wider uppercase bg-emerald-100 text-emerald-800">
                Instagram 1080 x 1080
              </span>
            </div>
            <h2 className="font-serif text-2xl text-[#0A0A0A]">
              Generador de Placas para Instagram
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center hover:bg-black/5 transition-colors"
          >
            <X className="w-5 h-5 text-[#0A0A0A]" />
          </button>
        </div>

        {/* CONTENIDO EN 2 COLUMNAS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 md:p-8 overflow-y-auto">
          
          {/* COLUMNA IZQUIERDA: CANVAS DE PREVISUALIZACIÓN */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            <div className="relative w-full aspect-square max-w-[480px] bg-white rounded-2xl shadow-xl overflow-hidden border border-black/10">
              <canvas
                ref={canvasRef}
                className="w-full h-full object-contain"
              />
              {generating && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-xs flex items-center justify-center text-xs text-[#7A6A5A]">
                  Renderizando placa...
                </div>
              )}
            </div>

            {/* BOTONES DE EXPORTACIÓN */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-6 w-full max-w-[480px]">
              <button
                type="button"
                onClick={handleDownload}
                className="flex-1 min-w-[200px] flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-[#0A0A0A] text-white text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#7A6A5A] transition-all shadow-lg active:scale-[0.98]"
              >
                <Download className="w-4 h-4" />
                <span>Descargar PNG (1080x1080)</span>
              </button>

              <button
                type="button"
                onClick={handleCopyClipboard}
                className="flex items-center justify-center gap-2 py-3 px-6 rounded-full border border-black/20 bg-white text-[#0A0A0A] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-black/5 transition-all active:scale-[0.98]"
                title="Copiar para pegar directo en WhatsApp o Telegram"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? "¡Copiada!" : "Copiar"}</span>
              </button>
            </div>
          </div>

          {/* COLUMNA DERECHA: CONTROLES EDITABLES */}
          <div className="lg:col-span-5 space-y-5 bg-white p-6 rounded-2xl border border-black/10 text-xs">
            <div>
              <label className="text-[10.5px] uppercase tracking-[0.2em] font-semibold text-[#7A6A5A] block mb-2">
                Plantilla Visual
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setTemplate("prelove")}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    template === "prelove"
                      ? "border-[#0A0A0A] bg-black/5 font-semibold text-[#0A0A0A]"
                      : "border-black/10 text-[#7A6A5A] hover:bg-black/[0.02]"
                  }`}
                >
                  <div className="text-[11px] font-bold">Ficha Pre-Love</div>
                  <div className="text-[9.5px] text-[#7A6A5A]">Verde neón + medidas</div>
                </button>

                <button
                  type="button"
                  onClick={() => setTemplate("editorial")}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    template === "editorial"
                      ? "border-[#0A0A0A] bg-black/5 font-semibold text-[#0A0A0A]"
                      : "border-black/10 text-[#7A6A5A] hover:bg-black/[0.02]"
                  }`}
                >
                  <div className="text-[11px] font-bold">Editorial Tape</div>
                  <div className="text-[9.5px] text-[#7A6A5A]">Cintas estilo post Ash</div>
                </button>
              </div>
            </div>

            {/* CAMPOS EDITABLES EN VIVO */}
            <div className="space-y-3 pt-2 border-t border-black/10">
              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#7A6A5A] block mb-1">
                  Título Superior
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 rounded-lg border border-black/15 bg-[#F7F3EE]/50 font-medium"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#7A6A5A] block mb-1">
                  Frase de Estilismo / Subtítulo
                </label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="w-full p-2 rounded-lg border border-black/15 bg-[#F7F3EE]/50 font-serif italic"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#7A6A5A] block mb-1">
                    Retail Tachado ($)
                  </label>
                  <input
                    type="number"
                    value={retailPrice}
                    onChange={(e) => setRetailPrice(e.target.value)}
                    className="w-full p-2 rounded-lg border border-black/15 bg-[#F7F3EE]/50 font-mono"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#7A6A5A] block mb-1">
                    Precio Hallazgo ($)
                  </label>
                  <input
                    type="number"
                    value={findingPrice}
                    onChange={(e) => setFindingPrice(e.target.value)}
                    className="w-full p-2 rounded-lg border border-black/15 bg-[#F7F3EE]/50 font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#7A6A5A] block mb-1">
                  Condición de la Pieza
                </label>
                <input
                  type="text"
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="w-full p-2 rounded-lg border border-black/15 bg-[#F7F3EE]/50 font-medium"
                />
              </div>

              {template === "prelove" && (
                <div className="space-y-2 pt-2 border-t border-black/10">
                  <span className="text-[10px] uppercase tracking-wider text-[#7A6A5A] block font-semibold">
                    Medidas Técnicas
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <span className="text-[9px] text-[#7A6A5A] block">Profundidad</span>
                      <input
                        type="text"
                        value={measurements.depth}
                        onChange={(e) => setMeasurements({ ...measurements, depth: e.target.value })}
                        className="w-full p-1.5 rounded border border-black/15 text-[11px]"
                      />
                    </div>
                    <div>
                      <span className="text-[9px] text-[#7A6A5A] block">Ancho</span>
                      <input
                        type="text"
                        value={measurements.width}
                        onChange={(e) => setMeasurements({ ...measurements, width: e.target.value })}
                        className="w-full p-1.5 rounded border border-black/15 text-[11px]"
                      />
                    </div>
                    <div>
                      <span className="text-[9px] text-[#7A6A5A] block">Altura</span>
                      <input
                        type="text"
                        value={measurements.height}
                        onChange={(e) => setMeasurements({ ...measurements, height: e.target.value })}
                        className="w-full p-1.5 rounded border border-black/15 text-[11px]"
                      />
                    </div>
                    <div>
                      <span className="text-[9px] text-[#7A6A5A] block">Asa</span>
                      <input
                        type="text"
                        value={measurements.handle}
                        onChange={(e) => setMeasurements({ ...measurements, handle: e.target.value })}
                        className="w-full p-1.5 rounded border border-black/15 text-[11px]"
                      />
                    </div>
                    <div>
                      <span className="text-[9px] text-[#7A6A5A] block">Correa</span>
                      <input
                        type="text"
                        value={measurements.strap}
                        onChange={(e) => setMeasurements({ ...measurements, strap: e.target.value })}
                        className="w-full p-1.5 rounded border border-black/15 text-[11px]"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-3 rounded-xl bg-[#F7F3EE] text-[11px] text-[#7A6A5A] leading-relaxed">
              ✦ <strong>Tip de Redes:</strong> La imagen se genera a <strong>1080 x 1080 px</strong> en PNG sin compresión, lista para publicar en el feed o historias de Instagram de <strong>@elmercaditodeash</strong>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
