"use client"

import { useEffect, useState } from "react"

type ExpandableVideoPlayerProps = {
  youtubeId: string
  title: string
  thumbnail?: string | null
}

type PlayerMode = "idle" | "expanded" | "mini"

export default function ExpandableVideoPlayer({ youtubeId, title, thumbnail }: ExpandableVideoPlayerProps) {
  const [mode, setMode] = useState<PlayerMode>("idle")
  const [playerNonce, setPlayerNonce] = useState(0)
  const expandedTop = 'calc(var(--site-header-height,80px) + var(--site-breadcrumbs-height,44px) + var(--site-sticky-gap,30px))'

  useEffect(() => {
    if (mode !== "expanded") {
      document.body.style.removeProperty("overflow")
      return
    }

    document.body.style.setProperty("overflow", "hidden")

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        stopPlayback()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.removeProperty("overflow")
    }
  }, [mode])

  const embedUrl = `https://www.youtube.com/embed/${youtubeId}`
  const previewImage = (thumbnail && thumbnail.trim().length > 0) ? thumbnail : ''

  const stopPlayback = () => {
    // Force a fresh iframe mount next time we play (stops playback reliably)
    setPlayerNonce((value) => value + 1)
    setMode("idle")
  }

  return (
    <>
      {mode === "idle" && (
        <button
          type="button"
          onClick={() => setMode("expanded")}
          className="group relative block w-full overflow-hidden rounded-3xl border border-slate-200/70 bg-slate-950 shadow-sm transition-transform hover:-translate-y-1 dark:border-slate-800/60"
          aria-label={`Play ${title}`}
        >
          <div className="relative w-full pt-[56.25%]">
            {previewImage ? (
              <img
                src={previewImage}
                alt={title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 bg-black/25" aria-hidden="true" />
            )}
            <div className="absolute inset-0 bg-black/25 opacity-100 transition-opacity duration-300 group-hover:bg-black/35" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15 backdrop-blur transition group-hover:bg-white/25">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-10 w-10 text-white"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </div>
          </div>
        </button>
      )}

      {mode === "expanded" && (
        <div
          className="fixed inset-x-0 bottom-0 z-50"
          style={{ top: expandedTop }}
        >
          <div className="absolute inset-0 bg-black/80" />
        </div>
      )}

      {mode !== "idle" && (
        <div
          className={
            mode === "expanded"
              ? "fixed inset-x-0 bottom-0 z-50 grid place-items-center p-4"
              : "fixed bottom-4 right-4 z-50 w-[360px] max-w-[calc(100vw-2rem)]"
          }
          style={mode === "expanded" ? { top: expandedTop } : undefined}
        >
          <div
            className={
              mode === "expanded"
                ? "relative w-full max-w-4xl"
                : "overflow-hidden rounded-2xl border border-slate-200/70 bg-slate-950 shadow-lg dark:border-slate-800/60"
            }
          >
            {mode === "expanded" ? (
              <div className="absolute right-6 top-6 z-10 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setMode("mini")}
                  className="rounded-lg bg-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur transition hover:bg-white/20"
                  aria-label="Minimize video"
                >
                  Minimize
                </button>
                <button
                  type="button"
                  className="cursor-pointer text-slate-200 transition hover:text-white"
                  onClick={stopPlayback}
                  aria-label="Close video"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-7 w-7"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-3 px-3 py-2">
                <div className="min-w-0">
                  <div className="truncate text-xs font-semibold text-white">{title}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setMode("expanded")}
                    className="rounded-lg bg-white/10 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-white/20"
                    aria-label="Expand video"
                  >
                    Expand
                  </button>
                  <button
                    type="button"
                    onClick={stopPlayback}
                    className="rounded-lg bg-white/10 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-white/20"
                    aria-label="Close video"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            <div
              className={
                mode === "expanded"
                  ? "relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 shadow-[0_20px_60px_rgba(15,23,42,0.45)] backdrop-blur-xl"
                  : "relative"
              }
            >
              <div className="relative w-full pt-[56.25%]">
                <iframe
                  key={`player-${playerNonce}`}
                  title="YouTube video player"
                  src={embedUrl}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            </div>

            {mode === "expanded" && (
              <div className="mt-4 text-center">
                <h2 className="text-xl font-semibold text-white">{title}</h2>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
