'use client'

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type MouseEvent,
} from 'react'
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion'
import { Check, Globe, Loader2, Rocket, Smartphone, Terminal } from 'lucide-react'

type FileTab = 'app.tsx' | 'layout.tsx' | 'page.tsx'
type PhoneState = 'idle' | 'building' | 'shipped'
type BuildPhase = 'typing' | 'running' | 'done'

const fileTabs: FileTab[] = ['app.tsx', 'layout.tsx', 'page.tsx']

const codeByFile: Record<FileTab, { indent: number; parts: { text: string; color: string }[] }[]> = {
  'app.tsx': [
    { indent: 0, parts: [{ text: 'export', color: 'text-violet-400' }, { text: ' function', color: 'text-sky-300' }, { text: ' App()', color: 'text-amber-200' }, { text: ' {', color: 'text-neutral-400' }] },
    { indent: 1, parts: [{ text: 'return', color: 'text-violet-400' }, { text: ' (', color: 'text-neutral-400' }] },
    { indent: 2, parts: [{ text: '<', color: 'text-neutral-500' }, { text: 'Product', color: 'text-emerald-400' }, { text: ' from=', color: 'text-neutral-400' }, { text: '"idea"', color: 'text-amber-200' }, { text: ' />', color: 'text-neutral-400' }] },
    { indent: 1, parts: [{ text: ')', color: 'text-neutral-400' }] },
    { indent: 0, parts: [{ text: '}', color: 'text-neutral-400' }] },
  ],
  'layout.tsx': [
    { indent: 0, parts: [{ text: 'export', color: 'text-violet-400' }, { text: ' default', color: 'text-sky-300' }, { text: ' function', color: 'text-sky-300' }, { text: ' Layout', color: 'text-amber-200' }, { text: '({', color: 'text-neutral-400' }, { text: ' children', color: 'text-rose-300' }, { text: ' }) {', color: 'text-neutral-400' }] },
    { indent: 1, parts: [{ text: 'return', color: 'text-violet-400' }, { text: ' (', color: 'text-neutral-400' }] },
    { indent: 2, parts: [{ text: '<', color: 'text-neutral-500' }, { text: 'main', color: 'text-emerald-400' }, { text: ' className=', color: 'text-neutral-400' }, { text: '"app"', color: 'text-amber-200' }, { text: '>', color: 'text-neutral-500' }] },
    { indent: 3, parts: [{ text: '{children}', color: 'text-rose-300' }] },
    { indent: 2, parts: [{ text: '</', color: 'text-neutral-500' }, { text: 'main', color: 'text-emerald-400' }, { text: '>', color: 'text-neutral-500' }] },
    { indent: 1, parts: [{ text: ')', color: 'text-neutral-400' }] },
    { indent: 0, parts: [{ text: '}', color: 'text-neutral-400' }] },
  ],
  'page.tsx': [
    { indent: 0, parts: [{ text: 'export', color: 'text-violet-400' }, { text: ' default', color: 'text-sky-300' }, { text: ' function', color: 'text-sky-300' }, { text: ' Home', color: 'text-amber-200' }, { text: '() {', color: 'text-neutral-400' }] },
    { indent: 1, parts: [{ text: 'return', color: 'text-violet-400' }, { text: ' (', color: 'text-neutral-400' }] },
    { indent: 2, parts: [{ text: '<', color: 'text-neutral-500' }, { text: 'Hero', color: 'text-emerald-400' }, { text: ' title=', color: 'text-neutral-400' }, { text: '"Ship it"', color: 'text-amber-200' }, { text: ' />', color: 'text-neutral-500' }] },
    { indent: 1, parts: [{ text: ')', color: 'text-neutral-400' }] },
    { indent: 0, parts: [{ text: '}', color: 'text-neutral-400' }] },
  ],
}

const buildSteps = [
  { text: '✓ Compiled successfully', color: 'text-emerald-400' },
  { text: '✓ Linting and type-checking', color: 'text-emerald-400' },
  { text: '✓ Generating static pages', color: 'text-emerald-400' },
  { text: 'Ready in 4.2s', color: 'text-sky-300' },
]

const lineVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.06, duration: 0.25, ease: 'easeOut' as const },
  }),
}

function CodeLine({
  indent,
  parts,
  index,
}: {
  indent: number
  parts: { text: string; color: string }[]
  index: number
}) {
  return (
    <motion.div
      custom={index}
      variants={lineVariants}
      initial="hidden"
      animate="visible"
      className="flex font-mono text-[11px] leading-5 sm:text-xs sm:leading-6"
    >
      <span className="w-5 shrink-0 text-right text-neutral-600">{index + 1}</span>
      <span style={{ paddingLeft: `${indent * 12}px` }} className="whitespace-pre">
        {parts.map((part, i) => (
          <span key={`${i}-${part.text}`} className={part.color}>
            {part.text}
          </span>
        ))}
      </span>
    </motion.div>
  )
}

function BrowserMockup({
  activeTab,
  onTabChange,
  isHovered,
}: {
  activeTab: FileTab
  onTabChange: (tab: FileTab) => void
  isHovered: boolean
}) {
  return (
    <div className="relative mx-auto w-full max-w-none sm:max-w-md">
      <div className="overflow-hidden rounded-xl border border-white/10 bg-neutral-950/90 shadow-2xl shadow-black/50 backdrop-blur-sm transition-[border-color,box-shadow] duration-300 hover:border-violet-500/30 hover:shadow-violet-500/10">
        <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2.5">
          <div className="flex gap-1.5">
            {(['bg-red-500/80', 'bg-amber-400/80', 'bg-emerald-500/80'] as const).map(
              (color, i) => (
                <motion.span
                  key={color}
                  whileHover={{ scale: 1.25 }}
                  whileTap={{ scale: 0.9 }}
                  className={`size-2.5 cursor-pointer rounded-full ${color}`}
                  title={['Close', 'Minimize', 'Maximize'][i]}
                />
              )
            )}
          </div>
          <motion.div
            animate={{ borderColor: isHovered ? 'rgba(139,92,246,0.3)' : 'rgba(255,255,255,0.05)' }}
            className="mx-auto flex min-w-0 flex-1 items-center gap-1.5 rounded-md border bg-white/5 px-2 py-1"
          >
            <Globe className="size-3 shrink-0 text-neutral-500" aria-hidden />
            <span className="truncate text-[10px] text-neutral-400 sm:text-xs">
              yourproduct.com
            </span>
          </motion.div>
        </div>

        <div className="border-b border-white/5 bg-neutral-900/80 px-2 py-1.5 sm:px-3 sm:py-2">
          <div className="flex gap-0.5 sm:gap-1">
            {fileTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => onTabChange(tab)}
                className={`relative flex-1 cursor-pointer touch-manipulation rounded px-1 py-2.5 text-[10px] transition-colors sm:flex-none sm:px-2 sm:py-1 sm:text-xs ${
                  activeTab === tab
                    ? 'text-neutral-100'
                    : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                {activeTab === tab && (
                  <motion.span
                    layoutId="active-tab"
                    className="absolute inset-0 rounded bg-white/10"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative">{tab}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="min-h-[108px] space-y-0.5 p-3 sm:min-h-[120px] sm:p-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              {codeByFile[activeTab].map((line, index) => (
                <CodeLine key={`${activeTab}-${index}`} index={index} {...line} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <motion.div
        animate={{
          y: [0, -5, 0],
          boxShadow: isHovered
            ? '0 0 20px rgba(52,211,153,0.25)'
            : '0 0 0px rgba(52,211,153,0)',
        }}
        transition={{ y: { duration: 3, repeat: Infinity, ease: 'easeInOut' } }}
        className="absolute -right-1 -top-2 hidden items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 text-[10px] font-medium text-emerald-300 sm:flex sm:-right-4 sm:-top-3 sm:px-3 sm:text-xs"
      >
        <motion.span
          animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="size-1.5 rounded-full bg-emerald-400"
        />
        Live
      </motion.div>
    </div>
  )
}

function PhoneMockup({
  phoneState,
  onLaunch,
}: {
  phoneState: PhoneState
  onLaunch: () => void
}) {
  return (
    <div className="relative mx-auto w-[120px] sm:w-[160px] lg:mx-0">
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-neutral-950 p-2 shadow-2xl shadow-black/50"
      >
        <div className="mx-auto mb-2 h-1 w-10 rounded-full bg-white/10" />
        <div className="space-y-2 rounded-2xl bg-linear-to-b from-violet-500/20 to-neutral-900 p-3">
          <AnimatePresence mode="wait">
            {phoneState === 'shipped' ? (
              <motion.div
                key="shipped"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-2 py-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.1 }}
                  className="flex size-10 items-center justify-center rounded-full bg-emerald-500/20"
                >
                  <Check className="size-5 text-emerald-400" />
                </motion.div>
                <p className="text-[11px] font-semibold text-emerald-300">Shipped!</p>
                <p className="text-[9px] text-neutral-500">v1.0.0 live</p>
              </motion.div>
            ) : phoneState === 'building' ? (
              <motion.div
                key="building"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-3 py-5"
              >
                <Loader2 className="size-6 animate-spin text-violet-400" />
                <p className="text-[10px] text-neutral-400">Building...</p>
                <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.8, ease: 'easeInOut' }}
                    className="h-full rounded-full bg-violet-500"
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="h-2 w-16 rounded bg-white/20" />
                <div className="mt-2 h-2 w-full rounded bg-white/10" />
                <div className="mt-2 h-2 w-[80%] rounded bg-white/10" />
                <div className="mt-3 grid grid-cols-2 gap-1.5">
                  {[0, 1].map((i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.18)' }}
                      className="aspect-square cursor-pointer rounded-lg bg-white/10 transition-colors"
                    />
                  ))}
                </div>
                <motion.button
                  type="button"
                  onClick={onLaunch}
                  whileHover={{ scale: 1.04, backgroundColor: '#e4e4e7' }}
                  whileTap={{ scale: 0.96 }}
                  className="mt-2 flex h-9 w-full touch-manipulation cursor-pointer items-center justify-center gap-1 rounded-lg bg-white text-[11px] font-semibold text-black sm:h-7 sm:text-[10px]"
                >
                  <Rocket className="size-3" aria-hidden />
                  Launch
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.div
        animate={{ x: [0, 3, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -left-1 top-1/2 hidden -translate-y-1/2 items-center gap-1 rounded-full border border-white/10 bg-black/80 px-1.5 py-0.5 text-[9px] text-neutral-300 sm:flex sm:-left-6 sm:px-2 sm:py-1 sm:text-[10px]"
      >
        <Smartphone className="size-3 text-sky-400" aria-hidden />
        iOS &amp; Android
      </motion.div>
    </div>
  )
}

function TerminalCard({ buildPhase, visibleSteps }: { buildPhase: BuildPhase; visibleSteps: number }) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/70 px-3 py-2.5 backdrop-blur-sm">
      <div className="flex items-center gap-2 font-mono text-[10px] text-neutral-400">
        <Terminal className="size-3 text-emerald-400" aria-hidden />
        <span className="text-emerald-400">$</span>
        <span>npm run build</span>
        {buildPhase === 'typing' && (
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="text-white"
          >
            ▋
          </motion.span>
        )}
        {buildPhase === 'running' && (
          <Loader2 className="size-3 animate-spin text-violet-400" aria-hidden />
        )}
      </div>

      <div className="mt-2 space-y-1">
        <AnimatePresence>
          {buildSteps.slice(0, visibleSteps).map((step, i) => (
            <motion.p
              key={step.text}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`font-mono text-[10px] ${step.color}`}
            >
              {step.text}
            </motion.p>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export function HeroVisual() {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const [activeTab, setActiveTab] = useState<FileTab>('app.tsx')
  const [phoneState, setPhoneState] = useState<PhoneState>('idle')
  const [buildPhase, setBuildPhase] = useState<BuildPhase>('typing')
  const [visibleSteps, setVisibleSteps] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const springConfig = prefersReducedMotion
    ? { stiffness: 300, damping: 40 }
    : { stiffness: 150, damping: 20 }

  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [6, -6]), springConfig)
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-6, 6]), springConfig)
  const glowX = useSpring(useTransform(pointerX, [-0.5, 0.5], ['35%', '65%']), springConfig)
  const glowY = useSpring(useTransform(pointerY, [-0.5, 0.5], ['30%', '70%']), springConfig)
  const glowBackground = useTransform(
    [glowX, glowY],
    ([x, y]) =>
      `radial-gradient(500px circle at ${x} ${y}, rgba(139,92,246,0.15), transparent 60%)`
  )

  const handlePointerMove = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current || prefersReducedMotion) return
      const rect = containerRef.current.getBoundingClientRect()
      pointerX.set((event.clientX - rect.left) / rect.width - 0.5)
      pointerY.set((event.clientY - rect.top) / rect.height - 0.5)
    },
    [pointerX, pointerY, prefersReducedMotion]
  )

  const handlePointerLeave = useCallback(() => {
    pointerX.set(0)
    pointerY.set(0)
    setIsHovered(false)
  }, [pointerX, pointerY])

  const handleLaunch = useCallback(() => {
    if (phoneState !== 'idle') return
    setPhoneState('building')
    setBuildPhase('running')
    setVisibleSteps(0)

    const stepInterval = setInterval(() => {
      setVisibleSteps((prev) => {
        if (prev >= buildSteps.length) {
          clearInterval(stepInterval)
          return prev
        }
        return prev + 1
      })
    }, 450)

    setTimeout(() => {
      setPhoneState('shipped')
      setBuildPhase('done')
      clearInterval(stepInterval)
      setVisibleSteps(buildSteps.length)
    }, 2000)

    setTimeout(() => {
      setPhoneState('idle')
      setBuildPhase('typing')
      setVisibleSteps(0)
    }, 5500)
  }, [phoneState])

  useEffect(() => {
    if (prefersReducedMotion) return
    const timer = setTimeout(() => {
      setBuildPhase('running')
      setVisibleSteps(1)
    }, 1200)
    return () => clearTimeout(timer)
  }, [prefersReducedMotion])

  useEffect(() => {
    if (buildPhase !== 'running' || visibleSteps >= buildSteps.length) return
    const timer = setTimeout(() => setVisibleSteps((s) => s + 1), 600)
    return () => clearTimeout(timer)
  }, [buildPhase, visibleSteps])

  return (
    <div
      ref={containerRef}
      onMouseMove={handlePointerMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handlePointerLeave}
      className="relative flex h-full w-full items-center justify-center overflow-hidden px-1 sm:px-0 sm:pb-10 lg:pb-12"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_at_center,black,transparent_75%)]"
      />

      {!prefersReducedMotion && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{ background: glowBackground }}
        />
      )}

      <motion.div
        style={
          prefersReducedMotion
            ? undefined
            : { rotateX, rotateY, transformPerspective: 1200 }
        }
        className="relative flex w-full flex-row items-end justify-center gap-3 sm:max-w-none sm:flex-col sm:items-center sm:gap-8 lg:flex-row lg:items-end lg:justify-center lg:gap-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="relative min-w-0 flex-1 sm:w-full sm:max-w-md lg:max-w-none lg:flex-1"
        >
          <BrowserMockup
            activeTab={activeTab}
            onTabChange={setActiveTab}
            isHovered={isHovered}
          />
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-3 hidden w-full sm:absolute sm:-bottom-4 sm:left-4 sm:mt-0 sm:block sm:w-[calc(100%-2rem)] lg:-bottom-6 lg:left-0 lg:w-auto"
          >
            <TerminalCard buildPhase={buildPhase} visibleSteps={visibleSteps} />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.25 }}
          className="shrink-0"
        >
          <PhoneMockup phoneState={phoneState} onLaunch={handleLaunch} />
        </motion.div>
      </motion.div>

      <p className="absolute bottom-0 left-1/2 hidden -translate-x-1/2 text-[10px] text-neutral-600 sm:block">
        Try the tabs &amp; Launch button
      </p>
    </div>
  )
}
