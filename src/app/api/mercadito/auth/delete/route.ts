import { NextRequest, NextResponse } from "next/server";
import { deleteCustomer } from "@/lib/mercadito-customers-storage";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const CUSTOMER_COOKIE_NAME = "ash_customer_session";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(CUSTOMER_COOKIE_NAME);

    const body = await req.json().catch(() => ({}));
    let targetEmail = body.email;

    if (!targetEmail && sessionCookie?.value) {
      try {
        const parsed = JSON.parse(sessionCookie.value);
        targetEmail = parsed.email;
      } catch (e) {}
    }

    if (!targetEmail) {
      return NextResponse.json(
        { error: "No se identificó la cuenta a eliminar." },
        { status: 400 }
      );
    }

    const removed = await deleteCustomer(targetEmail, targetEmail);

    // Borrar cookie de sesión
    cookieStore.delete(CUSTOMER_COOKIE_NAME);

    return NextResponse.json({
      success: true,
      message: "Tu cuenta y datos han sido eliminados de la base de datos.",
      removed,
    });
  } catch (err: any) {
    console.error("Error al eliminar cuenta de cliente:", err);
    return NextResponse.json(
      { error: err.message || "Error al eliminar la cuenta." },
      { status: 500 }
    );
  }
}
