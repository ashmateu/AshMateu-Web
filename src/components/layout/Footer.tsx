import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white/70 py-16 md:py-20 border-t border-white/15 text-xs relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10">
        {/* BRAND IDENTITY (OVAL LUXURY CREST) */}
        <Link
          href="/"
          className="flex flex-col items-center md:items-start group transition-opacity hover:opacity-90 shrink-0"
        >
          <div className="relative w-28 sm:w-32 md:w-36 h-36 sm:h-40 md:h-44">
            <Image
              src="/images/brand/ash_mateu_crest_white.png"
              alt="Ash Mateu Prieto — Creative Director & Fashion Stylist"
              fill
              className="object-contain object-center md:object-left"
              priority
            />
          </div>
        </Link>

        {/* NAVIGATION LINKS */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[10.5px] tracking-[0.22em] uppercase font-medium">
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

        {/* DIRECT CONTACT & COPYRIGHT */}
        <div className="flex flex-col items-center md:items-end gap-3 text-center md:text-right shrink-0">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 flex-nowrap">
            <a
              href="mailto:info@ashmateu.com"
              className="inline-flex items-center gap-1.5 text-[#b5a898] hover:text-white text-[10.5px] tracking-[0.18em] uppercase font-medium transition-colors whitespace-nowrap shrink-0"
            >
              <Mail size={13} className="text-[#b5a898] shrink-0" />
              <span className="whitespace-nowrap">info@ashmateu.com</span>
            </a>

            <span className="hidden sm:inline text-white/20 select-none">|</span>

            <a
              href="https://wa.me/5491123823297"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#25D366] hover:text-white text-[10.5px] tracking-[0.18em] uppercase font-semibold transition-colors whitespace-nowrap shrink-0"
            >
              <svg className="w-3.5 h-3.5 fill-[#25D366] shrink-0" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span className="whitespace-nowrap font-mono">+54 9 11 2382-3297</span>
              <ArrowUpRight size={13} className="shrink-0" />
            </a>
          </div>

          <p className="text-[10px] text-white/40 tracking-wider whitespace-nowrap">
            © {new Date().getFullYear()} Ash Mateu Prieto. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
