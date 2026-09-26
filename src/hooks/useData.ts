import { useEffect, useState } from 'react'
import { olympicService } from '../services/olympicService.ts'
import type { Olympic } from '../models/olympic.ts'
import type { AsyncData } from '../models/asyncData'

export const useOlympics = (): AsyncData<Olympic[]> => {
  const [state, setState] = useState<AsyncData<Olympic[]>>({
    data: null,
    isLoading: true,
    error: null,
  })

  useEffect(() => {
    olympicService
      .getAll()
      .then((data) => {
        setState({ data, isLoading: false, error: null })
      })
      .catch((caughtError: unknown) => {
        setState({
          data: null,
          isLoading: false,
          error:
            caughtError instanceof Error
              ? caughtError
              : new Error('Impossible de charger les données'),
        })
      })
  }, [])

  return state
}
