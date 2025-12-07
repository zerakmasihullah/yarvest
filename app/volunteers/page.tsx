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
  Power,
  PowerOff,
  Calendar,
  TrendingUp,
  Navigation,
  Phone,
  Eye,
  Leaf,
  Users,
  Heart,
  Award
} from "lucide-react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import Link from "next/link"

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
]

const mockHarvests = [
  {
    id: "HRV-001",
    farm: "Green Valley Farm",
    address: "789 Farm Rd, Napa Valley, CA",
    crop: "Tomatoes",
    quantity: "50 lbs",
    date: "2024-01-16",
    time: "8:00 AM - 12:00 PM",
    status: "available",
    estimatedEarnings: 25.00,
  },
  {
    id: "HRV-002",
    farm: "Sunshine Orchard",
    address: "321 Orchard Way, Sonoma, CA",
    crop: "Apples",
    quantity: "100 lbs",
    date: "2024-01-17",
    time: "7:00 AM - 11:00 AM",
    status: "available",
    estimatedEarnings: 30.00,
  },
]

const mockEarnings = [
  { date: "2024-01-15", deliveries: 8, harvests: 2, earnings: 120.50, tips: 15.00 },
  { date: "2024-01-14", deliveries: 12, harvests: 1, earnings: 172.00, tips: 28.00 },
]

const mockReviews = [
  {
    id: 1,
    customer: "John Doe",
    rating: 5,
    comment: "Fast and friendly delivery!",
    date: "2024-01-15",
  },
  {
    id: 2,
    customer: "Jane Smith",
    rating: 4,
    comment: "Great harvesting work!",
    date: "2024-01-14",
  },
]

