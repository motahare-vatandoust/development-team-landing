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
    <section className="relative flex min-h-dvh w-full flex-col overflow-hidden bg-black text-white">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col gap-10 px-4 pb-12 pt-10 sm:px-6 sm:pb-16 lg:flex-row lg:items-center lg:gap-12 lg:px-10 lg:pb-20 lg:pt-12">
        <div className="flex flex-1 flex-col justify-center lg:max-w-xl xl:max-w-2xl">
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-neutral-400"
          >
            Developers who ship
          </motion.p>

          <motion.h1
            custom={0.1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
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
            className="mt-5 max-w-lg text-base leading-relaxed text-neutral-300 sm:mt-6 sm:text-lg"
          >
            We&apos;re a development team that turns ideas into production-ready
            products — landing pages, web apps, mobile experiences, and
            everything in between.
          </motion.p>

          <motion.ul
            initial="hidden"
            animate="visible"
            className="mt-8 flex flex-wrap gap-3"
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
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-neutral-300 transition-colors hover:bg-white/10"
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
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-neutral-200"
              >
                Start a project
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="#work"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-neutral-200 transition-colors hover:border-white/30 hover:bg-white/5"
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
          className="relative flex flex-1 items-center justify-center lg:min-h-[520px]"
        >
          <div className="relative h-[360px] w-full sm:h-[420px] lg:h-full lg:min-h-[500px]">
            <HeroVisual />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
