import type { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ErrorState } from '../components/ErrorState.tsx'

interface NotFoundLocationState {
  reason?: unknown
}

export const NotFoundPage: FC = () => {
  const location = useLocation()
  const locationState = location.state as NotFoundLocationState | null
  const reason =
    typeof locationState?.reason === 'string'
      ? locationState.reason
      : 'La page que vous recherchez n’existe pas ou a été déplacée.'

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-12 text-slate-100">
      <section
        className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900/80 p-8 text-center shadow-2xl shadow-slate-950/40 sm:p-12"
        aria-labelledby="not-found-title"
      >
        <h1 className="text-4xl font-semibold uppercase tracking-[0.2em] text-sky-300">
          404
        </h1>
        <h2
          id="not-found-title"
          className="mt-4 text-3xl font-bold tracking-tight text-white"
        >
          Page introuvable
        </h2>
        <div className="mt-4 text-center">
          <ErrorState message={reason} />
        </div>
        <Link
          to="/"
          className="mt-8 inline-flex rounded-lg bg-sky-400 px-5 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-sky-300 focus-visible:outline-sky-300"
        >
          Retour au tableau de bord
        </Link>
      </section>
    </main>
  )
}
