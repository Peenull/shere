import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import Director from "@/components/Director";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shere - Share, Earn, Repeat",
  description: "Join the Shere network to earn rewards by sharing and growing your connections. The easiest way to monetize your network.",
  openGraph: {
    title: "Shere - Share, Earn, Repeat",
    description: "The easiest way to monetize your network.",
    url: "https://shere-pi.vercel.app", // Replace with your actual domain
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
    title: "Shere - Share, Earn, Repeat",
    description: "The easiest way to monetize your network.",
    images: ["/opengraph-image.png"], 
  },
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-950`}>
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
