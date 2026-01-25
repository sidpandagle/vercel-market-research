import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Healthcare Foresights | Industry Reports & Insights",
    template: "%s | Healthcare Foresights",
  },
  description: "Access comprehensive healthcare research reports, industry analysis, and expert insights on digital health, pharmaceuticals, medical devices, and emerging healthcare technologies.",
  keywords: ["healthcare research", "medical industry reports", "healthcare analytics", "pharmaceutical research", "digital health trends", "medical devices market"],
  authors: [{ name: "Healthcare Foresights Team" }],
  icons: {
    icon: "/assets/images/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Healthcare Foresights",
    title: "Healthcare Foresights | Industry Reports & Insights",
    description: "Access comprehensive healthcare research reports, industry analysis, and expert insights.",
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
