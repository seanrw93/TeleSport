// src/hooks/useCountry.ts
import { useEffect, useState } from 'react'
import { olympicService } from '../services/olympicService'
import type { Olympic } from '../models/olympic'
import type { AsyncData } from '../models/asyncData'

export const useCountry = (id: number): AsyncData<Olympic | undefined> => {
  const [state, setState] = useState<AsyncData<Olympic | undefined>>({
    data: null,
    isLoading: true,
    error: null,
  })

  useEffect(() => {
    setState({ data: null, isLoading: true, error: null })

    olympicService
      .getById(id)
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
              : new Error('Impossible de charger le pays'),
        })
      })
  }, [id])

  return state
}