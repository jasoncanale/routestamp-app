"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

export function SimpleThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <Button variant="outline" size="sm">Loading...</Button>
  }

  return (
    <div className="space-y-2">
      <div className="text-sm font-medium">Current Theme: {theme}</div>
      <div className="flex space-x-2">
        <Button 
          variant={theme === "light" ? "default" : "outline"} 
          size="sm"
          onClick={() => setTheme("light")}
        >
          <Sun className="h-4 w-4 mr-2" />
          Light
        </Button>
        <Button 
          variant={theme === "dark" ? "default" : "outline"} 
          size="sm"
          onClick={() => setTheme("dark")}
        >
          <Moon className="h-4 w-4 mr-2" />
          Dark
        </Button>
        <Button 
          variant={theme === "system" ? "default" : "outline"} 
          size="sm"
          onClick={() => setTheme("system")}
        >
          System
        </Button>

      </div>
    </div>
  )
} 