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
  MessageSquare,
  ChevronRight,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const STARTER_PROMPTS = [
  {
    label: "01 · Campañas & Lookbook",
    text: "Hola Ash, estoy preparando la campaña visual para nuestra próxima temporada. Necesito definir concepto, estilismo en set y locaciones.",
  },
  {
    label: "02 · Novias & Gala",
    text: "Hola, me caso próximamente y busco un estilismo nupcial de alta costura único ('Dress to Kill'). ¿Cómo es el proceso de asesoramiento?",
  },
  {
    label: "03 · Dirección Creativa",
    text: "Hola, represento a una marca y queremos renovar nuestro universo estético, ADN visual y dirección de arte. ¿Por dónde empezamos?",
  },
  {
    label: "04 · Consultoría & Speaker",
    text: "Hola Ash, queremos organizar una conferencia o workshop exclusivo sobre macrotendencias globales de moda y lujo para nuestro equipo.",
  },
];

export default function ConciergeDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial-welcome",
      role: "assistant",
      content:
        "Bienvenido/a al Concierge Editorial de Ash Mateu.\n\nEstoy aquí para asistirte en la formulación de tu brief creativo — sea una producción de campaña para tu marca, un estilismo de novia/gala 'Dress to Kill' o una consultoría en tendencias.\n\n¿Qué tipo de proyecto o visión estética estás buscando desarrollar?",
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

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen]);

  // Listen for global trigger events
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

      const data = await res.json();
      const assistantText =
        data.message ||
        data.fallbackMessage ||
        "Gracias por tu consulta. Podés escribirnos directamente a info@ashmateu.com o a nuestro WhatsApp directo.";

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: assistantText,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error("Error sending message to concierge:", err);
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "Gracias por tu mensaje. Para coordinar los detalles de tu producción o asesoramiento de imagen, podés comunicarte directamente a info@ashmateu.com o por WhatsApp al +54 9 11 2382-3297.",
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

  // Generate a formatted summary for WhatsApp
  const generateWhatsAppLink = () => {
    const userPrompts = messages
      .filter((m) => m.role === "user")
      .map((m) => `• ${m.content}`)
      .join("\n");

    const text = encodeURIComponent(
      `Hola Ash, estuve interactuando con tu Concierge Editorial en la web y delineé este brief para mi proyecto:\n\n${userPrompts || "Quiero consultar por una producción / estilismo."}\n\n¿Podemos coordinar una reunión de trabajo o llamada de consulta?`
    );

    return `https://wa.me/5491123823297?text=${text}`;
  };

  const handleCopyConversation = () => {
    const fullText = messages
      .map(
        (m) =>
          `[${m.role === "user" ? "CLIENTE" : "CONCIERGE ASH MATEU"}]: ${m.content}`
      )
      .join("\n\n");

    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* 1. DISCRETE LUXURY FLOATING TRIGGER BUTTON */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 bg-[#0A0A0A]/95 hover:bg-black text-[#F7F3EE] border border-[#B5A898]/40 hover:border-white px-4.5 py-3 rounded-full shadow-[0_10px_35px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-300 active:scale-[0.98] cursor-pointer"
          aria-label="Abrir Concierge Editorial VIP"
        >
          {/* Subtle pulsating gold indicator */}
          <div className="relative flex items-center justify-center w-2.5 h-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#B5A898] opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B5A898]" />
          </div>

          <div className="flex flex-col text-left">
            <span className="text-[9px] tracking-[0.26em] uppercase text-[#B5A898] font-semibold group-hover:text-white transition-colors">
              Creative Concierge
            </span>
            <span className="font-serif text-[12px] italic tracking-wide text-white/90">
              Asistente de Briefing &amp; Styling
            </span>
          </div>

          <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[#B5A898] group-hover:bg-white group-hover:text-black transition-all duration-300 ml-1">
            <Sparkles size={12} />
          </div>
        </button>
      </div>

      {/* 2. BACKDROP OVERLAY */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300"
        />
      )}

      {/* 3. LUXURY EDITORIAL SLIDE-OVER DRAWER */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-full sm:w-[480px] md:w-[540px] bg-[#F7F3EE] text-[#0A0A0A] z-50 shadow-2xl flex flex-col justify-between border-l border-[#B5A898]/40 transition-transform duration-500 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* DRAWER HEADER */}
        <div className="p-6 md:p-7 border-b border-[#B5A898]/30 bg-white/60 backdrop-blur-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#0A0A0A] text-[#F7F3EE] flex items-center justify-center shadow-sm">
              <Sparkles size={14} className="text-[#B5A898]" />
            </div>
            <div>
              <span className="text-[9px] tracking-[0.28em] uppercase text-[#7A6A5A] font-semibold block">
                Atelier Ash Mateu Prieto
              </span>
              <h3 className="font-serif text-lg text-black font-normal leading-none mt-0.5">
                Concierge Editorial <span className="italic text-[#7A6A5A]">VIP</span>
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

        {/* MESSAGES AREA */}
        <div className="flex-1 overflow-y-auto p-6 md:p-7 space-y-6">
          {/* INTRO EDITORIAL BADGE */}
          <div className="text-center py-2">
            <span className="inline-block px-3 py-1 bg-[#B5A898]/15 border border-[#B5A898]/30 rounded-full text-[8.5px] tracking-[0.24em] uppercase text-[#7A6A5A] font-medium">
              Creative Intelligence · Powered by NVIDIA NIM
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
                <span className="text-[8.5px] tracking-[0.2em] uppercase text-[#7A6A5A] mb-1 font-medium px-1">
                  {isAssistant ? "Ash Mateu Concierge" : "Tú"} · {m.timestamp}
                </span>

                <div
                  className={`p-4 md:p-5 rounded-2xl max-w-[90%] sm:max-w-[85%] text-xs md:text-[13px] leading-relaxed shadow-sm ${
                    isAssistant
                      ? "bg-white border border-[#B5A898]/35 text-[#0A0A0A] font-light rounded-tl-sm whitespace-pre-wrap"
                      : "bg-[#0A0A0A] text-[#F7F3EE] font-normal rounded-tr-sm whitespace-pre-wrap"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            );
          })}

          {/* TYPING INDICATOR */}
          {isLoading && (
            <div className="flex flex-col items-start">
              <span className="text-[8.5px] tracking-[0.2em] uppercase text-[#7A6A5A] mb-1 font-medium px-1">
                Ash Mateu Concierge · Pensando
              </span>
              <div className="p-4 bg-white border border-[#B5A898]/35 rounded-2xl rounded-tl-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#B5A898] rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-[#B5A898] rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-[#B5A898] rounded-full animate-bounce [animation-delay:0.4s]" />
                <span className="text-[11px] text-[#7A6A5A] italic ml-1 font-serif">
                  Curando referencias estéticas...
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* QUICK STARTERS (CHIPS) */}
        {messages.length <= 2 && (
          <div className="px-6 md:px-7 py-2 border-t border-[#B5A898]/20 bg-white/30">
            <span className="text-[8.5px] tracking-[0.22em] uppercase text-[#7A6A5A] font-semibold block mb-2">
              Líneas de Consulta Rápida:
            </span>
            <div className="flex flex-col gap-1.5">
              {STARTER_PROMPTS.map((starter) => (
                <button
                  key={starter.label}
                  onClick={() => handleSendMessage(starter.text)}
                  className="text-left px-3 py-2 bg-white hover:bg-[#FAF7F0] border border-[#B5A898]/30 hover:border-black rounded-lg text-[11px] text-[#0A0A0A] transition-all flex items-center justify-between group cursor-pointer"
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

        {/* DIRECT ACTIONS & EXPORT TO WHATSAPP */}
        {messages.length > 2 && (
          <div className="px-6 md:px-7 py-3 bg-[#FAF7F0] border-t border-[#B5A898]/30 flex items-center justify-between gap-3">
            <div className="flex-1">
              <span className="text-[9px] tracking-[0.2em] uppercase text-[#7A6A5A] font-semibold block">
                ¿Brief Completo?
              </span>
              <p className="text-[11px] text-black/70 font-light">
                Enviar este resumen directo a Ash por WhatsApp
              </p>
            </div>

            <a
              href={generateWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#1ebd5a] text-black px-3.5 py-2 rounded-full text-[10.5px] tracking-[0.16em] uppercase font-bold shadow-md transition-all active:scale-[0.98]"
            >
              <span>Enviar a WhatsApp</span>
              <ArrowUpRight size={13} />
            </a>
          </div>
        )}

        {/* INPUT BAR */}
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
              placeholder="Describí tu proyecto, concepto, evento o dudas..."
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
              className="hover:text-black underline underline-offset-2 transition-colors"
            >
              info@ashmateu.com
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
