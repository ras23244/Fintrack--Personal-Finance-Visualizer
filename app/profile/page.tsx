"use client"

import { useState } from "react"
import { Camera, Mail, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    bio: "I'm a software developer interested in personal finance and investing.",
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
    security: {
      twoFactor: false,
      sessionTimeout: true,
    },
  })

  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState(profile)

  const handleEdit = () => {
    setIsEditing(true)
    setEditedProfile(profile)
  }

  const handleSave = () => {
    setProfile(editedProfile)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const updateNotification = (type: "email" | "push" | "sms", value: boolean) => {
    setProfile({
      ...profile,
      notifications: {
        ...profile.notifications,
        [type]: value,
      },
    })
  }

  const updateSecurity = (type: "twoFactor" | "sessionTimeout", value: boolean) => {
    setProfile({
      ...profile,
      security: {
        ...profile.security,
        [type]: value,
      },
    })
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
            <p className="text-muted-foreground">Manage your personal information and preferences.</p>
          </div>
          {!isEditing ? (
            <Button onClick={handleEdit}>Edit Profile</Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          )}
        </div>

        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:w-auto">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details and profile picture.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="/placeholder-user.jpg" alt="Profile picture" />
                      <AvatarFallback>
                        {profile.firstName.charAt(0)}
                        {profile.lastName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary text-primary-foreground"
                    >
                      <Camera className="h-4 w-4" />
                      <span className="sr-only">Upload profile picture</span>
                    </Button>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="grid gap-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={isEditing ? editedProfile.firstName : profile.firstName}
                          onChange={(e) => setEditedProfile({ ...editedProfile, firstName: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={isEditing ? editedProfile.lastName : profile.lastName}
                          onChange={(e) => setEditedProfile({ ...editedProfile, lastName: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          value={isEditing ? editedProfile.email : profile.email}
                          onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Phone</Label>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          type="tel"
                          value={isEditing ? editedProfile.phone : profile.phone}
                          onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    rows={4}
                    value={isEditing ? editedProfile.bio : profile.bio}
                    onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                    disabled={!isEditing}
                    placeholder="Tell us a little about yourself"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <p className="text-sm text-muted-foreground">Last updated: April 28, 2023</p>
                {isEditing && (
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={handleCancel}>
                      Cancel
                    </Button>
                    <Button onClick={handleSave}>Save Changes</Button>
                  </div>
                )}
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Manage how you receive notifications from FinTrack.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">
                          Receive transaction alerts and updates via email
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={profile.notifications.email}
                      onCheckedChange={(checked) => updateNotification("email", checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-muted-foreground"
                      >
                        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      <div>
                        <p className="font-medium">Push Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive alerts on your device</p>
                      </div>
                    </div>
                    <Switch
                      checked={profile.notifications.push}
                      onCheckedChange={(checked) => updateNotification("push", checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">SMS Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive text messages for important alerts</p>
                      </div>
                    </div>
                    <Switch
                      checked={profile.notifications.sms}
                      onCheckedChange={(checked) => updateNotification("sms", checked)}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">
                  You can change these settings at any time from your profile.
                </p>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security and privacy preferences.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Switch
                      checked={profile.security.twoFactor}
                      onCheckedChange={(checked) => updateSecurity("twoFactor", checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Session Timeout</p>
                      <p className="text-sm text-muted-foreground">
                        Automatically log out after 30 minutes of inactivity
                      </p>
                    </div>
                    <Switch
                      checked={profile.security.sessionTimeout}
                      onCheckedChange={(checked) => updateSecurity("sessionTimeout", checked)}
                    />
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <p className="font-medium">Change Password</p>
                    <p className="text-sm text-muted-foreground">Update your password regularly for better security</p>
                    <Button variant="outline">Change Password</Button>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <p className="font-medium">Connected Devices</p>
                    <p className="text-sm text-muted-foreground">Manage devices that have access to your account</p>
                    <Button variant="outline">Manage Devices</Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">
                  Last login: April 28, 2023 at 10:45 AM from New York, USA
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
