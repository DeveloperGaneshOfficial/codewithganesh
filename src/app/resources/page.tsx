import { genPageMetadata } from '@/app/seo'
import Breadcrumbs from '@/components/Breadcrumbs'
import { resources } from '@/data/resources'
import { FileText, FileArchive, FileCode, Download } from 'lucide-react'

export const metadata = genPageMetadata({
  title: 'Free Resources',
  description: 'Free cheat sheets, roadmaps, templates, and interview prep notes for Python, DSA, and FastAPI.',
})

const fileTypeIcon = {
  PDF: FileText,
  ZIP: FileArchive,
  MD: FileCode,
} as const

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-white transition-theme dark:bg-tech-dark">
      <div className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Resources' }]} />

        <div className="mx-auto mt-8 mb-12 max-w-2xl text-center sm:mt-12">
          <div className="mb-4 inline-flex items-center justify-center rounded-full bg-primary/10 px-4 py-2 dark:bg-primary/20">
            <span className="text-sm font-medium text-primary">Free Resources</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
            Cheat sheets, roadmaps &amp; templates
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Free downloads to help you learn faster — no signup required.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {resources.map((resource) => {
            const Icon = fileTypeIcon[resource.fileType]
            return (
              <div
                key={resource.slug}
                className="flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-theme hover:shadow-md dark:border-slate-700 dark:bg-tech-dark"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-primary/20">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    {resource.category}
                  </span>
                </div>
                <h2 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">
                  {resource.title}
                </h2>
                <p className="mb-6 flex-1 text-sm text-slate-600 dark:text-slate-300">
                  {resource.description}
                </p>
                <a
                  href={resource.href}
                  download
                  className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-theme hover:bg-primary-dark hover:shadow-lg"
                >
                  <Download className="h-4 w-4" />
                  Download {resource.fileType}
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}
