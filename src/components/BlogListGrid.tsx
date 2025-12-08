"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { format, parseISO } from "date-fns"

const PAGE_SIZE = 6

type BlogPost = {
  slug: string
  title: string
  summary?: string
  tags?: string[]
  category?: string
  date: string
  images?: string[]
}

type BlogListGridProps = {
  posts: BlogPost[]
}

export default function BlogListGrid({ posts }: BlogListGridProps) {
  const [visibleCount, setVisibleCount] = useState(() => Math.min(PAGE_SIZE, posts.length))
  const sentinelRef = useRef<HTMLDivElement | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const isAutoLoading = visibleCount < posts.length

  const visiblePosts = useMemo(() => posts.slice(0, visibleCount), [posts, visibleCount])
  const canLoadMore = visibleCount < posts.length

  const handleLoadMore = () => {
    setVisibleCount((current) => Math.min(current + PAGE_SIZE, posts.length))
  }

  useEffect(() => {
    if (!isAutoLoading) {
      observerRef.current?.disconnect()
      return
    }

    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            handleLoadMore()
          }
        })
      },
      {
        rootMargin: "200px 0px",
        threshold: 0.01,
      }
    )

    observer.observe(sentinel)
    observerRef.current = observer

    return () => observer.disconnect()
  }, [isAutoLoading])

  if (posts.length === 0) {
    return (
      <div className="col-span-full text-center py-20 text-slate-500 dark:text-slate-400">
        No posts found in this category.
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {visiblePosts.map((post) => {
          const tags = post.tags ?? []
          const primaryTag = tags[0]
          const label = post.category || primaryTag || "General"
          const dateLabel = format(parseISO(post.date), "MMM d, yyyy")
          const palette = [
            "border-blue-200 bg-blue-50 text-blue-600 dark:border-blue-900/60 dark:bg-blue-900/30 dark:text-blue-300",
            "border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-900/60 dark:bg-emerald-900/30 dark:text-emerald-300",
            "border-purple-200 bg-purple-50 text-purple-600 dark:border-purple-900/60 dark:bg-purple-900/30 dark:text-purple-300",
            "border-amber-200 bg-amber-50 text-amber-600 dark:border-amber-900/60 dark:bg-amber-900/30 dark:text-amber-300",
          ]

          return (
            <article
              key={post.slug}
              className="h-full"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group block h-full rounded-2xl border border-slate-100/90 bg-gradient-to-br from-white via-white to-slate-50 p-6 shadow-[0_18px_50px_-32px_rgba(30,41,59,0.35)] ring-1 ring-slate-100/80 transition-all hover:-translate-y-2 hover:border-primary/40 hover:ring-primary/30 hover:shadow-[0_30px_70px_-40px_rgba(79,70,229,0.35)] dark:border-slate-800/70 dark:bg-[linear-gradient(140deg,_rgba(15,23,42,0.92)_0%,_rgba(10,16,32,0.88)_55%,_rgba(15,23,42,0.95)_100%)] dark:ring-1 dark:ring-slate-800/70 dark:shadow-[0_24px_60px_-34px_rgba(15,23,42,0.85)] dark:hover:border-primary/40 dark:hover:ring-primary/35"
              >
                <div className="flex h-full flex-col">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 group-hover:text-primary dark:text-slate-500">
                    {dateLabel}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold text-slate-900 transition-colors group-hover:text-primary dark:text-slate-100">
                    {post.title}
                  </h3>
                  {post.summary && (
                    <p className="mt-3 line-clamp-3 text-sm text-slate-500 dark:text-slate-400">
                      {post.summary}
                    </p>
                  )}
                  <div className="mt-auto flex items-center justify-between gap-4 pt-6">
                    <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-400 dark:text-slate-400">
                      <span className="inline-flex items-center rounded-full border border-slate-200 bg-white/80 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-slate-500 transition group-hover:border-primary/40 group-hover:text-primary dark:border-slate-700/70 dark:bg-slate-900/50 dark:text-slate-300 dark:group-hover:border-primary/40 dark:group-hover:text-primary">
                        {label}
                      </span>
                      {tags.slice(0, 2).map((tag, tagIndex) => {
                        const colorClasses = palette[tagIndex % palette.length]
                        return (
                          <span
                            key={tag}
                            className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] transition ${colorClasses}`}
                          >
                            {tag}
                          </span>
                        )
                      })}
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 transition group-hover:border-primary/40 group-hover:bg-primary/10 group-hover:text-primary dark:border-slate-700/70 dark:bg-slate-900/60 dark:text-slate-200 dark:group-hover:border-primary/40 dark:group-hover:text-primary">
                      Read
                      <ArrowRight className="h-3 w-3" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          )
        })}
      </div>

      {canLoadMore && (
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={handleLoadMore}
            className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition hover:bg-primary-dark"
          >
            Load more posts
          </button>
        </div>
      )}

      <div ref={sentinelRef} aria-hidden="true" />
    </>
  )
}
