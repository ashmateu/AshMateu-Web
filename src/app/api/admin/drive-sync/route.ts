import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getAllOrders } from "@/lib/mercadito-orders-storage";
import { getAllCustomers } from "@/lib/mercadito-customers-storage";
import { generateExcelWorkbookXML } from "@/lib/excel-export";

const TARGET_DRIVE_ACCOUNT = "info@ashmateu.com";
const TARGET_FOLDER_NAME = "VENTAS";

export async function POST(req: NextRequest) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const orders = await getAllOrders();
    const customers = await getAllCustomers();
    const todayStr = new Date().toISOString().split("T")[0];
    const fileName = `AshMateu_VENTAS_${todayStr}.xls`;
    const excelXml = generateExcelWorkbookXML(orders, customers);

    // Si existe webhook configurado para Google Drive (ej: Zapier / Make / Google Apps Script de info@ashmateu.com)
    const webhookUrl = process.env.GOOGLE_DRIVE_WEBHOOK_URL;
    let webhookTriggered = false;

    if (webhookUrl) {
      try {
        const res = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            account: TARGET_DRIVE_ACCOUNT,
            folder: TARGET_FOLDER_NAME,
            fileName,
            fileContentBase64: Buffer.from(excelXml).toString("base64"),
            ordersCount: orders.length,
            customersCount: customers.length,
            timestamp: new Date().toISOString(),
          }),
        });
        webhookTriggered = res.ok;
      } catch (e) {
        console.error("Error triggering Drive webhook:", e);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Archivo '${fileName}' preparado para Google Drive (${TARGET_DRIVE_ACCOUNT} / carpeta '${TARGET_FOLDER_NAME}')`,
      targetAccount: TARGET_DRIVE_ACCOUNT,
      folderName: TARGET_FOLDER_NAME,
      fileName,
      webhookTriggered,
      ordersCount: orders.length,
      customersCount: customers.length,
      timestamp: new Date().toISOString(),
      driveUrl: "https://drive.google.com/drive/u/0/my-drive",
      instructions: webhookTriggered
        ? "Sincronizado exitosamente mediante webhook con Google Drive."
        : "Descarga el archivo Excel con 1-click y arrástralo directamente a tu carpeta 'VENTAS' en Google Drive (info@ashmateu.com), o configura GOOGLE_DRIVE_WEBHOOK_URL para sincronización en tiempo real automática.",
    });
  } catch (err: any) {
    console.error("Error en sincronización con Drive:", err);
    return NextResponse.json(
      { error: err.message || "Error al sincronizar con Google Drive" },
      { status: 500 }
    );
  }
}
