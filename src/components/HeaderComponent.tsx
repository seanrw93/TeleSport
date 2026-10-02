import type { FC } from 'react'

interface HeaderComponentProps {
  title: string
  description: string
}

export const HeaderComponent: FC<HeaderComponentProps> = ({
  title,
  description,
}) => (
  <header className="mb-10 max-w-3xl">
    <div className="mb-5 flex items-center gap-3">
      <span className="h-2.5 w-2.5 rounded-full bg-sky-400 shadow-lg shadow-sky-400/40" aria-hidden="true" />
      <span className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">
        Tableau de bord
      </span>
    </div>
    <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
      {title}
    </h1>
    <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
      {description}
    </p>
  </header>
)
