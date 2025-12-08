"use client"

import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

const SCROLL_OFFSET = 280

export default function GoToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > SCROLL_OFFSET)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!isVisible) return null

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Back to top"
      className="fixed bottom-24 right-6 z-40 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border border-neutral-800/70 bg-[linear-gradient(150deg,_rgba(30,30,35,0.9)_0%,_rgba(20,20,25,0.86)_55%,_rgba(12,12,18,0.92)_100%)] text-slate-200 shadow-[0_10px_26px_-18px_rgba(12,16,24,0.7)] transition-transform transition-colors hover:-translate-y-1 hover:border-slate-300/40 hover:bg-[linear-gradient(150deg,_rgba(38,38,44,0.92)_0%,_rgba(24,24,30,0.88)_50%,_rgba(14,14,20,0.94)_100%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-200/40 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
    >
      <ArrowUp className="h-7 w-7 text-slate-200/85" aria-hidden="true" />
      <span className="sr-only">Back to top</span>
    </button>
  )
}
