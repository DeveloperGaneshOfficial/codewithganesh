import Link from 'next/link'
import LearningPathsGrid from './LearningPathsGrid'

export default function LearningPathsSection() {
  return (
    <section className="bg-white py-20 transition-theme dark:bg-tech-dark">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center justify-center rounded-full bg-primary/10 px-4 py-2 dark:bg-primary/20">
            <span className="text-sm font-medium text-primary">Learning Paths</span>
          </div>
          <h2 className="mb-6 text-3xl font-bold text-slate-900 dark:text-white">
            Follow a structured path
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-200">
            Videos grouped in order so you build skills step by step, not randomly.
          </p>
        </div>

        <LearningPathsGrid />

        <div className="mt-10 text-center">
          <Link href="/learning-paths" className="font-medium text-primary hover:underline">
            View all learning paths →
          </Link>
        </div>
      </div>
    </section>
  )
}
