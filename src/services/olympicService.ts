import { olympicsData } from '../data/olympicsData';
import type { Olympic } from '../models/olympic';

const MOCK_DELAY = 500

export const olympicService = {
    getAll(): Promise<Olympic[]> {
        return new Promise((resolve) => {
            window.setTimeout(() => {
                resolve(olympicsData)
            }, MOCK_DELAY)
        })
    },

    getById(id: number): Promise<Olympic | undefined> {
        return new Promise((resolve) => {
            window.setTimeout(() => {
                resolve(olympicsData.find((olympic) => olympic.id === id))
            }, MOCK_DELAY)
        })
    }
}