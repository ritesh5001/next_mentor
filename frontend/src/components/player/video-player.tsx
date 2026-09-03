"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { AlertCircle } from "lucide-react";

type Props = {
  manifestUrl: string;
  lessonId: string;
  startAtSeconds: number;
  onProgress: (input: {
    lessonId: string;
    positionSeconds: number;
    completed: boolean;
  }) => Promise<{ ok: boolean }>;
  onCompleted?: () => void;
};

/** Post progress at most this often. */
const SAVE_INTERVAL_MS = 15_000;
/** Watched this fraction of the video counts as done. */
const COMPLETE_AT = 0.95;

export function VideoPlayer({
  manifestUrl,
  lessonId,
  startAtSeconds,
  onProgress,
  onCompleted,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);

  // Refs, not state: these are read inside timers and event handlers where a
  // stale closure would silently post the wrong position.
  const lastSavedRef = useRef(0);
  const completedRef = useRef(false);

  const save = useCallback(
    async (completed: boolean) => {
      const video = videoRef.current;
      if (!video || !Number.isFinite(video.currentTime)) return;

      const position = Math.floor(video.currentTime);
      if (!completed && Math.abs(position - lastSavedRef.current) < 5) return;

      lastSavedRef.current = position;
      try {
        await onProgress({ lessonId, positionSeconds: position, completed });
        if (completed && !completedRef.current) {
          completedRef.current = true;
          onCompleted?.();
        }
      } catch {
        // Progress is best-effort. Losing a tick is not worth interrupting
        // playback with an error.
      }
    },
    [lessonId, onProgress, onCompleted],
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    setError(null);
    completedRef.current = false;
    lastSavedRef.current = startAtSeconds;

    // R2 serves the stored file directly over HTTP, so this is a plain <video>
    // source rather than an HLS manifest. hls.js is gone with it.
    //
    // What that costs, stated plainly: one rendition per lesson. There is no
    // transcode step behind R2, so a viewer on a weak connection buffers
    // instead of dropping to a lower quality. R2 does honour range requests,
    // so seeking still works without downloading the whole file.
    video.src = manifestUrl;

    const onVideoError = () => {
      const code = video.error?.code;
      // MEDIA_ERR_SRC_NOT_SUPPORTED is what a browser reports when a presigned
      // URL has expired and R2 answers with XML instead of video bytes.
      if (code === MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED) {
        setError("Your viewing session expired. Refresh the page to continue.");
        return;
      }
      if (code === MediaError.MEDIA_ERR_NETWORK) {
        setError("The video could not be loaded. Check your connection and try again.");
        return;
      }
      if (code === MediaError.MEDIA_ERR_DECODE) {
        setError("This video could not be played. It may not be in a supported format.");
        return;
      }
      setError("The video could not be loaded. Try again.");
    };

    video.addEventListener("error", onVideoError);

    return () => {
      video.removeEventListener("error", onVideoError);
    };
  }, [manifestUrl, startAtSeconds]);

  // Resume where they left off, but never within the last 15s — dropping
  // someone straight onto the end card is worse than restarting the tail.
  const handleLoadedMetadata = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (startAtSeconds > 0 && startAtSeconds < video.duration - 15) {
      video.currentTime = startAtSeconds;
    }
  }, [startAtSeconds]);

  useEffect(() => {
    const id = setInterval(() => {
      const video = videoRef.current;
      if (video && !video.paused) void save(false);
    }, SAVE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [save]);

  // Closing the tab mid-lesson should not lose the position. `pagehide` fires
  // in cases `beforeunload` does not, notably on iOS.
  useEffect(() => {
    const flush = () => void save(false);
    window.addEventListener("pagehide", flush);
    document.addEventListener("visibilitychange", flush);
    return () => {
      window.removeEventListener("pagehide", flush);
      document.removeEventListener("visibilitychange", flush);
    };
  }, [save]);

  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (!video || completedRef.current || !video.duration) return;
    if (video.currentTime / video.duration >= COMPLETE_AT) void save(true);
  }, [save]);

  return (
    <div className="relative w-full overflow-hidden rounded-[var(--radius-card)] bg-black">
      {/* aspect-video reserves the box before metadata loads, so the page does
          not jump when the video appears — this is the biggest CLS risk here. */}
      <video
        ref={videoRef}
        controls
        playsInline
        preload="metadata"
        className="aspect-video w-full"
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onPause={() => void save(false)}
        onEnded={() => void save(true)}
      />

      {error && (
        <div
          role="alert"
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/85 px-6 text-center"
        >
          <AlertCircle className="size-8 text-white" strokeWidth={1.5} aria-hidden="true" />
          <p className="max-w-sm text-sm font-medium text-white">{error}</p>
        </div>
      )}
    </div>
  );
}
