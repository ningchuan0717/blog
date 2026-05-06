"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MDXRenderer({ source }: { source: string }) {
  return (
    <article className="prose prose-invert max-w-none
      prose-headings:scroll-mt-20
      prose-a:text-primary-cyan prose-a:no-underline hover:prose-a:underline
      prose-pre:border prose-pre:border-gray-800
      prose-code:text-primary-cyan/90 prose-code:text-sm
      prose-img:rounded-lg
    ">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {source}
      </ReactMarkdown>
    </article>
  );
}
