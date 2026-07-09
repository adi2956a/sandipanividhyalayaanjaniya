import { ReactNode } from "react";

export function Section({
  eyebrow,
  title,
  description,
  children,
  muted = false
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  muted?: boolean;
}) {
  return (
    <section className={muted ? "bg-surface" : "bg-white"}>
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="max-w-3xl">
          {eyebrow ? <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">{eyebrow}</p> : null}
          <h2 className="mt-3 font-heading text-3xl font-semibold text-primary">{title}</h2>
          {description ? <p className="mt-4 text-base leading-7 text-muted">{description}</p> : null}
        </div>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

