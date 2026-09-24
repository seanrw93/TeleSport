import type { FC } from 'react'

interface EmptyStateProps {
  message: string
}

export const EmptyState: FC<EmptyStateProps> = ({ message }) => (
  <section aria-labelledby="empty-state-title">
    <h2 id="empty-state-title">{message}</h2>
  </section>
)
