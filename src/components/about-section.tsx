import { Code2, Rocket, Users, Zap } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { ScrollReveal } from '@/components/scroll-reveal'

const stats = [
  { icon: Rocket, value: '50+', label: 'Projects shipped' },
  { icon: Users, value: '30+', label: 'Happy clients' },
  { icon: Code2, value: '5+', label: 'Years building' },
  { icon: Zap, value: '2wk', label: 'Avg. MVP timeline' },
]

export function AboutSection() {
  return (
    <section id="about" className="border-t border-white/5 bg-black py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <ScrollReveal>
            <SectionHeading
              label="About us"
              title="A small team with big output"
              description="We're developers who care about craft — clean architecture, polished UI, and products that actually work in production. No agency bloat, just people who write code and ship."
            />
            <p className="mt-6 text-sm leading-relaxed text-neutral-400 sm:text-base">
              Whether you need a landing page this week or a full platform over
              several months, we adapt to your pace. We work async-friendly across
              time zones and keep communication clear.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.08}>
                <div className="rounded-xl border border-white/10 bg-white/2 p-5 transition-colors hover:border-violet-500/25 sm:p-6">
                  <stat.icon className="size-5 text-violet-400" aria-hidden />
                  <p className="mt-4 text-2xl font-bold text-white sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-neutral-400">{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
