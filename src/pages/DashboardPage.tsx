import type { FC } from 'react'
import { ErrorState } from '../components/ErrorState.tsx'
import { HeaderComponent } from '../components/HeaderComponent.tsx'
import { IndicatorCard } from '../components/IndicatorCard.tsx'
import { LoadingState } from '../components/LoadingState.tsx'
import { MedalTotalsChart } from '../components/MedalTotalsChart.tsx'
import { useOlympics } from '../hooks/useData.ts'
import { calculateTotalMedals } from '../utils/olympicCalculations.ts'

export const DashboardPage: FC = () => {
  const { data, isLoading, error } = useOlympics()

  const totalParticipatingCountries = data?.length ?? 0
  const totalGamesEditions = 5
  const totalMedals = data?.reduce(
    (total, country) => total + calculateTotalMedals(country),
    0,
  ) ?? 0

  if (isLoading || !data) {
    return <LoadingState message="Chargement..." />
  }

  if (error) {
    return <ErrorState message={error.message} />
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <HeaderComponent
          title="Historique des Jeux Olympiques - TéléSport"
          description="Bienvenue sur la page dédiée à l'historique des Jeux Olympiques. Explorez les performances des pays au fil des années."
        />

        <section aria-labelledby="overview-title" className="mb-8">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2 id="overview-title" className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
              Vue d'ensemble
            </h2>
            <span className="rounded-full border border-slate-800 bg-slate-900 px-3 py-1 text-xs font-medium text-slate-400">
              Données historiques
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <IndicatorCard
              label="Pays participants"
              value={totalParticipatingCountries}
              valueClassName="text-sky-300"
              accentClassName="bg-sky-400"
            />
            <IndicatorCard
              label="Éditions des JO"
              value={totalGamesEditions}
              valueClassName="text-emerald-300"
              accentClassName="bg-emerald-400"
            />
            <IndicatorCard
              label="Médailles recensées"
              value={totalMedals}
              valueClassName="text-amber-300"
              accentClassName="bg-amber-400"
            />
          </div>
        </section>

        <section
          aria-labelledby="medals-title"
          className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 shadow-2xl shadow-slate-950/40"
        >
          <div className="flex flex-col gap-3 border-b border-slate-800 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">
                Performances
              </p>
              <h2 id="medals-title" className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                Total des médailles par pays
              </h2>
            </div>
            <p className="text-sm text-slate-400">Cumul des cinq dernières éditions</p>
          </div>
          <MedalTotalsChart countries={data} />
        </section>

        <p className="mt-5 text-center text-sm text-slate-500">
          Survolez le graphique pour consulter le détail de chaque pays.
        </p>
      </div>
    </div>
  )
}
