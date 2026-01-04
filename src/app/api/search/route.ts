import { NextResponse } from 'next/server'
import Fuse from 'fuse.js'
import type { IFuseOptions } from 'fuse.js'
import { getBlogPosts } from '@/lib/mdx'
import { getVideoPageMetas } from '@/lib/video-mdx'

type SearchDocument = {
  id: string
  href: string
  title: string
  description: string
  type: 'Page' | 'Article' | 'Video'
  tags?: string[]
  date?: string
}

type SearchResult = SearchDocument & {
  score: number | null
}

const STATIC_PAGES: SearchDocument[] = [
  {
    id: 'page-home',
    href: '/',
    title: 'Home',
    description: 'Start here to explore lessons, videos, and resources.',
    type: 'Page',
  },
  {
    id: 'page-videos',
    href: '/videos',
    title: 'Videos',
    description: 'Watch in-depth coding lessons and walkthroughs.',
    type: 'Page',
  },
  {
    id: 'page-shorts',
    href: '/shorts',
    title: 'Shorts',
    description: 'Browse quick coding tips and mini-tutorials.',
    type: 'Page',
  },
  {
    id: 'page-blog',
    href: '/blog',
    title: 'Blog',
    description: 'Read long-form articles, guides, and project notes.',
    type: 'Page',
  },
]

const FUSE_OPTIONS: IFuseOptions<SearchDocument> = {
  includeScore: true,
  threshold: 0.35,
  ignoreLocation: true,
  keys: [
    { name: 'title', weight: 0.6 },
    { name: 'description', weight: 0.25 },
    { name: 'tags', weight: 0.15 },
  ],
}

export const revalidate = 0

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const rawQuery = searchParams.get('query') ?? ''
  const query = rawQuery.trim()

  const posts = await getBlogPosts()
  const postDocuments: SearchDocument[] = posts.map((post) => ({
    id: `article-${post.slug}`,
    href: `/blog/${post.slug}`,
    title: post.title,
    description: post.summary ?? '',
    type: 'Article',
    tags: post.tags ?? undefined,
    date: post.date,
  }))

  const videoMetas = getVideoPageMetas()
  const videoDocuments: SearchDocument[] = videoMetas.map((video) => ({
    id: `video-${video.id}`,
    href: `/videos/${video.slug}`,
    title: video.title,
    description: video.summary ?? '',
    type: 'Video',
    date: video.date,
  }))

  const documents: SearchDocument[] = [...STATIC_PAGES, ...videoDocuments, ...postDocuments]

  if (documents.length === 0) {
    return NextResponse.json({ query, results: [] })
  }

  const fuse = new Fuse(documents, FUSE_OPTIONS)

  let results: SearchResult[]

  if (query) {
    results = fuse.search(query).map(({ item, score }) => ({
      ...item,
      score: score ?? null,
    }))
  } else {
    const sortedPosts = [...postDocuments].sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0
      const dateB = b.date ? new Date(b.date).getTime() : 0
      return dateB - dateA
    })

    const sortedVideos = [...videoDocuments].sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0
      const dateB = b.date ? new Date(b.date).getTime() : 0
      return dateB - dateA
    })

    results = [...STATIC_PAGES, ...sortedVideos, ...sortedPosts].map((item) => ({
      ...item,
      score: null,
    }))
  }

  return NextResponse.json({
    query,
    results: results.slice(0, 20),
  })
}
