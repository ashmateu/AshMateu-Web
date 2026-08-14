import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";

export const metadata = {
  title: "Trends & Blog — Ash Mateu",
  description:
    "Análisis de macrotendencias de moda, notas Marie Claire y reflexiones sobre la industria de Ash Mateu.",
};

const articles = [
  {
    slug: "tendencias-marketing-moda-2026",
    title: "El fin del algoritmo: Por qué las marcas de lujo vuelven a la intuición",
    category: "Análisis & Macrotendencias",
    date: "Febrero 2026",
    image: "/images/extracted/chanel-hc/img-005.webp",
    href: "/prensa",
    cta: "Leer en Prensa & Columnas",
    excerpt:
      "Una reflexión profunda sobre el agotamiento del marketing cuantitativo y el renacimiento de la curaduría cultural con propósito.",
  },
  {
    slug: "paris-fashion-week-cronica",
    title: "Crónicas desde París: Las siluetas que definirán la próxima década",
    category: "Fashion Week · Cobertura",
    date: "Enero 2026",
    image: "/images/extracted/valentina-miumiu/img-000.webp",
    href: "/prensa",
    cta: "Ver Cobertura en Prensa",
    excerpt:
      "Cobertura exclusiva desde el front row parisino: sastrería deconstruida, textiles sostenibles y la nueva elegancia.",
  },
  {
    slug: "guia-styling-novias",
    title: "Que nunca nadie olvide tu vestido: La guía definitiva de estilismo nupcial",
    category: "Dress to Kill · Novias",
    date: "Diciembre 2025",
    image: "/images/hero_studio/MARIECLAIRE_2608064304_web.webp",
    href: "/como-trabajo#personas",
    cta: "Conocer Servicio de Novias",
    excerpt:
      "Cómo elegir tu vestido de novia sin perder tu personalidad en el intento y creando un look atemporal.",
  },
];

export default function BlogPage() {
  return (
    <div className="pt-28 md:pt-36 bg-[#f7f3ee]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="text-[11px] tracking-[0.28em] uppercase text-[#7a7065] font-medium mb-3">
              Editorial &amp; Research
            </p>
            <h1 className="font-serif text-4xl md:text-6xl text-black font-normal">
              Trends &amp; Capítulos del Blog
            </h1>
          </div>
          <Link
            href="/newsletter"
            className="group inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-black hover:text-[#b5a898] border-b border-black/40 hover:border-[#b5a898] pb-1 transition-colors w-fit font-medium"
          >
            <span>Recibir Artículos por Email</span>
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art) => (
            <article
              key={art.slug}
              className="bg-white border border-[#b5a898]/30 overflow-hidden flex flex-col justify-between hover:border-black transition-all duration-300 group shadow-sm hover:shadow-md"
            >
              <div>
                <Link href={art.href} className="block relative aspect-[16/10] w-full bg-neutral-100 overflow-hidden">
                  <Image
                    src={art.image}
                    alt={art.title}
                    fill
                    className="object-cover object-[center_top] group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </Link>
                <div className="p-7 md:p-8">
                  <div className="flex items-center justify-between text-[10px] tracking-[0.2em] uppercase text-[#7a7065] mb-3">
                    <span>{art.category}</span>
                    <span>{art.date}</span>
                  </div>
                  <h2 className="font-serif text-xl md:text-2xl text-black font-normal leading-snug mb-4 group-hover:text-[#b5a898] transition-colors">
                    <Link href={art.href}>{art.title}</Link>
                  </h2>
                  <p className="text-xs md:text-sm text-black/70 leading-relaxed font-light">
                    {art.excerpt}
                  </p>
                </div>
              </div>
              <div className="p-7 md:p-8 pt-0">
                <Link
                  href={art.href}
                  className="inline-flex items-center gap-1.5 text-xs tracking-[0.16em] uppercase font-semibold text-black border-b border-black/30 pb-0.5 group-hover:border-black hover:text-[#7a6a5a] transition-colors"
                >
                  <span>{art.cta}</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>

      <ContactForm />
    </div>
  );
}
