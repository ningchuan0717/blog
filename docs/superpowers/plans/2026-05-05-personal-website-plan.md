# 柠川个人网站实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 为柠川构建一个现代科技风个人博客+作品集网站，Next.js + Tailwind CSS + MDX，支持深色主题和内容编辑。

**Architecture:** Next.js App Router 作为前端框架，MDX 文件存储内容，TinaCMS 提供可视化编辑（需 GitHub 账号后方可启用），Giscus 提供评论功能。网站为纯静态生成（SSG），部署于 Vercel。暂时无 GitHub 账号时，所有内容以本地 MDX 文件形式驱动，TinaCMS 和 Giscus 配置预留，等账号注册后接入。

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS 3, MDX (next-mdx-remote), TinaCMS (预留)，Giscus (预留)

---

## 文件结构总览

```
blog/
├── content/
│   ├── blog/
│   │   ├── hello-world.mdx
│   │   └── second-post.mdx
│   ├── projects/
│   │   └── sample-project.mdx
│   └── about.json
├── public/
│   └── images/
│       └── avatar-placeholder.png
├── src/
│   ├── app/
│   │   ├── layout.tsx          # 根布局 (Navbar + Footer + ThemeProvider)
│   │   ├── page.tsx            # 首页
│   │   ├── blog/
│   │   │   ├── page.tsx        # 博客列表
│   │   │   └── [slug]/
│   │   │       └── page.tsx    # 文章详情
│   │   ├── projects/
│   │   │   ├── page.tsx        # 项目列表
│   │   │   └── [slug]/
│   │   │       └── page.tsx    # 项目详情
│   │   └── about/
│   │       └── page.tsx        # 关于我
│   ├── components/
│   │   ├── Navbar.tsx          # 导航栏 (滚动毛玻璃效果)
│   │   ├── Footer.tsx          # 页脚
│   │   ├── ThemeToggle.tsx      # 深色/浅色切换
│   │   ├── ThemeProvider.tsx    # 主题 Context
│   │   ├── Hero.tsx            # 首页 Hero 区
│   │   ├── PostCard.tsx        # 文章卡片
│   │   ├── ProjectCard.tsx     # 项目卡片
│   │   ├── TableOfContents.tsx # 文章目录导航
│   │   ├── MDXRenderer.tsx     # MDX 渲染器
│   │   ├── TagFilter.tsx       # 标签筛选器
│   │   └── CommentBadge.tsx    # 新评论提示徽标
│   ├── lib/
│   │   ├── posts.ts            # 文章数据读取与解析
│   │   ├── projects.ts         # 项目数据读取与解析
│   │   ├── mdx.ts              # MDX 编译工具
│   │   └── comments.ts         # 评论通知逻辑
│   └── styles/
│       └── globals.css         # 全局样式 + Tailwind 指令
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

### Task 1: 项目脚手架

**Files:**
- Create: `package.json`, `next.config.mjs`, `tailwind.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `src/styles/globals.css`, `src/app/layout.tsx`, `src/app/page.tsx` (占位), `.gitignore`

- [ ] **Step 1: 创建 Next.js 项目**

Run:
```bash
cd "d:\Claude作品\blog"
npx create-next-app@14 . --typescript --tailwind --eslint --app --src-dir --no-import-alias --use-npm
```
Expected: 脚手架生成成功，`npm run dev` 可以启动。

- [ ] **Step 2: 安装额外依赖**

```bash
npm install next-mdx-remote gray-matter reading-time react-icons
npm install -D @tailwindcss/typography
```

- [ ] **Step 3: 验证开发服务器**

```bash
npm run dev
```
访问 `http://localhost:3000` 确认 Next.js 默认页面正常显示。然后停止服务器。

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js project with TypeScript and Tailwind"
```

---

### Task 2: 主题系统与全局样式

**Files:**
- Create: `src/components/ThemeProvider.tsx`, `src/components/ThemeToggle.tsx`
- Modify: `tailwind.config.ts`, `src/styles/globals.css`, `src/app/layout.tsx`

- [ ] **Step 1: 配置 Tailwind 主题颜色**

修改 `tailwind.config.ts`:
```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          cyan: "#00d4ff",
          purple: "#7b2fff",
        },
        bg: {
          dark: "#0a0e27",
          darker: "#060918",
          card: "rgba(255,255,255,0.03)",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      animation: {
        "glow-pulse": "glow-pulse 2s ease-in-out infinite alternate",
      },
      keyframes: {
        "glow-pulse": {
          "0%": { boxShadow: "0 0 4px rgba(0, 212, 255, 0.3)" },
          "100%": { boxShadow: "0 0 12px rgba(0, 212, 255, 0.6)" },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};

export default config;
```

- [ ] **Step 2: 编写全局样式**

修改 `src/styles/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-bg-dark text-gray-200 antialiased;
  }
  body.light {
    @apply bg-gray-50 text-gray-900;
  }
}

