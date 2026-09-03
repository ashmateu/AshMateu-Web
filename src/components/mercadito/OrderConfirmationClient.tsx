"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { 
  CheckCircle2, 
  MessageCircle, 
  ArrowUpRight, 
  ShieldCheck, 
  Package, 
  Sparkles,
  Copy,
  Check
} from "lucide-react";

interface Props {
  orderId: string;
}

export default function OrderConfirmationClient({ orderId }: Props) {
  const [order, setOrder] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Intentar leer la orden guardada en sessionStorage
    const stored = sessionStorage.getItem(`order_${orderId}`);
    if (stored) {
      try {
        setOrder(JSON.parse(stored));
      } catch (e) {
        console.error(e);
      }
    }
  }, [orderId]);

  // Mensaje por defecto si no está en sessionStorage
  const defaultWhatsappUrl = `https://wa.me/5491123823297?text=${encodeURIComponent(
    `¡Hola Ash Mateu Concierge! ✦\nAcabo de realizar la reserva de una pieza en El Mercadito (Orden #${orderId}).\nMe gustaría coordinar el pago y la entrega. ¡Muchas gracias!`
  )}`;

  const whatsappUrl = order?.whatsappMessageUrl || defaultWhatsappUrl;

  const copyOrderCode = () => {
    navigator.clipboard.writeText(orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* TARJETA PRINCIPAL CON ESTRUCTURA DOUBLE-BEZEL */}
      <div className="p-3 md:p-4 rounded-[3rem] bg-black/[0.02] border border-black/10">
        <div className="p-8 md:p-14 rounded-[calc(3rem-0.75rem)] bg-white border border-black/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] flex flex-col items-center text-center">
          
          {/* ICONO DE ÉXITO */}
          <div className="w-16 h-16 rounded-full bg-black/[0.03] border border-black/10 flex items-center justify-center mb-6">
            <CheckCircle2 className="w-8 h-8 text-[#B5A898]" />
          </div>

          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#7A6A5A] mb-2">
            RESERVA CONFIRMADA
          </span>

          <h1 className="font-serif text-3xl md:text-5xl font-normal tracking-tight text-[#0A0A0A] mb-4">
            Tu pieza ha sido apartada.
          </h1>

          <p className="max-w-md text-sm md:text-[15px] text-[#7A6A5A] leading-relaxed mb-8">
            Hemos bloqueado la pieza para prevenir que otro comprador la adquiera. Para finalizar la transacción y coordinar el despacho seguro, conéctate con nuestro servicio de Concierge.
          </p>

          {/* CÓDIGO DE ORDEN */}
          <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#F7F3EE] border border-black/10 text-xs tracking-widest font-mono text-[#0A0A0A] mb-10">
            <span>ORDEN: #{orderId}</span>
            <button
              onClick={copyOrderCode}
              className="hover:text-[#B5A898] transition-colors"
              title="Copiar código"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* BOTÓN ISLAND CTA DE WHATSAPP CONCIERGE */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group w-full max-w-md flex items-center justify-between pl-8 pr-2 py-2 rounded-full bg-[#0A0A0A] text-white text-xs uppercase tracking-[0.24em] font-semibold transition-all duration-300 hover:bg-[#25D366] hover:text-[#0A0A0A] active:scale-[0.98] shadow-xl shadow-black/10 mb-6"
          >
            <div className="flex items-center gap-3">
              <MessageCircle className="w-4 h-4" />
              <span>Abrir Chat de WhatsApp Concierge</span>
            </div>
            <span className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">
              <ArrowUpRight className="w-5 h-5" />
            </span>
          </a>

          <p className="text-[11px] text-[#7A6A5A] tracking-wide mb-12">
            El mensaje ya está pre-redactado con los datos de tu pieza para una atención ágil.
          </p>

          {/* RESUMEN DE LA ORDEN SI ESTÁ DISPONIBLE */}
          {order && (
            <div className="w-full text-left p-6 rounded-2xl bg-[#F7F3EE]/60 border border-black/10 text-xs space-y-2 mb-10">
              <div className="flex justify-between font-medium">
                <span className="text-[#7A6A5A]">Pieza:</span>
                <span className="text-[#0A0A0A]">{order.productDesigner} — {order.productName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A6A5A]">Valor Total:</span>
                <span className="text-[#0A0A0A] font-medium">${order.productPrice.toLocaleString("en-US")} {order.productCurrency}</span>
              </div>
              {order.deposit80 ? (
                <>
                  <div className="flex justify-between">
                    <span className="text-[#7A6A5A]">Anticipo para Despacho (80%):</span>
                    <span className="text-[#0A0A0A] font-semibold">${order.deposit80.toLocaleString("en-US")} {order.productCurrency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7A6A5A]">Saldo al Recibir (20%):</span>
                    <span className="text-[#7A6A5A]">${order.balance20.toLocaleString("en-US")} {order.productCurrency}</span>
                  </div>
                </>
              ) : null}
              <div className="flex justify-between">
                <span className="text-[#7A6A5A]">Titular:</span>
                <span className="text-[#0A0A0A]">{order.buyerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A6A5A]">Destino:</span>
                <span className="text-[#0A0A0A]">{order.shippingCity}, {order.shippingCountry}</span>
              </div>
            </div>
          )}

          {/* PASOS A SEGUIR */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 text-left text-xs">
            <div className="p-4 rounded-xl bg-white border border-black/[0.06] flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-[#B5A898] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[#0A0A0A] mb-0.5">Seguro de Adquisición</strong>
                <span className="text-[#7A6A5A]">Tu pieza queda asegurada y con reporte oficial de peritaje y trazabilidad.</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-black/[0.06] flex items-start gap-3">
              <Package className="w-4 h-4 text-[#B5A898] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[#0A0A0A] mb-0.5">Despacho Personalizado</strong>
                <span className="text-[#7A6A5A]">Seguimiento de aduana paso a paso con el equipo de Ash Mateu.</span>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-black/10 w-full">
            <Link
              href="/mercadito"
              className="text-xs uppercase tracking-[0.2em] text-[#7A6A5A] hover:text-[#0A0A0A] transition-colors"
            >
              ← Volver a explorar El Mercadito
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
