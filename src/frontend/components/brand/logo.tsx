/**
 * NextMentor wordmark.
 *
 * Rebuilt as SVG from the supplied raster: mortarboard, rising arrow forming
 * the "M", and the two-tone wordmark. Vector so it stays crisp at any size,
 * weighs ~2KB, and can pick up theme colours.
 *
 * To use the original raster instead, drop it at public/logo.png and swap the
 * <svg> for <Image src="/logo.png" … />.
 */
export function Logo({
  className = "",
  showWordmark = true,
  /** Wordmark colour on dark backgrounds. */
  inverted = false,
}: {
  className?: string;
  showWordmark?: boolean;
  inverted?: boolean;
}) {
  const uid = showWordmark ? "full" : "mark";

  return (
    <svg
      viewBox={showWordmark ? "0 0 260 56" : "0 0 64 56"}
      className={className}
      role="img"
      aria-label="NextMentor"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`nm-cap-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2E6FD4" />
          <stop offset="55%" stopColor="#1B3FA0" />
          <stop offset="100%" stopColor="#101A47" />
        </linearGradient>
        <linearGradient id={`nm-bar-${uid}`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#101A47" />
          <stop offset="100%" stopColor="#2653C4" />
        </linearGradient>
        <linearGradient id={`nm-arrow-${uid}`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#12A150" />
          <stop offset="60%" stopColor="#22C55E" />
          <stop offset="100%" stopColor="#3DDC72" />
        </linearGradient>
      </defs>

      {/* The two uprights of the M, rendered as chart bars. */}
      <path d="M14 54V30l9-6v30h-9Z" fill={`url(#nm-bar-${uid})`} />
      <path d="M41 54V22l9 7v25h-9Z" fill={`url(#nm-bar-${uid})`} />

      {/* Rising arrow — the growth line through the M. */}
      <path
        d="M2 50c8-2 13-9 18-17 4-6 7-11 11-16l8 9 12-16-3-1 8-2 1 8-3-2-14 19-8-9c-4 5-7 10-11 16-6 9-11 15-19 17l-1-6Z"
        fill={`url(#nm-arrow-${uid})`}
      />
      <path d="M58 4 44 24l-7-8-4 5 11 13L61 9l3 2-1-9-8 2 3 1Z" fill={`url(#nm-arrow-${uid})`} />

      {/* Mortarboard. */}
      <path d="M10 14 28 6l18 8-18 8-18-8Z" fill={`url(#nm-cap-${uid})`} />
      <path
        d="M17 17v7c0 3 5 5 11 5s11-2 11-5v-7l-11 5-11-5Z"
        fill={`url(#nm-cap-${uid})`}
        opacity="0.92"
      />
      {/* Tassel. */}
      <path d="M10 14v9" stroke="#101A47" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="10" cy="26" r="3" fill="#101A47" />

      {showWordmark && (
        <g>
          <text
            x="74"
            y="37"
            fontFamily="var(--font-sans), system-ui, sans-serif"
            fontSize="26"
            fontWeight="800"
            letterSpacing="-0.5"
            fill="#1B3FA0"
          >
            NEXT
          </text>
          <text
            x="136"
            y="37"
            fontFamily="var(--font-sans), system-ui, sans-serif"
            fontSize="26"
            fontWeight="800"
            letterSpacing="-0.5"
            fill={inverted ? "#FFFFFF" : "#101A47"}
          >
            MENTOR
          </text>
        </g>
      )}
    </svg>
  );
}
