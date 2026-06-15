import { AboutSection } from '@/components/about-section'
import { ContactSection } from '@/components/contact-section'
import { Footer } from '@/components/footer'
import { Hero } from '@/components/hero'
import { ProcessSection } from '@/components/process-section'
import { ServicesSection } from '@/components/services-section'
import { SiteHeader } from '@/components/site-header'
import { WorkSection } from '@/components/work-section'

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-col bg-black text-white">
        <Hero />
        <WorkSection />
        <ServicesSection />
        <ProcessSection />
        <AboutSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  )
}
