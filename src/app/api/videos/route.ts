import { NextResponse } from 'next/server'

const API_URL = 'https://www.googleapis.com/youtube/v3/search'
const API_KEY = process.env.YOUTUBE_API_KEY
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID

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
  title: string
  publishedAt: string | null
  description: string | null
  thumbnail: string | null
}

export const revalidate = 0

export async function GET(request: Request) {
  if (!API_KEY || !CHANNEL_ID) {
    return NextResponse.json({ error: 'Missing YouTube API credentials' }, { status: 500 })
  }

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

  const durations = requestedDurations.length > 0 ? requestedDurations : ['long']

  const incomingTokenState = decodeTokenState(rawPageToken)
  const outgoingTokenState: TokenState = { ...incomingTokenState }
  const seenIds = new Set<string>()
  const aggregated: VideoItem[] = []

  try {
    for (const duration of durations) {
      if (aggregated.length >= limit) {
        // Preserve existing token to continue paging this duration later
        outgoingTokenState[duration] = incomingTokenState[duration] ?? null
        continue
      }

      const remaining = Math.min(limit - aggregated.length, MAX_LIMIT)
      if (remaining <= 0) break

      const { items, nextPageToken } = await fetchVideosForDuration({
        duration,
        limit: remaining,
        pageToken: incomingTokenState[duration] ?? undefined,
      })

      outgoingTokenState[duration] = nextPageToken

      for (const item of items) {
        if (!seenIds.has(item.id) && aggregated.length < limit) {
          aggregated.push(item)
          seenIds.add(item.id)
        }
      }
    }
  } catch (error) {
    console.error('Failed to fetch videos', error)
    return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 502 })
  }

  aggregated.sort((a, b) => {
    const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0
    const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0
    return dateB - dateA
  })

  const filteredTokenState = Object.fromEntries(
    durations
      .map((duration) => [duration, outgoingTokenState[duration] ?? null] as const)
      .filter(([, token]) => token)
  ) as TokenState

  const nextPageToken = Object.keys(filteredTokenState).length > 0
    ? Buffer.from(JSON.stringify(filteredTokenState)).toString('base64')
    : null

  return NextResponse.json({
    items: aggregated,
    nextPageToken,
  })
}

async function fetchVideosForDuration({
  duration,
  limit,
  pageToken,
}: {
  duration: VideoDuration
  limit: number
  pageToken?: string
}): Promise<{ items: VideoItem[]; nextPageToken: string | null }> {
  const params = new URLSearchParams({
    key: API_KEY!,
    channelId: CHANNEL_ID!,
    part: 'snippet',
    order: 'date',
    type: 'video',
    maxResults: `${Math.max(1, Math.min(limit, MAX_LIMIT))}`,
    fields: 'items(id/videoId,snippet(title,publishedAt,description,thumbnails/high,thumbnails/medium)),nextPageToken'
  })

  if (duration !== 'any') {
    params.set('videoDuration', duration)
  }

  if (pageToken) {
    params.set('pageToken', pageToken)
  }

  const response = await fetch(`${API_URL}?${params.toString()}`, { cache: 'no-store' })

  if (!response.ok) {
    const errorBody = await response.text()
    console.error('YouTube API error', response.status, errorBody)
    throw new Error('Failed to fetch videos')
  }

  const data = (await response.json()) as YouTubeSearchResponse
  const items = (data.items ?? [])
    .map((item) => {
      const videoId = item.id?.videoId
      if (!videoId) return null
      const snippet = item.snippet ?? {}
      const thumbnail = snippet.thumbnails?.high?.url ?? snippet.thumbnails?.medium?.url ?? null
      return {
        id: videoId,
        title: snippet.title ?? 'Untitled Video',
        publishedAt: snippet.publishedAt ?? null,
        description: snippet.description ?? null,
        thumbnail,
      }
    })
    .filter((item): item is VideoItem => Boolean(item))

  return {
    items,
    nextPageToken: data.nextPageToken ?? null,
  }
}

function decodeTokenState(raw?: string): TokenState {
  if (!raw) return {}
  try {
    const json = Buffer.from(raw, 'base64').toString('utf8')
    const parsed = JSON.parse(json) as TokenState
    return Object.fromEntries(
      Object.entries(parsed).filter(([key]) => ALLOWED_DURATIONS.has(key as VideoDuration))
    ) as TokenState
  } catch (error) {
    console.warn('Failed to decode videos page token:', error)
    return {}
  }
}
