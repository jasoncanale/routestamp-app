"use client"

import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { FlagIcon } from "@/components/flag-icon"
import { useCountries } from "@/lib/country-context"
import { Skeleton } from "@/components/ui/skeleton"

export default function StatsPage() {
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
  
  const topRatedCountries = visitedCountries
    .filter(country => country.rating)
    .sort((a, b) => Number(b.rating) - Number(a.rating))
    .slice(0, 5)

  const travelTimeline = visitedCountries
    .filter(country => country.visitDate)
    .sort((a, b) => new Date(b.visitDate!).getTime() - new Date(a.visitDate!).getTime())
    .slice(0, 10)

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
          
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle><Skeleton className="h-6 w-32" /></CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle><Skeleton className="h-6 w-32" /></CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <Skeleton className="h-6 w-6 rounded" />
                    <Skeleton className="h-4 flex-1" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle><Skeleton className="h-6 w-32" /></CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <Skeleton className="h-6 w-6 rounded" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-32 mb-1" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Statistics</h1>
          <p className="text-muted-foreground">
            Detailed analytics of your travel journey
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
        
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Regional Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {regionsVisited.length > 0 ? (
                regionsVisited.map((region) => {
                  const regionCountries = visitedCountries.filter(c => c.region === region)
                  const percentage = (regionCountries.length / visitedCount) * 100
                  return (
                    <div key={region} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{region}</span>
                        <span>{regionCountries.length} countries</span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  )
                })
              ) : (
                <p className="text-sm text-muted-foreground">
                  No regions visited yet
                </p>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Top Rated Countries</CardTitle>
            </CardHeader>
            <CardContent>
              {topRatedCountries.length > 0 ? (
                <div className="space-y-3">
                  {topRatedCountries.map((country) => (
                    <div key={country.id} className="flex items-center space-x-3">
                      <FlagIcon countryCode={country.code} className="h-6 w-6" />
                      <span className="flex-1 text-sm font-medium">{country.name}</span>
                      <Badge variant="secondary">
                        {"⭐".repeat(Number(country.rating))}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No rated countries yet
                </p>
              )}
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Travel Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            {travelTimeline.length > 0 ? (
              <div className="space-y-3">
                {travelTimeline.map((country) => (
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
                No travel history yet
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
} 