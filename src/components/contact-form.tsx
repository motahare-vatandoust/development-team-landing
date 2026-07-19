'use client'

import { useId, useState, type FormEvent } from 'react'
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const CONTACT_EMAIL = 'velostudio24@gmail.com'

const projectTypes = [
  'Website / landing page',
  'Web app',
  'Mobile app',
  'Backend / API',
  'Something else',
] as const

type Status = 'idle' | 'sending' | 'sent' | 'error'

export function ContactForm() {
  const formId = useId()
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const projectType = String(data.get('projectType') ?? '').trim()
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

    // Opens the user's mail client with a prefilled draft — no backend required.
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`

    window.setTimeout(() => {
      setStatus('sent')
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

      <div>
        <label
          htmlFor={`${formId}-type`}
          className="mb-2 block text-sm font-medium text-neutral-300"
        >
          Project type
        </label>
        <select
          id={`${formId}-type`}
          name="projectType"
          defaultValue=""
          className={cn(
            'w-full appearance-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white',
            'transition-colors placeholder:text-neutral-600',
            'hover:border-white/20 focus:border-violet-500/40'
          )}
        >
          <option value="" disabled className="bg-zinc-900 text-neutral-400">
            Select one
          </option>
          {projectTypes.map((type) => (
            <option key={type} value={type} className="bg-zinc-900">
              {type}
            </option>
          ))}
        </select>
      </div>

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
            'inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black',
            'transition-colors hover:bg-neutral-200 disabled:opacity-60'
          )}
        >
          {status === 'sending' ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden />
              Opening…
            </>
          ) : (
            <>
              Send message
              <ArrowRight className="size-4" aria-hidden />
            </>
          )}
        </button>
      </div>
    </form>
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