@layer components {
  .gradient-text {
    @apply bg-gradient-to-r from-primary-cyan to-primary-purple bg-clip-text text-transparent;
  }
  .gradient-border {
    border: 1px solid;
    border-image-source: linear-gradient(135deg, #00d4ff, #7b2fff);
    border-image-slice: 1;
  }
  .card {
    @apply bg-bg-card border border-white/5 rounded-xl backdrop-blur-sm
           hover:border-primary-cyan/30 transition-all duration-300;
  }
  .card:hover {
    box-shadow: 0 0 20px rgba(0, 212, 255, 0.08);
  }
}

/* 代码块深色主题 */
pre {
  @apply bg-gray-950 border border-gray-800 rounded-lg;
}
code {
  @apply text-sm;
}

/* 滚动条美化 */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  @apply bg-bg-darker;
}
::-webkit-scrollbar-thumb {
  @apply bg-primary-cyan/20 rounded-full;
}
::-webkit-scrollbar-thumb:hover {
  @apply bg-primary-cyan/40;
}
```

- [ ] **Step 3: 创建 ThemeProvider**

创建 `src/components/ThemeProvider.tsx`:
```typescript
"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

const ThemeContext = createContext<{
  theme: Theme;
  toggle: () => void;
}>({ theme: "dark", toggle: () => {} });

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored) {
      setTheme(stored);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("theme", theme);
    if (theme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  }, [theme, mounted]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

- [ ] **Step 4: 创建 ThemeToggle**

创建 `src/components/ThemeToggle.tsx`:
```typescript
"use client";

import { useTheme } from "./ThemeProvider";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-lg text-gray-400 hover:text-primary-cyan
                 hover:bg-white/5 transition-colors"
      aria-label={theme === "dark" ? "切换到浅色模式" : "切换到深色模式"}
    >
      {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
    </button>
  );
}
```

- [ ] **Step 5: 更新根布局**

修改 `src/app/layout.tsx`:
```typescript
import type { Metadata } from "next";
import ThemeProvider from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "柠川 - 个人博客",
    template: "%s | 柠川",
  },
  description: "柠川的个人博客，记录技术与生活。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ThemeProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add theme system with dark/light mode and global styles"
```

---

### Task 3: 导航栏与页脚

**Files:**
- Create: `src/components/Navbar.tsx`, `src/components/Footer.tsx`

- [ ] **Step 1: 创建导航栏（带滚动毛玻璃效果）**

创建 `src/components/Navbar.tsx`:
```typescript
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/blog", label: "博客" },
  { href: "/projects", label: "项目" },
  { href: "/about", label: "关于" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg-dark/80 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold gradient-text">
          柠川
        </Link>

        <div className="flex items-center gap-1">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                pathname.startsWith(href)
                  ? "text-primary-cyan bg-primary-cyan/10"
                  : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
              }`}
            >
              {label}
            </Link>
          ))}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
```

- [ ] **Step 2: 创建页脚**

创建 `src/components/Footer.tsx`:
```typescript
export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="max-w-5xl mx-auto px-6 text-center text-sm text-gray-500">
        <div className="flex justify-center gap-6 mb-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary-cyan transition-colors"
          >
            GitHub
          </a>
          <a
            href="mailto:ningchuan@example.com"
            className="hover:text-primary-cyan transition-colors"
          >
            Email
          </a>
        </div>
        <p>&copy; {new Date().getFullYear()} 柠川. All rights reserved.</p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add Navbar with scroll glass effect and Footer"
