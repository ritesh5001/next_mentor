import type { NextConfig } from "next";

const r2Host = (() => {
  try {
    return process.env.NEXT_PUBLIC_R2_PUBLIC_URL
      ? new URL(process.env.NEXT_PUBLIC_R2_PUBLIC_URL).hostname
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
      ...(r2Host ? [{ protocol: "https" as const, hostname: r2Host }] : []),
      // Cloudflare Stream thumbnails.
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
