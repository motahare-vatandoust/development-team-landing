import { SectionHeading } from '@/components/section-heading'
import { ScrollReveal } from '@/components/scroll-reveal'

const steps = [
  {
    step: '01',
    title: 'Discover',
    description:
      'We learn your goals, users, and constraints — then scope the right solution together.',
  },
  {
    step: '02',
    title: 'Design & plan',
    description:
      'Wireframes, tech stack, and milestones. No surprises — you know what ships and when.',
  },
  {
    step: '03',
    title: 'Build',
    description:
      'Iterative development with regular demos. Clean code, tests, and performance baked in.',
  },
  {
    step: '04',
    title: 'Launch & support',
    description:
      'Deploy to production, hand off docs, and stay on for fixes, updates, and new features.',
  },
]

export function ProcessSection() {
  return (
    <section id="process" className="border-t border-white/5 bg-zinc-950 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <ScrollReveal>
          <SectionHeading
            label="Process"
            title="How we work"
            description="A straightforward flow from idea to production — transparent at every step."
          />
        </ScrollReveal>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item, i) => (
            <ScrollReveal key={item.step} delay={i * 0.1}>
              <div className="relative">
                {i < steps.length - 1 && (
                  <div
                    aria-hidden
                    className="absolute left-6 top-12 hidden h-px w-[calc(100%+2rem)] bg-linear-to-r from-violet-500/40 to-transparent lg:block"
                  />
                )}
                <span className="font-mono text-sm text-violet-400">{item.step}</span>
                <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                  {item.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