```

---

### Task 4: 内容数据处理

**Files:**
- Create: `src/lib/posts.ts`, `src/lib/projects.ts`, `src/lib/mdx.ts`
- Create: `content/blog/hello-world.mdx`, `content/blog/second-post.mdx`, `content/projects/sample-project.mdx`, `content/about.json`

- [ ] **Step 1: 编写文章读取与解析**

创建 `src/lib/posts.ts`:
```typescript
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
  draft: boolean;
  readingTime: string;
}

export interface Post extends PostMeta {
  content: string;
}

const postsDir = path.join(process.cwd(), "content/blog");

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDir)) return [];

  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(postsDir, file), "utf-8");
    const { data } = matter(raw);
    const stats = readingTime(raw);

    return {
      slug: file.replace(/\.mdx$/, ""),
      title: data.title || "Untitled",
      date: data.date || new Date().toISOString().slice(0, 10),
      tags: data.tags || [],
      summary: data.summary || "",
      draft: data.draft || false,
      readingTime: stats.text,
    } as PostMeta;
  });

  return posts
    .filter((p) => !p.draft)
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(postsDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const stats = readingTime(raw);

  return {
    slug,
    title: data.title || "Untitled",
    date: data.date || new Date().toISOString().slice(0, 10),
    tags: data.tags || [],
    summary: data.summary || "",
    draft: data.draft || false,
    readingTime: stats.text,
    content,
  };
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set<string>();
  posts.forEach((p) => p.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}

export function getAdjacentPosts(slug: string): {
  prev: PostMeta | null;
  next: PostMeta | null;
} {
  const posts = getAllPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  return {
    prev: index < posts.length - 1 ? posts[index + 1] : null,
    next: index > 0 ? posts[index - 1] : null,
  };
}
```

- [ ] **Step 2: 编写项目读取与解析**

创建 `src/lib/projects.ts`:
```typescript
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface ProjectMeta {
  slug: string;
  title: string;
  description: string;
  techStack: string[];
  url?: string;
  repo?: string;
  order: number;
}

export interface Project extends ProjectMeta {
  content: string;
}

const projectsDir = path.join(process.cwd(), "content/projects");

export function getAllProjects(): ProjectMeta[] {
  if (!fs.existsSync(projectsDir)) return [];

  const files = fs.readdirSync(projectsDir).filter((f) => f.endsWith(".mdx"));

  const projects = files.map((file) => {
    const raw = fs.readFileSync(path.join(projectsDir, file), "utf-8");
    const { data } = matter(raw);

    return {
      slug: file.replace(/\.mdx$/, ""),
      title: data.title || "Untitled",
      description: data.description || "",
      techStack: data.techStack || [],
      url: data.url || undefined,
      repo: data.repo || undefined,
      order: data.order || 0,
    } as ProjectMeta;
  });

  return projects.sort((a, b) => a.order - b.order);
}

export function getProjectBySlug(slug: string): Project | null {
  const filePath = path.join(projectsDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title || "Untitled",
    description: data.description || "",
    techStack: data.techStack || [],
    url: data.url || undefined,
    repo: data.repo || undefined,
    order: data.order || 0,
    content,
  };
}
```

- [ ] **Step 3: 编写 MDX 编译工具**

创建 `src/lib/mdx.ts`:
```typescript
import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

export async function compileMdx(source: string) {
  return compileMDX({
    source,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          [
            rehypePrettyCode,
            {
              theme: "github-dark",
              keepBackground: false,
            },
          ],
        ],
      },
      parseFrontmatter: true,
    },
  });
}
```

- [ ] **Step 4: 创建示例内容文件**

创建 `content/blog/hello-world.mdx`:
```markdown
---
title: "你好，世界"
date: "2026-05-01"
tags: ["随笔"]
summary: "这是我的第一篇博客文章，记录建站的心路历程。"
draft: false
---

## 欢迎来到我的博客

这是我的第一篇博客文章。建站的过程既兴奋又充满挑战。

### 为什么要写博客？

写作是最好的思考方式。通过文字记录，我可以：

- 整理自己的知识体系
- 分享技术经验
- 与志同道合的朋友交流

```javascript
console.log("Hello, 柠川的读者们！");
```

