import { Link } from "@/i18n/navigation";
import type { ImpactInitiative } from "@/content/impact";

export function ImpactCard({ initiative }: { initiative: ImpactInitiative }) {
  return (
    <Link
      href={`/impact/${initiative.slug}`}
      className="group flex flex-col rounded-2xl border border-surface-dark bg-white p-6 transition-shadow hover:shadow-lg"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <span className="font-heading text-lg font-bold">{initiative.title.charAt(0)}</span>
      </div>
      <h3 className="font-heading text-xl font-bold text-primary group-hover:text-primary-light">
        {initiative.title}
      </h3>
      <p className="mt-2 flex-1 text-sm text-text-muted">{initiative.summary}</p>
      <span className="mt-4 text-sm font-semibold text-accent">Learn more →</span>
    </Link>
  );
}
