"use client"

import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { FlagIcon } from "@/components/flag-icon"
import { useCountries } from "@/lib/country-context"
import { Skeleton } from "@/components/ui/skeleton"

export default function Home() {
  const { countries } = useCountries()

  const visitedCountries = countries.filter(country => country.visited)
  const homeCountries = countries.filter(country => country.home)
  const wishlistCountries = countries.filter(country => country.wishlist)
  
  const totalCountries = countries.length
  const visitedCount = visitedCountries.length
  const homeCount = homeCountries.length
  const wishlistCount = wishlistCountries.length
  
  const progress = totalCountries > 0 ? (visitedCount / totalCountries) * 100 : 0
  
  const regions = [...new Set(countries.map(country => country.region))]
  const regionsVisited = [...new Set(visitedCountries.map(country => country.region))]
  
  const recentVisits = visitedCountries
    .filter(country => country.visitDate)
    .sort((a, b) => new Date(b.visitDate!).getTime() - new Date(a.visitDate!).getTime())
    .slice(0, 5)

  if (!countries) {
    return (
      <AppLayout>
        <div className="space-y-6">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-96" />
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-16 mb-2" />
                  <Skeleton className="h-3 w-32" />
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle><Skeleton className="h-6 w-32" /></CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <Skeleton className="h-6 w-6 rounded" />
                    <Skeleton className="h-4 flex-1" />
                  </div>
                ))}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle><Skeleton className="h-6 w-32" /></CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 flex-1" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Track your travel journey across the world
          </p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
                          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Countries</CardTitle>
                <FlagIcon countryCode="globe" className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCountries}</div>
              <p className="text-xs text-muted-foreground">
                Countries in your list
              </p>
            </CardContent>
          </Card>
          
          <Card>
                          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Visited</CardTitle>
                <FlagIcon countryCode="check" className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{visitedCount}</div>
              <p className="text-xs text-muted-foreground">
                Countries visited
              </p>
            </CardContent>
          </Card>

          <Card>
                          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Progress</CardTitle>
                <FlagIcon countryCode="trending-up" className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(progress)}%</div>
              <Progress value={progress} className="mt-2" />
            </CardContent>
          </Card>
          
          <Card>
                          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Regions</CardTitle>
                <FlagIcon countryCode="map" className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{regionsVisited.length}</div>
              <p className="text-xs text-muted-foreground">
                of {regions.length} regions
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Visits</CardTitle>
            </CardHeader>
            <CardContent>
              {recentVisits.length > 0 ? (
                <div className="space-y-3">
                  {recentVisits.map((country) => (
                                         <div key={country.id} className="flex items-center space-x-3">
                       <FlagIcon countryCode={country.code} className="h-6 w-6" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{country.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(country.visitDate!).toLocaleDateString()}
                        </p>
                      </div>
                      {country.rating && (
                        <Badge variant="secondary">
                          {"⭐".repeat(Number(country.rating))}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No recent visits to show
                </p>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Regions Visited</CardTitle>
            </CardHeader>
            <CardContent>
              {regionsVisited.length > 0 ? (
                <div className="space-y-3">
                  {regionsVisited.map((region) => (
                    <div key={region} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{region}</span>
                      <Badge variant="outline">
                        {visitedCountries.filter(c => c.region === region).length}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No regions visited yet
                </p>
              )}
            </CardContent>
          </Card>
        </div>
    </div>
    </AppLayout>
  )
}
