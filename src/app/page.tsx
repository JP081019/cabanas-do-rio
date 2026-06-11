import { HeroSection } from "../components/sections/hero-section";
import { ExperienceSection } from "../components/sections/experience-section";
import { GallerySection } from "../components/sections/gallery-section";
import { AccommodationsSection } from "../components/sections/accommodation";
import { AmenitiesSection } from "../components/sections/amenities-section";
import { TestimonialsSection } from "../components/sections/testimonials-section";
import { LocationSection } from "../components/sections/location-section";
import { FinalCtaSection } from "../components/sections/final-cta-section";
import { FooterSection } from "../components/sections/footer-section";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ExperienceSection />
      <GallerySection />
      <AccommodationsSection />
      <AmenitiesSection />
      <TestimonialsSection />
      <LocationSection />
      <FinalCtaSection />
      <FooterSection />
    </main>
  );
}