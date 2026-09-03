import React from "react";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getSiteImagesConfig } from "@/lib/site-images";
import { getMercaditoProducts } from "@/lib/mercadito-data";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import AdminDashboardClient from "@/components/admin/AdminDashboardClient";

export const metadata = {
  title: "Admin — Ash Mateu",
  description: "Panel de control editorial y administración de El Mercadito.",
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const isAuth = await isAdminAuthenticated();

  if (!isAuth) {
    return (
      <main className="min-h-[100dvh] bg-[#F7F3EE] text-[#0A0A0A] pt-24 pb-24">
        <AdminLoginForm />
      </main>
    );
  }

  const images = getSiteImagesConfig();
  const products = await getMercaditoProducts();

  return (
    <main className="min-h-[100dvh] bg-[#F7F3EE] text-[#0A0A0A] pt-32 md:pt-36 pb-32 px-6 md:px-12">
      <AdminDashboardClient images={images} products={products} />
    </main>
  );
}
