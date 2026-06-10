import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Nav from "@/components/Nav";
import HeroSection from "@/components/HeroSection";
import ProductShowcase from "@/components/ProductShowcase";
import ManifestoSection from "@/components/ManifestoSection";
import AboutSection from "@/components/AboutSection";
import FounderSection from "@/components/FounderSection";
import FooterSection from "@/components/FooterSection";

export default function Home() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Nav />
      <main className="relative bg-black text-white min-h-screen w-full overflow-x-hidden">
        <HeroSection />
        <ProductShowcase />
        <ManifestoSection />
        <AboutSection />
        <FounderSection />
        <FooterSection />
      </main>
    </SmoothScroll>
  );
}
