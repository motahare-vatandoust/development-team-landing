import Image from 'next/image'
import Link from 'next/link'

const footerLinks = [
  { href: '#work', label: 'Work' },
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'Process' },
  { href: '#about', label: 'About' },
  { href: '#team', label: 'Team' },
  { href: '#contact', label: 'Contact' },
]

const CONTACT_EMAIL = 'velostudio24@gmail.com'

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
            <Link href="#" className="flex items-center gap-3">
              <Image
                src="/assets/images/logo.png"
                alt=""
                width={28}
                height={28}
                unoptimized
                className="size-7 rounded-md"
              />
              <span className="text-sm font-medium text-neutral-300">Velo Studio</span>
            </Link>
            <p className="text-sm text-neutral-500 sm:border-l sm:border-white/10 sm:pl-4">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2" aria-label="Footer">
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
          >
            {CONTACT_EMAIL}
          </a>
          <p className="text-xs text-neutral-600">
            Websites, apps &amp; systems — built from zero.
          </p>
        </div>
      </div>
    </footer>
  )
}
