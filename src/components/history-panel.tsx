"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FlagIcon } from "@/components/flag-icon"
import { useCountries } from "@/lib/country-context"
import { HistoryEntry } from "@/lib/types"
import { 
  Undo2, 
  Redo2, 
  Trash2, 
  Plus, 
  Edit, 
  Eye, 
  EyeOff,
  Clock,
  RotateCcw
} from "lucide-react"

export function HistoryPanel() {
  const { history, undo, redo, clearHistory, canUndo, canRedo } = useCountries()
  const [showDetails, setShowDetails] = useState(false)

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'add':
        return <Plus className="h-4 w-4" />
      case 'edit':
        return <Edit className="h-4 w-4" />
      case 'delete':
        return <Trash2 className="h-4 w-4" />
      case 'toggle_visited':
        return <Eye className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getActionColor = (action: string) => {
    switch (action) {
      case 'add':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'edit':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'delete':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'toggle_visited':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    return timestamp.toLocaleDateString()
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Action History</CardTitle>
            <CardDescription>
              Recent changes to your travel list
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={undo}
              disabled={!canUndo}
            >
              <Undo2 className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={redo}
              disabled={!canRedo}
            >
              <Redo2 className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={clearHistory}
              disabled={history.length === 0}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {history.entries.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Clock className="h-8 w-8 mx-auto mb-2" />
            <p>No actions yet</p>
            <p className="text-sm">Start adding, editing, or deleting countries</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {history.map((entry) => (
              <div
                key={entry.id}
                className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <div className={`p-1 rounded ${getActionColor(entry.action)}`}>
                    {getActionIcon(entry.action)}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm truncate">
                      {entry.action}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {formatTimestamp(new Date(entry.timestamp))}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {JSON.stringify(entry.data)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
} 