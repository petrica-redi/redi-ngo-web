interface StatsBarProps {
  stats: ReadonlyArray<{ value: string; label: string }>;
}

export function StatsBar({ stats }: StatsBarProps) {
  return (
    <section className="border-y border-surface-dark bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 lg:grid-cols-4 lg:px-8">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-heading text-3xl font-bold text-primary lg:text-4xl">{stat.value}</p>
            <p className="mt-1 text-sm text-text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
