import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getAllOrders } from "@/lib/mercadito-orders-storage";
import { getAllCustomers } from "@/lib/mercadito-customers-storage";
import { generateExcelWorkbookXML, generateMarketingCSV } from "@/lib/excel-export";

export async function GET(req: NextRequest) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const format = searchParams.get("format") || "excel";

    const orders = await getAllOrders();
    const customers = await getAllCustomers();

    const todayStr = new Date().toISOString().split("T")[0];

    if (format === "csv") {
      const csvData = generateMarketingCSV(customers);
      return new NextResponse(csvData, {
        status: 200,
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="AshMateu_Base_Marketing_${todayStr}.csv"`,
        },
      });
    }

    // Default: Multi-sheet Excel workbook (XML 2003)
    const excelXml = generateExcelWorkbookXML(orders, customers);

    return new NextResponse(excelXml, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.ms-excel; charset=utf-8",
        "Content-Disposition": `attachment; filename="AshMateu_VENTAS_y_Marketing_${todayStr}.xls"`,
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (err: any) {
    console.error("Error exportando excel:", err);
    return NextResponse.json(
      { error: err.message || "Error al exportar archivo" },
      { status: 500 }
    );
  }
}
