import {
  qwenAI,
  PRIMARY_QWEN_MODEL,
  BACKUP_QWEN_MODEL,
  CONCIERGE_SYSTEM_PROMPT,
  ChatMessage,
} from "@/lib/qwen-ai";

export const dynamic = "force-dynamic";
export const maxDuration = 45;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { messages, userContext } = body as {
      messages: ChatMessage[];
      userContext?: string;
    };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Se requiere un array de mensajes válido." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const recentMessages = messages.slice(-8);

    const fullMessages: ChatMessage[] = [
      {
        role: "system",
        content: userContext
          ? `${CONCIERGE_SYSTEM_PROMPT}\n\n[CONTEXTO DEL USUARIO]: ${userContext}`
          : CONCIERGE_SYSTEM_PROMPT,
      },
      ...recentMessages,
    ];

    const encoder = new TextEncoder();

    // 1. Intento primario: Qwen Max en Streaming
    try {
      const stream = await qwenAI.chat.completions.create({
        model: PRIMARY_QWEN_MODEL,
        messages: fullMessages,
        temperature: 0.7,
        max_tokens: 1024,
        top_p: 0.95,
        stream: true,
      });

      const readableStream = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of stream) {
              const text = chunk.choices[0]?.delta?.content || "";
              if (text) {
                controller.enqueue(encoder.encode(text));
              }
            }
            controller.close();
          } catch (streamErr) {
            console.error("Error durante el streaming de Qwen Max:", streamErr);
            controller.error(streamErr);
          }
        },
      });

      return new Response(readableStream, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Transfer-Encoding": "chunked",
          "Cache-Control": "no-cache, no-transform",
        },
      });
    } catch (primaryError) {
      console.warn(
        "Fallo primario con Qwen Max, intentando backup stream con Qwen Turbo:",
        primaryError
      );

      // 2. Fallback: Qwen Turbo en Streaming (~600ms)
      const backupStream = await qwenAI.chat.completions.create({
        model: BACKUP_QWEN_MODEL,
        messages: fullMessages,
        temperature: 0.7,
        max_tokens: 800,
        stream: true,
      });

      const readableStream = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of backupStream) {
              const text = chunk.choices[0]?.delta?.content || "";
              if (text) {
                controller.enqueue(encoder.encode(text));
              }
            }
            controller.close();
          } catch (streamErr) {
            controller.error(streamErr);
          }
        },
      });

      return new Response(readableStream, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Transfer-Encoding": "chunked",
          "Cache-Control": "no-cache, no-transform",
        },
      });
    }
  } catch (error: any) {
    console.error("Error crítico en API Concierge:", error);

    return new Response(
      "¡Hola! Estoy en línea en el Atelier de Ash Mateu. Para avanzar con tu proyecto de styling o dirección de arte, podés escribirnos directamente a info@ashmateu.com o por WhatsApp al +54 9 11 2382-3297.",
      {
        status: 200,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      }
    );
  }
}
