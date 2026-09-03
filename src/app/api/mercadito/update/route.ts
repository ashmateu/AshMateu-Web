import { NextRequest, NextResponse } from "next/server";
import { saveStoredProduct, getStoredProducts } from "@/lib/mercadito-storage";
import { LuxuryProduct } from "@/types/mercadito";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const product: LuxuryProduct = await req.json();

    if (!product.name || !product.price) {
      return NextResponse.json({ error: "Nombre y precio son obligatorios" }, { status: 400 });
    }

    if (!product.id) {
      product.id = `item-${Date.now()}`;
    }

    if (!product.slug) {
      product.slug = `${(product.designer || "vintage").toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${product.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
    }

    saveStoredProduct(product);

    return NextResponse.json({
      success: true,
      message: "Pieza guardada con éxito",
      product,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Error al actualizar" }, { status: 500 });
  }
}
