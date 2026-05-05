import { compileMdx } from "@/lib/mdx";

export default async function MDXRenderer({ source }: { source: string }) {
  const { content } = await compileMdx(source);
  return (
    <article className="prose prose-invert max-w-none
      prose-headings:scroll-mt-20
      prose-a:text-primary-cyan prose-a:no-underline hover:prose-a:underline
      prose-pre:border prose-pre:border-gray-800
      prose-code:text-primary-cyan/90 prose-code:text-sm
      prose-img:rounded-lg
    ">
      {content}
    </article>
  );
}
