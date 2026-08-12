import { AboutSection } from "@/src/components/sections/about-section";
import { CabinsSection } from "@/src/components/sections/cabins-section";
import { ContactSection } from "@/src/components/sections/contact-section";
import { ExperienceSection } from "@/src/components/sections/experience-section";
import { FooterSection } from "@/src/components/sections/footer-section";
import { GallerySection } from "@/src/components/sections/gallery-section";
import { HeroSection } from "@/src/components/sections/hero-section";
import { LocationSection } from "@/src/components/sections/location-section";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <CabinsSection />
      <ExperienceSection />
      <GallerySection />
      <LocationSection />
      <ContactSection />
      <FooterSection />
    </main>
  );
}
