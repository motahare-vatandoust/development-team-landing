import { Building2, Globe, Layers, Workflow } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { ScrollReveal } from '@/components/scroll-reveal'

const stats = [
  { icon: Building2, value: '10+', label: 'Enterprise systems delivered' },
  { icon: Layers, value: 'ERP', label: 'CRM, SCM & unified management' },
  { icon: Globe, value: 'B2B/B2C', label: 'Commerce & org platforms' },
  { icon: Workflow, value: 'End-to-end', label: 'From requirements to production' },
]

export function AboutSection() {
  return (
    <section id="about" className="border-t border-white/5 bg-black py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          <ScrollReveal>
            <SectionHeading
              label="About us"
              title="Independent team, enterprise impact"
              description="We are an independent, agile software team specializing in digital transformation, enterprise systems, and intelligent process automation. We design and operate the technology infrastructure for large organizations — including Shima Shoes."
            />
            <p className="mt-5 text-sm leading-relaxed text-neutral-400 sm:mt-6 sm:text-base">
              Our core strength lies in analyzing complex industrial requirements,
              building integrated management systems (ERP, CRM, SCM), and delivering
              modern B2B and B2C platforms. We turn manual, fragmented workflows into
              unified, data-driven software that boosts productivity and accelerates
              decision-making. As a strategic technology partner, we create and
              support the architecture and digital tools businesses need to grow,
              scale, and enter new markets — from first design through long-term
              delivery.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 [&>*]:h-full">
            {stats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.08} className="h-full">
                <div className="flex h-full min-h-[9rem] flex-col rounded-xl border border-white/10 bg-white/2 p-3 transition-colors hover:border-violet-500/25 sm:min-h-[10rem] sm:p-5 lg:p-6">
                  <stat.icon className="size-4 shrink-0 text-violet-400 sm:size-5" aria-hidden />
                  <p className="mt-2 text-lg font-bold tracking-tight text-white sm:mt-4 sm:text-2xl lg:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-auto pt-1.5 text-[11px] leading-snug text-neutral-400 sm:pt-2 sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
