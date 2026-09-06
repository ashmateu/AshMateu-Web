"use client";

import React, { useState, useRef, useEffect } from "react";
import { LuxuryProduct } from "@/types/mercadito";
import { X, Download, Copy, Check, Sliders, RefreshCw, Sparkles } from "lucide-react";

// Paleta de presets de resaltadores icónicos
const HIGHLIGHTER_PRESETS = [
  { name: "Verde Neón", hex: "#00FF2A" },
  { name: "Amarillo Flúor", hex: "#FFE600" },
  { name: "Rojo Ash", hex: "#EA2638" },
  { name: "Rosa Neón", hex: "#FF2A85" },
  { name: "Cyan Eléctrico", hex: "#00E5FF" },
  { name: "Naranja Neón", hex: "#FF6B00" },
  { name: "Blanco Puro", hex: "#FFFFFF" },
  { name: "Negro Tape", hex: "#0A0A0A" },
];

// Helper para contraste óptimo de texto según fondo del resaltador
function getContrastColor(hexColor: string): string {
  const cleanHex = hexColor.replace("#", "").trim();
  let r = 0, g = 0, b = 0;
  if (cleanHex.length === 3) {
    r = parseInt(cleanHex[0] + cleanHex[0], 16) || 0;
    g = parseInt(cleanHex[1] + cleanHex[1], 16) || 0;
    b = parseInt(cleanHex[2] + cleanHex[2], 16) || 0;
  } else {
    r = parseInt(cleanHex.substring(0, 2), 16) || 0;
    g = parseInt(cleanHex.substring(2, 4), 16) || 0;
    b = parseInt(cleanHex.substring(4, 6), 16) || 0;
  }
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.55 ? "#0A0A0A" : "#FFFFFF";
}

interface TextLine {
  text: string;
  width: number;
}

interface AutoFitResult {
  lines: TextLine[];
  fontSize: number;
  lineHeight: number;
  totalHeight: number;
}

