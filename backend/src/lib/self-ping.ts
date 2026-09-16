/**
 * Keeps the Render free-tier instance from idling out.
 *
 * Render's free web services spin down after 15 minutes with no inbound
 * request through their edge/proxy layer. A timer that calls `/health` on
 * `localhost` from inside the same process does NOT count — it never touches
 * Render's routing, so the idle clock keeps running. The request has to go
 * out to the public internet and back in through the service's real URL, the
 * same path a browser would take.
 *
 * No external scheduler, no third-party uptime service: this is a plain
 * `setInterval` in the same process that already answers `/health`.
 *
 * Render injects RENDER_EXTERNAL_URL for every web service, so nothing extra
 * needs configuring there. SELF_PING_URL only exists to override it — for
 * pinging a different environment's URL, say.
 */
export function startSelfPing(): void {
  const url = process.env.SELF_PING_URL || process.env.RENDER_EXTERNAL_URL;

  // Only meaningful on the platform whose free tier actually does this, and
  // only once a public URL is known. Guarding on RENDER also keeps this
  // silent during local dev and tests, where nothing should be pinging out.
  if (!process.env.RENDER || !url) return;

  const target = `${url.replace(/\/+$/, "")}/health`;
  const intervalMs = 12 * 60 * 1000;

  setInterval(() => {
    fetch(target, { signal: AbortSignal.timeout(10_000) })
      .then((res) => {
        if (!res.ok) console.warn(`[self-ping] ${target} responded ${res.status}`);
      })
      .catch((err) => {
        // A dropped ping is not fatal — the next one is 12 minutes away,
        // well inside the 15-minute window — so this only logs.
        console.warn("[self-ping] request failed", err instanceof Error ? err.message : err);
      });
  }, intervalMs).unref();

  console.info(`[self-ping] pinging ${target} every ${intervalMs / 60_000} minutes`);
}
