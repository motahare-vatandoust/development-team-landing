'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { LanguageSwitcher } from '@/components/language-switcher'
import { useDictionary } from '@/i18n/dictionary-provider'
import { cn } from '@/lib/utils'

export function SiteHeader() {
  const { locale, dictionary } = useDictionary()
  const { common, nav } = dictionary

  const navLinks = useMemo(
    () => [
      { href: '#work', label: nav.work },
      { href: '#services', label: nav.services },
      { href: '#process', label: nav.process },
      { href: '#about', label: nav.about },
      { href: '#team', label: nav.team },
      { href: '#contact', label: nav.contact },
    ],
    [nav]
  )

  const sectionIds = useMemo(
    () => navLinks.map((link) => link.href.slice(1)),
    [navLinks]
  )

  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string>('')
  const menuId = useId()
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]?.target.id) {
          setActive(visible[0].target.id)
        }
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0, 0.25, 0.5, 0.75],
      }
    )

    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [sectionIds])

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    const frame = window.requestAnimationFrame(() => {
      firstLinkRef.current?.focus()
    })

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      window.cancelAnimationFrame(frame)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2.5 text-sm font-semibold tracking-wide text-neutral-200 sm:text-base"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/assets/images/logo.png"
            alt=""
            width={32}
            height={32}
            unoptimized
            className="size-8 rounded-lg"
            priority
          />
          {common.brand}
        </Link>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label={common.primaryNav}
        >
          {navLinks.map((link) => {
            const isActive = active === link.href.slice(1)
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'true' : undefined}
                className={cn(
                  'text-sm transition-colors',
                  isActive
                    ? 'text-white'
                    : 'text-neutral-400 hover:text-white'
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher locale={locale} label={common.language} />

          <Link
            href="#contact"
            className="hidden rounded-full border border-white/15 px-4 py-2 text-sm text-neutral-200 transition-colors hover:border-white/30 hover:bg-white/5 sm:inline-flex"
          >
            {common.getInTouch}
          </Link>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex rounded-lg border border-white/10 p-2 text-neutral-300 transition-colors hover:bg-white/5 md:hidden"
            aria-label={open ? common.closeMenu : common.openMenu}
            aria-expanded={open}
            aria-controls={menuId}
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </div>

      <div
        id={menuId}
        className={cn(
          'overflow-hidden border-t border-white/5 bg-black/95 transition-[max-height] duration-300 ease-out md:hidden',
          open ? 'max-h-96' : 'max-h-0'
        )}
        aria-hidden={!open}
        inert={open ? undefined : true}
      >
        <nav className="flex flex-col gap-1 px-4 py-4" aria-label={common.mobileNav}>
          {navLinks.map((link, index) => {
            const isActive = active === link.href.slice(1)
            return (
              <Link
                key={link.href}
                ref={index === 0 ? firstLinkRef : undefined}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={isActive ? 'true' : undefined}
                className={cn(
                  'rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-white/5',
                  isActive ? 'bg-white/5 text-white' : 'text-neutral-300 hover:text-white'
                )}
              >
                {link.label}
              </Link>
            )
          })}
          <Link
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-white px-4 py-2.5 text-center text-sm font-semibold text-black transition-colors hover:bg-neutral-200"
          >
            {common.getInTouch}
          </Link>
        </nav>
      </div>
    </header>
  )
}
