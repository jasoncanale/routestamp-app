"use client"

import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import { FlagIcon } from "@/components/flag-icon"

// Cache for processed SVG content
const svgCache = new Map<string, string>()

// Memoized country data cache
const createCountryDataCache = () => {
  const cache = new Map<string, {
    status: string
    color: string
    name: string
    isVisited: boolean
    isWishlist: boolean
    isHome: boolean
  }>()
  
  return {
    get: (countryCode: string, countries: any[]) => {
      const key = `${countryCode}-${countries.length}`
      if (cache.has(key)) {
        return cache.get(key)!
      }
      
      const country = countries.find(c => c.code === countryCode)
      const status = country?.visited ? "visited" : 
                    country?.wishlist ? "wishlist" : 
                    country?.home ? "home" : "none"
      
      const color = status === "visited" ? "#22c55e" :
                   status === "wishlist" ? "#f59e0b" :
                   status === "home" ? "#ef4444" : "#e5e7eb"
      
      const data = {
        status,
        color,
        name: country?.name || countryCode,
        isVisited: !!country?.visited,
        isWishlist: !!country?.wishlist,
        isHome: !!country?.home
      }
      
      cache.set(key, data)
      return data
    },
    clear: () => cache.clear()
  }
}

const countryDataCache = createCountryDataCache()

interface WorldMapProps {
  countries: any[]
  onCountryHover?: (countryCode: string | null) => void
  className?: string
}

