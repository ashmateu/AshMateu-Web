import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { deleteStoredProduct } from "@/lib/mercadito-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://jrxklahobxpxmtnncvst.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_8vdBzcFdNVhjtjK9a4ZE9A_FPmxsHhd";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, slug } = body;

    const target = id || slug;
    if (!target) {
      return NextResponse.json({ error: "Falta id o slug de la pieza" }, { status: 400 });
    }

    // 1. Eliminar de almacenamiento local
    deleteStoredProduct(target);

    // 2. Eliminar definitivamente en Supabase por slug y por UUID
    try {
      if (slug) {
        await supabase.from("products").delete().eq("slug", slug);
      }
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id || "");
      if (isUuid) {
        await supabase.from("products").delete().eq("id", id);
      }
    } catch (e) {
      console.warn("Supabase delete skipped:", e);
    }

    try {
      revalidatePath("/mercadito");
      revalidatePath("/admin");
    } catch (e) {}

    return NextResponse.json({ success: true, message: "Pieza eliminada con éxito" });
  } catch (err: any) {
    console.error("Error en /api/mercadito/delete:", err);
    return NextResponse.json({ error: err.message || "Error al eliminar" }, { status: 500 });
  }
}
