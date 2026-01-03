"use client"

import Link from "next/link"
import { useCallback, useEffect, useState } from "react"

type VideoItem = {
  id: string
  title: string
  publishedAt: string | null
  description: string | null
  thumbnail: string | null
}

type VideosResponse = {
  items: VideoItem[]
  nextPageToken: string | null
}

const FETCH_LIMIT = 6

export default function VideosGallery() {
  const [videos, setVideos] = useState<VideoItem[]>([])
  const [nextPageToken, setNextPageToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [initialized, setInitialized] = useState(false)

  const loadVideos = useCallback(async (pageToken?: string) => {
    try {
      setLoading(true)
      setError(null)
      const params = new URLSearchParams({
        limit: `${FETCH_LIMIT}`,
        duration: "long,medium",
      })
      if (pageToken) {
        params.set("pageToken", pageToken)
      }

      const response = await fetch(`/api/videos?${params.toString()}`)
      if (!response.ok) {
        throw new Error("Failed to load videos")
      }

      const data = (await response.json()) as VideosResponse
      setVideos((prev) => (pageToken ? [...prev, ...data.items] : data.items))
      setNextPageToken(data.nextPageToken)
      setInitialized(true)
    } catch (err) {
      console.error(err)
      setError("Unable to fetch videos right now. Please try again later.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadVideos()
  }, [loadVideos])

  const hasContent = videos.length > 0

  return (
    <div className="space-y-8">
      {!initialized && loading && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: FETCH_LIMIT }).map((_, index) => (
            <div
              key={index}
              className="h-[320px] animate-pulse rounded-2xl bg-slate-200/70 dark:bg-slate-700/60"
            />
          ))}
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-200">
          {error}
        </div>
      )}

      {hasContent && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <article
              key={video.id}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-lg dark:border-slate-700/60 dark:bg-slate-900/60"
            >
              <Link
                href={`/videos/${video.id}`}
                className="group relative block w-full overflow-hidden bg-slate-200 pt-[56.25%] dark:bg-slate-800"
                aria-label={`Open ${video.title}`}
              >
                {video.thumbnail ? (
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-semibold text-slate-500 dark:text-slate-400">
                      Preview unavailable
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-14 w-14 text-white drop-shadow"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </Link>
              <div className="p-5">
                <h3 className="line-clamp-2 text-lg font-semibold text-slate-900 dark:text-white">
                  <Link href={`/videos/${video.id}`} className="hover:underline">
                    {video.title}
                  </Link>
                </h3>
                {video.publishedAt && (
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    {new Date(video.publishedAt).toLocaleDateString()}
                  </p>
                )}
                {video.description && (
                  <p className="mt-4 line-clamp-3 text-sm text-slate-600 dark:text-slate-300">
                    {video.description}
                  </p>
                )}
                <Link
                  href={`/videos/${video.id}`}
                  className="mt-4 inline-flex items-center text-sm font-semibold text-primary transition hover:text-primary-dark"
                >
                  Open details
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-2 h-4 w-4"
                  >
                    <path d="M7 17 17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </Link>
                <a
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center text-sm font-semibold text-primary transition hover:text-primary-dark"
                >
                  Watch on YouTube
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-2 h-4 w-4"
                  >
                    <path d="M7 17 17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      )}

      <div className="flex justify-center">
        {nextPageToken && (
          <button
            type="button"
            onClick={() => loadVideos(nextPageToken)}
            disabled={loading}
            className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:bg-primary/70"
          >
            {loading ? "Loading..." : "Load more videos"}
          </button>
        )}
        {!nextPageToken && hasContent && (
          <span className="text-sm text-slate-500 dark:text-slate-400">
            You are all caught up!
          </span>
        )}
      </div>

    </div>
  )
}
