import type { Metadata } from "next";
import { Quattrocento, Questrial } from "next/font/google";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${quattrocento.variable} ${questrial.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
