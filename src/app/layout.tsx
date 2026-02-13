import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import Director from "@/components/Director";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export const metadata: Metadata = {
  title: "Shere: Sharing is Earning",
  description:
    "Join the Shere network to earn rewards by sharing and growing your connections. The easiest way to monetize your network.",
  other: {
    "google-adsense-account": "ca-pub-4173165508132580",
  },
  openGraph: {
    title: "Shere: Sharing is Earning",
    description: "The easiest way to monetize your network.",
    url: "https://shere-ltd.vercel.app", // Replace with your actual domain
    siteName: "Shere",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shere: Sharing is Earning",
    description: "The easiest way to monetize your network.",
    images: ["/opengraph-image.png"],
  },
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={`bg-slate-950`}>
        {process.env.NODE_ENV === "production" && (
          <GoogleAnalytics measurementId="G-TS664CZ977" />
        )}
        <Director>
          <AuthProvider>
            <main>{children}</main>
            <Footer />
          </AuthProvider>
        </Director>
      </body>
    </html>
  );
}
