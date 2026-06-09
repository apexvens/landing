import SmoothScroll from "@/components/SmoothScroll";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProductShowcase from "@/components/ProductShowcase";
import StatsSection from "@/components/StatsSection";
import VisionSection from "@/components/VisionSection";
import FounderSection from "@/components/FounderSection";
import FooterSection from "@/components/FooterSection";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="relative bg-black text-white min-h-screen w-full select-text overflow-x-hidden">
        {/* Section 1: Hero Section */}
        <HeroSection />

        {/* Section 2: About Section */}
        <AboutSection />

        {/* Section 3: Product Showcase */}
        <ProductShowcase />

        {/* Section 4: Stats Section */}
        <StatsSection />

        {/* Section 5: Vision Statement */}
        <VisionSection />

        {/* Section 6: Founder Profile */}
        <FounderSection />

        {/* Section 7: Final CTA & Footer */}
        <FooterSection />
      </main>
    </SmoothScroll>
  );
}
