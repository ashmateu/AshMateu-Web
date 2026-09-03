"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LuxuryProduct } from "@/types/mercadito";
import { Trash2, ExternalLink, Plus, Check, RefreshCw } from "lucide-react";

interface Props {
  initialProducts: LuxuryProduct[];
}

export default function AdminProductsManager({ initialProducts }: Props) {
  const [products, setProducts] = useState<LuxuryProduct[]>(initialProducts);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleDelete = async (product: LuxuryProduct) => {
    if (!confirm(`¿Estás seguro de que deseas eliminar "${product.name}" de El Mercadito?`)) {
      return;
    }

    setDeletingId(product.id);
    setMessage("");

    try {
      const res = await fetch("/api/mercadito/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: product.id, slug: product.slug }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setProducts((prev) => prev.filter((p) => p.id !== product.id && p.slug !== product.slug));
        setMessage(`✦ "${product.name}" fue eliminada.`);
        setTimeout(() => setMessage(""), 4000);
      } else {
        alert(data.error || "No se pudo eliminar.");
      }
    } catch (e) {
      alert("Error al conectar con el servidor.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* BARRA SUPERIOR */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-black/10">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#7A6A5A] font-semibold">
            PANEL DE ADMINISTRACIÓN
          </span>
          <h1 className="font-serif text-2xl md:text-3xl text-[#0A0A0A]">
            Piezas en El Mercadito ({products.length})
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/mercadito/importador"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#0A0A0A] text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#7A6A5A] transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Importar Nueva Pieza</span>
          </Link>

          <Link
            href="/mercadito"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-black/15 text-xs uppercase tracking-[0.2em] font-medium hover:bg-black/5 transition-colors"
          >
            Ver Tienda ↗
          </Link>
        </div>
      </div>

      {message && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{message}</span>
        </div>
      )}

      {/* LISTA DE PIEZAS */}
      <div className="bg-white rounded-3xl border border-black/10 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F3EE] border-b border-black/10 uppercase tracking-[0.18em] text-[10px] text-[#7A6A5A]">
              <tr>
                <th className="py-3.5 px-6">Pieza</th>
                <th className="py-3.5 px-6">Diseñador</th>
                <th className="py-3.5 px-6">Categoría</th>
                <th className="py-3.5 px-6">Precio</th>
                <th className="py-3.5 px-6">Estado</th>
                <th className="py-3.5 px-6 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.06]">
              {products.map((p) => (
                <tr key={p.id || p.slug} className="hover:bg-black/[0.01] transition-colors">
                  {/* FOTO Y NOMBRE */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3.5">
                      <div className="relative w-12 h-14 rounded-lg bg-[#F2EDE6] overflow-hidden shrink-0 border border-black/10">
                        {p.image_url ? (
                          <Image
                            src={p.image_url}
                            alt={p.name}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] text-[#7A6A5A]">
                            Sin foto
                          </div>
                        )}
                      </div>
                      <div>
                        <strong className="font-serif text-sm text-[#0A0A0A] block line-clamp-1">
                          {p.name}
                        </strong>
                        <span className="text-[10px] text-[#7A6A5A]">
                          Slug: {p.slug}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* DISEÑADOR */}
                  <td className="py-4 px-6 uppercase tracking-wider font-medium text-[#0A0A0A]">
                    {p.designer}
                  </td>

                  {/* CATEGORÍA */}
                  <td className="py-4 px-6 uppercase tracking-wider text-[#7A6A5A]">
                    {p.category}
                  </td>

                  {/* PRECIO */}
                  <td className="py-4 px-6 font-serif text-sm text-[#0A0A0A]">
                    ${p.price.toLocaleString("en-US")} {p.currency}
                  </td>

                  {/* ESTADO */}
                  <td className="py-4 px-6">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-widest font-semibold bg-black/[0.05] text-[#0A0A0A]">
                      {p.status || "Disponible"}
                    </span>
                  </td>

                  {/* BOTONES */}
                  <td className="py-4 px-6 text-right space-x-2">
                    <Link
                      href={`/mercadito/${p.slug}`}
                      target="_blank"
                      className="inline-flex items-center p-2 rounded-lg text-[#7A6A5A] hover:text-[#0A0A0A] hover:bg-black/5 transition-colors"
                      title="Ver ficha"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleDelete(p)}
                      disabled={deletingId === p.id}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors uppercase tracking-wider text-[10px] font-semibold disabled:opacity-50"
                      title="Eliminar pieza"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{deletingId === p.id ? "Borrando..." : "Eliminar"}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
