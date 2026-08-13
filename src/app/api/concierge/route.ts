import { NextResponse } from "next/server";
import {
  nvidiaAI,
  PRIMARY_NVIDIA_MODEL,
  BACKUP_NVIDIA_MODEL,
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
    const recentMessages = messages.slice(-8);

    const fullMessages: ChatMessage[] = [
      { role: "system", content: CONCIERGE_SYSTEM_PROMPT },
      ...recentMessages,
    ];

    let reply = "";

    // 1. Try Primary Model (gpt-oss-120b)
    try {
      const completion = await nvidiaAI.chat.completions.create({
        model: PRIMARY_NVIDIA_MODEL,
        messages: fullMessages,
        temperature: 0.7,
        max_tokens: 800,
      });
      reply = completion.choices[0]?.message?.content || "";
    } catch (primaryErr) {
      console.warn("Primary model error, attempting backup model:", primaryErr);

      // 2. Fallback to Backup Model (llama-3.1-8b-instruct)
      try {
        const backupCompletion = await nvidiaAI.chat.completions.create({
          model: BACKUP_NVIDIA_MODEL,
          messages: fullMessages,
          temperature: 0.7,
          max_tokens: 800,
        });
        reply = backupCompletion.choices[0]?.message?.content || "";
      } catch (backupErr) {
        console.error("Backup model also failed:", backupErr);
      }
    }

    if (!reply) {
      reply =
        "Gracias por tu consulta. Podés coordinar una reunión de trabajo o enviar tu brief detallado directamente a info@ashmateu.com o por WhatsApp al +54 9 11 2382-3297.";
    }

    return NextResponse.json({
      success: true,
      message: reply,
    });
  } catch (error: any) {
    console.error("Error en API Concierge:", error);

    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Error al procesar la consulta con IA",
        message:
          "Gracias por tu mensaje. Para coordinar los detalles de tu producción o asesoramiento de imagen, podés comunicarte directamente a info@ashmateu.com o por WhatsApp al +54 9 11 2382-3297.",
      },
      { status: 200 }
    );
  }
}
