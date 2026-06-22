import { countries } from "@/content/site";

export function CountryMap() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {countries.map((country) => (
        <div
          key={country.code}
          className="rounded-xl border border-surface-dark bg-white p-5 text-center"
        >
          <p className="font-heading text-2xl font-bold text-primary">{country.code}</p>
          <p className="mt-1 font-medium text-text">{country.name}</p>
          <p className="mt-1 text-xs text-text-muted">Since {country.since}</p>
        </div>
      ))}
    </div>
  );
}
