import React from "react";
import OrderConfirmationClient from "@/components/mercadito/OrderConfirmationClient";

interface Props {
  params: Promise<{ orderId: string }>;
}

export const metadata = {
  title: "Reserva Confirmada — El Mercadito de Ash",
  description: "Confirmación de reserva de pieza de lujo y conexión con Concierge WhatsApp.",
};

export default async function OrderConfirmationPage({ params }: Props) {
  const { orderId } = await params;

  return (
    <main className="min-h-[100dvh] bg-[#F7F3EE] text-[#0A0A0A] pt-32 md:pt-40 pb-32 px-6 md:px-12">
      <OrderConfirmationClient orderId={orderId} />
    </main>
  );
}
