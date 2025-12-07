"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Truck, 
  MapPin,
  Clock,
  DollarSign,
  Star,
  Package,
  CheckCircle,
  XCircle,
  Power,
  PowerOff,
  Calendar,
  TrendingUp,
  MessageSquare,
  Award,
  Navigation,
  Search
} from "lucide-react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"

const mockDeliveries = [
  {
    id: "DEL-001",
    orderId: "ORD-001",
    customer: "John Doe",
    address: "123 Main St, San Francisco, CA 94102",
    phone: "(555) 123-4567",
    items: 2,
    distance: 3.5,
    estimatedEarnings: 12.50,
    status: "available",
    priority: "normal",
    pickupTime: "10:00 AM",
    deliveryTime: "11:00 AM - 1:00 PM",
  },
  {
    id: "DEL-002",
    orderId: "ORD-002",
    customer: "Jane Smith",
    address: "456 Oak Ave, Oakland, CA 94601",
    phone: "(555) 234-5678",
    items: 1,
    distance: 5.2,
    estimatedEarnings: 15.00,
    status: "available",
    priority: "high",
    pickupTime: "2:00 PM",
    deliveryTime: "3:00 PM - 5:00 PM",
  },
  {
    id: "DEL-003",
    orderId: "ORD-003",
    customer: "Mike Johnson",
    address: "789 Pine St, Berkeley, CA 94704",
    phone: "(555) 345-6789",
    items: 3,
    distance: 2.8,
    estimatedEarnings: 10.00,
    status: "assigned",
    priority: "normal",
    pickupTime: "3:00 PM",
    deliveryTime: "4:00 PM - 6:00 PM",
  },
  {
    id: "DEL-004",
    orderId: "ORD-004",
    customer: "Sarah Williams",
    address: "321 Elm Dr, San Jose, CA 95110",
    phone: "(555) 456-7890",
    items: 1,
    distance: 8.5,
    estimatedEarnings: 20.00,
    status: "in_progress",
    priority: "normal",
    pickupTime: "11:00 AM",
    deliveryTime: "12:00 PM - 2:00 PM",
  },
]

const mockEarnings = [
  { date: "2024-01-15", deliveries: 8, earnings: 95.50, tips: 15.00 },
  { date: "2024-01-14", deliveries: 12, earnings: 142.00, tips: 28.00 },
  { date: "2024-01-13", deliveries: 10, earnings: 118.75, tips: 22.50 },
  { date: "2024-01-12", deliveries: 6, earnings: 72.00, tips: 12.00 },
]

const mockReviews = [
  {
    id: 1,
    customer: "John Doe",
    rating: 5,
    comment: "Fast and friendly delivery!",
    date: "2024-01-15",
    orderId: "ORD-001",
  },
  {
    id: 2,
    customer: "Jane Smith",
    rating: 4,
    comment: "Good service, arrived on time.",
    date: "2024-01-14",
    orderId: "ORD-002",
  },
  {
    id: 3,
    customer: "Mike Johnson",
    rating: 5,
    comment: "Excellent! Very professional.",
    date: "2024-01-13",
    orderId: "ORD-003",
  },
]

