"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  AlertCircle,
  Loader2,
  Maximize,
  Minimize,
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
} from "lucide-react";

import { cn } from "@/lib/cn";

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

  /* ------------------------------------------------------------- controls */

  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [rate, setRate] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);

  const shellRef = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showControls = useCallback(() => {
    setControlsVisible(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    // Only hide while actually playing. Controls that vanish over a paused
    // video look like the player broke.
    hideTimer.current = setTimeout(() => {
      if (videoRef.current && !videoRef.current.paused) setControlsVisible(false);
    }, 2600);
  }, []);

  const toggle = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) void v.play();
    else v.pause();
    showControls();
  }, [showControls]);

  const seekBy = useCallback((delta: number) => {
    const v = videoRef.current;
    if (!v || !Number.isFinite(v.duration)) return;
    v.currentTime = Math.min(Math.max(0, v.currentTime + delta), v.duration);
  }, []);

  const toggleFullscreen = useCallback(async () => {
    const shell = shellRef.current;
    if (!shell) return;
    if (document.fullscreenElement) await document.exitFullscreen();
    else await shell.requestFullscreen().catch(() => {});
  }, []);

  useEffect(() => {
    const onFs = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  // Keyboard control, scoped to the player rather than the window so typing in
  // a comment box elsewhere on the page cannot pause the lesson.
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const v = videoRef.current;
      if (!v) return;
      const keys = [" ", "k", "j", "l", "m", "f", "ArrowLeft", "ArrowRight"];
      if (!keys.includes(e.key)) return;
      e.preventDefault();

      if (e.key === " " || e.key === "k") toggle();
      else if (e.key === "ArrowLeft" || e.key === "j") seekBy(-10);
      else if (e.key === "ArrowRight" || e.key === "l") seekBy(10);
      else if (e.key === "m") { v.muted = !v.muted; setMuted(v.muted); }
      else if (e.key === "f") void toggleFullscreen();
      showControls();
    },
    [toggle, seekBy, toggleFullscreen, showControls],
  );

  const pct = duration > 0 ? (current / duration) * 100 : 0;
  const bufferedPct = duration > 0 ? (buffered / duration) * 100 : 0;

  return (
    <div
      ref={shellRef}
      onMouseMove={showControls}
      onMouseLeave={() => playing && setControlsVisible(false)}
      onKeyDown={onKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Lesson video"
      className="group relative w-full overflow-hidden rounded-[var(--radius-card)] bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-blue)]"
    >
      {/* aspect-video reserves the box before metadata loads, so the page does
          not jump when the video appears — this is the biggest CLS risk here. */}
      <video
        ref={videoRef}
        playsInline
        preload="metadata"
        // No `controls`. The native menu carries a Download item, which on a
        // paid lesson is the product walking out of the door. See the note in
        // the header comment about what this does and does not prevent.
        controlsList="nodownload noremoteplayback"
        disablePictureInPicture
        onContextMenu={(e) => e.preventDefault()}
        className="aspect-video w-full"
        onClick={toggle}
        onLoadedMetadata={(e) => {
          handleLoadedMetadata();
          setDuration(e.currentTarget.duration || 0);
        }}
        onTimeUpdate={(e) => {
          handleTimeUpdate();
          setCurrent(e.currentTarget.currentTime);
          const b = e.currentTarget.buffered;
          if (b.length > 0) setBuffered(b.end(b.length - 1));
        }}
        onPlay={() => { setPlaying(true); showControls(); }}
        onPause={() => { setPlaying(false); setControlsVisible(true); void save(false); }}
        onWaiting={() => setWaiting(true)}
        onPlaying={() => setWaiting(false)}
        onVolumeChange={(e) => {
          setMuted(e.currentTarget.muted);
          setVolume(e.currentTarget.volume);
        }}
        onEnded={() => { setPlaying(false); setControlsVisible(true); void save(true); }}
      />

      {waiting && !error && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <Loader2 className="size-10 animate-spin text-white/80" strokeWidth={1.5} aria-hidden="true" />
        </div>
      )}

      {/* A big centre affordance while paused, which is the one moment the
          viewer is looking for a way back in. */}
      {!playing && !waiting && !error && (
        <button
          type="button"
          onClick={toggle}
          aria-label="Play"
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="flex size-16 items-center justify-center rounded-full bg-black/55 backdrop-blur-sm transition-transform duration-200 hover:scale-105">
            <Play className="ml-1 size-7 text-white" strokeWidth={2} fill="currentColor" aria-hidden="true" />
          </span>
        </button>
      )}

      <div
        className={cn(
          "absolute inset-x-0 bottom-0 flex flex-col gap-1 bg-gradient-to-t from-black/85 via-black/50 to-transparent px-3 pb-2 pt-8 transition-opacity duration-200",
          controlsVisible || !playing ? "opacity-100" : "opacity-0",
        )}
      >
        <input
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={current}
          aria-label="Seek"
          onChange={(e) => {
            const v = videoRef.current;
            if (v) v.currentTime = Number(e.target.value);
          }}
          className="nm-seek h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/25"
          style={{
            background:
              `linear-gradient(to right, var(--brand-green) 0%, var(--brand-blue) ${pct}%, ` +
              `rgb(255 255 255 / 0.35) ${pct}%, rgb(255 255 255 / 0.35) ${bufferedPct}%, ` +
              `rgb(255 255 255 / 0.18) ${bufferedPct}%)`,
          }}
        />

        <div className="flex items-center gap-1 text-white">
          <IconButton label={playing ? "Pause" : "Play"} onClick={toggle}>
            {playing ? <Pause className="size-5" fill="currentColor" strokeWidth={0} /> : <Play className="size-5" fill="currentColor" strokeWidth={0} />}
          </IconButton>

          <IconButton label="Back 10 seconds" onClick={() => seekBy(-10)}>
            <RotateCcw className="size-[18px]" strokeWidth={2} />
          </IconButton>
          <IconButton label="Forward 10 seconds" onClick={() => seekBy(10)}>
            <RotateCw className="size-[18px]" strokeWidth={2} />
          </IconButton>

          <div className="group/vol flex items-center">
            <IconButton
              label={muted ? "Unmute" : "Mute"}
              onClick={() => {
                const v = videoRef.current;
                if (v) v.muted = !v.muted;
              }}
            >
              {muted || volume === 0 ? <VolumeX className="size-[18px]" strokeWidth={2} /> : <Volume2 className="size-[18px]" strokeWidth={2} />}
            </IconButton>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={muted ? 0 : volume}
              aria-label="Volume"
              onChange={(e) => {
                const v = videoRef.current;
                if (!v) return;
                v.volume = Number(e.target.value);
                v.muted = Number(e.target.value) === 0;
              }}
              className="h-1 w-0 cursor-pointer appearance-none rounded-full bg-white/30 opacity-0 transition-all duration-200 group-hover/vol:mr-2 group-hover/vol:w-16 group-hover/vol:opacity-100"
            />
          </div>

          <span className="tabular ml-1 select-none text-xs font-medium text-white/90">
            {fmt(current)} / {fmt(duration)}
          </span>

          <div className="ml-auto flex items-center gap-1">
            <select
              value={rate}
              aria-label="Playback speed"
              onChange={(e) => {
                const v = videoRef.current;
                const next = Number(e.target.value);
                if (v) v.playbackRate = next;
                setRate(next);
              }}
              className="min-h-9 cursor-pointer rounded-[var(--radius-control)] bg-white/12 px-2 text-xs font-semibold text-white outline-none hover:bg-white/20"
            >
              {[0.75, 1, 1.25, 1.5, 1.75, 2].map((r) => (
                <option key={r} value={r} className="text-black">
                  {r}x
                </option>
              ))}
            </select>

            <IconButton
              label={fullscreen ? "Exit full screen" : "Full screen"}
              onClick={() => void toggleFullscreen()}
            >
              {fullscreen ? <Minimize className="size-[18px]" strokeWidth={2} /> : <Maximize className="size-[18px]" strokeWidth={2} />}
            </IconButton>
          </div>
        </div>
      </div>

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

/** 44px hit area on a compact icon, per the touch-target rule. */
function IconButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="flex size-11 items-center justify-center rounded-[var(--radius-control)] text-white transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
    >
      {children}
    </button>
  );
}

function fmt(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}
