// This file is auto-generated at build time
// Do not edit manually
export const posts = [
  {
    "slug": "second-post",
    "title": "Next.js 入坑指北",
    "date": "2026-05-03",
    "tags": ["技术", "前端", "Next.js"],
    "summary": "记录使用 Next.js 构建个人博客的经验和踩坑记录。",
    "draft": false,
    "readingTime": "2 min read",
    "content": "\n## Next.js 初体验\n\nNext.js 是一个基于 React 的全栈框架，提供了许多开箱即用的功能。\n\n### 为什么选择 Next.js？\n\n1. App Router 提供了更好的路由组织方式\n2. Server Components 带来了性能提升\n3. 静态生成（SSG）对博客非常友好\n4. Vercel 部署无缝衔接\n\n### 核心概念\n\n- **文件即路由**：`app/blog/page.tsx` 直接对应 `/blog` 路径\n- **服务端组件默认**：除非标记 `\"use client\"`，否则组件在服务端渲染\n- **增量静态生成**：可以在部署后按需生成新页面\n"
  },
  {
    "slug": "hello-world",
    "title": "你好，世界",
    "date": "2026-05-01",
    "tags": ["随笔"],
    "summary": "这是我的第一篇博客文章，记录建站的心路历程。",
    "draft": false,
    "readingTime": "1 min read",
    "content": "\n## 欢迎来到我的博客\n\n这是我的第一篇博客文章。建站的过程既兴奋又充满挑战。\n\n### 为什么要写博客？\n\n写作是最好的思考方式。通过文字记录，我可以：\n\n- 整理自己的知识体系\n- 分享技术经验\n- 与志同道合的朋友交流\n\n```javascript\nconsole.log(\"Hello, 柠川的读者们！\");\n```\n\n感谢你的到访，希望这里的内容对你有所帮助。\n"
  }
];
export const projects = [
  {
    "slug": "sample-project",
    "title": "博客网站",
    "description": "基于 Next.js 的个人博客与作品集网站",
    "techStack": ["Next.js", "TypeScript", "Tailwind CSS", "MDX"],
    "url": undefined,
    "repo": undefined,
    "order": 1,
    "content": "\n## 关于这个项目\n\n这是我的个人博客网站，也是学习 Next.js 的实践项目。\n\n### 技术亮点\n\n- 使用 App Router 实现页面路由\n- MDX 驱动的内容管理\n- 深色/浅色主题切换\n- 响应式设计\n"
  }
];
export const tags = ["Next.js", "前端", "技术", "随笔"];
export const about = {
  name: "柠川",
  bio: "热爱技术，喜欢写作，用代码构建有趣的东西。\n\n这个博客记录我的技术探索和生活感悟，希望能在这里与志同道合的朋友交流。",
  location: "中国",
  occupation: "软件工程师",
  skills: ["TypeScript", "React", "Next.js", "Node.js", "Python", "Docker"],
  social: {
    github: "https://github.com/ningchuan0717",
    email: "ningchuan@example.com",
  },
};
