"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Leaf,
  MapPin,
  Clock,
  DollarSign,
  Calendar,
  Users,
  Search,
  Filter,
  CheckCircle,
  XCircle
} from "lucide-react"
import { useState } from "react"

const mockHarvests = [
  {
    id: "HRV-001",
    farm: "Green Valley Farm",
    address: "789 Farm Rd, Napa Valley, CA 94558",
    crop: "Tomatoes",
    quantity: "50 lbs",
    date: "2024-01-16",
    time: "8:00 AM - 12:00 PM",
    status: "available",
    estimatedEarnings: 25.00,
    volunteersNeeded: 3,
    volunteersJoined: 1,
    difficulty: "Easy",
  },
  {
    id: "HRV-002",
    farm: "Sunshine Orchard",
    address: "321 Orchard Way, Sonoma, CA 95476",
    crop: "Apples",
    quantity: "100 lbs",
    date: "2024-01-17",
    time: "7:00 AM - 11:00 AM",
    status: "available",
    estimatedEarnings: 30.00,
    volunteersNeeded: 5,
    volunteersJoined: 2,
    difficulty: "Medium",
  },
  {
    id: "HRV-003",
    farm: "Mountain View Farm",
    address: "456 Hillside Dr, Petaluma, CA 94952",
    crop: "Lettuce",
    quantity: "30 lbs",
    date: "2024-01-18",
    time: "9:00 AM - 1:00 PM",
    status: "assigned",
    estimatedEarnings: 20.00,
    volunteersNeeded: 2,
    volunteersJoined: 2,
    difficulty: "Easy",
  },
]

export default function HarvestingPage() {
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredHarvests = mockHarvests.filter((harvest) => {
    const matchesStatus = statusFilter === "all" || harvest.status === statusFilter
    const matchesSearch = 
      harvest.farm.toLowerCase().includes(searchQuery.toLowerCase()) ||
      harvest.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
      harvest.address.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const stats = {
    totalHarvests: 89,
    completedThisWeek: 12,
    totalEarnings: 450.75,
    farmsWorked: 15,
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Harvesting Opportunities</h1>
          <p className="text-gray-600">Join harvest sessions and help local farms</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-2 border-emerald-200 hover:shadow-lg transition-all bg-white">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-500 mb-1">Total Harvests</p>
            <p className="text-2xl font-bold text-emerald-600">{stats.totalHarvests}</p>
          </CardContent>
        </Card>
        <Card className="border-2 border-emerald-200 hover:shadow-lg transition-all bg-white">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-500 mb-1">This Week</p>
            <p className="text-2xl font-bold text-emerald-600">{stats.completedThisWeek}</p>
          </CardContent>
        </Card>
        <Card className="border-2 border-emerald-200 hover:shadow-lg transition-all bg-white">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-500 mb-1">Total Earnings</p>
            <p className="text-2xl font-bold text-emerald-600">${stats.totalEarnings.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card className="border-2 border-emerald-200 hover:shadow-lg transition-all bg-white">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-500 mb-1">Farms Worked</p>
            <p className="text-2xl font-bold text-emerald-600">{stats.farmsWorked}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-2 border-emerald-200 shadow-lg">
        <CardContent className="p-5">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search farms, crops, or locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 border-2 border-emerald-200"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 rounded-lg border-2 border-emerald-200 bg-white text-sm font-medium focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 h-12"
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="assigned">Assigned</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Harvests List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredHarvests.map((harvest) => (
          <Card key={harvest.id} className="border-2 border-emerald-200 hover:shadow-xl transition-all">
            <CardHeader className="border-b-2 border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-emerald-600" />
                  {harvest.farm}
                </CardTitle>
                <Badge className={
                  harvest.status === "available" ? "bg-emerald-500 text-white" :
                  harvest.status === "assigned" ? "bg-blue-500 text-white" :
                  "bg-gray-500 text-white"
                }>
                  {harvest.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>{harvest.address}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Leaf className="w-4 h-4" />
                    <span className="font-semibold text-gray-900">{harvest.crop}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">Quantity:</span>
                    <span className="font-semibold text-gray-900">{harvest.quantity}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Date</p>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <p className="font-semibold text-gray-900">{harvest.date}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Time</p>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <p className="font-semibold text-gray-900">{harvest.time}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Volunteers</p>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-emerald-600" />
                    <span className="font-semibold text-gray-900">
                      {harvest.volunteersJoined}/{harvest.volunteersNeeded}
                    </span>
                    <Badge className={
                      harvest.difficulty === "Easy" ? "bg-green-500 text-white" :
                      harvest.difficulty === "Medium" ? "bg-yellow-500 text-white" :
                      "bg-red-500 text-white"
                    }>
                      {harvest.difficulty}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 mb-1">Earnings</p>
                  <p className="text-xl font-bold text-emerald-600">${harvest.estimatedEarnings}</p>
                </div>
              </div>

              <div className="flex gap-2">
                {harvest.status === "available" && (
                  <Button className="flex-1 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-green-600 hover:to-emerald-600 text-white">
                    Join Harvest
                  </Button>
                )}
                {harvest.status === "assigned" && (
                  <>
                    <Button variant="outline" className="flex-1 border-2 border-emerald-200">
                      View Details
                    </Button>
                    <Button className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-green-600 hover:to-emerald-600 text-white">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Complete
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

