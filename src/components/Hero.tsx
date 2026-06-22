import { Link } from "@/i18n/navigation";

interface HeroProps {
  title: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export function Hero({ title, subtitle, primaryCta, secondaryCta }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-primary text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,160,23,0.15),transparent_50%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-20 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-28">
        <div>
          <h1 className="font-heading text-4xl font-bold leading-tight lg:text-5xl">{title}</h1>
          <p className="mt-6 text-lg text-white/85">{subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={primaryCta.href}
              className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-text hover:bg-accent-light"
            >
              {primaryCta.label}
            </Link>
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        </div>
        <div className="hidden lg:block">
          <div className="aspect-[4/3] rounded-2xl bg-primary-light/50 p-8">
            <div className="flex h-full flex-col justify-end rounded-xl bg-white/10 p-6 backdrop-blur">
              <p className="text-sm uppercase tracking-widest text-accent">Since 2016</p>
              <p className="mt-2 font-heading text-2xl font-bold">
                7 countries · 500+ entrepreneurs · €2M+ funded
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
