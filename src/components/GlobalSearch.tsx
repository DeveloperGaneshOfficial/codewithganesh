"use client"

import { FormEvent, useCallback, useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"
import { Loader2, Search, X } from "lucide-react"

type ApiSearchResult = {
    id: string
    href: string
    title: string
    description?: string
    type: string
    date?: string
    score?: number | null
}

export default function GlobalSearch() {
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState("")
    const [results, setResults] = useState<ApiSearchResult[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const inputRef = useRef<HTMLInputElement | null>(null)

    const closeSearch = useCallback(() => {
        setOpen(false)
        setQuery("")
        setResults([])
        setError(null)
    }, [])

    const fetchResults = useDebouncedCallback(
        async (term: string, signal?: AbortSignal) => {
            try {
                setLoading(true)
                setError(null)

                const params = new URLSearchParams()
                if (term.trim()) {
                    params.set("query", term.trim())
                }

                const response = await fetch(`/api/search?${params.toString()}`, {
                    signal,
                    cache: "no-store",
                })

                if (!response.ok) {
                    throw new Error("Failed to fetch search results")
                }

                const data = (await response.json()) as { results: ApiSearchResult[] }
                setResults(data.results)
            } catch (err) {
                if ((err as Error).name === "AbortError") {
                    return
                }
                console.error(err)
                setError("Unable to fetch search results. Please try again.")
            } finally {
                setLoading(false)
            }
        },
        220
    )

    useEffect(() => {
        if (!open) {
            return
        }

        const controller = new AbortController()
        fetchResults(query, controller.signal)

        return () => {
            controller.abort()
            fetchResults.cancel()
        }
    }, [open, query, fetchResults])

    useEffect(() => {
        if (!open) {
            return
        }

        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = "hidden"

        const frame = requestAnimationFrame(() => {
            inputRef.current?.focus()
        })

        return () => {
            document.body.style.overflow = previousOverflow
            cancelAnimationFrame(frame)
        }
    }, [open])

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
                event.preventDefault()
                if (open) {
                    closeSearch()
                } else {
                    setOpen(true)
                }
                return
            }

            if (event.key === "Escape" && open) {
                event.preventDefault()
                closeSearch()
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [open, closeSearch])

    const handleSelect = useCallback(
        (href: string) => {
            router.push(href)
            closeSearch()
        },
        [router, closeSearch]
    )

    const highlightMatch = useCallback(
        (text: string) => {
            const trimmedQuery = query.trim()
            if (!trimmedQuery) return text

            const lowerText = text.toLowerCase()
            const lowerQuery = trimmedQuery.toLowerCase()
            const matchIndex = lowerText.indexOf(lowerQuery)

            if (matchIndex === -1) return text

            const before = text.slice(0, matchIndex)
            const match = text.slice(matchIndex, matchIndex + trimmedQuery.length)
            const after = text.slice(matchIndex + trimmedQuery.length)

            return (
                <>
                    {before}
                    <span className="rounded bg-primary/10 px-1 text-primary">{match}</span>
                    {after}
                </>
            )
        },
        [query]
    )

    const truncate = useCallback((value: string, maxLength = 160) => {
        if (value.length <= maxLength) return value
        return `${value.slice(0, maxLength - 1)}…`
    }, [])

    const handleSubmit = useCallback(
        (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault()
            if (results.length > 0) {
                handleSelect(results[0].href)
            }
        },
        [results, handleSelect]
    )

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-primary/40 hover:text-primary dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:border-primary/40 dark:hover:text-primary md:w-full md:max-w-xs md:justify-start md:rounded-lg md:px-4 md:pl-10 md:text-left md:text-sm md:shadow-sm md:transition-theme"
                aria-label="Search the site"
            >
                <Search className="h-5 w-5 md:absolute md:left-3 md:top-1/2 md:-translate-y-1/2" aria-hidden />
                <span className="hidden md:block text-slate-500 dark:text-slate-400">
                    Search the site...
                </span>
                <kbd className="pointer-events-none ml-auto hidden items-center gap-1 rounded border border-slate-200 bg-slate-100 px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 md:flex">
                    <span className="text-xs">Ctrl</span>
                    <span>K</span>
                </kbd>
            </button>

            {open && (
                <div className="fixed inset-0 z-[70] flex items-start justify-center bg-black/60 px-4 py-12 backdrop-blur-sm">
                    <div className="absolute inset-0" onClick={closeSearch} aria-hidden />
                    <div
                        className="relative z-10 w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-700 dark:bg-slate-900"
                        role="dialog"
                        aria-modal="true"
                    >
                        <form onSubmit={handleSubmit}>
                            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                                <Search className="h-5 w-5 flex-shrink-0 text-slate-400" aria-hidden />
                                <input
                                    ref={inputRef}
                                    type="search"
                                    value={query}
                                    onChange={(event) => setQuery(event.target.value)}
                                    placeholder="Search articles, videos, pages..."
                                    className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
                                    aria-label="Search the entire site"
                                />
                                {query && (
                                    <button
                                        type="button"
                                        onClick={() => setQuery("")}
                                        className="rounded-full p-1 text-slate-400 transition hover:bg-slate-200 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-200"
                                        aria-label="Clear search"
                                    >
                                        <X className="h-4 w-4" aria-hidden />
                                    </button>
                                )}
                                <kbd className="hidden rounded border border-slate-200 bg-white px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-slate-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 md:block">
                                    Esc
                                </kbd>
                            </div>
                        </form>

                        <div className="mt-4 max-h-[60vh] overflow-y-auto pr-1">
                            {loading && (
                                <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-300">
                                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                                    Searching...
                                </div>
                            )}

                            {error && (
                                <div className="mt-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-200">
                                    {error}
                                </div>
                            )}

                            {!loading && !error && results.length === 0 && (
                                <div className="py-12 text-center text-sm text-slate-500 dark:text-slate-400">
                                    No matches yet. Try another keyword.
                                </div>
                            )}

                            {!loading && results.length > 0 && (
                                <div className="space-y-2">
                                    {results.map((result) => {
                                        const formattedDate = result.date ? new Date(result.date).toLocaleDateString() : null
                                        return (
                                            <button
                                                key={result.id}
                                                type="button"
                                                onClick={() => handleSelect(result.href)}
                                                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-left shadow-sm transition hover:border-primary/50 hover:shadow-md dark:border-slate-700 dark:bg-slate-900/80 dark:hover:border-primary/40"
                                            >
                                                <div className="flex items-start justify-between gap-3">
                                                    <div>
                                                        <p className="text-sm font-semibold text-slate-900 dark:text-white">
                                                            {highlightMatch(result.title)}
                                                        </p>
                                                        {result.description && result.description.trim() && (
                                                            <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                                                                {highlightMatch(truncate(result.description, 160))}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <span className="flex-shrink-0 rounded-full bg-primary/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary">
                                                        {result.type}
                                                    </span>
                                                </div>
                                                {formattedDate && (
                                                    <p className="mt-2 text-[11px] text-slate-400 dark:text-slate-500">
                                                        Updated {formattedDate}
                                                    </p>
                                                )}
                                            </button>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
