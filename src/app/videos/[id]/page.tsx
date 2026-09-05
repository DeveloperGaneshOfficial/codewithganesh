import { notFound, redirect } from 'next/navigation'
import { genPageMetadata } from '@/app/seo'
import Breadcrumbs from '@/components/Breadcrumbs'
import TableOfContents from '@/components/TableOfContents'
import siteMetadata from '@/data/siteMetadata'
import { getVideoPageById, getVideoPageBySlug, getVideoPageMetas } from '@/lib/video-mdx'
import ExpandableVideoPlayer from '@/components/ExpandableVideoPlayer'

export async function generateStaticParams() {
  const metas = getVideoPageMetas()
  const allParams = metas.flatMap((meta) => [meta.slug, meta.id])
  const unique = Array.from(new Set(allParams))
  return unique.map((id) => ({ id }))
}

export async function generateMetadata(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const { id } = params
  const page = await getVideoPageBySlug(id) ?? await getVideoPageById(id)

  if (!page) {
    return { title: 'Video Not Found' }
  }

  return genPageMetadata({
    title: page.title,
    description: page.summary,
    image: page.thumbnail || siteMetadata.socialBanner,
    alternates: {
      canonical: `/videos/${page.slug}`,
    },
  })
}

export default async function VideoPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const { id } = params

  const pageBySlug = await getVideoPageBySlug(id)
  if (pageBySlug) {
    const videoJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: pageBySlug.title,
      description: pageBySlug.summary || pageBySlug.title,
      thumbnailUrl: pageBySlug.thumbnail
        ? [pageBySlug.thumbnail]
        : [`https://img.youtube.com/vi/${pageBySlug.youtubeId}/maxresdefault.jpg`],
      uploadDate: pageBySlug.date,
      embedUrl: `https://www.youtube.com/embed/${pageBySlug.youtubeId}`,
      contentUrl: `https://www.youtube.com/watch?v=${pageBySlug.youtubeId}`,
    }

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }}
        />
        <main className="min-h-screen transition-theme pb-20">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="lg:flex lg:items-start lg:gap-12">
              <div className="lg:flex-1 lg:min-w-0">
                <div
                  id="video-top"
                  className="h-0 scroll-mt-[calc(var(--site-header-height,80px)+var(--site-breadcrumbs-height,44px)+24px)]"
                  aria-hidden="true"
                />

                <Breadcrumbs
                  sticky
                  items={[
                    { label: 'Home', href: '/' },
                    { label: 'Videos', href: '/videos' },
                    { label: pageBySlug.title },
                  ]}
                />

                <header className="mb-6 mt-4 text-center lg:text-left scroll-mt-[calc(var(--site-header-height,80px)+var(--site-breadcrumbs-height,44px)+20px)] lg:mt-6">
                  <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
                    {pageBySlug.title}
                  </h1>
                  {pageBySlug.summary && (
                    <p className="mt-3 text-xl text-slate-600 dark:text-slate-300">
                      {pageBySlug.summary}
                    </p>
                  )}
                </header>

                <section className="mb-10">
                  <ExpandableVideoPlayer
                    youtubeId={pageBySlug.youtubeId}
                    title={pageBySlug.title}
                    thumbnail={pageBySlug.thumbnail}
                  />
                </section>

                <article data-video-content>
                  <div className="prose prose-lg max-w-none dark:prose-invert">
                    {pageBySlug.body}
                  </div>
                </article>
              </div>

              <aside className="hidden lg:flex lg:ml-auto lg:w-[260px] lg:pl-4 lg:border-l lg:border-slate-200/70 lg:sticky lg:top-[var(--site-header-height,80px)] lg:pt-[var(--site-sticky-gap,30px)] lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:flex-col lg:items-end dark:lg:border-slate-800/60">
                <TableOfContents items={pageBySlug.toc} />
              </aside>
            </div>
          </div>
        </main>
      </>
    )
  }

  const pageById = await getVideoPageById(id)
  if (pageById) {
    redirect(`/videos/${pageById.slug}`)
  }

  notFound()

}
