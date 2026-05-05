"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

export default function GiscusComments() {
  const ref = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "ningchuan0717/blog");
    script.setAttribute("data-repo-id", "R_kgDOSVCjmQ");
    script.setAttribute("data-category", "General");
    script.setAttribute("data-category-id", "DIC_kwDOSVCjmc4C8Y5a");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", theme === "dark" ? "dark" : "light");
    script.setAttribute("data-lang", "zh-CN");
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;

    container.innerHTML = "";
    container.appendChild(script);
  }, [theme]);

  return (
    <section className="mt-16 pt-8 border-t border-white/10">
      <h3 className="text-lg font-semibold mb-6">评论</h3>
      <div ref={ref} />
      <p className="text-xs text-gray-600 mt-4">
        评论由 Giscus 驱动，需要 GitHub 账号登录。
      </p>
    </section>
  );
}
