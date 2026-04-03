export const dynamic = "force-dynamic";

import { getSettings } from "@/lib/settings";
import HeroSection from "@/components/public/HeroSection";
import AboutSection from "@/components/public/AboutSection";
import ForWhoSection from "@/components/public/ForWhoSection";
import ServicesSection from "@/components/public/ServicesSection";
import PedicureSection from "@/components/public/PedicureSection";
import MapSection from "@/components/public/MapSection";
import PricingSection from "@/components/public/PricingSection";
import WhyUsSection from "@/components/public/WhyUsSection";
import PartnerSection from "@/components/public/PartnerSection";
import CTASection from "@/components/public/CTASection";
import Footer from "@/components/public/Footer";
import BackToTop from "@/components/public/BackToTop";

const schemaData = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  "name": "Taraya Institut",
  "alternateName": "Taraya Institut de Beauté",
  "description": "Institut de beauté réservé aux femmes à Sterrebeek. Soins visage Phyt's bio, massages, pédicure médicale et esthétique, épilations. Uniquement sur rendez-vous.",
  "url": "https://tarayainstitut.be",
  "telephone": "+32471824764",
  "email": "tarayainstitut@hotmail.com",
  "address": { "@type": "PostalAddress", "streetAddress": "Waalsestraat 34", "addressLocality": "Sterrebeek", "postalCode": "1933", "addressCountry": "BE" },
  "geo": { "@type": "GeoCoordinates", "latitude": 50.8438, "longitude": 4.5147 },
  "image": "https://tarayainstitut.be/images/salon-beaute-estheticienne-zaventem-sterrebeek.webp",
  "logo": "https://tarayainstitut.be/images/footer-logo.svg",
  "priceRange": "€€",
  "currenciesAccepted": "EUR",
  "paymentAccepted": "Cash, Credit Card",
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "09:00", "closes": "18:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "09:00", "closes": "13:00" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Prestations Taraya Institut",
    "itemListElement": [
      { "@type": "OfferCatalog", "name": "Soins mains et pieds", "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Manucure", "description": "Soin complet des mains et des ongles" }, "price": "35", "priceCurrency": "EUR" },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Pose vernis", "description": "Application de vernis classique" }, "price": "10", "priceCurrency": "EUR" },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Semi permanent", "description": "Pose de vernis semi-permanent longue tenue" }, "price": "40", "priceCurrency": "EUR" },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Semi permanent french", "description": "Vernis semi-permanent finition french manucure" }, "price": "45", "priceCurrency": "EUR" },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Manucure et semi permanent", "description": "Soin complet des mains avec pose de semi-permanent" }, "price": "70", "priceCurrency": "EUR" },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Pédicure esthétique", "description": "Soin esthétique des pieds — coupe, limage, cuticules et callosités légères" }, "price": "35", "priceCurrency": "EUR" },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Pédicure médicale", "description": "Traitement des callosités, ongles incarnés et problèmes spécifiques des pieds" }, "price": "45", "priceCurrency": "EUR" },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Pédicure esthétique et semi permanent", "description": "Pédicure esthétique complète avec pose de semi-permanent" }, "price": "70", "priceCurrency": "EUR" },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Pédicure médicale et semi permanent", "description": "Pédicure médicale complète avec pose de semi-permanent" }, "price": "80", "priceCurrency": "EUR" },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Dépose semi permanent", "description": "Retrait du vernis semi-permanent" }, "price": "15", "priceCurrency": "EUR" }
      ]},
      { "@type": "OfferCatalog", "name": "Épilations", "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Épilation sourcils" }, "price": "12", "priceCurrency": "EUR" },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Épilation lèvre" }, "price": "10", "priceCurrency": "EUR" },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Épilation favoris" }, "price": "10", "priceCurrency": "EUR" },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Épilation aisselles" }, "price": "12", "priceCurrency": "EUR" },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Épilation bikini simple" }, "price": "15", "priceCurrency": "EUR" },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Épilation bikini échancré" }, "price": "20", "priceCurrency": "EUR" },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Épilation bikini brésilien" }, "price": "25", "priceCurrency": "EUR" },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Épilation bikini intégral" }, "price": "30", "priceCurrency": "EUR" },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Épilation ½ jambes" }, "price": "20", "priceCurrency": "EUR" },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Épilation ¾ jambes" }, "price": "25", "priceCurrency": "EUR" },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Épilation jambes complètes" }, "price": "30", "priceCurrency": "EUR" },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Épilation ½ bras" }, "price": "15", "priceCurrency": "EUR" },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Épilation bras complet" }, "price": "25", "priceCurrency": "EUR" }
      ]},
      { "@type": "OfferCatalog", "name": "Soins visage Phyt's", "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Aqua phyt's 1h", "description": "Soin visage hydratant avec produits bio Phyt's" }, "price": "75", "priceCurrency": "EUR" },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "White bio active 1h", "description": "Soin visage anti-tâches pigmentaires Phyt's" }, "price": "70", "priceCurrency": "EUR" },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Phyt'ssima 1h", "description": "Soin visage nutrition intense Phyt's" }, "price": "75", "priceCurrency": "EUR" },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Aromaclear pureté 1h", "description": "Soin visage purifiant pour peaux grasses Phyt's" }, "price": "70", "priceCurrency": "EUR" },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Capyl 1h", "description": "Soin visage apaisant pour peaux sensibles Phyt's" }, "price": "60", "priceCurrency": "EUR" },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Revederm 1h", "description": "Soin visage éclat et anti-pollution Phyt's" }, "price": "60", "priceCurrency": "EUR" },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Multi vita 1h15", "description": "Soin visage anti-âge pour peaux matures Phyt's" }, "price": "95", "priceCurrency": "EUR" }
      ]},
      { "@type": "OfferCatalog", "name": "Teintures", "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Teinture cils ou sourcils", "description": "Teinture professionnelle des cils ou sourcils" }, "price": "18", "priceCurrency": "EUR" }
      ]},
      { "@type": "OfferCatalog", "name": "Massages Phyt's", "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Massage corps 60 min", "description": "Massage corporel relaxant avec produits naturels Phyt's" }, "price": "70", "priceCurrency": "EUR" },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Massage dos 30 min", "description": "Massage ciblé du dos pour relâcher les tensions" }, "price": "45", "priceCurrency": "EUR" },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Massage visage et cuir chevelu 30 min", "description": "Massage détente du visage et cuir chevelu" }, "price": "45", "priceCurrency": "EUR" },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Massage corps et visage 1h20", "description": "Massage complet corps et visage avec produits Phyt's" }, "price": "100", "priceCurrency": "EUR" }
      ]}
    ]
  },
  "areaServed": { "@type": "GeoCircle", "geoMidpoint": { "@type": "GeoCoordinates", "latitude": 50.8438, "longitude": 4.5147 }, "geoRadius": "20000" },
  "sameAs": [],
  "founder": { "@type": "Person", "name": "Taraya", "jobTitle": "Esthéticienne diplômée" },
  "foundingDate": "2005",
  "keywords": "institut de beauté Sterrebeek, soins visage Phyt's, pédicure médicale, massage Sterrebeek, épilation Sterrebeek, beauté femmes Belgique, semi permanent Sterrebeek",
  "slogan": "Un institut de beauté dédié à votre bien-être"
};

export default async function HomePage() {
  const settings = await getSettings();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <HeroSection
        whatsapp={settings.whatsapp}
        title={settings.hero_title}
        subtitle={settings.hero_subtitle}
      />
      <main>
        <AboutSection />
        <ForWhoSection />
        <ServicesSection />
        <PedicureSection />
        <PricingSection />
        <WhyUsSection />
        <PartnerSection />
        <MapSection />
        <CTASection whatsapp={settings.whatsapp} />
      </main>
      <Footer
        phone={settings.phone}
        email={settings.email}
        address={settings.address}
        instagram={settings.instagram}
        facebook={settings.facebook}
      />
      <BackToTop />
    </>
  );
}
