import { projects as staticProjects } from "./content-data";

export interface ProjectMeta {
  slug: string;
  title: string;
  description: string;
  techStack: string[];
  url?: string;
  repo?: string;
  order: number;
}

export interface Project extends ProjectMeta {
  content: string;
}

export function getAllProjects(): ProjectMeta[] {
  return [...staticProjects].sort((a, b) => a.order - b.order);
}

export function getProjectBySlug(slug: string): Project | null {
  const project = staticProjects.find((p) => p.slug === slug);
  if (!project) return null;
  return project as Project;
}
