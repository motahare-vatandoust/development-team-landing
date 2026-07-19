'use client'

import { Building2, Globe, Layers, Workflow } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { ScrollReveal } from '@/components/scroll-reveal'
import { useDictionary } from '@/i18n/dictionary-provider'

const statIcons = [Building2, Layers, Globe, Workflow] as const

export function AboutSection() {
  const { dictionary } = useDictionary()
  const { about } = dictionary

  return (
    <section id="about" className="border-t border-white/5 bg-black py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          <ScrollReveal>
            <SectionHeading
              label={about.label}
              title={about.title}
              description={about.description}
            />
            <p className="mt-5 text-sm leading-relaxed text-neutral-400 sm:mt-6 sm:text-base">
              {about.body}
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 [&>*]:h-full">
            {about.stats.map((stat, i) => {
              const Icon = statIcons[i] ?? Building2
              return (
                <ScrollReveal key={stat.label} delay={i * 0.08} className="h-full">
                  <div className="flex h-full min-h-[9rem] flex-col rounded-xl border border-white/10 bg-white/2 p-3 transition-colors hover:border-violet-500/25 sm:min-h-[10rem] sm:p-5 lg:p-6">
                    <Icon className="size-4 shrink-0 text-violet-400 sm:size-5" aria-hidden />
                    <p className="mt-2 text-lg font-bold tracking-tight text-white sm:mt-4 sm:text-2xl lg:text-3xl">
                      {stat.value}
                    </p>
                    <p className="mt-auto pt-1.5 text-[11px] leading-snug text-neutral-400 sm:pt-2 sm:text-sm">
                      {stat.label}
                    </p>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
