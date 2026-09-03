import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getAllOrders, updateOrderStatus } from "@/lib/mercadito-orders-storage";

export async function GET(req: NextRequest) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const orders = await getAllOrders();
    return NextResponse.json({ success: true, orders });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Error al obtener órdenes" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { orderId, status, notes } = body;

    if (!orderId || !status) {
      return NextResponse.json({ error: "orderId y status son requeridos" }, { status: 400 });
    }

    await updateOrderStatus(orderId, status, notes);

    return NextResponse.json({ success: true, message: "Estado de la orden actualizado" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Error al actualizar orden" }, { status: 500 });
  }
}
