// Runtime env access — prevents Next.js from inlining at build time
const env = process.env as Record<string, string | undefined>;

function getEnv(key: string): string | undefined {
  // Use dynamic access to prevent Next.js build-time replacement
  return env[key];
}

export function getDeepSeekKey(): string | undefined {
  return getEnv("DEEPSEEK_API_KEY");
}

export function getAccessPassword(): string | undefined {
  return getEnv("ACCESS_PASSWORD");
}
