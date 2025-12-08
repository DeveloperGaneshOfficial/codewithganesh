"use client"

import { useCallback, useEffect, useState } from "react"

type ShortItem = {
  id: string
  title: string
  publishedAt: string | null
  thumbnail: string | null
}

type ShortsResponse = {
  items: ShortItem[]
  nextPageToken: string | null
}

const FETCH_LIMIT = 6

export default function ShortsGallery() {
  const [shorts, setShorts] = useState<ShortItem[]>([])
  const [nextPageToken, setNextPageToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [initialized, setInitialized] = useState(false)

  const loadShorts = useCallback(async (pageToken?: string) => {
    try {
      setLoading(true)
      setError(null)
      const params = new URLSearchParams({ limit: `${FETCH_LIMIT}` })
      if (pageToken) {
        params.set("pageToken", pageToken)
      }

      const response = await fetch(`/api/shorts?${params.toString()}`)
      if (!response.ok) {
        let message = "Failed to load shorts"
        try {
          const body = await response.json()
          if (typeof body?.error === "string" && body.error.trim().length > 0) {
            message = body.error
          }
        } catch (parseError) {
          // ignore JSON parse failures
        }
        setError(message)
        setInitialized(true)
        setLoading(false)
        return
      }

      const data = (await response.json()) as ShortsResponse

      setShorts((prev) => (pageToken ? [...prev, ...data.items] : data.items))
      setNextPageToken(data.nextPageToken)
      setInitialized(true)
      setError(null)

      if (!pageToken && data.items.length === 0) {
        setError("No shorts found for this channel yet. Upload a Short to YouTube and refresh.")
      }
    } catch (err) {
      console.error(err)
      setError("Unable to fetch shorts right now. Please try again later.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadShorts()
  }, [loadShorts])

  const hasContent = shorts.length > 0

  return (
    <div className="space-y-8">
      {!initialized && loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: FETCH_LIMIT }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse rounded-2xl bg-slate-200/70 dark:bg-slate-700/60 h-[380px]"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {shorts.map((short) => (
            <article
              key={short.id}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-lg dark:border-slate-700/60 dark:bg-slate-900/60"
            >
              <div className="relative w-full pt-[177.78%] bg-slate-200 dark:bg-slate-800">
                <iframe
                  title={short.title}
                  src={`https://www.youtube.com/embed/${short.id}?rel=0&modestbranding=1`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  className="absolute inset-0 h-full w-full"
                />
              </div>
              <div className="p-4">
                <h3 className="line-clamp-2 text-base font-semibold text-slate-900 dark:text-white">
                  {short.title}
                </h3>
                {short.publishedAt && (
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    {new Date(short.publishedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      <div className="flex justify-center">
        {nextPageToken && (
          <button
            type="button"
            onClick={() => loadShorts(nextPageToken)}
            disabled={loading}
            className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:bg-primary/70"
          >
            {loading ? "Loading..." : "Load more shorts"}
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
