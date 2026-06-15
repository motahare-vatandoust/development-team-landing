'use client'

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion'

type TrailDot = {
  id: number
  x: number
  y: number
}

const TRAIL_COUNT = 10
const TRAIL_INTERVAL_MS = 32

export function CustomCursor() {
  const prefersReducedMotion = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [isText, setIsText] = useState(false)
  const [clicking, setClicking] = useState(false)
  const [trail, setTrail] = useState<TrailDot[]>([])
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([])

  const trailId = useRef(0)
  const rippleId = useRef(0)
  const lastTrailAt = useRef(0)
  const posRef = useRef({ x: 0, y: 0 })

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const dotSpring = { stiffness: 500, damping: 28, mass: 0.4 }
  const ringSpring = { stiffness: 180, damping: 22, mass: 0.6 }
  const glowSpring = { stiffness: 90, damping: 28, mass: 1 }

  const dotX = useSpring(mouseX, dotSpring)
  const dotY = useSpring(mouseY, dotSpring)
  const ringX = useSpring(mouseX, ringSpring)
  const ringY = useSpring(mouseY, ringSpring)
  const glowX = useSpring(mouseX, glowSpring)
  const glowY = useSpring(mouseY, glowSpring)

  const addTrailDot = useCallback((x: number, y: number) => {
    const now = Date.now()
    if (now - lastTrailAt.current < TRAIL_INTERVAL_MS) return
    lastTrailAt.current = now
    trailId.current += 1
    setTrail((prev) => [
      ...prev.slice(-(TRAIL_COUNT - 1)),
      { id: trailId.current, x, y },
    ])
  }, [])

  const addRipple = useCallback((x: number, y: number) => {
    rippleId.current += 1
    const id = rippleId.current
    setRipples((prev) => [...prev, { id, x, y }])
    window.setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id))
    }, 600)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) return

    const hasFinePointer = window.matchMedia('(pointer: fine)').matches
    if (!hasFinePointer) return

    setEnabled(true)
    document.body.classList.add('custom-cursor-active')

    const handleMove = (event: MouseEvent) => {
      const { clientX, clientY } = event
      posRef.current = { x: clientX, y: clientY }
      mouseX.set(clientX)
      mouseY.set(clientY)
      setVisible(true)
      addTrailDot(clientX, clientY)

      const target = event.target as HTMLElement | null
      const interactive = target?.closest(
        'a, button, summary, [role="button"], [data-cursor="pointer"]'
      )
      const textField = target?.closest('input, textarea, select')
      setHovering(Boolean(interactive))
      setIsText(Boolean(textField))
    }

    const handleDown = (event: MouseEvent) => {
      setClicking(true)
      addRipple(event.clientX, event.clientY)
    }

    const handleUp = () => setClicking(false)
    const handleLeave = () => setVisible(false)
    const handleEnter = () => setVisible(true)

    window.addEventListener('mousemove', handleMove, { passive: true })
    window.addEventListener('mousedown', handleDown)
    window.addEventListener('mouseup', handleUp)
    document.documentElement.addEventListener('mouseleave', handleLeave)
    document.documentElement.addEventListener('mouseenter', handleEnter)

    return () => {
      document.body.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mousedown', handleDown)
      window.removeEventListener('mouseup', handleUp)
      document.documentElement.removeEventListener('mouseleave', handleLeave)
      document.documentElement.removeEventListener('mouseenter', handleEnter)
    }
  }, [addRipple, addTrailDot, mouseX, mouseY, prefersReducedMotion])

  if (!enabled || prefersReducedMotion) return null

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
    >
      {/* Ambient glow */}
      <motion.div
        className="absolute size-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/20 blur-3xl"
        style={{ left: glowX, top: glowY }}
        animate={{
          scale: hovering ? 1.35 : clicking ? 0.85 : isText ? 0.6 : 1,
          opacity: visible ? (hovering ? 0.55 : isText ? 0.2 : 0.35) : 0,
        }}
        transition={{ duration: 0.25 }}
      />

      {/* Particle trail */}
      <AnimatePresence>
        {trail.map((dot) => (
          <motion.span
            key={dot.id}
            className="absolute size-1 rounded-full bg-violet-400"
            style={{ left: dot.x, top: dot.y }}
            initial={{ opacity: 0.7, scale: 1, x: '-50%', y: '-50%' }}
            animate={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>

      {/* Click ripples */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute rounded-full border border-white/40"
            style={{ left: ripple.x, top: ripple.y, x: '-50%', y: '-50%' }}
            initial={{ width: 8, height: 8, opacity: 0.8 }}
            animate={{ width: 80, height: 80, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>

      {/* Outer ring */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{ left: ringX, top: ringY }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: clicking ? 0.75 : hovering ? 1.65 : isText ? 0.5 : 1,
          rotate: hovering || isText ? 0 : 360,
        }}
        transition={{
          opacity: { duration: 0.15 },
          scale: { type: 'spring', stiffness: 400, damping: 22 },
          rotate: hovering
            ? { duration: 0.3 }
            : { duration: 8, repeat: Infinity, ease: 'linear' },
        }}
      >
        <div
          className="size-8 rounded-full p-px"
          style={{
            background:
              'conic-gradient(from 0deg, #a78bfa, #22d3ee, #f0abfc, #a78bfa)',
          }}
        >
          <div className="size-full rounded-full bg-black/80 backdrop-blur-sm" />
        </div>
      </motion.div>

      {/* Crosshair lines on hover */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{ left: ringX, top: ringY }}
        animate={{ opacity: hovering && visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <span className="absolute left-1/2 top-1/2 h-px w-10 -translate-x-1/2 -translate-y-1/2 bg-white/25" />
        <span className="absolute left-1/2 top-1/2 h-10 w-px -translate-x-1/2 -translate-y-1/2 bg-white/25" />
      </motion.div>

      {/* Core dot */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference"
        style={{ left: dotX, top: dotY }}
        animate={{
          opacity: visible ? 1 : 0,
          width: clicking ? 6 : hovering ? 10 : isText ? 4 : 8,
          height: clicking ? 6 : hovering ? 10 : isText ? 16 : 8,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />

      {/* Hover label */}
      <motion.div
        className="absolute -translate-x-1/2"
        style={{ left: dotX, top: dotY }}
        animate={{
          opacity: hovering && visible ? 1 : 0,
          y: hovering ? 28 : 20,
        }}
        transition={{ duration: 0.2 }}
      >
        <span className="rounded-full border border-white/15 bg-black/70 px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest text-neutral-300 backdrop-blur-sm">
          Click
        </span>
      </motion.div>
    </div>
  )
}
