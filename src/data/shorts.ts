export type LocalShortItem = {
  id: string
  title: string
  publishedAt?: string
  thumbnail?: string
}

// Generated from content/youtube-shorts.csv by: pnpm convert:youtube
// Do not edit src/data/shorts.json manually unless you want to.
import rawShorts from './shorts.json'

export const shorts = rawShorts as LocalShortItem[]
