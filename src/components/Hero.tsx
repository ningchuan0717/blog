import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary-cyan/5 blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-primary-purple/5 blur-[100px]" />
      </div>

      <div className="relative text-center px-6">
        {/* Avatar placeholder */}
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-cyan to-primary-purple p-0.5">
          <div className="w-full h-full rounded-full bg-bg-dark flex items-center justify-center text-3xl font-bold gradient-text">
            柠
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
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

        {/* Scroll down hint */}
        <div className="mt-16 animate-bounce text-gray-600">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}
