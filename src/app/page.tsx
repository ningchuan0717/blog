import Hero from "@/components/Hero";
import PostCard from "@/components/PostCard";
import ProjectCard from "@/components/ProjectCard";
import { getAllPosts } from "@/lib/posts";
import { getAllProjects } from "@/lib/projects";
import Link from "next/link";

export default function Home() {
  const posts = getAllPosts().slice(0, 4);
  const projects = getAllProjects().slice(0, 2);

  return (
    <>
      <Hero />

      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-2xl font-bold">最新文章</h2>
          <Link href="/blog" className="text-sm text-primary-cyan hover:underline">
            查看全部 →
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-2xl font-bold">精选项目</h2>
          <Link href="/projects" className="text-sm text-primary-cyan hover:underline">
            查看全部 →
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </>
  );
}
