import { NextResponse } from "next/server";
import {
  nvidiaAI,
  DEFAULT_NVIDIA_MODEL,
  CONCIERGE_SYSTEM_PROMPT,
} from "@/lib/nvidia-ai";

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { messages } = body as { messages: ChatMessage[] };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Se requiere un array de mensajes válido." },
        { status: 400 }
      );
    }

    // Limit conversation history length to avoid huge payload tokens
    const recentMessages = messages.slice(-10);

    const fullMessages: ChatMessage[] = [
      { role: "system", content: CONCIERGE_SYSTEM_PROMPT },
      ...recentMessages,
    ];

    const completion = await nvidiaAI.chat.completions.create({
      model: DEFAULT_NVIDIA_MODEL,
      messages: fullMessages,
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 0.95,
    });

    const reply =
      completion.choices[0]?.message?.content ||
      "Gracias por tu consulta. Podés coordinar una reunión de trabajo o enviar tu brief detallado directamente a info@ashmateu.com o por WhatsApp al +54 9 11 2382-3297.";

    return NextResponse.json({
      success: true,
      message: reply,
    });
  } catch (error: any) {
    console.error("Error en API Concierge NVIDIA NIM:", error);

    // Graceful editorial fallback response in case of upstream rate limit or network issue
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Error al procesar la consulta con IA",
        fallbackMessage:
          "Disculpas, estamos experimentando una alta demanda en el Concierge. Para avanzar con tu proyecto de styling, dirección creativa o novias, podés escribirnos directamente a info@ashmateu.com o por WhatsApp al +54 9 11 2382-3297.",
      },
      { status: 200 }
    );
  }
}
