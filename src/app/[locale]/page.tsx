import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/Hero";
import { StatsBar } from "@/components/StatsBar";
import { SectionHeading } from "@/components/SectionHeading";
import { ImpactCard } from "@/components/ImpactCard";
import { ProjectCard } from "@/components/ProjectCard";
import { StoryCard } from "@/components/StoryCard";
import { CountryMap } from "@/components/CountryMap";
import { stats } from "@/content/site";
import { impactInitiatives } from "@/content/impact";
import { projects } from "@/content/projects";
import { getNewsArticles } from "@/lib/content";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const tProjects = await getTranslations("projects");
  const tNews = await getTranslations("news");

  const activeProjects = projects.filter((p) => p.status === "active").slice(0, 3);
  const latestNews = getNewsArticles(3);

  return (
    <>
      <Hero
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        primaryCta={{ label: t("exploreImpact"), href: "/impact" }}
        secondaryCta={{ label: t("supportRedi"), href: "/work-with-us" }}
      />
      <StatsBar stats={stats} />

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading title={t("ourImpact")} href="/impact" linkLabel={t("exploreImpact")} />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {impactInitiatives.slice(0, 3).map((initiative) => (
            <ImpactCard key={initiative.slug} initiative={initiative} />
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            title={t("activeProjects")}
            href="/projects"
            linkLabel={t("viewAllProjects")}
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activeProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} learnMore={tProjects("learnMore")} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading title={t("latestStories")} href="/news" linkLabel={t("allNews")} />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latestNews.map((article) => (
            <StoryCard key={article.slug} article={article} readMore={tNews("readMore")} />
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading title={t("whereWeWork")} subtitle={t("whereWeWorkDesc")} />
          <CountryMap />
        </div>
      </section>
    </>
  );
}
