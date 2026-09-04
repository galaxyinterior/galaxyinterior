import HeroSection from '@/components/home/HeroSection';
import ExpertiseSection from '@/components/home/ExpertiseSection';
import FurnitureSection from '@/components/home/FurnitureSection';
import ReviewsSection from '@/components/home/ReviewsSection';
import CTASection from '@/components/home/CTASection';
import PartnersSection from '@/components/home/PartnersSection';

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <ExpertiseSection />
      <FurnitureSection />
      <ReviewsSection />
      <CTASection />
      <PartnersSection />
    </div>
  );
}
