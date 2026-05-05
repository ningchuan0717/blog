import PostCard from "@/components/PostCard";
import TagFilter from "@/components/TagFilter";
import { getAllPosts, getAllTags } from "@/lib/posts";

export default function BlogPage({ searchParams }: { searchParams: { tag?: string } }) {
  const allPosts = getAllPosts();
  const allTags = getAllTags();
  const filtered = searchParams.tag
    ? allPosts.filter((p) => p.tags.includes(searchParams.tag!))
    : allPosts;

  return (
    <div className="max-w-3xl mx-auto px-6 pt-24 pb-16">
      <h1 className="text-3xl font-bold mb-2">博客</h1>
      <p className="text-gray-500 mb-8">
        共 {allPosts.length} 篇文章
        {searchParams.tag && ` · 筛选: ${searchParams.tag}`}
      </p>

      <div className="mb-8">
        <TagFilter tags={allTags} current={searchParams.tag || null} />
      </div>

      <div className="space-y-4">
        {filtered.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-500 py-16">暂无文章</p>
      )}
    </div>
  );
}
