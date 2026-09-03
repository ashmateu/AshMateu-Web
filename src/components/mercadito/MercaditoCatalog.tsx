"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { LuxuryProduct } from "@/types/mercadito";
import { ArrowUpRight, Check, Tag } from "lucide-react";

interface Props {
  initialProducts: LuxuryProduct[];
}

export default function MercaditoCatalog({ initialProducts }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDesigner, setSelectedDesigner] = useState<string>("all");

  // Extraer diseñadores únicos
  const designers = useMemo(() => {
    const set = new Set(initialProducts.map((p) => p.designer).filter(Boolean));
    return Array.from(set);
  }, [initialProducts]);

  // Filtrado de productos
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((p) => {
      const matchCat =
        selectedCategory === "all" ||
        p.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchDes =
        selectedDesigner === "all" ||
        p.designer.toLowerCase() === selectedDesigner.toLowerCase();
      return matchCat && matchDes;
    });
  }, [initialProducts, selectedCategory, selectedDesigner]);

  const categories = [
    { id: "all", label: "Colección Completa" },
    { id: "bolsos", label: "Bolsos & Handbags" },
    { id: "indumentaria", label: "Indumentaria & Blazers" },
    { id: "accesorios", label: "Accesorios & Pañuelos" },
    { id: "joyeria", label: "Joyería" },
  ];

  return (
    <div>
      {/* BARRA DE FILTROS HIGH-END */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-black/10 mb-12">
        {/* Categorías estilo tab editorial */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-xs uppercase tracking-[0.2em] px-4 py-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-[#0A0A0A] text-white font-medium shadow-sm"
                    : "bg-transparent text-[#0A0A0A]/60 hover:text-[#0A0A0A] hover:bg-black/[0.04]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Filtro por Diseñador */}
        {designers.length > 0 && (
          <div className="flex items-center gap-3">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#7A6A5A]">
              Diseñador:
            </span>
            <select
              value={selectedDesigner}
              onChange={(e) => setSelectedDesigner(e.target.value)}
              className="bg-white border border-black/10 rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.16em] text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A] transition-colors"
            >
              <option value="all">Todos los Diseñadores</option>
              {designers.map((des) => (
                <option key={des} value={des}>
                  {des}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* GRID DE PRODUCTOS — DOUBLE-BEZEL ARCHITECTURE */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-24 bg-white/40 rounded-[2rem] border border-black/[0.06]">
          <p className="font-serif text-2xl text-[#7A6A5A] mb-2">
            No se encontraron piezas en esta selección.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSelectedDesigner("all");
            }}
            className="text-xs uppercase tracking-[0.2em] text-[#0A0A0A] underline underline-offset-4 mt-4"
          >
            Ver todas las piezas
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {filteredProducts.map((product) => {
            const isSold = product.status === "sold";
            const isReserved = product.status === "reserved";

            return (
              <div
                key={product.id}
                className="group relative flex flex-col p-2.5 rounded-[2rem] bg-black/[0.02] border border-black/10 hover:border-black/25 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(0,0,0,0.06)]"
              >
                {/* INNER CORE (Doppelrand) */}
                <div className="relative flex flex-col h-full rounded-[calc(2rem-0.625rem)] bg-white border border-black/[0.06] overflow-hidden">
                  {/* IMAGEN DE PRODUCTO */}
                  <Link
                    href={`/mercadito/${product.slug}`}
                    className="relative block aspect-[4/5] w-full bg-[#F2EDE6] overflow-hidden"
                  >
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
                    />

                    {/* BADGES SUPERIORES */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                      <span className="px-3 py-1 rounded-full text-[9.5px] uppercase tracking-[0.22em] font-semibold bg-[#0A0A0A]/90 text-white backdrop-blur-md">
                        Pieza 1 de 1
                      </span>

                      {isSold ? (
                        <span className="px-3 py-1 rounded-full text-[9.5px] uppercase tracking-[0.22em] font-medium bg-black/60 text-white backdrop-blur-md">
                          Vendida
                        </span>
                      ) : isReserved ? (
                        <span className="px-3 py-1 rounded-full text-[9.5px] uppercase tracking-[0.22em] font-medium bg-[#7A6A5A]/80 text-white backdrop-blur-md">
                          En Reserva
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-[9.5px] uppercase tracking-[0.22em] font-medium bg-white/90 text-[#0A0A0A] backdrop-blur-md border border-black/10">
                          Disponible
                        </span>
                      )}
                    </div>
                  </Link>

                  {/* CONTENIDO EDITORIAL DE LA CARD */}
                  <div className="p-6 md:p-7 flex flex-col flex-1 justify-between">
                    <div>
                      {/* Diseñador */}
                      <span className="text-[10px] uppercase tracking-[0.28em] text-[#7A6A5A] font-semibold block mb-1.5">
                        {product.designer}
                      </span>

                      {/* Título de la pieza */}
                      <Link href={`/mercadito/${product.slug}`}>
                        <h3 className="font-serif text-xl md:text-[22px] font-normal tracking-tight text-[#0A0A0A] line-clamp-2 hover:text-[#7A6A5A] transition-colors mb-3">
                          {product.name}
                        </h3>
                      </Link>

                      {/* Condición / Estado */}
                      <p className="text-xs text-[#7A6A5A] tracking-wide mb-4 line-clamp-1">
                        Condición: {product.condition_state}
                      </p>
                    </div>

                    {/* PRECIO Y BOTÓN ISLAND BUTTON */}
                    <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between gap-4">
                      <div>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-[#7A6A5A] block">
                          Valor Estimado
                        </span>
                        <span className="font-serif text-2xl font-normal text-[#0A0A0A]">
                          ${product.price.toLocaleString("en-US")}{" "}
                          <span className="text-xs font-sans text-[#7A6A5A]">
                            {product.currency}
                          </span>
                        </span>
                      </div>

                      {/* BUTTON-IN-BUTTON CTA */}
                      <Link
                        href={`/mercadito/${product.slug}`}
                        className="group/btn inline-flex items-center gap-2 pl-4 pr-1.5 py-1.5 rounded-full bg-[#0A0A0A] text-white text-[11px] uppercase tracking-[0.2em] font-medium transition-all duration-300 hover:bg-[#7A6A5A] active:scale-[0.98]"
                      >
                        <span>Ver Ficha</span>
                        <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">
                          <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
