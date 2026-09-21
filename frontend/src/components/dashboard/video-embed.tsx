import { ExternalLink } from "lucide-react";

/** The video id of a YouTube watch, short or Shorts link; null otherwise. */
function youtubeId(url: string): string | null {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\.|^m\./, "");
    if (host === "youtu.be") return u.pathname.slice(1).split("/")[0] || null;
    if (host === "youtube.com" || host === "youtube-nocookie.com") {
      if (u.searchParams.get("v")) return u.searchParams.get("v");
      const m = u.pathname.match(/^\/(?:embed|shorts|live)\/([\w-]{6,})/);
      return m?.[1] ?? null;
    }
  } catch {
    // Not a URL at all; fall through to the plain link.
  }
  return null;
}

/**
 * Plays a video from whichever source the admin gave: an uploaded file
 * (played natively), a YouTube link (embedded, privacy-enhanced domain), or
 * any other link (opened in a new tab — Drive and Instagram refuse embedding).
 */
export function VideoEmbed({
  src,
  url,
  title,
}: {
  /** A playable file URL — uploaded video, already signed if private. */
  src?: string | null;
  /** An external link, e.g. YouTube or Google Drive. */
  url?: string | null;
  title: string;
}) {
  if (src) {
    return (
      <video
        src={src}
        controls
        preload="metadata"
        playsInline
        className="aspect-video w-full rounded-[14px] bg-black"
      >
        <track kind="captions" />
      </video>
    );
  }

  if (url) {
    const id = youtubeId(url);
    if (id) {
      return (
        <div className="aspect-video w-full overflow-hidden rounded-[14px] bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}`}
            title={title}
            loading="lazy"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="size-full"
          />
        </div>
      );
    }
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-11 w-fit items-center gap-2 rounded-full bg-[var(--brand-blue)] px-5 text-sm font-semibold text-white"
      >
        <ExternalLink className="size-4" strokeWidth={1.8} aria-hidden="true" />
        Watch video
      </a>
    );
  }

  return null;
}
