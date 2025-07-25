export interface Country {
  id: string
  name: string
  code: string
  flag: string
  region: string
  visited: boolean
  wishlist?: boolean
  home?: boolean
  visitDate?: string
  notes?: string
  rating?: number
  cities?: string[]
}

export interface CountryStats {
  totalCountries: number
  visitedCountries: number
  unvisitedCountries: number
  progressPercentage: number
  regionsVisited: string[]
}

export interface HistoryEntry {
  id: string
  action: string
  data: any
  timestamp: string
}

export interface HistoryState {
  countries: Country[]
} 