// Algoritmo de ajuste automático de texto al ancho del canvas
function autoFitText(
  ctx: CanvasRenderingContext2D,
  rawText: string,
  maxWidth: number,
  maxHeight: number,
  maxLines: number = 2,
  startFontSize: number = 84,
  minFontSize: number = 24,
  fontFamily: string = "'Impact', 'Arial Black', sans-serif",
  isItalic: boolean = true
): AutoFitResult {
  const text = rawText.trim();
  if (!text) {
    return { lines: [], fontSize: startFontSize, lineHeight: startFontSize, totalHeight: 0 };
  }

  // 1. Probar en 1 sola línea desde startFontSize hasta 42px
  for (let s = startFontSize; s >= Math.max(minFontSize, 42); s -= 2) {
    ctx.font = `${isItalic ? "italic " : ""}900 ${s}px ${fontFamily}`;
    const w = ctx.measureText(text).width;
    if (w <= maxWidth) {
      const lh = Math.round(s * 1.08);
      return {
        lines: [{ text, width: w }],
        fontSize: s,
        lineHeight: lh,
        totalHeight: lh,
      };
    }
  }

  // 2. Si excede, ajustar en múltiples líneas (hasta maxLines)
  const words = text.split(/\s+/);

  for (let s = Math.min(startFontSize, 62); s >= minFontSize; s -= 2) {
    ctx.font = `${isItalic ? "italic " : ""}900 ${s}px ${fontFamily}`;
    const lh = Math.round(s * 1.12);

    const testLines: TextLine[] = [];
    let curLine = "";
    let canFit = true;

    for (let i = 0; i < words.length; i++) {
      const w = words[i];
      const candidate = curLine ? `${curLine} ${w}` : w;
      const candidateWidth = ctx.measureText(candidate).width;

      if (candidateWidth <= maxWidth) {
        curLine = candidate;
      } else {
        if (curLine) {
          testLines.push({ text: curLine, width: ctx.measureText(curLine).width });
          curLine = w;
          if (ctx.measureText(w).width > maxWidth) {
            canFit = false;
            break;
          }
        } else {
          canFit = false;
          break;
        }
      }
    }

    if (curLine && canFit) {
      testLines.push({ text: curLine, width: ctx.measureText(curLine).width });
    }

    const totH = testLines.length * lh;

    if (canFit && testLines.length <= maxLines && totH <= maxHeight) {
      return {
        lines: testLines,
        fontSize: s,
        lineHeight: lh,
        totalHeight: totH,
      };
    }
  }

  // 3. Fallback en minFontSize
  ctx.font = `${isItalic ? "italic " : ""}900 ${minFontSize}px ${fontFamily}`;
  const lh = Math.round(minFontSize * 1.12);
  const fallbackLines: TextLine[] = [];
  let cur = "";

  for (const w of words) {
    const candidate = cur ? `${cur} ${w}` : w;
    if (ctx.measureText(candidate).width <= maxWidth) {
      cur = candidate;
    } else {
      if (cur) fallbackLines.push({ text: cur, width: ctx.measureText(cur).width });
      cur = w;
    }
  }
  if (cur) fallbackLines.push({ text: cur, width: ctx.measureText(cur).width });

  const finalLines = fallbackLines.slice(0, maxLines);
  return {
    lines: finalLines,
    fontSize: minFontSize,
    lineHeight: lh,
    totalHeight: finalLines.length * lh,
  };
}

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

  // Estados editables en vivo (título extraído automáticamente del artículo)
  const [title, setTitle] = useState(product?.name || "PRE-LOVE");
  const [titleStyle, setTitleStyle] = useState<"solid" | "highlight-bg">("solid");
  const [highlighterColor, setHighlighterColor] = useState<string>("#00FF2A");
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

  // Ajustes de encuadre y zoom de la Foto Principal (Bolso / Prenda)
  const [productScale, setProductScale] = useState<number>(100);
  const [productOffsetY, setProductOffsetY] = useState<number>(0);
  const [productOffsetX, setProductOffsetX] = useState<number>(0);

  // Ajustes de encuadre y zoom de la Foto Secundaria (Miniatura / Modelo / Detalle)
  const [secondaryScale, setSecondaryScale] = useState<number>(100);
  const [secondaryOffsetY, setSecondaryOffsetY] = useState<number>(0);
  const [secondaryOffsetX, setSecondaryOffsetX] = useState<number>(0);

  // Pestaña de imagen activa para editar: 'main' | 'secondary'
  const [activeImageAdjust, setActiveImageAdjust] = useState<"main" | "secondary">("main");
  const [pureWhiteBg, setPureWhiteBg] = useState<boolean>(true);

  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);

  // Sincronizar automáticamente datos cuando cambia el artículo
  useEffect(() => {
    if (product) {
      setTitle(product.name || "PRE-LOVE");
      setSubtitle(
        product.ash_styling_tip ? `-${product.ash_styling_tip}-` : "-Perfecta para el día a día-"
      );
      setRetailPrice(Math.round(product.price * 1.35).toString());
      setFindingPrice(product.price.toString());
      setCondition(product.condition_state || "Excelente estado.");
    }
  }, [product]);

  // Renderizar en Canvas
  useEffect(() => {
    drawCanvas();
  }, [
    template,
    format,
    title,
    titleStyle,
    highlighterColor,
    subtitle,
    retailPrice,
    findingPrice,
    condition,
    measurements,
    productScale,
    productOffsetY,
    productOffsetX,
    secondaryScale,
    secondaryOffsetY,
    secondaryOffsetX,
    pureWhiteBg,
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
      offsetYPx: number = 0,
      offsetXPx: number = 0,
      applyMultiply: boolean = true
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

      ctx.save();
      // Si está activado Fondo Blanco Puro, usar multiply para que los fondos grises/blancos de estudio se fundan a blanco inmaculado
      if (pureWhiteBg) {
        ctx.globalCompositeOperation = "multiply";
      }

      ctx.drawImage(
        img,
        targetBoxX + offX + centerOffsetX + offsetXPx,
        targetBoxY + offY + centerOffsetY + offsetYPx,
        finalW,
        finalH
      );
      ctx.restore();
    };

    if (template === "prelove") {
      // -----------------------------------------------------------------------
      // PLANTILLA A: FICHA TÉCNICA PRE-LOVE (VERDE NEÓN)
      // -----------------------------------------------------------------------
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, W, H);

      // 1. FOTO PRINCIPAL PROTAGONISTA (EN EL FONDO PARA NO TAPAR TEXTOS)
      if (mainImg) {
        drawImageProportional(mainImg, 80, 480, 580, 520, productScale, productOffsetY, productOffsetX, pureWhiteBg);
      }

      // 2. FOTO SECUNDARIA (EN EL FONDO)
      if (secondaryImg) {
        drawImageProportional(secondaryImg, 45, 175, 290, 290, secondaryScale, secondaryOffsetY, secondaryOffsetX, pureWhiteBg);
      }

      // 3. TÍTULO AUTO-AJUSTABLE (SE ADAPTA AUTOMÁTICAMENTE AL ANCHO DEL CANVAS)
      const titleFitted = autoFitText(
        ctx,
        title.toUpperCase(),
        920, // maxWidth: 1080 - 80*2
        135, // maxHeight
        3,   // maxLines
        84,  // startFontSize
        26   // minFontSize
      );

      // Centrar verticalmente las líneas de texto en la franja superior (Y: 45 a 165)
      const topAreaCenterY = 105;
      const startY = topAreaCenterY - (titleFitted.totalHeight / 2) + titleFitted.fontSize * 0.85;

      titleFitted.lines.forEach((line, idx) => {
        const lineY = startY + idx * titleFitted.lineHeight;
        const lineX = 80;

        ctx.font = `italic 900 ${titleFitted.fontSize}px 'Impact', 'Arial Black', sans-serif`;

        if (titleStyle === "highlight-bg") {
          const padX = 14;
          const boxH = Math.round(titleFitted.fontSize * 1.16);
          const boxY = Math.round(lineY - titleFitted.fontSize * 0.88);
          const boxW = Math.round(line.width + padX * 2);

          ctx.fillStyle = highlighterColor;
          ctx.fillRect(lineX, boxY, boxW, boxH);

          ctx.fillStyle = getContrastColor(highlighterColor);
          ctx.fillText(line.text, lineX + padX, lineY);
        } else {
          ctx.fillStyle = "#0A0A0A";
          ctx.fillText(line.text, lineX, lineY);
        }
      });

      // 4. SUBTÍTULO: -Frase en cursiva-
      ctx.fillStyle = "#0A0A0A";
      ctx.font = "italic 400 38px 'Georgia', serif";
      ctx.fillText(subtitle, 340, 205);

      // 5. RETAIL PRICE TACHADO
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

      // 6. PRECIO HALLAZGO (CON HIGHLIGHT PERSONALIZABLE)
      const findingText = `Precio Hallazgo $${Number(findingPrice).toLocaleString("en-US")}.-`;
      ctx.font = "italic 900 48px 'Impact', 'Arial Black', sans-serif";
      const findingMetrics = ctx.measureText(findingText);
      const tagW = findingMetrics.width + 24;
      const tagH = 58;

      ctx.fillStyle = highlighterColor;
      ctx.fillRect(360, 305, tagW, tagH);

      ctx.fillStyle = getContrastColor(highlighterColor);
      ctx.fillText(findingText, 372, 350);

      // 7. MEDIDAS TÉCNICAS (COLUMNA DERECHA, POR ENCIMA DE LA FOTO)
      ctx.fillStyle = "#0A0A0A";
      ctx.font = "900 24px 'Impact', 'Arial Black', sans-serif";
      ctx.textAlign = "right";
      let measureY = 410;
      const lineHeight = 33;

      if (measurements.depth) {
        ctx.fillText(`Profundidad: ${measurements.depth}`, 1000, measureY);
        measureY += lineHeight;
      }
      if (measurements.width) {
        ctx.fillText(`Ancho: ${measurements.width}`, 1000, measureY);
        measureY += lineHeight;
      }
      if (measurements.height) {
        ctx.fillText(`Altura: ${measurements.height}`, 1000, measureY);
        measureY += lineHeight;
      }
      if (measurements.handle) {
        ctx.fillText(`Asa: ${measurements.handle}`, 1000, measureY);
        measureY += lineHeight;
      }
      if (measurements.strap) {
        ctx.fillText(`Correa: ${measurements.strap}`, 1000, measureY);
      }
      ctx.textAlign = "left"; // reset

      // 8. BLOQUE DE CONDICIONES (CON FONDO DE HIGHLIGHT PERSONALIZABLE)
      ctx.fillStyle = highlighterColor;
      ctx.fillRect(700, 610, 315, 38);

      ctx.fillStyle = getContrastColor(highlighterColor);
      ctx.font = "900 23px 'Impact', 'Arial Black', sans-serif";
      ctx.fillText("CONDICIONES: Pre-Love.", 708, 636);

      ctx.fillStyle = "#0A0A0A";
      ctx.font = "900 25px 'Impact', 'Arial Black', sans-serif";
      ctx.fillText(condition, 700, 675);

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
        drawImageProportional(mainImg, 80, 100, 920, H - 240, productScale, productOffsetY, productOffsetX, pureWhiteBg);
      }

      // Función de cinta blanca editorial con soporte para color personalizado
      const drawTapeText = (
        text: string,
        x: number,
        y: number,
        font: string,
        isBlackBg = false,
        customBgColor?: string
      ) => {
        ctx.font = font;
        const metrics = ctx.measureText(text);
        const padX = 18;
        const padY = 12;
        const bgW = metrics.width + padX * 2;
        const bgH = parseInt(font.match(/\d+px/)?.[0] || "36") + padY * 1.5;

        const bgColor = customBgColor ? customBgColor : isBlackBg ? "#0A0A0A" : "#FFFFFF";
        const textColor = customBgColor
          ? getContrastColor(customBgColor)
          : isBlackBg
          ? "#FFFFFF"
          : "#0A0A0A";

        ctx.fillStyle = bgColor;
        ctx.shadowColor = "rgba(0,0,0,0.15)";
        ctx.shadowBlur = 10;
        ctx.shadowOffsetY = 4;
        ctx.fillRect(x, y - bgH + padY * 0.8, bgW, bgH);
        ctx.shadowColor = "transparent";

        ctx.fillStyle = textColor;
        ctx.fillText(text, x + padX, y);
      };

      // TÍTULOS EN PASTILLAS BLANCAS / RESALTADOR
      drawTapeText(
        product.designer.toUpperCase(),
        80,
        140,
        "italic 900 44px 'Impact', 'Arial Black', sans-serif"
      );

      // Título auto-ajustable en pastillas editoriales
      const editorialTitleFitted = autoFitText(
        ctx,
        title,
        860, // maxWidth
        140, // maxHeight
        3,   // maxLines
        36,  // startFontSize
        24   // minFontSize
      );

      let curTapeY = 210;
      editorialTitleFitted.lines.forEach((line) => {
        drawTapeText(
          line.text,
          80,
          curTapeY,
          `italic 900 ${editorialTitleFitted.fontSize}px 'Impact', 'Arial Black', sans-serif`,
          titleStyle === "highlight-bg",
          titleStyle === "highlight-bg" ? highlighterColor : undefined
        );
        curTapeY += editorialTitleFitted.lineHeight + 10;
      });

      // FRASE EDITORIAL
      const bottomY = format === "square" ? 860 : 1100;
      drawTapeText("“Voy por el mundo en busca de hallazgos...", 100, bottomY, "italic 400 34px 'Georgia', serif");
      drawTapeText(subtitle.replace(/-/g, ""), 100, bottomY + 60, "italic 400 32px 'Georgia', serif");

      const priceBadge = `PRECIO HALLAZGO: $${Number(findingPrice).toLocaleString("en-US")} USD`;
      drawTapeText(
        priceBadge,
        100,
        bottomY + 130,
        "900 30px 'Impact', sans-serif",
        false,
        highlighterColor
      );

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
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold uppercase tracking-wider">
                Capas al Fondo ✓
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold uppercase tracking-wider">
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

            {/* CONTROLES DE ESCALA, POSICIÓN Y FONDO DE AMBAS FOTOS */}
            <div className="p-4 rounded-xl bg-[#F7F3EE] border border-black/10 space-y-3">
              <div className="flex items-center justify-between text-[11px] font-semibold text-[#0A0A0A]">
                <span className="flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-[#B5A898]" />
                  Ajuste de Fotos en la Placa
                </span>
                <button
                  type="button"
                  onClick={() => {
                    if (activeImageAdjust === "main") {
                      setProductScale(100);
                      setProductOffsetY(0);
                      setProductOffsetX(0);
                    } else {
                      setSecondaryScale(100);
                      setSecondaryOffsetY(0);
                      setSecondaryOffsetX(0);
                    }
                  }}
                  className="text-[10px] text-[#7A6A5A] hover:text-[#0A0A0A] underline flex items-center gap-1"
                >
                  <RefreshCw className="w-2.5 h-2.5" />
                  Restablecer {activeImageAdjust === "main" ? "Principal" : "Miniatura"}
                </button>
              </div>

              {/* SELECTOR DE IMAGEN A EDITAR */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setActiveImageAdjust("main")}
                  className={`py-1.5 px-3 rounded-lg text-center text-[10.5px] font-semibold transition-all ${
                    activeImageAdjust === "main"
                      ? "bg-[#0A0A0A] text-white shadow-sm"
                      : "bg-white border border-black/10 text-[#7A6A5A] hover:text-[#0A0A0A]"
                  }`}
                >
                  👜 Pieza Principal
                </button>
                <button
                  type="button"
                  onClick={() => setActiveImageAdjust("secondary")}
                  className={`py-1.5 px-3 rounded-lg text-center text-[10.5px] font-semibold transition-all ${
                    activeImageAdjust === "secondary"
                      ? "bg-[#0A0A0A] text-white shadow-sm"
                      : "bg-white border border-black/10 text-[#7A6A5A] hover:text-[#0A0A0A]"
                  }`}
                >
                  👤 Miniatura Modelo
                </button>
              </div>

              {/* SLIDERS SEGÚN LA IMAGEN SELECCIONADA */}
              {activeImageAdjust === "main" ? (
                <div className="space-y-2.5 pt-1">
                  <div>
                    <div className="flex justify-between text-[10px] text-[#7A6A5A] mb-1">
                      <span>Tamaño / Zoom (Pieza Principal)</span>
                      <span className="font-mono font-semibold text-[#0A0A0A]">{productScale}%</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="160"
                      value={productScale}
                      onChange={(e) => setProductScale(Number(e.target.value))}
                      className="w-full accent-[#0A0A0A] cursor-pointer"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="flex justify-between text-[10px] text-[#7A6A5A] mb-1">
                        <span>Vertical (Y)</span>
                        <span className="font-mono font-semibold text-[#0A0A0A]">{productOffsetY}px</span>
                      </div>
                      <input
                        type="range"
                        min="-150"
                        max="150"
                        value={productOffsetY}
                        onChange={(e) => setProductOffsetY(Number(e.target.value))}
                        className="w-full accent-[#0A0A0A] cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-[10px] text-[#7A6A5A] mb-1">
                        <span>Horizontal (X)</span>
                        <span className="font-mono font-semibold text-[#0A0A0A]">{productOffsetX}px</span>
                      </div>
                      <input
                        type="range"
                        min="-150"
                        max="150"
                        value={productOffsetX}
                        onChange={(e) => setProductOffsetX(Number(e.target.value))}
                        className="w-full accent-[#0A0A0A] cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-2.5 pt-1">
                  <div>
                    <div className="flex justify-between text-[10px] text-[#7A6A5A] mb-1">
                      <span>Tamaño / Zoom (Miniatura Modelo)</span>
                      <span className="font-mono font-semibold text-[#0A0A0A]">{secondaryScale}%</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="160"
                      value={secondaryScale}
                      onChange={(e) => setSecondaryScale(Number(e.target.value))}
                      className="w-full accent-[#0A0A0A] cursor-pointer"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="flex justify-between text-[10px] text-[#7A6A5A] mb-1">
                        <span>Vertical (Y)</span>
                        <span className="font-mono font-semibold text-[#0A0A0A]">{secondaryOffsetY}px</span>
                      </div>
                      <input
                        type="range"
                        min="-150"
                        max="150"
                        value={secondaryOffsetY}
                        onChange={(e) => setSecondaryOffsetY(Number(e.target.value))}
                        className="w-full accent-[#0A0A0A] cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-[10px] text-[#7A6A5A] mb-1">
                        <span>Horizontal (X)</span>
                        <span className="font-mono font-semibold text-[#0A0A0A]">{secondaryOffsetX}px</span>
                      </div>
                      <input
                        type="range"
                        min="-150"
                        max="150"
                        value={secondaryOffsetX}
                        onChange={(e) => setSecondaryOffsetX(Number(e.target.value))}
                        className="w-full accent-[#0A0A0A] cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TOGGLE FONDO BLANCO PURO */}
              <div className="pt-2 border-t border-black/10 flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pureWhiteBg}
                    onChange={(e) => setPureWhiteBg(e.target.checked)}
                    className="rounded text-[#0A0A0A] focus:ring-0 accent-[#0A0A0A] cursor-pointer"
                  />
                  <span className="text-[10px] text-[#0A0A0A] font-medium">
                    Fondo blanco puro (eliminar recuadros de fotos)
                  </span>
                </label>
              </div>
            </div>

            {/* CONTROL DE COLOR DEL RESALTADOR */}
            <div className="p-4 rounded-xl bg-[#F7F3EE] border border-black/10 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-[10.5px] uppercase tracking-[0.2em] font-semibold text-[#7A6A5A] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#EA2638]" />
                  Color del Resaltador
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase text-[#7A6A5A] font-semibold">
                    {highlighterColor}
                  </span>
                  <span
                    className="w-4 h-4 rounded-full border border-black/20 shadow-xs"
                    style={{ backgroundColor: highlighterColor }}
                  />
                </div>
              </div>

              {/* PALETA DE CHIPS DE COLORES PRESTABLECIDOS */}
              <div className="grid grid-cols-4 gap-1.5">
                {HIGHLIGHTER_PRESETS.map((p) => {
                  const isSelected = highlighterColor.toUpperCase() === p.hex.toUpperCase();
                  return (
                    <button
                      key={p.hex}
                      type="button"
                      onClick={() => setHighlighterColor(p.hex)}
                      className={`flex items-center gap-1.5 p-1.5 rounded-lg border text-[10px] font-medium transition-all cursor-pointer ${
                        isSelected
                          ? "border-[#0A0A0A] bg-white shadow-xs font-bold text-[#0A0A0A] ring-2 ring-black/10"
                          : "border-black/10 bg-white/70 text-[#7A6A5A] hover:bg-white"
                      }`}
                      title={`Elegir ${p.name}`}
                    >
                      <span
                        className="w-3 h-3 rounded-full border border-black/20 shrink-0"
                        style={{ backgroundColor: p.hex }}
                      />
                      <span className="truncate text-[9.5px]">{p.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* SELECTOR PERSONALIZADO LIBRE */}
              <div className="flex items-center gap-2 pt-1 border-t border-black/10">
                <label className="text-[10px] text-[#7A6A5A] shrink-0 font-medium">Color libre:</label>
                <div className="flex items-center gap-2 flex-1">
                  <input
                    type="color"
                    value={highlighterColor}
                    onChange={(e) => setHighlighterColor(e.target.value)}
                    className="w-8 h-8 rounded-lg border border-black/20 cursor-pointer p-0 bg-transparent shrink-0"
                    title="Hacé clic para seleccionar cualquier tono con el selector visual"
                  />
                  <input
                    type="text"
                    value={highlighterColor}
                    onChange={(e) => setHighlighterColor(e.target.value)}
                    className="flex-1 px-2.5 py-1 rounded-md border border-black/15 bg-white text-[11px] font-mono uppercase"
                    maxLength={7}
                    placeholder="#00FF2A"
                  />
                </div>
              </div>

              {/* OPCIÓN: ESTILO DEL TÍTULO (TEXTO LIMPIO VS FONDO RESALTADOR) */}
              <div className="pt-2 border-t border-black/10">
                <span className="text-[10px] text-[#7A6A5A] block mb-1.5 font-medium">
                  Estilo del Título Superior:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setTitleStyle("solid")}
                    className={`py-1.5 px-2.5 rounded-lg text-center text-[10.5px] font-medium transition-all cursor-pointer ${
                      titleStyle === "solid"
                        ? "bg-[#0A0A0A] text-white font-semibold shadow-xs"
                        : "bg-white border border-black/10 text-[#7A6A5A] hover:text-[#0A0A0A]"
                    }`}
                  >
                    Texto Sólido
                  </button>
                  <button
                    type="button"
                    onClick={() => setTitleStyle("highlight-bg")}
                    className={`py-1.5 px-2.5 rounded-lg text-center text-[10.5px] font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      titleStyle === "highlight-bg"
                        ? "bg-[#0A0A0A] text-white font-semibold shadow-xs"
                        : "bg-white border border-black/10 text-[#7A6A5A] hover:text-[#0A0A0A]"
                    }`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: highlighterColor }}
                    />
                    Caja Resaltador
                  </button>
                </div>
              </div>
            </div>

            {/* CAMPOS EDITABLES EN VIVO */}
            <div className="space-y-3 pt-2 border-t border-black/10">
              {/* TÍTULO EDITABLE Y AUTO-AJUSTABLE */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[10px] uppercase tracking-wider font-semibold text-[#7A6A5A]">
                    Título de la Placa
                  </label>
                  <span className="text-[9.5px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-mono font-medium">
                    Auto-ajuste activo ✓
                  </span>
                </div>

                {/* ACCIONES RÁPIDAS PARA EXTRAER / CAMBIAR TÍTULO */}
                <div className="flex flex-wrap items-center gap-1.5 mb-2">
                  <button
                    type="button"
                    onClick={() => setTitle(product.name)}
                    className="px-2.5 py-1 rounded-md bg-[#F7F3EE] border border-black/15 text-[10px] text-[#0A0A0A] hover:bg-white hover:border-black/30 font-medium transition-all cursor-pointer flex items-center gap-1"
                    title="Extraer y usar automáticamente el nombre del artículo"
                  >
                    🏷️ Nombre del Artículo
                  </button>

                  <button
                    type="button"
                    onClick={() => setTitle("PRE-LOVE")}
                    className="px-2.5 py-1 rounded-md bg-[#F7F3EE] border border-black/15 text-[10px] text-[#0A0A0A] hover:bg-white hover:border-black/30 font-medium transition-all cursor-pointer flex items-center gap-1"
                    title="Usar clásico 'PRE-LOVE'"
                  >
                    ⚡ &quot;PRE-LOVE&quot;
                  </button>

                  <button
                    type="button"
                    onClick={() => setTitle(`${product.designer} ${product.name}`)}
                    className="px-2.5 py-1 rounded-md bg-[#F7F3EE] border border-black/15 text-[10px] text-[#0A0A0A] hover:bg-white hover:border-black/30 font-medium transition-all cursor-pointer flex items-center gap-1"
                    title="Usar Diseñador + Nombre completo"
                  >
                    ✨ Diseñador + Nombre
                  </button>
                </div>

                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Título de la placa..."
                  className="w-full p-2.5 rounded-lg border border-black/15 bg-[#F7F3EE]/50 font-medium text-xs focus:bg-white focus:outline-none focus:border-[#0A0A0A] transition-all"
                />
                <p className="text-[9.5px] text-[#7A6A5A] mt-1 italic">
                  El tamaño de fuente y la cantidad de líneas se recalculan en tiempo real para que el texto siempre entre perfectamente dentro de la placa sin cortarse.
                </p>
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
