import type { Metadata } from "next";
import { business, metadataConfig, siteUrl } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: metadataConfig.title,
  description: metadataConfig.description,
  keywords: [...metadataConfig.keywords],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: metadataConfig.openGraph.title,
    description: metadataConfig.openGraph.description,
    url: siteUrl,
    siteName: metadataConfig.openGraph.siteName,
    locale: metadataConfig.openGraph.locale,
    type: "website",
  },
  applicationName: business.name,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="bg-stone-50 font-sans text-stone-900 antialiased">{children}</body>
    </html>
  );
}
