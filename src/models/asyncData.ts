export interface AsyncData<T> {
  data: T | null
  isLoading: boolean
  error: Error | null
}