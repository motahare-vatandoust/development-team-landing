import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { ScrollReveal } from '@/components/scroll-reveal'
import { Card } from '@/components/ui/card'

const projects = [
  {
    title: 'SaaS Dashboard',
    category: 'Web app',
    description: 'Analytics platform with real-time data, auth, and role-based access.',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL'],
  },
  {
    title: 'E-commerce Store',
    category: 'Website',
    description: 'Custom storefront with payments, inventory sync, and admin panel.',
    image:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80',
    tags: ['React', 'Stripe', 'Tailwind'],
  },
  {
    title: 'Fitness Mobile App',
    category: 'Mobile',
    description: 'Cross-platform app with workouts, progress tracking, and push notifications.',
    image:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80',
    tags: ['React Native', 'Firebase', 'API'],
  },
  {
    title: 'Agency Landing',
    category: 'Website',
    description: 'High-converting marketing site with CMS, animations, and SEO optimization.',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    tags: ['Next.js', 'Framer Motion', 'CMS'],
  },
]

export function WorkSection() {
  return (
    <section id="work" className="border-t border-white/5 bg-zinc-950 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <ScrollReveal>
          <SectionHeading
            label="Our work"
            title="Products we've shipped"
            description="From MVPs to production platforms — here's the kind of work we deliver for clients and startups."
          />
        </ScrollReveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {projects.map((project, i) => (
            <ScrollReveal key={project.title} delay={i * 0.08}>
              <Card className="group overflow-hidden border-white/10 bg-black/40 transition-colors hover:border-violet-500/30 hover:bg-black/60">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/50 px-3 py-1 text-xs text-neutral-200 backdrop-blur-sm">
                    {project.category}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                    <ArrowUpRight className="size-5 shrink-0 text-neutral-500 transition-colors group-hover:text-violet-400" />
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-400">
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
