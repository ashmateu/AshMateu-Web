import { NextRequest, NextResponse } from "next/server";
import { getSiteImagesConfig, saveSiteImageConfig, SiteImageConfig } from "@/lib/site-images";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export async function GET() {
  const images = getSiteImagesConfig();
  return NextResponse.json({ success: true, images });
}

export async function POST(req: NextRequest) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const body: SiteImageConfig = await req.json();

    if (!body.id || !body.src) {
      return NextResponse.json({ error: "Faltan datos de la imagen" }, { status: 400 });
    }

    saveSiteImageConfig(body);
    return NextResponse.json({ success: true, message: "Imagen actualizada con éxito" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Error al guardar imagen" }, { status: 500 });
  }
}
