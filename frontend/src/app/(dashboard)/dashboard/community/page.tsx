import type { Metadata } from "next";
import Link from "next/link";
import { MessageSquare, Pin, Lock, Users } from "lucide-react";

import { requireUser } from "@/backend/lib/permissions";
import { getCommunityFeed } from "@/backend/services/engagement";
import { createPostAction } from "@/backend/actions/engagement";
import { NewPostForm } from "@/frontend/components/dashboard/community-forms";
import { Badge } from "@/frontend/components/ui/badge";

export const metadata: Metadata = {
  title: "Community",
  robots: { index: false, follow: false },
};

const CATEGORIES = [
  { value: "", label: "All" },
  { value: "general", label: "General" },
  { value: "wins", label: "Wins" },
  { value: "questions", label: "Questions" },
  { value: "resources", label: "Resources" },
];

export default async function CommunityPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  await requireUser();
  const { category } = await searchParams;
  const posts = await getCommunityFeed({ category: category || undefined });

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-extrabold tracking-tight">Community</h1>
        <p className="text-sm text-[var(--color-muted-foreground)]">
          Ask questions, share what worked, help each other out.
        </p>
      </header>

      <NewPostForm action={createPostAction} />

      <nav aria-label="Filter by category" className="flex flex-wrap gap-1">
        {CATEGORIES.map((c) => (
          <Link
            key={c.value || "all"}
            href={c.value ? `/dashboard/community?category=${c.value}` : "/dashboard/community"}
            aria-current={(category ?? "") === c.value ? "page" : undefined}
            className={
              (category ?? "") === c.value
                ? "rounded-[var(--radius-control)] bg-[var(--color-primary)] px-3 py-2 text-sm font-semibold text-[var(--color-on-primary)]"
                : "rounded-[var(--radius-control)] px-3 py-2 text-sm font-medium text-[var(--color-muted-foreground)] hover:bg-[var(--color-muted)]"
            }
          >
            {c.label}
          </Link>
        ))}
      </nav>

      {posts.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-[var(--radius-card)] border border-dashed border-[var(--color-border)] bg-[var(--color-card)] px-6 py-16 text-center">
          <Users
            className="size-8 text-[var(--color-muted-foreground)]"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <h2 className="text-lg font-bold">No posts yet</h2>
          <p className="max-w-sm text-sm text-[var(--color-muted-foreground)]">
            Be the first to start a conversation.
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {posts.map((p) => (
            <li
              key={p.id}
              className="group relative flex flex-col gap-2 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-4 transition-shadow hover:shadow-[var(--shadow-card)]"
            >
              <div className="flex flex-wrap items-center gap-2">
                {p.isPinned && (
                  <Badge tone="primary">
                    <Pin className="size-3" strokeWidth={2} aria-hidden="true" />
                    Pinned
                  </Badge>
                )}
                {p.isLocked && (
                  <Badge tone="neutral">
                    <Lock className="size-3" strokeWidth={2} aria-hidden="true" />
                    Locked
                  </Badge>
                )}
                <Badge tone="neutral" className="capitalize">
                  {p.category}
                </Badge>
              </div>

              <h2 className="font-bold leading-snug">
                <Link
                  href={`/dashboard/community/${p.id}`}
                  className="after:absolute after:inset-0"
                >
                  {p.title}
                </Link>
              </h2>

              <p className="line-clamp-2 text-sm leading-relaxed text-[var(--color-muted-foreground)]">
                {p.body}
              </p>

              <div className="flex items-center gap-3 text-xs text-[var(--color-muted-foreground)]">
                <span className="font-medium">{p.authorName ?? "Someone"}</span>
                <span>
                  {p.createdAt.toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquare className="size-3" strokeWidth={1.5} aria-hidden="true" />
                  <span className="tabular">{p.commentCount}</span>
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
