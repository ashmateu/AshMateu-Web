import { LuxuryProduct } from "@/types/mercadito";
import { getStoredProducts, updateProductStatus } from "./mercadito-storage";
import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://jrxklahobxpxmtnncvst.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_8vdBzcFdNVhjtjK9a4ZE9A_FPmxsHhd";
const supabase = createClient(supabaseUrl, supabaseKey);

export interface TRRCheckResult {
  productId: string;
  name: string;
  designer: string;
  sourceUrl?: string;
  isSold: boolean;
  reason?: string;
  checkedAt: string;
}

/**
 * Verifica si un producto de The RealReal ya no está disponible
 */
export async function checkTRRProductAvailability(
  product: LuxuryProduct
): Promise<{ isSold: boolean; reason?: string; botProtected?: boolean }> {
  const url = product.source_url;

  if (!url || !url.includes("therealreal.com")) {
    return { isSold: false, reason: "Sin URL de The RealReal asociada" };
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
        "Accept-Language": "es-ES,es;q=0.9,en;q=0.8",
        "Cache-Control": "no-cache",
      },
      signal: controller.signal,
      redirect: "follow",
    });

    clearTimeout(timeout);

    // 1. Si retorna 404 o 410, el producto fue eliminado o ya no existe
    if (res.status === 404 || res.status === 410) {
      return { isSold: true, reason: `Página ${res.status} (no disponible en The RealReal)` };
    }

    // 2. Si redirige fuera del producto (ej: al home o catálogo general)
    if (res.url && !res.url.includes("/products/")) {
      return { isSold: true, reason: "Redireccionado fuera de la ficha de producto" };
    }

    // 3. Si The RealReal devolvió 403 (PerimeterX bot protection)
    if (res.status === 403) {
      return { isSold: false, botProtected: true, reason: "Protegido por PerimeterX en servidor" };
    }

    const html = await res.text();

    // 4. Analizar indicadores explícitos en HTML / JSON-LD
    const lower = html.toLowerCase();

    // Schema de disponibilidad de Google/Schema.org
    if (
      lower.includes("schema.org/outofstock") ||
      lower.includes("schema.org/soldout") ||
      lower.includes('"availability":"outofstock"') ||
      lower.includes('"availability": "outofstock"')
    ) {
      return { isSold: true, reason: "Marcado como OutOfStock en The RealReal" };
    }

    // Indicadores textuales de venta en The RealReal
    if (
      lower.includes("this item has been sold") ||
      lower.includes("this item is sold out") ||
      lower.includes("item is no longer available") ||
      (lower.includes("join the waitlist") && !lower.includes("add to bag"))
    ) {
      return { isSold: true, reason: "Pieza vendida o en lista de espera en The RealReal" };
    }

    return { isSold: false, reason: "Disponible en The RealReal" };
  } catch (err: any) {
    if (err.name === "AbortError") {
      return { isSold: false, reason: "Tiempo de espera agotado al consultar The RealReal" };
    }
    return { isSold: false, reason: err.message || "Error al conectar con The RealReal" };
  }
}

/**
 * Marca una pieza de El Mercadito como Vendida (Sold Out)
 */
export async function markProductAsSold(
  productId: string,
  reason = "Vendida / Agotada"
): Promise<boolean> {
  try {
    // 1. Almacenamiento local
    updateProductStatus(productId, "sold", 0);

    // 2. Supabase
    try {
      await supabase
        .from("products")
        .update({
          status: "sold",
          stock: 0,
          updated_at: new Date().toISOString(),
        })
        .or(`id.eq.${productId},slug.eq.${productId}`);
    } catch (e) {
      console.warn("Aviso Supabase update status:", e);
    }

    // 3. Revalidar rutas
    try {
      revalidatePath("/mercadito");
      revalidatePath("/admin");
    } catch (e) {
      // Ignorar en build
    }

    console.log(`✦ Pieza [${productId}] marcada como SOLD OUT: ${reason}`);
    return true;
  } catch (err) {
    console.error(`Error marcando pieza [${productId}] como vendida:`, err);
    return false;
  }
}

/**
 * Ejecuta el escaneo de todas las piezas activas contra The RealReal
 */
export async function syncAllTRRProducts(): Promise<{
  checkedCount: number;
  soldCount: number;
  botProtectedCount: number;
  results: TRRCheckResult[];
}> {
  const products = getStoredProducts();
  const activeProducts = products.filter((p) => p.status === "available");

  const results: TRRCheckResult[] = [];
  let soldCount = 0;
  let botProtectedCount = 0;

  for (const product of activeProducts) {
    const check = await checkTRRProductAvailability(product);

    if (check.botProtected) {
      botProtectedCount++;
    }

    if (check.isSold) {
      soldCount++;
      await markProductAsSold(product.id, check.reason);
    }

    results.push({
      productId: product.id,
      name: product.name,
      designer: product.designer,
      sourceUrl: product.source_url,
      isSold: check.isSold,
      reason: check.reason,
      checkedAt: new Date().toISOString(),
    });
  }

  return {
    checkedCount: activeProducts.length,
    soldCount,
    botProtectedCount,
    results,
  };
}
