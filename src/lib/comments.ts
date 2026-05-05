"use server";

const DISCUSSION_API = "https://api.github.com/graphql";

const COMMENT_QUERY = `
query($owner: String!, $repo: String!, $categoryId: String!) {
  repository(owner: $owner, name: $repo) {
    discussions(first: 50, categoryId: $categoryId, orderBy: {field: UPDATED_AT, direction: DESC}) {
      nodes {
        title
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

const LAST_CHECK_KEY = "ningchuan_last_comment_check";

export function getLastCheckTime(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(LAST_CHECK_KEY);
}

export function updateLastCheckTime(): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(LAST_CHECK_KEY, new Date().toISOString());
}

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
