import { LuxuryProduct, MercaditoOrder } from "@/types/mercadito";
import { supabase } from "@/lib/supabase/client";

// Catálogo editorial de piezas curadas iniciales (Fallback y muestra editorial 1 de 1)
export const INITIAL_CURATED_PIECES: LuxuryProduct[] = [
  {
    id: "trr-chanel-001",
    slug: "chanel-vintage-classic-double-flap-medium",
    name: "Classic Medium Double Flap Bag",
    designer: "Chanel",
    category: "bolsos",
    price: 6850,
    currency: "USD",
    condition_state: "Excellent (Excelente estado)",
    dimensions: "Alto: 16cm | Ancho: 25.5cm | Profundidad: 7cm | Caída correa: 43cm",
    materials: "Cuero de cordero acolchado (Lambskin) en negro, herrajes chapados en oro 24k de época.",
    image_url: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=85&w=1200",
    gallery_images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=85&w=1200",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=85&w=1200",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=85&w=1200",
    ],
    source_url: "",
    is_unique_piece: true,
    status: "available",
    stock: 1,
    ash_styling_tip: "El balance perfecto entre sobriedad parisina y poder sartorial. Llévala con un trench estructurado oversize en tono arena o cruzada sobre un knit de cachemira negro.",
    description: "Pieza icónica de la era Dorada de Chanel (Serie 2). Piel de cordero excepcionalmente conservada con brillo satinado natural y chapa de oro con pátina intacta. Incluye tarjeta de autenticidad y funda guarda-polvo original.",
  },
  {
    id: "trr-prada-002",
    slug: "prada-re-edition-cleo-spazzolato",
    name: "Cleo Brushed Leather Shoulder Bag",
    designer: "Prada",
    category: "bolsos",
    price: 2450,
    currency: "USD",
    condition_state: "Pristine (Sin uso previo)",
    dimensions: "Alto: 22cm | Ancho: 27cm | Profundidad: 6cm",
    materials: "Cuero Spazzolato brillante en tono Nero, forro de satén con logo jacquard.",
    image_url: "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&q=85&w=1200",
    gallery_images: [
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&q=85&w=1200",
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&q=85&w=1200",
    ],
    source_url: "",
    is_unique_piece: true,
    status: "available",
    stock: 1,
    ash_styling_tip: "Geometría pura inspirada en los archivos de los 90. Funciona de maravilla con sastrería minimalista monocroma y mocasines con suela track.",
    description: "Una de las siluetas más codiciadas del diseño contemporáneo italiano. Su diseño curvilíneo y fondo inclinado acentúan la elegancia del cuero cepillado Spazzolato.",
  },
  {
    id: "trr-ysl-003",
    slug: "saint-laurent-vintage-le-smoking-jacket",
    name: "Vintage 'Le Smoking' Wool Blazer",
    designer: "Saint Laurent",
    category: "indumentaria",
    price: 1890,
    currency: "USD",
    condition_state: "Excellent (Excelente estado)",
    dimensions: "Talle: 38 FR (S/M) | Hombros: 41cm | Pecho: 92cm | Largo: 72cm",
    materials: "100% Lana virgen de grano de pólvora, solapas de pico en satén de seda, forro interior 100% seda.",
    image_url: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=85&w=1200",
    gallery_images: [
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=85&w=1200",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=85&w=1200",
    ],
    source_url: "",
    is_unique_piece: true,
    status: "available",
    stock: 1,
    ash_styling_tip: "El epítome del empoderamiento femenino. Combínalo desabrochado sobre piel descubierta con joyería dorada escultórica para la noche, o sobre una t-shirt blanca vintage de algodón premium.",
    description: "Confección magistral de sastrería francesa. Hombros estructurados definidos, corte entallado y solapas de seda brillantes sin marcas ni desgarros. Una verdadera pieza de archivo coleccionable.",
  },
  {
    id: "trr-hermes-004",
    slug: "hermes-carre-90-silk-twill-scarf",
    name: "Carré 90 Silk Twill Scarf 'Grand Manège'",
    designer: "Hermès",
    category: "accesorios",
    price: 520,
    currency: "USD",
    condition_state: "Pristine (Sin uso previo)",
    dimensions: "90cm x 90cm",
    materials: "100% Sarga de seda pesada (Silk Twill), dobladillo enrollado a mano (hand-rolled).",
    image_url: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&q=85&w=1200",
    gallery_images: [
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&q=85&w=1200",
    ],
    source_url: "",
    is_unique_piece: true,
    status: "available",
    stock: 1,
    ash_styling_tip: "Átalo como pañuelo pirata a la cabeza para un aire Riviera, o envuélvelo en el asa de tu bolso favorito para aportar una dosis de color y artesanía ecuestre.",
    description: "Ilustración original de Henri d'Origny. Seda firme con bordes enrollados a mano con volumen perfecto. Conserva la etiqueta de composición original y viene en la icónica caja naranja Hermès.",
  }
];

