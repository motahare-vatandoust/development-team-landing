import { Mail, MessageSquare } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { ScrollReveal } from '@/components/scroll-reveal'

export function ContactSection() {
  return (
    <section id="contact" className="border-t border-white/5 bg-zinc-950 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <ScrollReveal>
          <SectionHeading
            label="Contact"
            title="Let's build something"
            description="Tell us about your project — we'll get back within 24 hours with next steps."
          />

          <div className="mt-8 space-y-4">
            <a
              href="mailto:velostudio24@gmail.com"
              className="flex items-center gap-3 text-neutral-300 transition-colors hover:text-white"
            >
              <span className="flex size-10 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                <Mail className="size-4 text-violet-400" aria-hidden />
              </span>
              velostudio24@gmail.com
            </a>
            <div className="flex items-center gap-3 text-neutral-400">
              <span className="flex size-10 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                <MessageSquare className="size-4 text-violet-400" aria-hidden />
              </span>
              Available for freelance &amp; contract work
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
