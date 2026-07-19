'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { locales, localeNames, type Locale } from '@/i18n/config'
import { cn } from '@/lib/utils'

export function LanguageSwitcher({
  locale,
  label,
  className,
}: {
  locale: Locale
  label: string
  className?: string
}) {
  const pathname = usePathname()

  function hrefFor(next: Locale) {
    const segments = pathname.split('/')
    segments[1] = next
    return segments.join('/') || `/${next}`
  }

  return (
    <div
      className={cn(
        'inline-flex items-center gap-0.5 rounded-full border border-white/10 p-0.5',
        className
      )}
      role="group"
      aria-label={label}
    >
      {locales.map((item) => {
        const active = item === locale
        return (
          <Link
            key={item}
            href={hrefFor(item)}
            hrefLang={item}
            lang={item}
            aria-current={active ? 'true' : undefined}
            className={cn(
              'rounded-full px-2.5 py-1 text-xs font-medium transition-colors',
              active
                ? 'bg-white text-black'
                : 'text-neutral-400 hover:text-white'
            )}
          >
            {localeNames[item]}
          </Link>
        )
      })}
    </div>
  )
}
