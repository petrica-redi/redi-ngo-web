import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { impactInitiatives } from "@/content/impact";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    impactInitiatives.map((i) => ({ locale, slug: i.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const initiative = impactInitiatives.find((i) => i.slug === slug);
  return { title: initiative?.title ?? "Impact" };
}

export default async function ImpactDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const initiative = impactInitiatives.find((i) => i.slug === slug);
  if (!initiative) notFound();

  return (
    <>
      <section className="bg-primary py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <Link href="/impact" className="text-sm text-white/70 hover:text-accent">
            ← Back to Impact
          </Link>
          <h1 className="mt-4 font-heading text-4xl font-bold">{initiative.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">{initiative.summary}</p>
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-4 py-16 lg:px-8">
        <p className="text-lg leading-relaxed text-text-muted">{initiative.description}</p>
        {initiative.link && (
          <a
            href={initiative.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-light"
          >
            Visit program page →
          </a>
        )}
      </section>
    </>
  );
}
