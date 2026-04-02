import type { Metadata } from "next";
import { Quattrocento, Questrial } from "next/font/google";
import Script from "next/script";
import { getSettings } from "@/lib/settings";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Taraya Institut — Beauté & Bien-être",
  description:
    "Institut de beauté et bien-être pour femmes. Soins du visage, soins du corps, épilation et plus encore.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();
  const GTM_REGEX = /^GTM-[A-Z0-9]{1,10}$/;
  const gtmId = settings.gtm_id?.trim();
  const safeGtmId = gtmId && GTM_REGEX.test(gtmId) ? gtmId : null;

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
        {children}
      </body>
    </html>
  );
}
