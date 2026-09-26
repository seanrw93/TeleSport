import type { Olympic } from '../models/olympic.ts'

export const calculateTotalMedals = (olympic: Olympic): number =>
  olympic.participations.reduce(
    (total, participation) => total + participation.medalsCount,
    0,
  )
