'use client'

import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from 'react'
import { ArrowRight, Check, CheckCircle2, ChevronDown, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const CONTACT_EMAIL = 'velostudio24@gmail.com'

const projectTypes = [
  'Website / landing page',
  'Web app',
  'Mobile app',
  'Backend / API',
  'Something else',
] as const

type ProjectType = (typeof projectTypes)[number]
type Status = 'idle' | 'sending' | 'sent' | 'error'

export function ContactForm() {
  const formId = useId()
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)
  const [projectType, setProjectType] = useState<ProjectType | ''>('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()

    if (!name || !email || !message) {
      setError('Please fill in your name, email, and a short message.')
      setStatus('error')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.')
      setStatus('error')
      return
    }

    setStatus('sending')

    const subject = encodeURIComponent(
      `Project inquiry${projectType ? ` — ${projectType}` : ''} from ${name}`
    )
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        projectType ? `Project type: ${projectType}` : null,
        '',
        message,
      ]
        .filter(Boolean)
        .join('\n')
    )

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`

    window.setTimeout(() => {
      setStatus('sent')
      setProjectType('')
      form.reset()
    }, 400)
  }

  if (status === 'sent') {
    return (
      <div
        className="flex flex-col items-start gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 sm:p-8"
        role="status"
      >
        <CheckCircle2 className="size-6 text-emerald-400" aria-hidden />
        <div>
          <p className="text-base font-semibold text-white">Draft ready in your mail app</p>
          <p className="mt-1.5 text-sm leading-relaxed text-neutral-400">
            If nothing opened, email us directly at{' '}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-neutral-200 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </div>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-2 text-sm text-neutral-400 transition-colors hover:text-white"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id={`${formId}-name`}
          label="Name"
          name="name"
          autoComplete="name"
          placeholder="Your name"
          required
        />
        <Field
          id={`${formId}-email`}
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          required
        />
      </div>

      <ProjectTypeSelect
        id={`${formId}-type`}
        value={projectType}
        onChange={setProjectType}
      />

      <div>
        <label
          htmlFor={`${formId}-message`}
          className="mb-2 block text-sm font-medium text-neutral-300"
        >
          Message
        </label>
        <textarea
          id={`${formId}-message`}
          name="message"
          rows={5}
          required
          placeholder="What are you building? Timeline, goals, or anything else we should know."
          className={cn(
            'w-full resize-y rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white',
            'transition-colors placeholder:text-neutral-600',
            'hover:border-white/20 focus:border-violet-500/40'
          )}
        />
      </div>

      {error && (
        <p className="text-sm text-red-400" role="alert">
          {error}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-neutral-500">
          Opens your email app with a prefilled message. We usually reply within 24 hours.
        </p>
        <button
          type="submit"
          disabled={status === 'sending'}
          className={cn(
            'inline-flex shrink-0 items-center justify-center gap-1.5 self-start rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-black',
            'transition-colors hover:bg-neutral-200 disabled:opacity-60 sm:self-auto'
          )}
        >
          {status === 'sending' ? (
            <>
              <Loader2 className="size-3 animate-spin" aria-hidden />
              Opening…
            </>
          ) : (
            <>
              Send message
              <ArrowRight className="size-3" aria-hidden />
            </>
          )}
        </button>
      </div>
    </form>
  )
}

function ProjectTypeSelect({
  id,
  value,
  onChange,
}: {
  id: string
  value: ProjectType | ''
  onChange: (value: ProjectType | '') => void
}) {
  const [open, setOpen] = useState(false)
  const [highlight, setHighlight] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)
  const listId = `${id}-listbox`

  useEffect(() => {
    if (!open) return

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [open])

  useEffect(() => {
    if (!open) return
    const index = value ? projectTypes.indexOf(value) : 0
    setHighlight(index >= 0 ? index : 0)
  }, [open, value])

  function select(option: ProjectType) {
    onChange(option)
    setOpen(false)
  }

  function onTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setOpen(true)
    }
  }

  function onListKeyDown(event: KeyboardEvent<HTMLUListElement>) {
    if (event.key === 'Escape') {
      event.preventDefault()
      setOpen(false)
      return
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setHighlight((i) => (i + 1) % projectTypes.length)
      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setHighlight((i) => (i - 1 + projectTypes.length) % projectTypes.length)
      return
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      select(projectTypes[highlight])
      return
    }

    if (event.key === 'Home') {
      event.preventDefault()
      setHighlight(0)
      return
    }

    if (event.key === 'End') {
      event.preventDefault()
      setHighlight(projectTypes.length - 1)
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-neutral-300">
        Project type
      </label>

      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onTriggerKeyDown}
        className={cn(
          'flex w-full items-center justify-between gap-3 rounded-xl border bg-white/5 px-4 py-3 text-left text-sm transition-colors',
          open ? 'border-violet-500/40' : 'border-white/10 hover:border-white/20',
          value ? 'text-white' : 'text-neutral-600'
        )}
      >
        <span className="truncate">{value || 'Select one'}</span>
        <ChevronDown
          className={cn(
            'size-4 shrink-0 text-neutral-400 transition-transform duration-200',
            open && 'rotate-180'
          )}
          aria-hidden
        />
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          tabIndex={-1}
          aria-labelledby={id}
          aria-activedescendant={`${listId}-option-${highlight}`}
          onKeyDown={onListKeyDown}
          ref={(node) => node?.focus()}
          className="absolute z-20 mt-2 max-h-60 w-full overflow-auto rounded-xl border border-white/10 bg-zinc-950/95 p-1.5 shadow-xl shadow-black/40 backdrop-blur-md"
        >
          {projectTypes.map((option, index) => {
            const selected = value === option
            const active = highlight === index
            return (
              <li
                key={option}
                id={`${listId}-option-${index}`}
                role="option"
                aria-selected={selected}
                onMouseEnter={() => setHighlight(index)}
                onClick={() => select(option)}
                className={cn(
                  'flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors',
                  active ? 'bg-white/10 text-white' : 'text-neutral-300',
                  selected && 'text-white'
                )}
              >
                <span>{option}</span>
                {selected && <Check className="size-3.5 shrink-0 text-violet-400" aria-hidden />}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

function Field({
  id,
  label,
  name,
  type = 'text',
  placeholder,
  autoComplete,
  required,
}: {
  id: string
  label: string
  name: string
  type?: string
  placeholder?: string
  autoComplete?: string
  required?: boolean
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-neutral-300">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        required={required}
        className={cn(
          'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white',
          'transition-colors placeholder:text-neutral-600',
          'hover:border-white/20 focus:border-violet-500/40'
        )}
      />
    </div>
  )
}
