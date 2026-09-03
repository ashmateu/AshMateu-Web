import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://jrxklahobxpxmtnncvst.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_8vdBzcFdNVhjtjK9a4ZE9A_FPmxsHhd";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      productId,
      productName,
      productDesigner,
      productPrice,
      productCurrency = "USD",
      buyerName,
      buyerEmail,
      buyerPhone,
      shippingAddress,
      shippingCity,
      shippingCountry = "Argentina",
      paymentMethod = "transferencia",
    } = body;

    if (!productName || !buyerName || !buyerPhone) {
      return NextResponse.json(
        { error: "Por favor completa nombre, teléfono y producto." },
        { status: 400 }
      );
    }

    // Generar ID de orden editorial legible: ASH-VNT-XXXXX
    const orderCode = `ASH-${Math.floor(10000 + Math.random() * 90000)}`;

    const numPrice = Number(productPrice);
    const deposit80 = Math.round(numPrice * 0.8);
    const balance20 = numPrice - deposit80;
    const isSeña = paymentMethod.includes("_80");
    const channelName = paymentMethod.startsWith("zelle")
      ? "Zelle en USD (Cuenta EE.UU.)"
      : "Transferencia Bancaria Directa (USD / ARS)";

    // Construir mensaje de WhatsApp con formato listo para concierge
    const rawWhatsappMsg = `¡Hola Ash Mateu Concierge! ✦\nAcabo de realizar la reserva de una pieza única en El Mercadito.\n\n` +
      `📦 Orden: #${orderCode}\n` +
      `💎 Pieza: ${productDesigner} — ${productName}\n` +
      `🏷️ Valor Total: $${numPrice.toLocaleString("en-US")} ${productCurrency}\n` +
      (isSeña
        ? `💳 Modalidad: Anticipo del 80% ($${deposit80.toLocaleString("en-US")} ${productCurrency}) | Saldo al recibir ($${balance20.toLocaleString("en-US")} ${productCurrency})\n`
        : `💳 Modalidad: Pago Total 100% ($${numPrice.toLocaleString("en-US")} ${productCurrency})\n`) +
      `🏦 Medio elegido: ${channelName}\n` +
      `👤 Cliente: ${buyerName}\n` +
      `📍 Envío: ${shippingCity}, ${shippingCountry}\n\n` +
      `Me gustaría recibir los datos de cuenta para abonar y coordinar el despacho. ¡Muchas gracias!`;

    // Número de WhatsApp oficial de Ash Mateu
    const conciergePhone = "5491136611090"; // Teléfono oficial / WhatsApp business
    const whatsappUrl = `https://wa.me/${conciergePhone}?text=${encodeURIComponent(rawWhatsappMsg)}`;

    // Intentar actualizar el stock en Supabase a 'reserved'
    if (productId && !productId.startsWith("trr-")) {
      try {
        await supabase
          .from("products")
          .update({ status: "reserved" })
          .eq("id", productId);
      } catch (err) {
        console.warn("No se pudo actualizar status en Supabase:", err);
      }
    }

    const orderData = {
      id: orderCode,
      productId,
      productName,
      productDesigner,
      productPrice: Number(productPrice),
      productCurrency,
      deposit80,
      balance20,
      buyerName,
      buyerEmail,
      buyerPhone,
      shippingAddress,
      shippingCity,
      shippingCountry,
      paymentMethod,
      status: "pending_payment",
      createdAt: new Date().toISOString(),
      whatsappMessageUrl: whatsappUrl,
    };

    return NextResponse.json({
      success: true,
      order: orderData,
    });
  } catch (err: any) {
    console.error("Error al procesar orden de El Mercadito:", err);
    return NextResponse.json(
      { error: err.message || "Error al procesar la reserva." },
      { status: 500 }
    );
  }
}
