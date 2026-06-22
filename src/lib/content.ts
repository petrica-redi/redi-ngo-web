import teamData from "@/content/extracted/team.json";
import newsData from "@/content/extracted/news.json";
import tendersData from "@/content/extracted/tenders.json";

const IMAGE_BASE = "https://redi-ngo.eu";

export function mediaUrl(path?: string): string | undefined {
  if (!path) return undefined;
  if (path.startsWith("http")) return path;
  return `${IMAGE_BASE}${path.startsWith("/") ? path : `/${path}`}`;
}

const TENDER_PATTERNS =
  /^(local-associate|open-call|tender|supply-of|montenegro-public|albania-tender|launch-of|invitation|procurement|tor-)/;

export interface NewsArticle {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  image?: string;
  publishedAt?: string;
}

export interface Tender {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  publishedAt?: string;
}

export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  group: "team" | "board";
  image?: string;
}

const TEAM_ROLES: Record<string, { role: string; group: "team" | "board" }> = {
  "petrica-dulgheru": { role: "Executive Director", group: "team" },
  "marius-cristea": { role: "Program Director", group: "team" },
  "bogdan-merfea": { role: "Country Manager, Romania", group: "team" },
  "lejla-zekirovska": { role: "Country Manager, North Macedonia", group: "team" },
  "zarko-savic": { role: "Country Manager, Serbia", group: "team" },
  "jelena-kasumovic": { role: "Communications Officer", group: "team" },
  "ljubica-toseva": { role: "Program Assistant", group: "team" },
  "asib-zekir": { role: "Business Facilitator", group: "team" },
  "board-kinga": { role: "Board Chair", group: "board" },
  "board-lucian": { role: "Board Member", group: "board" },
  "board-ileana": { role: "Board Member", group: "board" },
};

export function getTeam(): TeamMember[] {
  return (teamData as Array<{ slug: string; name: string; image?: string }>).map(
    (m) => ({
      ...m,
      role: TEAM_ROLES[m.slug]?.role ?? "Team Member",
      group: TEAM_ROLES[m.slug]?.group ?? "team",
      image: mediaUrl(m.image),
    }),
  );
}

export function getNewsArticles(limit?: number): NewsArticle[] {
  const articles = (newsData as NewsArticle[])
    .filter((a) => !TENDER_PATTERNS.test(a.slug) && a.title.length < 120)
    .map((a) => ({ ...a, image: mediaUrl(a.image) }));
  return limit ? articles.slice(0, limit) : articles;
}

export function getNewsArticle(slug: string): NewsArticle | undefined {
  return getNewsArticles().find((a) => a.slug === slug);
}

export function getTenders(limit?: number): Tender[] {
  const all = [...(tendersData as Tender[]), ...(newsData as Tender[])].filter(
    (t) => TENDER_PATTERNS.test(t.slug) || t.title.toLowerCase().includes("tender"),
  );
  const seen = new Set<string>();
  const unique = all.filter((t) => {
    if (seen.has(t.slug)) return false;
    seen.add(t.slug);
    return true;
  });
  return limit ? unique.slice(0, limit) : unique;
}

export function getTender(slug: string): Tender | undefined {
  return getTenders().find((t) => t.slug === slug);
}
