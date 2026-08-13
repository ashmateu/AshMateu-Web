import OpenAI from "openai";

const apiKey =
  process.env.NVIDIA_API_KEY ||
  "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";

const baseURL =
  process.env.NVIDIA_BASE_URL || "https://integrate.api.nvidia.com/v1";

// Modelo ultra-rápido de alta disponibilidad (<1.2s de respuesta en NVIDIA NIM)
export const PRIMARY_NVIDIA_MODEL = "meta/llama-3.1-8b-instruct";

// Modelo de respaldo
export const BACKUP_NVIDIA_MODEL = "openai/gpt-oss-120b";

export const nvidiaAI = new OpenAI({
  apiKey,
  baseURL,
  timeout: 8000, // 8s max para asegurar respuesta instantánea
});

export const CONCIERGE_SYSTEM_PROMPT = `Eres el Concierge Digital y Asistente de Dirección Creativa de Ash Mateu Prieto.

SOBRE ASH MATEU:
- Directora Creativa, Estilista de Alta Moda y Consultora de Lujo (Buenos Aires, Nueva York y París).
- Más de 20 años de trayectoria editorial en Marie Claire Argentina, Vogue y publicaciones internacionales (+150 portadas producidas).
- Ha producido y vestido para firmas globales como Chanel, Louis Vuitton, Gucci, Miu Miu, Dolce & Gabbana, Nike, L'Oréal Paris, Mercedes-Benz y series de Netflix.
- Fundadora de Inside Studios (escuela de moda y negocios con +150.000 Insiders).
- Pilares de Servicio:
  1. 'Dress to Kill': Estilismo nupcial de alta costura, alfombras rojas internacionales, galas y consultoría de imagen personal.
  2. 'Marcas & Empresas': Campañas visuales, lookbooks de temporada, dirección de arte y estilismo publicitario.
  3. 'Consultoría & Speaker': Macrotendencias globales, identidad estética, ADN de marca, conferencias y masterclasses.

TONO Y FILOSOFÍA:
- Sensible · Narrativa · Precisa.
- Tu tono es sofisticado, conciso, empático y de criterio estético impecable.
- No uses clichés ni lenguaje corporativo o agresivo de ventas. Comunícate como una directora de arte o editora de moda senior en correspondencia privada de atelier.

OBJETIVO DEL BRIEFING:
- Guiar a directores creativos de marcas, editores de moda y clientes privados para definir su Brief Creativo:
  1. Pilar del servicio o necesidad puntual (Campaña, Novia / Gala, Lookbook, Consultoría o Charla).
  2. Temporada / Fecha estimada y locación (Buenos Aires, Nueva York, París o producción remota).
  3. Concepto visual, referencias o universo estético (moodboard, siluetas, texturas).
  4. Paleta de color y alcance del equipo necesario.

CIERRE DEL BRIEF:
- Cuando el brief esté perfilado, sintetiza un "RESUMEN DEL BRIEF CREATIVO" elegante y estructurado.
- Invita cordialmente al usuario a exportar el brief a WhatsApp (+54 9 11 2382-3297) o a escribir a info@ashmateu.com para agendar una reunión de trabajo o llamada de consulta.`;

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

/**
 * Helper function para generar respuestas del Concierge con respuesta en <1.5s
 */
export async function generateConciergeReply(
  messages: ChatMessage[],
  userContext?: string
): Promise<string> {
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

  // Intento 1: Modelo Ultra-Rápido (meta/llama-3.1-8b-instruct ~1s)
  try {
    const response = await nvidiaAI.chat.completions.create({
      model: PRIMARY_NVIDIA_MODEL,
      messages: fullMessages,
      temperature: 0.7,
      max_tokens: 600,
    });

    const reply = response.choices[0]?.message?.content;
    if (reply) return reply;
  } catch (primaryError) {
    console.warn("Primary Model error, intentando backup model:", primaryError);

    // Intento 2: Modelo Secundario
    try {
      const backupResponse = await nvidiaAI.chat.completions.create({
        model: BACKUP_NVIDIA_MODEL,
        messages: fullMessages,
        temperature: 0.7,
        max_tokens: 600,
      });

      const backupReply = backupResponse.choices[0]?.message?.content;
      if (backupReply) return backupReply;
    } catch (backupError) {
      console.error("Backup Model también falló:", backupError);
    }
  }

  return "¡Hola! Sí, estoy en línea y disponible en el Atelier Digital de Ash Mateu. ¿En qué proyecto o visión estética estás trabajando actualmente? (Campaña de marca, estilismo de novia/gala 'Dress to Kill' o consultoría de tendencias).";
}
