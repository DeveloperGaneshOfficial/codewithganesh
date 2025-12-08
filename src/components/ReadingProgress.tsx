"use client"

import { useEffect, useState } from "react"

const TARGET_SELECTOR = "article[data-post-content]"
const BAR_HEIGHT = 4

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0)
  const [topOffset, setTopOffset] = useState(0)

  useEffect(() => {
    const target = document.querySelector<HTMLElement>(TARGET_SELECTOR)
    if (!target) {
      return
    }

    const handleScroll = () => {
      const viewportHeight = window.innerHeight
      const doc = document.documentElement
      const totalScrollable = doc.scrollHeight - viewportHeight

      if (totalScrollable <= 0) {
        setProgress(100)
        return
      }

      const distance = Math.min(Math.max(window.scrollY, 0), totalScrollable)
      setProgress((distance / totalScrollable) * 100)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [])

  useEffect(() => {
    const header = document.querySelector<HTMLElement>('[data-site-header]')
    if (!header) {
      return
    }

    const updateOffset = () => {
      const height = header.getBoundingClientRect().height
      setTopOffset(Math.max(height - BAR_HEIGHT, 0))
    }

    updateOffset()
    window.addEventListener("resize", updateOffset)

    let resizeObserver: ResizeObserver | undefined
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(updateOffset)
      resizeObserver.observe(header)
    }

    return () => {
      window.removeEventListener("resize", updateOffset)
      resizeObserver?.disconnect()
    }
  }, [])

  return (
    <div
      className="pointer-events-none fixed inset-x-0 z-[60]"
      style={{ top: `${topOffset}px` }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-1 overflow-hidden rounded-full">
          <div
            className="h-full rounded-full bg-purple-500 transition-[width] duration-150 ease-out dark:bg-purple-400"
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <span className="sr-only">Reading progress</span>
          </div>
        </div>
      </div>
    </div>
  )
}
