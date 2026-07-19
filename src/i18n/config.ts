export const locales = ['en', 'fa'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export const localeNames: Record<Locale, string> = {
  en: 'EN',
  fa: 'فا',
}

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale)
}

export function getDirection(locale: Locale): 'ltr' | 'rtl' {
  return locale === 'fa' ? 'rtl' : 'ltr'
}
