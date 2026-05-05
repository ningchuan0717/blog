import ProjectCard from "@/components/ProjectCard";
import { getAllProjects } from "@/lib/projects";

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="max-w-5xl mx-auto px-6 pt-24 pb-16">
      <h1 className="text-3xl font-bold mb-2">项目</h1>
      <p className="text-gray-500 mb-8">共 {projects.length} 个项目</p>

      <div className="grid md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {projects.length === 0 && (
        <p className="text-center text-gray-500 py-16">暂无项目</p>
      )}
    </div>
  );
}
