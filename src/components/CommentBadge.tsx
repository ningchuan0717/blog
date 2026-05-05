"use client";

import { useEffect, useState } from "react";

export default function CommentBadge({ slug }: { slug: string }) {
  const [hasNew, setHasNew] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(`comment_new_${slug}`);
    if (stored === "true") {
      setHasNew(true);
    }
  }, [slug]);

  if (!hasNew) return null;

  return (
    <span
      className="absolute top-4 right-4 w-2.5 h-2.5 rounded-full bg-green-400"
      style={{
        boxShadow: "0 0 8px rgba(74, 222, 128, 0.6)",
      }}
      title="有新评论"
    />
  );
}
