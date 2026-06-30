import { cn } from '@/lib/utils'

type SectionHeadingProps = {
  label: string
  title: string
  description?: string
  className?: string
  align?: 'left' | 'center'
}

export function SectionHeading({
  label,
  title,
  description,
  className,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className
      )}
    >
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-violet-400">
        {label}
      </p>
      <h2 className="mt-3 text-2xl font-bold tracking-tight text-white text-balance sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-neutral-400 sm:text-lg">
          {description}
        </p>
      )}
    </div>
  )
}
