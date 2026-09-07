"use client";

import React, { useState, useEffect, useMemo } from "react";
import { MercaditoCustomer } from "@/types/mercadito";
import { 
  Users, 
  Download, 
  Search, 
  FileSpreadsheet, 
  CloudUpload, 
  Check, 
  Copy, 
  ExternalLink, 
  Sparkles, 
  Mail, 
  Phone, 
  Instagram, 
  MapPin, 
  DollarSign,
  FolderOpen,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  RefreshCw
} from "lucide-react";

export default function AdminCustomersManager() {
  const [customers, setCustomers] = useState<MercaditoCustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterOptIn, setFilterOptIn] = useState<"all" | "optin" | "buyers">("all");
  
  // Feedback states
  const [copiedEmails, setCopiedEmails] = useState(false);
  const [copiedPhones, setCopiedPhones] = useState(false);
  const [driveSyncing, setDriveSyncing] = useState(false);
  const [driveSyncResult, setDriveSyncResult] = useState<{
    success: boolean;
    message: string;
    targetAccount: string;
    folderName: string;
    driveUrl: string;
    instructions?: string;
  } | null>(null);

  // Deletion modal states (In-app, no browser window.confirm)
  const [customerToDelete, setCustomerToDelete] = useState<MercaditoCustomer | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState("");
  const [deleteSuccess, setDeleteSuccess] = useState("");

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/customers");
      const data = await res.json();
      if (res.ok && data.customers) {
        setCustomers(data.customers);
      }
    } catch (err) {
      console.error("Error cargando clientes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Filtered customers
  const filteredCustomers = useMemo(() => {
    return customers.filter((c) => {
      const matchSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        c.phone.toLowerCase().includes(search.toLowerCase()) ||
        (c.city && c.city.toLowerCase().includes(search.toLowerCase())) ||
        (c.instagram && c.instagram.toLowerCase().includes(search.toLowerCase()));

      if (!matchSearch) return false;

      if (filterOptIn === "optin") return c.marketingOptIn;
      if (filterOptIn === "buyers") return c.ordersCount > 0;
      return true;
    });
  }, [customers, search, filterOptIn]);

  // Metrics
  const totalCustomers = customers.length;
  const buyersCount = customers.filter((c) => c.ordersCount > 0).length;
  const optInCount = customers.filter((c) => c.marketingOptIn).length;
  const optInRate = totalCustomers > 0 ? Math.round((optInCount / totalCustomers) * 100) : 0;
  const totalRevenue = customers.reduce((sum, c) => sum + (c.totalSpent || 0), 0);

  // Copy helpers
  const handleCopyEmails = () => {
    const list = filteredCustomers
      .filter((c) => c.marketingOptIn)
      .map((c) => c.email)
      .filter(Boolean)
      .join(", ");
    navigator.clipboard.writeText(list);
    setCopiedEmails(true);
    setTimeout(() => setCopiedEmails(false), 2500);
  };

  const handleCopyPhones = () => {
    const list = filteredCustomers
      .filter((c) => c.marketingOptIn)
      .map((c) => c.phone)
      .filter(Boolean)
      .join("\n");
    navigator.clipboard.writeText(list);
    setCopiedPhones(true);
    setTimeout(() => setCopiedPhones(false), 2500);
  };

  // Google Drive Sync trigger
  const handleDriveSync = async () => {
    setDriveSyncing(true);
    setDriveSyncResult(null);
    try {
      const res = await fetch("/api/admin/drive-sync", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setDriveSyncResult(data);
      }
    } catch (err) {
      console.error("Error sincronizando Drive:", err);
    } finally {
      setDriveSyncing(false);
    }
  };

  // Delete customer handler (In-app modal)
  const openDeleteModal = (customer: MercaditoCustomer) => {
    setDeleteError("");
    setCustomerToDelete(customer);
  };

  const confirmDeleteCustomer = async () => {
    if (!customerToDelete) return;

    setDeletingId(customerToDelete.id);
    setDeleteError("");
    try {
      const res = await fetch("/api/admin/customers", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: customerToDelete.id, email: customerToDelete.email }),
      });

      if (res.ok) {
        const deletedId = customerToDelete.id;
        const deletedEmail = customerToDelete.email.toLowerCase();
        setCustomers((prev) =>
          prev.filter((c) => c.id !== deletedId && c.email.toLowerCase() !== deletedEmail)
        );
        setDeleteSuccess(
          `Cliente "${customerToDelete.name}" (${customerToDelete.email}) eliminado permanentemente.`
        );
        setCustomerToDelete(null);
        setTimeout(() => setDeleteSuccess(""), 4500);
        // Sincronizar inmediatamente con la base de datos
        fetchCustomers();
      } else {
        const data = await res.json().catch(() => ({}));
        setDeleteError(data.error || "Ocurrió un error al intentar eliminar el cliente.");
      }
    } catch (err) {
      console.error("Error al eliminar cliente:", err);
      setDeleteError("Error de conexión al eliminar.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* HEADER & ACTIONS */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-black/10">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#7A6A5A] font-semibold block mb-1">
            CRM & BASE DE DATOS DE MARKETING
          </span>
          <h2 className="font-serif text-2xl md:text-3xl text-[#0A0A0A] font-normal">
            Clientes & Coleccionistas
          </h2>
          <p className="text-xs text-[#7A6A5A] mt-1">
            Base de datos de compradores y miembros de El Mercadito. Exporta a Excel y sincroniza con Google Drive para campañas de marketing.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Export Excel */}
          <a
            href="/api/admin/export-excel"
            download
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0A0A0A] text-white text-xs uppercase tracking-wider font-medium hover:bg-[#7A6A5A] transition-all shadow-sm"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Descargar Excel Completo</span>
          </a>

          {/* Export CSV Marketing */}
          <a
            href="/api/admin/export-excel?format=csv"
            download
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-black/15 text-[#0A0A0A] text-xs uppercase tracking-wider font-medium hover:bg-black/[0.04] transition-all shadow-sm"
          >
            <Download className="w-4 h-4 text-[#7A6A5A]" />
            <span>CSV Campañas</span>
          </a>

          {/* Sincronizar Google Drive */}
          <button
            type="button"
            onClick={handleDriveSync}
            disabled={driveSyncing}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1a73e8] text-white text-xs uppercase tracking-wider font-medium hover:bg-[#1558b0] transition-all shadow-sm disabled:opacity-50"
          >
            <CloudUpload className={`w-4 h-4 ${driveSyncing ? "animate-spin" : ""}`} />
            <span>{driveSyncing ? "Sincronizando..." : "Sincronizar a Drive"}</span>
          </button>
        </div>
      </div>

      {/* Delete Success Alert */}
      {deleteSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between animate-in fade-in duration-200 shadow-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{deleteSuccess}</span>
          </div>
          <button
            type="button"
            onClick={() => setDeleteSuccess("")}
            className="text-emerald-700 hover:text-emerald-900 text-xs font-semibold px-2 py-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* GOOGLE DRIVE SYNC CARD (INFO@ASHMATEU.COM / VENTAS) */}
      <div className="p-6 rounded-[2rem] bg-gradient-to-r from-[#F7F3EE] via-white to-[#F7F3EE] border border-black/10 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white border border-black/10 flex items-center justify-center shadow-sm">
              <FolderOpen className="w-6 h-6 text-[#1a73e8]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#1a73e8] bg-blue-50 px-2 py-0.5 rounded-md">
                  Google Drive Integrado
                </span>
                <span className="text-xs text-[#7A6A5A]">Destino oficial de exportación</span>
              </div>
              <h3 className="font-serif text-lg text-[#0A0A0A] mt-0.5">
                info@ashmateu.com &rarr; Carpeta <span className="font-semibold text-[#0A0A0A]">VENTAS</span>
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href="https://drive.google.com/drive/folders/1X3zzD75EF_My144-5ZIpn7h6-P1XGW-u?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-black/15 text-xs text-[#0A0A0A] font-medium hover:bg-black/[0.03] transition-all shadow-xs"
            >
              <span>Abrir Carpeta VENTAS</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#1a73e8]" />
            </a>
            <button
              type="button"
              onClick={handleDriveSync}
              disabled={driveSyncing}
              className="px-3.5 py-2 rounded-xl bg-[#0A0A0A] text-white text-xs font-medium hover:bg-[#7A6A5A] transition-all"
            >
              Actualizar Export
            </button>
          </div>
        </div>

        {driveSyncResult && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-start gap-2.5 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">{driveSyncResult.message}</p>
              <p className="text-[11px] text-emerald-700 mt-1">
                {driveSyncResult.instructions}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-black/10 shadow-sm space-y-1">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#7A6A5A] font-semibold flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-[#0A0A0A]" /> Clientes Totales
          </span>
          <p className="font-serif text-2xl md:text-3xl text-[#0A0A0A]">
            {totalCustomers}
          </p>
          <span className="text-[11px] text-[#7A6A5A]">Registrados en la plataforma</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-black/10 shadow-sm space-y-1">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#7A6A5A] font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> Compradores VIP
          </span>
          <p className="font-serif text-2xl md:text-3xl text-[#0A0A0A]">
            {buyersCount}
          </p>
          <span className="text-[11px] text-[#7A6A5A]">Con órdenes efectuadas</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-black/10 shadow-sm space-y-1">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#7A6A5A] font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Opt-In Marketing
          </span>
          <p className="font-serif text-2xl md:text-3xl text-[#0A0A0A]">
            {optInRate}%
          </p>
          <span className="text-[11px] text-[#7A6A5A]">{optInCount} aceptaron comunicaciones</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-black/10 shadow-sm space-y-1">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#7A6A5A] font-semibold flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-emerald-600" /> Facturación Total
          </span>
          <p className="font-serif text-2xl md:text-3xl text-[#0A0A0A]">
            ${totalRevenue.toLocaleString("en-US")}
          </p>
          <span className="text-[11px] text-[#7A6A5A]">USD en piezas vendidas</span>
        </div>
      </div>

      {/* FILTER & MARKETING COPY TOOLS BAR */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#7A6A5A] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por nombre, email, WhatsApp, ciudad, @instagram..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-black/15 bg-white text-xs focus:outline-none focus:border-[#0A0A0A]"
          />
        </div>

        {/* Filter Pills & Copy Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="inline-flex p-1 rounded-xl bg-black/[0.04] border border-black/10 text-xs">
            <button
              onClick={() => setFilterOptIn("all")}
              className={`px-3 py-1 rounded-lg transition-all ${
                filterOptIn === "all" ? "bg-white text-[#0A0A0A] shadow-xs font-semibold" : "text-[#7A6A5A]"
              }`}
            >
              Todos ({customers.length})
            </button>
            <button
              onClick={() => setFilterOptIn("optin")}
              className={`px-3 py-1 rounded-lg transition-all ${
                filterOptIn === "optin" ? "bg-white text-[#0A0A0A] shadow-xs font-semibold" : "text-[#7A6A5A]"
              }`}
            >
              Con Opt-In ({optInCount})
            </button>
            <button
              onClick={() => setFilterOptIn("buyers")}
              className={`px-3 py-1 rounded-lg transition-all ${
                filterOptIn === "buyers" ? "bg-white text-[#0A0A0A] shadow-xs font-semibold" : "text-[#7A6A5A]"
              }`}
            >
              Compradores ({buyersCount})
            </button>
          </div>

          <button
            type="button"
            onClick={handleCopyEmails}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-black/15 text-xs text-[#0A0A0A] hover:bg-black/[0.03] transition-all font-medium"
            title="Copia los emails de los clientes con opt-in para pegar en tu plataforma de mailing"
          >
            {copiedEmails ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#7A6A5A]" />}
            <span>{copiedEmails ? "¡Emails Copiados!" : "Copiar Emails"}</span>
          </button>

          <button
            type="button"
            onClick={handleCopyPhones}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-black/15 text-xs text-[#0A0A0A] hover:bg-black/[0.03] transition-all font-medium"
            title="Copia los teléfonos para armar listas de difusión en WhatsApp"
          >
            {copiedPhones ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#7A6A5A]" />}
            <span>{copiedPhones ? "¡Teléfonos Copiados!" : "Copiar WhatsApps"}</span>
          </button>

          <button
            type="button"
            onClick={fetchCustomers}
            className="p-2 rounded-xl bg-white border border-black/15 text-[#7A6A5A] hover:text-[#0A0A0A] transition-all"
            title="Refrescar lista"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* CUSTOMERS TABLE */}
      <div className="bg-white rounded-[2rem] border border-black/10 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-black/10 bg-[#F7F3EE]/50 text-[10px] uppercase tracking-[0.18em] text-[#7A6A5A]">
                <th className="py-4 px-6 font-semibold">Cliente</th>
                <th className="py-4 px-6 font-semibold">Contacto & WhatsApp</th>
                <th className="py-4 px-6 font-semibold">Instagram</th>
                <th className="py-4 px-6 font-semibold">Ubicación</th>
                <th className="py-4 px-6 font-semibold">Historial Compras</th>
                <th className="py-4 px-6 font-semibold">Marketing</th>
                <th className="py-4 px-6 font-semibold">Registro</th>
                <th className="py-4 px-6 font-semibold text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 text-xs">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-[#7A6A5A]">
                    Cargando base de clientes...
                  </td>
                </tr>
              ) : filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-[#7A6A5A]">
                    No se encontraron clientes con los filtros aplicados.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((customer) => {
                  const cleanPhone = customer.phone.replace(/[^0-9]/g, "");
                  const waUrl = `https://wa.me/${cleanPhone}`;

                  return (
                    <tr key={customer.id} className="hover:bg-black/[0.015] transition-colors">
                      {/* Cliente */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center font-serif text-xs uppercase font-medium shrink-0">
                            {customer.name.charAt(0)}
                          </div>
                          <div>
                            <span className="font-semibold text-[#0A0A0A] block">
                              {customer.name}
                            </span>
                            {customer.ordersCount > 0 && (
                              <span className="inline-block mt-0.5 text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#D4AF37]/15 text-[#856b1a] font-semibold">
                                Comprador VIP
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Contacto & WhatsApp */}
                      <td className="py-4 px-6">
                        <div className="space-y-1">
                          <a
                            href={`mailto:${customer.email}`}
                            className="flex items-center gap-1.5 text-black hover:text-[#7A6A5A] transition-colors"
                          >
                            <Mail className="w-3 h-3 text-[#7A6A5A] shrink-0" />
                            <span>{customer.email}</span>
                          </a>
                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-emerald-700 hover:text-emerald-900 transition-colors font-medium"
                          >
                            <Phone className="w-3 h-3 text-emerald-600 shrink-0" />
                            <span>{customer.phone}</span>
                            <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                          </a>
                        </div>
                      </td>

                      {/* Instagram */}
                      <td className="py-4 px-6">
                        {customer.instagram ? (
                          <a
                            href={`https://instagram.com/${customer.instagram.replace("@", "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[#0A0A0A] hover:text-[#7A6A5A] transition-colors"
                          >
                            <Instagram className="w-3 h-3 text-[#C13584]" />
                            <span>{customer.instagram.startsWith("@") ? customer.instagram : `@${customer.instagram}`}</span>
                          </a>
                        ) : (
                          <span className="text-[#7A6A5A]/50">—</span>
                        )}
                      </td>

                      {/* Ubicación */}
                      <td className="py-4 px-6">
                        {customer.city ? (
                          <span className="flex items-center gap-1 text-[#0A0A0A]">
                            <MapPin className="w-3 h-3 text-[#7A6A5A] shrink-0" />
                            <span>{customer.city}, {customer.country}</span>
                          </span>
                        ) : (
                          <span className="text-[#7A6A5A]">{customer.country}</span>
                        )}
                      </td>

                      {/* Historial */}
                      <td className="py-4 px-6">
                        <div className="space-y-0.5">
                          <span className="font-semibold text-[#0A0A0A] block">
                            ${customer.totalSpent?.toLocaleString("en-US")} USD
                          </span>
                          <span className="text-[11px] text-[#7A6A5A]">
                            {customer.ordersCount} {customer.ordersCount === 1 ? "reserva" : "reservas"}
                          </span>
                        </div>
                      </td>

                      {/* Marketing Opt-In */}
                      <td className="py-4 px-6">
                        {customer.marketingOptIn ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-medium border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            Opt-in Activo
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/5 text-[#7A6A5A] text-[10px]">
                            Sin suscripción
                          </span>
                        )}
                      </td>

                      {/* Fecha de Registro */}
                      <td className="py-4 px-6 text-[#7A6A5A] text-[11px] whitespace-nowrap">
                        {customer.firstRegisteredAt ? new Date(customer.firstRegisteredAt).toLocaleDateString("es-AR") : "—"}
                      </td>

                      {/* Botón de Eliminar */}
                      <td className="py-4 px-6 text-right">
                        <button
                          type="button"
                          onClick={() => openDeleteModal(customer)}
                          disabled={deletingId === customer.id}
                          className="p-1.5 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-40"
                          title={`Eliminar a ${customer.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de confirmación de eliminación de cliente */}
      {customerToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-black/10 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-red-100 flex items-center justify-center text-red-600 shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-xl text-[#0A0A0A]">
                  ¿Eliminar cliente de la base?
                </h3>
                <p className="text-xs text-[#7A6A5A] mt-1 leading-relaxed">
                  Estás a punto de borrar permanentemente a <strong className="text-[#0A0A0A] font-semibold">{customerToDelete.name}</strong> ({customerToDelete.email}).
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-50 border border-black/5 text-xs text-[#524438] space-y-1">
              <p>• Se eliminará del listado local y de la sincronización en Supabase.</p>
              <p>• Su suscripción a marketing y accesos quedarán revocados.</p>
            </div>

            {deleteError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
                {deleteError}
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-black/5">
              <button
                type="button"
                disabled={Boolean(deletingId)}
                onClick={() => { setCustomerToDelete(null); setDeleteError(""); }}
                className="px-5 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider text-[#7A6A5A] hover:text-[#0A0A0A] hover:bg-black/5 transition-all"
              >
                Cancelar
              </button>
              <button
                type="button"
                disabled={Boolean(deletingId)}
                onClick={confirmDeleteCustomer}
                className="px-5 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider bg-red-600 hover:bg-red-700 text-white transition-all shadow-md active:scale-95 disabled:opacity-50 flex items-center gap-2"
              >
                {deletingId ? "Eliminando..." : "Eliminar Definitivamente"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
