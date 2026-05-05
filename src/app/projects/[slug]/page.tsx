import { notFound } from "next/navigation";
import Link from "next/link";
import { getProjectBySlug, getAllProjects } from "@/lib/projects";
import MDXRenderer from "@/components/MDXRenderer";
import type { Metadata } from "next";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);
  if (!project) return { title: "项目未找到" };
  return {
    title: project.title,
    description: project.description,
  };
}

export default function ProjectDetailPage({ params }: Props) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  return (
    <div className="max-w-3xl mx-auto px-6 pt-24 pb-16">
      <Link href="/projects" className="text-sm text-gray-500 hover:text-primary-cyan transition-colors mb-6 inline-block">
        ← 返回项目列表
      </Link>

      <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
      <p className="text-gray-400 mb-6">{project.description}</p>

      <div className="flex flex-wrap gap-2 mb-8">
        {project.techStack.map((tech) => (
          <span key={tech} className="text-xs px-3 py-1 rounded-full bg-primary-purple/10 text-primary-purple/80">
            {tech}
          </span>
        ))}
      </div>

      <div className="flex gap-4 mb-8">
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-4 py-2 rounded-lg bg-primary-cyan/10 text-primary-cyan hover:bg-primary-cyan/20 transition-colors"
          >
            访问项目 →
          </a>
        )}
        {project.repo && (
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-4 py-2 rounded-lg border border-white/10 text-gray-300 hover:border-primary-cyan/30 transition-colors"
          >
            源代码
          </a>
        )}
      </div>

      <MDXRenderer source={project.content} />
    </div>
  );
}
