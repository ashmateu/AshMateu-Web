import type { Metadata } from "next";
import { Suspense } from "react";
import { Bodoni_Moda, Montserrat } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ConciergeDrawer from "@/components/concierge/ConciergeDrawer";
import UniversalImageCalibrator from "@/components/common/UniversalImageCalibrator";
import "./globals.css";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["200", "300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Ash Mateu — Creative Direction & Fashion Styling",
  description:
    "Styling people, brands and ideas. Especialista en posicionar imagen de marcas y personas. Chanel, Louis Vuitton, Miu Miu, Dolce & Gabbana, Gucci. Buenos Aires, Nueva York, París.",
  keywords: [
    "Ash Mateu",
    "Fashion Styling",
    "Creative Direction",
    "Fashion Consultant",
    "Dirección Creativa",
    "Stylist Buenos Aires",
    "Stylist Nueva York",
    "Marie Claire Argentina",
  ],
  authors: [{ name: "Ash Mateu" }],
  metadataBase: new URL("https://ashmateu.com"),
  alternates: {
    canonical: "https://ashmateu.com",
  },
  openGraph: {
    title: "Ash Mateu — Creative Direction & Fashion Styling",
    description: "Styling people, brands and ideas. Especialista en posicionar imagen de marcas y personas.",
    url: "https://ashmateu.com",
    siteName: "Ash Mateu",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "/images/highlights/ash_20_years_portrait.jpg",
        width: 1200,
        height: 630,
        alt: "Ash Mateu — Creative Direction & Fashion Styling",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ash Mateu — Creative Direction & Fashion Styling",
    description: "Styling people, brands and ideas. Chanel, Louis Vuitton, Miu Miu, Dolce & Gabbana.",
    images: ["/images/highlights/ash_20_years_portrait.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ash Mateu",
  alternateName: "Ash Mateu Prieto",
  jobTitle: "Creative Director & Fashion Stylist",
  description: "Directora Creativa de Moda y Consultora de Imagen especializada en alta costura, producciones editoriales y campañas internacionales.",
  url: "https://ashmateu.com",
  image: "https://ashmateu.com/images/highlights/ash_20_years_portrait.jpg",
  worksFor: {
    "@type": "Organization",
    name: "Marie Claire Argentina",
  },
  sameAs: [
    "https://instagram.com/ashmateu",
    "https://linkedin.com/in/ashmateu",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${bodoni.variable} ${montserrat.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#f7f3ee] text-[#0a0a0a] antialiased min-h-screen flex flex-col justify-between selection:bg-[#b5a898] selection:text-black">
        <NuqsAdapter>
          <Suspense fallback={null}>
            <Navbar />
          </Suspense>
          <main className="flex-grow">{children}</main>
          <ConciergeDrawer />
          <UniversalImageCalibrator />
          <Footer />
        </NuqsAdapter>
      </body>
    </html>
  );
}
