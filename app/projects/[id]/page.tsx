import { notFound } from "next/navigation";
import { getProjectById } from "@/lib/db";
import ProjectDetail from "@/components/ProjectDetail";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { DetailProject } from "@/components/ProjectDetail";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mahatab Properties Ltd | Building your future, today",
  description: "Premier real estate development company",
};

export const revalidate = 60;

function parseJsonArray(value: string): string[] {
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) return parsed.filter((x): x is string => typeof x === "string");
    return [];
  } catch {
    return value ? [value] : [];
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  const row = Number.isFinite(id) ? getProjectById(id) : undefined;
  if (!row) notFound();

  const project: DetailProject = {
    ...row,
    gallery: parseJsonArray(row.gallery),
    features: parseJsonArray(row.features),
  };

  return (
    <div className="relative min-h-screen bg-[#e9dcc6] text-slate-900 overflow-x-hidden select-none">
      <Navbar isSection2={false} autoScrolled />
      <ProjectDetail project={project} />
      <Footer />
    </div>
  );
}