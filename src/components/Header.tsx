"use client"

import "../app/globals.css";
import { useEffect, useState } from "react"
import { Menu } from "lucide-react"
import Link from "next/link"
import {
  DM_Sans,
  Figtree,
  Manrope,
  Outfit,
  Plus_Jakarta_Sans,
  Raleway,
  Rubik,
  Sora,
  Space_Grotesk,
  Urbanist,
} from "next/font/google"
import DarkModeToggle from "./DarkModeToggle"
import GlobalSearch from "./GlobalSearch"

// Toggle the active export here to preview different brand voices.
// const brandFontModern = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["700"] }) // clean tech
// const brandFontFuturistic = Space_Grotesk({ subsets: ["latin"], weight: ["600"] }) // geometric edge
const brandFontPlayful = Sora({ subsets: ["latin"], weight: ["600"] }) // rounded friendly
const brandFontMinimal = Outfit({ subsets: ["latin"], weight: ["500", "600"] }) // airy minimal
const brandFontHumanist = Manrope({ subsets: ["latin"], weight: ["600", "700"] }) // approachable
const brandFontBold = Urbanist({ subsets: ["latin"], weight: ["700"] }) // bold modern
const brandFontNeutral = Figtree({ subsets: ["latin"], weight: ["600"] }) // versatile neutral
const brandFontElegant = Raleway({ subsets: ["latin"], weight: ["600"] }) // refined
const brandFontDynamic = Rubik({ subsets: ["latin"], weight: ["600", "700"] }) // animated
const brandFontSoft = DM_Sans({ subsets: ["latin"], weight: ["500", "700"] }) // soft curvature

const brandFont = brandFontPlayful

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const header = document.querySelector<HTMLElement>("[data-site-header]")
    if (!header) return

    const update = () => {
      const height = Math.ceil(header.getBoundingClientRect().height)
      if (height > 0) {
        document.documentElement.style.setProperty("--site-header-height", `${height}px`)
      }
    }

    update()

    if (typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver(update)
      observer.observe(header)
      window.addEventListener("resize", update)
      return () => {
        observer.disconnect()
        window.removeEventListener("resize", update)
      }
    }

    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])


  // No admin check content


  return (
    <header data-site-header className="sticky top-0 z-50 bg-white dark:bg-tech-dark shadow-md transition-theme">
      <div className="container mx-auto max-w-7xl border-b border-slate-200/30 px-4 sm:px-6 lg:px-8 dark:border-slate-800/40">
        <div className="flex items-center gap-4 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center" aria-label="CodeWithGanesh home">
            <span className={`${brandFont.className} text-2xl font-semibold tracking-tight text-slate-900 dark:text-white`}>CodeWithGanesh</span>
          </Link>

          {/* Navigation + Controls */}
          <div className="ml-auto flex items-center gap-3 md:gap-5">
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="nav-link text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary font-medium transition-theme">Home</Link>
              <Link href="/videos" className="nav-link text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary font-medium transition-theme">Videos</Link>
              <Link href="/shorts" className="nav-link text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary font-medium transition-theme">Shorts</Link>
              <Link href="/tutorials" className="nav-link text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary font-medium transition-theme">Tutorials</Link>
              <Link href="/blog" className="nav-link text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary font-medium transition-theme">Blog</Link>

              <Link href="https://youtube.com" target="_blank" className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-theme shadow-md hover:shadow-lg">
                Subscribe
              </Link>
            </nav>

            <GlobalSearch />
            <DarkModeToggle />
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-theme">
              <Menu className="h-6 w-6 text-slate-700 dark:text-slate-300" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-4 pt-2 pb-3">
              <Link href="/" onClick={() => setMenuOpen(false)} className="text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary font-medium transition-theme">Home</Link>
              <Link href="/videos" onClick={() => setMenuOpen(false)} className="text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary font-medium transition-theme">Videos</Link>
              <Link href="/shorts" onClick={() => setMenuOpen(false)} className="text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary font-medium transition-theme">Shorts</Link>
              <Link href="/tutorials" onClick={() => setMenuOpen(false)} className="text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary font-medium transition-theme">Tutorials</Link>
              <Link href="/blog" onClick={() => setMenuOpen(false)} className="text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary font-medium transition-theme">Blog</Link>

              <Link href="https://youtube.com" target="_blank" className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg text-center mt-2 shadow-md">
                Subscribe on YouTube
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
