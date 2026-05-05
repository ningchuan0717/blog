"use client";

import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

function extractToc(html: string): TocItem[] {
  const headings: TocItem[] = [];
  const regex = /<h([2-3])\s[^>]*?id="([^"]*)"[^>]*>(.*?)<\/h[2-3]>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    headings.push({
      level: parseInt(match[1]),
      id: match[2],
      text: match[3].replace(/<[^>]*>/g, ""),
    });
  }
  return headings;
}

export default function TableOfContents({ content }: { content: string }) {
  const [activeId, setActiveId] = useState<string>("");
  const headings = extractToc(content);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="hidden lg:block sticky top-24 w-56 shrink-0 self-start">
      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
        目录
      </h4>
      <ul className="space-y-1.5 border-l border-white/10 pl-4">
        {headings.map(({ id, text, level }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`block text-sm transition-colors py-0.5 ${
                activeId === id
                  ? "text-primary-cyan"
                  : "text-gray-500 hover:text-gray-300"
              } ${level === 3 ? "pl-4" : ""}`}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
