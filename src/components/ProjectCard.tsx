import { Link } from "@/i18n/navigation";
import type { Project } from "@/content/projects";

export function ProjectCard({ project, learnMore }: { project: Project; learnMore: string }) {
  return (
    <article className="flex flex-col rounded-2xl border border-surface-dark bg-white p-6">
      <div className="mb-3 flex items-center gap-2">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            project.status === "active"
              ? "bg-primary/10 text-primary"
              : "bg-surface-dark text-text-muted"
          }`}
        >
          {project.status === "active" ? "Active" : "Completed"}
        </span>
        <span className="text-xs text-text-muted">{project.funder}</span>
      </div>
      <h3 className="font-heading text-lg font-bold text-primary">{project.title}</h3>
      <p className="mt-2 flex-1 text-sm text-text-muted">{project.summary}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.countries.slice(0, 3).map((c) => (
          <span key={c} className="rounded bg-surface px-2 py-0.5 text-xs text-text-muted">
            {c}
          </span>
        ))}
      </div>
      <Link
        href={`/projects#${project.slug}`}
        className="mt-4 text-sm font-semibold text-accent hover:text-primary"
      >
        {learnMore} →
      </Link>
    </article>
  );
}
