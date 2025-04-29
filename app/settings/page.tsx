"use client"

import React from "react"

import { useState } from "react"
import { Check, Download, Globe, Moon, Sun, Upload } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useToast } from "@/components/ui/use-toast"

export default function SettingsPage() {
  const { toast } = useToast()
  const [settings, setSettings] = useState({
    appearance: {
      theme: "dark",
      reducedMotion: false,
      fontSize: "medium",
    },
    preferences: {
      currency: "USD",
      language: "en",
      dateFormat: "MM/DD/YYYY",
    },
    data: {
      autoBackup: true,
      dataSharing: false,
      analytics: true,
    },
  })

  const { setTheme } = useTheme()

  // Apply settings when component mounts
  React.useEffect(() => {
    // Apply theme
    setTheme(settings.appearance.theme)

    // Apply font size
    document.documentElement.style.fontSize =
      settings.appearance.fontSize === "small" ? "14px" : settings.appearance.fontSize === "large" ? "18px" : "16px"
  }, [settings.appearance, setTheme])

  const updateAppearance = (key: keyof typeof settings.appearance, value: any) => {
    setSettings({
      ...settings,
      appearance: {
        ...settings.appearance,
        [key]: value,
      },
    })

    // Apply theme changes
    if (key === "theme") {
      document.documentElement.classList.remove("light", "dark")
      if (value !== "system") {
        document.documentElement.classList.add(value)
      }
    }
  }

  const updatePreferences = (key: keyof typeof settings.preferences, value: string) => {
    setSettings({
      ...settings,
      preferences: {
        ...settings.preferences,
        [key]: value,
      },
    })

    // Apply currency format changes
    if (key === "currency") {
      // This would normally update currency formatting throughout the app
      console.log(`Currency changed to ${value}`)
    }

    // Apply language changes
    if (key === "language") {
      // This would normally update the app's language
      console.log(`Language changed to ${value}`)
    }

    // Apply date format changes
    if (key === "dateFormat") {
      // This would normally update date formatting throughout the app
      console.log(`Date format changed to ${value}`)
    }
  }

  const updateData = (key: keyof typeof settings.data, value: boolean) => {
    setSettings({
      ...settings,
      data: {
        ...settings.data,
        [key]: value,
      },
    })
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Customize your FinTrack experience.</p>
        </div>

        <Tabs defaultValue="appearance" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:w-auto">
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="data">Data & Privacy</TabsTrigger>
          </TabsList>

          <TabsContent value="appearance" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize how FinTrack looks and feels.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <RadioGroup
                    defaultValue={settings.appearance.theme}
                    onValueChange={(value) => {
                      updateAppearance("theme", value)
                      // Use next-themes to update the theme
                      const setTheme = document.querySelector("html")?.setAttribute("data-theme", value)
                    }}
                    className="grid grid-cols-3 gap-4"
                  >
                    <Label
                      htmlFor="theme-light"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                    >
                      <RadioGroupItem value="light" id="theme-light" className="sr-only" />
                      <Sun className="h-6 w-6" />
                      <span className="mt-2">Light</span>
                    </Label>
                    <Label
                      htmlFor="theme-dark"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                    >
                      <RadioGroupItem value="dark" id="theme-dark" className="sr-only" />
                      <Moon className="h-6 w-6" />
                      <span className="mt-2">Dark</span>
                    </Label>
                    <Label
                      htmlFor="theme-system"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                    >
                      <RadioGroupItem value="system" id="theme-system" className="sr-only" />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6"
                      >
                        <rect width="20" height="14" x="2" y="3" rx="2" />
                        <line x1="8" x2="16" y1="21" y2="21" />
                        <line x1="12" x2="12" y1="17" y2="21" />
                      </svg>
                      <span className="mt-2">System</span>
                    </Label>
                  </RadioGroup>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Reduced Motion</Label>
                    <p className="text-sm text-muted-foreground">Reduce the amount of animations in the interface</p>
                  </div>
                  <Switch
                    checked={settings.appearance.reducedMotion}
                    onCheckedChange={(checked) => updateAppearance("reducedMotion", checked)}
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="fontSize">Font Size</Label>
                  <Select
                    value={settings.appearance.fontSize}
                    onValueChange={(value) => updateAppearance("fontSize", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select font size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Reset to Defaults
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>Customize your regional and display preferences.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={settings.preferences.currency}
                    onValueChange={(value) => updatePreferences("currency", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">US Dollar ($)</SelectItem>
                      <SelectItem value="EUR">Euro (€)</SelectItem>
                      <SelectItem value="GBP">British Pound (£)</SelectItem>
                      <SelectItem value="JPY">Japanese Yen (¥)</SelectItem>
                      <SelectItem value="CAD">Canadian Dollar (C$)</SelectItem>
                      <SelectItem value="AUD">Australian Dollar (A$)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select
                    value={settings.preferences.language}
                    onValueChange={(value) => updatePreferences("language", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="zh">Chinese</SelectItem>
                      <SelectItem value="ja">Japanese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="dateFormat">Date Format</Label>
                  <Select
                    value={settings.preferences.dateFormat}
                    onValueChange={(value) => updatePreferences("dateFormat", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select date format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Changes apply to your account across all devices
                    </span>
                  </div>
                  <Button
                    onClick={() => {
                      // Save preferences to localStorage
                      localStorage.setItem("fintrack-preferences", JSON.stringify(settings.preferences))
                      toast({
                        title: "Preferences saved",
                        description: "Your preferences have been saved successfully.",
                      })
                    }}
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="data" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Data & Privacy</CardTitle>
                <CardDescription>Manage your data and privacy settings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Automatic Backups</Label>
                    <p className="text-sm text-muted-foreground">Automatically backup your data to the cloud</p>
                  </div>
                  <Switch
                    checked={settings.data.autoBackup}
                    onCheckedChange={(checked) => updateData("autoBackup", checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Data Sharing</Label>
                    <p className="text-sm text-muted-foreground">Share anonymous usage data to help improve FinTrack</p>
                  </div>
                  <Switch
                    checked={settings.data.dataSharing}
                    onCheckedChange={(checked) => updateData("dataSharing", checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Analytics</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow FinTrack to collect analytics to improve your experience
                    </p>
                  </div>
                  <Switch
                    checked={settings.data.analytics}
                    onCheckedChange={(checked) => updateData("analytics", checked)}
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Data Management</h3>
                    <p className="text-sm text-muted-foreground">Export or import your financial data</p>
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <Button variant="outline" className="flex-1">
                      <Download className="mr-2 h-4 w-4" />
                      Export Data
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Upload className="mr-2 h-4 w-4" />
                      Import Data
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="font-medium text-red-500">Danger Zone</h3>
                  <p className="text-sm text-muted-foreground">Permanently delete your account and all your data</p>
                  <Button variant="destructive">Delete Account</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
