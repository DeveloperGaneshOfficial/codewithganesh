import Link from "next/link"
import { Clock, Layers, PlayCircle } from "lucide-react"
import { tutorials } from "@/data/tutorials"

export default function TutorialsPage() {
  return (
    <main className="min-h-screen transition-theme py-16">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
            <PlayCircle className="h-4 w-4" aria-hidden="true" />
            Guided Tutorials
          </span>
          <h1 className="mt-4 text-4xl font-bold text-slate-900 dark:text-white">
            Learn at your pace with CodeWithGanesh
          </h1>
          <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">
            Pick a tutorial to begin. Each guide bundles the essential topics, hands-on examples, and resources you need to master the subject.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tutorials.map((tutorial) => (
            <Link
              key={tutorial.id}
              href={`/tutorials/${tutorial.id}`}
              className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.45)] transition-all hover:-translate-y-2 hover:border-primary/40 hover:shadow-[0_35px_80px_-45px_rgba(79,70,229,0.4)] dark:border-slate-800 dark:bg-slate-900/70 dark:hover:border-primary/40"
            >
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  <Layers className="h-4 w-4" aria-hidden="true" />
                  {tutorial.level}
                </span>
                <span className="inline-flex items-center rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-500 transition group-hover:border-primary/40 group-hover:text-primary dark:border-slate-800 dark:text-slate-300 dark:group-hover:border-primary/40">
                  {tutorial.language}
                </span>
              </div>
              <h2 className="mt-4 text-xl font-semibold text-slate-900 transition-colors group-hover:text-primary dark:text-white">
                {tutorial.title}
              </h2>
              <p className="mt-3 flex-1 text-sm text-slate-600 dark:text-slate-300">
                {tutorial.description}
              </p>
              <div className="mt-4 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                <span className="inline-flex items-center gap-2">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  {tutorial.duration}
                </span>
                <span>{tutorial.sections.length} topics</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
