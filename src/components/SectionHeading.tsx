import { Link } from "@/i18n/navigation";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  href?: string;
  linkLabel?: string;
}

export function SectionHeading({ title, subtitle, href, linkLabel }: SectionHeadingProps) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 className="font-heading text-3xl font-bold text-primary">{title}</h2>
        {subtitle && <p className="mt-2 max-w-2xl text-text-muted">{subtitle}</p>}
      </div>
      {href && linkLabel && (
        <Link href={href} className="text-sm font-semibold text-primary hover:text-accent">
          {linkLabel} →
        </Link>
      )}
    </div>
  );
}
