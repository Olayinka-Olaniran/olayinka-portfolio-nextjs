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
  // here. The site icon is `app/icon.png` (Next's file-based
  // metadata convention auto-emits the favicon and
  // apple-touch-icon links from that single file).
  manifest: "/site.webmanifest",
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
