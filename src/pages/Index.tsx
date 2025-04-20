
import { PageLayout } from "@/components/layout/PageLayout";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { CtaSection } from "@/components/home/CtaSection";

const Index = () => {
  return (
    <PageLayout>
      <HeroSection />
      <FeaturesSection />
      <CtaSection />
    </PageLayout>
  );
};

export default Index;
