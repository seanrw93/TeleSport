import type { FC } from 'react'

interface HeaderComponentProps {
  title: string
  description: string
}

export const HeaderComponent: FC<HeaderComponentProps> = ({
  title,
  description,
}) => (
  <header>
    <h1 className="text-4xl font-bold mb-8">{title}</h1>
    <div className="mb-8">
      <p className="text-lg">{description}</p>
    </div>
  </header>
)
