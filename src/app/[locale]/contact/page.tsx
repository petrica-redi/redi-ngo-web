import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/ContactForm";
import { siteConfig } from "@/content/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("title") };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <>
      <section className="bg-primary py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h1 className="font-heading text-4xl font-bold">{t("title")}</h1>
          <p className="mt-4 max-w-2xl text-white/85">{t("subtitle")}</p>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="font-heading text-xl font-bold text-primary">REDI NGO</h2>
          <p className="mt-4 text-text-muted">{siteConfig.description}</p>
          <dl className="mt-8 space-y-4">
            <div>
              <dt className="text-sm font-semibold text-primary">Email</dt>
              <dd className="text-text-muted">
                <a href={`mailto:${siteConfig.email}`} className="hover:text-accent">
                  {siteConfig.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-primary">Website</dt>
              <dd className="text-text-muted">
                <a href={siteConfig.url} className="hover:text-accent">
                  {siteConfig.url}
                </a>
              </dd>
            </div>
          </dl>
        </div>
        <div className="rounded-2xl border border-surface-dark bg-white p-8">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
