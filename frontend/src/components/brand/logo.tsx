import Image from "next/image";

/**
 * NextMentor logo.
 *
 * The supplied artwork itself, cropped to its bounding box with the white
 * plate knocked out — not the hand-traced SVG that used to live here, which
 * only approximated it (and carried gradients the brand has since dropped).
 *
 * Two files rather than one recolourable vector: the wordmark is near-black,
 * which disappears on the dark footer, so `inverted` swaps in a copy whose
 * wordmark is painted white. The mark keeps its colours in both.
 *
 * Sized 844×200 so a 36px-tall render still has headroom on a 3x screen;
 * next/image serves a downscaled AVIF/WebP from there.
 */
export function Logo({
  className = "",
  /** Use the white-wordmark artwork, for dark backgrounds. */
  inverted = false,
}: {
  className?: string;
  inverted?: boolean;
}) {
  return (
    <Image
      src={inverted ? "/logo-inverted.png" : "/logo.png"}
      alt="NextMentor"
      width={844}
      height={200}
      // Eager, not lazy: this sits in the header on every page, and a logo
      // that fades in after paint reads as a broken site.
      loading="eager"
      className={className}
    />
  );
}
