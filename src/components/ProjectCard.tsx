import Link from "next/link";
import type { ProjectMeta } from "@/lib/projects";

export default function ProjectCard({ project }: { project: ProjectMeta }) {
  return (
    <Link href={`/projects/${project.slug}`} className="card block p-6 group">
      <h3 className="text-lg font-semibold text-gray-100 mb-2 group-hover:text-primary-cyan transition-colors">
        {project.title}
      </h3>
      <p className="text-sm text-gray-400">{project.description}</p>
      <div className="flex flex-wrap gap-1.5 mt-3">
        {project.techStack.map((tech) => (
          <span key={tech} className="text-xs px-2 py-0.5 rounded-full bg-primary-purple/10 text-primary-purple/80">
            {tech}
          </span>
        ))}
      </div>
    </Link>
  );
}
