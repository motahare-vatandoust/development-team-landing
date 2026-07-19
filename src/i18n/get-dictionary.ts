import type { Locale } from '@/i18n/config'
import { en, type Dictionary } from '@/i18n/dictionaries/en'
import { fa } from '@/i18n/dictionaries/fa'

const dictionaries: Record<Locale, Dictionary> = {
  en,
  fa,
}

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]
}

export type { Dictionary }
