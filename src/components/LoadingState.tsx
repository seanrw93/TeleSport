import type { FC } from 'react'

interface LoadingStateProps {
  message: string
}

export const LoadingState: FC<LoadingStateProps> = ({ message }) => (
  <div role="status" aria-live="polite">
    {message}
  </div>
)
