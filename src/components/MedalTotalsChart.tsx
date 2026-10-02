import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Tooltip,
} from 'chart.js'
import type { ActiveElement, ChartData, ChartEvent, ChartOptions } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import type { Olympic } from '../models/olympic.ts'
import { calculateTotalMedals } from '../utils/olympicCalculations.ts'

ChartJS.register(ArcElement, Tooltip, Legend)

interface MedalTotalsChartProps {
  countries: Olympic[]
}

const backgroundColors = [
  'rgba(56, 189, 248, 0.78)',
  'rgba(52, 211, 153, 0.78)',
  'rgba(251, 191, 36, 0.78)',
  'rgba(129, 140, 248, 0.78)',
  'rgba(244, 114, 182, 0.78)',
]

const borderColors = [
  'rgb(56, 189, 248)',
  'rgb(52, 211, 153)',
  'rgb(251, 191, 36)',
  'rgb(129, 140, 248)',
  'rgb(244, 114, 182)',
]

const chartOptions: ChartOptions<'pie'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: '#cbd5e1',
        padding: 20,
        usePointStyle: true,
        pointStyle: 'circle',
      },
    },
  },
  onHover: (event, activeElements, chart) => {
    if (activeElements.length > 0) {
      const firstSlice = activeElements[0];
      
      const datasetIndex = firstSlice.datasetIndex; 
      const sliceIndex = firstSlice.index; 
      const label = chart.data.labels?.[sliceIndex];
      const value = chart.data.datasets[datasetIndex].data?.[sliceIndex];

      console.log(`Hovered slice: ${label} with a value of ${value}`);

      if (event.native && event.native.target) {
        (event.native.target as HTMLElement).style.cursor = 'pointer';
      }
    } else {
      if (event.native && event.native.target) {
        (event.native.target as HTMLElement).style.cursor = 'default';
      }
    }
  },
}

export const MedalTotalsChart: FC<MedalTotalsChartProps> = ({ countries }) => {
  const navigate = useNavigate()
  const chartData: ChartData<'pie', number[], string> = {
    labels: countries.map((country) => country.country),
    datasets: [
      {
        label: 'Total des médailles',
        data: countries.map(calculateTotalMedals),
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  }

  const chartOptionsWithNavigation: ChartOptions<'pie'> = {
    ...chartOptions,
    onClick: (_event: ChartEvent, elements: ActiveElement[]) => {
      const element = elements[0]
      if (element) {
        const country = countries[element.index]
        if (country) {
          navigate(`/country/${country.id}`)
        }
      }
    },
  }

  return (
    <div className="p-4 sm:p-8">
      <div className="h-88 sm:h-104" role="img" aria-label="Graphique circulaire présentant le total des médailles par pays">
        <Pie data={chartData} options={chartOptionsWithNavigation} />
      </div>
    </div>
  )
}
