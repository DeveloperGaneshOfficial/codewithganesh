"use client"

import { type MouseEvent, useEffect, useMemo, useState } from "react"
import type { TocItem } from "@/lib/mdx"

interface TableOfContentsProps {
  items?: TocItem[]
  title?: string
}

function getSlugFromUrl(url: string) {
  try {
    return decodeURIComponent(url).replace(/^#/, "")
  } catch (error) {
    console.warn("Failed to decode heading URL", url, error)
    return url.replace(/^#/, "")
  }
}

export default function TableOfContents({ items = [], title = "On this page" }: TableOfContentsProps) {
  const filteredItems = useMemo(() => {
    return items.filter((item): item is TocItem => Boolean(item?.url && item?.value))
  }, [items])
  const [activeId, setActiveId] = useState<string | null>(null)

  const getScrollOffset = () => {
    const header = document.querySelector<HTMLElement>("[data-site-header]")
    return header ? header.getBoundingClientRect().height + 24 : 112
  }

  useEffect(() => {
    if (filteredItems.length === 0) {
      return
    }

    const headingElements = filteredItems
      .map((item) => document.getElementById(getSlugFromUrl(item.url)))
      .filter((el): el is HTMLElement => Boolean(el))

    if (headingElements.length === 0) {
      return
    }

    const handleScroll = () => {
      const offset = getScrollOffset()
      const scrollPosition = window.scrollY + offset
      let current: string | null = filteredItems[0]?.url ?? null

      for (const element of headingElements) {
        if (element.offsetTop <= scrollPosition) {
          current = `#${element.id}`
        } else {
          break
        }
      }

      setActiveId(current)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [filteredItems])

  if (filteredItems.length === 0) {
    return null
  }

  const handleLinkClick = (event: MouseEvent<HTMLAnchorElement>, url: string) => {
    event.preventDefault()

    const slug = getSlugFromUrl(url)
    const element = document.getElementById(slug)
    if (!element) {
      return
    }

    const offset = getScrollOffset()
    const targetPosition = element.getBoundingClientRect().top + window.scrollY - (offset - 8)

    window.scrollTo({
      top: Math.max(targetPosition, 0),
      behavior: "smooth",
    })

    setActiveId(url)
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, "", url)
    }
  }

  return (
    <nav aria-label="Table of contents" className="pointer-events-auto min-w-[220px] text-[0.95rem] text-slate-600 dark:text-slate-300">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
        {title}
      </p>
      <ul className="mt-4 space-y-2.5 leading-relaxed">
        {filteredItems.map((item) => {
          const isActive = item.url === activeId
          return (
            <li
              key={item.url}
              className="leading-snug transition-colors"
              style={{ marginLeft: item.depth > 2 ? "1.5rem" : item.depth === 2 ? "0.75rem" : 0 }}
            >
              <a
                href={item.url}
                onClick={(event) => handleLinkClick(event, item.url)}
                aria-current={isActive ? "location" : undefined}
                className={`block border-l-2 pl-4 no-underline ${
                  isActive
                    ? "border-purple-500 font-semibold text-purple-600 dark:border-purple-400 dark:text-purple-300"
                    : "border-transparent text-slate-600 hover:border-purple-200 hover:text-purple-500 dark:text-slate-300 dark:hover:border-purple-500/30 dark:hover:text-purple-300"
                }`}
              >
                {item.value}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
