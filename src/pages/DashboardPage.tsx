import type { FC } from 'react'
import { ErrorState } from '../components/ErrorState.tsx'
import { HeaderComponent } from '../components/HeaderComponent.tsx'
import { IndicatorCard } from '../components/IndicatorCard.tsx'
import { LoadingState } from '../components/LoadingState.tsx'
import { MedalTotalsChart } from '../components/MedalTotalsChart.tsx'
import { useData } from '../hooks/useData.ts'

export const DashboardPage: FC = () => {
  const { data, isLoading, error } = useData()

  const totalParticipatingCountries = data?.length ?? 0
  const totalGamesEditions = 5

  if (isLoading || !data) {
    return <LoadingState message="Chargement..." />
  }

  if (error) {
    return <ErrorState message={error.message} />
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <HeaderComponent
          title="Historique des Jeux Olympiques - TéléSport"
          description="Bienvenue sur la page dédiée à l'historique des Jeux Olympiques. Explorez les performances des pays au fil des années."
        />

        <div className="mb-2">
          <div className="mb-2">
            <IndicatorCard
              label="Pays participants"
              value={totalParticipatingCountries}
              valueClassName="text-blue-400"
            />
          </div>
          <IndicatorCard
            label="Éditions des JO"
            value={totalGamesEditions}
            valueClassName="text-green-400"
          />
        </div>

        <MedalTotalsChart countries={data} />

        <div className="text-sm text-gray-400">
          <p>Cliquez sur un pays pour voir ses détails</p>
        </div>
      </div>
    </div>
  )
}
