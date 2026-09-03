"use client";

import React, { useState, useEffect } from "react";
import { MercaditoOrder } from "@/types/mercadito";
import { 
  ShoppingBag, 
  Search, 
  Clock, 
  CheckCircle2, 
  MessageCircle, 
  DollarSign, 
  Truck, 
  AlertCircle,
  ChevronDown,
  RefreshCw,
  ExternalLink,
  MapPin,
  User,
  Phone,
  Mail
} from "lucide-react";

const STATUS_CONFIG: Record<
  MercaditoOrder["status"],
  { label: string; bg: string; text: string; border: string }
> = {
  pending_payment: {
    label: "Pendiente de Pago",
    bg: "bg-amber-50",
    text: "text-amber-800",
    border: "border-amber-200",
  },
  deposit_paid: {
    label: "Seña 80% Cobrada",
    bg: "bg-blue-50",
    text: "text-blue-800",
    border: "border-blue-200",
  },
  confirmed: {
    label: "Pago Total Confirmado",
    bg: "bg-emerald-50",
    text: "text-emerald-800",
    border: "border-emerald-200",
  },
  delivered: {
    label: "Entregado / Despachado",
    bg: "bg-purple-50",
    text: "text-purple-800",
    border: "border-purple-200",
  },
  cancelled: {
    label: "Cancelada",
    bg: "bg-stone-100",
    text: "text-stone-600",
    border: "border-stone-200",
  },
};

