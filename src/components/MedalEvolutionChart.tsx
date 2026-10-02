import type { FC } from 'react'
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js'
import type { ChartData, ChartOptions } from 'chart.js'
import { Line } from 'react-chartjs-2'
import type { Olympic } from '../models/olympic'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
)

interface MedalEvolutionChartProps {
  country: Olympic
}

const chartOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: '#cbd5e1',
      },
    },
    tooltip: {
      callbacks: {
        label: (context) =>
          `${context.dataset.label ?? 'Valeur'}: ${context.parsed.y}`,
      },
    },
  },
  onHover: (event, activeElements, chart) => {
    if (activeElements.length > 0) {
      const firstPoint = activeElements[0];
      const datasetIndex = firstPoint.datasetIndex;
      const index = firstPoint.index;
      
      const label = chart.data.labels?.[index];
      const value = chart.data.datasets[datasetIndex].data?.[index];
      const datasetLabel = chart.data.datasets[datasetIndex].label;

      console.log(`Hovered: ${datasetLabel} in ${label} = ${value}`);
      
      if (event.native && event.native.target) {
        (event.native.target as HTMLElement).style.cursor = 'pointer';
      }
    } else {
      if (event.native && event.native.target) {
        (event.native.target as HTMLElement).style.cursor = 'default';
      }
    }
  },
  scales: {
    y: {
      ticks: {
        color: '#cbd5e1',
      },
      grid: {
        color: 'rgba(148, 163, 184, 0.15)',
      },
    },
    x: {
      ticks: {
        color: '#cbd5e1',
      },
      grid: {
        color: 'rgba(148, 163, 184, 0.15)',
      },
    },
  },
}

export const MedalEvolutionChart: FC<MedalEvolutionChartProps> = ({
  country,
}) => {
  const participations = [...country.participations].sort(
    (left, right) => left.year - right.year,
  )

  const chartData: ChartData<'line', number[], string> = {
    labels: participations.map((participation) =>
      participation.year.toString(),
    ),
    datasets: [
      {
        label: 'Nombre de médailles',
        data: participations.map((participation) => participation.medalsCount),
        borderColor: 'rgb(56, 189, 248)',
        backgroundColor: 'rgba(56, 189, 248, 0.2)',
        pointBackgroundColor: 'rgb(56, 189, 248)',
        tension: 0.3,
      },
      {
        label: "Nombre d'athlètes",
        data: participations.map((participation) => participation.athleteCount),
        borderColor: 'rgb(52, 211, 153)',
        backgroundColor: 'rgba(52, 211, 153, 0.2)',
        pointBackgroundColor: 'rgb(52, 211, 153)',
        tension: 0.3,
      },
      {
        label: 'Participations cumulées',
        data: participations.map((_, index) => index + 1),
        borderColor: 'rgb(251, 191, 36)',
        backgroundColor: 'rgba(251, 191, 36, 0.2)',
        pointBackgroundColor: 'rgb(251, 191, 36)',
        tension: 0.3,
      },
    ],
  }

  return (
    <div
      className="h-80 sm:h-104"
      role="img"
      aria-label={`Évolution des médailles, athlètes et participations de ${country.country}`}
    >
      <Line data={chartData} options={chartOptions} />
    </div>
  )
}
