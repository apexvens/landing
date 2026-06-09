import SmoothScroll from "@/components/SmoothScroll";
import HeroSection from "@/components/HeroSection";
import ProductShowcase from "@/components/ProductShowcase";
import AboutSection from "@/components/AboutSection";
import FounderSection from "@/components/FounderSection";
import FooterSection from "@/components/FooterSection";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="relative bg-black text-white min-h-screen w-full overflow-x-hidden">
        <HeroSection />
        <ProductShowcase />
        <AboutSection />
        <FounderSection />
        <FooterSection />
      </main>
    </SmoothScroll>
  );
}
