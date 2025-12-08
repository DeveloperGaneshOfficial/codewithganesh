import { NextResponse } from 'next/server'

const API_URL = 'https://www.googleapis.com/youtube/v3/search'
const API_KEY = process.env.YOUTUBE_API_KEY
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID

const DEFAULT_LIMIT = 6
const MAX_LIMIT = 20

export const revalidate = 0

export async function GET(request: Request) {
  if (!API_KEY || !CHANNEL_ID) {
    return NextResponse.json({
      error: 'Missing YouTube API credentials',
    }, { status: 500 })
  }

  const { searchParams } = new URL(request.url)
  const pageToken = searchParams.get('pageToken') ?? undefined
  const requestedLimit = Number(searchParams.get('limit'))
  const limit = Number.isFinite(requestedLimit) && requestedLimit > 0
    ? Math.min(requestedLimit, MAX_LIMIT)
    : DEFAULT_LIMIT

  const query = new URLSearchParams({
    key: API_KEY,
    channelId: CHANNEL_ID,
    part: 'snippet',
    order: 'date',
    type: 'video',
    videoDuration: 'short',
    maxResults: `${limit}`,
    fields: 'items(id/videoId,snippet(title,publishedAt,thumbnails/high,thumbnails/medium)),nextPageToken',
  })

  if (pageToken) {
    query.set('pageToken', pageToken)
  }

  const response = await fetch(`${API_URL}?${query.toString()}`, {
    cache: 'no-store',
  })

  if (!response.ok) {
    const errorBody = await response.text()
    console.error('YouTube API error', response.status, errorBody)
    return NextResponse.json({ error: 'Failed to fetch shorts' }, { status: 502 })
  }

  const data = await response.json() as {
    items?: Array<{
      id?: { videoId?: string }
      snippet?: {
        title?: string
        publishedAt?: string
        thumbnails?: {
          high?: { url?: string }
          medium?: { url?: string }
        }
      }
    }>
    nextPageToken?: string
  }

  const items = (data.items ?? [])
    .map((item) => {
      const videoId = item.id?.videoId
      if (!videoId) return null
      const snippet = item.snippet ?? {}
      const thumbnail = snippet.thumbnails?.high?.url
        ?? snippet.thumbnails?.medium?.url
        ?? null
      return {
        id: videoId,
        title: snippet.title ?? 'Untitled Short',
        publishedAt: snippet.publishedAt ?? null,
        thumbnail,
      }
    })
    .filter((item): item is {
      id: string
      title: string
      publishedAt: string | null
      thumbnail: string | null
    } => Boolean(item))

  return NextResponse.json({
    items,
    nextPageToken: data.nextPageToken ?? null,
  })
}
