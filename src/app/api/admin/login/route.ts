import { NextRequest, NextResponse } from "next/server";
import { validateCredentials, setAdminSession } from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Por favor ingresa usuario y contraseña" },
        { status: 400 }
      );
    }

    const isValid = validateCredentials(username.trim(), password.trim());

    if (!isValid) {
      return NextResponse.json(
        { error: "Usuario o contraseña incorrectos" },
        { status: 401 }
      );
    }

    await setAdminSession();

    return NextResponse.json({
      success: true,
      message: "Sesión iniciada correctamente",
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Error al autenticar" },
      { status: 500 }
    );
  }
}
