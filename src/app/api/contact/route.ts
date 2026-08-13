import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations/contact";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = contactSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        { error: "Datos inválidos", details: validatedData.error.issues },
        { status: 400 }
      );
    }

    // Process contact inquiry (e.g. email / notification / database)
    console.log("Nuevo contacto recibido:", validatedData.data);

    return NextResponse.json({
      success: true,
      message: "Consulta recibida exitosamente",
    });
  } catch (error) {
    console.error("Error en API contact:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
