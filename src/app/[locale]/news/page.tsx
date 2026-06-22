import { getTranslations, setRequestLocale } from "next-intl/server";
import { StoryCard } from "@/components/StoryCard";
import { getNewsArticles } from "@/lib/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "news" });
  return { title: t("title") };
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("news");
  const articles = getNewsArticles(24);

  return (
    <>
      <section className="bg-primary py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h1 className="font-heading text-4xl font-bold">{t("title")}</h1>
          <p className="mt-4 max-w-2xl text-white/85">{t("subtitle")}</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <StoryCard key={article.slug} article={article} readMore={t("readMore")} />
          ))}
        </div>
      </section>
    </>
  );
}
