"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from "react"
import { Country, HistoryEntry, HistoryState } from "./types"
import { sampleCountries } from "./data"

interface CountryContextType {
  countries: Country[]
  addCountry: (country: Omit<Country, 'id'>) => void
  editCountry: (id: string, updates: Partial<Country>) => void
  deleteCountry: (id: string) => void
  toggleVisited: (id: string) => void
  history: HistoryEntry[]
  undo: () => void
  redo: () => void
  clearHistory: () => void
  addHistoryEntry: (action: string, data: any) => void
  canUndo: boolean
  canRedo: boolean
}

const CountryContext = createContext<CountryContextType | undefined>(undefined)

const STORAGE_KEY = 'routestamp-countries'
const HISTORY_STORAGE_KEY = 'routestamp-history'

export function CountryProvider({ children }: { children: React.ReactNode }) {
  const [countries, setCountries] = useState<Country[]>([])
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [undoStack, setUndoStack] = useState<HistoryState[]>([])
  const [redoStack, setRedoStack] = useState<HistoryState[]>([])

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const savedCountries = localStorage.getItem(STORAGE_KEY)
      const savedHistory = localStorage.getItem(HISTORY_STORAGE_KEY)
      
      if (savedCountries) {
        setCountries(JSON.parse(savedCountries))
      } else {
        // Initialize with sample data if no saved data exists
        setCountries(sampleCountries)
      }
      
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory))
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error)
      // Fallback to sample data if localStorage fails
      setCountries(sampleCountries)
    }
  }, [])

  // Save data to localStorage whenever countries or history changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(countries))
    } catch (error) {
      console.error('Error saving countries to localStorage:', error)
    }
  }, [countries])

  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history))
    } catch (error) {
      console.error('Error saving history to localStorage:', error)
    }
  }, [history])

  const addHistoryEntry = useCallback((action: string, data: any) => {
    const newEntry: HistoryEntry = {
      id: Date.now().toString(),
      action,
      data,
      timestamp: new Date().toISOString()
    }
    
    setHistory(prev => [newEntry, ...prev.slice(0, 49)]) // Keep last 50 entries
  }, [])

  const addCountry = useCallback((country: Omit<Country, 'id'>) => {
    const newCountry: Country = {
      ...country,
      id: Date.now().toString()
    }
    
    // Save current state for undo
    setUndoStack(prev => [...prev, { countries: [...countries] }])
    setRedoStack([]) // Clear redo stack on new action
    
    setCountries(prev => [...prev, newCountry])
    addHistoryEntry('add', { country: newCountry })
  }, [countries, addHistoryEntry])

  const editCountry = useCallback((id: string, updates: Partial<Country>) => {
    // Save current state for undo
    setUndoStack(prev => [...prev, { countries: [...countries] }])
    setRedoStack([]) // Clear redo stack on new action
    
    setCountries(prev => prev.map(country => 
      country.id === id ? { ...country, ...updates } : country
    ))
    addHistoryEntry('edit', { id, updates })
  }, [countries, addHistoryEntry])

  const deleteCountry = useCallback((id: string) => {
    const countryToDelete = countries.find(c => c.id === id)
    
    // Save current state for undo
    setUndoStack(prev => [...prev, { countries: [...countries] }])
    setRedoStack([]) // Clear redo stack on new action
    
    setCountries(prev => prev.filter(country => country.id !== id))
    addHistoryEntry('delete', { country: countryToDelete })
  }, [countries, addHistoryEntry])

  const toggleVisited = useCallback((id: string) => {
    // Save current state for undo
    setUndoStack(prev => [...prev, { countries: [...countries] }])
    setRedoStack([]) // Clear redo stack on new action
    
    setCountries(prev => prev.map(country => 
      country.id === id ? { ...country, visited: !country.visited } : country
    ))
    addHistoryEntry('toggle_visited', { id })
  }, [countries, addHistoryEntry])

  const undo = useCallback(() => {
    if (undoStack.length > 0) {
      const previousState = undoStack[undoStack.length - 1]
      const currentState = { countries: [...countries] }
      
      setRedoStack(prev => [...prev, currentState])
      setUndoStack(prev => prev.slice(0, -1))
      setCountries(previousState.countries)
      addHistoryEntry('undo', { previousState })
    }
  }, [undoStack, countries, addHistoryEntry])

  const redo = useCallback(() => {
    if (redoStack.length > 0) {
      const nextState = redoStack[redoStack.length - 1]
      const currentState = { countries: [...countries] }
      
      setUndoStack(prev => [...prev, currentState])
      setRedoStack(prev => prev.slice(0, -1))
      setCountries(nextState.countries)
      addHistoryEntry('redo', { nextState })
    }
  }, [redoStack, countries, addHistoryEntry])

  const clearHistory = useCallback(() => {
    setHistory([])
    setUndoStack([])
    setRedoStack([])
  }, [])

  return (
    <CountryContext.Provider value={{
      countries,
      addCountry,
      editCountry,
      deleteCountry,
      toggleVisited,
      history,
      undo,
      redo,
      clearHistory,
      addHistoryEntry,
      canUndo: undoStack.length > 0,
      canRedo: redoStack.length > 0
    }}>
      {children}
    </CountryContext.Provider>
  )
}

export function useCountries() {
  const context = useContext(CountryContext)
  if (context === undefined) {
    throw new Error('useCountries must be used within a CountryProvider')
  }
  return context
} 