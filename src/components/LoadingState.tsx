import type { FC } from 'react'

interface LoadingStateProps {
  message: string
}

export const LoadingState: FC<LoadingStateProps> = ({ message }) => (
  <div 
    role="status" 
    aria-live="polite"
    className="fixed inset-0 flex items-center justify-center gap-3"
  >
    <div 
      className="h-4 w-4 animate-spin rounded-full border border-solid border-r-transparent border-t-transparent border-l-current border-b-current">
    </div>
    {message}
  </div>
)
