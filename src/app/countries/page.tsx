"use client"

import { useState, useMemo } from "react"
import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FlagIcon } from "@/components/flag-icon"
import { useCountries } from "@/lib/country-context"
import { AddCountryDialog } from "@/components/add-country-dialog"
import { EditCountryDialog } from "@/components/edit-country-dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, Filter, SortAsc, SortDesc, Plus, Edit, Trash2, Home, Heart, MapPin } from "lucide-react"

const ITEMS_PER_PAGE = 6

export default function CountriesPage() {
  const { countries, deleteCountry, editCountry, addCountry } = useCountries()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [showVisited, setShowVisited] = useState<boolean | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [editingCountry, setEditingCountry] = useState<any>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const regions = useMemo(() => {
    const uniqueRegions = [...new Set(countries.map(country => country.region))]
    return uniqueRegions.sort()
  }, [countries])

  const filteredAndSortedCountries = useMemo(() => {
    let filtered = countries.filter(country => {
      const matchesSearch = (country.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
                           (country.code?.toLowerCase() || "").includes(searchTerm.toLowerCase())
      const matchesRegion = selectedRegion === "all" || country.region === selectedRegion
      const matchesVisited = showVisited === null || country.visited === showVisited
      
      return matchesSearch && matchesRegion && matchesVisited
    })

    // Sort the filtered countries
    filtered.sort((a, b) => {
      let aValue: any
      let bValue: any

      switch (sortBy) {
        case "name":
          aValue = (a.name?.toLowerCase() || "")
          bValue = (b.name?.toLowerCase() || "")
          break
        case "visitDate":
          aValue = a.visitDate ? new Date(a.visitDate).getTime() : 0
          bValue = b.visitDate ? new Date(b.visitDate).getTime() : 0
          break
        case "dateAdded":
          aValue = parseInt(a.id)
          bValue = parseInt(b.id)
          break
        case "rating":
          aValue = Number(a.rating || "0")
          bValue = Number(b.rating || "0")
          break
        default:
          aValue = (a.name?.toLowerCase() || "")
          bValue = (b.name?.toLowerCase() || "")
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    return filtered
  }, [countries, searchTerm, selectedRegion, showVisited, sortBy, sortOrder])

  const totalPages = Math.ceil(filteredAndSortedCountries.length / ITEMS_PER_PAGE)
  const paginatedCountries = filteredAndSortedCountries.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const visitedCount = countries.filter(c => c.visited).length
  const wishlistCount = countries.filter(c => c.wishlist).length
  const notVisitedCount = countries.filter(c => !c.visited && !c.home).length
  const homeCount = countries.filter(c => c.home).length

  if (!countries) {
    return (
      <AppLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-96" />
            </div>
            <Skeleton className="h-10 w-32" />
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

          <div className="flex gap-4 flex-wrap">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Skeleton className="h-6 w-6 rounded" />
                    <Skeleton className="h-5 flex-1" />
                  </div>
                  <Skeleton className="h-4 w-20" />
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="flex gap-2 mb-4">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                  <div className="mt-auto flex gap-2">
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-8 w-16" />
                  </div>
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
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Countries</h1>
            <p className="text-muted-foreground">
              Manage your country collection and track your travels
            </p>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Country
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Visited</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
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
              <CardTitle className="text-sm font-medium">Wishlist</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{wishlistCount}</div>
              <p className="text-xs text-muted-foreground">
                Countries to visit
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Not Visited</CardTitle>
              <FlagIcon countryCode="globe" className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{notVisitedCount}</div>
              <p className="text-xs text-muted-foreground">
                Countries not visited
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Home</CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{homeCount}</div>
              <p className="text-xs text-muted-foreground">
                Home countries
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <div className="flex gap-4 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search countries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              {regions.map((region) => (
                <SelectItem key={region} value={region}>{region}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={showVisited?.toString() || "all"} onValueChange={(value) => {
            if (value === "all") setShowVisited(null)
            else setShowVisited(value === "true")
          }}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Countries</SelectItem>
              <SelectItem value="true">Visited</SelectItem>
              <SelectItem value="false">Not Visited</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={`${sortBy}-${sortOrder}`} onValueChange={(value) => {
            const [newSortBy, newSortOrder] = value.split('-')
            setSortBy(newSortBy)
            setSortOrder(newSortOrder as "asc" | "desc")
          }}>
            <SelectTrigger className="w-[180px]">
              <SortAsc className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name-asc">Name (A-Z)</SelectItem>
              <SelectItem value="name-desc">Name (Z-A)</SelectItem>
              <SelectItem value="visitDate-asc">Visit Date (Oldest)</SelectItem>
              <SelectItem value="visitDate-desc">Visit Date (Newest)</SelectItem>
              <SelectItem value="dateAdded-asc">Date Added (Oldest)</SelectItem>
              <SelectItem value="dateAdded-desc">Date Added (Newest)</SelectItem>
              <SelectItem value="rating-asc">Rating (Lowest)</SelectItem>
              <SelectItem value="rating-desc">Rating (Highest)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Countries Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {paginatedCountries.map((country) => (
            <Card key={country.id} className="flex flex-col relative">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <FlagIcon countryCode={country.code} size="lg" />
                  <div className="flex-1">
                    <h3 className="font-semibold">{country.name}</h3>
                    <p className="text-sm text-muted-foreground">{country.code}</p>
                  </div>
                </div>
              </CardHeader>
              
              {/* Badges positioned at top right */}
              <div className="absolute top-4 right-4 flex gap-1">
                {country.visited && <Badge variant="default" className="text-xs">Visited</Badge>}
                {country.wishlist && <Badge variant="secondary" className="text-xs">Wishlist</Badge>}
                {country.home && <Badge variant="destructive" className="text-xs">Home</Badge>}
              </div>
              <CardContent className="flex-1 flex flex-col">
                <div className="text-sm text-muted-foreground mb-4">
                  <p>Region: {country.region}</p>
                  {country.visitDate && (
                    <p>Visited: {new Date(country.visitDate).toLocaleDateString()}</p>
                  )}
                  {country.rating && (
                    <p>Rating: {"⭐".repeat(Number(country.rating))}</p>
                  )}
                  {country.cities && (
                    <p>Cities: {country.cities}</p>
                  )}
                </div>
                <div className="mt-auto flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingCountry(country)}
                    className="flex-1"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteCountry(country.id)}
                    className="flex-1"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}

                 {/* Dialogs */}
         <AddCountryDialog 
           open={isAddDialogOpen}
           onOpenChange={setIsAddDialogOpen}
           onAdd={addCountry}
         />
         
         {editingCountry && (
           <EditCountryDialog
             country={editingCountry}
             open={!!editingCountry}
             onOpenChange={(open) => {
               if (!open) {
                 setEditingCountry(null)
               }
             }}
             onEdit={editCountry}
           />
         )}
      </div>
    </AppLayout>
  )
} 