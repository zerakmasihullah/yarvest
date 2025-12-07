"use client"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Mail, Phone, MapPin, Edit, Save, ShoppingBag, Heart, Calendar, Users, Gift, ArrowRight } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function ProfilePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    address: "123 Main St, San Francisco, CA 94102",
    bio: "Fresh food enthusiast and supporter of local farmers.",
  })

  const stats = [
    { icon: ShoppingBag, label: "Orders", value: "24", color: "text-primary" },
    { icon: Heart, label: "Favorites", value: "12", color: "text-red-500" },
    { icon: Calendar, label: "Member Since", value: "2023", color: "text-green-500" },
    { icon: Users, label: "Referrals", value: "8", color: "text-purple-500" },
  ]

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <main className="flex-1 overflow-auto">
        <div className="px-6 py-12 bg-gradient-to-b from-white to-secondary/10">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-10">
              <h1 className="text-5xl font-bold text-foreground mb-3">My Profile</h1>
              <p className="text-lg text-muted-foreground">Manage your account settings and preferences</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {stats.map((stat, index) => (
                <Card key={index} className="p-6 rounded-3xl border border-border bg-white hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl bg-secondary ${stat.color}`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Invite Friends Card */}
            <Card className="mb-6 p-6 rounded-3xl border-2 border-[#0A5D31]/20 bg-[#0A5D31]/5 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#0A5D31] rounded-2xl flex items-center justify-center shadow-lg">
                    <Gift className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-1">Invite Friends & Earn Rewards</h3>
                    <p className="text-sm text-muted-foreground">Get $10 credit for each friend you refer</p>
                  </div>
                </div>
                <Link href="/invite">
                  <Button className="bg-[#0A5D31] hover:bg-[#0d7a3f] text-white rounded-xl font-bold gap-2">
                    Invite Now
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Profile Card */}
            <Card className="p-8 rounded-3xl border border-border bg-white mb-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-foreground">Personal Information</h2>
                <Button
                  variant={isEditing ? "default" : "outline"}
                  onClick={() => setIsEditing(!isEditing)}
                  className="gap-2 rounded-xl"
                >
                  {isEditing ? (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  ) : (
                    <>
                      <Edit className="w-4 h-4" />
                      Edit Profile
                    </>
                  )}
                </Button>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-6 pb-6 border-b border-border">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-lg">
                    <User className="w-12 h-12 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-1">{profile.name}</h3>
                    <p className="text-muted-foreground">{profile.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Full Name
                    </Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        className="rounded-xl border-2 border-border focus:border-primary"
                      />
                    ) : (
                      <p className="text-foreground font-medium">{profile.name}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="rounded-xl border-2 border-border focus:border-primary"
                      />
                    ) : (
                      <p className="text-foreground font-medium">{profile.email}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Phone Number
                    </Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        className="rounded-xl border-2 border-border focus:border-primary"
                      />
                    ) : (
                      <p className="text-foreground font-medium">{profile.phone}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="address" className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Address
                    </Label>
                    {isEditing ? (
                      <Input
                        id="address"
                        value={profile.address}
                        onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                        className="rounded-xl border-2 border-border focus:border-primary"
                      />
                    ) : (
                      <p className="text-foreground font-medium">{profile.address}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio" className="text-sm font-semibold text-foreground mb-2">
                    Bio
                  </Label>
                  {isEditing ? (
                    <textarea
                      id="bio"
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      className="w-full p-3 rounded-xl border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 min-h-[100px]"
                    />
                  ) : (
                    <p className="text-foreground">{profile.bio}</p>
                  )}
                </div>
              </div>
            </Card>

            {/* Preferences Card */}
            <Card className="p-8 rounded-3xl border border-border bg-white">
              <h2 className="text-2xl font-bold text-foreground mb-6">Preferences</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-secondary rounded-xl">
                  <div>
                    <p className="font-semibold text-foreground">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive updates about your orders</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-border" />
                </div>
                <div className="flex items-center justify-between p-4 bg-secondary rounded-xl">
                  <div>
                    <p className="font-semibold text-foreground">SMS Notifications</p>
                    <p className="text-sm text-muted-foreground">Get text alerts for deliveries</p>
                  </div>
                  <input type="checkbox" className="w-5 h-5 rounded border-border" />
                </div>
                <div className="flex items-center justify-between p-4 bg-secondary rounded-xl">
                  <div>
                    <p className="font-semibold text-foreground">Newsletter</p>
                    <p className="text-sm text-muted-foreground">Weekly updates about new products</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-border" />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

