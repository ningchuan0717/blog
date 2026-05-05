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
      {/* Avatar and basic info */}
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

      {/* Bio */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">关于我</h2>
        <div className="text-gray-400 leading-relaxed whitespace-pre-line">
          {data.bio}
        </div>
      </section>

      {/* Skills */}
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

      {/* Contact */}
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
