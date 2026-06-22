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
  return { title: t("title") };
}

export default async function WorkWithUsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("workWithUs");
  const tenders = getTenders(5);

  return (
    <>
      <section className="bg-primary py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h1 className="font-heading text-4xl font-bold">{t("title")}</h1>
          <p className="mt-4 max-w-2xl text-white/85">{t("subtitle")}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="rounded-2xl border border-surface-dark bg-white p-8">
            <h2 className="font-heading text-xl font-bold text-primary">{t("tenders")}</h2>
            <p className="mt-3 text-sm text-text-muted">{t("tendersDesc")}</p>
            <Link href="/work-with-us/tenders" className="mt-6 inline-block text-sm font-semibold text-accent">
              View tenders →
            </Link>
          </div>
          <div className="rounded-2xl border border-surface-dark bg-white p-8">
            <h2 className="font-heading text-xl font-bold text-primary">{t("volunteer")}</h2>
            <p className="mt-3 text-sm text-text-muted">{t("volunteerDesc")}</p>
            <Link href="/contact" className="mt-6 inline-block text-sm font-semibold text-accent">
              Get in touch →
            </Link>
          </div>
          <div className="rounded-2xl border border-surface-dark bg-white p-8">
            <h2 className="font-heading text-xl font-bold text-primary">{t("donate")}</h2>
            <p className="mt-3 text-sm text-text-muted">{t("donateDesc")}</p>
            <a
              href="https://redi-ngo.eu/donate/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block text-sm font-semibold text-accent"
            >
              Donate →
            </a>
          </div>
        </div>

        {tenders.length > 0 && (
          <div className="mt-16">
            <h2 className="font-heading text-2xl font-bold text-primary">{t("tenders")}</h2>
            <ul className="mt-6 space-y-4">
              {tenders.map((tender) => (
                <li key={tender.slug}>
                  <Link
                    href={`/work-with-us/tenders/${tender.slug}`}
                    className="block rounded-xl border border-surface-dark bg-white p-5 hover:shadow-md"
                  >
                    <p className="font-medium text-primary">{tender.title}</p>
                    {tender.publishedAt && (
                      <time className="mt-1 block text-xs text-text-muted">{tender.publishedAt}</time>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </>
  );
}
