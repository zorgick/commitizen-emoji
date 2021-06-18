declare module 'cli-truncate' {
  export default function truncate(
    text: string,
    columns: number,
    options?: {
      position?: 'start' | 'middle' | 'end',
      space?: boolean
    }
  ): void
}
