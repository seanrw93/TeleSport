import type { FC } from 'react'
import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Tooltip,
} from 'chart.js'
import type { ChartData, ChartOptions } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import type { Olympic } from '../models/olympic.ts'

ChartJS.register(ArcElement, Tooltip, Legend)

interface MedalTotalsChartProps {
  countries: Olympic[]
}

const backgroundColors = [
  'rgba(255, 99, 132, 0.6)',
  'rgba(54, 162, 235, 0.6)',
  'rgba(255, 206, 86, 0.6)',
  'rgba(75, 192, 192, 0.6)',
  'rgba(153, 102, 255, 0.6)',
]

const borderColors = [
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
]

const chartOptions: ChartOptions<'pie'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: 'white',
      },
    },
  },
}

export const MedalTotalsChart: FC<MedalTotalsChartProps> = ({ countries }) => {
  const chartData: ChartData<'pie', number[], string> = {
    labels: countries.map((country) => country.country),
    datasets: [
      {
        label: 'Total des médailles',
        data: countries.map((country) =>
          country.participations.reduce(
            (total, participation) => total + participation.medalsCount,
            0,
          ),
        ),
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  }

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-xl">
      <div style={{ height: '400px' }}>
        <Pie data={chartData} options={chartOptions} />
      </div>
    </div>
  )
}
