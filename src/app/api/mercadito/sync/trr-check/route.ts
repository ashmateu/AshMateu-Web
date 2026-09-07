import { NextRequest, NextResponse } from "next/server";
import { syncAllTRRProducts, markProductAsSold } from "@/lib/trr-stock-checker";
import { getStoredProducts } from "@/lib/mercadito-storage";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get("action");

    // Si la extensión o el cliente solicita sólo la lista de URLs a verificar
    if (action === "list") {
      const products = getStoredProducts();
      const active = products
        .filter((p) => p.status === "available" && p.source_url)
        .map((p) => ({
          id: p.id,
          name: p.name,
          designer: p.designer,
          source_url: p.source_url,
          image_url: p.image_url,
        }));

      return NextResponse.json({ success: true, count: active.length, products: active }, { headers: corsHeaders });
    }

    // Ejecución de verificación completa
    const result = await syncAllTRRProducts();

    return NextResponse.json(
      {
        success: true,
        message: `Sincronización finalizada. ${result.soldCount} piezas marcadas como Sold Out de ${result.checkedCount} verificadas.`,
        checkedCount: result.checkedCount,
        soldCount: result.soldCount,
        botProtectedCount: result.botProtectedCount,
        results: result.results,
        timestamp: new Date().toISOString(),
      },
      { headers: corsHeaders }
    );
  } catch (err: any) {
    console.error("Error en GET /api/mercadito/sync/trr-check:", err);
    return NextResponse.json(
      { error: err.message || "Error al verificar stock de The RealReal" },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { markSoldIds, singleId, reason } = body;

    // Si la extensión o el admin envía IDs específicos para marcar como vendidos
    if (Array.isArray(markSoldIds) && markSoldIds.length > 0) {
      const marked: string[] = [];
      for (const id of markSoldIds) {
        const ok = await markProductAsSold(id, reason || "Agotado en The RealReal (Reportado por Extensión)");
        if (ok) marked.push(id);
      }

      return NextResponse.json(
        {
          success: true,
          message: `${marked.length} piezas marcadas como Sold Out`,
          marked,
          timestamp: new Date().toISOString(),
        },
        { headers: corsHeaders }
      );
    }

    if (singleId) {
      await markProductAsSold(singleId, reason || "Marcado manualmente como Vendido");
      return NextResponse.json(
        {
          success: true,
          message: `Pieza [${singleId}] marcada como Sold Out`,
          id: singleId,
        },
        { headers: corsHeaders }
      );
    }

    // Si no se pasaron IDs específicos, correr escaneo general
    const result = await syncAllTRRProducts();

    return NextResponse.json(
      {
        success: true,
        message: `Escaneo completo: ${result.soldCount} piezas marcadas como Sold Out.`,
        ...result,
        timestamp: new Date().toISOString(),
      },
      { headers: corsHeaders }
    );
  } catch (err: any) {
    console.error("Error en POST /api/mercadito/sync/trr-check:", err);
    return NextResponse.json(
      { error: err.message || "Error al procesar sincronización de stock" },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}
