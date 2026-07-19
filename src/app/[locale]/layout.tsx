import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Geist, Geist_Mono, Vazirmatn } from 'next/font/google'
import { CustomCursor } from '@/components/custom-cursor'
import { DictionaryProvider } from '@/i18n/dictionary-provider'
import {
  defaultLocale,
  getDirection,
  isLocale,
  locales,
  type Locale,
} from '@/i18n/config'
import { getDictionary } from '@/i18n/get-dictionary'
import '../globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const vazirmatn = Vazirmatn({
  variable: '--font-vazirmatn',
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600', '700'],
})

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params
  const locale: Locale = isLocale(raw) ? raw : defaultLocale
  const dictionary = await getDictionary(locale)

  return {
    title: dictionary.meta.title,
    description: dictionary.meta.description,
    icons: {
      icon: '/assets/images/logo.png',
      apple: '/assets/images/logo.png',
    },
    openGraph: {
      title: dictionary.meta.title,
      description: dictionary.meta.ogDescription,
      siteName: dictionary.common.brand,
      images: [
        {
          url: '/assets/images/logo.png',
          width: 512,
          height: 512,
          alt: dictionary.common.brand,
        },
      ],
      locale: dictionary.meta.ogLocale,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: dictionary.meta.title,
      description: dictionary.meta.ogDescription,
      images: ['/assets/images/logo.png'],
    },
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
    },
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()

  const locale = raw
  const dictionary = await getDictionary(locale)
  const dir = getDirection(locale)

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${geistSans.variable} ${geistMono.variable} ${vazirmatn.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <CustomCursor />
        <DictionaryProvider locale={locale} dictionary={dictionary}>
          {children}
        </DictionaryProvider>
      </body>
    </html>
  )
}
