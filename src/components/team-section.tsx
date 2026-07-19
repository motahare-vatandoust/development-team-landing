'use client'

import Image from 'next/image'
import { SectionHeading } from '@/components/section-heading'
import { ScrollReveal } from '@/components/scroll-reveal'
import { useDictionary } from '@/i18n/dictionary-provider'

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

export function TeamSection() {
  const { dictionary } = useDictionary()
  const { team } = dictionary

  return (
    <section id="team" className="border-t border-white/5 bg-zinc-950 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <ScrollReveal>
          <SectionHeading
            label={team.label}
            title={team.title}
            description={team.description}
          />
        </ScrollReveal>

        <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:mt-14 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4 lg:gap-8 [&>*]:min-w-0">
          {team.members.map((member, i) => (
            <li key={member.name} className="group flex h-full min-w-0 flex-col">
              <ScrollReveal delay={i * 0.08} className="flex h-full flex-col">
                <div className="relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-zinc-900 transition-colors group-hover:border-violet-500/30 sm:aspect-4/5 sm:max-h-72 sm:rounded-2xl">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    unoptimized
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105 sm:object-top"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>

                <div className="mt-3 flex flex-1 flex-col sm:mt-5">
                  <h3 className="text-base font-semibold text-white sm:text-lg">{member.name}</h3>
                  <p className="mt-0.5 text-xs font-medium text-violet-400 sm:mt-1 sm:text-sm">
                    {member.role}
                  </p>
                  <p className="mt-2 flex-1 text-xs leading-relaxed text-neutral-400 sm:mt-3 sm:text-sm">
                    {member.bio}
                  </p>

                  {member.linkedin && (
                    <div className="mt-3 flex items-center gap-3 sm:mt-4">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-500 transition-colors hover:text-white"
                        aria-label={team.onLinkedin.replace('{name}', member.name)}
                      >
                        <LinkedinIcon className="size-4" />
                      </a>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
