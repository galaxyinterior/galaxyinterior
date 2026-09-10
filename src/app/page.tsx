import HeroSection from '@/components/home/HeroSection';
import TrustStatsSection from '@/components/home/TrustStatsSection';
import FeaturedProjectsSection from '@/components/home/FeaturedProjectsSection';
import ExpertiseSection from '@/components/home/ExpertiseSection';
import WhyGalaxySection from '@/components/home/WhyGalaxySection';
import DesignToRealitySection from '@/components/home/DesignToRealitySection';
import ThreeDExperienceSection from '@/components/home/ThreeDExperienceSection';
import DesignInspirationSection from '@/components/home/DesignInspirationSection';
import FurnitureSection from '@/components/home/FurnitureSection';
import TeamSection from '@/components/home/TeamSection';
import ReviewsSection from '@/components/home/ReviewsSection';
import ServiceAreasSection from '@/components/home/ServiceAreasSection';
import PartnersSection from '@/components/home/PartnersSection';
import CTASection from '@/components/home/CTASection';

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <TrustStatsSection />
      <FeaturedProjectsSection />
      <ExpertiseSection />
      <WhyGalaxySection />
      <DesignToRealitySection />
      <ThreeDExperienceSection />
      <DesignInspirationSection />
      <FurnitureSection />
      <TeamSection />
      <ReviewsSection />
      <ServiceAreasSection />
      <PartnersSection />
      <CTASection />
    </div>
  );
}
