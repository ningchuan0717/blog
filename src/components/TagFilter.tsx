"use client";

import { useRouter } from "next/navigation";

export default function TagFilter({ tags, current }: { tags: string[]; current: string | null }) {
  const router = useRouter();

  const selectTag = (tag: string | null) => {
    const params = new URLSearchParams();
    if (tag) params.set("tag", tag);
    router.push(`/blog${tag ? `?tag=${encodeURIComponent(tag)}` : ""}`);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => selectTag(null)}
        className={`text-xs px-3 py-1.5 rounded-full transition-all ${
          !current
            ? "bg-primary-cyan/20 text-primary-cyan"
            : "bg-white/5 text-gray-400 hover:text-gray-200 hover:bg-white/10"
        }`}
      >
        全部
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => selectTag(tag)}
          className={`text-xs px-3 py-1.5 rounded-full transition-all ${
            current === tag
              ? "bg-primary-cyan/20 text-primary-cyan"
              : "bg-white/5 text-gray-400 hover:text-gray-200 hover:bg-white/10"
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
