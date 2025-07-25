"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { FlagIcon } from "@/components/flag-icon"
import { useTrips } from "@/lib/trips-context"
import { useCurrency } from "@/lib/currency-context"
import { CountryAutocomplete } from "@/components/country-autocomplete"
import { CountryOption } from "@/lib/countries-list"
import { Plus, Edit, Trash2, Calendar, Users, DollarSign, MapPin } from "lucide-react"

export default function TripsPage() {
  const { trips, addTrip, editTrip, deleteTrip, getNextTrip, getDaysUntilTrip } = useTrips()
  const { formatCurrency } = useCurrency()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingTrip, setEditingTrip] = useState<any>(null)
  const [formData, setFormData] = useState({
    title: "",
    country: "",
    countryCode: "",
    startDate: "",
    endDate: "",
    budget: "",
    companions: "",
    notes: ""
  })

  const nextTrip = getNextTrip()

  const handleCountrySelect = (country: CountryOption) => {
    setFormData({
      ...formData,
      country: country.name,
      countryCode: country.code
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const tripData = {
      title: formData.title,
      country: formData.country,
      countryCode: formData.countryCode,
      startDate: formData.startDate,
      endDate: formData.endDate,
      budget: parseFloat(formData.budget) || 0,
      companions: formData.companions,
      notes: formData.notes
    }

    if (editingTrip) {
      editTrip(editingTrip.id, tripData)
      setEditingTrip(null)
    } else {
      addTrip(tripData)
    }
    
    setIsAddDialogOpen(false)
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      title: "",
      country: "",
      countryCode: "",
      startDate: "",
      endDate: "",
      budget: "",
      companions: "",
      notes: ""
    })
  }

  const handleEdit = (trip: any) => {
    setEditingTrip(trip)
    setFormData({
      title: trip.title,
      country: trip.country,
      countryCode: trip.countryCode,
      startDate: trip.startDate,
      endDate: trip.endDate,
      budget: trip.budget.toString(),
      companions: trip.companions,
      notes: trip.notes
    })
    setIsAddDialogOpen(true)
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Upcoming Trips</h1>
            <p className="text-muted-foreground">
              Plan and track your future travel adventures
            </p>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Trip
          </Button>
        </div>

        {/* Countdown to Next Trip */}
        {nextTrip && (
          <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Countdown to Next Trip
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <p className="text-sm opacity-90">Destination</p>
                  <p className="text-xl font-semibold">{nextTrip.country}</p>
                </div>
                <div>
                  <p className="text-sm opacity-90">Trip Title</p>
                  <p className="text-xl font-semibold">{nextTrip.title}</p>
                </div>
                <div>
                  <p className="text-sm opacity-90">Days Until Trip</p>
                  <p className="text-3xl font-bold">{getDaysUntilTrip(nextTrip)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Trips List */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {trips.length > 0 ? (
            trips.map((trip) => (
              <Card key={trip.id} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FlagIcon countryCode={trip.countryCode} className="h-5 w-5" />
                      <h3 className="font-semibold">{trip.title}</h3>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(trip)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteTrip(trip.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{trip.country}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                    </span>
                  </div>
                  
                  {trip.budget > 0 && (
                    <div className="flex items-center space-x-2 text-sm">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span>Budget: {formatCurrency(trip.budget)}</span>
                    </div>
                  )}
                  
                  {trip.companions && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>With: {trip.companions}</span>
                    </div>
                  )}
                  
                  {trip.notes && (
                    <div className="text-sm text-muted-foreground">
                      <p className="line-clamp-2">{trip.notes}</p>
                    </div>
                  )}
                  
                  <div className="pt-2 border-t">
                    <p className="text-xs text-muted-foreground">
                      Created: {new Date(trip.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full">
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No trips planned yet</h3>
                  <p className="text-muted-foreground text-center mb-4">
                    Start planning your next adventure by adding your first trip
                  </p>
                  <Button onClick={() => setIsAddDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Trip
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Add/Edit Trip Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editingTrip ? "Edit Trip" : "Add New Trip"}
              </DialogTitle>
              <DialogDescription>
                {editingTrip ? "Update your trip details" : "Plan your next adventure"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Trip Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Summer in Japan"
                  required
                />
              </div>
              
                              <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <CountryAutocomplete
                    value={formData.country}
                    onValueChange={(value) => setFormData({ ...formData, country: value })}
                    onCountrySelect={handleCountrySelect}
                    placeholder="Search for a country..."
                  />
                </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="budget">Budget</Label>
                <Input
                  id="budget"
                  type="number"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  placeholder="0"
                  min="0"
                  step="0.01"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="companions">Travel Companions</Label>
                <Input
                  id="companions"
                  value={formData.companions}
                  onChange={(e) => setFormData({ ...formData, companions: e.target.value })}
                  placeholder="e.g., Family, Friends, Solo"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Any additional notes about your trip..."
                  rows={3}
                />
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => {
                  setIsAddDialogOpen(false)
                  setEditingTrip(null)
                  resetForm()
                }}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingTrip ? "Update Trip" : "Add Trip"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  )
} 