感谢你的到访，希望这里的内容对你有所帮助。
```

创建 `content/blog/second-post.mdx`:
```markdown
---
title: "Next.js 入坑指北"
date: "2026-05-03"
tags: ["技术", "前端", "Next.js"]
summary: "记录使用 Next.js 构建个人博客的经验和踩坑记录。"
draft: false
---

## Next.js 初体验

Next.js 是一个基于 React 的全栈框架，提供了许多开箱即用的功能。

### 为什么选择 Next.js？

1. App Router 提供了更好的路由组织方式
2. Server Components 带来了性能提升
3. 静态生成（SSG）对博客非常友好
4. Vercel 部署无缝衔接

### 核心概念

- **文件即路由**：`app/blog/page.tsx` 直接对应 `/blog` 路径
- **服务端组件默认**：除非标记 `"use client"`，否则组件在服务端渲染
- **增量静态生成**：可以在部署后按需生成新页面
```

创建 `content/projects/sample-project.mdx`:
```markdown
---
title: "博客网站"
description: "基于 Next.js 的个人博客与作品集网站"
techStack: ["Next.js", "TypeScript", "Tailwind CSS", "MDX"]
order: 1
---

## 关于这个项目

这是我的个人博客网站，也是学习 Next.js 的实践项目。

### 技术亮点

- 使用 App Router 实现页面路由
- MDX 驱动的内容管理
- 深色/浅色主题切换
- 响应式设计
```

创建 `content/about.json`:
```json
{
  "name": "柠川",
  "bio": "热爱技术，喜欢写作，用代码构建有趣的东西。\n\n这个博客记录我的技术探索和生活感悟，希望能在这里与志同道合的朋友交流。",
  "location": "中国",
  "occupation": "软件工程师",
  "skills": ["TypeScript", "React", "Next.js", "Node.js", "Python", "Docker"],
  "social": {
    "github": "https://github.com",
    "email": "ningchuan@example.com"
  }
}
```

- [ ] **Step 5: Install MDX dependencies**

```bash
npm install next-mdx-remote remark-gfm rehype-pretty-code
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add content processing libs and sample content"
```

---

### Task 5: 首页

**Files:**
- Create: `src/components/Hero.tsx`, `src/components/PostCard.tsx`, `src/components/ProjectCard.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: 创建 Hero 组件**

创建 `src/components/Hero.tsx`:
```typescript
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* 背景光晕 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary-cyan/5 blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-primary-purple/5 blur-[100px]" />
      </div>

      <div className="relative text-center px-6">
        {/* 头像占位 */}
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-cyan to-primary-purple p-0.5">
          <div className="w-full h-full rounded-full bg-bg-dark flex items-center justify-center text-3xl font-bold gradient-text">
            柠
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Hi，我是<span className="gradient-text">柠川</span>
        </h1>
        <p className="text-lg text-gray-400 mb-8 max-w-md mx-auto">
          个人博客 · 记录技术与生活
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            href="/blog"
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-primary-cyan to-primary-purple
                       text-white font-medium hover:opacity-90 transition-opacity
                       shadow-lg shadow-primary-purple/20"
          >
            博客
          </Link>
          <Link
            href="/projects"
            className="px-6 py-3 rounded-lg border border-white/10 text-gray-300
                       hover:border-primary-cyan/30 hover:text-primary-cyan transition-all"
          >
            项目
          </Link>
        </div>

        {/* 向下滚动提示 */}
        <div className="mt-16 animate-bounce text-gray-600">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: 创建文章卡片组件**

创建 `src/components/PostCard.tsx`:
```typescript
import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import CommentBadge from "./CommentBadge";

