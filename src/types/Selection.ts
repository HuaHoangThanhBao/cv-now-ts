export type Selection<T> = {
  data: T[]
  setOption: (option: string) => void
  action?: () => void
}
