'use client'

import { createContext, useContext } from 'react'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/get-dictionary'

type DictionaryContextValue = {
  locale: Locale
  dictionary: Dictionary
}

const DictionaryContext = createContext<DictionaryContextValue | null>(null)

export function DictionaryProvider({
  locale,
  dictionary,
  children,
}: {
  locale: Locale
  dictionary: Dictionary
  children: React.ReactNode
}) {
  return (
    <DictionaryContext.Provider value={{ locale, dictionary }}>
      {children}
    </DictionaryContext.Provider>
  )
}

export function useDictionary() {
  const value = useContext(DictionaryContext)
  if (!value) {
    throw new Error('useDictionary must be used within DictionaryProvider')
  }
  return value
}
