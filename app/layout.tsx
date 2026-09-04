import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Olayinka Olaniran | Frontend Developer",
  description: "5 real JavaScript projects, an interactive skill graph, and engineering notes on how each one was built.",
  keywords: [
    "Olayinka Olaniran", "Frontend Developer", "JavaScript",
    "React", "Next.js", "Portfolio", "Web Development",
   "vanilla JavaScript", "web developer portfolio", "SIWES", "Nigeria frontend developer"],
  openGraph: {
    title: "Olayinka Olaniran | Frontend Developer",
    description: "5 real JavaScript projects, an interactive skill graph, and engineering notes on how each one was built.",
    images: ["/assets/images/og-preview.png"],
    url: "https://olayinka-olaniran.netlify.app",
    type: "website",
  },
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
