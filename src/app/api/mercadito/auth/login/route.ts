import { NextRequest, NextResponse } from "next/server";
import { getCustomerByEmail } from "@/lib/mercadito-customers-storage";
import { cookies } from "next/headers";

const CUSTOMER_COOKIE_NAME = "ash_customer_session";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email) {
      return NextResponse.json(
        { error: "El email es obligatorio." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const customer = await getCustomerByEmail(cleanEmail);

    if (!customer) {
      return NextResponse.json(
        { error: "No encontramos una cuenta registrada con este email. Por favor regístrate como miembro." },
        { status: 404 }
      );
    }

    // Si el usuario registró contraseña y se envió contraseña para verificar
    if (customer.password && password && customer.password !== password) {
      return NextResponse.json(
        { error: "Contraseña incorrecta. Inténtalo nuevamente." },
        { status: 401 }
      );
    }

    // Guardar sesión en cookie segura
    const cookieStore = await cookies();
    cookieStore.set(
      CUSTOMER_COOKIE_NAME,
      JSON.stringify({ id: customer.id, email: customer.email, name: customer.name }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 días
      }
    );

    return NextResponse.json({
      success: true,
      customer: {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        instagram: customer.instagram,
        city: customer.city,
        country: customer.country,
        marketingOptIn: customer.marketingOptIn,
        ordersCount: customer.ordersCount,
        totalSpent: customer.totalSpent,
      },
    });
  } catch (err: any) {
    console.error("Error en login cliente:", err);
    return NextResponse.json(
      { error: err.message || "Error al iniciar sesión." },
      { status: 500 }
    );
  }
}
