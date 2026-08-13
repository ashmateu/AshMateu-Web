import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/data/projects";
import ContactForm from "@/components/contact/ContactForm";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Proyecto no encontrado" };

  return {
    title: `${project.title} — Ash Mateu`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="pt-28 md:pt-36 bg-[#f7f3ee]">
      <article className="max-w-[1400px] mx-auto px-6 md:px-12 pb-20">
        {/* BREADCRUMB */}
        <div className="mb-8">
          <Link
            href="/galeria"
            className="text-xs tracking-[0.2em] uppercase text-[#7a7065] hover:text-black transition-colors"
          >
            ← Volver a Galería &amp; Portfolio
          </Link>
        </div>

        {/* HEADER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-end">
          <div className="lg:col-span-8">
            <span className="text-[11px] tracking-[0.28em] uppercase text-[#b5a898] font-medium block mb-3">
              {project.category} · {project.location} · {project.year}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl text-black font-normal leading-tight">
              {project.title}
            </h1>
          </div>
          <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-[#b5a898]/40 pt-6 lg:pt-0 lg:pl-8 space-y-3 text-xs">
            {Object.entries(project.credits).map(([key, val]) => (
              <div key={key}>
                <span className="text-[#7a7065] uppercase tracking-wider block text-[10px]">
                  {key}
                </span>
                <span className="text-black font-medium">{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* MAIN COVER IMAGE */}
        <div className="relative aspect-[16/10] w-full bg-neutral-200 overflow-hidden mb-16 shadow-xl border border-[#b5a898]/30">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* DESCRIPTION */}
        <div className="max-w-3xl mx-auto my-16 text-center">
          <p className="text-base md:text-xl text-black/80 font-light leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* GALLERY IMAGES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
          {project.images.map((img, i) => (
            <div
              key={i}
              className="relative aspect-[3/4] bg-neutral-100 overflow-hidden border border-[#b5a898]/30 shadow-md"
            >
              <Image
                src={img}
                alt={`${project.title} - ${i + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          ))}
        </div>
      </article>

      <ContactForm />
    </div>
  );
}
