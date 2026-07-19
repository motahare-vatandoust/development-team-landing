'use client'

import { Clock, Mail, MessageSquare } from 'lucide-react'
import { ContactForm } from '@/components/contact-form'
import { SectionHeading } from '@/components/section-heading'
import { ScrollReveal } from '@/components/scroll-reveal'
import { useDictionary } from '@/i18n/dictionary-provider'

const CONTACT_EMAIL = 'velostudio24@gmail.com'

export function ContactSection() {
  const { dictionary } = useDictionary()
  const { contact } = dictionary

  const details = [
    {
      icon: Mail,
      label: contact.emailLabel,
      content: (
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="text-neutral-200 transition-colors hover:text-white"
          dir="ltr"
        >
          {CONTACT_EMAIL}
        </a>
      ),
    },
    {
      icon: Clock,
      label: contact.responseLabel,
      content: <span className="text-neutral-300">{contact.responseValue}</span>,
    },
    {
      icon: MessageSquare,
      label: contact.availabilityLabel,
      content: (
        <span className="text-neutral-300">{contact.availabilityValue}</span>
      ),
    },
  ]

  return (
    <section id="contact" className="border-t border-white/5 bg-zinc-950 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <ScrollReveal>
          <SectionHeading
            label={contact.label}
            title={contact.title}
            description={contact.description}
          />
        </ScrollReveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
          <ScrollReveal delay={0.08}>
            <ul className="space-y-5">
              {details.map(({ icon: Icon, label, content }) => (
                <li key={label} className="flex items-start gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                    <Icon className="size-4 text-violet-400" aria-hidden />
                  </span>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-500">
                      {label}
                    </p>
                    <div className="mt-1 text-sm sm:text-base">{content}</div>
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-8 max-w-sm text-sm leading-relaxed text-neutral-500">
              {contact.preferChat}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.12}>
            <div className="rounded-2xl border border-white/10 bg-black/40 p-5 sm:p-7">
              <ContactForm />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
