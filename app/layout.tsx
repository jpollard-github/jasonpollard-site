import type { Metadata, Viewport } from "next";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { absoluteUrl, siteConfig } from "@/content/site-content";
import "./globals.css";

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", colorScheme: "light", themeColor: "#f4f1e9" };
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.title, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "en_US", url: "/", siteName: siteConfig.name, title: siteConfig.title, description: siteConfig.description, images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Jason Pollard — engineering difficult systems with judgment" }] },
  twitter: { card: "summary_large_image", title: siteConfig.title, description: siteConfig.description, images: ["/opengraph-image"] },
  robots: { index: true, follow: true },
};

const person = { "@context": "https://schema.org", "@type": "Person", name: siteConfig.name, url: siteConfig.url, email: `mailto:${siteConfig.email}`, jobTitle: "Staff / Principal Software Engineer and Solutions Architect", knowsAbout: ["Software architecture", "Legacy modernization", "AI-enabled engineering", "Cloud delivery", "Developer platforms"] };
const website = { "@context": "https://schema.org", "@type": "WebSite", name: siteConfig.name, url: siteConfig.url, description: siteConfig.description };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-scroll-behavior="smooth"><body><a className="skip-link" href="#main-content">Skip to main content</a><SiteHeader /><main id="main-content">{children}</main><SiteFooter /><JsonLd data={person} /><JsonLd data={website} /></body></html>;
}
