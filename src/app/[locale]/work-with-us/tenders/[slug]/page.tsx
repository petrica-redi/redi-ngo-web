import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getTender, getTenders } from "@/lib/content";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getTenders().map((t) => ({ locale, slug: t.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const tender = getTender(slug);
  return { title: tender?.title ?? "Tender" };
}

export default async function TenderDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const tender = getTender(slug);
  if (!tender) notFound();

  return (
    <>
      <section className="bg-primary py-16 text-white">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <Link href="/work-with-us/tenders" className="text-sm text-white/70 hover:text-accent">
            ← Back to Tenders
          </Link>
          {tender.publishedAt && (
            <time className="mt-4 block text-sm text-white/70">{tender.publishedAt}</time>
          )}
          <h1 className="mt-2 font-heading text-2xl font-bold lg:text-3xl">{tender.title}</h1>
        </div>
      </section>
      <article className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
        <p className="text-lg leading-relaxed text-text-muted whitespace-pre-line">{tender.body || tender.excerpt}</p>
      </article>
    </>
  );
}