import { getStoredProducts } from "@/lib/mercadito-storage";

export function sanitizeGalleryImages(mainImage: string, gallery?: string[]): string[] {
  const fallback = mainImage ? [mainImage.split("?")[0]] : [];
  if (!gallery || !Array.isArray(gallery) || gallery.length === 0) {
    return fallback;
  }

  const baseMain = (mainImage || "").split("?")[0];
  const skuMatch = baseMain.match(/([A-Z0-9]{5,15})_\d+/);
  const sku = skuMatch ? skuMatch[1] : null;

  const cleaned = gallery
    .map((url) => (typeof url === "string" ? url.split("?")[0].trim() : ""))
    .filter(Boolean)
    .filter((url, idx, arr) => arr.indexOf(url) === idx)
    .filter((url) => {
      if (!sku) return true;
      return url.includes(sku);
    });

  if (cleaned.length === 0) {
    return fallback;
  }

  if (baseMain && cleaned.includes(baseMain)) {
    return [baseMain, ...cleaned.filter((u) => u !== baseMain)];
  }

  return cleaned;
}

export async function getMercaditoProducts(): Promise<LuxuryProduct[]> {
  // 1. Obtener los productos almacenados localmente (siempre disponibles y persistidos)
  const localProducts = getStoredProducts();

  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("active", true)
      .order("created_at", { ascending: false });

    if (error || !data) {
      return localProducts;
    }

    const mapped: LuxuryProduct[] = data.map((item: any) => ({
      id: item.id,
      slug: item.slug || item.id,
      name: item.name,
      designer: item.designer || "Diseñador Vintage",
      category: item.category || "bolsos",
      price: Number(item.price),
      currency: item.currency || "USD",
      condition_state: item.condition_state || "Excellent (Excelente estado)",
      dimensions: item.dimensions || "",
      materials: item.materials || "",
      image_url: item.image_url || INITIAL_CURATED_PIECES[0].image_url,
      gallery_images: sanitizeGalleryImages(
        item.image_url || INITIAL_CURATED_PIECES[0].image_url,
        item.gallery_images
      ),
      source_url: item.source_url || "",
      is_unique_piece: item.is_unique_piece ?? true,
      status: (item.status as any) || (item.stock > 0 ? "available" : "sold"),
      ash_styling_tip: item.ash_styling_tip || "",
      stock: item.stock ?? 1,
      description: item.description || "",
    }));

    // Si Supabase tiene productos activos, Supabase es la fuente oficial y única de la verdad
    if (mapped.length > 0) {
      return mapped;
    }

    return localProducts;
  } catch (e) {
    return localProducts;
  }
}

export async function getProductBySlug(slug: string): Promise<LuxuryProduct | null> {
  const all = await getMercaditoProducts();
  const found = all.find((p) => p.slug === slug || p.id === slug);
  return found || null;
}
