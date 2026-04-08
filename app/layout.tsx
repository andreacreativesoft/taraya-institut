import type { Metadata } from "next";
import { Quattrocento, Questrial } from "next/font/google";
import Script from "next/script";
import { getSettings } from "@/lib/settings";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    title: settings.meta_title || "Taraya Institut — Beauté & Bien-être",
    description: settings.meta_description || "Institut de beauté et bien-être pour femmes. Soins du visage, soins du corps, épilation et plus encore.",
    metadataBase: new URL("https://tarayainstitut.be"),
    icons: {
      icon: [
        { url: "/icon.svg", type: "image/svg+xml" },
        ...(settings.favicon_url ? [{ url: settings.favicon_url, type: "image/png" }] : []),
      ],
      apple: settings.favicon_url
        ? { url: settings.favicon_url, type: "image/png" }
        : { url: "/icon.svg", type: "image/svg+xml" },
      shortcut: settings.favicon_url || "/icon.svg",
    },
  };
}

const quattrocento = Quattrocento({
  variable: "--font-quattrocento",
  subsets: ["latin"],
  weight: "700",
});

const questrial = Questrial({
  variable: "--font-questrial",
  subsets: ["latin"],
  weight: "400",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();
  const GTM_REGEX      = /^GTM-[A-Z0-9]{1,10}$/;
  const FB_PIXEL_REGEX = /^\d{10,20}$/;
  const gtmId      = settings.gtm_id?.trim();
  const fbPixelId  = settings.facebook_pixel_id?.trim();
  const safeGtmId     = gtmId     && GTM_REGEX.test(gtmId)           ? gtmId     : null;
  const safeFbPixelId = fbPixelId && FB_PIXEL_REGEX.test(fbPixelId)  ? fbPixelId : null;

  return (
    <html
      lang="fr"
      className={`${quattrocento.variable} ${questrial.variable} antialiased`}
    >
      <body>
        {safeGtmId && (
          <>
            <Script
              id="gtm-script"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${safeGtmId}');`,
              }}
            />
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${safeGtmId}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
              />
            </noscript>
          </>
        )}
        {safeFbPixelId && (
          <>
            <Script id="fb-pixel" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html:
              `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${safeFbPixelId}');fbq('track','PageView');`
            }} />
            <noscript>
              <img height="1" width="1" style={{ display: "none" }}
                src={`https://www.facebook.com/tr?id=${safeFbPixelId}&ev=PageView&noscript=1`} alt="" />
            </noscript>
          </>
        )}
        {children}
      </body>
    </html>
  );
}
