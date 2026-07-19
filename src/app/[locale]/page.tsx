import { AboutSection } from '@/components/about-section'
import { ContactSection } from '@/components/contact-section'
import { Footer } from '@/components/footer'
import { Hero } from '@/components/hero'
import { MobileCtaBar } from '@/components/mobile-cta-bar'
import { ProcessSection } from '@/components/process-section'
import { ServicesSection } from '@/components/services-section'
import { SiteHeader } from '@/components/site-header'
import { TeamSection } from '@/components/team-section'
import { WorkSection } from '@/components/work-section'

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex flex-1 flex-col bg-black text-white">
        <Hero />
        <WorkSection />
        <ServicesSection />
        <ProcessSection />
        <AboutSection />
        <TeamSection />
        <ContactSection />
      </main>
      <Footer />
      <MobileCtaBar />
    </>
  )
}
