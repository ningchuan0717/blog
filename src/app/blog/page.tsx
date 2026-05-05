import { getAllPosts, getAllTags } from "@/lib/posts";
import BlogList from "@/components/BlogList";

export default function BlogPage() {
  const allPosts = getAllPosts();
  const allTags = getAllTags();

  return (
    <div className="max-w-3xl mx-auto px-6 pt-24 pb-16">
      <h1 className="text-3xl font-bold mb-2">博客</h1>
      <p className="text-gray-500 mb-8">共 {allPosts.length} 篇文章</p>
      <BlogList posts={allPosts} tags={allTags} />
    </div>
  );
}