export default function CourierPage() {
  const [isActive, setIsActive] = useState(false)
  const [activeHours, setActiveHours] = useState({ start: "09:00", end: "17:00" })
  const [selectedDelivery, setSelectedDelivery] = useState<any>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [statusFilter, setStatusFilter] = useState("all")

  const stats = {
    totalDeliveries: 156,
    completedToday: 8,
    totalEarnings: 1250.75,
    averageRating: 4.8,
    totalReviews: 89,
    activeHours: "8h 30m",
  }

  const handlePickDelivery = (delivery: any) => {
    console.log("Picking delivery:", delivery.id)
    // Update delivery status to assigned
  }

  const handleStartDelivery = (delivery: any) => {
    console.log("Starting delivery:", delivery.id)
    // Update delivery status to in_progress
  }

  const handleCompleteDelivery = (delivery: any) => {
    console.log("Completing delivery:", delivery.id)
    // Update delivery status to completed
  }

  const filteredDeliveries = mockDeliveries.filter((delivery) => {
    if (statusFilter === "all") return true
    return delivery.status === statusFilter
  })

  return (
    <div className="p-8 space-y-6">
      {/* Header with Status Toggle */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Courier Dashboard</h1>
          <p className="text-gray-600">Manage your deliveries and track your earnings</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 p-4 bg-white border-2 border-gray-200 rounded-xl">
            <div className={`w-3 h-3 rounded-full ${isActive ? "bg-emerald-500 animate-pulse" : "bg-gray-400"}`} />
            <span className="font-semibold text-gray-900">
              {isActive ? "Active" : "Offline"}
            </span>
          </div>
          <Button
            className={`gap-2 shadow-lg ${
              isActive
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-gradient-to-r from-[#0A5D31] to-[#0d7a3f] hover:from-[#0d7a3f] hover:to-[#0A5D31] text-white"
            }`}
            onClick={() => setIsActive(!isActive)}
          >
            {isActive ? (
              <>
                <PowerOff className="w-4 h-4" />
                Go Offline
              </>
            ) : (
              <>
                <Power className="w-4 h-4" />
                Go Online
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Active Hours Settings */}
      {isActive && (
        <Card className="border-2 border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-600" />
              Active Hours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Start Time</label>
                <Input
                  type="time"
                  value={activeHours.start}
                  onChange={(e) => setActiveHours({ ...activeHours, start: e.target.value })}
                  className="h-12 border-2"
                />
              </div>
              <div className="flex-1">
                <label className="text-sm font-semibold text-gray-700 mb-2 block">End Time</label>
                <Input
                  type="time"
                  value={activeHours.end}
                  onChange={(e) => setActiveHours({ ...activeHours, end: e.target.value })}
                  className="h-12 border-2"
                />
              </div>
              <div className="flex items-end">
                <Button className="bg-[#0A5D31] hover:bg-[#0d7a3f] text-white h-12">
                  Save Hours
                </Button>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-3">
              You'll receive delivery requests during these hours: {activeHours.start} - {activeHours.end}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="border-2 hover:shadow-lg transition-all">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-500 mb-1">Total Deliveries</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalDeliveries}</p>
          </CardContent>
        </Card>
        <Card className="border-2 hover:shadow-lg transition-all">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-500 mb-1">Today</p>
            <p className="text-2xl font-bold text-[#0A5D31]">{stats.completedToday}</p>
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
            <div className="flex items-center justify-center gap-1">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <p className="text-2xl font-bold text-gray-900">{stats.averageRating}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-2 hover:shadow-lg transition-all">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-500 mb-1">Reviews</p>
            <p className="text-2xl font-bold text-blue-600">{stats.totalReviews}</p>
          </CardContent>
        </Card>
        <Card className="border-2 hover:shadow-lg transition-all">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-500 mb-1">Active Time</p>
            <p className="text-2xl font-bold text-purple-600">{stats.activeHours}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Available Deliveries */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="border-2 shadow-lg">
            <CardHeader className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-[#0A5D31]" />
                  Available Deliveries
                </CardTitle>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-lg border-2 border-gray-200 bg-white text-sm font-medium focus:ring-2 focus:ring-[#0A5D31] focus:border-[#0A5D31]"
                >
                  <option value="all">All</option>
                  <option value="available">Available</option>
                  <option value="assigned">Assigned</option>
                  <option value="in_progress">In Progress</option>
                </select>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                {filteredDeliveries.map((delivery) => (
                  <div key={delivery.id} className="p-5 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-mono font-semibold text-gray-900">{delivery.id}</span>
                          <Badge className={
                            delivery.status === "available" ? "bg-blue-500 text-white" :
                            delivery.status === "assigned" ? "bg-purple-500 text-white" :
                            "bg-orange-500 text-white"
                          }>
                            {delivery.status.replace("_", " ")}
                          </Badge>
                          {delivery.priority === "high" && (
                            <Badge className="bg-red-500 text-white">High Priority</Badge>
                          )}
                        </div>
                        <p className="font-semibold text-gray-900 mb-1">{delivery.customer}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <MapPin className="w-4 h-4" />
                          <span>{delivery.address}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Package className="w-4 h-4" />
                            <span>{delivery.items} items</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Navigation className="w-4 h-4" />
                            <span>{delivery.distance} miles</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            <span className="font-bold text-[#0A5D31]">${delivery.estimatedEarnings}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t">
                      <div className="text-sm text-gray-500">
                        <p>Pickup: {delivery.pickupTime}</p>
                        <p>Delivery: {delivery.deliveryTime}</p>
                      </div>
                      <div className="flex gap-2">
                        {delivery.status === "available" && (
                          <Button
                            className="bg-gradient-to-r from-[#0A5D31] to-[#0d7a3f] hover:from-[#0d7a3f] hover:to-[#0A5D31] text-white"
                            onClick={() => handlePickDelivery(delivery)}
                          >
                            Pick Delivery
                          </Button>
                        )}
                        {delivery.status === "assigned" && (
                          <Button
                            className="bg-orange-600 hover:bg-orange-700 text-white"
                            onClick={() => handleStartDelivery(delivery)}
                          >
                            Start Delivery
                          </Button>
                        )}
                        {delivery.status === "in_progress" && (
                          <Button
                            className="bg-emerald-600 hover:bg-emerald-700 text-white"
                            onClick={() => handleCompleteDelivery(delivery)}
                          >
                            Complete
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          onClick={() => {
                            setSelectedDelivery(delivery)
                            setShowDetailsModal(true)
                          }}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Earnings & Reviews */}
        <div className="space-y-6">
          {/* Today's Earnings */}
          <Card className="border-2 shadow-lg">
            <CardHeader className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-[#0A5D31]" />
                Today's Earnings
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="text-center p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border-2 border-emerald-200">
                  <p className="text-sm text-gray-600 mb-1">Total Earnings</p>
                  <p className="text-3xl font-bold text-[#0A5D31]">$95.50</p>
                  <p className="text-xs text-gray-500 mt-1">8 deliveries completed</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Base Pay</span>
                    <span className="font-semibold text-gray-900">$80.50</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Tips</span>
                    <span className="font-semibold text-emerald-600">+$15.00</span>
                  </div>
                </div>
                <Button className="w-full bg-[#0A5D31] hover:bg-[#0d7a3f] text-white">
                  View Earnings History
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Reviews */}
          <Card className="border-2 shadow-lg">
            <CardHeader className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-[#0A5D31]" />
                Recent Reviews
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                {mockReviews.map((review) => (
                  <div key={review.id} className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-gray-900">{review.customer}</p>
                        <p className="text-xs text-gray-500">{review.date}</p>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">{review.comment}</p>
                    <p className="text-xs text-gray-500 mt-2">Order: {review.orderId}</p>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t">
                <Button variant="outline" className="w-full">
                  View All Reviews
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-2 shadow-lg">
            <CardHeader className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-3">
              <Button variant="outline" className="w-full justify-start gap-2 border-2 h-12">
                <Navigation className="w-4 h-4" />
                View Map
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2 border-2 h-12">
                <Calendar className="w-4 h-4" />
                Schedule
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2 border-2 h-12">
                <TrendingUp className="w-4 h-4" />
                Earnings Report
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2 border-2 h-12">
                <Award className="w-4 h-4" />
                Achievements
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Delivery Details Modal */}
      {selectedDelivery && (
        <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Delivery Details - {selectedDelivery.id}</DialogTitle>
              <DialogDescription>
                Order: {selectedDelivery.orderId}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-5 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Customer</p>
                  <p className="font-semibold text-gray-900">{selectedDelivery.customer}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Phone</p>
                  <p className="font-semibold text-gray-900">{selectedDelivery.phone}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500 mb-1">Delivery Address</p>
                  <p className="font-semibold text-gray-900">{selectedDelivery.address}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Items</p>
                  <p className="font-semibold text-gray-900">{selectedDelivery.items} items</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Distance</p>
                  <p className="font-semibold text-gray-900">{selectedDelivery.distance} miles</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Estimated Earnings</p>
                  <p className="font-bold text-[#0A5D31] text-xl">${selectedDelivery.estimatedEarnings}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Pickup Time</p>
                  <p className="font-semibold text-gray-900">{selectedDelivery.pickupTime}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Delivery Window</p>
                  <p className="font-semibold text-gray-900">{selectedDelivery.deliveryTime}</p>
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <p className="text-sm font-medium text-blue-900 mb-1">Delivery Instructions</p>
                <p className="text-sm text-blue-700">Please ring the doorbell and leave the package at the front door if no answer.</p>
              </div>
            </div>

            <DialogFooter>
              {selectedDelivery.status === "available" && (
                <Button
                  className="bg-gradient-to-r from-[#0A5D31] to-[#0d7a3f] hover:from-[#0d7a3f] hover:to-[#0A5D31] text-white"
                  onClick={() => {
                    handlePickDelivery(selectedDelivery)
                    setShowDetailsModal(false)
                  }}
                >
                  Pick This Delivery
                </Button>
              )}
              {selectedDelivery.status === "assigned" && (
                <Button
                  className="bg-orange-600 hover:bg-orange-700 text-white"
                  onClick={() => {
                    handleStartDelivery(selectedDelivery)
                    setShowDetailsModal(false)
                  }}
                >
                  Start Delivery
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

