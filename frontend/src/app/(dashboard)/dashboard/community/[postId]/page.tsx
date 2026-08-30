import type { Metadata } from "next";
import { formatDate, formatDateTime } from "@/lib/format";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Lock, Pin } from "lucide-react";

import { ReplyForm } from "@/components/dashboard/community-forms";
import { ActionButton } from "@/components/admin/row-actions";
import { Badge } from "@/components/ui/badge";
import { getPostWithComments, requireUser } from "@/lib/queries";
import { createCommentAction, hidePostAction, setPostLockedAction, setPostPinnedAction } from "@/actions";

export const metadata: Metadata = {
  title: "Post",
  robots: { index: false, follow: false },
};

export default async function PostPage({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const user = await requireUser();
  const { postId } = await params;

  const data = await getPostWithComments(postId);
  if (!data) notFound();

  const { post, comments } = data;
  const isAdmin = user.role === "admin";
  const isAuthor = post.authorId === user.id;

  return (
    <div className="flex max-w-3xl flex-col gap-6">
      <Link
        href="/dashboard/community"
        className="inline-flex w-fit items-center gap-1 text-sm font-medium text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-foreground)]"
      >
        <ChevronLeft className="size-4" strokeWidth={1.5} aria-hidden="true" />
        Community
      </Link>

      <article className="flex flex-col gap-4 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-6">
        <div className="flex flex-wrap items-center gap-2">
          {post.isPinned && (
            <Badge tone="primary">
              <Pin className="size-3" strokeWidth={2} aria-hidden="true" />
              Pinned
            </Badge>
          )}
          {post.isLocked && (
            <Badge tone="neutral">
              <Lock className="size-3" strokeWidth={2} aria-hidden="true" />
              Locked
            </Badge>
          )}
          <Badge tone="neutral" className="capitalize">
            {post.category}
          </Badge>
        </div>

        <h1 className="text-2xl font-extrabold leading-snug tracking-tight">{post.title}</h1>

        <div className="flex items-center gap-2 text-xs text-[var(--color-muted-foreground)]">
          <span className="font-medium">{post.authorName ?? "Someone"}</span>
          <span>
            {formatDate(post.createdAt, {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>

        {/* whitespace-pre-line preserves the author's paragraphing without
            rendering their input as HTML — user text is never trusted markup. */}
        <div className="whitespace-pre-line text-[15px] leading-relaxed">{post.body}</div>

        {(isAuthor || isAdmin) && (
          <div className="flex flex-wrap gap-2 border-t border-[var(--color-border)] pt-4">
            <ActionButton
              label="Remove post"
              variant="danger"
              confirm="Remove this post? Replies stay visible but the post is hidden."
              run={async () => {
                "use server";
                return hidePostAction(postId);
              }}
            />
            {isAdmin && (
              <>
                <ActionButton
                  label={post.isPinned ? "Unpin" : "Pin"}
                  run={async () => {
                    "use server";
                    return setPostPinnedAction(postId, !post.isPinned);
                  }}
                />
                <ActionButton
                  label={post.isLocked ? "Unlock thread" : "Lock thread"}
                  run={async () => {
                    "use server";
                    return setPostLockedAction(postId, !post.isLocked);
                  }}
                />
              </>
            )}
          </div>
        )}
      </article>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-bold tracking-tight">
          {comments.length} {comments.length === 1 ? "reply" : "replies"}
        </h2>

        {comments.length > 0 && (
          <ul className="flex flex-col gap-3">
            {comments.map((c) => (
              <li
                key={c.id}
                className="flex flex-col gap-2 rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-4"
              >
                <div className="flex items-center gap-2 text-xs text-[var(--color-muted-foreground)]">
                  <span className="font-semibold text-[var(--color-foreground)]">
                    {c.authorName ?? "Someone"}
                  </span>
                  <span>
                    {formatDate(c.createdAt, {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="whitespace-pre-line text-sm leading-relaxed">{c.body}</div>
              </li>
            ))}
          </ul>
        )}

        {post.isLocked ? (
          <p className="rounded-[var(--radius-card)] border border-dashed border-[var(--color-border)] px-4 py-6 text-center text-sm text-[var(--color-muted-foreground)]">
            This thread is locked. No new replies can be added.
          </p>
        ) : (
          <div className="rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-card)] p-5">
            <ReplyForm action={createCommentAction} postId={postId} />
          </div>
        )}
      </section>
    </div>
  );
}
