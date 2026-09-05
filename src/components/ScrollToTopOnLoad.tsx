"use client"

import { useEffect } from "react"

export default function ScrollToTopOnLoad() {
  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    // Avoid fighting with explicit hash navigation
    if (window.location.hash) {
      return
    }

    window.scrollTo({ top: 0, behavior: "auto" })
  }, [])

  return null
}
