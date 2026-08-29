"use server";

import { requireUser } from "@/backend/lib/permissions";
import { authorizeLessonPlayback } from "@/backend/lib/permissions";
import { saveProgress } from "@/backend/services/playback";

/**
 * Records how far through a lesson someone is.
 *
 * Re-checks entitlement rather than trusting the caller: this is a public
 * endpoint like every Server Action, and without the check anyone could write
 * progress rows against lessons they never bought.
 */
export async function saveProgressAction(input: {
  lessonId: string;
  positionSeconds: number;
  completed: boolean;
}): Promise<{ ok: boolean }> {
  const user = await requireUser();

  const auth = await authorizeLessonPlayback(input.lessonId);
  if (!auth.allowed) return { ok: false };

  if (!Number.isFinite(input.positionSeconds) || input.positionSeconds < 0) {
    return { ok: false };
  }

  await saveProgress({
    userId: user.id,
    lessonId: input.lessonId,
    positionSeconds: input.positionSeconds,
    completed: input.completed,
  });

  return { ok: true };
}
