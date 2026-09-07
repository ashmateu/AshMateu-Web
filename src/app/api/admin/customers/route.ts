import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getAllCustomers, createOrUpdateCustomer } from "@/lib/mercadito-customers-storage";

export async function GET(req: NextRequest) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const customers = await getAllCustomers();
    return NextResponse.json({ success: true, customers });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Error al obtener clientes" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const customer = await createOrUpdateCustomer(body);
    return NextResponse.json({ success: true, customer });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Error al guardar cliente" }, { status: 500 });
  }
}
