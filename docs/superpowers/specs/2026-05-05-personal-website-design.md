# 柠川个人网站设计文档

> 创建日期：2026-05-05

## 概述

为网名"柠川"的博主创建一个个人博客 + 作品集网站，风格为现代科技风，支持内容在线编辑。

## 技术栈

| 层级 | 选择 |
|---|---|
| 前端框架 | Next.js (App Router) |
| 样式 | Tailwind CSS |
| 内容格式 | MDX (Markdown + React 组件) |
| 内容编辑 | TinaCMS (Git 驱动 CMS) |
| 评论系统 | Giscus (GitHub Discussions) |
| 新评论通知 | 客户端调 GitHub Discussions API |
| 部署 | Vercel (推送自动部署) |

## 页面结构

| 页面 | 路径 | 内容 |
|---|---|---|
| 首页 | `/` | Hero 区个人介绍 + 精选文章（最新 4 篇，含新评论提示）+ 精选项目（最新 2 个） |
| 博客列表 | `/blog` | 所有文章列表，支持标签筛选，有新评论的文章显示发光圆点 |
| 文章详情 | `/blog/[slug]` | 文章正文 + 右侧目录导航 + 上一篇/下一篇 + Giscus 评论区 |
| 项目展示 | `/projects` | 所有项目卡片式展示 |
| 关于我 | `/about` | 个人简介 + 技能标签 + 联系方式 |

### 全局元素
- 顶部导航栏：Logo「柠川」、博客、项目、关于、深色/浅色主题切换
- 底部页脚：社交链接、版权信息
- 导航栏滚动效果：透明 → 毛玻璃半透明

## 视觉设计

### 配色方案
- **主题**：默认深色，支持浅色切换
- **背景**：深靛蓝 `#0a0e27`
- **主色渐变**：青蓝 `#00d4ff` → 紫 `#7b2fff`
- **文字**：灰白系，强调色为青蓝
- **点缀**：新评论提示用发光青绿圆点

### 设计要点
- Hero 区：蓝紫渐变背景光晕效果，头像 + 一句话介绍 + 两个 CTA 按钮
- 卡片：半透明深色背景，微边框，悬停时有微光边框效果
- 代码块：深色主题语法高亮
- 文章详情页：桌面端右侧固定目录导航，跟随滚动高亮当前章节

## 数据模型

### 文章
```yaml
title: string          # 标题
slug: string           # URL 标识
date: string           # 发布日期
tags: string[]         # 标签
summary: string        # 摘要
content: MDX           # 正文
draft: boolean         # 草稿
```

### 项目
```yaml
title: string          # 项目名
slug: string           # URL 标识
description: string    # 一句话描述
content: MDX           # 详细描述
techStack: string[]    # 技术栈
url: string?           # 项目链接
repo: string?          # 仓库链接
order: number          # 排序
```

### 个人信息（关于页）
```yaml
name: "柠川"
avatar: string         # 头像路径
bio: string            # 自我介绍
location: string       # 城市
occupation: string     # 职业
skills: string[]       # 技能
social:
  github: string
  email: string
  twitter: string?
```

## 评论与通知

- 使用 Giscus 组件嵌入评论区，数据存储在用户的 GitHub Discussions
- 博客首页通过 GitHub Discussions API 拉取最近评论，与本地缓存对比
- 有新评论时，对应文章卡片右上角显示青色发光圆点

## 编辑流程

1. 作者访问网站 → 进入 TinaCMS 编辑模式
2. 在页面上直接编辑内容，所见即所得
3. 保存后 TinaCMS 自动提交到 GitHub
4. Vercel 检测到推送，自动重新构建部署

## 项目结构

```
blog/
├── content/
│   ├── blog/           # 文章 MDX 文件
│   ├── projects/       # 项目 MDX 文件
│   └── about/          # 关于信息
├── public/
│   └── images/         # 静态图片
├── src/
│   ├── app/            # Next.js App Router 页面
│   ├── components/     # 通用组件
│   ├── lib/            # 工具函数
│   └── styles/         # 全局样式
├── tina/               # TinaCMS 配置
├── next.config.js
├── tailwind.config.js
└── package.json
```

## 非功能需求

- 性能：首页 Lighthouse 评分 > 90
- SEO：每个页面有合适的 meta 标签和 Open Graph 信息
- 响应式：桌面端、平板、手机三端适配
- 可访问性：语义化 HTML，合理的对比度和焦点样式
