'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo } from 'react'
import { useDictionary } from '@/i18n/dictionary-provider'

const CONTACT_EMAIL = 'velostudio24@gmail.com'

export function Footer() {
  const { locale, dictionary } = useDictionary()
  const { common, nav, footer } = dictionary

  const footerLinks = useMemo(
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

  return (
    <footer className="border-t border-white/5 bg-black py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
            <Link href={`/${locale}`} className="flex items-center gap-3">
              <Image
                src="/assets/images/logo.png"
                alt=""
                width={28}
                height={28}
                unoptimized
                className="size-7 rounded-md"
              />
              <span className="text-sm font-medium text-neutral-300">{common.brand}</span>
            </Link>
            <p className="text-sm text-neutral-500 sm:border-s sm:border-white/10 sm:ps-4">
              © {new Date().getFullYear()} {footer.rights}
            </p>
          </div>

          <nav
            className="flex flex-wrap justify-center gap-x-6 gap-y-2"
            aria-label={common.footerNav}
          >
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-neutral-500 transition-colors hover:text-neutral-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 pb-[calc(4.5rem+env(safe-area-inset-bottom))] sm:flex-row sm:pb-0">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-sm text-neutral-500 transition-colors hover:text-neutral-300"
            dir="ltr"
          >
            {CONTACT_EMAIL}
          </a>
          <p className="text-xs text-neutral-600">{footer.tagline}</p>
        </div>
      </div>
    </footer>
  )
}
