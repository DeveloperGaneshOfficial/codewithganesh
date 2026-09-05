import { genPageMetadata } from '@/app/seo'
import Breadcrumbs from '@/components/Breadcrumbs'
import LearningPathsGrid from '@/components/LearningPathsGrid'

export const metadata = genPageMetadata({
  title: 'Learning Paths',
  description: 'Structured video series for Python, DSA, and FastAPI — grouped in order so you learn step by step.',
})

export default function LearningPathsPage() {
  return (
    <main className="min-h-screen bg-white transition-theme dark:bg-tech-dark">
      <div className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Learning Paths' }]} />

        <div className="mx-auto mt-8 mb-12 max-w-2xl text-center sm:mt-12">
          <div className="mb-4 inline-flex items-center justify-center rounded-full bg-primary/10 px-4 py-2 dark:bg-primary/20">
            <span className="text-sm font-medium text-primary">Learning Paths</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
            Structured series, not random videos
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Follow a path in order and track your progress as you go.
          </p>
        </div>

        <LearningPathsGrid />
      </div>
    </main>
  )
}
