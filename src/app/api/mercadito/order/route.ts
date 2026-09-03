import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { saveLocalStoredOrder } from "@/lib/mercadito-orders-storage";

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
    const conciergePhone = "5491123823297"; // Teléfono oficial de Ash (+54 9 11 2382-3297)
    const whatsappUrl = `https://wa.me/${conciergePhone}?text=${encodeURIComponent(rawWhatsappMsg)}`;

    // Enviar notificación automática por email a info@ashmateu.com
    try {
      const formspreeUrl = process.env.FORMSPREE_CONTACT_URL || "https://formspree.io/f/xeebjqpq";
      await fetch(formspreeUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `💎 NUEVA VENTA EN EL MERCADITO: ${productDesigner} — ${productName} (#${orderCode})`,
          _language: "es",
          orden_id: orderCode,
          pieza: `${productDesigner} — ${productName}`,
          precio_total: `$${numPrice.toLocaleString("en-US")} ${productCurrency}`,
          modalidad_pago: isSeña
            ? `Anticipo 80% ($${deposit80} USD) / Saldo 20% al recibir ($${balance20} USD)`
            : `Pago Total 100% ($${numPrice} USD)`,
          canal_pago: channelName,
          cliente_nombre: buyerName,
          cliente_email: buyerEmail,
          cliente_telefono: buyerPhone,
          direccion_envio: `${shippingAddress || ""}, ${shippingCity}, ${shippingCountry}`,
          fecha: new Date().toLocaleString("es-AR", { timeZone: "America/Argentina/Buenos_Aires" }),
          mensaje: `Se ha efectuado la reserva de una pieza en El Mercadito de Ash para ${buyerName}. El cliente fue redirigido a WhatsApp (${conciergePhone}) con el detalle de la compra.`,
        }),
      });
    } catch (mailErr) {
      console.warn("No se pudo enviar email de notificación de orden:", mailErr);
    }

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
      orderCode,
      productId: productId || "",
      productName,
      productDesigner,
      productPrice: Number(productPrice),
      productCurrency: productCurrency as any,
      depositAmount: deposit80,
      balanceAmount: balance20,
      buyerName,
      buyerEmail,
      buyerPhone,
      shippingAddress: shippingAddress || "",
      shippingCity: shippingCity || "",
      shippingCountry: shippingCountry || "Argentina",
      paymentMethod,
      status: "pending_payment" as const,
      createdAt: new Date().toISOString(),
      whatsappMessageUrl: whatsappUrl,
    };

    // 1. Guardar orden en almacenamiento persistente
    try {
      saveLocalStoredOrder(orderData);
    } catch (saveErr) {
      console.warn("Error guardando orden local:", saveErr);
    }

    // 2. Intentar guardar orden en Supabase
    try {
      const { error: supaOrderErr } = await supabase.from("orders").insert([{
        order_code: orderCode,
        product_id: productId && !productId.startsWith("trr-") ? productId : null,
        product_name: productName,
        product_designer: productDesigner,
        amount: Number(productPrice),
        currency: productCurrency,
        deposit_amount: deposit80,
        balance_amount: balance20,
        buyer_name: buyerName,
        buyer_email: buyerEmail,
        buyer_phone: buyerPhone,
        shipping_address: shippingAddress,
        shipping_city: shippingCity,
        shipping_country: shippingCountry,
        payment_method: paymentMethod,
        status: "pending_payment"
      }]);
      if (supaOrderErr && supaOrderErr.message.includes("orders_status_check")) {
        await supabase.from("orders").insert([{
          order_code: orderCode,
          product_id: productId && !productId.startsWith("trr-") ? productId : null,
          product_name: productName,
          product_designer: productDesigner,
          amount: Number(productPrice),
          currency: productCurrency,
          deposit_amount: deposit80,
          balance_amount: balance20,
          buyer_name: buyerName,
          buyer_email: buyerEmail,
          buyer_phone: buyerPhone,
          shipping_address: shippingAddress,
          shipping_city: shippingCity,
          shipping_country: shippingCountry,
          payment_method: paymentMethod,
          status: "pending"
        }]);
      }
    } catch (supaOrderErr) {
      console.warn("Error guardando orden en Supabase:", supaOrderErr);
    }

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
