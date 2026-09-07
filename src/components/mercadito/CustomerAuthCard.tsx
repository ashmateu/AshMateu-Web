"use client";

import React, { useState } from "react";
import { MercaditoCustomer } from "@/types/mercadito";
import { Sparkles, ShieldCheck, UserCheck, Lock, ArrowRight, LogIn, UserPlus, CheckCircle2 } from "lucide-react";

interface Props {
  currentCustomer: MercaditoCustomer | null;
  onAuthSuccess: (customer: MercaditoCustomer) => void;
  onLogout: () => void;
}

export default function CustomerAuthCard({ currentCustomer, onAuthSuccess, onLogout }: Props) {
  const [mode, setMode] = useState<"register" | "login">("register");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Register Form
  const [regData, setRegData] = useState({
    name: "",
    email: "",
    phone: "",
    instagram: "",
    city: "",
    country: "Argentina",
    password: "",
    marketingOptIn: true,
  });

  // Login Form
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!regData.name || !regData.email || !regData.phone) {
      setError("Nombre, email y WhatsApp son requeridos para registrar tu membresía.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/mercadito/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(regData),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        onAuthSuccess(data.customer);
      } else {
        setError(data.error || "Error al registrarte como miembro.");
        if (data.existingAccount) {
          setMode("login");
          setLoginData((prev) => ({ ...prev, email: regData.email }));
        }
      }
    } catch (err: any) {
      setError("Error de conexión. Por favor intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!loginData.email) {
      setError("Por favor ingresa tu email de miembro.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/mercadito/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        onAuthSuccess(data.customer);
      } else {
        setError(data.error || "No pudimos autenticar tu cuenta. Verifica los datos o crea una nueva.");
      }
    } catch (err: any) {
      setError("Error de conexión al iniciar sesión.");
    } finally {
      setLoading(false);
    }
  };

  // Si ya está autenticado, mostrar tarjeta VIP elegante
  if (currentCustomer) {
    return (
      <div className="p-6 md:p-7 rounded-[2rem] bg-[#0A0A0A] text-white space-y-4 shadow-xl shadow-black/10 border border-white/10 relative overflow-hidden">
        {/* Glow de fondo editorial */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#D4AF37]/15 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/30 flex items-center justify-center text-[#E5C158]">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block">
                MEMBRESÍA VIP ACTIVADA
              </span>
              <h3 className="font-serif text-lg font-normal text-white">
                {currentCustomer.name}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="text-[11px] uppercase tracking-wider text-white/50 hover:text-white underline underline-offset-4 transition-colors"
          >
            Cambiar cuenta
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-white/10 text-xs">
          <div>
            <span className="text-[9.5px] uppercase tracking-[0.18em] text-white/50 block mb-0.5">Email</span>
            <span className="text-white/90 truncate block">{currentCustomer.email}</span>
          </div>
          <div>
            <span className="text-[9.5px] uppercase tracking-[0.18em] text-white/50 block mb-0.5">WhatsApp</span>
            <span className="text-white/90">{currentCustomer.phone}</span>
          </div>
          {currentCustomer.city && (
            <div>
              <span className="text-[9.5px] uppercase tracking-[0.18em] text-white/50 block mb-0.5">Ubicación</span>
              <span className="text-white/90 truncate block">{currentCustomer.city}, {currentCustomer.country}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 text-[11.5px] text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-3.5 py-2 rounded-xl">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Acceso verificado para reservas prioritarias de El Mercadito.</span>
        </div>
      </div>
    );
  }

  // Si NO está autenticado, mostrar formulario de Registro / Login
  return (
    <div className="p-6 md:p-8 rounded-[2rem] bg-[#F7F3EE] border border-black/15 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/10 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0A0A0A] text-white text-[9.5px] uppercase tracking-[0.2em] font-semibold">
              <Lock className="w-3 h-3 text-[#D4AF37]" />
              Paso Requerido
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#7A6A5A] font-medium">
              Base de Coleccionistas
            </span>
          </div>
          <h2 className="font-serif text-xl sm:text-2xl text-[#0A0A0A]">
            {mode === "register" ? "Registro Exclusivo de Miembro" : "Acceso a tu Cuenta de Miembro"}
          </h2>
          <p className="text-xs text-[#7A6A5A] mt-1 font-light">
            {mode === "register" 
              ? "Para asegurar la trazabilidad y resguardo de piezas únicas, es necesario registrarte como cliente antes de confirmar."
              : "Ingresa tu email para asociar la reserva a tu historial de compras."}
          </p>
        </div>

        {/* Switcher Tabs */}
        <div className="inline-flex p-1 rounded-full bg-white border border-black/10 shrink-0 self-start sm:self-center">
          <button
            type="button"
            onClick={() => { setMode("register"); setError(""); }}
            className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider font-medium transition-all ${
              mode === "register"
                ? "bg-[#0A0A0A] text-white shadow-sm"
                : "text-[#7A6A5A] hover:text-[#0A0A0A]"
            }`}
          >
            Registrarme
          </button>
          <button
            type="button"
            onClick={() => { setMode("login"); setError(""); }}
            className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider font-medium transition-all ${
              mode === "login"
                ? "bg-[#0A0A0A] text-white shadow-sm"
                : "text-[#7A6A5A] hover:text-[#0A0A0A]"
            }`}
          >
            Ya soy Miembro
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
          {error}
        </div>
      )}

      {mode === "register" ? (
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-[10.5px] uppercase tracking-[0.16em] text-[#7A6A5A] mb-1 font-medium">
                Nombre y Apellido *
              </label>
              <input
                type="text"
                required
                placeholder="Ej: Clara Menéndez"
                value={regData.name}
                onChange={(e) => setRegData({ ...regData, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-black/15 text-sm bg-white focus:outline-none focus:border-[#0A0A0A] transition-all"
              />
            </div>

            <div>
              <label className="block text-[10.5px] uppercase tracking-[0.16em] text-[#7A6A5A] mb-1 font-medium">
                Email de Contacto *
              </label>
              <input
                type="email"
                required
                placeholder="clara@ejemplo.com"
                value={regData.email}
                onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-black/15 text-sm bg-white focus:outline-none focus:border-[#0A0A0A] transition-all"
              />
            </div>

            <div>
              <label className="block text-[10.5px] uppercase tracking-[0.16em] text-[#7A6A5A] mb-1 font-medium">
                WhatsApp / Teléfono Móvil *
              </label>
              <input
                type="tel"
                required
                placeholder="+54 9 11 5555 5555"
                value={regData.phone}
                onChange={(e) => setRegData({ ...regData, phone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-black/15 text-sm bg-white focus:outline-none focus:border-[#0A0A0A] transition-all"
              />
            </div>

            <div>
              <label className="block text-[10.5px] uppercase tracking-[0.16em] text-[#7A6A5A] mb-1 font-medium">
                Usuario de Instagram (Opcional)
              </label>
              <input
                type="text"
                placeholder="@tuusuario"
                value={regData.instagram}
                onChange={(e) => setRegData({ ...regData, instagram: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-black/15 text-sm bg-white focus:outline-none focus:border-[#0A0A0A] transition-all"
              />
            </div>

            <div>
              <label className="block text-[10.5px] uppercase tracking-[0.16em] text-[#7A6A5A] mb-1 font-medium">
                Ciudad / Provincia
              </label>
              <input
                type="text"
                placeholder="Buenos Aires"
                value={regData.city}
                onChange={(e) => setRegData({ ...regData, city: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-black/15 text-sm bg-white focus:outline-none focus:border-[#0A0A0A] transition-all"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[10.5px] uppercase tracking-[0.16em] text-[#7A6A5A] mb-1 font-medium">
                Contraseña o PIN personal (Opcional para tus próximas visitas)
              </label>
              <input
                type="password"
                placeholder="Crea una clave para recordar tus datos"
                value={regData.password}
                onChange={(e) => setRegData({ ...regData, password: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-black/15 text-sm bg-white focus:outline-none focus:border-[#0A0A0A] transition-all"
              />
            </div>
          </div>

          {/* Marketing Opt-in Checkbox */}
          <label className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-black/10 cursor-pointer hover:border-black/20 transition-all">
            <input
              type="checkbox"
              checked={regData.marketingOptIn}
              onChange={(e) => setRegData({ ...regData, marketingOptIn: e.target.checked })}
              className="mt-0.5 accent-[#0A0A0A] w-4 h-4 rounded"
            />
            <span className="text-xs text-[#524438] leading-relaxed">
              Deseo recibir anuncios de <strong className="text-[#0A0A0A] font-semibold">Drops Privados, Editoriales Exclusivas y Preventas</strong> de Ash Mateu vía WhatsApp y Email.
            </span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-full bg-[#0A0A0A] text-white text-xs uppercase tracking-[0.22em] font-medium hover:bg-[#7A6A5A] transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <span>Registrando Membresía...</span>
            ) : (
              <>
                <span>Registrarme y Desbloquear Compra</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      ) : (
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-3">
            <div>
              <label className="block text-[10.5px] uppercase tracking-[0.16em] text-[#7A6A5A] mb-1 font-medium">
                Email Registrado *
              </label>
              <input
                type="email"
                required
                placeholder="clara@ejemplo.com"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-black/15 text-sm bg-white focus:outline-none focus:border-[#0A0A0A] transition-all"
              />
            </div>

            <div>
              <label className="block text-[10.5px] uppercase tracking-[0.16em] text-[#7A6A5A] mb-1 font-medium">
                Contraseña / PIN (Si configuraste una)
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-black/15 text-sm bg-white focus:outline-none focus:border-[#0A0A0A] transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-full bg-[#0A0A0A] text-white text-xs uppercase tracking-[0.22em] font-medium hover:bg-[#7A6A5A] transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <span>Verificando...</span>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>Ingresar como Miembro</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
