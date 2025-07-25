"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

export interface Trip {
  id: string
  title: string
  country: string
  countryCode: string
  startDate: string
  endDate: string
  budget: number
  companions: string
  notes: string
  createdAt: string
}

interface TripsContextType {
  trips: Trip[]
  addTrip: (trip: Omit<Trip, 'id' | 'createdAt'>) => void
  editTrip: (id: string, updates: Partial<Trip>) => void
  deleteTrip: (id: string) => void
  getNextTrip: () => Trip | null
  getDaysUntilTrip: (trip: Trip) => number
}

const TripsContext = createContext<TripsContextType | undefined>(undefined)

const TRIPS_STORAGE_KEY = 'routestamp-trips'

export function TripsProvider({ children }: { children: React.ReactNode }) {
  const [trips, setTrips] = useState<Trip[]>([])

  // Load trips from localStorage on mount
  useEffect(() => {
    try {
      const savedTrips = localStorage.getItem(TRIPS_STORAGE_KEY)
      if (savedTrips) {
        setTrips(JSON.parse(savedTrips))
      }
    } catch (error) {
      console.error('Error loading trips from localStorage:', error)
    }
  }, [])

  // Save trips to localStorage whenever trips change
  useEffect(() => {
    try {
      localStorage.setItem(TRIPS_STORAGE_KEY, JSON.stringify(trips))
    } catch (error) {
      console.error('Error saving trips to localStorage:', error)
    }
  }, [trips])

  const addTrip = (trip: Omit<Trip, 'id' | 'createdAt'>) => {
    const newTrip: Trip = {
      ...trip,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    setTrips(prev => [...prev, newTrip])
  }

  const editTrip = (id: string, updates: Partial<Trip>) => {
    setTrips(prev => prev.map(trip => 
      trip.id === id ? { ...trip, ...updates } : trip
    ))
  }

  const deleteTrip = (id: string) => {
    setTrips(prev => prev.filter(trip => trip.id !== id))
  }

  const getNextTrip = (): Trip | null => {
    const now = new Date()
    const futureTrips = trips.filter(trip => new Date(trip.startDate) > now)
    
    if (futureTrips.length === 0) return null
    
    return futureTrips.sort((a, b) => 
      new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    )[0]
  }

  const getDaysUntilTrip = (trip: Trip): number => {
    const now = new Date()
    const tripDate = new Date(trip.startDate)
    const diffTime = tripDate.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return Math.max(0, diffDays)
  }

  return (
    <TripsContext.Provider value={{
      trips,
      addTrip,
      editTrip,
      deleteTrip,
      getNextTrip,
      getDaysUntilTrip
    }}>
      {children}
    </TripsContext.Provider>
  )
}

export function useTrips() {
  const context = useContext(TripsContext)
  if (context === undefined) {
    throw new Error('useTrips must be used within a TripsProvider')
  }
  return context
} 