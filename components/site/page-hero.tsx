import { ReactNode } from "react";

export function PageHero({
  title,
  subtitle
}: {
  title: ReactNode;
  subtitle: ReactNode;
}) {
  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        <h1 className="font-heading text-4xl font-semibold text-primary">{title}</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted">{subtitle}</p>
      </div>
    </section>
  );
}
