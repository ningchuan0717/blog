export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="max-w-5xl mx-auto px-6 text-center text-sm text-gray-500">
        <div className="flex justify-center gap-6 mb-4">
          <a
            href="https://github.com/ningchuan0717"
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
