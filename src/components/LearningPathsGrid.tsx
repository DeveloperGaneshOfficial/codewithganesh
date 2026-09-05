'use client'

import Link from 'next/link'
import { PlayCircle } from 'lucide-react'
import { learningPaths, type LearningPathTagColor } from '@/data/learningPaths'
import { useWatchedEpisodes } from '@/lib/watched-episodes'

const tagColorClasses: Record<LearningPathTagColor, string> = {
  blue: 'bg-primary/10 text-primary dark:bg-primary/20',
  green: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  purple: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  orange: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
}

export default function LearningPathsGrid() {
  const { isWatched, hydrated } = useWatchedEpisodes()

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {learningPaths.map((path) => {
        const total = path.episodes.length
        const watchedCount = hydrated
          ? path.episodes.filter((episode) => isWatched(episode.id)).length
          : 0
        const percent = total > 0 ? Math.round((watchedCount / total) * 100) : 0

        return (
          <Link
            key={path.slug}
            href={`/learning-paths/${path.slug}`}
            className="group flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-theme hover:shadow-md dark:border-slate-700 dark:bg-tech-dark"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${tagColorClasses[path.tagColor]}`}>
                {path.tag}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <PlayCircle className="h-3.5 w-3.5" />
                {total} videos
              </span>
            </div>

            <h3 className="mb-2 text-lg font-semibold text-slate-900 transition-theme group-hover:text-primary dark:text-white">
              {path.title}
            </h3>
            <p className="mb-6 flex-1 text-sm text-slate-600 dark:text-slate-300">
              {path.description}
            </p>

            <div>
              <div className="mb-1.5 flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
                <span>Progress</span>
                <span>{hydrated ? `${watchedCount}/${total}` : `0/${total}`}</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
