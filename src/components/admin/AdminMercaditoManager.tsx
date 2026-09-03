"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LuxuryProduct } from "@/types/mercadito";
import { 
  Plus, 
  Trash2, 
  Edit3, 
  ExternalLink, 
  Check, 
  X, 
  Search, 
  Sparkles, 
  Save,
  Tag,
  Download
} from "lucide-react";

interface Props {
  initialProducts: LuxuryProduct[];
}

export default function AdminMercaditoManager({ initialProducts }: Props) {
  const [products, setProducts] = useState<LuxuryProduct[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [editingProduct, setEditingProduct] = useState<LuxuryProduct | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Filtrar por búsqueda
  const filtered = products.filter((p) => {
    const q = search.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      (p.designer || "").toLowerCase().includes(q) ||
      (p.category || "").toLowerCase().includes(q)
    );
  });

  // Abrir modal para crear producto nuevo
  const handleOpenNew = () => {
    const newProduct: LuxuryProduct = {
      id: `manual-${Date.now()}`,
      slug: `pieza-${Date.now().toString(36)}`,
      name: "",
      designer: "",
      category: "bolsos",
      price: 0,
      currency: "USD",
      condition_state: "Excellent (Excelente estado)",
      dimensions: "",
      materials: "",
      image_url: "",
      gallery_images: [],
      is_unique_piece: true,
      status: "available",
      stock: 1,
      ash_styling_tip: "",
      description: "",
    };
    setIsNew(true);
    setEditingProduct(newProduct);
  };

  // Abrir modal para editar
  const handleOpenEdit = (product: LuxuryProduct) => {
    setIsNew(false);
    setEditingProduct({ ...product });
  };

  // Guardar cambios (actualizar o crear)
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    setSaving(true);
    setMessage("");

    try {
      const res = await fetch("/api/mercadito/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingProduct),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        if (isNew) {
          setProducts([data.product, ...products]);
          setMessage(`✦ "${data.product.name}" creada con éxito.`);
        } else {
          setProducts((prev) =>
            prev.map((p) => (p.id === data.product.id ? data.product : p))
          );
          setMessage(`✦ "${data.product.name}" actualizada con éxito.`);
        }
        setEditingProduct(null);
        setTimeout(() => setMessage(""), 4000);
      } else {
        alert(data.error || "No se pudo guardar la pieza.");
      }
    } catch (err) {
      alert("Error al conectar con el servidor.");
    } finally {
      setSaving(false);
    }
  };

  // Eliminar producto
  const handleDeleteProduct = async (product: LuxuryProduct) => {
    if (!confirm(`¿Deseas eliminar "${product.name}" de El Mercadito?`)) {
      return;
    }

    try {
      const res = await fetch("/api/mercadito/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: product.id, slug: product.slug }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setProducts((prev) => prev.filter((p) => p.id !== product.id && p.slug !== product.slug));
        setMessage(`✦ "${product.name}" eliminada.`);
        setTimeout(() => setMessage(""), 4000);
      } else {
        alert(data.error || "No se pudo eliminar.");
      }
    } catch (e) {
      alert("Error al eliminar.");
    }
  };

  return (
    <div className="space-y-6">
      {/* BARRA SUPERIOR DE ACCIONES */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-black/10">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#7A6A5A] font-semibold">
            CATÁLOGO MERCADITO
          </span>
          <h2 className="font-serif text-2xl text-[#0A0A0A]">
            Piezas Publicadas ({products.length})
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="/downloads/extension-ash-mateu.zip"
            download="extension-ash-mateu.zip"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-black/15 text-[#0A0A0A] text-xs uppercase tracking-[0.2em] font-medium hover:bg-black/5 transition-colors"
            title="Descargar extensión para que Ash u otro miembro del equipo la use desde su PC"
          >
            <Download className="w-4 h-4 text-[#B5A898]" />
            <span>Descargar Extensión (.ZIP)</span>
          </a>

          <button
            type="button"
            onClick={handleOpenNew}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0A0A0A] text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#7A6A5A] transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Crear Nueva Pieza</span>
          </button>
        </div>
      </div>

      {/* TARJETA INFORMATIVA PARA INSTALAR EN OTRA PC */}
      <div className="p-4 rounded-2xl bg-white border border-black/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#7A6A5A]">
        <div>
          <strong className="text-[#0A0A0A] block mb-0.5">
            ¿Querés que Ash o alguien de tu equipo use la extensión desde otra computadora?
          </strong>
          <span>
            Hacé click en <strong>Descargar Extensión (.ZIP)</strong>, descomprimí la carpeta en su computadora, abrila desde <code className="bg-black/5 px-1.5 py-0.5 rounded font-mono text-[11px]">chrome://extensions</code> (o <code className="bg-black/5 px-1.5 py-0.5 rounded font-mono text-[11px]">brave://extensions</code>) con el Modo desarrollador activado, y ¡listo! Ya publica directo en tu web.
          </span>
        </div>
      </div>

      {message && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{message}</span>
        </div>
      )}

      {/* BUSCADOR */}
      <div className="relative max-w-md">
        <input
          type="text"
          placeholder="Buscar por nombre, diseñador o categoría..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-full border border-black/15 text-xs bg-white focus:outline-none focus:border-[#0A0A0A] transition-all"
        />
        <Search className="w-4 h-4 text-[#7A6A5A] absolute left-3.5 top-3" />
      </div>

      {/* TABLA DE PRODUCTOS */}
      <div className="bg-white rounded-3xl border border-black/10 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F3EE] border-b border-black/10 uppercase tracking-[0.18em] text-[10px] text-[#7A6A5A]">
              <tr>
                <th className="py-3.5 px-6">Pieza</th>
                <th className="py-3.5 px-6">Diseñador</th>
                <th className="py-3.5 px-6">Categoría</th>
                <th className="py-3.5 px-6">Precio</th>
                <th className="py-3.5 px-6">Disponibilidad</th>
                <th className="py-3.5 px-6 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.06]">
              {filtered.map((p) => (
                <tr key={p.id || p.slug} className="hover:bg-black/[0.01] transition-colors">
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
                          Estado: {p.condition_state}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-6 uppercase tracking-wider font-medium text-[#0A0A0A]">
                    {p.designer}
                  </td>

                  <td className="py-4 px-6 uppercase tracking-wider text-[#7A6A5A]">
                    {p.category}
                  </td>

                  <td className="py-4 px-6 font-serif text-sm text-[#0A0A0A]">
                    ${p.price.toLocaleString("en-US")} {p.currency}
                  </td>

                  <td className="py-4 px-6">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-widest font-semibold ${
                        p.status === "sold"
                          ? "bg-black/10 text-[#7A6A5A]"
                          : p.status === "reserved"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {p.status === "sold" ? "Vendida" : p.status === "reserved" ? "En Reserva" : "Disponible"}
                    </span>
                  </td>

                  <td className="py-4 px-6 text-right space-x-2 whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(p)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-black/10 hover:bg-black/5 text-[#0A0A0A] transition-colors uppercase tracking-wider text-[10px] font-medium"
                      title="Editar pieza"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Editar</span>
                    </button>

                    <Link
                      href={`/mercadito/${p.slug}`}
                      target="_blank"
                      className="inline-flex items-center p-2 rounded-lg text-[#7A6A5A] hover:text-[#0A0A0A] hover:bg-black/5 transition-colors"
                      title="Ver en la web"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleDeleteProduct(p)}
                      className="inline-flex items-center p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                      title="Eliminar pieza"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL EDITORIAL PARA EDITAR O CREAR PIEZA */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#F7F3EE] w-full max-w-3xl max-h-[90vh] rounded-[2rem] border border-black/15 shadow-2xl overflow-y-auto p-8 flex flex-col gap-6">
            <div className="flex justify-between items-center border-b border-black/10 pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#7A6A5A] font-semibold">
                  {isNew ? "ALTA MANUAL" : "MODIFICAR PIEZA"}
                </span>
                <h3 className="font-serif text-2xl text-[#0A0A0A]">
                  {isNew ? "Nueva Pieza en El Mercadito" : editingProduct.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="p-2 text-[#7A6A5A] hover:text-[#0A0A0A]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* NOMBRE */}
                <div className="sm:col-span-2">
                  <label className="block text-[10px] uppercase tracking-wider text-[#7A6A5A] mb-1 font-medium">
                    Nombre / Título de la Pieza *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 text-sm bg-white focus:outline-none focus:border-[#0A0A0A]"
                  />
                </div>

                {/* DISEÑADOR */}
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#7A6A5A] mb-1 font-medium">
                    Diseñador / Marca *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProduct.designer}
                    onChange={(e) => setEditingProduct({ ...editingProduct, designer: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 text-sm bg-white focus:outline-none focus:border-[#0A0A0A]"
                  />
                </div>

                {/* CATEGORÍA */}
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#7A6A5A] mb-1 font-medium">
                    Categoría *
                  </label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 text-sm bg-white focus:outline-none focus:border-[#0A0A0A]"
                  >
                    <option value="bolsos">Bolsos & Handbags</option>
                    <option value="indumentaria">Indumentaria</option>
                    <option value="joyeria">Joyería</option>
                    <option value="calzado">Calzado</option>
                    <option value="accesorios">Accesorios</option>
                  </select>
                </div>

                {/* PRECIO */}
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#7A6A5A] mb-1 font-medium">
                    Precio de Venta (USD) *
                  </label>
                  <input
                    type="number"
                    required
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 text-sm bg-white font-bold focus:outline-none focus:border-[#0A0A0A]"
                  />
                </div>

                {/* DISPONIBILIDAD / ESTADO */}
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#7A6A5A] mb-1 font-medium">
                    Disponibilidad *
                  </label>
                  <select
                    value={editingProduct.status}
                    onChange={(e) => setEditingProduct({ ...editingProduct, status: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 text-sm bg-white focus:outline-none focus:border-[#0A0A0A]"
                  >
                    <option value="available">Disponible para compra</option>
                    <option value="reserved">En Reserva</option>
                    <option value="sold">Vendida</option>
                  </select>
                </div>

                {/* CONDICIÓN */}
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#7A6A5A] mb-1 font-medium">
                    Condición de Conservación
                  </label>
                  <input
                    type="text"
                    value={editingProduct.condition_state}
                    onChange={(e) => setEditingProduct({ ...editingProduct, condition_state: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 text-sm bg-white focus:outline-none focus:border-[#0A0A0A]"
                  />
                </div>

                {/* MEDIDAS */}
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#7A6A5A] mb-1 font-medium">
                    Medidas (Alto x Ancho x Profundidad)
                  </label>
                  <input
                    type="text"
                    value={editingProduct.dimensions || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, dimensions: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 text-sm bg-white focus:outline-none focus:border-[#0A0A0A]"
                  />
                </div>

                {/* URL IMAGEN PRINCIPAL */}
                <div className="sm:col-span-2">
                  <label className="block text-[10px] uppercase tracking-wider text-[#7A6A5A] mb-1 font-medium">
                    URL de la Imagen Principal *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProduct.image_url}
                    onChange={(e) => setEditingProduct({ ...editingProduct, image_url: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 text-xs font-mono bg-white focus:outline-none focus:border-[#0A0A0A]"
                  />
                </div>

                {/* TIP DE ESTILISMO */}
                <div className="sm:col-span-2">
                  <label className="block text-[10px] uppercase tracking-wider text-[#7A6A5A] mb-1 font-medium">
                    Tip de Estilismo de Ash (Opcional)
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: 'Combínalo con un sastre negro oversize para la noche.'"
                    value={editingProduct.ash_styling_tip || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, ash_styling_tip: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 text-sm bg-white focus:outline-none focus:border-[#0A0A0A]"
                  />
                </div>

                {/* DESCRIPCIÓN */}
                <div className="sm:col-span-2">
                  <label className="block text-[10px] uppercase tracking-wider text-[#7A6A5A] mb-1 font-medium">
                    Descripción Editorial
                  </label>
                  <textarea
                    rows={3}
                    value={editingProduct.description || ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 text-sm bg-white focus:outline-none focus:border-[#0A0A0A]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-black/10">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-5 py-2.5 rounded-full border border-black/15 text-xs uppercase tracking-wider font-medium hover:bg-black/5"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-7 py-2.5 rounded-full bg-[#0A0A0A] text-white text-xs uppercase tracking-wider font-medium hover:bg-[#7A6A5A] transition-colors disabled:opacity-50"
                >
                  {saving ? "Guardando..." : "Guardar Cambios"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
