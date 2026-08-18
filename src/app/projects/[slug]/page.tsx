import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/data/projects";
import ContactForm from "@/components/contact/ContactForm";
import ProjectGalleryInteractive from "@/components/portfolio/ProjectGalleryInteractive";

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
    alternates: {
      canonical: `https://ashmateu.com/projects/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} — Ash Mateu`,
      description: project.summary,
      url: `https://ashmateu.com/projects/${project.slug}`,
      images: [
        {
          url: project.coverImage,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const projectIdx = projects.findIndex((p) => p.slug === slug);

  if (projectIdx === -1) {
    notFound();
  }

  const project = projects[projectIdx];
  const prevProject = projectIdx > 0 ? projects[projectIdx - 1] : null;
  const nextProject =
    projectIdx < projects.length - 1 ? projects[projectIdx + 1] : null;

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: project.title,
    author: {
      "@type": "Person",
      name: "Ash Mateu",
      url: "https://ashmateu.com",
    },
    creator: {
      "@type": "Person",
      name: "Ash Mateu",
    },
    description: project.description,
    image: `https://ashmateu.com${project.coverImage}`,
    datePublished: `${project.year}-01-01`,
  };

  return (
    <div className="pt-28 md:pt-36 bg-[#f7f3ee]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />
      <article className="max-w-[1400px] mx-auto px-6 md:px-12 pb-20">
        {/* BREADCRUMB */}
        <div className="mb-8">
          <Link
            href="/galeria"
            className="text-xs font-mono tracking-[0.2em] uppercase text-[#7a7065] hover:text-black transition-colors"
          >
            ← Volver a Galería &amp; Portfolio
          </Link>
        </div>

        {/* HEADER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-end">
          <div className="lg:col-span-8">
            <span className="text-[11px] font-mono tracking-[0.28em] uppercase text-[#7a6a5a] font-medium block mb-3">
              {project.category} · {project.location} · {project.year}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl text-black font-normal leading-tight">
              {project.title}
            </h1>
          </div>
          <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-[#b5a898]/40 pt-6 lg:pt-0 lg:pl-8 space-y-3 text-xs">
            {Object.entries(project.credits).map(([key, val]) => (
              <div key={key}>
                <span className="text-[#7a7065] uppercase tracking-wider block text-[10px] font-mono">
                  {key}
                </span>
                <span className="text-black font-medium">{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* INTERACTIVE GALLERY WITH LIGHTBOX AND CROSS-NAVIGATION */}
        <ProjectGalleryInteractive
          project={project}
          prevProject={prevProject}
          nextProject={nextProject}
        />
      </article>

      <ContactForm />
    </div>
  );
}
