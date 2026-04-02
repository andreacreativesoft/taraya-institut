import type { NextConfig } from "next";

// Limit build workers to avoid CPU spikes on shared hosting
process.env.NEXT_BUILD_WORKER_COUNT ??= "2";

const securityHeaders = [
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Scripts: self + GTM + Facebook Pixel + inline (Next.js needs unsafe-inline for hydration)
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://connect.facebook.net",
      // Styles: self + inline (Tailwind/Next.js injects inline styles)
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // Fonts
      "font-src 'self' https://fonts.gstatic.com",
      // Images: self + Vercel Blob + data URIs + FB Pixel noscript
      "img-src 'self' data: blob: https://*.vercel-storage.com https://www.googletagmanager.com https://www.facebook.com",
      // Connect: self + GTM + Facebook Pixel
      "connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://www.facebook.com https://connect.facebook.net",
      // Frames: GTM noscript iframe
      "frame-src https://www.googletagmanager.com",
      // Everything else blocked
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
