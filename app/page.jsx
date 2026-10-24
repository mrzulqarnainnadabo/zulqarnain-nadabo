import Hero from '@/components/Hero';
import Framing from '@/components/Framing';
import FeaturedSystems from '@/components/FeaturedSystems';
import Method from '@/components/Method';
import Principles from '@/components/Principles';
import Architecture from '@/components/Architecture';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

/**
 * Page order = reading order:
 * who (Hero) > framing > proof of work > method > principles > architecture > contact.
 * Reorder by moving a line. Edit copy in lib/content.js.
 */
export default function Page() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-cream focus:px-3 focus:py-2">Skip to content</a>
      <Hero />
      <main id="main" className="mx-auto max-w-6xl px-6 md:px-10">
        <Framing />
        <FeaturedSystems />
        <Method />
        <Principles />
        <Architecture />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
