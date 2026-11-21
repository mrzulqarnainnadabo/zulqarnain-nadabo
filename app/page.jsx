import Hero from '@/components/Hero';
import Framing from '@/components/Framing';
import CaseStudies from '@/components/CaseStudies';
import ImpactProfile from '@/components/ImpactProfile';
import Principles from '@/components/Principles';
import Research from '@/components/Research';
import Architecture from '@/components/Architecture';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    <>
      <Hero />
      <main id="main" className="mx-auto max-w-6xl px-6 md:px-10">
        <Framing />
        <CaseStudies />
        <ImpactProfile />
        <Principles />
        <Research />
        <Architecture />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
