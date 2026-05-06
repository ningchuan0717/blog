import type { Metadata } from "next";
import ThemeProvider from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ningchuan.top"),
  title: {
    default: "柠川 AI - DeepSeek V4 Pro Max",
    template: "%s | 柠川 AI",
  },
  description: "基于 DeepSeek V4 Pro 的 AI 助手，支持最强推理模式和 1M 上下文。",
  openGraph: {
    title: "柠川 AI - DeepSeek V4 Pro Max",
    description: "基于 DeepSeek V4 Pro 的 AI 助手，支持最强推理模式和 1M 上下文。",
    type: "website",
    locale: "zh_CN",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'light' || (!theme && window.matchMedia('(prefers-color-scheme: light)').matches)) {
                    document.documentElement.classList.remove('dark');
                  } else {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
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
