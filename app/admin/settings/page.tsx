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
  Globe,
  Mail,
  Save,
  Store,
  Package,
  Truck,
  Clock,
  DollarSign,
  FileText,
  CheckCircle,
  AlertCircle
} from "lucide-react"
import { useState } from "react"

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    orderUpdates: true,
    newProducts: false,
    promotions: true,
    lowStock: true,
    reviews: true,
  })

  const [payment, setPayment] = useState({
    accountName: "Green Valley Farm",
    accountNumber: "**** **** **** 1234",
    bankName: "Chase Bank",
    routingNumber: "****1234",
    accountType: "Business",
  })

  const [storeSettings, setStoreSettings] = useState({
    status: "open",
    autoAcceptOrders: true,
    lowStockThreshold: 10,
    orderProcessingTime: "24",
    deliveryRadius: "50",
    minimumOrderAmount: "25.00",
  })

  const handleSaveNotifications = () => {
    console.log("Saving notifications:", notifications)
  }

  const handleSavePayment = () => {
    console.log("Saving payment:", payment)
  }

  const handleSaveStore = () => {
    console.log("Saving store settings:", storeSettings)
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>

      {/* Store Settings */}
      <Card className="border-2 shadow-lg">
        <CardHeader className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <CardTitle className="flex items-center gap-2">
            <Store className="w-5 h-5 text-[#0A5D31]" />
            Store Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label htmlFor="storeStatus" className="text-base font-semibold">Store Status</Label>
              <select
                id="storeStatus"
                value={storeSettings.status}
                onChange={(e) => setStoreSettings({ ...storeSettings, status: e.target.value })}
                className="mt-2 w-full h-12 px-4 rounded-lg border-2 border-gray-200 bg-white text-sm font-medium focus:ring-2 focus:ring-[#0A5D31] focus:border-[#0A5D31]"
              >
                <option value="open">Open</option>
                <option value="closed">Closed</option>
                <option value="maintenance">Maintenance Mode</option>
              </select>
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 w-full">
                <input
                  type="checkbox"
                  checked={storeSettings.autoAcceptOrders}
                  onChange={(e) => setStoreSettings({ ...storeSettings, autoAcceptOrders: e.target.checked })}
                  className="w-5 h-5 rounded border-gray-300 text-[#0A5D31] focus:ring-[#0A5D31]"
                />
                <div>
                  <span className="text-base font-semibold text-gray-900">Auto-Accept Orders</span>
                  <p className="text-xs text-gray-500">Automatically accept new orders</p>
                </div>
              </label>
            </div>
            <div>
              <Label htmlFor="lowStockThreshold" className="text-base font-semibold">Low Stock Threshold</Label>
              <Input
                id="lowStockThreshold"
                type="number"
                value={storeSettings.lowStockThreshold}
                onChange={(e) => setStoreSettings({ ...storeSettings, lowStockThreshold: parseInt(e.target.value) })}
                className="mt-2 h-12 border-2"
                placeholder="10"
              />
              <p className="text-xs text-gray-500 mt-1">Get notified when stock falls below this number</p>
            </div>
            <div>
              <Label htmlFor="orderProcessingTime" className="text-base font-semibold">Order Processing Time (hours)</Label>
              <Input
                id="orderProcessingTime"
                type="number"
                value={storeSettings.orderProcessingTime}
                onChange={(e) => setStoreSettings({ ...storeSettings, orderProcessingTime: e.target.value })}
                className="mt-2 h-12 border-2"
                placeholder="24"
              />
            </div>
            <div>
              <Label htmlFor="deliveryRadius" className="text-base font-semibold">Delivery Radius (miles)</Label>
              <Input
                id="deliveryRadius"
                type="number"
                value={storeSettings.deliveryRadius}
                onChange={(e) => setStoreSettings({ ...storeSettings, deliveryRadius: e.target.value })}
                className="mt-2 h-12 border-2"
                placeholder="50"
              />
            </div>
            <div>
              <Label htmlFor="minimumOrderAmount" className="text-base font-semibold">Minimum Order Amount ($)</Label>
              <Input
                id="minimumOrderAmount"
                type="number"
                step="0.01"
                value={storeSettings.minimumOrderAmount}
                onChange={(e) => setStoreSettings({ ...storeSettings, minimumOrderAmount: e.target.value })}
                className="mt-2 h-12 border-2"
                placeholder="25.00"
              />
            </div>
          </div>
          <Button 
            className="bg-gradient-to-r from-[#0A5D31] to-[#0d7a3f] hover:from-[#0d7a3f] hover:to-[#0A5D31] text-white gap-2"
            onClick={handleSaveStore}
          >
            <Save className="w-4 h-4" />
            Save Store Settings
          </Button>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="border-2 shadow-lg">
        <CardHeader className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#0A5D31]" />
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
                    className="w-5 h-5 rounded border-gray-300 text-[#0A5D31] focus:ring-[#0A5D31]"
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
                    className="w-5 h-5 rounded border-gray-300 text-[#0A5D31] focus:ring-[#0A5D31]"
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
                    className="w-5 h-5 rounded border-gray-300 text-[#0A5D31] focus:ring-[#0A5D31]"
                  />
                </label>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-3">What to Notify Me About</h4>
              <div className="space-y-3">
                <label className="flex items-center justify-between cursor-pointer p-3 bg-white rounded-lg hover:bg-gray-50">
                  <div>
                    <span className="font-medium text-gray-900">Order Updates</span>
                    <p className="text-sm text-gray-500">Get notified about order status changes</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.orderUpdates}
                    onChange={(e) => setNotifications({ ...notifications, orderUpdates: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-300 text-[#0A5D31] focus:ring-[#0A5D31]"
                  />
                </label>

                <label className="flex items-center justify-between cursor-pointer p-3 bg-white rounded-lg hover:bg-gray-50">
                  <div>
                    <span className="font-medium text-gray-900">Low Stock Alerts</span>
                    <p className="text-sm text-gray-500">Get notified when products are running low</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.lowStock}
                    onChange={(e) => setNotifications({ ...notifications, lowStock: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-300 text-[#0A5D31] focus:ring-[#0A5D31]"
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
                    className="w-5 h-5 rounded border-gray-300 text-[#0A5D31] focus:ring-[#0A5D31]"
                  />
                </label>

                <label className="flex items-center justify-between cursor-pointer p-3 bg-white rounded-lg hover:bg-gray-50">
                  <div>
                    <span className="font-medium text-gray-900">Promotions & Deals</span>
                    <p className="text-sm text-gray-500">Get notified about promotions and deals</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.promotions}
                    onChange={(e) => setNotifications({ ...notifications, promotions: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-300 text-[#0A5D31] focus:ring-[#0A5D31]"
                  />
                </label>
              </div>
            </div>
          </div>

          <Button 
            className="bg-gradient-to-r from-[#0A5D31] to-[#0d7a3f] hover:from-[#0d7a3f] hover:to-[#0A5D31] text-white gap-2"
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
            <CreditCard className="w-5 h-5 text-[#0A5D31]" />
            Payment & Bank Account Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5 p-6">
          {/* Connect Bank Account Section */}
          {!payment.accountNumber.includes("****") ? (
            <div className="p-6 bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-emerald-100">
                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Bank Account Connected</h3>
                    <p className="text-sm text-gray-600">Your account is linked and ready to receive payments</p>
                  </div>
                </div>
                <Badge className="bg-emerald-500 text-white">Connected</Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Bank Name</p>
                  <p className="font-semibold text-gray-900">{payment.bankName}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Account Type</p>
                  <p className="font-semibold text-gray-900">{payment.accountType}</p>
                </div>
              </div>
              <Button variant="outline" className="mt-4 w-full border-2">
                Disconnect Account
              </Button>
            </div>
          ) : (
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
                <Button className="bg-white border-2 border-gray-300 hover:border-[#0A5D31] hover:bg-[#0A5D31] hover:text-white h-16 flex-col gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#0A5D31] text-white flex items-center justify-center font-bold">S</div>
                  <span className="font-semibold">Connect with Stripe</span>
                </Button>
                <Button className="bg-white border-2 border-gray-300 hover:border-[#0A5D31] hover:bg-[#0A5D31] hover:text-white h-16 flex-col gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#0A5D31] text-white flex items-center justify-center font-bold">P</div>
                  <span className="font-semibold">Connect with Plaid</span>
                </Button>
              </div>
              <p className="text-xs text-gray-500 text-center">Or connect manually below</p>
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
            <div>
              <Label htmlFor="accountType" className="text-base font-semibold">Account Type</Label>
              <select
                id="accountType"
                value={payment.accountType}
                onChange={(e) => setPayment({ ...payment, accountType: e.target.value })}
                className="mt-2 w-full h-12 px-4 rounded-lg border-2 border-gray-200 bg-white text-sm font-medium focus:ring-2 focus:ring-[#0A5D31] focus:border-[#0A5D31]"
              >
                <option>Business</option>
                <option>Personal</option>
              </select>
            </div>
          </div>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-blue-900 mb-1">Secure Payment Processing</p>
                <p className="text-xs text-blue-700">Your payment information is encrypted and secure. We use bank-level security and never store your full account details.</p>
              </div>
            </div>
          </div>
          <Button 
            className="bg-gradient-to-r from-[#0A5D31] to-[#0d7a3f] hover:from-[#0d7a3f] hover:to-[#0A5D31] text-white gap-2"
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
            <Shield className="w-5 h-5 text-[#0A5D31]" />
            Security Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 p-6">
          <Button variant="outline" className="w-full justify-start gap-2 border-2 h-12" asChild>
            <a href="/admin/profile">
              <Shield className="w-4 h-4" />
              Change Password
            </a>
          </Button>
          <Button variant="outline" className="w-full justify-start gap-2 border-2 h-12">
            <CheckCircle className="w-4 h-4" />
            Enable Two-Factor Authentication
          </Button>
          <Button variant="outline" className="w-full justify-start gap-2 border-2 h-12">
            <FileText className="w-4 h-4" />
            View Login History
          </Button>
          <Button variant="outline" className="w-full justify-start gap-2 border-2 h-12">
            <Globe className="w-4 h-4" />
            Active Sessions
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
