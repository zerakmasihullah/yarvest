"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { 
  Bell, 
  CreditCard, 
  Shield, 
  Save,
  MapPin,
  Clock,
  Navigation,
  Truck
} from "lucide-react"
import { useState } from "react"

export default function CourierSettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    push: true,
    newDeliveries: true,
    earnings: true,
    reviews: true,
  })

  const [deliverySettings, setDeliverySettings] = useState({
    maxDistance: "20",
    maxDeliveriesPerDay: "15",
    autoAccept: false,
    preferredAreas: ["Downtown", "Northside"],
  })

  const [payment, setPayment] = useState({
    accountName: "Mike Driver",
    accountNumber: "**** **** **** 5678",
    bankName: "Wells Fargo",
    routingNumber: "****5678",
  })

  const handleSaveNotifications = () => {
    console.log("Saving notifications:", notifications)
  }

  const handleSaveDelivery = () => {
    console.log("Saving delivery settings:", deliverySettings)
  }

  const handleSavePayment = () => {
    console.log("Saving payment:", payment)
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your courier account settings and preferences</p>
      </div>

      {/* Delivery Settings */}
      <Card className="border-2 shadow-lg">
        <CardHeader className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <CardTitle className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-blue-600" />
            Delivery Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label htmlFor="maxDistance" className="text-base font-semibold">Max Delivery Distance (miles)</Label>
              <Input
                id="maxDistance"
                type="number"
                value={deliverySettings.maxDistance}
                onChange={(e) => setDeliverySettings({ ...deliverySettings, maxDistance: e.target.value })}
                className="mt-2 h-12 border-2"
                placeholder="20"
              />
            </div>
            <div>
              <Label htmlFor="maxDeliveriesPerDay" className="text-base font-semibold">Max Deliveries Per Day</Label>
              <Input
                id="maxDeliveriesPerDay"
                type="number"
                value={deliverySettings.maxDeliveriesPerDay}
                onChange={(e) => setDeliverySettings({ ...deliverySettings, maxDeliveriesPerDay: e.target.value })}
                className="mt-2 h-12 border-2"
                placeholder="15"
              />
            </div>
            <div className="md:col-span-2 flex items-end">
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 w-full">
                <input
                  type="checkbox"
                  checked={deliverySettings.autoAccept}
                  onChange={(e) => setDeliverySettings({ ...deliverySettings, autoAccept: e.target.checked })}
                  className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                />
                <div>
                  <span className="text-base font-semibold text-gray-900">Auto-Accept Deliveries</span>
                  <p className="text-xs text-gray-500">Automatically accept deliveries that match your preferences</p>
                </div>
              </label>
            </div>
            <div className="md:col-span-2">
              <Label className="text-base font-semibold mb-2 block">Preferred Delivery Areas</Label>
              <div className="flex flex-wrap gap-2">
                {deliverySettings.preferredAreas.map((area, index) => (
                  <Badge key={index} className="bg-blue-100 text-blue-800 px-3 py-1">
                    {area}
                    <button className="ml-2 text-blue-600 hover:text-blue-800">×</button>
                  </Badge>
                ))}
                <Button variant="outline" size="sm">+ Add Area</Button>
              </div>
            </div>
          </div>
          <Button 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white gap-2"
            onClick={handleSaveDelivery}
          >
            <Save className="w-4 h-4" />
            Save Delivery Settings
          </Button>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="border-2 shadow-lg">
        <CardHeader className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-blue-600" />
            Notification Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-3">Notification Channels</h4>
              <div className="space-y-3">
                <label className="flex items-center justify-between cursor-pointer p-3 bg-white rounded-lg hover:bg-gray-50">
                  <div>
                    <span className="font-medium text-gray-900">Email Notifications</span>
                    <p className="text-sm text-gray-500">Receive notifications via email</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.email}
                    onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                  />
                </label>

                <label className="flex items-center justify-between cursor-pointer p-3 bg-white rounded-lg hover:bg-gray-50">
                  <div>
                    <span className="font-medium text-gray-900">SMS Notifications</span>
                    <p className="text-sm text-gray-500">Receive notifications via SMS</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.sms}
                    onChange={(e) => setNotifications({ ...notifications, sms: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                  />
                </label>

                <label className="flex items-center justify-between cursor-pointer p-3 bg-white rounded-lg hover:bg-gray-50">
                  <div>
                    <span className="font-medium text-gray-900">Push Notifications</span>
                    <p className="text-sm text-gray-500">Receive push notifications</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.push}
                    onChange={(e) => setNotifications({ ...notifications, push: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                  />
                </label>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-3">What to Notify Me About</h4>
              <div className="space-y-3">
                <label className="flex items-center justify-between cursor-pointer p-3 bg-white rounded-lg hover:bg-gray-50">
                  <div>
                    <span className="font-medium text-gray-900">New Delivery Requests</span>
                    <p className="text-sm text-gray-500">Get notified about available deliveries</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.newDeliveries}
                    onChange={(e) => setNotifications({ ...notifications, newDeliveries: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                  />
                </label>

                <label className="flex items-center justify-between cursor-pointer p-3 bg-white rounded-lg hover:bg-gray-50">
                  <div>
                    <span className="font-medium text-gray-900">Earnings Updates</span>
                    <p className="text-sm text-gray-500">Get notified about payments and earnings</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.earnings}
                    onChange={(e) => setNotifications({ ...notifications, earnings: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                  />
                </label>

                <label className="flex items-center justify-between cursor-pointer p-3 bg-white rounded-lg hover:bg-gray-50">
                  <div>
                    <span className="font-medium text-gray-900">New Reviews</span>
                    <p className="text-sm text-gray-500">Get notified when customers leave reviews</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.reviews}
                    onChange={(e) => setNotifications({ ...notifications, reviews: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                  />
                </label>
              </div>
            </div>
          </div>

          <Button 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white gap-2"
            onClick={handleSaveNotifications}
          >
            <Save className="w-4 h-4" />
            Save Notification Settings
          </Button>
        </CardContent>
      </Card>

      {/* Payment Settings */}
      <Card className="border-2 shadow-lg">
        <CardHeader className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-blue-600" />
            Payment Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5 p-6">
          {payment.accountNumber.includes("****") ? (
            <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-blue-100">
                    <CreditCard className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Connect Your Bank Account</h3>
                    <p className="text-sm text-gray-600">Securely link your bank account to receive payments</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Button className="bg-white border-2 border-gray-300 hover:border-blue-600 hover:bg-blue-600 hover:text-white h-16 flex-col gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">S</div>
                  <span className="font-semibold">Connect with Stripe</span>
                </Button>
                <Button className="bg-white border-2 border-gray-300 hover:border-blue-600 hover:bg-blue-600 hover:text-white h-16 flex-col gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">P</div>
                  <span className="font-semibold">Connect with Plaid</span>
                </Button>
              </div>
              <p className="text-xs text-gray-500 text-center">Or connect manually below</p>
            </div>
          ) : (
            <div className="p-6 bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-emerald-100">
                    <Shield className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Bank Account Connected</h3>
                    <p className="text-sm text-gray-600">Your account is linked and ready to receive payments</p>
                  </div>
                </div>
                <Badge className="bg-emerald-500 text-white">Connected</Badge>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label htmlFor="accountName" className="text-base font-semibold">Account Name</Label>
              <Input
                id="accountName"
                value={payment.accountName}
                onChange={(e) => setPayment({ ...payment, accountName: e.target.value })}
                className="mt-2 h-12 border-2"
              />
            </div>
            <div>
              <Label htmlFor="bankName" className="text-base font-semibold">Bank Name</Label>
              <Input
                id="bankName"
                value={payment.bankName}
                onChange={(e) => setPayment({ ...payment, bankName: e.target.value })}
                className="mt-2 h-12 border-2"
              />
            </div>
            <div>
              <Label htmlFor="accountNumber" className="text-base font-semibold">Account Number</Label>
              <Input
                id="accountNumber"
                value={payment.accountNumber}
                onChange={(e) => setPayment({ ...payment, accountNumber: e.target.value })}
                className="mt-2 h-12 border-2"
                placeholder="Enter account number"
              />
            </div>
            <div>
              <Label htmlFor="routingNumber" className="text-base font-semibold">Routing Number</Label>
              <Input
                id="routingNumber"
                value={payment.routingNumber}
                onChange={(e) => setPayment({ ...payment, routingNumber: e.target.value })}
                className="mt-2 h-12 border-2"
                placeholder="Enter routing number"
              />
            </div>
          </div>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-blue-900 mb-1">Secure Payment Processing</p>
                <p className="text-xs text-blue-700">Your payment information is encrypted and secure. We use bank-level security.</p>
              </div>
            </div>
          </div>
          <Button 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white gap-2"
            onClick={handleSavePayment}
          >
            <Save className="w-4 h-4" />
            {payment.accountNumber.includes("****") ? "Connect Bank Account" : "Update Payment Info"}
          </Button>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="border-2 shadow-lg">
        <CardHeader className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            Security Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 p-6">
          <Button variant="outline" className="w-full justify-start gap-2 border-2 h-12" asChild>
            <a href="/courier/profile">
              <Shield className="w-4 h-4" />
              Change Password
            </a>
          </Button>
          <Button variant="outline" className="w-full justify-start gap-2 border-2 h-12">
            <Shield className="w-4 h-4" />
            Enable Two-Factor Authentication
          </Button>
          <Button variant="outline" className="w-full justify-start gap-2 border-2 h-12">
            <Clock className="w-4 h-4" />
            View Login History
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

