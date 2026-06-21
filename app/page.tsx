import SmoothScroll     from "@/components/SmoothScroll";
import CustomCursor     from "@/components/CustomCursor";
import ScrollProgress   from "@/components/ScrollProgress";
import Nav              from "@/components/Nav";
import PageWrapper      from "@/components/PageWrapper";
import HeroSection      from "@/components/HeroSection";
import MarqueeTicker    from "@/components/MarqueeTicker";
import ProductShowcase  from "@/components/ProductShowcase";
import KineticSection   from "@/components/KineticSection";
import StatsSection     from "@/components/StatsSection";
import ManifestoSection from "@/components/ManifestoSection";
import VisionSection    from "@/components/VisionSection";
import AboutSection     from "@/components/AboutSection";
import FounderSection   from "@/components/FounderSection";
import FooterSection    from "@/components/FooterSection";

export default function Home() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <ScrollProgress />
      <PageWrapper>
        <Nav />
        <main style={{ width:"100%", overflowX:"hidden" }}>
          <HeroSection />
          <MarqueeTicker />
          <ProductShowcase />
          <KineticSection />
          <StatsSection />
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
