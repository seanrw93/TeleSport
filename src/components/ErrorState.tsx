import type { FC } from 'react'

interface ErrorStateProps {
  message: string
}

export const ErrorState: FC<ErrorStateProps> = ({ message }) => (
  <section role="alert" aria-labelledby="error-state-title">
    <h2 id="error-state-title">{message}</h2>
  </section>
)
