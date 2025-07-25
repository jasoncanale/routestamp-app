"use client"

import { useState, useRef, useEffect } from "react"
import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SimpleThemeToggle } from "@/components/simple-theme-toggle"
import { ThemeDebug } from "@/components/theme-debug"
import { useCountries } from "@/lib/country-context"
import { useCurrency } from "@/lib/currency-context"
import { 
  Palette, 
  Database, 
  Download, 
  Upload, 
  RotateCcw,
  Bell,
  Shield,
  Globe,
  Settings as SettingsIcon,
  DollarSign
} from "lucide-react"

export default function SettingsPage() {
  const { clearHistory, history, countries, addCountry, editCountry, deleteCountry } = useCountries()
  const { currency, setCurrency, getSystemCurrency, currencies } = useCurrency()
  const [importFile, setImportFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // Notification settings state
  const [notifications, setNotifications] = useState({
    travelReminders: false,
    achievements: true,
    updates: true
  })

  const handleCurrencyChange = (currencyCode: string) => {
    const selectedCurrency = currencies.find(c => c.code === currencyCode)
    if (selectedCurrency) {
      setCurrency(selectedCurrency)
    }
  }

  const handleResetToSystem = () => {
    const systemCurrency = getSystemCurrency()
    setCurrency(systemCurrency)
  }

  const handleExportData = () => {
    const exportData = {
      countries,
      currency,
      history,
      exportDate: new Date().toISOString(),
      version: "1.0.0"
    }
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `routestamp-data-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleImportData = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string)
        
        // Validate the imported data structure
        if (data.countries && Array.isArray(data.countries)) {
          // Confirm with user before replacing data
          if (confirm('This will replace all your current data. Are you sure you want to continue?')) {
            // Clear existing data and import new data
            // Note: In a real app, you'd want to implement proper data replacement
            // For now, we'll just show what would be imported
            console.log('Importing data:', data)
            alert(`Would import ${data.countries.length} countries, currency settings, and history. This functionality is ready to be connected to the data context.`)
          }
        } else {
          alert('Invalid data format. Please select a valid RouteStamp export file.')
        }
      } catch (error) {
        alert('Error reading file. Please make sure it\'s a valid JSON file.')
      }
    }
    reader.readAsText(file)
    
    // Reset the file input
    event.target.value = ''
  }

  // Load notification settings from localStorage on mount
  useEffect(() => {
    try {
      const savedNotifications = localStorage.getItem('routestamp-notifications')
      if (savedNotifications) {
        setNotifications(JSON.parse(savedNotifications))
      }
    } catch (error) {
      console.error('Error loading notification settings:', error)
    }
  }, [])

  // Save notification settings to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('routestamp-notifications', JSON.stringify(notifications))
    } catch (error) {
      console.error('Error saving notification settings:', error)
    }
  }, [notifications])

  const [showNotificationDialog, setShowNotificationDialog] = useState(false)
  const [pendingNotificationKey, setPendingNotificationKey] = useState<keyof typeof notifications | null>(null)

  const handleNotificationChange = async (key: keyof typeof notifications, value: boolean) => {
    if (value && !hasNotificationPermission()) {
      // Show permission dialog for first-time enable
      setPendingNotificationKey(key)
      setShowNotificationDialog(true)
      return
    }

    setNotifications(prev => ({
      ...prev,
      [key]: value
    }))
    
    // Show a brief feedback message
    const settingName = key === 'travelReminders' ? 'Travel Reminders' : 
                       key === 'achievements' ? 'Achievement Notifications' : 'App Updates'
    console.log(`${settingName} ${value ? 'enabled' : 'disabled'}`)
  }

  const hasNotificationPermission = () => {
    if (typeof window === 'undefined') return false
    return 'Notification' in window && Notification.permission === 'granted'
  }

  const requestNotificationPermission = async () => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      alert('This browser does not support notifications')
      return false
    }

    try {
      const permission = await Notification.requestPermission()
      return permission === 'granted'
    } catch (error) {
      console.error('Error requesting notification permission:', error)
      return false
    }
  }

  const handlePermissionGranted = () => {
    if (pendingNotificationKey) {
      setNotifications(prev => ({
        ...prev,
        [pendingNotificationKey]: true
      }))
      
      // Show a test notification
      if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
        new Notification('RouteStamp', {
          body: 'Notifications are now enabled! You\'ll receive updates about your travels.',
          icon: '/favicon.ico',
          tag: 'notification-enabled'
        })
      }
    }
    
    setShowNotificationDialog(false)
    setPendingNotificationKey(null)
  }

  const handlePermissionDenied = () => {
    setShowNotificationDialog(false)
    setPendingNotificationKey(null)
  }

  const showNotification = (title: string, body: string, tag?: string) => {
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      new Notification(title, {
        body,
        icon: '/favicon.ico',
        tag,
        requireInteraction: false
      })
    }
  }

  const getNotificationStatus = () => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      return 'unsupported'
    }
    return Notification.permission
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Customize your RouteStamp experience and manage your data
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Appearance Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="h-5 w-5" />
                <span>Appearance</span>
              </CardTitle>
              <CardDescription>
                Customize the look and feel of RouteStamp
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <p className="text-sm text-muted-foreground">
                  Choose your preferred color scheme
                </p>
                <SimpleThemeToggle />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="animations">Animations</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable smooth transitions and animations
                  </p>
                </div>
                <Switch id="animations" defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Currency Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5" />
                <span>Currency</span>
              </CardTitle>
              <CardDescription>
                Set your preferred currency for displaying prices and budgets
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <div className="flex items-center space-x-2">
                  <Select value={currency.code} onValueChange={handleCurrencyChange}>
                    <SelectTrigger className="flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((curr) => (
                        <SelectItem key={curr.code} value={curr.code}>
                          <div className="flex items-center space-x-2">
                            <span>{curr.symbol}</span>
                            <span>{curr.code}</span>
                            <span className="text-muted-foreground">({curr.name})</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm" onClick={handleResetToSystem}>
                    Reset to System
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Currently using {currency.symbol} {currency.code} ({currency.name})
                </p>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label>Currency Preview</Label>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="p-2 border rounded">
                    <span className="font-medium">Sample Budget:</span>
                    <div className="text-lg font-bold text-primary">
                      {currency.symbol}2,500
                    </div>
                  </div>
                  <div className="p-2 border rounded">
                    <span className="font-medium">Sample Price:</span>
                    <div className="text-lg font-bold text-primary">
                      {currency.symbol}150
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5" />
                <span>Data Management</span>
              </CardTitle>
              <CardDescription>
                Manage your travel data and history
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>History Entries</Label>
                  <p className="text-sm text-muted-foreground">
                    {history.length} actions recorded
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearHistory}
                  disabled={history.length === 0}
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Clear History
                </Button>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Export Data</Label>
                  <p className="text-sm text-muted-foreground">
                    Download your travel data as JSON
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={handleExportData}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Import Data</Label>
                  <p className="text-sm text-muted-foreground">
                    Import travel data from a file
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={handleImportData}>
                  <Upload className="h-4 w-4 mr-2" />
                  Import
                </Button>
              </div>
              
              {/* Hidden file input for import */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileChange}
                className="hidden"
              />
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notifications</span>
              </CardTitle>
              <CardDescription>
                Configure notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="travel-reminders">Travel Reminders</Label>
                  <p className="text-sm text-muted-foreground">
                    Get reminded about upcoming trips
                  </p>
                </div>
                <Switch 
                  id="travel-reminders" 
                  checked={notifications.travelReminders}
                  onCheckedChange={(checked) => handleNotificationChange('travelReminders', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="achievements">Achievement Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Celebrate when you reach milestones
                  </p>
                </div>
                <Switch 
                  id="achievements" 
                  checked={notifications.achievements}
                  onCheckedChange={(checked) => handleNotificationChange('achievements', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="updates">App Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Notify about new features and updates
                  </p>
                </div>
                <Switch 
                  id="updates" 
                  checked={notifications.updates}
                  onCheckedChange={(checked) => handleNotificationChange('updates', checked)}
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notification Status</Label>
                    <p className="text-sm text-muted-foreground">
                      {getNotificationStatus() === 'granted' ? 'Notifications enabled' : 
                       getNotificationStatus() === 'denied' ? 'Notifications blocked' :
                       getNotificationStatus() === 'default' ? 'Permission not requested' : 'Not supported'}
                    </p>
                  </div>
                  {getNotificationStatus() === 'granted' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => showNotification('RouteStamp', 'This is a test notification! 🎉')}
                    >
                      Test Notification
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Privacy & Security</span>
              </CardTitle>
              <CardDescription>
                Manage your privacy and security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="data-sharing">Data Sharing</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow anonymous usage statistics
                  </p>
                </div>
                <Switch id="data-sharing" />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="location-services">Location Services</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable location-based features
                  </p>
                </div>
                <Switch id="location-services" />
              </div>
              
              <Separator />
              
              <Button variant="outline" className="w-full">
                <Shield className="h-4 w-4 mr-2" />
                Privacy Policy
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* App Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <SettingsIcon className="h-5 w-5" />
              <span>App Information</span>
            </CardTitle>
            <CardDescription>
              Details about RouteStamp and your current setup
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Version</p>
                <p className="text-sm text-muted-foreground">1.0.0</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Build</p>
                <p className="text-sm text-muted-foreground">2024.1.0</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Framework</p>
                <p className="text-sm text-muted-foreground">Next.js 15</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Environment</p>
                <p className="text-sm text-muted-foreground">Development</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Notification Permission Dialog */}
      {showNotificationDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background border rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-2">Enable Notifications</h3>
            <p className="text-muted-foreground mb-4">
              RouteStamp would like to send you notifications about your travels, achievements, and app updates. 
              This will work on desktop, mobile, and web browsers.
            </p>
            <div className="flex gap-3">
              <Button 
                onClick={async () => {
                  const granted = await requestNotificationPermission()
                  if (granted) {
                    handlePermissionGranted()
                  } else {
                    handlePermissionDenied()
                  }
                }}
                className="flex-1"
              >
                Enable Notifications
              </Button>
              <Button 
                variant="outline" 
                onClick={handlePermissionDenied}
                className="flex-1"
              >
                Not Now
              </Button>
            </div>
          </div>
        </div>
      )}
      
      <ThemeDebug />
    </AppLayout>
  )
} 