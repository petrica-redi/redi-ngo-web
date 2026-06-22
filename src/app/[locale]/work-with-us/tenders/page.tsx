import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getTenders } from "@/lib/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "workWithUs" });
  return { title: t("tenders") };
}

export default async function TendersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("workWithUs");
  const tenders = getTenders();

  return (
    <>
      <section className="bg-primary py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <Link href="/work-with-us" className="text-sm text-white/70 hover:text-accent">
            ← {t("title")}
          </Link>
          <h1 className="mt-4 font-heading text-4xl font-bold">{t("tenders")}</h1>
          <p className="mt-4 max-w-2xl text-white/85">{t("tendersDesc")}</p>
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-4 py-16 lg:px-8">
        <ul className="space-y-4">
          {tenders.map((tender) => (
            <li key={tender.slug}>
              <Link
                href={`/work-with-us/tenders/${tender.slug}`}
                className="block rounded-xl border border-surface-dark bg-white p-6 hover:shadow-md"
              >
                <p className="font-heading font-bold text-primary">{tender.title}</p>
                <p className="mt-2 text-sm text-text-muted line-clamp-2">{tender.excerpt}</p>
                {tender.publishedAt && (
                  <time className="mt-2 block text-xs text-text-muted">{tender.publishedAt}</time>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
