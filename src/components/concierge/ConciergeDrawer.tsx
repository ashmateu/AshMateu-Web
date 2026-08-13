"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Sparkles,
  X,
  Send,
  ArrowUpRight,
  RotateCcw,
  Copy,
  Check,
  ChevronRight,
  Mail,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const STARTER_PROMPTS = [
  {
    label: "01 · Campañas & Lookbooks de Marca",
    text: "Hola Ash, represento a una marca y estamos proyectando la próxima campaña visual. Necesitamos definir concepto, dirección de arte, estilismo y locaciones.",
  },
  {
    label: "02 · Novias & Galas de Alta Costura",
    text: "Hola, busco asesoramiento para un estilismo nupcial / gala 'Dress to Kill'. Deseo un look inolvidable y exclusivo de alta costura. ¿Cómo iniciamos?",
  },
  {
    label: "03 · Dirección Creativa & Branding",
    text: "Hola Ash, queremos rediseñar el universo estético y ADN visual de nuestra firma de moda. ¿Cuál es la metodología de trabajo para este proceso?",
  },
  {
    label: "04 · Inside Studios & Masterclasses",
    text: "Hola, nos interesa coordinar una conferencia, masterclass ejecutiva o consultoría sobre macrotendencias globales de moda y consumo.",
  },
];

