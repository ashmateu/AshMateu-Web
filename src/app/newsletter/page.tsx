import React from "react";
import { getPressArticles } from "@/lib/data/press";
import NewsletterClient from "@/components/newsletter/NewsletterClient";
import ContactForm from "@/components/contact/ContactForm";

export const metadata = {
  title: "Newsletter & Artículos Marie Claire — Ash Mateu",
  description:
    "Archivo completo de columnas de opinión, notas de investigación y coberturas internacionales de Fashion Week escritas por Ash Mateu para la revista Marie Claire Argentina.",
};

export default async function NewsletterPage() {
  const articles = await getPressArticles();

  return (
    <div className="pt-28 md:pt-36 bg-[#f7f3ee]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-20">
        {/* PAGE HEADER */}
        <div className="max-w-3xl mb-12">
          <p className="text-[11px] tracking-[0.28em] uppercase text-[#7a7065] font-medium mb-3">
            Editorial &amp; Publicaciones en Medios
          </p>
          <h1 className="font-serif text-4xl md:text-6xl text-black font-normal mb-6">
            Newsletter &amp; Artículos Marie Claire
          </h1>
          <p className="text-base md:text-lg text-black/75 font-light leading-relaxed">
            Todas las notas, investigaciones de macrotendencias y coberturas internacionales que Ash Mateu escribe y publica en la revista <strong>Marie Claire Argentina</strong> y en su diario editorial.
          </p>
        </div>

        {/* CLIENT COMPONENT WITH REAL SUPABASE MARIE CLAIRE ARTICLES */}
        <NewsletterClient initialArticles={articles} />
      </div>

      <ContactForm />
    </div>
  );
}
