"use client"

import { useCallback, useState } from 'react'
import { Share2, Twitter, Linkedin, Link as LinkIcon, Check } from 'lucide-react'

const TWITTER_SHARE_URL = 'https://twitter.com/intent/tweet'
const LINKEDIN_SHARE_URL = 'https://www.linkedin.com/shareArticle'

interface ShareButtonsProps {
  title: string
  url: string
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch (error) {
      setCopied(false)
    }
  }, [url])

  const handleNativeShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url })
        return
      } catch (error) {
        // User dismissed native sheet; fall back to copy
      }
    }
    handleCopyLink()
  }, [handleCopyLink, title, url])

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  return (
    <div className="w-full rounded-3xl border border-slate-200/70 bg-gradient-to-br from-white via-white to-slate-50 p-6 shadow-[0_12px_28px_-18px_rgba(15,23,42,0.25)] ring-1 ring-slate-100/75 dark:border-slate-800/70 dark:bg-gradient-to-br dark:from-[#0f172a] dark:via-[#0b1220] dark:to-[#0f172a] dark:shadow-[0_16px_40px_-24px_rgba(15,23,42,0.65)] dark:ring-slate-800/70">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20">
              <Share2 className="h-4 w-4" aria-hidden="true" />
            </span>
            Spread the word
          </p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Enjoyed this post? Share it with your network in a click.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            aria-label="Share via device"
            onClick={handleNativeShare}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600 transition hover:border-primary/50 hover:bg-primary/10 hover:text-primary dark:border-slate-700/70 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:border-primary/50 dark:hover:text-primary"
          >
            <Share2 className="h-3.5 w-3.5" aria-hidden="true" />
            Share
          </button>
          <a
            href={`${TWITTER_SHARE_URL}?text=${encodedTitle}&url=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on Twitter"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600 transition hover:border-[#1DA1F2]/70 hover:text-[#1DA1F2] dark:border-slate-700/70 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:border-[#1DA1F2]/70 dark:hover:text-[#1DA1F2]"
          >
            <Twitter className="h-3.5 w-3.5" aria-hidden="true" />
            Tweet
          </a>
          <a
            href={`${LINKEDIN_SHARE_URL}?mini=true&url=${encodedUrl}&title=${encodedTitle}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on LinkedIn"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600 transition hover:border-[#0A66C2]/70 hover:text-[#0A66C2] dark:border-slate-700/70 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:border-[#0A66C2]/70 dark:hover:text-[#0A66C2]"
          >
            <Linkedin className="h-3.5 w-3.5" aria-hidden="true" />
            Share
          </a>
          <button
            type="button"
            aria-label="Copy link"
            onClick={handleCopyLink}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600 transition hover:border-primary/50 hover:text-primary dark:border-slate-700/70 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:border-primary/50 dark:hover:text-primary"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            ) : (
              <LinkIcon className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  )
}
