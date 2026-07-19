import { SectionHeading } from '@/components/section-heading'
import { ScrollReveal } from '@/components/scroll-reveal'

type TeamMember = {
  name: string
  role: string
  bio: string
  initials: string
  links?: {
    github?: string
    linkedin?: string
  }
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.79-1.335-1.79-1.09-.744.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

/** Edit this list to add or update team members. */
const members: TeamMember[] = [
  {
    name: 'Helia Tary',
    role: 'Software Engineer',
    bio: 'Builds and ships product interfaces, from design systems to production-ready web apps.',
    initials: 'HT',
    links: {
      // github: 'https://github.com/...',
      // linkedin: 'https://linkedin.com/in/...',
    },
  },
  {
    name: 'Moti Vatandoust',
    role: 'Software Engineer',
    bio: 'Focuses on full-stack delivery — APIs, data, and reliable systems that scale with the business.',
    initials: 'MV',
    links: {
      // github: 'https://github.com/...',
      // linkedin: 'https://linkedin.com/in/...',
    },
  },
  {
    name: 'Amirhossein Izadjoo',
    role: 'Software Engineer',
    bio: 'Delivers reliable product features across the stack, with a focus on clean architecture and maintainable code.',
    initials: 'AI',
    links: {
      // github: 'https://github.com/...',
      // linkedin: 'https://linkedin.com/in/...',
    },
  },
  {
    name: 'Soheyl Sayyah',
    role: 'Software Engineer',
    bio: 'Turns product requirements into shipping software — thoughtful UX, solid engineering, and practical delivery.',
    initials: 'SS',
    links: {
      // github: 'https://github.com/...',
      // linkedin: 'https://linkedin.com/in/...',
    },
  },
]

export function TeamSection() {
  return (
    <section id="team" className="border-t border-white/5 bg-zinc-950 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <ScrollReveal>
          <SectionHeading
            label="Team"
            title="The people behind the work"
            description="A small, senior team — close collaboration, clear ownership, and production focus."
          />
        </ScrollReveal>

        <ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((member, i) => (
            <ScrollReveal key={member.name} delay={i * 0.08}>
              <li className="group flex h-full flex-col">
                <div
                  className="flex aspect-4/5 max-h-72 items-center justify-center rounded-2xl border border-white/10 bg-linear-to-br from-violet-950/50 via-zinc-900 to-black transition-colors group-hover:border-violet-500/30"
                  aria-hidden
                >
                  <span className="text-4xl font-semibold tracking-tight text-violet-300/80 sm:text-5xl">
                    {member.initials}
                  </span>
                </div>

                <div className="mt-5 flex flex-1 flex-col">
                  <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                  <p className="mt-1 text-sm font-medium text-violet-400">{member.role}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-400">
                    {member.bio}
                  </p>

                  {(member.links?.github || member.links?.linkedin) && (
                    <div className="mt-4 flex items-center gap-3">
                      {member.links.github && (
                        <a
                          href={member.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-neutral-500 transition-colors hover:text-white"
                          aria-label={`${member.name} on GitHub`}
                        >
                          <GithubIcon className="size-4" />
                        </a>
                      )}
                      {member.links.linkedin && (
                        <a
                          href={member.links.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-neutral-500 transition-colors hover:text-white"
                          aria-label={`${member.name} on LinkedIn`}
                        >
                          <LinkedinIcon className="size-4" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </li>
            </ScrollReveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