export default function VolunteersDashboard() {
  const [isActive, setIsActive] = useState(true)
  const [activeHours, setActiveHours] = useState({ start: "09:00", end: "17:00" })
  const [selectedDelivery, setSelectedDelivery] = useState<any>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [statusFilter, setStatusFilter] = useState("all")

  const stats = {
    totalDeliveries: 156,
    totalHarvests: 89,
    completedToday: 8,
    totalEarnings: 1250.75,
    averageRating: 4.8,
    totalReviews: 89,
    activeHours: "8h 30m",
    thisWeekEarnings: 356.25,
    impactScore: 1245,
  }

  const handlePickDelivery = (delivery: any) => {
    console.log("Picking delivery:", delivery.id)
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header with Status Toggle */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Volunteers Dashboard</h1>
          <p className="text-gray-600">Welcome back! Make a difference in your community</p>
        </div>
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-3 p-4 rounded-xl border-2 ${
            isActive 
              ? "bg-emerald-50 border-emerald-200" 
              : "bg-gray-50 border-gray-200"
          }`}>
            <div className={`w-3 h-3 rounded-full ${isActive ? "bg-emerald-500 animate-pulse" : "bg-gray-400"}`} />
            <span className="font-semibold text-gray-900">
              {isActive ? "Active" : "Offline"}
            </span>
          </div>
          <Button
            className={`gap-2 ${
              isActive
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-[#0A5D31] hover:bg-[#0d7a3f] text-white"
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
        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="w-5 h-5 text-[#0A5D31]" />
              Active Hours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-700 mb-2 block">Start Time</label>
                <Input
                  type="time"
                  value={activeHours.start}
                  onChange={(e) => setActiveHours({ ...activeHours, start: e.target.value })}
                  className="h-11 border border-gray-300"
                />
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-700 mb-2 block">End Time</label>
                <Input
                  type="time"
                  value={activeHours.end}
                  onChange={(e) => setActiveHours({ ...activeHours, end: e.target.value })}
                  className="h-11 border border-gray-300"
                />
              </div>
              <div className="flex items-end">
                <Button className="bg-[#0A5D31] hover:bg-[#0d7a3f] text-white h-11">
                  Save
                </Button>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-3">
              You'll receive requests during these hours: {activeHours.start} - {activeHours.end}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Impact Score */}
      <Card className="border border-gray-200 bg-gradient-to-r from-[#0A5D31] to-[#0d7a3f] shadow-md">
        <CardContent className="p-6 text-center text-white">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Heart className="w-8 h-8" />
            <p className="text-xl font-semibold">Your Impact Score</p>
          </div>
          <p className="text-5xl font-bold mb-1">{stats.impactScore.toLocaleString()}</p>
          <p className="text-sm text-green-100">points earned through deliveries and harvesting</p>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="border border-gray-200 hover:shadow-md transition-all bg-white">
          <CardContent className="p-4 text-center">
            <p className="text-xs text-gray-500 mb-1">Deliveries</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalDeliveries}</p>
          </CardContent>
        </Card>
        <Card className="border border-gray-200 hover:shadow-md transition-all bg-white">
          <CardContent className="p-4 text-center">
            <p className="text-xs text-gray-500 mb-1">Harvests</p>
            <p className="text-2xl font-bold text-[#0A5D31]">{stats.totalHarvests}</p>
          </CardContent>
        </Card>
        <Card className="border border-gray-200 hover:shadow-md transition-all bg-white">
          <CardContent className="p-4 text-center">
            <p className="text-xs text-gray-500 mb-1">Today</p>
            <p className="text-2xl font-bold text-[#0A5D31]">{stats.completedToday}</p>
          </CardContent>
        </Card>
        <Card className="border border-gray-200 hover:shadow-md transition-all bg-white">
          <CardContent className="p-4 text-center">
            <p className="text-xs text-gray-500 mb-1">Earnings</p>
            <p className="text-2xl font-bold text-[#0A5D31]">${stats.totalEarnings.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card className="border border-gray-200 hover:shadow-md transition-all bg-white">
          <CardContent className="p-4 text-center">
            <p className="text-xs text-gray-500 mb-1">Rating</p>
            <div className="flex items-center justify-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <p className="text-2xl font-bold text-gray-900">{stats.averageRating}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-gray-200 hover:shadow-md transition-all bg-white">
          <CardContent className="p-4 text-center">
            <p className="text-xs text-gray-500 mb-1">This Week</p>
            <p className="text-2xl font-bold text-[#0A5D31]">${stats.thisWeekEarnings.toFixed(2)}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Available Deliveries */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="border-b border-gray-200 bg-white">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Package className="w-5 h-5 text-[#0A5D31]" />
                  Available Deliveries
                </CardTitle>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm font-medium focus:ring-2 focus:ring-[#0A5D31] focus:border-[#0A5D31]"
                >
                  <option value="all">All</option>
                  <option value="available">Available</option>
                  <option value="assigned">Assigned</option>
                </select>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                {mockDeliveries.map((delivery) => (
                  <div key={delivery.id} className="p-5 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-medium text-gray-600">{delivery.id}</span>
                          <Badge className="bg-[#0A5D31] text-white text-xs">Available</Badge>
                          {delivery.priority === "high" && (
                            <Badge className="bg-red-500 text-white text-xs">High Priority</Badge>
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
                            <span className="font-semibold text-[#0A5D31]">${delivery.estimatedEarnings}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="text-sm text-gray-500">
                        <p>Pickup: {delivery.pickupTime}</p>
                        <p>Delivery: {delivery.deliveryTime}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          className="bg-[#0A5D31] hover:bg-[#0d7a3f] text-white"
                          onClick={() => handlePickDelivery(delivery)}
                        >
                          Pick Delivery
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedDelivery(delivery)
                            setShowDetailsModal(true)
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Available Harvests */}
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="border-b border-gray-200 bg-white">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Leaf className="w-5 h-5 text-[#0A5D31]" />
                Available Harvesting Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                {mockHarvests.map((harvest) => (
                  <div key={harvest.id} className="p-5 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-medium text-gray-600">{harvest.id}</span>
                          <Badge className="bg-[#0A5D31] text-white text-xs">Available</Badge>
                        </div>
                        <p className="font-semibold text-gray-900 mb-1">{harvest.farm}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <MapPin className="w-4 h-4" />
                          <span>{harvest.address}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Leaf className="w-4 h-4" />
                            <span>{harvest.crop} - {harvest.quantity}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{harvest.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            <span className="font-semibold text-[#0A5D31]">${harvest.estimatedEarnings}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="text-sm text-gray-500">
                        <p>Time: {harvest.time}</p>
                      </div>
                      <Button className="bg-[#0A5D31] hover:bg-[#0d7a3f] text-white">
                        Join Harvest
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Today's Earnings */}
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="border-b border-gray-200 bg-white">
              <CardTitle className="flex items-center gap-2 text-lg">
                <DollarSign className="w-5 h-5 text-[#0A5D31]" />
                Today's Earnings
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5">
              <div className="space-y-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-600 mb-1">Total Earnings</p>
                  <p className="text-3xl font-bold text-[#0A5D31]">$120.50</p>
                  <p className="text-xs text-gray-500 mt-1">8 deliveries • 2 harvests</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Base Pay</span>
                    <span className="font-medium text-gray-900">$105.50</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Tips</span>
                    <span className="font-medium text-[#0A5D31]">+$15.00</span>
                  </div>
                </div>
                <Button className="w-full bg-[#0A5D31] hover:bg-[#0d7a3f] text-white" asChild>
                  <Link href="/volunteers/earnings">
                    View Earnings History
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Reviews */}
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="border-b border-gray-200 bg-white">
              <CardTitle className="flex items-center gap-2 text-lg">
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
                  </div>
                ))}
              </div>
              <div className="p-4 border-t">
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/volunteers/reviews">View All Reviews</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="border-b border-gray-200 bg-white">
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="p-5 space-y-2">
              <Button variant="outline" className="w-full justify-start gap-2 border border-gray-300 h-11 hover:bg-gray-50" asChild>
                <Link href="/volunteers/routes">
                  <Navigation className="w-4 h-4" />
                  View Routes
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2 border border-gray-300 h-11 hover:bg-gray-50" asChild>
                <Link href="/volunteers/performance">
                  <TrendingUp className="w-4 h-4" />
                  Performance Stats
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2 border border-gray-300 h-11 hover:bg-gray-50" asChild>
                <Link href="/volunteers/impact">
                  <Heart className="w-4 h-4" />
                  View Impact
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2 border border-gray-300 h-11 hover:bg-gray-50" asChild>
                <Link href="/volunteers/schedule">
                  <Calendar className="w-4 h-4" />
                  Schedule
                </Link>
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
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <p className="font-semibold text-gray-900">{selectedDelivery.phone}</p>
                  </div>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500 mb-1">Delivery Address</p>
                  <p className="font-semibold text-gray-900">{selectedDelivery.address}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Estimated Earnings</p>
                  <p className="font-bold text-emerald-600 text-xl">${selectedDelivery.estimatedEarnings}</p>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                className="bg-[#0A5D31] hover:bg-[#0d7a3f] text-white"
                onClick={() => {
                  handlePickDelivery(selectedDelivery)
                  setShowDetailsModal(false)
                }}
              >
                Pick This Delivery
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

