import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import { saveStoredProduct } from "@/lib/mercadito-storage";

// Supabase client con service key si está disponible o anon key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://jrxklahobxpxmtnncvst.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_8vdBzcFdNVhjtjK9a4ZE9A_FPmxsHhd";
const supabase = createClient(supabaseUrl, supabaseKey);

function generateSlug(designer: string, name: string): string {
  const base = `${designer}-${name}`
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
  const randomSuffix = Math.random().toString(36).substring(2, 6);
  return `${base}-${randomSuffix}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      name,
      designer,
      category,
      price,
      currency = "USD",
      condition_state,
      dimensions,
      materials,
      ash_styling_tip,
      image_url,
      gallery_images,
      source_url,
      description,
    } = body;

    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };

    if (!name || !price) {
      return NextResponse.json(
        { error: "Nombre y precio son obligatorios." },
        { status: 400, headers: corsHeaders }
      );
    }

    const slug = generateSlug(designer || "vintage", name);
    let assignedId = `item-${Date.now()}`;

    // 1. Guardar en Supabase dejando que Postgres autogenere el UUID nativo
    try {
      const { data: supaData, error: supaErr } = await supabase
        .from("products")
        .insert([{
          slug,
          name,
          designer: designer || "Curaduría Ash",
          category: category || "bolsos",
          price: Number(price),
          currency: (currency as any) || "USD",
          condition_state: condition_state || "Excellent (Excelente estado)",
          dimensions: dimensions || "",
          materials: materials || "",
          ash_styling_tip: ash_styling_tip || "",
          image_url: image_url || "",
          gallery_images: Array.isArray(gallery_images) && gallery_images.length > 0 ? gallery_images : [image_url],
          source_url: source_url || "",
          description: description || `Pieza única curada por Ash Mateu. Autenticidad verificada.`,
          is_unique_piece: true,
          status: "available",
          stock: 1,
          active: true,
        }])
        .select()
        .single();

      if (supaErr) {
        console.error("Aviso Supabase insert:", supaErr.message);
      } else if (supaData && supaData.id) {
        assignedId = supaData.id;
        console.log("¡Pieza guardada en Supabase con éxito! ID:", assignedId);
      }
    } catch (supaErr) {
      console.warn("Supabase no disponible o pausado, guardado en almacenamiento local:", supaErr);
    }

    const productRecord = {
      id: assignedId,
      slug,
      name,
      designer: designer || "Curaduría Ash",
      category: category || "bolsos",
      price: Number(price),
      currency: (currency as any) || "USD",
      condition_state: condition_state || "Excellent (Excelente estado)",
      dimensions: dimensions || "",
      materials: materials || "",
      ash_styling_tip: ash_styling_tip || "",
      image_url: image_url || "",
      gallery_images: Array.isArray(gallery_images) && gallery_images.length > 0 ? gallery_images : [image_url],
      source_url: source_url || "",
      description: description || `Pieza única curada por Ash Mateu. Autenticidad verificada.`,
      is_unique_piece: true,
      status: "available" as const,
      stock: 1,
    };

    // 2. Guardar también en almacenamiento local persistente
    saveStoredProduct(productRecord);

    // 3. Revalidar de inmediato la caché en Vercel para que aparezca al instante
    try {
      revalidatePath("/mercadito");
      revalidatePath("/admin");
      revalidatePath("/mercadito/admin");
    } catch (revalErr) {
      console.warn("Error al revalidar rutas:", revalErr);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Pieza única importada con éxito a El Mercadito",
        product: productRecord,
      },
      { headers: corsHeaders }
    );
  } catch (err: any) {
    console.error("Error en POST /api/mercadito/import:", err);
    return NextResponse.json(
      { error: err.message || "Error interno al procesar el producto." },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  }
}

// Permitir preflight CORS para peticiones desde The RealReal en el navegador
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
