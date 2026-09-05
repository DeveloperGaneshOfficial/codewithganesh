'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle2, Circle, PlayCircle } from 'lucide-react'
import type { LearningPath } from '@/data/learningPaths'
import { useWatchedEpisodes } from '@/lib/watched-episodes'

type Filter = 'all' | 'watched' | 'unwatched'

export default function LearningPathEpisodeList({ path }: { path: LearningPath }) {
  const { isWatched, toggle, hydrated } = useWatchedEpisodes()
  const [filter, setFilter] = useState<Filter>('all')

  const total = path.episodes.length
  const watchedCount = hydrated ? path.episodes.filter((episode) => isWatched(episode.id)).length : 0
  const percent = total > 0 ? Math.round((watchedCount / total) * 100) : 0

  const visibleEpisodes = useMemo(() => {
    if (!hydrated || filter === 'all') return path.episodes
    return path.episodes.filter((episode) =>
      filter === 'watched' ? isWatched(episode.id) : !isWatched(episode.id)
    )
  }, [path.episodes, filter, hydrated, isWatched])

  return (
    <div>
      <div className="mb-8 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-tech-dark">
        <div className="mb-2 flex items-center justify-between text-sm font-medium text-slate-600 dark:text-slate-300">
          <span>Overall progress</span>
          <span>{hydrated ? `${watchedCount}/${total} watched` : `0/${total} watched`}</span>
        </div>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${percent}%` }} />
        </div>
      </div>

      <div className="mb-6 flex gap-2">
        {(['all', 'unwatched', 'watched'] as Filter[]).map((option) => (
          <button
            key={option}
            onClick={() => setFilter(option)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-theme ${
              filter === option
                ? 'bg-primary text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            {option === 'all' ? 'All' : option === 'watched' ? 'Watched' : 'Unwatched'}
          </button>
        ))}
      </div>

      <ol className="space-y-3">
        {visibleEpisodes.map((episode) => {
          const episodeNumber = path.episodes.indexOf(episode) + 1
          const watched = hydrated && isWatched(episode.id)
          const href = episode.youtubeId ? `/videos/${episode.youtubeId}` : undefined

          return (
            <li
              key={episode.id}
              className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-theme dark:border-slate-700 dark:bg-tech-dark"
            >
              <button
                onClick={() => toggle(episode.id)}
                aria-label={watched ? 'Mark as unwatched' : 'Mark as watched'}
                className="shrink-0 text-primary"
              >
                {watched ? <CheckCircle2 className="h-6 w-6" /> : <Circle className="h-6 w-6 text-slate-300 dark:text-slate-600" />}
              </button>

              <div className="relative flex h-14 w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
                {episode.thumbnail ? (
                  <Image src={episode.thumbnail} alt={episode.title} fill className="object-cover" />
                ) : (
                  <PlayCircle className="h-6 w-6 text-slate-400 dark:text-slate-500" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
                  Episode {episodeNumber}
                </span>
                {href ? (
                  <Link
                    href={href}
                    className="block truncate text-sm font-semibold text-slate-900 hover:text-primary dark:text-white dark:hover:text-primary"
                  >
                    {episode.title}
                  </Link>
                ) : (
                  <p className="truncate text-sm font-semibold text-slate-500 dark:text-slate-400">
                    {episode.title}{' '}
                    <span className="font-normal italic text-slate-400 dark:text-slate-500">(coming soon)</span>
                  </p>
                )}
              </div>

              <span className="shrink-0 text-xs font-medium text-slate-500 dark:text-slate-400">
                {episode.duration}
              </span>
            </li>
          )
        })}
      </ol>

      {hydrated && visibleEpisodes.length === 0 && (
        <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
          No episodes in this filter yet.
        </p>
      )}
    </div>
  )
}
