import { notFound } from 'next/navigation'
import { genPageMetadata } from '@/app/seo'
import Breadcrumbs from '@/components/Breadcrumbs'
import LearningPathEpisodeList from '@/components/LearningPathEpisodeList'
import { learningPaths, getLearningPathBySlug } from '@/data/learningPaths'

export function generateStaticParams() {
  return learningPaths.map((path) => ({ slug: path.slug }))
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const path = getLearningPathBySlug(slug)

  if (!path) return { title: 'Learning Path Not Found' }

  return genPageMetadata({
    title: path.title,
    description: path.description,
  })
}

export default async function LearningPathDetailPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const path = getLearningPathBySlug(slug)

  if (!path) notFound()

  return (
    <main className="min-h-screen bg-white transition-theme dark:bg-tech-dark">
      <div className="mx-auto w-full max-w-4xl px-4 pb-20 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Learning Paths', href: '/learning-paths' },
            { label: path.title },
          ]}
        />

        <div className="mt-8 mb-10 sm:mt-12">
          <span className="mb-4 inline-flex items-center justify-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary dark:bg-primary/20">
            {path.tag}
          </span>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
            {path.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            {path.description}
          </p>
        </div>

        <LearningPathEpisodeList path={path} />
      </div>
    </main>
  )
}
