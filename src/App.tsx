import { type FC } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
} from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { LoadingState } from './components/LoadingState.tsx'
import { HeaderComponent } from './components/HeaderComponent.tsx'
import { IndicatorCard } from './components/IndicatorCard.tsx'
import { ErrorState } from './components/ErrorState.tsx'
import { useData } from './hooks/useData.ts'
import type { Olympic } from './models/olympic.ts'

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
)

// Anti-pattern 2 — Composant incohérent avec le nom du fichier (ex. Home dans App.tsx).
const Home: FC = () => {
  const { data, isLoading, error } = useData()

  // Anti-pattern 6 — Logique métier complexe directement dans le composant
  const calculateTotalMedals = (country: Olympic) => {
    return country.participations.reduce(
      (sum, participation) => sum + participation.medalsCount,
      0,
    )
  }

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

  const chartData = {
    labels: data.map((country) => country.country),
    datasets: [
      {
        label: 'Total des médailles',
        data: data.map(calculateTotalMedals),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: 'white',
        },
      },
    },
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

        <div className="bg-gray-800 p-8 rounded-lg shadow-xl">
          <div style={{ height: '400px' }}>
            <Pie data={chartData} options={chartOptions} />
          </div>
        </div>

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
