import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { StructuredData, generateOrganizationSchema, generateWebSiteSchema, generateLocalBusinessSchema } from "@/components/seo/StructuredData";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.synapticresearch.com'),
  title: {
    default: "Synaptic Research | Healthcare Market Insights & Research Reports",
    template: "%s | Synaptic Research",
  },
  description: "Synaptic Research delivers trusted healthcare market research, industry insights, trends, forecasts, and data-driven analysis across global healthcare sectors.",
  keywords: ["synaptic research", "healthcare market research", "healthcare insights", "healthcare industry trends", "medical market analysis", "healthcare reports"],
  authors: [{ name: "Synaptic Research Team" }],
  icons: {
    icon: "/assets/images/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Synaptic Research",
    title: "Synaptic Research | Healthcare Market Insights & Research Reports",
    description: "Synaptic Research delivers trusted healthcare market research, industry insights, trends, forecasts, and data-driven analysis across global healthcare sectors.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
  twitter: {
    card: 'summary_large_image',
    site: '@SynapticResearch',
    creator: '@SynapticResearch',
  },
  alternates: {
    canonical: '/',
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
        <StructuredData data={generateOrganizationSchema()} />
        <StructuredData data={generateWebSiteSchema()} />
        <StructuredData data={generateLocalBusinessSchema()} />
        {/* Google Translate: define callback before the loader script runs */}
        <Script
          id="google-translate-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.googleTranslateElementInit = function() {
                new google.translate.TranslateElement(
                  { pageLanguage: 'en', autoDisplay: false },
                  'google_translate_element'
                );
                var _gtBannerInterval = setInterval(function() {
                  var banner = document.querySelector('iframe.goog-te-banner-frame');
                  if (banner) {
                    banner.style.display = 'none';
                    document.body.style.top = '0px';
                    clearInterval(_gtBannerInterval);
                  }
                }, 200);
                setTimeout(function() { clearInterval(_gtBannerInterval); }, 5000);
              };
            `,
          }}
        />
        <Script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${dmSans.variable} ${playfair.variable} antialiased`}>
        <div id="google_translate_element" className="hidden" />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
      <GoogleAnalytics gaId="G-NJ1DNL58KB" />
    </html>
  );
}
