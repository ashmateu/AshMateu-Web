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
  openGraph: {
    title: "Ash Mateu — Creative Direction & Fashion Styling",
    description: "Styling people, brands and ideas.",
    url: "https://ashmateu.com",
    siteName: "Ash Mateu",
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${bodoni.variable} ${montserrat.variable}`}>
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
