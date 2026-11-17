import Hero from '@/components/Hero';
import Framing from '@/components/Framing';
import CaseStudies from '@/components/CaseStudies';
import ImpactProfile from '@/components/ImpactProfile';
import FeaturedSystems from '@/components/FeaturedSystems';
import Method from '@/components/Method';
import Principles from '@/components/Principles';
import Research from '@/components/Research';
import Architecture from '@/components/Architecture';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-cream focus:px-3 focus:py-2">Skip to content</a>
      <Hero />
      <main id="main" className="mx-auto max-w-6xl px-6 md:px-10">
        <Framing />
        <CaseStudies />
        <ImpactProfile />
        <FeaturedSystems />
        <Method />
        <Principles />
        <Research />
        <Architecture />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
