import { NextRequest, NextResponse } from "next/server";
import { createOrUpdateCustomer, getCustomerByEmail } from "@/lib/mercadito-customers-storage";
import { cookies } from "next/headers";

const CUSTOMER_COOKIE_NAME = "ash_customer_session";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, instagram, city, country, password, marketingOptIn } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Nombre, email y WhatsApp son obligatorios para registrarte." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const existing = await getCustomerByEmail(cleanEmail);

    if (existing && existing.password && password && existing.password !== password) {
      // Si el usuario ya existe y tiene contraseña pero ingresó otra
      return NextResponse.json(
        { 
          error: "Ya existe una cuenta con este email. Por favor selecciona 'Iniciar Sesión' con tu contraseña.",
          existingAccount: true 
        },
        { status: 400 }
      );
    }

    const customer = await createOrUpdateCustomer({
      name,
      email: cleanEmail,
      phone,
      instagram: instagram || "",
      city: city || "",
      country: country || "Argentina",
      password: password || existing?.password || "",
      marketingOptIn: marketingOptIn ?? true,
    });

    // Guardar sesión en cookie segura
    const cookieStore = await cookies();
    cookieStore.set(CUSTOMER_COOKIE_NAME, JSON.stringify({ id: customer.id, email: customer.email, name: customer.name }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 días
    });

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
    console.error("Error registrando cliente:", err);
    return NextResponse.json(
      { error: err.message || "Error al procesar el registro." },
      { status: 500 }
    );
  }
}
