"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeDebug() {
  const { theme, setTheme, resolvedTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded text-xs space-y-1 z-50">
      <div>Theme: {theme}</div>
      <div>Resolved: {resolvedTheme}</div>
      <div>System: {systemTheme}</div>
      <div>Mounted: {mounted ? "Yes" : "No"}</div>
      <button 
        onClick={() => setTheme("light")}
        className="bg-white text-black px-2 py-1 rounded mr-1"
      >
        Light
      </button>
      <button 
        onClick={() => setTheme("dark")}
        className="bg-white text-black px-2 py-1 rounded mr-1"
      >
        Dark
      </button>
      <button 
        onClick={() => setTheme("system")}
        className="bg-white text-black px-2 py-1 rounded"
      >
        System
      </button>
    </div>
  )
} 