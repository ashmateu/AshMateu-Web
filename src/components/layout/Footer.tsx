import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white/70 py-16 border-t border-white/10 text-xs">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="font-serif text-xl text-white font-normal uppercase tracking-wider">
            Ash Mateu
          </span>
          <span className="text-[10px] tracking-[0.25em] text-[#b5a898] uppercase">
            Creative Direction &amp; Styling · Est. 2011
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-[10.5px] tracking-[0.2em] uppercase font-medium">
          <Link href="/historia" className="hover:text-white transition-colors">
            Mi Historia
          </Link>
          <Link href="/como-trabajo" className="hover:text-white transition-colors">
            ¿Cómo Trabajo?
          </Link>
          <Link href="/galeria" className="hover:text-white transition-colors">
            Galería
          </Link>
          <Link href="/blog" className="hover:text-white transition-colors">
            Trends
          </Link>
          <Link href="/newsletter" className="hover:text-white transition-colors">
            Newsletter
          </Link>
          <Link href="/prensa" className="hover:text-white transition-colors">
            Prensa
          </Link>
          <Link href="/#contacto" className="hover:text-white transition-colors">
            Contacto
          </Link>
        </div>

        <p className="text-[10px] text-white/40 tracking-wider">
          © {new Date().getFullYear()} Ash Mateu. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
