import fs from "fs";
import path from "path";
import { LuxuryProduct } from "@/types/mercadito";
import { INITIAL_CURATED_PIECES } from "./mercadito-data";

const DATA_FILE = path.join(process.cwd(), "data", "mercadito-products.json");

// Asegurar que la carpeta data exista
function ensureDataDir() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function getStoredProducts(): LuxuryProduct[] {
  try {
    ensureDataDir();
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(INITIAL_CURATED_PIECES, null, 2));
      return INITIAL_CURATED_PIECES;
    }
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_CURATED_PIECES;
  } catch (e) {
    console.error("Error leyendo mercadito-products.json:", e);
    return INITIAL_CURATED_PIECES;
  }
}

export function saveStoredProduct(product: LuxuryProduct): void {
  try {
    ensureDataDir();
    const existing = getStoredProducts();

    // Normalizar para detección estricta de duplicados
    const pName = product.name.trim().toLowerCase();
    const pDesigner = (product.designer || "").trim().toLowerCase();
    const pSource = (product.source_url || "").trim();

    // Filtrar cualquier versión anterior que coincida con ID, slug, misma URL de origen, o mismo nombre y diseñador
    const filtered = existing.filter((p) => {
      const matchId = p.id === product.id || p.slug === product.slug;
      const matchSource = pSource && p.source_url && p.source_url.trim() === pSource;
      const matchNameDesigner =
        p.name.trim().toLowerCase() === pName &&
        (p.designer || "").trim().toLowerCase() === pDesigner;

      return !matchId && !matchSource && !matchNameDesigner;
    });

    // Guardar la nueva pieza actualizada al principio
    const updated = [product, ...filtered];
    fs.writeFileSync(DATA_FILE, JSON.stringify(updated, null, 2));
  } catch (e) {
    console.error("Error guardando mercadito-products.json:", e);
  }
}

export function deleteStoredProduct(idOrSlug: string): boolean {
  try {
    ensureDataDir();
    const existing = getStoredProducts();
    const filtered = existing.filter((p) => p.id !== idOrSlug && p.slug !== idOrSlug);
    fs.writeFileSync(DATA_FILE, JSON.stringify(filtered, null, 2));
    return true;
  } catch (e) {
    console.error("Error eliminando producto:", e);
    return false;
  }
}
