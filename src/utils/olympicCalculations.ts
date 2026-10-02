import type { Olympic } from '../models/olympic.ts'

export const calculateTotalMedals = (data: Olympic): number =>
  data?.participations.reduce(
    (total, participation) => total + participation.medalsCount,
    0,
  )

export const calculateTotalAthletes = (data: Olympic): number =>
  data?.participations.reduce(
    (total, participation) => total + participation.athleteCount,
    0,
  )