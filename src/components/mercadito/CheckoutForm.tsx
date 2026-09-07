"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { LuxuryProduct, MercaditoCustomer } from "@/types/mercadito";
import CustomerAuthCard from "./CustomerAuthCard";
import { 
  ArrowLeft, 
  ArrowUpRight, 
  ShieldCheck, 
  Lock, 
  Sparkles,
  CreditCard,
  Building2,
  PhoneCall,
  Check,
  AlertCircle
} from "lucide-react";

interface Props {
  products: LuxuryProduct[];
}

export default function CheckoutForm({ products }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const piezaSlug = searchParams.get("pieza");

  // Encontrar la pieza seleccionada
  const defaultProduct = products.find((p) => p.slug === piezaSlug) || products[0];
  const [selectedProduct, setSelectedProduct] = useState<LuxuryProduct>(defaultProduct);

  // Customer Auth State
  const [currentCustomer, setCurrentCustomer] = useState<MercaditoCustomer | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Form State
  const [formData, setFormData] = useState({
    buyerName: "",
    buyerEmail: "",
    buyerPhone: "",
    shippingAddress: "",
    shippingCity: "",
    shippingCountry: "Argentina",
    paymentMethod: "transferencia_80",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Verificar sesión existente en el cliente
  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch("/api/mercadito/auth/me");
        const data = await res.json();
        if (data.authenticated && data.customer) {
          setCurrentCustomer(data.customer);
          setFormData((prev) => ({
            ...prev,
            buyerName: data.customer.name,
            buyerEmail: data.customer.email,
            buyerPhone: data.customer.phone,
            shippingCity: data.customer.city || prev.shippingCity,
            shippingCountry: data.customer.country || prev.shippingCountry,
          }));
        }
      } catch (err) {
        console.error("Error verificando sesión:", err);
      } finally {
        setCheckingAuth(false);
      }
    }
    checkSession();
  }, []);

  const handleAuthSuccess = (customer: MercaditoCustomer) => {
    setCurrentCustomer(customer);
    setFormData((prev) => ({
      ...prev,
      buyerName: customer.name,
      buyerEmail: customer.email,
      buyerPhone: customer.phone,
      shippingCity: customer.city || prev.shippingCity,
      shippingCountry: customer.country || prev.shippingCountry,
    }));
    setError("");
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/mercadito/auth/logout", { method: "POST" });
      setCurrentCustomer(null);
      setFormData((prev) => ({
        ...prev,
        buyerName: "",
        buyerEmail: "",
        buyerPhone: "",
      }));
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!currentCustomer) {
      setError("Es obligatorio registrarte como miembro o iniciar sesión antes de reservar la pieza.");
      // Scroll hacia la tarjeta de registro
      window.scrollTo({ top: 100, behavior: "smooth" });
      return;
    }

    if (!formData.buyerName || !formData.buyerPhone || !formData.buyerEmail) {
      setError("Por favor completa nombre, email y WhatsApp para la reserva.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/mercadito/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: selectedProduct.id,
          productName: selectedProduct.name,
          productDesigner: selectedProduct.designer,
          productPrice: selectedProduct.price,
          productCurrency: selectedProduct.currency,
          ...formData,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Guardar la orden en sessionStorage temporal para la pantalla de confirmación
        sessionStorage.setItem(`order_${data.order.id}`, JSON.stringify(data.order));
        router.push(`/mercadito/orden/${data.order.id}`);
      } else {
        setError(data.error || "Ocurrió un error al procesar tu reserva.");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setError("Error de red. Intenta nuevamente.");
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
      {/* FORMULARIO DE CHECKOUT (COLUMNA IZQUIERDA) */}
      <div className="lg:col-span-7 flex flex-col gap-8">
        <div>
          <span className="text-[10.5px] uppercase tracking-[0.25em] text-[#7A6A5A] font-semibold block mb-2">
            PROCESO DE ADQUISICIÓN SEGURA
          </span>
          <h1 className="font-serif text-3xl md:text-4xl text-[#0A0A0A] font-normal tracking-tight">
            Reserva de Pieza Única
          </h1>
          <p className="text-xs sm:text-sm text-[#7A6A5A] mt-2 font-light">
            Al confirmar, el inventario se bloquea para ti y serás derivado de inmediato a WhatsApp con nuestro Concierge para finalizar pago y envío.
          </p>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        <div className="space-y-6">
          {/* PASO 1: AUTENTICACIÓN / REGISTRO OBLIGATORIO DE CLIENTE */}
          <div>
            <CustomerAuthCard
              currentCustomer={currentCustomer}
              onAuthSuccess={handleAuthSuccess}
              onLogout={handleLogout}
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* DIRECCIÓN DE ENTREGA (PASO 2) */}
            <div className={`p-6 md:p-8 rounded-[2rem] bg-white border border-black/10 space-y-5 transition-opacity duration-300 ${!currentCustomer ? "opacity-60 pointer-events-none" : ""}`}>
              <div className="flex items-center justify-between border-b border-black/10 pb-3">
                <h2 className="text-xs uppercase tracking-[0.22em] font-semibold text-[#0A0A0A]">
                  2. Destino de Envío
                </h2>
                {!currentCustomer && (
                  <span className="text-[10px] uppercase tracking-wider text-[#7A6A5A] bg-[#F7F3EE] px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Bloqueado
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-[10.5px] uppercase tracking-[0.16em] text-[#7A6A5A] mb-1.5 font-medium">
                    Dirección y Altura
                  </label>
                  <input
                    type="text"
                    name="shippingAddress"
                    placeholder="Av. Alvear 1850, Piso 4"
                    value={formData.shippingAddress}
                    onChange={handleChange}
                    disabled={!currentCustomer}
                    className="w-full px-4 py-3 rounded-xl border border-black/15 text-sm bg-[#F7F3EE]/30 focus:outline-none focus:border-[#0A0A0A] focus:bg-white transition-all disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-[10.5px] uppercase tracking-[0.16em] text-[#7A6A5A] mb-1.5 font-medium">
                    Ciudad / Provincia
                  </label>
                  <input
                    type="text"
                    name="shippingCity"
                    placeholder="Buenos Aires"
                    value={formData.shippingCity}
                    onChange={handleChange}
                    disabled={!currentCustomer}
                    className="w-full px-4 py-3 rounded-xl border border-black/15 text-sm bg-[#F7F3EE]/30 focus:outline-none focus:border-[#0A0A0A] focus:bg-white transition-all disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-[10.5px] uppercase tracking-[0.16em] text-[#7A6A5A] mb-1.5 font-medium">
                    País
                  </label>
                  <input
                    type="text"
                    name="shippingCountry"
                    value={formData.shippingCountry}
                    onChange={handleChange}
                    disabled={!currentCustomer}
                    className="w-full px-4 py-3 rounded-xl border border-black/15 text-sm bg-[#F7F3EE]/30 focus:outline-none focus:border-[#0A0A0A] focus:bg-white transition-all disabled:cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* MÉTODO DE PAGO PREFERIDO (PASO 3) */}
            <div className={`p-6 md:p-8 rounded-[2rem] bg-white border border-black/10 space-y-5 transition-opacity duration-300 ${!currentCustomer ? "opacity-60 pointer-events-none" : ""}`}>
              <div className="flex items-center justify-between border-b border-black/10 pb-3">
                <h2 className="text-xs uppercase tracking-[0.22em] font-semibold text-[#0A0A0A]">
                  3. Modalidad y Medio de Pago
                </h2>
                {!currentCustomer && (
                  <span className="text-[10px] uppercase tracking-wider text-[#7A6A5A] bg-[#F7F3EE] px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Bloqueado
                  </span>
                )}
              </div>

              {(() => {
                const deposit80 = Math.round(selectedProduct.price * 0.8);
                const balance20 = selectedProduct.price - deposit80;

                return (
                  <div className="space-y-3">
                    {/* TRANSFERENCIA 80% */}
                    <label className="flex items-center justify-between p-4 rounded-xl border border-black/10 cursor-pointer hover:bg-black/[0.02] transition-colors">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="transferencia_80"
                          checked={formData.paymentMethod === "transferencia_80"}
                          onChange={handleChange}
                          disabled={!currentCustomer}
                          className="accent-[#0A0A0A]"
                        />
                        <div>
                          <span className="text-xs font-semibold text-[#0A0A0A] block">
                            Transferencia Bancaria — Anticipo 80% (${deposit80.toLocaleString("en-US")} {selectedProduct.currency})
                          </span>
                          <span className="text-[11px] text-[#7A6A5A]">
                            Cubre la compra directa en origen y el despacho asegurado. Saldo del 20% (${balance20.toLocaleString("en-US")} {selectedProduct.currency}) contra entrega.
                          </span>
                        </div>
                      </div>
                      <Building2 className="w-4 h-4 text-[#B5A898] shrink-0" />
                    </label>

                    {/* ZELLE 80% */}
                    <label className="flex items-center justify-between p-4 rounded-xl border border-black/10 cursor-pointer hover:bg-black/[0.02] transition-colors">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="zelle_80"
                          checked={formData.paymentMethod === "zelle_80"}
                          onChange={handleChange}
                          disabled={!currentCustomer}
                          className="accent-[#0A0A0A]"
                        />
                        <div>
                          <span className="text-xs font-semibold text-[#0A0A0A] block">
                            Zelle (EE.UU.) — Anticipo 80% (${deposit80.toLocaleString("en-US")} {selectedProduct.currency})
                          </span>
                          <span className="text-[11px] text-[#7A6A5A]">
                            Transferencia instantánea en USD vía Zelle directo a cuenta en EE.UU. Saldo 20% (${balance20.toLocaleString("en-US")} {selectedProduct.currency}) contra entrega.
                          </span>
                        </div>
                      </div>
                      <CreditCard className="w-4 h-4 text-[#B5A898] shrink-0" />
                    </label>

                    {/* TRANSFERENCIA 100% */}
                    <label className="flex items-center justify-between p-4 rounded-xl border border-black/10 cursor-pointer hover:bg-black/[0.02] transition-colors">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="transferencia_100"
                          checked={formData.paymentMethod === "transferencia_100"}
                          onChange={handleChange}
                          disabled={!currentCustomer}
                          className="accent-[#0A0A0A]"
                        />
                        <div>
                          <span className="text-xs font-semibold text-[#0A0A0A] block">
                            Transferencia Bancaria — Pago Total 100% (${selectedProduct.price.toLocaleString("en-US")} {selectedProduct.currency})
                          </span>
                          <span className="text-[11px] text-[#7A6A5A]">
                            Cancelación completa en cuenta bancaria oficial (USD o ARS a cotización del día).
                          </span>
                        </div>
                      </div>
                      <Building2 className="w-4 h-4 text-[#B5A898] shrink-0" />
                    </label>

                    {/* ZELLE 100% */}
                    <label className="flex items-center justify-between p-4 rounded-xl border border-black/10 cursor-pointer hover:bg-black/[0.02] transition-colors">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="zelle_100"
                          checked={formData.paymentMethod === "zelle_100"}
                          onChange={handleChange}
                          disabled={!currentCustomer}
                          className="accent-[#0A0A0A]"
                        />
                        <div>
                          <span className="text-xs font-semibold text-[#0A0A0A] block">
                            Zelle (EE.UU.) — Pago Total 100% (${selectedProduct.price.toLocaleString("en-US")} {selectedProduct.currency})
                          </span>
                          <span className="text-[11px] text-[#7A6A5A]">
                            Pago completo inmediato en USD sin comisiones vía Zelle.
                          </span>
                        </div>
                      </div>
                      <CreditCard className="w-4 h-4 text-[#B5A898] shrink-0" />
                    </label>
                  </div>
                );
              })()}
            </div>

            {/* BOTÓN ISLAND CTA SUBMIT */}
            <button
              type="submit"
              disabled={loading || !currentCustomer}
              className={`group w-full flex items-center justify-between pl-8 pr-2 py-2 rounded-full text-white text-xs uppercase tracking-[0.24em] font-medium transition-all duration-300 shadow-xl shadow-black/10 ${
                !currentCustomer
                  ? "bg-[#0A0A0A]/40 cursor-not-allowed text-white/60"
                  : "bg-[#0A0A0A] hover:bg-[#7A6A5A] active:scale-[0.98]"
              }`}
            >
              <span>
                {loading 
                  ? "Reservando Pieza..." 
                  : !currentCustomer 
                    ? "Completa tu Registro de Miembro Arriba para Continuar" 
                    : "Confirmar Reserva & Pasar a WhatsApp"}
              </span>
              <span className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">
                <ArrowUpRight className="w-5 h-5 text-white" />
              </span>
            </button>
          </form>
        </div>
      </div>

      {/* RESUMEN DE COMPRA (COLUMNA DERECHA) - DOUBLE BEZEL */}
      <div className="lg:col-span-5 sticky top-32">
        <div className="p-2.5 rounded-[2.5rem] bg-black/[0.02] border border-black/10">
          <div className="p-6 md:p-8 rounded-[calc(2.5rem-0.625rem)] bg-white border border-black/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] space-y-6">
            <h2 className="text-xs uppercase tracking-[0.22em] font-semibold text-[#0A0A0A] border-b border-black/10 pb-3">
              Pieza Seleccionada
            </h2>

            {/* Selector de pieza si hay varias */}
            {products.length > 1 && (
              <div>
                <label className="block text-[10px] uppercase tracking-[0.16em] text-[#7A6A5A] mb-1 font-medium">
                  Cambiar Pieza
                </label>
                <select
                  value={selectedProduct.slug}
                  onChange={(e) => {
                    const found = products.find((p) => p.slug === e.target.value);
                    if (found) setSelectedProduct(found);
                  }}
                  className="w-full text-xs uppercase tracking-wider bg-[#F7F3EE] border border-black/10 rounded-xl px-3 py-2 text-[#0A0A0A]"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.slug}>
                      {p.designer} — {p.name} (${p.price} {p.currency})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* MINIATURA Y DATOS */}
            <div className="flex gap-4 items-start">
              <div className="relative w-24 h-28 rounded-xl overflow-hidden bg-[#F2EDE6] shrink-0 border border-black/10">
                <Image
                  src={selectedProduct.image_url}
                  alt={selectedProduct.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col justify-between h-28">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#7A6A5A] block">
                    {selectedProduct.designer}
                  </span>
                  <h3 className="font-serif text-lg font-normal text-[#0A0A0A] leading-snug line-clamp-2">
                    {selectedProduct.name}
                  </h3>
                </div>
                <span className="text-[11px] text-[#7A6A5A]">
                  Estado: {selectedProduct.condition_state}
                </span>
              </div>
            </div>

            {/* DESGLOSE ECONÓMICO */}
            {(() => {
              const deposit80 = Math.round(selectedProduct.price * 0.8);
              const balance20 = selectedProduct.price - deposit80;
              const isSeña = formData.paymentMethod.includes("_80");

              return (
                <div className="pt-4 border-t border-black/10 space-y-2 text-xs">
                  <div className="flex justify-between text-[#7A6A5A]">
                    <span>Valor Total de la Pieza</span>
                    <span className="font-medium text-[#0A0A0A]">
                      ${selectedProduct.price.toLocaleString("en-US")} {selectedProduct.currency}
                    </span>
                  </div>

                  {isSeña && (
                    <>
                      <div className="flex justify-between text-[#7A6A5A]">
                        <span>Anticipo 80% (Compra & Despacho)</span>
                        <span className="font-semibold text-[#0A0A0A]">
                          ${deposit80.toLocaleString("en-US")} {selectedProduct.currency}
                        </span>
                      </div>
                      <div className="flex justify-between text-[#7A6A5A]">
                        <span>Saldo 20% (A contra entrega)</span>
                        <span className="text-[#7A6A5A]">
                          ${balance20.toLocaleString("en-US")} {selectedProduct.currency}
                        </span>
                      </div>
                    </>
                  )}

                  <div className="flex justify-between text-[#7A6A5A]">
                    <span>Autenticación & Peritaje de Lujo</span>
                    <span className="text-emerald-700 font-medium">Incluida</span>
                  </div>
                  <div className="flex justify-between text-[#7A6A5A]">
                    <span>Asesoramiento de Estilo Ash</span>
                    <span className="text-emerald-700 font-medium">Cortesía</span>
                  </div>

                  <div className="pt-4 border-t border-black/10 flex justify-between items-baseline">
                    <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#0A0A0A]">
                      {isSeña ? "Abonar Hoy (80%)" : "Total a Abonar"}
                    </span>
                    <span className="font-serif text-2xl md:text-3xl text-[#0A0A0A]">
                      ${(isSeña ? deposit80 : selectedProduct.price).toLocaleString("en-US")}{" "}
                      <span className="text-xs font-sans text-[#7A6A5A]">
                        {selectedProduct.currency}
                      </span>
                    </span>
                  </div>
                </div>
              );
            })()}

            {/* TRUST BADGE */}
            <div className="p-4 rounded-xl bg-[#F7F3EE] text-[11px] text-[#7A6A5A] space-y-1.5">
              <div className="flex items-center gap-2 text-[#0A0A0A] font-medium">
                <Lock className="w-3.5 h-3.5 text-[#B5A898]" />
                <span>Reserva Segura 1 de 1</span>
              </div>
              <p>
                Tu membresía garantiza prioridad en la asignación de la pieza mientras el concierge coordina contigo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
