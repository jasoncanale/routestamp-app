"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { FlagIcon } from "@/components/flag-icon"
import { CountryAutocomplete } from "@/components/country-autocomplete"
import { regions } from "@/lib/data"
import { Country } from "@/lib/types"
import { CountryOption } from "@/lib/countries-list"
import { Plus, Home } from "lucide-react"

interface AddCountryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (country: Omit<Country, 'id'>) => void
}

export function AddCountryDialog({ open, onOpenChange, onAdd }: AddCountryDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    flag: "",
    region: "",
    status: "none" as "visited" | "wishlist" | "home" | "none",
    visitDate: "",
    notes: "",
    rating: "",
    cities: ""
  })

  const handleCountrySelect = (country: CountryOption) => {
    setFormData({
      ...formData,
      name: country.name,
      code: country.code,
      flag: country.flag,
      region: country.region
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newCountry: Omit<Country, 'id'> = {
      name: formData.name,
      code: formData.code.toUpperCase(),
      flag: formData.code.toUpperCase(),
      region: formData.region,
      visited: formData.status === "visited",
      wishlist: formData.status === "wishlist",
      home: formData.status === "home",
      visitDate: formData.visitDate || undefined,
      notes: formData.notes || undefined,
      rating: formData.rating ? parseInt(formData.rating) : undefined,
      cities: formData.cities ? formData.cities.split(',').map(city => city.trim()) : []
    }

    onAdd(newCountry)
    onOpenChange(false)
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      name: "",
      code: "",
      flag: "",
      region: "",
      status: "none",
      visitDate: "",
      notes: "",
      rating: "",
      cities: ""
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Country</DialogTitle>
          <DialogDescription>
            Add a new country to your travel tracker. Start typing a country name to auto-fill details.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Country Name</Label>
            <CountryAutocomplete
              value={formData.name}
              onValueChange={(value) => setFormData({ ...formData, name: value })}
              onCountrySelect={handleCountrySelect}
              placeholder="Search for a country..."
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="code">Country Code</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="e.g., US"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="region">Region</Label>
              <Select value={formData.region} onValueChange={(value) => setFormData({ ...formData, region: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((region) => (
                    <SelectItem key={region} value={region}>{region}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Country Status</Label>
              <RadioGroup 
                value={formData.status} 
                onValueChange={(value: "visited" | "wishlist" | "home" | "none") => {
                  setFormData({ 
                    ...formData, 
                    status: value,
                    // Clear visit date and rating if switching away from visited
                    visitDate: value !== "visited" ? "" : formData.visitDate,
                    rating: value !== "visited" ? "" : formData.rating
                  })
                }}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="visited" id="visited" />
                  <Label htmlFor="visited">Visited</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="wishlist" id="wishlist" />
                  <Label htmlFor="wishlist">Wishlist</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="home" id="home" />
                  <Label htmlFor="home">Home Country</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          {formData.status === "visited" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="visitDate">Visit Date</Label>
                <Input
                  id="visitDate"
                  type="date"
                  value={formData.visitDate}
                  onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="rating">Rating (1-5)</Label>
                <Select value={formData.rating} onValueChange={(value) => setFormData({ ...formData, rating: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">⭐⭐⭐⭐⭐ (5)</SelectItem>
                    <SelectItem value="4">⭐⭐⭐⭐ (4)</SelectItem>
                    <SelectItem value="3">⭐⭐⭐ (3)</SelectItem>
                    <SelectItem value="2">⭐⭐ (2)</SelectItem>
                    <SelectItem value="1">⭐ (1)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {(formData.status === "visited" || formData.status === "home") && (
            <div className="space-y-2">
              <Label htmlFor="cities">
                {formData.status === "visited" ? "Cities Visited" : "Cities Explored"}
              </Label>
              <Input
                id="cities"
                value={formData.cities}
                onChange={(e) => setFormData({ ...formData, cities: e.target.value })}
                placeholder={formData.status === "visited" ? "e.g., Tokyo, Kyoto, Osaka (comma separated)" : "e.g., New York, Los Angeles, Chicago (comma separated)"}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Any additional notes about this country..."
              rows={3}
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Add Country
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 