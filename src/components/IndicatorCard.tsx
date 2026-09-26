import type { FC, ReactNode } from 'react'

interface IndicatorCardProps {
  label: string
  value: ReactNode
  valueClassName: string
}

export const IndicatorCard: FC<IndicatorCardProps> = ({
  label,
  value,
  valueClassName,
}) => (
  <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
    <h3 className="text-xl font-semibold mb-2">{label}</h3>
    <p className={`text-4xl font-bold ${valueClassName}`}>{value}</p>
  </div>
)