export default function WorldMap({ countries, onCountryHover, className = "" }: WorldMapProps) {
  const [svgContent, setSvgContent] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const mapRef = useRef<HTMLDivElement>(null)

  const getCountryData = useCallback((countryCode: string) => {
    return countryDataCache.get(countryCode, countries)
  }, [countries])

  // Lazy load SVG content
  useEffect(() => {
    const loadSvg = async () => {
      // Check cache first
      const cacheKey = 'simple-world-map'
      if (svgCache.has(cacheKey)) {
        console.log('Using cached SVG')
        setSvgContent(svgCache.get(cacheKey)!)
        setIsLoading(false)
        return
      }

      try {
        console.log('Loading simple world map...')
        const response = await fetch('/assets/simple-world-map.svg')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const svgText = await response.text()
        
        // Cache the SVG content
        svgCache.set(cacheKey, svgText)
        setSvgContent(svgText)
      } catch (error) {
        console.error('Failed to load simple world map:', error)
        setSvgContent('')
      } finally {
        setIsLoading(false)
      }
    }

    loadSvg()
  }, [])

  const processSvgContent = useCallback((svgText: string) => {
    const cacheKey = `processed-${countries.length}-${hoveredCountry}`
    if (svgCache.has(cacheKey)) {
      return svgCache.get(cacheKey)!
    }

    // Create a temporary div to parse the SVG
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = svgText
    
    const svgElement = tempDiv.querySelector('svg')
    if (!svgElement) {
      return svgText
    }

    // Set viewBox and styling
    svgElement.setAttribute('viewBox', '0 0 2000 857')
    svgElement.setAttribute('class', 'w-full h-full')
    svgElement.style.minHeight = '400px'

    // Process each path to add colors
    const paths = svgElement.querySelectorAll('path')
    paths.forEach((path) => {
      const countryCode = path.getAttribute('id')
      if (countryCode && countryCode.length === 2) {
        const countryData = getCountryData(countryCode.toUpperCase())
        const isHovered = hoveredCountry === countryCode.toUpperCase()
        
        path.setAttribute('fill', countryData.color)
        path.setAttribute('stroke', '#374151')
        path.setAttribute('stroke-width', isHovered ? '2' : '1')
        path.style.cursor = 'pointer'
        path.style.transition = 'all duration-200'
        path.style.opacity = isHovered ? '0.8' : '1'
      }
    })

    const processedSvg = tempDiv.innerHTML
    svgCache.set(cacheKey, processedSvg)
    return processedSvg
  }, [countries, hoveredCountry, getCountryData])

  // Handle SVG interactions
  useEffect(() => {
    if (!svgContent || !mapRef.current) {
      return
    }

    const container = mapRef.current
    const svg = container.querySelector('svg')
    if (!svg) {
      return
    }

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as SVGPathElement
      if (target.tagName === 'path') {
        const countryCode = target.getAttribute('id')
        if (countryCode && countryCode.length === 2) {
          const upperCode = countryCode.toUpperCase()
          setHoveredCountry(upperCode)
          onCountryHover?.(upperCode)
          
          const rect = container.getBoundingClientRect()
          setTooltipPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
          })
          
          // Update hover effect
          target.style.opacity = '0.8'
          target.setAttribute('stroke-width', '2')
        }
      }
    }

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as SVGPathElement
      if (target.tagName === 'path') {
        setHoveredCountry(null)
        onCountryHover?.(null)
        
        // Reset hover effect
        target.style.opacity = '1'
        target.setAttribute('stroke-width', '1')
      }
    }

    // Add event listeners to each path
    const paths = svg.querySelectorAll('path')
    paths.forEach((path) => {
      path.addEventListener('mouseenter', handleMouseEnter)
      path.addEventListener('mouseleave', handleMouseLeave)
    })

    // Cleanup
    return () => {
      paths.forEach((path) => {
        path.removeEventListener('mouseenter', handleMouseEnter)
        path.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [svgContent, onCountryHover])

  // Update colors when countries change
  useEffect(() => {
    if (!svgContent || !mapRef.current) return

    const container = mapRef.current
    const svg = container.querySelector('svg')
    if (!svg) return

    const paths = svg.querySelectorAll('path')
    paths.forEach((path) => {
      const countryCode = path.getAttribute('id')
      if (countryCode && countryCode.length === 2) {
        const countryData = getCountryData(countryCode.toUpperCase())
        const isHovered = hoveredCountry === countryCode.toUpperCase()
        
        path.setAttribute('fill', countryData.color)
        path.setAttribute('stroke-width', isHovered ? '2' : '1')
        path.style.opacity = isHovered ? '0.8' : '1'
      }
    })
  }, [countries, hoveredCountry, svgContent, getCountryData])

  // Memoized tooltip content
  const tooltipContent = useMemo(() => {
    if (!hoveredCountry) return null
    
    const countryData = getCountryData(hoveredCountry)
    return (
      <div 
        className="absolute bg-white border border-gray-200 rounded-lg p-3 shadow-lg z-20 pointer-events-none"
        style={{
          left: tooltipPosition.x + 10,
          top: tooltipPosition.y - 10,
          transform: 'translateY(-100%)'
        }}
      >
        <div className="flex items-center space-x-2">
          <FlagIcon countryCode={hoveredCountry} className="h-4 w-4" />
          <span className="font-medium text-sm">{countryData.name}</span>
          <Badge variant={
            countryData.status === "visited" ? "default" :
            countryData.status === "wishlist" ? "secondary" :
            countryData.status === "home" ? "destructive" : "outline"
          } className="text-xs">
            {countryData.status === "visited" ? "Visited" :
             countryData.status === "wishlist" ? "Wishlist" :
             countryData.status === "home" ? "Home" : "Not Visited"}
          </Badge>
        </div>
      </div>
    )
  }, [hoveredCountry, tooltipPosition, getCountryData])

  if (isLoading) {
    return (
      <div className={`w-full h-96 border rounded-lg bg-blue-50 flex items-center justify-center ${className}`}>
        <div className="text-center">
          <p className="text-gray-600 mb-2">Loading world map...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`} ref={mapRef}>
      {svgContent ? (
        <div 
          className="w-full h-96 border rounded-lg bg-blue-50 relative overflow-hidden"
          style={{ minHeight: "400px" }}
          dangerouslySetInnerHTML={{ __html: processSvgContent(svgContent) }}
        />
      ) : (
        <div className="w-full h-96 border rounded-lg bg-blue-50 relative overflow-hidden flex items-center justify-center" style={{ minHeight: "400px" }}>
          <div className="text-center">
            <p className="text-gray-600 mb-2">Failed to load map</p>
          </div>
        </div>
      )}
      
      {/* Legend */}
      <div className="absolute top-4 left-4 bg-white border border-gray-200 rounded-lg p-3 shadow-sm z-10">
        <div className="text-sm font-bold text-gray-700 mb-2">Legend</div>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 border border-gray-300 rounded"></div>
            <span className="text-xs text-gray-600">Visited</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-amber-500 border border-gray-300 rounded"></div>
            <span className="text-xs text-gray-600">Wishlist</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 border border-gray-300 rounded"></div>
            <span className="text-xs text-gray-600">Home</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-200 border border-gray-300 rounded"></div>
            <span className="text-xs text-gray-600">Not Visited</span>
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {tooltipContent}
    </div>
  )
} 