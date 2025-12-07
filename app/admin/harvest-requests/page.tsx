"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { 
  Leaf, 
  Search, 
  Plus,
  Calendar,
  MapPin,
  Package,
  CheckCircle,
  XCircle,
  Clock,
  Eye
} from "lucide-react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"

const mockHarvestRequests = [
  {
    id: "HR-001",
    product: "Organic Tomatoes",
    quantity: 50,
    unit: "lbs",
    requestedDate: "2024-01-20",
    status: "pending",
    location: "Field A, Section 3",
    notes: "Need ripe tomatoes for weekend market",
    createdAt: "2024-01-15 10:30 AM",
  },
  {
    id: "HR-002",
    product: "Fresh Carrots",
    quantity: 30,
    unit: "lbs",
    requestedDate: "2024-01-18",
    status: "approved",
    location: "Field B, Section 1",
    notes: "Standard harvest",
    createdAt: "2024-01-14 02:15 PM",
    approvedBy: "John Manager",
    approvedAt: "2024-01-14 03:00 PM",
  },
  {
    id: "HR-003",
    product: "Organic Lettuce",
    quantity: 25,
    unit: "bunches",
    requestedDate: "2024-01-17",
    status: "in_progress",
    location: "Greenhouse 2",
    notes: "Harvest early morning for freshness",
    createdAt: "2024-01-13 09:00 AM",
    assignedTo: "Harvest Team A",
    startedAt: "2024-01-16 06:00 AM",
  },
  {
    id: "HR-004",
    product: "Sweet Apples",
    quantity: 100,
    unit: "lbs",
    requestedDate: "2024-01-19",
    status: "completed",
    location: "Orchard North",
    notes: "Select only premium quality",
    createdAt: "2024-01-12 11:20 AM",
    completedAt: "2024-01-17 04:30 PM",
    harvestedQuantity: 98,
  },
  {
    id: "HR-005",
    product: "Fresh Spinach",
    quantity: 20,
    unit: "bunches",
    requestedDate: "2024-01-16",
    status: "rejected",
    location: "Field C, Section 2",
    notes: "Not ready for harvest",
    createdAt: "2024-01-11 03:45 PM",
    rejectedReason: "Crops not mature enough",
    rejectedBy: "Quality Control",
  },
]

const statusConfig = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  approved: { label: "Approved", color: "bg-blue-100 text-blue-800", icon: CheckCircle },
  in_progress: { label: "In Progress", color: "bg-purple-100 text-purple-800", icon: Package },
  completed: { label: "Completed", color: "bg-green-100 text-green-800", icon: CheckCircle },
  rejected: { label: "Rejected", color: "bg-red-100 text-red-800", icon: XCircle },
}

