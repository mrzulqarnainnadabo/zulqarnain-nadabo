import Hero from '@/components/Hero';
import CaseStudies from '@/components/CaseStudies';
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
        <CaseStudies />
        <ImpactProfile />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
