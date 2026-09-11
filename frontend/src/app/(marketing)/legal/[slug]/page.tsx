import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { POLICIES, type Block, type PolicySlug } from "./policies";

/**
 * Terms, Privacy and Refund pages. One route renders all three; next.config
 * rewrites /terms, /privacy and /refund onto it.
 */

export function generateStaticParams() {
  return Object.keys(POLICIES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const policy = POLICIES[slug as PolicySlug];
  if (!policy) return { title: "Not found" };

  return {
    title: policy.title,
    description: policy.description,
    alternates: { canonical: `/${slug}` },
  };
}

function Blocks({ blocks }: { blocks: readonly Block[] }) {
  return (
    <>
      {blocks.map((block, i) =>
        "ul" in block ? (
          <ul key={i} className="flex flex-col gap-2 pl-1">
            {block.ul.map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden="true" className="text-[var(--brand-blue)]">
                  —
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p key={i}>{block.p}</p>
        ),
      )}
    </>
  );
}

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const policy = POLICIES[slug as PolicySlug];
  if (!policy) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <h1 className="text-3xl font-extrabold tracking-tight text-[var(--brand-ink)] sm:text-4xl">
        {policy.title}
      </h1>

      <p className="mt-3 text-sm text-[var(--color-muted-foreground)]">
        {policy.dateLabel}: {policy.date}
      </p>

      <div className="mt-6 flex flex-col gap-4 text-[15px] leading-relaxed text-[var(--color-foreground)]/85">
        <Blocks blocks={policy.intro} />
      </div>

      <div className="mt-10 flex flex-col gap-9">
        {policy.sections.map((section) => (
          <section key={section.heading} className="flex flex-col gap-3">
            <h2 className="text-lg font-bold tracking-tight text-[var(--brand-ink)]">
              {section.heading}
            </h2>
            <div className="flex flex-col gap-3 text-[15px] leading-relaxed text-[var(--color-muted-foreground)]">
              <Blocks blocks={section.blocks} />
            </div>
          </section>
        ))}
      </div>

      {policy.closing && (
        <p className="mt-10 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-muted)]/40 p-5 text-[15px] font-medium leading-relaxed text-[var(--brand-ink)]">
          {policy.closing}
        </p>
      )}
    </div>
  );
}
