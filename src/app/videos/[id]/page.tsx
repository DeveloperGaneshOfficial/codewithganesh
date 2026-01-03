import { notFound } from 'next/navigation'
import { genPageMetadata } from '@/app/seo'
import Breadcrumbs from '@/components/Breadcrumbs'
import TableOfContents from '@/components/TableOfContents'
import GoToTopButton from '@/components/GoToTopButton'
import siteMetadata from '@/data/siteMetadata'
import { getVideoPageById, getVideoPageIds } from '@/lib/video-mdx'
import ExpandableVideoPlayer from '@/components/ExpandableVideoPlayer'

export async function generateStaticParams() {
  const ids = getVideoPageIds()
  return ids.map((id) => ({ id }))
}

export async function generateMetadata(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const { id } = params
  const page = await getVideoPageById(id)

  if (!page) {
    return { title: 'Video Not Found' }
  }

  return genPageMetadata({
    title: page.title,
    description: page.summary,
    image: page.thumbnail || siteMetadata.socialBanner,
    alternates: {
      canonical: './',
    },
  })
}

export default async function VideoPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const { id } = params

  const page = await getVideoPageById(id)
  if (!page) {
    notFound()
  }

  return (
    <>
      <main className="min-h-screen transition-theme pb-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-start lg:gap-12">
            <div className="lg:flex-1 lg:min-w-0">
              <div id="video-top" className="scroll-mt-28" />

              <Breadcrumbs
                sticky
                items={[
                  { label: 'Home', href: '/' },
                  { label: 'Videos', href: '/videos' },
                  { label: page.title },
                ]}
              />

              <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                  {page.title}
                </h1>
                {page.summary && (
                  <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">
                    {page.summary}
                  </p>
                )}
              </header>

              <section className="mb-10">
                <ExpandableVideoPlayer youtubeId={page.youtubeId} title={page.title} thumbnail={page.thumbnail} />
              </section>

              <article data-video-content>
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  {page.body}
                </div>
              </article>
            </div>

            <aside className="hidden lg:flex lg:ml-auto lg:w-[260px] lg:pl-4 lg:border-l lg:border-slate-200/70 lg:sticky lg:top-[var(--site-header-height,80px)] lg:pt-[var(--site-sticky-gap,30px)] lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:flex-col lg:items-end dark:lg:border-slate-800/60">
              <TableOfContents items={page.toc} />
            </aside>
          </div>
        </div>
      </main>
      <GoToTopButton />
    </>
  )
}
