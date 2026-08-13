import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white/70 py-16 md:py-20 border-t border-white/15 text-xs relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* BRAND IDENTITY & OFFICIAL LOGO (30% BIGGER) */}
        <div className="flex flex-col items-center md:items-start gap-2.5 text-center md:text-left">
          <Image
            src="/images/logo/ash_mateu_logo_white.webp"
            alt="Ash Mateu Prieto — Styling & Creative Direction"
            width={280}
            height={97}
            className="h-13 md:h-16 lg:h-[70px] w-auto object-contain"
          />
          <span className="text-[9.5px] tracking-[0.26em] text-white/50 uppercase font-light">
            Buenos Aires · Nueva York · París · Est. 2011
          </span>
        </div>

        {/* NAVIGATION LINKS */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-[10.5px] tracking-[0.22em] uppercase font-medium">
          <Link href="/historia" className="hover:text-white transition-colors py-1">
            Mi Historia
          </Link>
          <Link href="/como-trabajo" className="hover:text-white transition-colors py-1">
            ¿Cómo Trabajo?
          </Link>
          <Link href="/galeria" className="hover:text-white transition-colors py-1">
            Galería
          </Link>
          <Link href="/blog" className="hover:text-white transition-colors py-1">
            Trends
          </Link>
          <Link href="/newsletter" className="hover:text-white transition-colors py-1">
            Newsletter
          </Link>
          <Link href="/prensa" className="hover:text-white transition-colors py-1">
            Prensa
          </Link>
          <Link href="/#contacto" className="hover:text-white transition-colors py-1">
            Contacto
          </Link>
        </div>

        {/* WHATSAPP PILL & COPYRIGHT */}
        <div className="flex flex-col items-center md:items-end gap-3 text-center md:text-right">
          <a
            href="https://wa.me/5491123823297"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[#b5a898] hover:text-white text-[10.5px] tracking-[0.18em] uppercase font-medium transition-colors"
          >
            <span>WhatsApp +54 9 11 2382-3297</span>
            <ArrowUpRight size={13} />
          </a>
          <p className="text-[10px] text-white/40 tracking-wider">
            © {new Date().getFullYear()} Ash Mateu Prieto. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
