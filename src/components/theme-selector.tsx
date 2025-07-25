"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Palette } from "lucide-react"

const themes = [
  {
    value: "light",
    label: "Light",
    description: "Default light theme"
  },
  {
    value: "dark",
    label: "Dark", 
    description: "Default dark theme"
  },
  {
    value: "system",
    label: "System",
    description: "Follows your system preference"
  }
]

export function ThemeSelector() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="space-y-2">
        <Select disabled>
          <SelectTrigger className="w-full">
            <div className="flex items-center space-x-2">
              <Palette className="h-4 w-4" />
              <span>Loading...</span>
            </div>
          </SelectTrigger>
        </Select>
      </div>
    )
  }

  // Use resolvedTheme for display, but theme for the actual value
  const displayTheme = resolvedTheme || theme || "system"

  return (
    <div className="space-y-2">
      <Select value={theme || "system"} onValueChange={setTheme}>
        <SelectTrigger className="w-full">
          <div className="flex items-center space-x-2">
            <Palette className="h-4 w-4" />
            <SelectValue placeholder="Select theme" />
          </div>
        </SelectTrigger>
        <SelectContent className="max-h-60">
          {themes.map((themeOption) => (
            <SelectItem key={themeOption.value} value={themeOption.value}>
              <div className="flex flex-col space-y-1">
                <span className="font-medium">{themeOption.label}</span>
                <span className="text-xs text-muted-foreground">
                  {themeOption.description}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
} 