"use client"

import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FlagIcon } from "@/components/flag-icon"
import { useCountries } from "@/lib/country-context"
import { Skeleton } from "@/components/ui/skeleton"
import { useMemo } from "react"

export default function MapPage() {
  const { countries } = useCountries()

  // Memoized filtered countries
  const { visitedCountries, homeCountries, wishlistCountries } = useMemo(() => ({
    visitedCountries: countries.filter(country => country.visited),
    homeCountries: countries.filter(country => country.home),
    wishlistCountries: countries.filter(country => country.wishlist)
  }), [countries])

  // Memoized statistics cards
  const statisticsCards = useMemo(() => [
    {
      title: "Visited Countries",
      countries: visitedCountries,
      badgeVariant: "default" as const,
      badgeText: "Visited",
      emptyMessage: "No visited countries yet"
    },
    {
      title: "Wishlist Countries",
      countries: wishlistCountries,
      badgeVariant: "secondary" as const,
      badgeText: "Wishlist",
      emptyMessage: "No wishlist countries yet"
    },
    {
      title: "Home Countries",
      countries: homeCountries,
      badgeVariant: "destructive" as const,
      badgeText: "Home",
      emptyMessage: "No home countries set"
    }
  ], [visitedCountries, wishlistCountries, homeCountries])

  if (!countries) {
    return (
      <AppLayout>
        <div className="space-y-6">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-96" />
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle><Skeleton className="h-6 w-32" /></CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-96 w-full" />
            </CardContent>
          </Card>
          
          <div className="grid gap-6 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle><Skeleton className="h-6 w-32" /></CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[...Array(5)].map((_, j) => (
                    <div key={j} className="flex items-center space-x-3">
                      <Skeleton className="h-6 w-6 rounded" />
                      <Skeleton className="h-4 flex-1" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Map View</h1>
          <p className="text-muted-foreground">
            Interactive world map visualization - Coming Soon
          </p>
        </div>
        
        {/* World Map - Coming Soon */}
        <Card>
          <CardHeader>
            <CardTitle>World Map</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-96 border rounded-lg bg-gradient-to-br from-muted/50 to-muted/30 relative overflow-hidden flex items-center justify-center" style={{ minHeight: "400px" }}>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Interactive World Map</h3>
                  <p className="text-muted-foreground mb-4">Visualize your travel journey across the globe</p>
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20">
                    <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></span>
                    Coming Soon
                  </div>
                </div>
                <div className="text-sm text-muted-foreground max-w-md">
                  We're working on an interactive world map that will show your visited countries, wishlist destinations, and home countries with beautiful visualizations.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Statistics Cards */}
        <div className="grid gap-6 lg:grid-cols-3">
          {statisticsCards.map((card, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{card.title}</CardTitle>
              </CardHeader>
              <CardContent>
                {card.countries.length > 0 ? (
                  <div className="space-y-3">
                    {card.countries.map((country) => (
                      <div key={country.id} className="flex items-center space-x-3">
                        <FlagIcon countryCode={country.code} className="h-6 w-6" />
                        <span className="flex-1 text-sm font-medium">{country.name}</span>
                        <Badge variant={card.badgeVariant}>{card.badgeText}</Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {card.emptyMessage}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  )
} 