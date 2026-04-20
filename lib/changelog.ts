export type ChangelogEntry = {
  sha: string;
  shortSha: string;
  date: string;
  type: 'feat' | 'fix';
  scope: string | null;
  subject: string;
  url: string;
};

const REPO = 'Mopra/nvoke.run';
const API_URL = `https://api.github.com/repos/${REPO}/commits?per_page=100`;
const CONVENTIONAL_RE = /^(feat|fix)(?:\(([^)]+)\))?:\s*(.+)$/;

type GithubCommit = {
  sha: string;
  html_url: string;
  commit: {
    author: { date: string } | null;
    committer: { date: string } | null;
    message: string;
  };
};

export async function getChangelog(): Promise<ChangelogEntry[]> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28'
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const res = await fetch(API_URL, {
    headers,
    next: { revalidate: 3600 }
  });

  if (!res.ok) {
    console.warn(`[changelog] GitHub API returned ${res.status}`);
    return [];
  }

  const commits = (await res.json()) as GithubCommit[];

  return commits
    .map((commit) => parseCommit(commit))
    .filter((entry): entry is ChangelogEntry => entry !== null);
}

function parseCommit(commit: GithubCommit): ChangelogEntry | null {
  const firstLine = commit.commit.message.split('\n', 1)[0]?.trim() ?? '';
  const match = CONVENTIONAL_RE.exec(firstLine);
  if (!match) return null;

  const [, type, scope, subject] = match;
  if ((type !== 'feat' && type !== 'fix') || !subject) return null;

  const date = commit.commit.author?.date ?? commit.commit.committer?.date;
  if (!date) return null;

  return {
    sha: commit.sha,
    shortSha: commit.sha.slice(0, 7),
    date,
    type,
    scope: scope ?? null,
    subject: subject.trim(),
    url: commit.html_url
  };
}

export function groupByDate(entries: readonly ChangelogEntry[]): Map<string, ChangelogEntry[]> {
  const groups = new Map<string, ChangelogEntry[]>();
  for (const entry of entries) {
    const day = entry.date.slice(0, 10);
    const bucket = groups.get(day) ?? [];
    bucket.push(entry);
    groups.set(day, bucket);
  }
  return groups;
}
