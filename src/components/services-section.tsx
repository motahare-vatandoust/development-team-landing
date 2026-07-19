'use client'

import {
  Cloud,
  Globe,
  Layers,
  Smartphone,
  type LucideIcon,
} from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { ScrollReveal } from '@/components/scroll-reveal'
import { Card } from '@/components/ui/card'
import { useDictionary } from '@/i18n/dictionary-provider'

const icons: Record<string, LucideIcon> = {
  websites: Globe,
  webapps: Layers,
  mobile: Smartphone,
  infra: Cloud,
}

export function ServicesSection() {
  const { dictionary } = useDictionary()
  const { services } = dictionary

  return (
    <section id="services" className="border-t border-white/5 bg-black py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <ScrollReveal>
          <SectionHeading
            label={services.label}
            title={services.title}
            description={services.description}
          />
        </ScrollReveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.items.map((service, i) => {
            const Icon = icons[service.id] ?? Globe
            return (
              <ScrollReveal key={service.id} delay={i * 0.08}>
                <Card className="h-full border-white/10 bg-white/2 p-6 transition-colors hover:border-violet-500/25 hover:bg-white/4">
                  <div className="flex size-10 items-center justify-center rounded-lg border border-violet-500/20 bg-violet-500/10">
                    <Icon className="size-5 text-violet-400" aria-hidden />
                  </div>
                  <h3 className="mt-5 text-base font-semibold text-white">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                    {service.description}
                  </p>
                </Card>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
