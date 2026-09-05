import Link from 'next/link'
import { Layers, ArrowRight } from 'lucide-react'
import { projects } from '@/data/projects'

export default function ProjectsSection() {
  return (
    <section className="bg-slate-50 py-20 transition-theme dark:bg-tech-dark">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center justify-center rounded-full bg-primary/10 px-4 py-2 dark:bg-primary/20">
            <span className="text-sm font-medium text-primary">Projects</span>
          </div>
          <h2 className="mb-6 text-3xl font-bold text-slate-900 dark:text-white">
            Things I&apos;ve built (and taught)
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-200">
            Real projects behind the tutorials — not toy examples.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.slug}
              className="flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-theme hover:shadow-md dark:border-slate-700 dark:bg-tech-dark"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-primary/20">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">
                {project.title}
              </h3>
              <p className="mb-4 flex-1 text-sm text-slate-600 dark:text-slate-300">
                {project.description}
              </p>
              <div className="mb-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {project.seriesHref && (
                <Link
                  href={project.seriesHref}
                  className="mt-auto flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                >
                  Watch the series <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
