'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

/** Compact CTA that appears after the hero on small screens. */
export function MobileCtaBar() {
  const [pastHero, setPastHero] = useState(false)
  const [onContact, setOnContact] = useState(false)

  useEffect(() => {
    const hero = document.querySelector('main > section')
    const contact = document.getElementById('contact')
    if (!hero) return

    const heroObserver = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting),
      { threshold: 0.15 }
    )
    heroObserver.observe(hero)

    let contactObserver: IntersectionObserver | undefined
    if (contact) {
      contactObserver = new IntersectionObserver(
        ([entry]) => setOnContact(entry.isIntersecting),
        { threshold: 0.2 }
      )
      contactObserver.observe(contact)
    }

    return () => {
      heroObserver.disconnect()
      contactObserver?.disconnect()
    }
  }, [])

  const visible = pastHero && !onContact

  return (
    <div
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-black/90 p-3 backdrop-blur-md transition-transform duration-300 sm:hidden',
        'pb-[max(0.75rem,env(safe-area-inset-bottom))]',
        visible ? 'translate-y-0' : 'translate-y-full'
      )}
      aria-hidden={!visible}
    >
      <Link
        href="#contact"
        tabIndex={visible ? 0 : -1}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-semibold text-black"
      >
        Start a project
        <ArrowRight className="size-4" aria-hidden />
      </Link>
    </div>
  )
}
