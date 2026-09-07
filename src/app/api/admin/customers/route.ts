import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getAllCustomers, createOrUpdateCustomer, deleteCustomer } from "@/lib/mercadito-customers-storage";

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

export async function DELETE(req: NextRequest) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, email } = body;

    const target = id || email;
    if (!target) {
      return NextResponse.json({ error: "id o email es requerido para eliminar" }, { status: 400 });
    }

    const removed = await deleteCustomer(target);
    return NextResponse.json({ success: true, removed });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Error al eliminar cliente" }, { status: 500 });
  }
}

