"use client";

import React, { useState } from "react";
import { Lock, ArrowUpRight, ShieldCheck, Sparkles, User } from "lucide-react";

export default function AdminLoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        window.location.reload();
      } else {
        setError(data.error || "Credenciales incorrectas.");
        setLoading(false);
      }
    } catch (err) {
      setError("Error al conectar con el servidor.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85dvh] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* DOUBLE-BEZEL CONTAINER */}
        <div className="p-3 rounded-[2.5rem] bg-black/[0.02] border border-black/10">
          <div className="p-8 md:p-12 rounded-[calc(2.5rem-0.75rem)] bg-white border border-black/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]">
            {/* CABECERA */}
            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-full bg-black/[0.04] border border-black/10 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-5 h-5 text-[#B5A898]" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.28em] font-semibold text-[#7A6A5A] block mb-2">
                ACCESO RESTRINGIDO
              </span>
              <h1 className="font-serif text-2xl md:text-3xl font-normal tracking-tight text-[#0A0A0A]">
                Ash Mateu Studio
              </h1>
              <p className="text-xs text-[#7A6A5A] mt-1.5 font-light">
                Panel de control editorial y piezas de archivo.
              </p>
            </div>

            {error && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 text-center mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-[10.5px] uppercase tracking-[0.16em] text-[#7A6A5A] mb-1.5 font-medium">
                  Usuario
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="ashmateu"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-black/15 text-sm bg-[#F7F3EE]/40 focus:outline-none focus:border-[#0A0A0A] focus:bg-white transition-all"
                  />
                  <User className="w-4 h-4 text-[#7A6A5A] absolute left-3.5 top-3.5" />
                </div>
              </div>

              <div>
                <label className="block text-[10.5px] uppercase tracking-[0.16em] text-[#7A6A5A] mb-1.5 font-medium">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-black/15 text-sm bg-[#F7F3EE]/40 focus:outline-none focus:border-[#0A0A0A] focus:bg-white transition-all"
                  />
                  <Lock className="w-4 h-4 text-[#7A6A5A] absolute left-3.5 top-3.5" />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group w-full flex items-center justify-between pl-6 pr-2 py-2 rounded-full bg-[#0A0A0A] text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#7A6A5A] active:scale-[0.98] transition-all shadow-lg disabled:opacity-50 mt-4"
              >
                <span>{loading ? "Verificando..." : "Ingresar al Panel"}</span>
                <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
