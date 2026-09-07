import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const CUSTOMER_COOKIE_NAME = "ash_customer_session";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(CUSTOMER_COOKIE_NAME);

    return NextResponse.json({ success: true, message: "Sesión cerrada correctamente" });
  } catch (err: any) {
    console.error("Error al cerrar sesión de cliente:", err);
    return NextResponse.json(
      { error: "Error al cerrar sesión" },
      { status: 500 }
    );
  }
}
