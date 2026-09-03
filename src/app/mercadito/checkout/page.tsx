import React, { Suspense } from "react";
import Link from "next/link";
import { getMercaditoProducts } from "@/lib/mercadito-data";
import CheckoutForm from "@/components/mercadito/CheckoutForm";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Checkout & Reserva de Pieza Única — El Mercadito de Ash",
  description: "Reserva online de piezas de archivo curadas por Ash Mateu. Autenticidad y peritaje de lujo verificado.",
};

export default async function MercaditoCheckoutPage() {
  const products = await getMercaditoProducts();

  return (
    <main className="min-h-[100dvh] bg-[#F7F3EE] text-[#0A0A0A] pt-28 md:pt-36 pb-32">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/mercadito"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#7A6A5A] hover:text-[#0A0A0A] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver a El Mercadito</span>
          </Link>
        </div>

        <Suspense fallback={<div className="py-20 text-center text-xs tracking-widest uppercase text-black/50">Cargando Checkout...</div>}>
          <CheckoutForm products={products} />
        </Suspense>
      </div>
    </main>
  );
}
