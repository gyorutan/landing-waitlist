import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesGrid } from "@/components/landing/features-grid";
import { SocialProof } from "@/components/landing/social-proof";
import { Footer } from "@/components/landing/footer";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navigation />
      <HeroSection />
      <FeaturesGrid />
      <SocialProof />
      <Footer />
    </main>
  );
}
