import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BackgroundFx from "@/components/ui/BackgroundFx";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Resolved at build time. Production sets `NEXT_PUBLIC_SITE_URL` to
// the canonical domain; preview deploys fall back to the dev URL so
// the OG image, canonical, and structured data all point at the
// site that actually serves them — without this, the dev deploy
// emitted tags pointing at the production domain, and link-preview
// crawlers refused the image as "cross-origin" (a common cause of
// the "og:image is broken or unreachable" SEO-audit finding).
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://dev-olayinka-portfolio.netlify.app";

// ≤ 160 chars (Google's SERP limit) — the old 218-char copy was
// being truncated mid-word in search results.
const description =
  "Frontend engineer building accessible, fast interfaces with vanilla JavaScript fundamentals. 5 real projects with engineering notes.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Olayinka Olaniran — Frontend Engineer",
    template: "%s · Olayinka Olaniran",
  },
  description,
  keywords: [
    "Olayinka Olaniran",
    "Frontend Developer",
    "JavaScript",
    "React",
    "Next.js",
    "Portfolio",
    "Web Development",
    "vanilla JavaScript",
    "web developer portfolio",
    "SIWES",
    "Nigeria frontend developer",
  ],
  authors: [{ name: "Olayinka Olaniran" }],
  creator: "Olayinka Olaniran",
  // Set explicitly so search engines don't have to infer it from
  // the URL. Without this, multiple deploy URLs (production +
  // preview) can be treated as duplicate content.
  alternates: {
    canonical: "/",
  },
  // Web App Manifest enables "Add to Home Screen" on Android
  // and gives the site PWA-grade identity. Next 16 doesn't
  // auto-link a `public/site.webmanifest`, so we declare it
  // here. The site icon is `app/icon.png` (180×180 brand mark);
  // explicit `icons` below wire it into the right slots — see
  // that block for why each link has to be declared manually.
  manifest: "/site.webmanifest",
  // Icon wiring. The brand mark lives at `app/icon.png`. We
  // expose it in three sizes:
  //   - 32×32 / 16×16 PNG for browser tabs (modern browsers
  //     prefer crisp PNGs over the legacy .ico, especially on
  //     Chrome/Windows where the .ico is downsampled to 16×16
  //     and looks fuzzy on high-DPI displays);
  //   - the original 180×180 under `rel="apple-touch-icon"`
  //     for the iOS home screen. iOS only respects that exact
  //     rel — falling back to `rel="icon"` does NOT work for
  //     home-screen pinning, contrary to what the previous
  //     code comment claimed;
  //   - the existing `app/favicon.ico` (16+32 multires) as a
  //     final legacy fallback for very old browsers and RSS
  //     readers.
  // All four files reference the same source image; only the
  // size and the `<link rel>` slot change.
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "Olayinka Olaniran — Frontend Engineer",
    description,
    // `site_name` + `locale` are both required for the LinkedIn
    // / Discord / Slack scrapers to display the brand line and
    // pick the right language; without them, the link preview
    // falls back to the URL hostname.
    siteName: "Olayinka Olaniran",
    locale: "en_US",
    images: [
      {
        url: "/assets/images/og-preview.png",
        width: 1200,
        height: 630,
        alt: "Olayinka Olaniran — Frontend Engineer",
      },
    ],
    url: siteUrl,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Olayinka Olaniran — Frontend Engineer",
    description,
    // `@OlaniranOlayinka` is the X handle linked from the footer
    // and Contact section — pairing it here attributes shares to
    // the account and Twitter's card validator surfaces it under
    // the image as a byline.
    site: "@OlaniranOlayinka",
    creator: "@OlaniranOlayinka",
    // Same explicit object form as `openGraph.images` so Twitter
    // sees width/height/alt — the simple string form works for
    // some scrapers but Twitter's card validator sometimes
    // ignores it, leaving the card with no image.
    images: [
      {
        url: "/assets/images/og-preview.png",
        width: 1200,
        height: 630,
        alt: "Olayinka Olaniran — Frontend Engineer",
      },
    ],
  },
  robots: { index: true, follow: true },
};

// JSON-LD — emitted as a `<script type="application/ld+json">` in
// `<head>`. Drives Google rich results (knowledge panel, sitelinks
// search box) and gives crawlers a structured handle on the
// person/portfolio. Placed in layout (not page) so it ships with
// the prerendered HTML.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}#person`,
      name: "Olayinka Olaniran",
      url: siteUrl,
      jobTitle: "Frontend Engineer",
      description,
      sameAs: [
        "https://github.com/Olayinka-Olaniran",
        "https://www.linkedin.com/in/olayinka-olaniran-a2ba063a2",
        "https://x.com/OlaniranOlayinka",
      ],
      email: "mailto:oolaniran853@gmail.com",
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}#site`,
      url: siteUrl,
      name: "Olayinka Olaniran — Frontend Engineer",
      description,
      inLanguage: "en-US",
      publisher: { "@id": `${siteUrl}#person` },
    },
  ],
};

export const viewport: Viewport = {
  themeColor: "#050816",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          // `dangerouslySetInnerHTML` is the Next-idiomatic way to
          // embed a JSON-LD payload — the string is built at build
          // time from a static object so there's no XSS surface.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <BackgroundFx />
        {children}
      </body>
    </html>
  );
}
