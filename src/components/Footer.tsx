import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { navItems, siteConfig } from "@/content/site";

export async function Footer() {
  const t = await getTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-primary text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <p className="font-heading text-xl font-bold">{siteConfig.name}</p>
          <p className="mt-3 max-w-md text-sm text-white/80">{siteConfig.description}</p>
        </div>
        <div>
          <p className="font-heading text-sm font-semibold uppercase tracking-wide">Navigation</p>
          <ul className="mt-4 space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-white/80 hover:text-accent">
                  {t(item.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-heading text-sm font-semibold uppercase tracking-wide">Contact</p>
          <p className="mt-4 text-sm text-white/80">{siteConfig.email}</p>
          <div className="mt-4 flex gap-4">
            <a href={siteConfig.social.linkedin} className="text-sm text-white/80 hover:text-accent" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href={siteConfig.social.facebook} className="text-sm text-white/80 hover:text-accent" target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-white/60">
        © {year} {siteConfig.name}. {t("footer.rights")}
      </div>
    </footer>
  );
}
