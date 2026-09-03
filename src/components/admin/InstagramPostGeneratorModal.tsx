"use client";

import React, { useState, useRef, useEffect } from "react";
import { LuxuryProduct } from "@/types/mercadito";
import { X, Download, Copy, Check, Sliders, RefreshCw } from "lucide-react";

interface Props {
  product: LuxuryProduct;
  onClose: () => void;
}

export default function InstagramPostGeneratorModal({ product, onClose }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [template, setTemplate] = useState<"prelove" | "editorial">("prelove");
  const [format, setFormat] = useState<"square" | "story">("square"); // square = 1080x1080, story = 1080x1350

  // Precios y cálculo de retail estimado
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

  // Ajustes de encuadre y zoom de la foto
  const [productScale, setProductScale] = useState<number>(100); // 70% a 130%
  const [productOffsetY, setProductOffsetY] = useState<number>(0); // -80px a +80px

  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);

  // Renderizar en Canvas
  useEffect(() => {
    drawCanvas();
  }, [
    template,
    format,
    title,
    subtitle,
    retailPrice,
    findingPrice,
    condition,
    measurements,
    productScale,
    productOffsetY,
    product,
  ]);

  const drawCanvas = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setGenerating(true);

    // Dimensiones según formato
    const W = 1080;
    const H = format === "square" ? 1080 : 1350;
    canvas.width = W;
    canvas.height = H;

    // Cargar imagen con proxy local para asegurar que el canvas no quede tainted
    const loadImg = (url: string): Promise<HTMLImageElement> => {
      return new Promise((resolve) => {
        const proxiedUrl = url.startsWith("http")
          ? `/api/proxy-image?url=${encodeURIComponent(url)}`
          : url;

        const img = new window.Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = () => {
          const fallback = new window.Image();
          fallback.crossOrigin = "anonymous";
          fallback.onload = () => resolve(fallback);
          fallback.onerror = () => resolve(fallback);
          fallback.src = url;
        };
        img.src = proxiedUrl;
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
      console.warn("Error al cargar fotos:", e);
    }

    // =========================================================================
    // FUNCIÓN INFALIBLE: DIBUJA LA IMAGEN CONSERVANDO SU ASPECT RATIO REAL
    // =========================================================================
    const drawImageProportional = (
      img: HTMLImageElement,
      targetBoxX: number,
      targetBoxY: number,
      targetBoxW: number,
      targetBoxH: number,
      scalePercent: number = 100,
      offsetYPx: number = 0
    ) => {
      const nw = img.naturalWidth || img.width;
      const nh = img.naturalHeight || img.height;
      if (!nw || !nh) {
        ctx.drawImage(img, targetBoxX, targetBoxY, targetBoxW, targetBoxH);
        return;
      }

      // Relación de aspecto natural de la fotografía
      const imgRatio = nw / nh;
      const boxRatio = targetBoxW / targetBoxH;

      let drawW = targetBoxW;
      let drawH = targetBoxH;
      let offX = 0;
      let offY = 0;

      if (imgRatio > boxRatio) {
        // La foto es más apaisada: ajustar por ancho
        drawW = targetBoxW;
        drawH = targetBoxW / imgRatio;
        offY = (targetBoxH - drawH) / 2;
      } else {
        // La foto es más vertical: ajustar por alto
        drawH = targetBoxH;
        drawW = targetBoxH * imgRatio;
        offX = (targetBoxW - drawW) / 2;
      }

      // Aplicar factor de escala manual de usuario (zoom centrado)
      const scale = scalePercent / 100;
      const finalW = drawW * scale;
      const finalH = drawH * scale;
      const centerOffsetX = (drawW - finalW) / 2;
      const centerOffsetY = (drawH - finalH) / 2;

      ctx.drawImage(
        img,
        targetBoxX + offX + centerOffsetX,
        targetBoxY + offY + centerOffsetY + offsetYPx,
        finalW,
        finalH
      );
    };

    if (template === "prelove") {
      // -----------------------------------------------------------------------
      // PLANTILLA A: FICHA TÉCNICA PRE-LOVE (VERDE NEÓN)
      // -----------------------------------------------------------------------
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, W, H);

      // 1. TÍTULO: PRE-LOVE (Impact Italic estilo revista)
      ctx.fillStyle = "#0A0A0A";
      ctx.font = "italic 900 92px 'Impact', 'Arial Black', sans-serif";
      ctx.letterSpacing = "2px";
      ctx.fillText(title.toUpperCase(), 140, 135);

      // 2. SUBTÍTULO: -Frase en cursiva-
      ctx.fillStyle = "#0A0A0A";
      ctx.font = "italic 400 38px 'Georgia', serif";
      ctx.fillText(subtitle, 340, 205);

      // 3. RETAIL PRICE TACHADO
      if (retailPrice) {
        ctx.fillStyle = "#0A0A0A";
        ctx.font = "italic 900 36px 'Impact', 'Arial Black', sans-serif";
        const retailText = `Retail Price $${Number(retailPrice).toLocaleString("en-US")}.-`;
        ctx.fillText(retailText, 360, 285);

        // Línea de tachado
        const textWidth = ctx.measureText(retailText).width;
        ctx.strokeStyle = "#0A0A0A";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(360, 273);
        ctx.lineTo(360 + textWidth, 273);
        ctx.stroke();
      }

      // 4. PRECIO HALLAZGO (CON HIGHLIGHT VERDE NEÓN)
      const findingText = `Precio Hallazgo $${Number(findingPrice).toLocaleString("en-US")}.-`;
      ctx.font = "italic 900 48px 'Impact', 'Arial Black', sans-serif";
      const findingMetrics = ctx.measureText(findingText);
      const tagW = findingMetrics.width + 24;
      const tagH = 58;

      ctx.fillStyle = "#00FF2A";
      ctx.fillRect(360, 305, tagW, tagH);

      ctx.fillStyle = "#0A0A0A";
      ctx.fillText(findingText, 372, 350);

      // 5. MEDIDAS TÉCNICAS (COLUMNA DERECHA)
      ctx.fillStyle = "#0A0A0A";
      ctx.font = "900 24px 'Impact', 'Arial Black', sans-serif";
      ctx.textAlign = "right";
      let measureY = 410;
      const lineHeight = 33;

      if (measurements.depth) {
        ctx.fillText(`Profundidad: ${measurements.depth}`, 740, measureY);
        measureY += lineHeight;
      }
      if (measurements.width) {
        ctx.fillText(`Ancho: ${measurements.width}`, 740, measureY);
        measureY += lineHeight;
      }
      if (measurements.height) {
        ctx.fillText(`Altura: ${measurements.height}`, 740, measureY);
        measureY += lineHeight;
      }
      if (measurements.handle) {
        ctx.fillText(`Asa: ${measurements.handle}`, 740, measureY);
        measureY += lineHeight;
      }
      if (measurements.strap) {
        ctx.fillText(`Correa: ${measurements.strap}`, 740, measureY);
      }
      ctx.textAlign = "left"; // reset

      // 6. BLOQUE DE CONDICIONES (CON FONDO VERDE NEÓN)
      ctx.fillStyle = "#00FF2A";
      ctx.fillRect(700, 610, 315, 38);

      ctx.fillStyle = "#0A0A0A";
      ctx.font = "900 23px 'Impact', 'Arial Black', sans-serif";
      ctx.fillText("CONDICIONES: Pre-Love.", 708, 636);

      ctx.fillStyle = "#0A0A0A";
      ctx.font = "900 25px 'Impact', 'Arial Black', sans-serif";
      ctx.fillText(condition, 700, 675);

      // 7. FOTO SECUNDARIA (ÁNGULO / ARRIBA IZQUIERDA) - PROPORCIONAL
      if (secondaryImg) {
        drawImageProportional(secondaryImg, 45, 175, 290, 290, 100, 0);
      }

      // 8. FOTO PRINCIPAL PROTAGONISTA (CENTRO-INFERIOR) - PROPORCIONAL
      if (mainImg) {
        // Área rectangular de dibujo donde la foto se escala perfectamente sin recortarse
        drawImageProportional(mainImg, 80, 480, 580, 520, productScale, productOffsetY);
      }

      // 9. TAG DE MARCA
      ctx.fillStyle = "#7A6A5A";
      ctx.font = "italic 600 22px 'Georgia', serif";
      ctx.fillText("@elmercaditodeash", 140, format === "square" ? 1030 : 1300);

    } else {
      // -----------------------------------------------------------------------
      // PLANTILLA B: EDITORIAL TAPE STICKERS (DEL POST DE INSTAGRAM)
      // -----------------------------------------------------------------------
      ctx.fillStyle = "#F7F3EE";
      ctx.fillRect(0, 0, W, H);

      // Foto principal a pantalla completa / enmarcada con proporciones reales
      if (mainImg) {
        drawImageProportional(mainImg, 80, 100, 920, H - 240, productScale, productOffsetY);
      }

      // Función de cinta blanca editorial
      const drawTapeText = (text: string, x: number, y: number, font: string, isBlackBg = false) => {
        ctx.font = font;
        const metrics = ctx.measureText(text);
        const padX = 18;
        const padY = 12;
        const bgW = metrics.width + padX * 2;
        const bgH = parseInt(font.match(/\d+px/)?.[0] || "36") + padY * 1.5;

        ctx.fillStyle = isBlackBg ? "#0A0A0A" : "#FFFFFF";
        ctx.shadowColor = "rgba(0,0,0,0.15)";
        ctx.shadowBlur = 10;
        ctx.shadowOffsetY = 4;
        ctx.fillRect(x, y - bgH + padY * 0.8, bgW, bgH);
        ctx.shadowColor = "transparent";

        ctx.fillStyle = isBlackBg ? "#FFFFFF" : "#0A0A0A";
        ctx.fillText(text, x + padX, y);
      };

      // TÍTULOS EN PASTILLAS BLANCAS
      drawTapeText(product.designer.toUpperCase(), 80, 140, "italic 900 44px 'Impact', 'Arial Black', sans-serif");
      drawTapeText(product.name, 80, 210, "italic 900 36px 'Impact', 'Arial Black', sans-serif");

      // FRASE EDITORIAL
      const bottomY = format === "square" ? 860 : 1100;
      drawTapeText("“Voy por el mundo en busca de hallazgos...", 100, bottomY, "italic 400 34px 'Georgia', serif");
      drawTapeText(subtitle.replace(/-/g, ""), 100, bottomY + 60, "italic 400 32px 'Georgia', serif");

      const priceBadge = `PRECIO HALLAZGO: $${Number(findingPrice).toLocaleString("en-US")} USD`;
      drawTapeText(priceBadge, 100, bottomY + 130, "900 30px 'Impact', sans-serif", true);

      drawTapeText("@elmercaditodeash", 680, bottomY + 130, "italic 600 24px 'Georgia', serif");
    }

    setGenerating(false);
  };

  // Descargar imagen generada
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      // 1. Intentar con toBlob (más seguro y sin límites de memoria)
      canvas.toBlob((blob) => {
        if (!blob) {
          // Fallback a toDataURL si toBlob no devolviera blob
          const dataUrl = canvas.toDataURL("image/png", 1.0);
          const link = document.createElement("a");
          link.download = `instagram-${product.slug || "pieza"}.png`;
          link.href = dataUrl;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          return;
        }

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = `instagram-${product.slug || "pieza"}.png`;
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      }, "image/png");
    } catch (err) {
      console.warn("Error en toBlob, intentando toDataURL:", err);
      try {
        const dataUrl = canvas.toDataURL("image/png", 1.0);
        const link = document.createElement("a");
        link.download = `instagram-${product.slug || "pieza"}.png`;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (innerErr) {
        console.error("Error crítico al descargar imagen:", innerErr);
        alert("No se pudo exportar la imagen. Por favor tomale una captura de pantalla a la vista previa.");
      }
    }
  };

  // Copiar al portapapeles
  const handleCopyClipboard = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      canvas.toBlob(async (blob) => {
        if (!blob) {
          handleDownload();
          return;
        }
        try {
          if (navigator.clipboard && window.ClipboardItem) {
            await navigator.clipboard.write([
              new ClipboardItem({
                "image/png": blob,
              }),
            ]);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
          } else {
            handleDownload();
          }
        } catch (clipErr) {
          console.warn("Clipboard API bloqueada o sin permisos, descargando archivo:", clipErr);
          handleDownload();
        }
      }, "image/png");
    } catch (err) {
      console.warn("Error al copiar canvas, descargando archivo:", err);
      handleDownload();
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-8 overflow-y-auto">
      <div className="bg-[#F7F3EE] rounded-[2.5rem] border border-black/15 shadow-2xl max-w-5xl w-full max-h-[94vh] flex flex-col overflow-hidden">
        
        {/* HEADER MODAL */}
        <div className="p-5 md:px-8 border-b border-black/10 flex items-center justify-between bg-white/70">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#7A6A5A]">
                EL MERCADITO DE ASH
              </span>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold tracking-wider uppercase bg-emerald-100 text-emerald-800">
                {format === "square" ? "Feed 1080 x 1080" : "Feed Vertical 1080 x 1350"}
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

        {/* CONTENIDO EN 2 COLUMNAS: ITEMS-START PARA EVITAR DEFORMACIONES POR FLEX STRETCH */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-8 overflow-y-auto items-start">
          
          {/* COLUMNA IZQUIERDA: PREVISUALIZACIÓN CON ASPECT RATIO RÍGIDO */}
          <div className="lg:col-span-6 flex flex-col items-center justify-start w-full">
            
            {/* CONTENEDOR CON ASPECT RATIO BLOQUEADO POR STYLE DIRECTO */}
            <div
              className="relative shadow-2xl rounded-2xl overflow-hidden border border-black/10 bg-white w-full"
              style={{
                maxWidth: "420px",
                aspectRatio: format === "square" ? "1 / 1" : "4 / 5",
              }}
            >
              <canvas
                ref={canvasRef}
                style={{
                  width: "100%",
                  height: "100%",
                  display: "block",
                }}
              />
              {generating && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-xs flex items-center justify-center text-xs text-[#7A6A5A]">
                  Renderizando placa...
                </div>
              )}
            </div>

            {/* SELECTOR DE FORMATO */}
            <div className="flex items-center gap-2 mt-4 bg-white/70 p-1.5 rounded-full border border-black/10 text-[11px]">
              <span className="text-[#7A6A5A] pl-2">Formato:</span>
              <button
                type="button"
                onClick={() => setFormat("square")}
                className={`px-3 py-1 rounded-full font-medium transition-all ${
                  format === "square"
                    ? "bg-[#0A0A0A] text-white"
                    : "text-[#0A0A0A] hover:bg-black/5"
                }`}
              >
                1:1 Cuadrado
              </button>
              <button
                type="button"
                onClick={() => setFormat("story")}
                className={`px-3 py-1 rounded-full font-medium transition-all ${
                  format === "story"
                    ? "bg-[#0A0A0A] text-white"
                    : "text-[#0A0A0A] hover:bg-black/5"
                }`}
              >
                4:5 Vertical
              </button>
            </div>

            {/* BOTONES DE EXPORTACIÓN */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-4 w-full max-w-[420px]">
              <button
                type="button"
                onClick={handleDownload}
                className="flex-1 min-w-[200px] flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-[#0A0A0A] text-white text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#7A6A5A] transition-all shadow-lg active:scale-[0.98]"
              >
                <Download className="w-4 h-4" />
                <span>Descargar PNG</span>
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

          {/* COLUMNA DERECHA: CONTROLES EDITABLES Y DE AJUSTE FINO */}
          <div className="lg:col-span-6 space-y-5 bg-white p-6 rounded-2xl border border-black/10 text-xs">
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

            {/* CONTROLES DE ESCALA Y ENCUADRE DE LA FOTO */}
            <div className="p-3.5 rounded-xl bg-[#F7F3EE] border border-black/10 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-semibold text-[#0A0A0A]">
                <span className="flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-[#B5A898]" />
                  Ajuste de la Pieza en la Placa
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setProductScale(100);
                    setProductOffsetY(0);
                  }}
                  className="text-[10px] text-[#7A6A5A] hover:text-[#0A0A0A] underline flex items-center gap-1"
                >
                  <RefreshCw className="w-2.5 h-2.5" />
                  Restablecer
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <div className="flex justify-between text-[10px] text-[#7A6A5A] mb-1">
                    <span>Tamaño / Zoom</span>
                    <span className="font-mono">{productScale}%</span>
                  </div>
                  <input
                    type="range"
                    min="60"
                    max="140"
                    value={productScale}
                    onChange={(e) => setProductScale(Number(e.target.value))}
                    className="w-full accent-[#0A0A0A] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[10px] text-[#7A6A5A] mb-1">
                    <span>Posición Vertical</span>
                    <span className="font-mono">{productOffsetY}px</span>
                  </div>
                  <input
                    type="range"
                    min="-80"
                    max="80"
                    value={productOffsetY}
                    onChange={(e) => setProductOffsetY(Number(e.target.value))}
                    className="w-full accent-[#0A0A0A] cursor-pointer"
                  />
                </div>
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
          </div>
        </div>
      </div>
    </div>
  );
}
