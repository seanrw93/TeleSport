import { type FC } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LoadingState } from './components/LoadingState.tsx'
import { HeaderComponent } from './components/HeaderComponent.tsx'
import { IndicatorCard } from './components/IndicatorCard.tsx'
import { ErrorState } from './components/ErrorState.tsx'
import { MedalTotalsChart } from './components/MedalTotalsChart.tsx'
import { useData } from './hooks/useData.ts'

// Anti-pattern 2 — Composant incohérent avec le nom du fichier (ex. Home dans App.tsx).
const Home: FC = () => {
  const { data, isLoading, error } = useData()

  const totalParticipatingCountries = data?.length ?? 0
  const totalGamesEditions = 5

  if (isLoading) {
    return <LoadingState message="Chargement..." />
  }

  if (error) {
    return <ErrorState message={error.message} />
  }

  if (!data) {
    return <LoadingState message="Chargement..." />
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <HeaderComponent
          title="Historique des Jeux Olympiques - TéléSport"
          description="Bienvenue sur la page dédiée à l'historique des Jeux Olympiques. Explorez les performances des pays au fil des années."
        />

        {/* Anti-pattern 8 — Cartes dupliquées — extraire en composant réutilisable (Indicator.tsx). */}
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

// Anti-pattern 11 — Routing dans App.tsx — idéalement : module dédié.
export const App: FC = () => {
  // Anti-pattern 5 — console.log à retirer.
  console.log('App rendered')

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
