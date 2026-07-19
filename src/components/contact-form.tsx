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
import { useDictionary } from '@/i18n/dictionary-provider'
import { cn } from '@/lib/utils'

const CONTACT_EMAIL = 'velostudio24@gmail.com'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export function ContactForm() {
  const { dictionary } = useDictionary()
  const formCopy = dictionary.form
  const projectTypes = formCopy.projectTypes

  const formId = useId()
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)
  const [projectType, setProjectType] = useState<string>('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()

    if (!name || !email || !message) {
      setError(formCopy.errorRequired)
      setStatus('error')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(formCopy.errorEmail)
      setStatus('error')
      return
    }

    setStatus('sending')

    const typePart = projectType ? ` — ${projectType}` : ''
    const subject = encodeURIComponent(
      formCopy.mailSubject.replace('{type}', typePart).replace('{name}', name)
    )
    const body = encodeURIComponent(
      [
        `${formCopy.mailName}: ${name}`,
        `${formCopy.mailEmail}: ${email}`,
        projectType ? `${formCopy.mailProjectType}: ${projectType}` : null,
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
          <p className="text-base font-semibold text-white">{formCopy.sentTitle}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-neutral-400">
            {formCopy.sentBody}{' '}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-neutral-200 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white"
              dir="ltr"
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
          {formCopy.sendAnother}
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id={`${formId}-name`}
          label={formCopy.name}
          name="name"
          autoComplete="name"
          placeholder={formCopy.namePlaceholder}
          required
        />
        <Field
          id={`${formId}-email`}
          label={formCopy.email}
          name="email"
          type="email"
          autoComplete="email"
          placeholder={formCopy.emailPlaceholder}
          required
          dir="ltr"
        />
      </div>

      <ProjectTypeSelect
        id={`${formId}-type`}
        value={projectType}
        onChange={setProjectType}
        options={[...projectTypes]}
        label={formCopy.projectType}
        placeholder={formCopy.selectOne}
      />

      <div>
        <label
          htmlFor={`${formId}-message`}
          className="mb-2 block text-sm font-medium text-neutral-300"
        >
          {formCopy.message}
        </label>
        <textarea
          id={`${formId}-message`}
          name="message"
          rows={5}
          required
          placeholder={formCopy.messagePlaceholder}
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
        <p className="text-xs text-neutral-500">{formCopy.hint}</p>
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
              {formCopy.opening}
            </>
          ) : (
            <>
              {formCopy.send}
              <ArrowRight className="size-3 rtl:rotate-180" aria-hidden />
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
  options,
  label,
  placeholder,
}: {
  id: string
  value: string
  onChange: (value: string) => void
  options: string[]
  label: string
  placeholder: string
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
    const index = value ? options.indexOf(value) : 0
    setHighlight(index >= 0 ? index : 0)
  }, [open, value, options])

  function select(option: string) {
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
      setHighlight((i) => (i + 1) % options.length)
      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setHighlight((i) => (i - 1 + options.length) % options.length)
      return
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      select(options[highlight])
      return
    }

    if (event.key === 'Home') {
      event.preventDefault()
      setHighlight(0)
      return
    }

    if (event.key === 'End') {
      event.preventDefault()
      setHighlight(options.length - 1)
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-neutral-300">
        {label}
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
          'flex w-full items-center justify-between gap-3 rounded-xl border bg-white/5 px-4 py-3 text-start text-sm transition-colors',
          open ? 'border-violet-500/40' : 'border-white/10 hover:border-white/20',
          value ? 'text-white' : 'text-neutral-600'
        )}
      >
        <span className="truncate">{value || placeholder}</span>
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
          {options.map((option, index) => {
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
  dir,
}: {
  id: string
  label: string
  name: string
  type?: string
  placeholder?: string
  autoComplete?: string
  required?: boolean
  dir?: 'ltr' | 'rtl'
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
        dir={dir}
        className={cn(
          'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white',
          'transition-colors placeholder:text-neutral-600',
          'hover:border-white/20 focus:border-violet-500/40'
        )}
      />
    </div>
  )
}
