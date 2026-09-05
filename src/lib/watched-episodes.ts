'use client'

import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'cwg:watched-episodes'

function readWatchedIds(): Set<string> {
  if (typeof window === 'undefined') return new Set()
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return new Set()
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? new Set(parsed) : new Set()
  } catch {
    return new Set()
  }
}

function writeWatchedIds(ids: Set<string>) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(ids)))
  } catch {
    // localStorage unavailable (private browsing, blocked storage) — fail silently.
  }
}

/** Per-viewer watched-episode tracking backed by localStorage. */
export function useWatchedEpisodes() {
  const [watchedIds, setWatchedIds] = useState<Set<string>>(new Set())
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setWatchedIds(readWatchedIds())
    setHydrated(true)

    const onStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) setWatchedIds(readWatchedIds())
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const toggle = useCallback((id: string) => {
    setWatchedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      writeWatchedIds(next)
      return next
    })
  }, [])

  const isWatched = useCallback((id: string) => watchedIds.has(id), [watchedIds])

  return { watchedIds, isWatched, toggle, hydrated }
}
