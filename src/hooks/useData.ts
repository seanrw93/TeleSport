import { useEffect, useState } from 'react'
import { olympicsData } from '../data/olympicsData.ts'
import type { Olympic } from '../models/olympic.ts'

interface UseDataResult {
  data: Olympic[] | null
  isLoading: boolean
  error: Error | null
}

export const useData = (): UseDataResult => {
  const [data, setData] = useState<Olympic[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      try {
        setData(olympicsData)
        setIsLoading(false)
      } catch (caughtError) {
        setError(
          caughtError instanceof Error
            ? caughtError
            : new Error('Impossible de charger les données'),
        )
        setIsLoading(false)
      }
    }, 500)

    return () => window.clearTimeout(timeoutId)
  }, [])

  return { data, isLoading, error }
}
