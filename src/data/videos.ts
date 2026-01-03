export type LocalVideoDuration = "short" | "medium" | "long"

export type LocalVideoItem = {
  id: string
  title: string
  publishedAt?: string
  description?: string
  thumbnail?: string
  duration: LocalVideoDuration
}

// Generated from content/youtube-videos.csv by: pnpm convert:youtube
// Do not edit src/data/videos.json manually unless you want to.
import rawVideos from './videos.json'

export const videos = rawVideos as LocalVideoItem[]