export default function PostCard({ post, slug }: { post: PostMeta; slug: string }) {
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
```

- [ ] **Step 3: 创建项目卡片组件**

创建 `src/components/ProjectCard.tsx`:
```typescript
import Link from "next/link";
import type { ProjectMeta } from "@/lib/projects";

export default function ProjectCard({ project }: { project: ProjectMeta }) {
  return (
    <Link href={`/projects/${project.slug}`} className="card block p-6 group">
      <h3 className="text-lg font-semibold text-gray-100 mb-2 group-hover:text-primary-cyan transition-colors">
        {project.title}
      </h3>
      <p className="text-sm text-gray-400">{project.description}</p>
      <div className="flex flex-wrap gap-1.5 mt-3">
        {project.techStack.map((tech) => (
          <span key={tech} className="text-xs px-2 py-0.5 rounded-full bg-primary-purple/10 text-primary-purple/80">
            {tech}
          </span>
        ))}
      </div>
    </Link>
  );
}
```

- [ ] **Step 4: 编写首页**

修改 `src/app/page.tsx`:
```typescript
import Hero from "@/components/Hero";
import PostCard from "@/components/PostCard";
import ProjectCard from "@/components/ProjectCard";
import { getAllPosts } from "@/lib/posts";
import { getAllProjects } from "@/lib/projects";
import Link from "next/link";

export default function Home() {
  const posts = getAllPosts().slice(0, 4);
  const projects = getAllProjects().slice(0, 2);

  return (
    <>
      <Hero />

      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-2xl font-bold">最新文章</h2>
          <Link href="/blog" className="text-sm text-primary-cyan hover:underline">
            查看全部 →
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} slug={post.slug} />
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-2xl font-bold">精选项目</h2>
          <Link href="/projects" className="text-sm text-primary-cyan hover:underline">
            查看全部 →
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add home page with Hero, featured posts and projects"
```

---

### Task 6: 博客列表页

**Files:**
- Create: `src/components/TagFilter.tsx`
- Modify: `src/app/blog/page.tsx`

- [ ] **Step 1: 创建标签筛选器**

创建 `src/components/TagFilter.tsx`:
```typescript
"use client";

import { useRouter, useSearchParams } from "next/navigation";

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
```

- [ ] **Step 2: 编写博客列表页**

修改 `src/app/blog/page.tsx`:
```typescript
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
          <PostCard key={post.slug} post={post} slug={post.slug} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-500 py-16">暂无文章</p>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add blog list page with tag filtering"
```

---

### Task 7: 文章详情页

**Files:**
- Create: `src/components/MDXRenderer.tsx`, `src/components/TableOfContents.tsx`, `src/components/GiscusComments.tsx`
- Modify: `src/app/blog/[slug]/page.tsx`

- [ ] **Step 1: 创建 MDX 渲染器**

创建 `src/components/MDXRenderer.tsx`:
```typescript
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
```

- [ ] **Step 2: 创建文章目录组件**

创建 `src/components/TableOfContents.tsx`:
```typescript
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
```

- [ ] **Step 3: 创建 Giscus 评论组件（预留）**

创建 `src/components/GiscusComments.tsx`:
```typescript
"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

export default function GiscusComments() {
  const ref = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    // Giscus 配置预留 —— 需要 GitHub 仓库后启用
    // 替换下方 repo 和 repoId 即可激活
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "your-username/your-repo");
    script.setAttribute("data-repo-id", "R_kgDO0000000");
    script.setAttribute("data-category", "Announcements");
    script.setAttribute("data-category-id", "DIC_kwDO0000000");
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
```

- [ ] **Step 4: 编写文章详情页**

修改 `src/app/blog/[slug]/page.tsx`:
```typescript
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getAdjacentPosts, getAllPosts } from "@/lib/posts";
import MDXRenderer from "@/components/MDXRenderer";
import TableOfContents from "@/components/TableOfContents";
import GiscusComments from "@/components/GiscusComments";
import type { Metadata } from "next";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "文章未找到" };
  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const { prev, next } = getAdjacentPosts(params.slug);

  return (
    <div className="max-w-5xl mx-auto px-6 pt-24 pb-16">
      {/* 文章头部 */}
      <header className="max-w-3xl mx-auto text-center mb-12">
        <div className="flex items-center justify-center gap-3 text-sm text-gray-500 mb-4">
          <time>{post.date}</time>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex justify-center gap-2">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog?tag=${encodeURIComponent(tag)}`}
              className="text-xs px-3 py-1 rounded-full bg-primary-cyan/10 text-primary-cyan/80 hover:bg-primary-cyan/20 transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </header>

      {/* 文章正文 + 目录 */}
      <div className="flex gap-8 justify-center">
        <div className="max-w-3xl w-full min-w-0">
          <MDXRenderer source={post.content} />
        </div>
        <TableOfContents content={post.content} />
      </div>

      {/* 上一篇 / 下一篇 */}
      <nav className="max-w-3xl mx-auto mt-16 grid grid-cols-2 gap-4">
        {prev ? (
          <Link
            href={`/blog/${prev.slug}`}
            className="card p-4 group text-left"
          >
            <span className="text-xs text-gray-500">← 上一篇</span>
            <p className="text-sm text-gray-300 group-hover:text-primary-cyan transition-colors mt-1">
              {prev.title}
            </p>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={`/blog/${next.slug}`}
            className="card p-4 group text-right"
          >
            <span className="text-xs text-gray-500">下一篇 →</span>
            <p className="text-sm text-gray-300 group-hover:text-primary-cyan transition-colors mt-1">
              {next.title}
            </p>
          </Link>
        ) : (
          <div />
        )}
      </nav>

      {/* 评论区 */}
      <div className="max-w-3xl mx-auto">
        <GiscusComments />
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Install rehype dependencies**

```bash
npm install rehype-slug rehype-autolink-headings
```

然后在 `src/lib/mdx.ts` 中添加这两个插件：
```typescript
// 在 rehypePlugins 数组最前面添加
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

// rehypePlugins 中:
rehypeSlug,
[
  rehypeAutolinkHeadings,
  {
    behavior: "wrap",
    properties: {
      className: ["no-underline"],
    },
  },
],
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add blog post detail page with MDX, ToC, and comment slot"
```

---

### Task 8: 项目展示页与项目详情页

**Files:**
- Modify: `src/app/projects/page.tsx`
- Create: `src/app/projects/[slug]/page.tsx`

- [ ] **Step 1: 编写项目列表页**

修改 `src/app/projects/page.tsx`:
```typescript
import ProjectCard from "@/components/ProjectCard";
import { getAllProjects } from "@/lib/projects";

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="max-w-5xl mx-auto px-6 pt-24 pb-16">
      <h1 className="text-3xl font-bold mb-2">项目</h1>
      <p className="text-gray-500 mb-8">共 {projects.length} 个项目</p>

      <div className="grid md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {projects.length === 0 && (
        <p className="text-center text-gray-500 py-16">暂无项目</p>
      )}
    </div>
  );
}
```

- [ ] **Step 2: 编写项目详情页**

创建 `src/app/projects/[slug]/page.tsx`:
```typescript
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProjectBySlug, getAllProjects } from "@/lib/projects";
import MDXRenderer from "@/components/MDXRenderer";
import type { Metadata } from "next";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);
  if (!project) return { title: "项目未找到" };
  return {
    title: project.title,
    description: project.description,
  };
}

export default function ProjectDetailPage({ params }: Props) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  return (
    <div className="max-w-3xl mx-auto px-6 pt-24 pb-16">
      <Link href="/projects" className="text-sm text-gray-500 hover:text-primary-cyan transition-colors mb-6 inline-block">
        ← 返回项目列表
      </Link>

      <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
      <p className="text-gray-400 mb-6">{project.description}</p>

      <div className="flex flex-wrap gap-2 mb-8">
        {project.techStack.map((tech) => (
          <span key={tech} className="text-xs px-3 py-1 rounded-full bg-primary-purple/10 text-primary-purple/80">
            {tech}
          </span>
        ))}
      </div>

      <div className="flex gap-4 mb-8">
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-4 py-2 rounded-lg bg-primary-cyan/10 text-primary-cyan hover:bg-primary-cyan/20 transition-colors"
          >
            访问项目 →
          </a>
        )}
        {project.repo && (
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-4 py-2 rounded-lg border border-white/10 text-gray-300 hover:border-primary-cyan/30 transition-colors"
          >
            源代码
          </a>
        )}
      </div>

      <MDXRenderer source={project.content} />
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add projects list and detail pages"
```

---

### Task 9: 关于我页面

**Files:**
- Modify: `src/app/about/page.tsx`

- [ ] **Step 1: 编写关于页面**

修改 `src/app/about/page.tsx`:
```typescript
import fs from "fs";
import path from "path";

interface AboutData {
  name: string;
  bio: string;
  location: string;
  occupation: string;
  skills: string[];
  social: {
    github?: string;
    email?: string;
    twitter?: string;
  };
}

function getAboutData(): AboutData {
  const filePath = path.join(process.cwd(), "content/about.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}

export default function AboutPage() {
  const data = getAboutData();

  return (
    <div className="max-w-3xl mx-auto px-6 pt-24 pb-16">
      {/* 头像与基本信息 */}
      <div className="text-center mb-12">
        <div className="w-28 h-28 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-cyan to-primary-purple p-0.5">
          <div className="w-full h-full rounded-full bg-bg-dark flex items-center justify-center text-4xl font-bold gradient-text">
            柠
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-2">{data.name}</h1>
        <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
          {data.location && <span>🏠 {data.location}</span>}
          {data.occupation && <span>💼 {data.occupation}</span>}
        </div>
      </div>

      {/* 自我介绍 */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">关于我</h2>
        <div className="text-gray-400 leading-relaxed whitespace-pre-line">
          {data.bio}
        </div>
      </section>

      {/* 技能 */}
      {data.skills.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">技能</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 rounded-lg bg-white/5 text-sm text-gray-300 border border-white/5"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* 联系方式 */}
      <section>
        <h2 className="text-xl font-semibold mb-4">联系我</h2>
        <div className="flex gap-4">
          {data.social.github && (
            <a
              href={data.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 hover:text-primary-cyan transition-colors"
            >
              🐙 GitHub
            </a>
          )}
          {data.social.email && (
            <a
              href={`mailto:${data.social.email}`}
              className="text-sm text-gray-400 hover:text-primary-cyan transition-colors"
            >
              📧 Email
            </a>
          )}
          {data.social.twitter && (
            <a
              href={data.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 hover:text-primary-cyan transition-colors"
            >
              🐦 Twitter
            </a>
          )}
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat: add about page"
```

---

### Task 10: 新评论通知系统

**Files:**
- Create: `src/lib/comments.ts`, `src/components/CommentBadge.tsx`

- [ ] **Step 1: 编写评论通知逻辑**

创建 `src/lib/comments.ts`:
```typescript
"use server";

// 新评论通知 —— 客户端存储方案
// 当用户访问首页时，读取 localStorage 中上次检查时间，
// 与当前时间对比，超过阈值则拉取 GitHub Discussions API

const DISCUSSION_API = "https://api.github.com/graphql";

interface CommentThread {
  path: string;
  lastCommentedAt: string;
  commentCount: number;
}

const COMMENT_QUERY = `
query($owner: String!, $repo: String!, $categoryId: String!) {
  repository(owner: $owner, name: $repo) {
    discussions(first: 50, categoryId: $categoryId, orderBy: {field: UPDATED_AT, direction: DESC}) {
      nodes {
        title
        body
        createdAt
        updatedAt
        comments(first: 5) {
          totalCount
          nodes {
            createdAt
          }
        }
      }
    }
  }
}
`;

// 存储键名
const LAST_CHECK_KEY = "ningchuan_last_comment_check";

export function getLastCheckTime(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(LAST_CHECK_KEY);
}

export function updateLastCheckTime(): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(LAST_CHECK_KEY, new Date().toISOString());
}

// 从 Discussions title 中提取文章 slug（约定 title 即为 slug）
function extractSlugFromTitle(title: string): string {
  return title.toLowerCase().replace(/\s+/g, "-");
}

export async function checkNewComments(
  owner: string,
  repo: string,
  categoryId: string,
  token?: string
): Promise<Map<string, number>> {
  const lastCheck = getLastCheckTime();
  const result = new Map<string, number>();

  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "User-Agent": "NingChuan-Blog",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(DISCUSSION_API, {
      method: "POST",
      headers,
      body: JSON.stringify({
        query: COMMENT_QUERY,
        variables: { owner, repo, categoryId },
      }),
    });

    const json = await response.json();
    const discussions = json.data?.repository?.discussions?.nodes || [];

    for (const discussion of discussions) {
      const slug = extractSlugFromTitle(discussion.title);
      const lastCommentDate = discussion.comments.nodes[0]?.createdAt;

      if (!lastCommentDate) continue;

      // 如果有上次检查时间，只标记新评论
      if (lastCheck && new Date(lastCommentDate) <= new Date(lastCheck)) {
        continue;
      }

      result.set(slug, discussion.comments.totalCount);
    }
  } catch (error) {
    console.error("Failed to check comments:", error);
  }

  return result;
}
```

- [ ] **Step 2: 创建新评论徽标组件**

创建 `src/components/CommentBadge.tsx`:
```typescript
"use client";

import { useEffect, useState } from "react";

export default function CommentBadge({ slug }: { slug: string }) {
  const [hasNew, setHasNew] = useState(false);

  useEffect(() => {
    // 此处简化实现：读取 localStorage 中的新评论数据
    // 实际部署时替换为 checkNewComments 的调用结果
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
```

- [ ] **Step 3: 更新 PostCard 组件添加相对定位**

修改 `src/components/PostCard.tsx` 中链接元素，确保已包含 `relative` 类（已在 Task 5 中实现，此处确认）。

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add new comment notification system"
```

---

### Task 11: SEO 与 Open Graph

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: 更新元数据**

修改 `src/app/layout.tsx` 的 metadata 导出为：
```typescript
export const metadata: Metadata = {
  metadataBase: new URL("https://ningchuan.dev"),
  title: {
    default: "柠川 - 个人博客",
    template: "%s | 柠川",
  },
  description: "柠川的个人博客，记录技术与生活。",
  openGraph: {
    title: "柠川 - 个人博客",
    description: "柠川的个人博客，记录技术与生活。",
    type: "website",
    locale: "zh_CN",
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat: add SEO metadata and Open Graph tags"
```

---

### Task 12: 响应式完善与最终打磨

**Files:**
- Modify: `src/components/Navbar.tsx`, `src/components/Hero.tsx`, `src/styles/globals.css`

- [ ] **Step 1: 添加移动端导航菜单**

修改 `src/components/Navbar.tsx`，添加移动端汉堡菜单：
```typescript
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { FiMenu, FiX } from "react-icons/fi";

const links = [
  { href: "/blog", label: "博客" },
  { href: "/projects", label: "项目" },
  { href: "/about", label: "关于" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg-dark/80 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold gradient-text">
          柠川
        </Link>

        {/* 桌面端导航 */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                pathname.startsWith(href)
                  ? "text-primary-cyan bg-primary-cyan/10"
                  : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
              }`}
            >
              {label}
            </Link>
          ))}
          <ThemeToggle />
        </div>

        {/* 移动端菜单按钮 */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-lg text-gray-400 hover:text-primary-cyan hover:bg-white/5"
            aria-label="切换导航菜单"
          >
            {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </nav>

      {/* 移动端下拉菜单 */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 bg-bg-dark/95 backdrop-blur-md border-b border-white/5">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                pathname.startsWith(href)
                  ? "text-primary-cyan bg-primary-cyan/10"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
```

- [ ] **Step 2: 调整 Hero 区移动端适配**

修改 `src/components/Hero.tsx` 中的标题字号为：
```typescript
<h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
```

光晕大小也调整为响应式。

- [ ] **Step 3: 移动端内容区内边距调整**

修改 `src/styles/globals.css`，添加移动端适配：
```css
@layer components {
  .content-padding {
    @apply px-4 sm:px-6;
  }
}
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add mobile responsive nav and polish"
```

---

### Task 13: 验证与构建

**Files:** None (验证 only)

- [ ] **Step 1: 构建生产版本**

```bash
npm run build
```
Expected: 构建成功，无错误和警告。

- [ ] **Step 2: 启动开发服务器进行最终检查**

```bash
npm run dev
```
访问以下页面确认：
- `http://localhost:3000` — 首页 Hero + 文章卡片 + 项目卡片
- `http://localhost:3000/blog` — 博客列表 + 标签筛选
- `http://localhost:3000/blog/hello-world` — 文章详情 + 目录 + 上一篇/下一篇
- `http://localhost:3000/projects` — 项目列表
- `http://localhost:3000/projects/sample-project` — 项目详情
- `http://localhost:3000/about` — 关于页
- 深色/浅色主题切换正常
- 移动端汉堡菜单正常

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: final build verification"
```

---

## 后续任务（需 GitHub 账号）

以下任务依赖 GitHub 账号和仓库，在注册后执行：

1. **TinaCMS 集成** — 配置 `tina/config.ts`，实现可视化编辑
2. **Giscus 激活** — 创建 GitHub Discussions，配置 repo ID，启用评论
3. **Vercel 部署** — 关联 GitHub 仓库，配置自动部署
4. **自定义域名** — 如有需要，绑定 ningchuan.dev 或其他域名
