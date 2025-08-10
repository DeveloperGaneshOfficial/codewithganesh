// File: src/components/Header.tsx
"use client"

import "../app/globals.css";
import { useState } from "react"
import { Menu, ChevronDown } from "lucide-react"
import Link from "next/link"
import DarkModeToggle from "./DarkModeToggle"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-tech-dark/90 backdrop-blur-md shadow-sm dark:shadow-slate-900/30 transition-theme">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="#" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-md">
              <span className="font-mono">C</span>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight">CodeWithGanesh</span>
              <span className="hidden sm:inline-block text-primary font-mono text-sm ml-1">.com</span>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="nav-link text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary font-medium transition-theme">Home</Link>
            <Link href="/videos" className="nav-link text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary font-medium transition-theme">Videos</Link>
            <Link href="/blog" className="nav-link text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary font-medium transition-theme">Blog</Link>
            <div className="relative">
              <button onClick={() => setAccountOpen(!accountOpen)} className="nav-link flex items-center text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary font-medium">
                Account <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              {accountOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-lg py-2 transition-all border border-slate-200 dark:border-slate-700">
                  <Link href="/login" className="block px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-primary dark:hover:text-primary">
                    Login
                  </Link>
                  <Link href="/register" className="block px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-primary dark:hover:text-primary">
                    Register
                  </Link>
                </div>
              )}
            </div>
            <Link href="https://youtube.com" target="_blank" className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-theme shadow-md hover:shadow-lg">
              Subscribe
            </Link>
          </nav>

          {/* Search Bar and Mobile & Dark Toggle */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <form className="hidden md:block w-full max-w-xs" role="search" onSubmit={e => e.preventDefault()}>
              <input
                type="search"
                placeholder="Search..."
                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-theme"
                aria-label="Search"
              />
            </form>
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
              <Link href="/blog" onClick={() => setMenuOpen(false)} className="text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary font-medium transition-theme">Blog</Link>
              <Link href="/login" onClick={() => setMenuOpen(false)} className="text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary font-medium">Login</Link>
              <Link href="/register" onClick={() => setMenuOpen(false)} className="text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary font-medium">Register</Link>
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
