import { NextResponse } from 'next/server'

import { videos } from '@/data/videos'
import { slugify } from '@/lib/utils'

const DEFAULT_LIMIT = 6
const MAX_LIMIT = 24

const ALLOWED_DURATIONS = new Set(['any', 'long', 'medium', 'short'] as const)

type VideoDuration = 'any' | 'long' | 'medium' | 'short'
type TokenState = Partial<Record<VideoDuration, string | null>>

type YouTubeSearchResponse = {
  items?: Array<{
    id?: { videoId?: string }
    snippet?: {
      title?: string
      publishedAt?: string
      description?: string
      thumbnails?: {
        high?: { url?: string }
        medium?: { url?: string }
      }
    }
  }>
  nextPageToken?: string
}

type VideoItem = {
  id: string
  slug: string
  title: string
  publishedAt: string | null
  description: string | null
  thumbnail: string | null
}

export const revalidate = 0

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const rawPageToken = searchParams.get('pageToken') ?? undefined
  const requestedLimit = Number(searchParams.get('limit'))
  const limit = Number.isFinite(requestedLimit) && requestedLimit > 0
    ? Math.min(requestedLimit, MAX_LIMIT)
    : DEFAULT_LIMIT

  const requestedDurations = (searchParams.get('duration') ?? 'long,medium')
    .split(',')
    .map((value) => value.trim().toLowerCase())
    .filter((value): value is VideoDuration => ALLOWED_DURATIONS.has(value as VideoDuration))

  const durations = requestedDurations.length > 0 ? requestedDurations : (['long'] as VideoDuration[])

  const offset = decodeOffsetToken(rawPageToken)

  const normalizedDurations = new Set(durations)
  const filtered = videos
    .filter((video) => {
      if (normalizedDurations.has('any')) return true
      return normalizedDurations.has(video.duration)
    })
    .map<VideoItem>((video) => ({
      id: video.id,
      slug: slugify(video.title),
      title: video.title,
      publishedAt: video.publishedAt ?? null,
      description: video.description ?? null,
      thumbnail: video.thumbnail ?? null,
    }))
    .sort((a, b) => {
      const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0
      const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0
      return dateB - dateA
    })

  const paged = filtered.slice(offset, offset + limit)
  const nextOffset = offset + paged.length
  const nextPageToken = nextOffset < filtered.length
    ? encodeOffsetToken(nextOffset)
    : null

  return NextResponse.json({
    items: paged,
    nextPageToken,
  })
}

function decodeOffsetToken(raw?: string): number {
  if (!raw) return 0
  try {
    const json = Buffer.from(raw, 'base64').toString('utf8')
    const parsed = JSON.parse(json) as { offset?: unknown }
    const offset = typeof parsed.offset === 'number' ? parsed.offset : Number(parsed.offset)
    return Number.isFinite(offset) && offset > 0 ? Math.floor(offset) : 0
  } catch {
    return 0
  }
}

function encodeOffsetToken(offset: number): string {
  return Buffer.from(JSON.stringify({ offset })).toString('base64')
}
