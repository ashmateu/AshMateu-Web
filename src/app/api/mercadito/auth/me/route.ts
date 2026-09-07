import { NextRequest, NextResponse } from "next/server";
import { getCustomerByEmail } from "@/lib/mercadito-customers-storage";
import { cookies } from "next/headers";

const CUSTOMER_COOKIE_NAME = "ash_customer_session";

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(CUSTOMER_COOKIE_NAME);

    if (!sessionCookie?.value) {
      return NextResponse.json({ authenticated: false, customer: null });
    }

    let sessionData: { id?: string; email?: string } | null = null;
    try {
      sessionData = JSON.parse(sessionCookie.value);
    } catch {
      return NextResponse.json({ authenticated: false, customer: null });
    }

    if (!sessionData?.email) {
      return NextResponse.json({ authenticated: false, customer: null });
    }

    const customer = await getCustomerByEmail(sessionData.email);

    if (!customer) {
      return NextResponse.json({ authenticated: false, customer: null });
    }

    return NextResponse.json({
      authenticated: true,
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
    console.error("Error obteniendo sesión de cliente:", err);
    return NextResponse.json({ authenticated: false, customer: null });
  }
}
