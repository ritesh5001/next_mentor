/**
 * In-process cache with tag invalidation.
 *
 * Replaces Next's `unstable_cache` / `revalidateTag`, which do not exist
 * outside Next.js. The API is deliberately the same shape so the call sites in
 * services/ read as they did before.
 *
 * This is per-process. On a single Render web service that is exactly right.
 * If you ever scale to multiple instances, a publish on one will not invalidate
 * the others until their TTL lapses — at which point swap the Map for Redis.
 * TTLs are short enough (1 hour) that the window is bounded either way.
 */

type Entry = { value: unknown; expiresAt: number; tags: string[] };

const store = new Map<string, Entry>();

/**
 * Wraps a loader so repeat calls inside the TTL are served from memory.
 *
 * Argument order mirrors Next's `unstable_cache(fn, keyParts, options)` so the
 * call sites read the same as they did before the split.
 */
export function cached<T>(
  loader: () => Promise<T>,
  key: string,
  options: { tags?: string[]; ttlSeconds?: number } = {},
): () => Promise<T> {
  const ttl = (options.ttlSeconds ?? 3600) * 1000;
  const tags = options.tags ?? [];

  return async () => {
    const hit = store.get(key);
    if (hit && hit.expiresAt > Date.now()) return hit.value as T;

    const value = await loader();
    store.set(key, { value, expiresAt: Date.now() + ttl, tags });
    return value;
  };
}

/** Drops every entry carrying this tag. */
export function invalidateTag(tag: string): number {
  let dropped = 0;
  for (const [key, entry] of store) {
    if (entry.tags.includes(tag)) {
      store.delete(key);
      dropped++;
    }
  }
  return dropped;
}

export function invalidateAll(): void {
  store.clear();
}
