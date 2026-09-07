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

const siteUrl = "https://olayinka-olaniran.netlify.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Olayinka Olaniran — Frontend Engineer",
    template: "%s · Olayinka Olaniran",
  },
  description:
    "Frontend engineer building accessible, high-performance interfaces with vanilla JavaScript fundamentals done exceptionally well. 5 real projects, an interactive skill graph, and engineering notes on how each was built.",
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
  openGraph: {
    title: "Olayinka Olaniran — Frontend Engineer",
    description:
      "5 real projects, an interactive skill graph, and engineering notes on how each was built.",
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
    description:
      "5 real projects, an interactive skill graph, and engineering notes on how each was built.",
    images: ["/assets/images/og-preview.png"],
  },
  robots: { index: true, follow: true },
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
      <body className="min-h-full flex flex-col font-sans">
        <BackgroundFx />
        {children}
      </body>
    </html>
  );
}
