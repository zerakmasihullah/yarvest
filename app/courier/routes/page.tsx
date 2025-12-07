"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  MapPin,
  Navigation,
  Clock,
  Package,
  Route,
  Plus,
  Trash2,
  Edit
} from "lucide-react"
import { useState } from "react"

const mockRoutes = [
  {
    id: 1,
    name: "Downtown Route",
    stops: 5,
    distance: 12.5,
    estimatedTime: "2h 30m",
    status: "active",
    deliveries: [
      { id: "DEL-001", address: "123 Main St", time: "10:00 AM" },
      { id: "DEL-002", address: "456 Oak Ave", time: "10:30 AM" },
      { id: "DEL-003", address: "789 Pine St", time: "11:00 AM" },
    ],
  },
  {
    id: 2,
    name: "Northside Route",
    stops: 3,
    distance: 8.2,
    estimatedTime: "1h 45m",
    status: "saved",
    deliveries: [
      { id: "DEL-004", address: "321 Elm Dr", time: "2:00 PM" },
      { id: "DEL-005", address: "654 Maple Way", time: "2:30 PM" },
    ],
  },
]

export default function RoutesPage() {
  const [selectedRoute, setSelectedRoute] = useState<any>(null)

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Delivery Routes</h1>
          <p className="text-gray-600">Plan and optimize your delivery routes</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white gap-2 shadow-lg">
          <Plus className="w-5 h-5" />
          Create Route
        </Button>
      </div>

      {/* Routes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockRoutes.map((route) => (
          <Card key={route.id} className="border-2 hover:shadow-xl transition-all">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="flex items-center gap-2">
                  <Route className="w-5 h-5 text-blue-600" />
                  {route.name}
                </CardTitle>
                <Badge className={route.status === "active" ? "bg-emerald-500 text-white" : "bg-gray-500 text-white"}>
                  {route.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Stops</p>
                  <p className="text-lg font-bold text-gray-900">{route.stops}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Distance</p>
                  <p className="text-lg font-bold text-gray-900">{route.distance} mi</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Time</p>
                  <p className="text-lg font-bold text-gray-900">{route.estimatedTime}</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-700 mb-2">Stops:</p>
                {route.deliveries.map((delivery, index) => (
                  <div key={delivery.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{delivery.address}</p>
                      <p className="text-xs text-gray-500">{delivery.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 pt-2 border-t">
                <Button variant="outline" className="flex-1">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-50">
                  <Navigation className="w-4 h-4 mr-2" />
                  Start Route
                </Button>
                <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Map View */}
      <Card className="border-2 shadow-lg">
        <CardHeader>
          <CardTitle>Route Map</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96 bg-gray-100 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Interactive map will be displayed here</p>
              <p className="text-sm text-gray-400 mt-2">Integration with Google Maps or Mapbox</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

