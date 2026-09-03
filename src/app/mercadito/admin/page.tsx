import React from "react";
import Link from "next/link";
import { getMercaditoProducts } from "@/lib/mercadito-data";
import AdminProductsManager from "@/components/mercadito/AdminProductsManager";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Admin — El Mercadito de Ash",
  description: "Administración y control de piezas curadas en El Mercadito de Ash.",
};

export default async function MercaditoAdminPage() {
  const products = await getMercaditoProducts();

  return (
    <main className="min-h-[100dvh] bg-[#F7F3EE] text-[#0A0A0A] pt-32 md:pt-40 pb-32 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Link
            href="/mercadito"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#7A6A5A] hover:text-[#0A0A0A] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver a El Mercadito</span>
          </Link>
        </div>

        <AdminProductsManager initialProducts={products} />
      </div>
    </main>
  );
}
