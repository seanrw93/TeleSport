import type { FC, ReactNode } from 'react'

interface IndicatorCardProps {
  label: string
  value: ReactNode
  valueClassName: string
  accentClassName: string
}

export const IndicatorCard: FC<IndicatorCardProps> = ({
  label,
  value,
  valueClassName,
  accentClassName,
}) => (
  <article className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg shadow-slate-950/20 transition-colors hover:border-slate-700 focus-within:border-sky-400">
    <span className={`absolute inset-y-0 left-0 w-1 ${accentClassName}`} aria-hidden="true" />
    <p className="text-sm font-medium text-slate-400">{label}</p>
    <p className={`mt-3 text-4xl font-bold tracking-tight ${valueClassName}`}>{value}</p>
  </article>
)
