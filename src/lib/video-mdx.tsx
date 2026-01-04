import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { compileMDX } from 'next-mdx-remote/rsc'

// MDX Plugins
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { remarkAlert } from 'remark-github-blockquote-alert'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import rehypeKatexNoTranslate from 'rehype-katex-notranslate'
import rehypeCitation from 'rehype-citation'
import rehypePrettyCode from 'rehype-pretty-code'
import { fromHtmlIsomorphic } from 'hast-util-from-html-isomorphic'

import { components } from '@/components/MDXComponents'
import TOCInline from 'pliny/ui/TOCInline'
import { slugify } from '@/lib/utils'

export type VideoTocItem = {
  value: string
  url: string
  depth: number
}

export type VideoPage = {
  id: string
  slug: string
  title: string
  date: string
  summary?: string
  thumbnail?: string
  youtubeSrc?: string
  youtubeId: string
  toc: VideoTocItem[]
  body: any
}

export type VideoPageMeta = {
  id: string
  slug: string
  title: string
  date?: string
  summary?: string
  thumbnail?: string
  youtubeSrc?: string
  youtubeId: string
}

const root = process.cwd()
const videosDir = path.join(root, 'content', 'videos')

const icon = fromHtmlIsomorphic(
  `
  <span class="content-header-link">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 linkicon">
  <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z" />
  <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z" />
  </svg>
  </span>
  `,
  { fragment: true }
)

export function getVideoPageIds(): string[] {
  if (!fs.existsSync(videosDir)) return []
  const files = fs.readdirSync(videosDir)
  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''))
    .filter((id) => id.toLowerCase() !== 'readme')
}

export function getVideoPageMetas(): VideoPageMeta[] {
  const ids = getVideoPageIds()

  const metas: VideoPageMeta[] = []

  for (const id of ids) {
    const filePath = path.join(videosDir, `${id}.mdx`)
    if (!fs.existsSync(filePath)) continue

    const source = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(source)

    const title = typeof data.title === 'string' ? data.title : 'Untitled Video'
    const date = typeof data.date === 'string' ? data.date : undefined
    const summary = typeof data.summary === 'string' ? data.summary : undefined
    const thumbnail = typeof data.thumbnail === 'string' ? data.thumbnail : undefined
    const youtubeSrc = typeof data.youtubeSrc === 'string' && data.youtubeSrc.trim().length > 0
      ? data.youtubeSrc.trim()
      : undefined
    const youtubeId = typeof data.youtubeId === 'string' && data.youtubeId.trim().length > 0
      ? data.youtubeId.trim()
      : id

    metas.push({
      id,
      slug: slugify(title),
      title,
      date,
      summary,
      thumbnail,
      youtubeSrc,
      youtubeId,
    })
  }

  return metas
}

export function getVideoPageIdBySlug(slug: string): string | null {
  const safeSlug = slug.trim().toLowerCase()
  if (!safeSlug) return null

  const metas = getVideoPageMetas()
  const match = metas.find((meta) => meta.slug === safeSlug)
  return match?.id ?? null
}

export async function getVideoPageBySlug(slug: string): Promise<VideoPage | null> {
  const id = getVideoPageIdBySlug(slug)
  if (!id) return null
  return getVideoPageById(id)
}

export async function getVideoPageById(id: string): Promise<VideoPage | null> {
  const safeId = id.trim()
  if (!safeId) return null

  const filePath = path.join(videosDir, `${safeId}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const source = fs.readFileSync(filePath, 'utf8')
  const { content, data } = matter(source)

  const { extractTocHeadings } = await import('pliny/mdx-plugins/index.js')
  const toc = await extractTocHeadings(content)

  const { content: mdxContent } = await compileMDX({
    source: content,
    components: {
      ...components,
      TOCInline: (props: any) => <TOCInline {...props} toc={Array.isArray(toc) ? toc : []} />,
    },
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkMath, remarkAlert],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: 'prepend',
              headingProperties: {
                className: ['content-header'],
              },
              content: icon,
            },
          ],
          rehypeKatex,
          rehypeKatexNoTranslate,
          [rehypeCitation, { path: path.join(root, 'content') }],
          [
            rehypePrettyCode,
            {
              theme: 'github-dark',
              keepBackground: true,
            },
          ],
        ],
      },
    },
  })

  const title = typeof data.title === 'string' ? data.title : 'Untitled Video'
  const slug = slugify(title)
  const dateRaw = typeof data.date === 'string' ? data.date : null
  const date = dateRaw ? new Date(dateRaw).toISOString() : new Date().toISOString()
  const summary = typeof data.summary === 'string' ? data.summary : undefined
  const thumbnail = typeof data.thumbnail === 'string' ? data.thumbnail : undefined
  const youtubeSrc = typeof data.youtubeSrc === 'string' && data.youtubeSrc.trim().length > 0
    ? data.youtubeSrc.trim()
    : undefined
  const youtubeId = typeof data.youtubeId === 'string' && data.youtubeId.trim().length > 0
    ? data.youtubeId.trim()
    : safeId

  const normalizedToc = (Array.isArray(toc) ? (toc as VideoTocItem[]) : []).map((item) => {
    if (item?.url === '#overview') {
      return { ...item, url: '#video-top' }
    }
    return item
  })

  return {
    id: safeId,
    slug,
    title,
    date,
    summary,
    thumbnail,
    youtubeSrc,
    youtubeId,
    toc: normalizedToc,
    body: mdxContent,
  }
}
