"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PressArticle } from "@/lib/data/press";
import GsapReveal from "@/components/animations/GsapReveal";

interface NewsletterClientProps {
  initialArticles: PressArticle[];
}

export default function NewsletterClient({
  initialArticles,
}: NewsletterClientProps) {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const tabs = [
    { label: "Todas las Publicaciones", value: "all" },
    { label: "Marie Claire Argentina", value: "Marie Claire" },
    { label: "Fashion Weeks", value: "Fashion Week" },
    { label: "Haute Couture & Lujo", value: "Lujo" },
    { label: "Cultura & Tendencias", value: "Cultura" },
  ];

  const filteredArticles = initialArticles.filter((art) => {
    if (activeTab === "all") return true;
    if (activeTab === "Marie Claire") return art.publication.includes("Marie Claire");
    if (activeTab === "Fashion Week")
      return (
        art.category?.includes("Fashion Week") ||
        art.title.toLowerCase().includes("fashion week") ||
        art.title.toLowerCase().includes("parís")
      );
    if (activeTab === "Lujo")
      return (
        art.category?.includes("Lujo") ||
        art.category?.includes("Haute Couture") ||
        art.title.toLowerCase().includes("chanel") ||
        art.title.toLowerCase().includes("dior") ||
        art.title.toLowerCase().includes("louis vuitton")
      );
    if (activeTab === "Cultura")
      return (
        art.category?.includes("Cultura") ||
        art.category?.includes("Investigación") ||
        art.category?.includes("Tendencias")
      );
    return true;
  });

  const featured = filteredArticles[0] || initialArticles[0];
  const restArticles = filteredArticles.slice(1);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    try {
      await fetch("https://formspree.io/f/mqaeavog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "newsletter_page" }),
      });
      setSubscribed(true);
    } catch {
      setSubscribed(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* NEWSLETTER SIGNUP BOX (EDITORIAL LUXURY BANNER) */}
      <GsapReveal className="bg-[#0a0a0a] text-white p-8 md:p-14 mb-16 border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <span className="text-[10.5px] tracking-[0.25em] text-[#b5a898] uppercase font-medium block mb-2">
            Edición Mensual Privada · Curaduría de Ash Mateu
          </span>
          <h2 className="font-serif text-2xl md:text-4xl font-normal leading-snug mb-4">
            Recibí los análisis de tendencias y coberturas de Fashion Week antes de que salgan a la calle
          </h2>
          <p className="text-xs md:text-sm text-white/70 font-light leading-relaxed mb-8">
            Análisis de pasarelas internacionales (París, Milán, Nueva York), notas exclusivas de Marie Claire Argentina, estrategias de branding y reflexiones de la industria de la moda.
          </p>

          {subscribed ? (
            <div className="bg-white/10 border border-[#b5a898]/40 p-4 text-xs tracking-wider text-[#b5a898]">
              ✓ Gracias por suscribirte. Recibirás la próxima edición en tu correo.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingresá tu correo electrónico..."
                required
                className="flex-grow bg-white/10 border border-white/20 text-white placeholder-white/40 px-5 py-3.5 text-xs tracking-wider focus:outline-none focus:border-[#b5a898]"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-[#b5a898] hover:bg-white text-black font-semibold text-xs tracking-[0.2em] uppercase px-8 py-3.5 transition-colors duration-300 cursor-pointer disabled:opacity-50"
              >
                {loading ? "Enviando..." : "Suscribirme"}
              </button>
            </form>
          )}
        </div>
      </GsapReveal>

      {/* FILTER TABS */}
      <div className="flex flex-wrap items-center gap-2 mb-10 text-xs tracking-[0.16em] uppercase">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-4 py-2 border transition-all duration-200 cursor-pointer ${
              activeTab === tab.value
                ? "bg-black text-white border-black"
                : "bg-white text-black/70 border-[#b5a898]/40 hover:border-black"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* FEATURED EDITORIAL NOTE (IF AVAILABLE) */}
      {featured && (
        <GsapReveal className="mb-14 bg-white border border-[#b5a898]/40 overflow-hidden shadow-sm hover:shadow-md transition-all group">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto w-full bg-neutral-200 min-h-[320px] overflow-hidden">
              {featured.cover_url ? (
                <Image
                  src={featured.cover_url}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-[center_18%] group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#0a0a0a] text-white p-8">
                  <span className="font-serif text-2xl text-[#b5a898] italic">
                    {featured.publication}
                  </span>
                </div>
              )}
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm text-white text-[9px] tracking-[0.2em] uppercase px-3 py-1 font-medium">
                {featured.publication}
              </div>
            </div>

            <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[10px] tracking-[0.2em] uppercase text-[#7a7065] mb-3">
                  <span>{featured.category || "Artículo Destacado"}</span>
                  <span>{featured.publication_date}</span>
                </div>
                <h2 className="font-serif text-2xl md:text-3xl text-black font-normal leading-snug mb-4 group-hover:text-[#b5a898] transition-colors">
                  {featured.title}
                </h2>
                {featured.excerpt && (
                  <p className="text-xs md:text-sm text-black/75 leading-relaxed font-light mb-6">
                    {featured.excerpt}
                  </p>
                )}
              </div>

              <div>
                <a
                  href={featured.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase font-semibold text-black border-b border-black/40 pb-1 group-hover:border-black"
                >
                  Leer en {featured.publication} ↗
                </a>
              </div>
            </div>
          </div>
        </GsapReveal>
      )}

      {/* ARTICLES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {restArticles.map((art, idx) => (
          <GsapReveal key={art.id || idx} delay={(idx % 6) * 0.05}>
            <article className="bg-white border border-[#b5a898]/30 overflow-hidden flex flex-col justify-between h-full group hover:border-black transition-all duration-300 shadow-sm hover:shadow-md">
              <div>
                <div className="relative aspect-[16/10] w-full bg-neutral-100 overflow-hidden">
                  {art.cover_url ? (
                    <Image
                      src={art.cover_url}
                      alt={art.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-[center_18%] group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#0a0a0a] text-white p-6">
                      <span className="font-serif text-lg text-[#b5a898] italic text-center">
                        {art.publication}
                      </span>
                    </div>
                  )}
                  <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-sm text-white text-[8.5px] tracking-[0.2em] uppercase px-2.5 py-1">
                    {art.publication}
                  </div>
                </div>

                <div className="p-6 md:p-7">
                  <div className="flex items-center justify-between text-[9.5px] tracking-[0.2em] uppercase text-[#7a7065] mb-2.5">
                    <span>{art.category || "Nota Editorial"}</span>
                    <span>{art.publication_date}</span>
                  </div>
                  <h3 className="font-serif text-lg md:text-xl text-black font-normal leading-snug mb-3 group-hover:text-[#b5a898] transition-colors line-clamp-2">
                    {art.title}
                  </h3>
                  {art.excerpt && (
                    <p className="text-xs text-black/70 leading-relaxed font-light line-clamp-3">
                      {art.excerpt}
                    </p>
                  )}
                </div>
              </div>

              <div className="p-6 md:p-7 pt-0">
                <a
                  href={art.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-[11px] tracking-[0.16em] uppercase font-semibold text-black border-b border-black/30 pb-0.5 group-hover:border-black"
                >
                  Leer nota completa ↗
                </a>
              </div>
            </article>
          </GsapReveal>
        ))}
      </div>
    </div>
  );
}
