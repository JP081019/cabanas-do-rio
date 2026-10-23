import { AboutSection } from "@/src/components/sections/about-section";
import { BookingHighlightSection } from "@/src/components/sections/booking-highlight-section";
import { CabinsSection } from "@/src/components/sections/cabins-section";
import { ContactSection } from "@/src/components/sections/contact-section";
import { ExperienceSection } from "@/src/components/sections/experience-section";
import { FooterSection } from "@/src/components/sections/footer-section";
import { GallerySection } from "@/src/components/sections/gallery-section";
import { HeroSection } from "@/src/components/sections/hero-section";
import { LocationSection } from "@/src/components/sections/location-section";
import { TestimonialsSection } from "@/src/components/sections/testimonials-section";
import { ComparisonSection } from "@/src/components/sections/comparison-section";
import { FaqSection } from "@/src/components/sections/faq-section";
import { SiteHeader } from "@/src/components/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="conteudo">
        <HeroSection />
        <AboutSection />
        <CabinsSection />
        <ComparisonSection />
        <ExperienceSection />
        <GallerySection />
        <TestimonialsSection />
        <LocationSection />
        <BookingHighlightSection />
        <FaqSection />
        <ContactSection />
      </main>
      <FooterSection />
    </>
  );
}
