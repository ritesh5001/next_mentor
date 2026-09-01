import type { NextConfig } from "next";

/**
 * Host of the ImageKit delivery endpoint.
 *
 * next/image refuses to optimise any host not listed in remotePatterns, and
 * the failure is a broken image with a console warning rather than a build
 * error — so this is derived from the same env var the URLs are built from,
 * instead of being hard-coded and drifting.
 */
const imagekitHost = (() => {
  try {
    return process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT
      ? new URL(process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT).hostname
      : null;
  } catch {
    return null;
  }
})();

const nextConfig: NextConfig = {
  experimental: {
    // Required for forbidden() / unauthorized() in src/lib/permissions.ts.
    // Still behind a flag as of Next 16.3.
    authInterrupts: true,
  },

  images: {
    // AVIF first — roughly 20% smaller than WebP at equal quality, and it is
    // the LCP image on both the landing page and the catalog.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // ImageKit — everything except video.
      ...(imagekitHost ? [{ protocol: "https" as const, hostname: imagekitHost }] : []),
      // Default ImageKit host, so images still resolve before the env var is
      // set on a fresh deploy.
      { protocol: "https" as const, hostname: "ik.imagekit.io" },
      // Cloudflare Stream thumbnails — video only.
      { protocol: "https" as const, hostname: "customer-*.cloudflarestream.com" },
      { protocol: "https" as const, hostname: "videodelivery.net" },
      // Google OAuth avatars.
      { protocol: "https" as const, hostname: "lh3.googleusercontent.com" },
    ],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