export default function ConciergeDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial-welcome",
      role: "assistant",
      content:
        "Bienvenido/a al Concierge Editorial de Ash Mateu.\n\nEste espacio está diseñado para asistir a directores creativos de marcas, editores y clientes privados en la articulación de su Brief Creativo.\n\n¿Qué tipo de proyecto, producción visual o concepto estético estás buscando desarrollar?",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll al final del chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Foco al input cuando se abre el drawer
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen]);

  // Listener para eventos globales de apertura (desde botones en el sitio)
  useEffect(() => {
    const handleOpenConcierge = () => setIsOpen(true);
    window.addEventListener("open-concierge", handleOpenConcierge);
    return () => window.removeEventListener("open-concierge", handleOpenConcierge);
  }, []);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/concierge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!res.ok || !res.body) {
        throw new Error("No stream body available");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantText = "";
      const assistantId = (Date.now() + 1).toString();
      const timestamp = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      // Crear mensaje asistente inicial
      setMessages((prev) => [
        ...prev,
        {
          id: assistantId,
          role: "assistant",
          content: "",
          timestamp,
        },
      ]);
      setIsLoading(false);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        assistantText += chunk;

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: assistantText } : m
          )
        );
      }
    } catch (err) {
      console.error("Error al comunicarse con el concierge:", err);
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "¡Hola! Sí, estoy en línea en el Atelier Digital de Ash Mateu. ¿En qué tipo de proyecto o producción estás trabajando? Podés escribirnos también a info@ashmateu.com o por WhatsApp al +54 9 11 2382-3297.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: "initial-welcome",
        role: "assistant",
        content:
          "Conversación reiniciada.\n\n¿En qué podemos inspirarte hoy? Contanos sobre tu próxima producción, look de gala o estrategia de marca.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  };

  // Generar enlace estructurado para WhatsApp
  const generateWhatsAppLink = () => {
    const userPrompts = messages
      .filter((m) => m.role === "user")
      .map((m) => `• ${m.content}`)
      .join("\n");

    const text = encodeURIComponent(
      `Hola Ash, estuve delineando este brief para mi proyecto en tu Concierge Editorial:\n\n${userPrompts || "Quiero consultar por una producción / estilismo."}\n\n¿Podemos coordinar una reunión de trabajo o llamada de consulta?`
    );

    return `https://wa.me/5491123823297?text=${text}`;
  };

  const handleCopyConversation = () => {
    const fullText = messages
      .map(
        (m) =>
          `[${m.role === "user" ? "CLIENTE" : "CONCIERGE ASH MATEU"}]:\n${m.content}`
      )
      .join("\n\n---\n\n");

    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* 1. DISPARADOR FLOTANTE EDITORIAL DISCRETO */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 bg-[#0A0A0A]/95 hover:bg-black text-[#F7F3EE] border border-[#B5A898]/40 hover:border-white px-4.5 py-3 rounded-full shadow-[0_10px_35px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-300 active:scale-[0.98] cursor-pointer"
          aria-label="Abrir Concierge Editorial VIP"
        >
          {/* Indicador sutil pulsante */}
          <div className="relative flex items-center justify-center w-2.5 h-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#B5A898] opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B5A898]" />
          </div>

          <div className="flex flex-col text-left">
            <span className="text-[9px] tracking-[0.26em] uppercase text-[#B5A898] font-semibold group-hover:text-white transition-colors">
              Creative Concierge
            </span>
            <span className="font-serif text-[12px] italic tracking-wide text-white/90">
              Briefing &amp; Creative Consultation
            </span>
          </div>

          <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[#B5A898] group-hover:bg-white group-hover:text-black transition-all duration-300 ml-1">
            <Sparkles size={12} />
          </div>
        </button>
      </div>

      {/* 2. OVERLAY BACKDROP */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300"
        />
      )}

      {/* 3. SLIDE-OVER DRAWER DE ALTA COSTURA */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-full sm:w-[480px] md:w-[540px] bg-[#F7F3EE] text-[#0A0A0A] z-50 shadow-2xl flex flex-col justify-between border-l border-[#B5A898]/40 transition-transform duration-500 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* CABECERA EDITORIAL */}
        <div className="p-6 md:p-7 border-b border-[#B5A898]/30 bg-white/70 backdrop-blur-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#0A0A0A] text-[#F7F3EE] flex items-center justify-center shadow-sm">
              <Sparkles size={14} className="text-[#B5A898]" />
            </div>
            <div>
              <span className="text-[9px] tracking-[0.28em] uppercase text-[#7A6A5A] font-semibold block">
                Atelier Ash Mateu Prieto
              </span>
              <h3 className="font-serif text-lg text-black font-normal leading-none mt-0.5">
                Briefing &amp; Creative <span className="italic text-[#7A6A5A]">Consultation</span>
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleReset}
              title="Reiniciar conversación"
              className="p-2 text-[#7A6A5A] hover:text-black hover:bg-black/5 rounded-full transition-colors cursor-pointer"
            >
              <RotateCcw size={14} />
            </button>
            <button
              onClick={handleCopyConversation}
              title="Copiar brief generado"
              className="p-2 text-[#7A6A5A] hover:text-black hover:bg-black/5 rounded-full transition-colors cursor-pointer"
            >
              {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-[#7A6A5A] hover:text-black hover:bg-black/5 rounded-full transition-colors cursor-pointer ml-1"
              aria-label="Cerrar Concierge"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* CUERPO DEL DIÁLOGO (CORRESPONDENCIA DE ATELIER) */}
        <div className="flex-1 overflow-y-auto p-6 md:p-7 space-y-6">
          {/* BADGE DE CALIBRACIÓN */}
          <div className="text-center py-2">
            <span className="inline-block px-3 py-1 bg-[#B5A898]/15 border border-[#B5A898]/30 rounded-full text-[8.5px] tracking-[0.24em] uppercase text-[#7A6A5A] font-medium">
              Creative Intelligence · Powered by Qwen AI
            </span>
          </div>

          {messages.map((m) => {
            const isAssistant = m.role === "assistant";
            return (
              <div
                key={m.id}
                className={`flex flex-col ${
                  isAssistant ? "items-start" : "items-end"
                }`}
              >
                <span className="text-[8.5px] tracking-[0.2em] uppercase text-[#7A6A5A] mb-1.5 font-medium px-1">
                  {isAssistant ? "Ash Mateu Concierge" : "Tu Consulta"} · {m.timestamp}
                </span>

                <div
                  className={`p-4.5 md:p-5 rounded-2xl max-w-[92%] sm:max-w-[88%] text-xs md:text-[13px] leading-relaxed shadow-sm ${
                    isAssistant
                      ? "bg-white border border-[#B5A898]/35 text-[#0A0A0A] font-light rounded-tl-sm whitespace-pre-wrap selection:bg-[#B5A898]/30"
                      : "bg-[#0A0A0A] text-[#F7F3EE] font-normal rounded-tr-sm whitespace-pre-wrap"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            );
          })}

          {/* INDICADOR DE GENERACIÓN */}
          {isLoading && (
            <div className="flex flex-col items-start">
              <span className="text-[8.5px] tracking-[0.2em] uppercase text-[#7A6A5A] mb-1.5 font-medium px-1">
                Ash Mateu Concierge · Pensando
              </span>
              <div className="p-4 bg-white border border-[#B5A898]/35 rounded-2xl rounded-tl-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#B5A898] rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-[#B5A898] rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-[#B5A898] rounded-full animate-bounce [animation-delay:0.4s]" />
                <span className="text-[11px] text-[#7A6A5A] italic ml-1 font-serif">
                  Articulando brief y referencias estéticas...
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* CHIPS DE INICIO RÁPIDO */}
        {messages.length <= 2 && (
          <div className="px-6 md:px-7 py-3 border-t border-[#B5A898]/20 bg-white/40">
            <span className="text-[8.5px] tracking-[0.22em] uppercase text-[#7A6A5A] font-semibold block mb-2">
              Líneas de Consulta Rápida:
            </span>
            <div className="flex flex-col gap-1.5">
              {STARTER_PROMPTS.map((starter) => (
                <button
                  key={starter.label}
                  onClick={() => handleSendMessage(starter.text)}
                  className="text-left px-3.5 py-2 bg-white hover:bg-[#FAF7F0] border border-[#B5A898]/30 hover:border-black rounded-lg text-[11px] text-[#0A0A0A] transition-all flex items-center justify-between group cursor-pointer"
                >
                  <span className="font-medium text-[#7A6A5A] group-hover:text-black">
                    {starter.label}
                  </span>
                  <ChevronRight
                    size={12}
                    className="text-[#B5A898] group-hover:translate-x-0.5 group-hover:text-black transition-all"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ACCIONES DE CIERRE: WHATSAPP / EMAIL */}
        {messages.length > 2 && (
          <div className="px-6 md:px-7 py-3.5 bg-[#FAF7F0] border-t border-[#B5A898]/30 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex-1">
              <span className="text-[9px] tracking-[0.2em] uppercase text-[#7A6A5A] font-semibold block">
                ¿Brief Delineado?
              </span>
              <p className="text-[11px] text-black/70 font-light">
                Enviar este resumen directo a Ash Mateu
              </p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={generateWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#1ebd5a] text-black px-3.5 py-2 rounded-full text-[10px] tracking-[0.16em] uppercase font-bold shadow-sm transition-all active:scale-[0.98]"
              >
                <span>WhatsApp</span>
                <ArrowUpRight size={12} />
              </a>

              <a
                href="mailto:info@ashmateu.com?subject=Brief%20Creativo%20Ash%20Mateu"
                className="inline-flex items-center justify-center gap-1.5 bg-black hover:bg-[#7A6A5A] text-white px-3 py-2 rounded-full text-[10px] tracking-[0.16em] uppercase font-semibold transition-all active:scale-[0.98]"
              >
                <Mail size={11} />
                <span>Email</span>
              </a>
            </div>
          </div>
        )}

        {/* BARRA DE ENTRADA */}
        <div className="p-4 md:p-6 bg-white border-t border-[#B5A898]/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-end gap-2 bg-[#F7F3EE] border border-[#B5A898]/40 focus-within:border-black rounded-xl p-2 transition-colors"
          >
            <textarea
              ref={inputRef}
              rows={2}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describí tu proyecto, temporada, concepto o dudas..."
              className="w-full bg-transparent border-0 resize-none text-xs md:text-[13px] text-[#0A0A0A] placeholder-black/40 focus:outline-none px-2 py-1 leading-relaxed"
            />

            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="p-2.5 bg-[#0A0A0A] text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#7A6A5A] rounded-lg transition-colors flex-shrink-0 cursor-pointer"
              aria-label="Enviar mensaje"
            >
              <Send size={14} />
            </button>
          </form>

          <div className="flex items-center justify-between text-[9px] text-[#7A6A5A] px-1 mt-2">
            <span>Presioná <strong>Enter</strong> para enviar</span>
            <a
              href="mailto:info@ashmateu.com"
              className="hover:text-black underline underline-offset-2 transition-colors font-medium"
            >
              info@ashmateu.com
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
