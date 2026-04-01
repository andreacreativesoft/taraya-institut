import HeroSection from "@/components/public/HeroSection";
import AboutSection from "@/components/public/AboutSection";
import ForWhoSection from "@/components/public/ForWhoSection";
import ServicesSection from "@/components/public/ServicesSection";
import PedicureSection from "@/components/public/PedicureSection";
import PricingSection from "@/components/public/PricingSection";
import WhyUsSection from "@/components/public/WhyUsSection";
import PartnerSection from "@/components/public/PartnerSection";
import CTASection from "@/components/public/CTASection";
import Footer from "@/components/public/Footer";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ForWhoSection />
      <ServicesSection />
      <PedicureSection />
      <PricingSection />
      <WhyUsSection />
      <PartnerSection />
      <CTASection />
      <Footer />
    </>
  );
}