export default function AdminOrdersManager() {
  const [orders, setOrders] = useState<MercaditoOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/orders");
      const data = await res.json();
      if (res.ok && data.orders) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: MercaditoOrder["status"]) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status: newStatus }),
      });
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        );
        setMessage("✦ Estado actualizado con éxito.");
        setTimeout(() => setMessage(""), 3000);
      } else {
        alert("No se pudo actualizar el estado de la orden.");
      }
    } catch (e) {
      alert("Error al conectar con el servidor.");
    } finally {
      setUpdatingId(null);
    }
  };

  // Métricas
  const totalRevenue = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + (o.productPrice || 0), 0);

  const pendingCount = orders.filter((o) => o.status === "pending_payment").length;
  const activeCount = orders.filter((o) => o.status === "deposit_paid" || o.status === "confirmed").length;

  // Filtrar órdenes
  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.buyerName.toLowerCase().includes(search.toLowerCase()) ||
      o.productName.toLowerCase().includes(search.toLowerCase()) ||
      o.productDesigner.toLowerCase().includes(search.toLowerCase()) ||
      o.buyerPhone.includes(search);

    const matchesStatus = filterStatus === "all" || o.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* BARRA SUPERIOR Y MÉTRICAS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-black/10 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#7A6A5A] uppercase tracking-wider mb-2 font-semibold">
            <span>Volumen Reservado</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="font-serif text-3xl text-[#0A0A0A]">
            ${totalRevenue.toLocaleString("en-US")} <span className="text-xs font-sans text-neutral-400">USD</span>
          </p>
          <p className="text-[11px] text-neutral-500 mt-1">
            {orders.length} pedidos registrados
          </p>
        </div>

        <div className="bg-white border border-black/10 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#7A6A5A] uppercase tracking-wider mb-2 font-semibold">
            <span>Pendientes de Cobro</span>
            <AlertCircle className="w-4 h-4 text-amber-500" />
          </div>
          <p className="font-serif text-3xl text-[#0A0A0A]">
            {pendingCount}
          </p>
          <p className="text-[11px] text-neutral-500 mt-1">
            Esperando transferencia o comprobante
          </p>
        </div>

        <div className="bg-white border border-black/10 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#7A6A5A] uppercase tracking-wider mb-2 font-semibold">
            <span>En Proceso / Despacho</span>
            <Truck className="w-4 h-4 text-blue-500" />
          </div>
          <p className="font-serif text-3xl text-[#0A0A0A]">
            {activeCount}
          </p>
          <p className="text-[11px] text-neutral-500 mt-1">
            Seña cobrada o pago completado
          </p>
        </div>
      </div>

      {/* MENSAJE DE CONFIRMACIÓN */}
      {message && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-4 py-2.5 rounded-xl flex items-center justify-between">
          <span>{message}</span>
        </div>
      )}

      {/* FILTROS Y BÚSQUEDA */}
      <div className="bg-white border border-black/10 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-3 shadow-sm">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por orden, cliente, pieza o cel..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-full border border-black/10 focus:outline-none focus:border-black"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {[
            { id: "all", label: "Todas" },
            { id: "pending_payment", label: "Pendientes" },
            { id: "deposit_paid", label: "Seña 80%" },
            { id: "confirmed", label: "Confirmadas" },
            { id: "delivered", label: "Entregadas" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilterStatus(f.id)}
              className={`px-3.5 py-1.5 rounded-full text-[11px] uppercase tracking-wider font-semibold whitespace-nowrap transition-colors ${
                filterStatus === f.id
                  ? "bg-[#0A0A0A] text-white"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
              }`}
            >
              {f.label}
            </button>
          ))}

          <button
            onClick={fetchOrders}
            title="Actualizar listado"
            className="p-2 rounded-full border border-black/10 hover:bg-neutral-100 transition-colors ml-auto text-neutral-600"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* LISTADO DE VENTAS */}
      {loading ? (
        <div className="text-center py-16 bg-white border border-black/10 rounded-2xl">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto text-neutral-400 mb-2" />
          <p className="text-xs text-neutral-500 uppercase tracking-widest">Cargando ventas y reservas...</p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="text-center py-16 bg-white border border-black/10 rounded-2xl p-8">
          <ShoppingBag className="w-12 h-12 stroke-1 text-neutral-300 mx-auto mb-3" />
          <h3 className="font-serif text-lg text-[#0A0A0A] mb-1">No hay órdenes registradas</h3>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            Cuando un cliente complete el formulario de reserva en El Mercadito, aparecerá aquí inmediatamente con todos sus datos y acceso directo a WhatsApp.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const statusInfo = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending_payment;
            const cleanPhone = order.buyerPhone.replace(/\D/g, "");
            const waLink = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
              `¡Hola ${order.buyerName}! ✦ Te contacto de Ash Mateu sobre tu reserva #${order.id} (${order.productDesigner} — ${order.productName}).`
            )}`;

            return (
              <div
                key={order.id}
                className="bg-white border border-black/10 rounded-2xl p-5 md:p-6 shadow-sm hover:border-black/25 transition-colors space-y-4"
              >
                {/* CABECERA DE LA ORDEN */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-semibold text-[#0A0A0A] bg-neutral-100 px-2.5 py-1 rounded-md">
                      #{order.id}
                    </span>
                    <span className="text-[11px] text-neutral-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(order.createdAt).toLocaleDateString("es-AR", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>

                  {/* SELECTOR DE ESTADO INTERACTIVO */}
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">
                      Estado:
                    </span>
                    <select
                      value={order.status}
                      disabled={updatingId === order.id}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value as MercaditoOrder["status"])
                      }
                      className={`text-xs font-semibold px-3 py-1.5 rounded-full border cursor-pointer focus:outline-none ${statusInfo.bg} ${statusInfo.text} ${statusInfo.border}`}
                    >
                      <option value="pending_payment">🟡 Pendiente de Pago</option>
                      <option value="deposit_paid">🔵 Seña 80% Cobrada</option>
                      <option value="confirmed">🟢 Pago Total Confirmado</option>
                      <option value="delivered">🟣 Entregado / Despachado</option>
                      <option value="cancelled">⚪ Cancelada</option>
                    </select>
                  </div>
                </div>

                {/* CUERPO DE LA ORDEN (2 COLUMNAS) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
                  {/* COLUMNA 1: PIEZA Y MONTO */}
                  <div className="space-y-2">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-[#7A6A5A] font-semibold">
                      Pieza Adquirida
                    </div>
                    <div className="bg-neutral-50 rounded-xl p-3.5 border border-neutral-100">
                      <p className="text-xs uppercase tracking-widest text-neutral-500 font-medium">
                        {order.productDesigner}
                      </p>
                      <h4 className="font-serif text-base text-[#0A0A0A] font-medium mt-0.5">
                        {order.productName}
                      </h4>

                      <div className="mt-3 pt-3 border-t border-neutral-200/60 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-neutral-400 block uppercase tracking-wider">
                            Valor Total
                          </span>
                          <span className="font-serif text-lg font-semibold text-[#0A0A0A]">
                            ${order.productPrice.toLocaleString("en-US")} {order.productCurrency}
                          </span>
                        </div>

                        {order.depositAmount ? (
                          <div className="text-right">
                            <span className="text-[10px] text-emerald-700 font-semibold block uppercase tracking-wider">
                              Seña 80%: ${order.depositAmount.toLocaleString("en-US")} USD
                            </span>
                            <span className="text-[10px] text-neutral-500">
                              Saldo 20%: ${order.balanceAmount?.toLocaleString("en-US")} USD
                            </span>
                          </div>
                        ) : null}
                      </div>

                      <div className="mt-2 text-[11px] text-neutral-500">
                        💳 <strong>Medio:</strong> {order.paymentMethod.replace("_80", " (Seña 80%)")}
                      </div>
                    </div>
                  </div>

                  {/* COLUMNA 2: CLIENTE Y CONTACTO */}
                  <div className="space-y-2">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-[#7A6A5A] font-semibold">
                      Datos del Comprador
                    </div>
                    <div className="bg-neutral-50 rounded-xl p-3.5 border border-neutral-100 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#0A0A0A]">
                        <User className="w-3.5 h-3.5 text-neutral-400" />
                        <span>{order.buyerName}</span>
                      </div>

                      <div className="flex items-center justify-between text-xs text-neutral-600">
                        <div className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-neutral-400" />
                          <span>{order.buyerPhone}</span>
                        </div>
                        <a
                          href={waLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold transition-colors"
                        >
                          <MessageCircle className="w-3 h-3" />
                          <span>Abrir WhatsApp</span>
                        </a>
                      </div>

                      {order.buyerEmail && (
                        <div className="flex items-center gap-2 text-xs text-neutral-600">
                          <Mail className="w-3.5 h-3.5 text-neutral-400" />
                          <span>{order.buyerEmail}</span>
                        </div>
                      )}

                      <div className="flex items-start gap-2 text-xs text-neutral-600 pt-1 border-t border-neutral-200/60">
                        <MapPin className="w-3.5 h-3.5 text-neutral-400 mt-0.5 shrink-0" />
                        <span>
                          {order.shippingAddress ? `${order.shippingAddress}, ` : ""}
                          {order.shippingCity}, {order.shippingCountry}
                        </span>
                      </div>
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
