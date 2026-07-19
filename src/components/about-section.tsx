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
              title="Independent team, production impact"
              description="We are an independent software team that ships websites, apps, and enterprise systems — from first idea to long-term delivery. We design and operate technology for growing organizations, including Shima Shoes."
            />
            <p className="mt-5 text-sm leading-relaxed text-neutral-400 sm:mt-6 sm:text-base">
              Our strength is turning complex requirements into integrated products:
              management systems (ERP, CRM, SCM), B2B and B2C platforms, and the
              automation that connects them. We replace fragmented workflows with
              unified, data-driven software — and stay on as a technology partner
              from architecture through production support.
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
