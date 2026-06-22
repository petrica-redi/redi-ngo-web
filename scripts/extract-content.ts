import * as fs from "node:fs";
import * as path from "node:path";
import * as cheerio from "cheerio";

const MIRROR = path.resolve(__dirname, "../../redi-ngo-site/redi-ngo.eu");
const OUT = path.resolve(__dirname, "../src/content/extracted");

const JUNK_SLUGS = new Set([
  "do-something-crazy-to-raise-money",
  "learn-how-access-to-clean-water",
  "build-school-for-poor-childrens",
  "together-to-help-the-world-better",
  "the-world-is-drowning-in-plastic",
  "pagetest",
  "asdasd",
  "playground",
  "home-test",
  "ana-playground",
]);

function readHtml(relativePath: string): cheerio.CheerioAPI | null {
  const filePath = path.join(MIRROR, relativePath);
  if (!fs.existsSync(filePath)) return null;
  const html = fs.readFileSync(filePath, "utf-8");
  return cheerio.load(html);
}

function extractText($: cheerio.CheerioAPI): string {
  const parts: string[] = [];
  $(".elementor-widget-text-editor .elementor-widget-container").each((_, el) => {
    const text = $(el).text().replace(/\s+/g, " ").trim();
    if (text.length > 40) parts.push(text);
  });
  return parts.join("\n\n").slice(0, 4000);
}

function extractTitle($: cheerio.CheerioAPI): string {
  const og = $('meta[property="og:title"]').attr("content");
  if (og) return og.replace(/ - Portal REDI NGO$/, "").trim();
  return $("title").text().replace(/ - Portal REDI NGO$/, "").trim();
}

function extractExcerpt($: cheerio.CheerioAPI): string {
  const desc = $('meta[property="og:description"]').attr("content");
  return desc?.slice(0, 300) ?? "";
}

function extractImage($: cheerio.CheerioAPI): string | undefined {
  const og = $('meta[property="og:image"]').attr("content");
  if (og) return og.replace("https://redi-ngo.eu", "");
  const img = $(".elementor-widget-image img").first().attr("src");
  if (img) return img.replace(/^\.\./, "").replace(/^\/redi-ngo\.eu/, "");
  return undefined;
}

function extractDate($: cheerio.CheerioAPI): string | undefined {
  const published = $('meta[property="article:published_time"]').attr("content");
  return published?.slice(0, 10);
}

function classifySlug(slug: string): "news" | "tender" | "job" | "page" | "junk" {
  if (JUNK_SLUGS.has(slug)) return "junk";
  if (/^(call-for|tender|open-call|launch-of-a-tender|invitation|procurement|tor-)/.test(slug))
    return "tender";
  if (/^(call-for|sales-manager|country-manager|business-facilitator|internship|intern-)/.test(slug))
    return "job";
  if (slug.startsWith("category/") || slug.startsWith("tag/") || slug.startsWith("feed"))
    return "junk";
  return "news";
}

function slugFromDir(dir: string): string {
  return dir.replace(/\/index\.html$/, "").replace(/\\/g, "/");
}

function walkPages(): Array<{ slug: string; htmlPath: string }> {
  const results: Array<{ slug: string; htmlPath: string }> = [];

  function walk(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (["wp-content", "wp-includes", "wp-json", "comments"].includes(entry.name)) continue;
        walk(full);
      } else if (entry.name === "index.html") {
        const rel = path.relative(MIRROR, full);
        const slug = slugFromDir(rel);
        if (slug.includes("@p=")) continue;
        results.push({ slug, htmlPath: rel });
      }
    }
  }

  walk(MIRROR);
  return results;
}

interface ExtractedItem {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  image?: string;
  publishedAt?: string;
  category: string;
  language: "en" | "ro" | "mk" | "sr";
}

function detectLanguage(slug: string, title: string, body: string): "en" | "ro" | "mk" | "sr" {
  if (/[\u0400-\u04FF]/.test(title + body)) {
    if (/[а-яА-Я]/.test(title)) return "mk";
    return "sr";
  }
  if (/^(proiect|echipa|comunicat|promovarea|incluziunea|despre)/.test(slug)) return "ro";
  if (/[ăâîșțĂÂÎȘȚ]/.test(title + body)) return "ro";
  return "en";
}

function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const pages = walkPages();
  const items: ExtractedItem[] = [];

  for (const { slug, htmlPath } of pages) {
    const $ = readHtml(htmlPath);
    if (!$) continue;

    const kind = classifySlug(slug);
    if (kind === "junk") continue;

    const title = extractTitle($);
    const body = extractText($);
    if (!title || title.length < 3) continue;
    if (kind === "news" && body.length < 80 && !extractExcerpt($)) continue;

    items.push({
      slug,
      title,
      excerpt: extractExcerpt($) || body.slice(0, 200),
      body,
      image: extractImage($),
      publishedAt: extractDate($),
      category: kind,
      language: detectLanguage(slug, title, body),
    });
  }

  const news = items
    .filter((i) => i.category === "news" && i.language === "en")
    .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""))
    .slice(0, 40);

  const tenders = items
    .filter((i) => i.category === "tender")
    .slice(0, 20);

  const teamSlugs = fs
    .readdirSync(path.join(MIRROR, "team"))
    .map((s) => `team/${s}`);

  const team = teamSlugs
    .map((slug) => {
      const $ = readHtml(`${slug}/index.html`);
      if (!$) return null;
      return {
        slug: slug.replace("team/", ""),
        name: extractTitle($),
        bio: extractText($).slice(0, 500),
        image: extractImage($),
      };
    })
    .filter(Boolean);

  fs.writeFileSync(path.join(OUT, "news.json"), JSON.stringify(news, null, 2));
  fs.writeFileSync(path.join(OUT, "tenders.json"), JSON.stringify(tenders, null, 2));
  fs.writeFileSync(path.join(OUT, "team.json"), JSON.stringify(team, null, 2));

  console.log(`Extracted ${news.length} news, ${tenders.length} tenders, ${team.length} team members`);
}

main();
