import { NextResponse } from "next/server";
import { generateConciergeReply, ChatMessage } from "@/lib/nvidia-ai";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { messages, userContext } = body as {
      messages: ChatMessage[];
      userContext?: string;
    };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Se requiere un array de mensajes válido." },
        { status: 400 }
      );
    }

    const reply = await generateConciergeReply(messages, userContext);

    return NextResponse.json({
      success: true,
      message: reply,
    });
  } catch (error: any) {
    console.error("Error en API Concierge:", error);

    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Error al procesar la consulta",
        message:
          "¡Hola! Estoy en línea. Para avanzar con tu proyecto de styling, dirección de arte o briefing de novias, contame sobre tu concepto o escribinos a info@ashmateu.com / WhatsApp (+54 9 11 2382-3297).",
      },
      { status: 200 }
    );
  }
}
