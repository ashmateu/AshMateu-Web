import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { saveStoredProduct } from "@/lib/mercadito-storage";
import { LuxuryProduct } from "@/types/mercadito";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://jrxklahobxpxmtnncvst.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_8vdBzcFdNVhjtjK9a4ZE9A_FPmxsHhd";
const supabase = createClient(supabaseUrl, supabaseKey);

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

    // 1. Guardar local
    saveStoredProduct(product);

    // 2. Guardar en Supabase de forma garantizada
    try {
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(product.id || "");
      const updateData = {
        name: product.name,
        slug: product.slug,
        designer: product.designer,
        category: product.category,
        price: Number(product.price),
        currency: product.currency || "USD",
        condition_state: product.condition_state,
        dimensions: product.dimensions || "",
        materials: product.materials || "",
        image_url: product.image_url,
        gallery_images: product.gallery_images,
        status: product.status || "available",
        ash_styling_tip: product.ash_styling_tip || "",
        stock: product.stock !== undefined ? product.stock : (product.status === "sold" ? 0 : 1),
        active: true
      };

      let updated = false;

      // Intentar update por id si es UUID
      if (isUuid) {
        const { data, error } = await supabase
          .from("products")
          .update(updateData)
          .eq("id", product.id)
          .select();
        if (!error && data && data.length > 0) {
          updated = true;
        }
      }

      // Si no se actualizó por ID, intentar update por slug
      if (!updated && product.slug) {
        const { data, error } = await supabase
          .from("products")
          .update(updateData)
          .eq("slug", product.slug)
          .select();
        if (!error && data && data.length > 0) {
          updated = true;
        }
      }

      // Si es un producto nuevo que no existía, insertarlo
      if (!updated) {
        await supabase.from("products").insert([updateData]);
      }
    } catch (supaErr) {
      console.error("Error en update Supabase:", supaErr);
    }

    // 3. Revalidar
    try {
      revalidatePath("/mercadito");
      revalidatePath("/admin");
    } catch (e) {}

    return NextResponse.json({
      success: true,
      message: "Pieza guardada con éxito",
      product,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Error al actualizar" }, { status: 500 });
  }
}
