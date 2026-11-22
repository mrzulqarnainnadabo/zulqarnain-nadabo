import Hero from '@/components/Hero';
import CaseStudies from '@/components/CaseStudies';
import ISEYCArchitecture from '@/components/ISEYCArchitecture';
import AtlasExplorer from '@/components/AtlasExplorer';
import AtlasResearch from '@/components/AtlasResearch';
import ImpactProfile from '@/components/ImpactProfile';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import MotionSystem from '@/components/MotionSystem';

export default function Page() {
  return (
    <>
      <MotionSystem />
      <Hero />
      <main id="main" className="mx-auto max-w-6xl px-6 md:px-10">
        <AtlasExplorer />
        <AtlasResearch />
        <ISEYCArchitecture />
        <CaseStudies />
        <ImpactProfile />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
