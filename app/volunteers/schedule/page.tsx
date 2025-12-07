"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Calendar,
  Clock,
  MapPin,
  Package,
  Leaf,
  Plus,
  Edit,
  Trash2
} from "lucide-react"
import { useState } from "react"

const mockSchedule = [
  {
    id: 1,
    type: "delivery",
    title: "Delivery Route - Downtown",
    date: "2024-01-16",
    time: "10:00 AM - 2:00 PM",
    location: "Downtown Area",
    status: "scheduled",
    deliveries: 5,
  },
  {
    id: 2,
    type: "harvest",
    title: "Harvest - Green Valley Farm",
    date: "2024-01-17",
    time: "8:00 AM - 12:00 PM",
    location: "Napa Valley, CA",
    status: "scheduled",
    crop: "Tomatoes",
  },
  {
    id: 3,
    type: "delivery",
    title: "Delivery Route - Northside",
    date: "2024-01-18",
    time: "2:00 PM - 6:00 PM",
    location: "Northside Area",
    status: "scheduled",
    deliveries: 3,
  },
]

export default function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState("2024-01-16")

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Schedule</h1>
          <p className="text-gray-600">Manage your upcoming deliveries and harvests</p>
        </div>
        <Button className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white gap-2 shadow-lg">
          <Plus className="w-5 h-5" />
          Add to Schedule
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar */}
        <Card className="border-2 border-orange-200 shadow-lg">
          <CardHeader className="border-b-2 border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-orange-600" />
              Calendar
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">January 2024</p>
              </div>
              <div className="grid grid-cols-7 gap-2 text-center">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="text-xs font-semibold text-gray-500 py-2">
                    {day}
                  </div>
                ))}
                {[...Array(31)].map((_, i) => {
                  const day = i + 1
                  const hasEvent = mockSchedule.some(s => s.date.includes(`-${day.toString().padStart(2, '0')}`))
                  return (
                    <div
                      key={day}
                      className={`p-2 rounded-lg cursor-pointer hover:bg-orange-50 ${
                        hasEvent ? "bg-orange-100 border-2 border-orange-300" : ""
                      }`}
                    >
                      <span className={`text-sm ${hasEvent ? "font-bold text-orange-600" : "text-gray-700"}`}>
                        {day}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Schedule List */}
        <div className="lg:col-span-3 space-y-4">
          <Card className="border-2 border-orange-200 shadow-lg">
            <CardHeader className="border-b-2 border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50">
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                {mockSchedule.map((event) => (
                  <div key={event.id} className="p-6 hover:bg-orange-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {event.type === "delivery" ? (
                            <Package className="w-5 h-5 text-orange-600" />
                          ) : (
                            <Leaf className="w-5 h-5 text-emerald-600" />
                          )}
                          <h3 className="font-bold text-gray-900 text-lg">{event.title}</h3>
                          <Badge className={
                            event.status === "scheduled" ? "bg-blue-500 text-white" :
                            event.status === "completed" ? "bg-emerald-500 text-white" :
                            "bg-gray-500 text-white"
                          }>
                            {event.status}
                          </Badge>
                        </div>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{event.location}</span>
                          </div>
                          {event.type === "delivery" && (
                            <div className="mt-2">
                              <Badge className="bg-orange-100 text-orange-800">
                                {event.deliveries} deliveries
                              </Badge>
                            </div>
                          )}
                          {event.type === "harvest" && (
                            <div className="mt-2">
                              <Badge className="bg-emerald-100 text-emerald-800">
                                {event.crop}
                              </Badge>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

