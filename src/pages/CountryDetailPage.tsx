import type { FC } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ErrorState } from '../components/ErrorState.tsx'
import { IndicatorCard } from '../components/IndicatorCard.tsx'
import { LoadingState } from '../components/LoadingState.tsx'
import { MedalEvolutionChart } from '../components/MedalEvolutionChart.tsx'
import { useCountry } from '../hooks/useCountry.ts'
import { calculateTotalAthletes, calculateTotalMedals } from '../utils/olympicCalculations.ts'

export const CountryDetailPage: FC = () => {
  const { id } = useParams<{ id: string }>()
  const parsedId = id === undefined ? Number.NaN : Number(id)
  const countryId = Number.isInteger(parsedId) ? parsedId : -1
  const { data, isLoading, error } = useCountry(countryId)

  if (!Number.isInteger(parsedId) || parsedId < 1) {
    return <ErrorState message="Pays introuvable. L'identifiant est invalide." />
  }

  if (isLoading) {
    return <LoadingState message="Chargement..." />
  }

  if (error) {
    return <ErrorState message={error.message} />
  }

  if (!data) {
    return <ErrorState message="Pays introuvable." />
  }

  const totalMedals = calculateTotalMedals(data);
  const totalAthletes = calculateTotalAthletes(data);
  

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <Link
          to="/"
          className="mb-8 inline-flex rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:border-sky-400 hover:text-sky-300"
        >
          Retour au tableau de bord
        </Link>

        <header className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-sky-300">
            Détail du pays
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-white">
            {data.country}
          </h1>
        </header>

        <section aria-labelledby="country-overview-title" className="mb-8">
          <h2 id="country-overview-title" className="sr-only">
            Indicateurs du pays
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <IndicatorCard
              label="Participations"
              value={data.participations.length}
              valueClassName="text-sky-300"
              accentClassName="bg-sky-400"
            />
            <IndicatorCard
              label="Total médailles"
              value={totalMedals}
              valueClassName="text-amber-300"
              accentClassName="bg-amber-400"
            />
            <IndicatorCard
              label="Total athlètes"
              value={totalAthletes}
              valueClassName="text-emerald-300"
              accentClassName="bg-emerald-400"
            />
          </div>
        </section>

        <section
          aria-labelledby="evolution-title"
          className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-2xl shadow-slate-950/40 sm:p-8"
        >
          <h2 id="evolution-title" className="mb-6 text-xl font-semibold text-white sm:text-2xl">
            Évolution des médailles
          </h2>
          <MedalEvolutionChart country={data} />
        </section>
      </div>
    </div>
  )
}
