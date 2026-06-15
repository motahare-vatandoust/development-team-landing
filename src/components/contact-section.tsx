'use client'

import { useState, type FormEvent } from 'react'
import { ArrowRight, Check, Mail, MessageSquare } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'
import { ScrollReveal } from '@/components/scroll-reveal'

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" className="border-t border-white/5 bg-zinc-950 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <ScrollReveal>
            <SectionHeading
              label="Contact"
              title="Let's build something"
              description="Tell us about your project — we'll get back within 24 hours with next steps."
            />

            <div className="mt-8 space-y-4">
              <a
                href="mailto:hello@developingteam.dev"
                className="flex items-center gap-3 text-neutral-300 transition-colors hover:text-white"
              >
                <span className="flex size-10 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                  <Mail className="size-4 text-violet-400" aria-hidden />
                </span>
                hello@developingteam.dev
              </a>
              <div className="flex items-center gap-3 text-neutral-400">
                <span className="flex size-10 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                  <MessageSquare className="size-4 text-violet-400" aria-hidden />
                </span>
                Available for freelance &amp; contract work
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            {submitted ? (
              <div className="flex h-full min-h-[320px] flex-col items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center">
                <div className="flex size-12 items-center justify-center rounded-full bg-emerald-500/20">
                  <Check className="size-6 text-emerald-400" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">Message sent!</h3>
                <p className="mt-2 max-w-sm text-sm text-neutral-400">
                  Thanks for reaching out. We&apos;ll review your project and reply soon.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-white/10 bg-black/40 p-6 sm:p-8"
              >
                <div className="space-y-5">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm text-neutral-300">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-neutral-600 focus:border-violet-500/50"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm text-neutral-300">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-neutral-600 focus:border-violet-500/50"
                      placeholder="you@company.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm text-neutral-300">
                      Project details
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-neutral-600 focus:border-violet-500/50"
                      placeholder="What are you building? Timeline, budget, tech preferences..."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-neutral-200 sm:w-auto"
                >
                  Send message
                  <ArrowRight className="size-4" aria-hidden />
                </button>
              </form>
            )}
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
