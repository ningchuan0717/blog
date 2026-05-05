"use client";

import { useState } from "react";
import type { PostMeta } from "@/lib/posts";
import PostCard from "./PostCard";

export default function BlogList({ posts, tags }: { posts: PostMeta[]; tags: string[] }) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? posts.filter((p) => p.tags.includes(activeTag))
    : posts;

  return (
    <>
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTag(null)}
            className={`text-xs px-3 py-1.5 rounded-full transition-all ${
              !activeTag
                ? "bg-primary-cyan/20 text-primary-cyan"
                : "bg-white/5 text-gray-400 hover:text-gray-200 hover:bg-white/10"
            }`}
          >
            全部
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`text-xs px-3 py-1.5 rounded-full transition-all ${
                activeTag === tag
                  ? "bg-primary-cyan/20 text-primary-cyan"
                  : "bg-white/5 text-gray-400 hover:text-gray-200 hover:bg-white/10"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {activeTag && (
        <p className="text-sm text-gray-500 mb-4">
          筛选: {activeTag}（{filtered.length} 篇）
        </p>
      )}

      <div className="space-y-4">
        {filtered.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-500 py-16">暂无文章</p>
      )}
    </>
  );
}
