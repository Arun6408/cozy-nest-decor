import type { ReactNode } from "react";

export function SimplePage({ title, updated, children }: { title: string; updated?: string; children: ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <h1 className="font-serif text-5xl font-semibold">{title}</h1>
      {updated && <p className="mt-3 text-sm text-muted">Last updated {updated}</p>}
      <div className="prose prose-lg prose-cozy mt-8 max-w-none">{children}</div>
    </div>
  );
}
