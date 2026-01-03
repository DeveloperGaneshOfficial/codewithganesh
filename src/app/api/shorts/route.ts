import { NextResponse } from 'next/server'

import { shorts } from '@/data/shorts'

const DEFAULT_LIMIT = 6
const MAX_LIMIT = 20

export const revalidate = 0

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const rawPageToken = searchParams.get('pageToken') ?? undefined
  const requestedLimit = Number(searchParams.get('limit'))
  const limit = Number.isFinite(requestedLimit) && requestedLimit > 0
    ? Math.min(requestedLimit, MAX_LIMIT)
    : DEFAULT_LIMIT

  const offset = decodeOffsetToken(rawPageToken)
  const ordered = shorts
    .slice()
    .sort((a, b) => {
      const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0
      const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0
      return dateB - dateA
    })

  const paged = ordered.slice(offset, offset + limit).map((short) => ({
    id: short.id,
    title: short.title,
    publishedAt: short.publishedAt ?? null,
    thumbnail: short.thumbnail ?? null,
  }))

  const nextOffset = offset + paged.length
  const nextPageToken = nextOffset < ordered.length
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
