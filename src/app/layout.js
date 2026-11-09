import { Inter, Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SITE_URL } from "@/content/site";
import RevealObserver from "@/components/ui/RevealObserver";
import ClickTracker from "@/components/ui/ClickTracker";
import ConsentBanner from "@/components/layout/ConsentBanner";

// Self-hosted WOFF2, Latin subset, font-display: swap (spec §4, §9.7).
const montserrat = Montserrat({ subsets: ["latin"], weight: ["600", "700"], display: "swap", variable: "--font-montserrat" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], display: "swap", variable: "--font-inter", preload: false });

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Vehicle Tracking Company in Pakistan | Connexis", template: "%s | Connexis" },
  description:
    "GPS vehicle tracking, fleet management, fuel monitoring and AI dashcams for businesses. 150,000+ devices installed since 2015. Book a live demo.",
  applicationName: "Connexis",
  formatDetection: { telephone: false },
};

export const viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-PK" className={`${montserrat.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        {/* Marks JS as available so reveal animations never hide content for no-JS visitors */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied'});",
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <a href="#main" className="sr-only z-[100] rounded-md bg-ink-900 px-4 py-3 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
          Skip to content
        </a>
        {children}
        <RevealObserver />
        <ClickTracker />
        <ConsentBanner />
        {GTM_ID && (
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
          </Script>
        )}
      </body>
    </html>
  );
}
