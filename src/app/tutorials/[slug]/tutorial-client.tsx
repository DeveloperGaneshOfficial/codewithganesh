"use client"

import type { MouseEvent } from "react"
import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Clock, PlayCircle } from "lucide-react"
import type { Tutorial } from "@/data/tutorials"

type TutorialClientProps = {
  tutorial: Tutorial
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")

export default function TutorialClient({ tutorial }: TutorialClientProps) {
  const sections = useMemo(() => {
    return tutorial.sections.map((section, index) => {
      const anchor = `${tutorial.id}-${slugify(section.title)}-${index}`
      const exampleLanguage = section.example?.language ?? tutorial.language ?? "Code"
      return { ...section, anchor, exampleLanguage }
    })
  }, [tutorial])

  const [activeAnchor, setActiveAnchor] = useState<string>(sections[0]?.anchor ?? "")

  useEffect(() => {
    setActiveAnchor(sections[0]?.anchor ?? "")
  }, [sections])

  useEffect(() => {
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id")
            if (id) {
              setActiveAnchor(id)
            }
          }
        })
      },
      {
        rootMargin: "-40% 0px -40% 0px",
        threshold: [0.1, 0.5],
      },
    )

    sections.forEach((section) => {
      const element = document.getElementById(section.anchor)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [sections])

  const handleAnchorClick = (event: MouseEvent<HTMLAnchorElement>, anchor: string) => {
    event.preventDefault()
    const element = document.getElementById(anchor)
    if (!element) return
    element.scrollIntoView({ behavior: "smooth", block: "start" })
    window.history.replaceState(null, "", `#${anchor}`)
  }

  return (
    <main className="min-h-screen transition-theme py-16">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 text-sm text-slate-600 dark:text-slate-300 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/tutorials"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 font-medium text-slate-600 transition hover:border-primary/40 hover:text-primary dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300 dark:hover:border-primary/40"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All tutorials
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 font-semibold uppercase tracking-wider text-primary">
              <PlayCircle className="h-4 w-4" aria-hidden="true" />
              {tutorial.level} · {tutorial.duration}
            </span>
            <span className="inline-flex items-center rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:text-slate-300">
              {tutorial.language}
            </span>
          </div>
        </div>

        <header className="mt-8 max-w-3xl">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
            {tutorial.title}
          </h1>
          <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">
            {tutorial.description}
          </p>
        </header>

        {sections.length > 0 && (
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-[0_18px_50px_-38px_rgba(15,23,42,0.5)] transition-theme dark:border-slate-800 dark:bg-slate-900/70 lg:hidden">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Main topics
            </div>
            <div className="mt-3 flex flex-col gap-2">
              {sections.map((section) => (
                <a
                  key={section.anchor}
                  href={`#${section.anchor}`}
                  onClick={(event) => handleAnchorClick(event, section.anchor)}
                  className={`rounded-xl border px-4 py-3 text-sm transition ${
                    activeAnchor === section.anchor
                      ? "border-primary/40 bg-primary/5 text-primary"
                      : "border-slate-200 bg-white text-slate-600 hover:border-primary/30 hover:text-primary dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300"
                  }`}
                >
                  {section.title}
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10 grid gap-10 lg:grid-cols-[16rem_minmax(0,1fr)] xl:grid-cols-[16rem_minmax(0,1fr)_13rem]">
          <aside className="sticky top-24 hidden h-max space-y-4 lg:block">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Main topics
            </div>
            <nav className="space-y-3">
              {sections.map((section) => (
                <a
                  key={section.anchor}
                  href={`#${section.anchor}`}
                  onClick={(event) => handleAnchorClick(event, section.anchor)}
                  className={`block rounded-xl border px-4 py-3 transition-all ${
                    activeAnchor === section.anchor
                      ? "border-primary/40 bg-primary/5 text-primary shadow-sm"
                      : "border-slate-200 bg-white text-slate-600 hover:border-primary/30 hover:text-primary dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300"
                  }`}
                >
                  <div className="text-sm font-semibold">{section.title}</div>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {section.summary}
                  </p>
                </a>
              ))}
            </nav>
          </aside>

          <article className="space-y-12">
            {sections.map((section, index) => (
              <section
                key={section.anchor}
                id={section.anchor}
                data-section
                className="scroll-mt-28 rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.4)] transition-theme dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-[0_24px_60px_-38px_rgba(15,23,42,0.85)]"
              >
                <div className="flex flex-col gap-2">
                  <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                    Topic {index + 1}
                  </span>
                  <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
                    {section.title}
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    <Clock className="mr-1 inline h-4 w-4 align-text-top" aria-hidden="true" />
                    {tutorial.duration} total
                  </p>
                </div>
                <p className="mt-4 text-slate-600 dark:text-slate-300">
                  {section.summary}
                </p>

                <div className="mt-6 space-y-3">
                  {section.checklist.map((item, checklistIndex) => (
                    <div key={item} className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white/80 p-4 transition-theme dark:border-slate-800 dark:bg-slate-900/60">
                      <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-primary/40 text-xs font-semibold text-primary">
                        {checklistIndex + 1}
                      </span>
                      <p className="text-sm text-slate-600 dark:text-slate-300">{item}</p>
                    </div>
                  ))}
                </div>

                {section.topics && section.topics.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Key concepts to review</h3>
                    <ul className="mt-3 list-disc space-y-2 pl-6 text-sm text-slate-600 dark:text-slate-300">
                      {section.topics.map((topic) => (
                        <li key={topic}>{topic}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {section.example && (
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Try it out</h3>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{section.example.title}</p>
                    <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-slate-900/95 shadow-inner dark:border-slate-700">
                      <div className="flex items-center justify-between border-b border-slate-800/70 bg-slate-900/60 px-4 py-2 text-xs uppercase tracking-[0.18em] text-slate-400">
                        <span>{section.exampleLanguage}</span>
                        <span>Example</span>
                      </div>
                      <pre className="overflow-x-auto bg-transparent p-4 text-sm text-slate-100"><code>{section.example.code}</code></pre>
                    </div>
                  </div>
                )}

                {section.resources && section.resources.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Recommended reading</h3>
                    <ul className="mt-3 space-y-2 text-sm text-primary">
                      {section.resources.map((resource) => (
                        <li key={resource.url}>
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-3 py-1 text-primary transition hover:border-primary hover:bg-primary/10"
                          >
                            {resource.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            ))}
          </article>

          <aside className="sticky top-24 hidden h-max space-y-4 xl:block">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              On this page
            </div>
            <nav className="space-y-2 text-sm">
              {sections.map((section) => (
                <div key={section.anchor}>
                  <a
                    href={`#${section.anchor}`}
                    onClick={(event) => handleAnchorClick(event, section.anchor)}
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 transition ${
                      activeAnchor === section.anchor
                        ? "border-primary/40 bg-primary/10 text-primary"
                        : "border-transparent text-slate-500 hover:border-primary/30 hover:bg-primary/5 hover:text-primary dark:text-slate-300"
                    }`}
                  >
                    {section.title}
                  </a>
                  {section.topics && section.topics.length > 0 && (
                    <div className="mt-2 space-y-1 border-l border-slate-200 pl-3 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                      {section.topics.map((topic) => (
                        <div key={topic} className="leading-relaxed">
                          {topic}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </aside>
        </div>
      </div>
    </main>
  )
}
