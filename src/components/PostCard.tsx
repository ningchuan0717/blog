import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import CommentBadge from "./CommentBadge";

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} className="card block p-6 group relative">
      <CommentBadge slug={post.slug} />
      <time className="text-xs text-gray-500">{post.date}</time>
      <h3 className="text-lg font-semibold text-gray-100 mt-1 mb-2 group-hover:text-primary-cyan transition-colors">
        {post.title}
      </h3>
      <p className="text-sm text-gray-400 line-clamp-2">{post.summary}</p>
      <div className="flex flex-wrap gap-1.5 mt-3">
        {post.tags.map((tag) => (
          <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-primary-cyan/10 text-primary-cyan/80">
            #{tag}
          </span>
        ))}
      </div>
      <span className="text-xs text-gray-600 mt-2 block">{post.readingTime}</span>
    </Link>
  );
}
