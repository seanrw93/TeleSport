import { useEffect, useState } from 'react'
import { olympicService } from '../services/olympicService.ts'
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
    olympicService
      .getAll()
      .then((countries) => {
          setData(countries)
          setIsLoading(false)
      })
      .catch((caughtError: unknown) => {
          setError(
            caughtError instanceof Error
              ? caughtError
              : new Error('Impossible de charger les données'),
          )
          setIsLoading(false)
      })
    }, [])

  return { data, isLoading, error }
}
