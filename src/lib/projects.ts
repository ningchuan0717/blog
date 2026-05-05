import fs from "fs";
import path from "path";
import matter from "gray-matter";

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

const projectsDir = path.join(process.cwd(), "content/projects");

export function getAllProjects(): ProjectMeta[] {
  if (!fs.existsSync(projectsDir)) return [];

  const files = fs.readdirSync(projectsDir).filter((f) => f.endsWith(".mdx"));

  const projects = files.map((file) => {
    const raw = fs.readFileSync(path.join(projectsDir, file), "utf-8");
    const { data } = matter(raw);

    return {
      slug: file.replace(/\.mdx$/, ""),
      title: data.title || "Untitled",
      description: data.description || "",
      techStack: data.techStack || [],
      url: data.url || undefined,
      repo: data.repo || undefined,
      order: data.order || 0,
    } as ProjectMeta;
  });

  return projects.sort((a, b) => a.order - b.order);
}

export function getProjectBySlug(slug: string): Project | null {
  const filePath = path.join(projectsDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title || "Untitled",
    description: data.description || "",
    techStack: data.techStack || [],
    url: data.url || undefined,
    repo: data.repo || undefined,
    order: data.order || 0,
    content,
  };
}
