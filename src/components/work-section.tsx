'use client'

import Image from 'next/image'
import { ArrowLeftRight } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { ScrollReveal } from '@/components/scroll-reveal'
import { Card } from '@/components/ui/card'
import { useDictionary } from '@/i18n/dictionary-provider'

export function WorkSection() {
  const { dictionary } = useDictionary()
  const { work } = dictionary

  return (
    <section id="work" className="border-t border-white/5 bg-zinc-950 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <ScrollReveal>
          <SectionHeading
            label={work.label}
            title={work.title}
            description={work.description}
          />
        </ScrollReveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 [&>*]:h-full">
          {work.projects.map((project, i) => (
            <ScrollReveal
              key={`${project.title}-${project.type}`}
              delay={i * 0.08}
              className="h-full"
            >
              <Card className="group flex h-full flex-col overflow-hidden border-white/10 bg-black/40 transition-colors hover:border-violet-500/30 hover:bg-black/60">
                <div className="relative aspect-[16/10] shrink-0 overflow-hidden">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-violet-950/80 via-zinc-900 to-black">
                      <ArrowLeftRight
                        className="size-16 text-violet-400/35 transition-transform duration-500 group-hover:scale-110"
                        aria-hidden
                      />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                  <span className="absolute start-4 top-4 rounded-full border border-white/15 bg-black/50 px-3 py-1 text-xs text-neutral-200 backdrop-blur-sm">
                    {project.type}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-400">
                    {project.description}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-neutral-400"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
