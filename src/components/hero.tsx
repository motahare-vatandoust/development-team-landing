'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Code2, Globe, Smartphone } from 'lucide-react'
import { HeroVisual } from '@/components/hero-visual'
import { Spotlight } from '@/components/ui/spotlight'

const capabilities = [
  { icon: Globe, label: 'Websites' },
  { icon: Smartphone, label: 'Mobile apps' },
  { icon: Code2, label: 'From zero' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: 'easeOut' as const },
  }),
}

export function Hero() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="relative w-full overflow-x-hidden bg-black text-white">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 pb-12 pt-8 sm:gap-10 sm:px-6 sm:pb-16 sm:pt-10 lg:min-h-[calc(100dvh-4rem)] lg:flex-row lg:items-center lg:gap-12 lg:px-10 lg:pb-20 lg:pt-12">
        <div className="flex flex-1 flex-col justify-center lg:max-w-xl xl:max-w-2xl">
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-neutral-400 sm:mb-4 sm:text-sm"
          >
            Developers who ship
          </motion.p>

          <motion.h1
            custom={0.1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-[1.75rem] font-bold leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl"
          >
            <span className="bg-linear-to-b from-neutral-50 to-neutral-400 bg-clip-text text-transparent">
              We build websites &amp; apps
            </span>
            <br />
            <span className="text-white">from zero.</span>
          </motion.h1>

          <motion.p
            custom={0.2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-4 max-w-lg text-sm leading-relaxed text-neutral-300 sm:mt-6 sm:text-base lg:text-lg"
          >
            We&apos;re a development team that turns ideas into production-ready
            products — landing pages, web apps, mobile experiences, and
            everything in between.
          </motion.p>

          <motion.ul
            initial="hidden"
            animate="visible"
            className="mt-6 flex flex-wrap gap-2 sm:mt-8 sm:gap-3"
          >
            {capabilities.map(({ icon: Icon, label }, i) => (
              <motion.li
                key={label}
                custom={0.3 + i * 0.08}
                variants={fadeUp}
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : { scale: 1.05, borderColor: 'rgba(255,255,255,0.25)' }
                }
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-neutral-300 transition-colors hover:bg-white/10 sm:px-3 sm:py-1.5 sm:text-sm"
              >
                <Icon className="size-4 text-neutral-400" aria-hidden />
                {label}
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            custom={0.45}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center"
          >
            <motion.div className="w-full sm:w-auto" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="#contact"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-neutral-200 sm:w-auto"
              >
                Start a project
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </motion.div>
            <motion.div className="w-full sm:w-auto" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="#work"
                className="inline-flex w-full items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-neutral-200 transition-colors hover:border-white/30 hover:bg-white/5 sm:w-auto"
              >
                See what we build
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative w-full max-w-lg shrink-0 self-center lg:max-w-none lg:flex-1 lg:self-auto"
        >
          <div className="relative w-full min-h-[300px] sm:min-h-[440px] lg:h-full lg:min-h-[500px]">
            <HeroVisual />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