export default function HarvestRequestsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<any>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [formData, setFormData] = useState({
    product: "",
    quantity: "",
    unit: "lbs",
    requestedDate: "",
    location: "",
    notes: "",
  })

  const filteredRequests = mockHarvestRequests.filter((request) => {
    const matchesSearch = 
      request.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.product.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || request.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: mockHarvestRequests.length,
    pending: mockHarvestRequests.filter(r => r.status === "pending").length,
    approved: mockHarvestRequests.filter(r => r.status === "approved").length,
    in_progress: mockHarvestRequests.filter(r => r.status === "in_progress").length,
    completed: mockHarvestRequests.filter(r => r.status === "completed").length,
  }

  const handleSave = () => {
    console.log("Creating harvest request:", formData)
    setShowAddModal(false)
    setFormData({
      product: "",
      quantity: "",
      unit: "lbs",
      requestedDate: "",
      location: "",
      notes: "",
    })
  }

  const handleViewDetails = (request: any) => {
    setSelectedRequest(request)
    setShowDetailsModal(true)
  }

  const handleStatusUpdate = (requestId: string, newStatus: string) => {
    console.log(`Updating request ${requestId} to ${newStatus}`)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Harvest Requests</h1>
          <p className="text-gray-500 mt-1">Manage harvest requests and track harvesting activities</p>
        </div>
        <Button 
          className="bg-[#0A5D31] hover:bg-[#0d7a3f] text-white gap-2"
          onClick={() => setShowAddModal(true)}
        >
          <Plus className="w-4 h-4" />
          New Request
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="border-2 border-gray-100">
          <CardContent className="p-4">
            <p className="text-sm text-gray-500 mb-1">Total Requests</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </CardContent>
        </Card>
        <Card className="border-2 border-gray-100">
          <CardContent className="p-4">
            <p className="text-sm text-gray-500 mb-1">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
          </CardContent>
        </Card>
        <Card className="border-2 border-gray-100">
          <CardContent className="p-4">
            <p className="text-sm text-gray-500 mb-1">Approved</p>
            <p className="text-2xl font-bold text-blue-600">{stats.approved}</p>
          </CardContent>
        </Card>
        <Card className="border-2 border-gray-100">
          <CardContent className="p-4">
            <p className="text-sm text-gray-500 mb-1">In Progress</p>
            <p className="text-2xl font-bold text-purple-600">{stats.in_progress}</p>
          </CardContent>
        </Card>
        <Card className="border-2 border-gray-100">
          <CardContent className="p-4">
            <p className="text-sm text-gray-500 mb-1">Completed</p>
            <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-2 border-gray-100">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search requests by ID or product..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 rounded-lg border-2 border-gray-200 bg-white text-sm focus:ring-2 focus:ring-[#0A5D31] focus:border-[#0A5D31]"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Requests List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRequests.map((request) => {
          const StatusIcon = statusConfig[request.status as keyof typeof statusConfig].icon
          return (
            <Card key={request.id} className="border-2 border-gray-100 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono font-semibold text-gray-900">{request.id}</span>
                  <Badge className={`${statusConfig[request.status as keyof typeof statusConfig].color} gap-1`}>
                    <StatusIcon className="w-3 h-3" />
                    {statusConfig[request.status as keyof typeof statusConfig].label}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{request.product}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Package className="w-4 h-4" />
                  <span className="font-semibold">{request.quantity} {request.unit}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Requested: {request.requestedDate}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{request.location}</span>
                </div>
                {request.status === "completed" && request.harvestedQuantity && (
                  <div className="p-2 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800">
                      Harvested: {request.harvestedQuantity} {request.unit}
                    </p>
                  </div>
                )}
                <div className="flex gap-2 pt-2 border-t">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleViewDetails(request)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  {request.status === "pending" && (
                    <Button
                      className="flex-1 bg-[#0A5D31] hover:bg-[#0d7a3f] text-white"
                      onClick={() => handleStatusUpdate(request.id, "approved")}
                    >
                      Approve
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Add Request Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <Leaf className="w-6 h-6" />
              New Harvest Request
            </DialogTitle>
            <DialogDescription>
              Create a new harvest request for your products
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="product">Product *</Label>
              <Input
                id="product"
                value={formData.product}
                onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                placeholder="e.g., Organic Tomatoes"
                className="mt-2"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="quantity">Quantity *</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  placeholder="0"
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="unit">Unit *</Label>
                <select
                  id="unit"
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  className="mt-2 w-full px-3 py-2 rounded-lg border-2 border-gray-200 bg-white text-sm focus:ring-2 focus:ring-[#0A5D31] focus:border-[#0A5D31]"
                >
                  <option>lbs</option>
                  <option>bunches</option>
                  <option>pieces</option>
                  <option>kg</option>
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="requestedDate">Requested Harvest Date *</Label>
              <Input
                id="requestedDate"
                type="date"
                value={formData.requestedDate}
                onChange={(e) => setFormData({ ...formData, requestedDate: e.target.value })}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g., Field A, Section 3"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="notes">Notes</Label>
              <textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Additional notes or instructions..."
                rows={4}
                className="mt-2 w-full p-3 rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-[#0A5D31] focus:border-[#0A5D31] resize-none"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-[#0A5D31] hover:bg-[#0d7a3f] text-white"
              onClick={handleSave}
            >
              Create Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Request Details Modal */}
      {selectedRequest && (
        <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Harvest Request Details - {selectedRequest.id}</DialogTitle>
              <DialogDescription>
                Created on {selectedRequest.createdAt}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Product</Label>
                  <p className="font-semibold text-gray-900 mt-1">{selectedRequest.product}</p>
                </div>
                <div>
                  <Label>Quantity</Label>
                  <p className="font-semibold text-gray-900 mt-1">{selectedRequest.quantity} {selectedRequest.unit}</p>
                </div>
                <div>
                  <Label>Requested Date</Label>
                  <p className="font-semibold text-gray-900 mt-1">{selectedRequest.requestedDate}</p>
                </div>
                <div>
                  <Label>Location</Label>
                  <p className="font-semibold text-gray-900 mt-1">{selectedRequest.location}</p>
                </div>
              </div>

              {selectedRequest.notes && (
                <div>
                  <Label>Notes</Label>
                  <p className="text-gray-700 mt-1 bg-gray-50 p-3 rounded-lg">{selectedRequest.notes}</p>
                </div>
              )}

              {selectedRequest.status === "rejected" && selectedRequest.rejectedReason && (
                <div className="p-4 bg-red-50 rounded-lg border-2 border-red-200">
                  <Label className="text-red-800">Rejection Reason</Label>
                  <p className="text-red-700 mt-1">{selectedRequest.rejectedReason}</p>
                </div>
              )}

              {selectedRequest.status === "completed" && selectedRequest.harvestedQuantity && (
                <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
                  <Label className="text-green-800">Harvested Quantity</Label>
                  <p className="text-green-700 font-semibold mt-1">
                    {selectedRequest.harvestedQuantity} {selectedRequest.unit}
                  </p>
                </div>
              )}
            </div>

            <DialogFooter>
              {selectedRequest.status === "pending" && (
                <>
                  <Button
                    variant="outline"
                    onClick={() => handleStatusUpdate(selectedRequest.id, "rejected")}
                    className="text-red-600"
                  >
                    Reject
                  </Button>
                  <Button
                    onClick={() => handleStatusUpdate(selectedRequest.id, "approved")}
                    className="bg-[#0A5D31] hover:bg-[#0d7a3f] text-white"
                  >
                    Approve Request
                  </Button>
                </>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

