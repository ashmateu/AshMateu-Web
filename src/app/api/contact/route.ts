import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations/contact";

const FORMSPREE_CONTACT_URL =
  process.env.FORMSPREE_CONTACT_URL || "https://formspree.io/f/xeebjqpq";

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

    const { nombre, empresa, tipoProyecto, email, mensaje } = validatedData.data;

    // Reenvío automático a Formspree (ID: xeebjqpq)
    try {
      const formspreeRes = await fetch(FORMSPREE_CONTACT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `Nuevo contacto de ${nombre} — ${tipoProyecto} (ashmateu.com)`,
          _language: "es",
          nombre,
          empresa: empresa || "No especificada",
          tipo_proyecto: tipoProyecto,
          email,
          mensaje,
          source: "ashmateu_web_contact_form",
          timestamp: new Date().toISOString(),
        }),
      });

      if (!formspreeRes.ok) {
        console.warn(
          "Formspree retorno un status no-200:",
          formspreeRes.status,
          await formspreeRes.text().catch(() => "")
        );
      }
    } catch (formspreeError) {
      console.error("Error al enviar a Formspree:", formspreeError);
    }

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
