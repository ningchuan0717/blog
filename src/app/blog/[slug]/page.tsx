import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getAdjacentPosts, getAllPosts } from "@/lib/posts";
import MDXRenderer from "@/components/MDXRenderer";
import TableOfContents from "@/components/TableOfContents";
import GiscusComments from "@/components/GiscusComments";
import type { Metadata } from "next";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "文章未找到" };
  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const { prev, next } = getAdjacentPosts(params.slug);

  return (
    <div className="max-w-5xl mx-auto px-6 pt-24 pb-16">
      {/* Post header */}
      <header className="max-w-3xl mx-auto text-center mb-12">
        <div className="flex items-center justify-center gap-3 text-sm text-gray-500 mb-4">
          <time>{post.date}</time>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex justify-center gap-2">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog?tag=${encodeURIComponent(tag)}`}
              className="text-xs px-3 py-1 rounded-full bg-primary-cyan/10 text-primary-cyan/80 hover:bg-primary-cyan/20 transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </header>

      {/* Content + ToC */}
      <div className="flex gap-8 justify-center">
        <div className="max-w-3xl w-full min-w-0">
          <MDXRenderer source={post.content} />
        </div>
        <TableOfContents content={post.content} />
      </div>

      {/* Prev / Next */}
      <nav className="max-w-3xl mx-auto mt-16 grid grid-cols-2 gap-4">
        {prev ? (
          <Link
            href={`/blog/${prev.slug}`}
            className="card p-4 group text-left"
          >
            <span className="text-xs text-gray-500">← 上一篇</span>
            <p className="text-sm text-gray-300 group-hover:text-primary-cyan transition-colors mt-1">
              {prev.title}
            </p>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={`/blog/${next.slug}`}
            className="card p-4 group text-right"
          >
            <span className="text-xs text-gray-500">下一篇 →</span>
            <p className="text-sm text-gray-300 group-hover:text-primary-cyan transition-colors mt-1">
              {next.title}
            </p>
          </Link>
        ) : (
          <div />
        )}
      </nav>

      {/* Comments */}
      <div className="max-w-3xl mx-auto">
        <GiscusComments />
      </div>
    </div>
  );
}
