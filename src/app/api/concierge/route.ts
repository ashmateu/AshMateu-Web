import { NextResponse } from "next/server";
import { generateConciergeReply, ChatMessage } from "@/lib/nvidia-ai";

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
          "Gracias por tu mensaje. Para coordinar los detalles de tu producción o asesoramiento de imagen, podés comunicarte directamente a info@ashmateu.com o por WhatsApp al +54 9 11 2382-3297.",
      },
      { status: 200 }
    );
  }
}
