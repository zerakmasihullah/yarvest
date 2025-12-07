"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Edit, 
  Save, 
  X,
  Upload,
  Truck,
  CreditCard,
  Shield,
  Key,
  Calendar,
  Award
} from "lucide-react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"

export default function CourierProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [profile, setProfile] = useState({
    name: "Mike Driver",
    email: "mike.driver@example.com",
    phone: "(555) 987-6543",
    address: "789 Delivery St, San Francisco, CA 94102",
    vehicleType: "Car",
    vehicleModel: "Toyota Camry 2020",
    licensePlate: "ABC-1234",
    joinDate: "2023-06-15",
  })

  const stats = {
    totalDeliveries: 156,
    totalEarnings: 1250.75,
    rating: 4.8,
    reviews: 89,
    completionRate: 98.2,
  }

  const handleSave = () => {
    console.log("Saving profile:", profile)
    setIsEditing(false)
  }

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords don't match!")
      return
    }
    console.log("Changing password:", passwordData)
    setShowPasswordModal(false)
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Profile Settings</h1>
          <p className="text-gray-600">Manage your courier profile and account information</p>
        </div>
        {!isEditing ? (
          <Button 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white gap-2 shadow-lg"
            onClick={() => setIsEditing(true)}
          >
            <Edit className="w-4 h-4" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsEditing(false)} className="gap-2">
              <X className="w-4 h-4" />
              Cancel
            </Button>
            <Button 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white gap-2 shadow-lg"
              onClick={handleSave}
            >
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="border-2 hover:shadow-lg transition-all">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-500 mb-1">Total Deliveries</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalDeliveries}</p>
          </CardContent>
        </Card>
        <Card className="border-2 hover:shadow-lg transition-all">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-500 mb-1">Total Earnings</p>
            <p className="text-2xl font-bold text-emerald-600">${stats.totalEarnings.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card className="border-2 hover:shadow-lg transition-all">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-500 mb-1">Rating</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.rating} ⭐</p>
            <p className="text-xs text-gray-500">{stats.reviews} reviews</p>
          </CardContent>
        </Card>
        <Card className="border-2 hover:shadow-lg transition-all">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-500 mb-1">Completion Rate</p>
            <p className="text-2xl font-bold text-blue-600">{stats.completionRate}%</p>
          </CardContent>
        </Card>
        <Card className="border-2 hover:shadow-lg transition-all">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-500 mb-1">Member Since</p>
            <p className="text-2xl font-bold text-purple-600">{new Date(profile.joinDate).getFullYear()}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card className="border-2 shadow-lg">
            <CardHeader className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="name" className="flex items-center gap-2 mb-2 text-base font-semibold">
                    <User className="w-4 h-4" />
                    Full Name *
                  </Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="h-12 border-2"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium text-lg">{profile.name}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email" className="flex items-center gap-2 mb-2 text-base font-semibold">
                    <Mail className="w-4 h-4" />
                    Email *
                  </Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="h-12 border-2"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium text-lg">{profile.email}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone" className="flex items-center gap-2 mb-2 text-base font-semibold">
                    <Phone className="w-4 h-4" />
                    Phone *
                  </Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="h-12 border-2"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium text-lg">{profile.phone}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="address" className="flex items-center gap-2 mb-2 text-base font-semibold">
                    <MapPin className="w-4 h-4" />
                    Address *
                  </Label>
                  {isEditing ? (
                    <Input
                      id="address"
                      value={profile.address}
                      onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                      className="h-12 border-2"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium text-lg">{profile.address}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Vehicle Information */}
          <Card className="border-2 shadow-lg">
            <CardHeader className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
              <CardTitle className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-blue-600" />
                Vehicle Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="vehicleType" className="text-base font-semibold">Vehicle Type *</Label>
                  {isEditing ? (
                    <select
                      id="vehicleType"
                      value={profile.vehicleType}
                      onChange={(e) => setProfile({ ...profile, vehicleType: e.target.value })}
                      className="mt-2 w-full h-12 px-4 rounded-lg border-2 border-gray-200 bg-white text-sm font-medium focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                    >
                      <option>Car</option>
                      <option>Van</option>
                      <option>Truck</option>
                      <option>Motorcycle</option>
                      <option>Bicycle</option>
                    </select>
                  ) : (
                    <p className="text-gray-900 font-medium text-lg mt-2">{profile.vehicleType}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="vehicleModel" className="text-base font-semibold">Vehicle Model *</Label>
                  {isEditing ? (
                    <Input
                      id="vehicleModel"
                      value={profile.vehicleModel}
                      onChange={(e) => setProfile({ ...profile, vehicleModel: e.target.value })}
                      className="mt-2 h-12 border-2"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium text-lg mt-2">{profile.vehicleModel}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="licensePlate" className="text-base font-semibold">License Plate *</Label>
                  {isEditing ? (
                    <Input
                      id="licensePlate"
                      value={profile.licensePlate}
                      onChange={(e) => setProfile({ ...profile, licensePlate: e.target.value.toUpperCase() })}
                      className="mt-2 h-12 border-2 font-mono"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium text-lg mt-2 font-mono">{profile.licensePlate}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Profile Image */}
          <Card className="border-2 shadow-lg">
            <CardHeader className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
              <CardTitle>Profile Photo</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col items-center gap-4">
                <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-5xl font-bold shadow-lg">
                  {profile.name.charAt(0)}
                </div>
                {isEditing && (
                  <Button variant="outline" className="gap-2 w-full">
                    <Upload className="w-4 h-4" />
                    Upload Photo
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Security & Settings */}
          <Card className="border-2 shadow-lg">
            <CardHeader className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                Security & Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start gap-2 border-2 h-12"
                onClick={() => setShowPasswordModal(true)}
              >
                <Key className="w-4 h-4" />
                Change Password
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2 border-2 h-12" asChild>
                <a href="/courier/documents">
                  <Award className="w-4 h-4" />
                  Documents
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2 border-2 h-12" asChild>
                <a href="/courier/settings">
                  <Shield className="w-4 h-4" />
                  Account Settings
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Password Change Modal */}
      <Dialog open={showPasswordModal} onOpenChange={setShowPasswordModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <Key className="w-6 h-6 text-blue-600" />
              Change Password
            </DialogTitle>
            <DialogDescription>
              Update your account password for better security
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="currentPassword" className="text-base font-semibold">Current Password *</Label>
              <Input
                id="currentPassword"
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                className="mt-2 h-12 border-2"
                placeholder="Enter current password"
              />
            </div>
            <div>
              <Label htmlFor="newPassword" className="text-base font-semibold">New Password *</Label>
              <Input
                id="newPassword"
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                className="mt-2 h-12 border-2"
                placeholder="Enter new password"
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword" className="text-base font-semibold">Confirm New Password *</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                className="mt-2 h-12 border-2"
                placeholder="Confirm new password"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPasswordModal(false)} className="h-12">
              Cancel
            </Button>
            <Button 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white h-12"
              onClick={handlePasswordChange}
            >
              Update Password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

