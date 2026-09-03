"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SiteImageConfig } from "@/lib/site-images";
import { LuxuryProduct } from "@/types/mercadito";
import AdminImageManager from "./AdminImageManager";
import AdminMercaditoManager from "./AdminMercaditoManager";
import { Image as ImageIcon, Gem, LogOut, ExternalLink, Sparkles } from "lucide-react";

interface Props {
  images: SiteImageConfig[];
  products: LuxuryProduct[];
}

export default function AdminDashboardClient({ images, products }: Props) {
  const [activeTab, setActiveTab] = useState<"imagenes" | "mercadito">("imagenes");

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* HEADER DE CONTROL */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-black/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#7A6A5A] font-semibold">
              SESIÓN ACTIVA · ASH MATEU
            </span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl text-[#0A0A0A] font-normal tracking-tight">
            Panel de Control Central
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-black/15 text-xs uppercase tracking-wider font-medium hover:bg-black/5 transition-colors"
          >
            <span>Ver Sitio Web</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-red-50 text-red-700 hover:bg-red-100 text-xs uppercase tracking-wider font-semibold transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Salir</span>
          </button>
        </div>
      </div>

      {/* PESTAÑAS PRINCIPALES */}
      <div className="flex items-center gap-3 border-b border-black/10 pb-4">
        <button
          type="button"
          onClick={() => setActiveTab("imagenes")}
          className={`flex items-center gap-2.5 px-6 py-3 rounded-full text-xs uppercase tracking-[0.2em] font-semibold transition-all ${
            activeTab === "imagenes"
              ? "bg-[#0A0A0A] text-white shadow-md"
              : "bg-white border border-black/10 text-[#0A0A0A]/70 hover:text-[#0A0A0A]"
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>Imágenes & Encuadre Web</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("mercadito")}
          className={`flex items-center gap-2.5 px-6 py-3 rounded-full text-xs uppercase tracking-[0.2em] font-semibold transition-all ${
            activeTab === "mercadito"
              ? "bg-[#0A0A0A] text-white shadow-md"
              : "bg-white border border-black/10 text-[#0A0A0A]/70 hover:text-[#0A0A0A]"
          }`}
        >
          <Gem className="w-4 h-4" />
          <span>El Mercadito ({products.length})</span>
        </button>
      </div>

      {/* CONTENIDO DE LA PESTAÑA */}
      {activeTab === "imagenes" ? (
        <AdminImageManager initialImages={images} />
      ) : (
        <AdminMercaditoManager initialProducts={products} />
      )}
    </div>
  );
}
