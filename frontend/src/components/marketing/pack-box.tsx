import { cn } from "@/lib/cn";

/**
 * Product-box art for a skill pack, drawn in CSS rather than shipped as an
 * image: it stays sharp at any size and the label always matches the pack.
 *
 * A real 3D box — a front face plus a spine turned 90° behind it — rotated so
 * the spine shows, the way boxed software is photographed.
 */
export function PackBox({
  label,
  band,
  width,
  className,
}: {
  label: string;
  band: string;
  /** Front-face width in px; height and depth scale from it. */
  width: number;
  className?: string;
}) {
  const height = Math.round(width * 1.36);
  const depth = Math.round(width * 0.2);
  // Long labels shrink to fit the face; short ones cap so "PRO" isn't huge.
  const titleSize = Math.min(width * 0.28, (width * 1.2) / label.length);

  return (
    <div
      className={cn("relative shrink-0", className)}
      style={{ width, height, perspective: width * 7 }}
      aria-hidden="true"
    >
      {/* Floor shadow, flat on the page rather than part of the 3D box. */}
      <div className="absolute -bottom-[6%] left-[8%] h-[8%] w-[92%] rounded-[50%] bg-black/45 blur-md" />

      <div
        className="relative h-full w-full [transform-style:preserve-3d]"
        style={{ transform: "rotateY(24deg) rotateX(3deg)" }}
      >
        {/* Spine */}
        <div
          className="absolute left-0 top-0 h-full origin-left bg-[linear-gradient(180deg,#1b1f22,#0e1012)]"
          style={{ width: depth, transform: "rotateY(90deg)" }}
        >
          <div className="absolute inset-x-0 bottom-[10%] h-[9%] bg-[#1f7a4f]" />
        </div>

        {/* Front face */}
        <div
          className="absolute inset-0 overflow-hidden rounded-[2px] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.06)]"
          style={{
            background:
              "repeating-linear-gradient(135deg, rgb(255 255 255 / 0.025) 0 2px, transparent 2px 9px), linear-gradient(160deg, #3a4045 0%, #25292d 55%, #1a1d20 100%)",
          }}
        >
          {/* Accent stripe */}
          <div className="absolute inset-y-0 right-[9%] w-[17%] bg-[linear-gradient(180deg,#5fd39a,#3aa874)] opacity-90" />

          <p
            className="absolute left-[9%] top-[8%] font-bold uppercase leading-[0.92] tracking-[-0.02em] text-white [text-shadow:0_2px_6px_rgb(0_0_0/0.4)]"
            style={{ fontSize: titleSize }}
          >
            {label}
          </p>

          {/* Bottom band */}
          <div className="absolute inset-x-0 bottom-[10%] flex h-[9%] items-center bg-[#2fa56b] pl-[9%]">
            <span
              className="truncate font-semibold text-white"
              style={{ fontSize: Math.max(7, width * 0.062) }}
            >
              {band}
            </span>
          </div>

          <span
            className="absolute bottom-[1.5%] right-[9%] w-[17%] text-center font-bold text-white/90"
            style={{ fontSize: width * 0.08 }}
          >
            NM
          </span>

          {/* Sheen */}
          <div className="absolute inset-0 bg-[linear-gradient(105deg,rgb(255_255_255/0.08)_0%,transparent_40%)]" />
        </div>
      </div>
    </div>
  );
}
