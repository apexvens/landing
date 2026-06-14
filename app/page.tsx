import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Nav from "@/components/Nav";
import HeroSection from "@/components/HeroSection";
import MarqueeTicker from "@/components/MarqueeTicker";
import ProductShowcase from "@/components/ProductShowcase";
import ManifestoSection from "@/components/ManifestoSection";
import VisionSection from "@/components/VisionSection";
import AboutSection from "@/components/AboutSection";
import FounderSection from "@/components/FounderSection";
import FooterSection from "@/components/FooterSection";
import PageWrapper from "@/components/PageWrapper";

export default function Home() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <PageWrapper>
        <Nav />
        <main style={{ width: "100%", overflowX: "hidden" }}>
          <HeroSection />
          <MarqueeTicker />
          <ProductShowcase />
          <ManifestoSection />
          <VisionSection />
          <AboutSection />
          <FounderSection />
          <FooterSection />
        </main>
      </PageWrapper>
    </SmoothScroll>
  );
}
