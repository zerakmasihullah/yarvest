"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Truck, 
  Search, 
  MapPin,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Navigation,
  Phone,
  Mail
} from "lucide-react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

const mockDeliveries = [
  {
    id: "DEL-001",
    orderId: "ORD-001",
    customer: "John Doe",
    address: "123 Main St, San Francisco, CA 94102",
    phone: "(555) 123-4567",
    items: [
      { name: "Organic Heirloom Tomatoes", quantity: 2 },
      { name: "Fresh Local Carrots", quantity: 3 },
    ],
    status: "pending",
    scheduledDate: "2024-01-16",
    scheduledTime: "10:00 AM - 12:00 PM",
    driver: null,
    vehicle: null,
    trackingNumber: null,
    createdAt: "2024-01-15 10:30 AM",
  },
  {
    id: "DEL-002",
    orderId: "ORD-002",
    customer: "Jane Smith",
    address: "456 Oak Ave, Oakland, CA 94601",
    phone: "(555) 234-5678",
    items: [
      { name: "Sweet Local Apples", quantity: 5 },
    ],
    status: "assigned",
    scheduledDate: "2024-01-16",
    scheduledTime: "2:00 PM - 4:00 PM",
    driver: "Mike Driver",
    vehicle: "Truck #5",
    trackingNumber: "TRK123456789",
    createdAt: "2024-01-15 09:15 AM",
  },
  {
    id: "DEL-003",
    orderId: "ORD-003",
    customer: "Mike Johnson",
    address: "789 Pine St, Berkeley, CA 94704",
    phone: "(555) 345-6789",
    items: [
      { name: "Crisp Organic Lettuce", quantity: 1 },
      { name: "Fresh Spinach Bundles", quantity: 2 },
    ],
    status: "in_transit",
    scheduledDate: "2024-01-15",
    scheduledTime: "3:00 PM - 5:00 PM",
    driver: "Sarah Driver",
    vehicle: "Van #2",
    trackingNumber: "TRK987654321",
    estimatedArrival: "4:30 PM",
    createdAt: "2024-01-14 02:45 PM",
  },
  {
    id: "DEL-004",
    orderId: "ORD-004",
    customer: "Sarah Williams",
    address: "321 Elm Dr, San Jose, CA 95110",
    phone: "(555) 456-7890",
    items: [
      { name: "Premium Blueberries", quantity: 2 },
    ],
    status: "delivered",
    scheduledDate: "2024-01-14",
    scheduledTime: "11:00 AM - 1:00 PM",
    driver: "Tom Driver",
    vehicle: "Truck #3",
    trackingNumber: "TRK456789123",
    deliveredAt: "2024-01-14 12:30 PM",
    createdAt: "2024-01-13 11:20 AM",
  },
  {
    id: "DEL-005",
    orderId: "ORD-005",
    customer: "David Brown",
    address: "654 Maple Way, Palo Alto, CA 94301",
    phone: "(555) 567-8901",
    items: [
      { name: "Organic Strawberries", quantity: 3 },
    ],
    status: "failed",
    scheduledDate: "2024-01-13",
    scheduledTime: "2:00 PM - 4:00 PM",
    driver: "Lisa Driver",
    vehicle: "Van #1",
    trackingNumber: "TRK789123456",
    failureReason: "Customer not available",
    createdAt: "2024-01-12 04:10 PM",
  },
]

const statusConfig = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  assigned: { label: "Assigned", color: "bg-blue-100 text-blue-800", icon: Package },
  in_transit: { label: "In Transit", color: "bg-purple-100 text-purple-800", icon: Truck },
  delivered: { label: "Delivered", color: "bg-green-100 text-green-800", icon: CheckCircle },
  failed: { label: "Failed", color: "bg-red-100 text-red-800", icon: XCircle },
}

export default function DeliveriesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedDelivery, setSelectedDelivery] = useState<any>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)

  const filteredDeliveries = mockDeliveries.filter((delivery) => {
    const matchesSearch = 
      delivery.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delivery.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delivery.customer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || delivery.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: mockDeliveries.length,
    pending: mockDeliveries.filter(d => d.status === "pending").length,
    assigned: mockDeliveries.filter(d => d.status === "assigned").length,
    in_transit: mockDeliveries.filter(d => d.status === "in_transit").length,
    delivered: mockDeliveries.filter(d => d.status === "delivered").length,
    failed: mockDeliveries.filter(d => d.status === "failed").length,
  }

  const handleViewDetails = (delivery: any) => {
    setSelectedDelivery(delivery)
    setShowDetailsModal(true)
  }

  const handleAssignDriver = (deliveryId: string) => {
    console.log(`Assigning driver to delivery ${deliveryId}`)
  }

  const handleStatusUpdate = (deliveryId: string, newStatus: string) => {
    console.log(`Updating delivery ${deliveryId} to ${newStatus}`)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Delivery Management</h1>
          <p className="text-gray-500 mt-1">Track and manage order deliveries</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Navigation className="w-4 h-4" />
          View Map
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="border-2 border-gray-100">
          <CardContent className="p-4">
            <p className="text-sm text-gray-500 mb-1">Total Deliveries</p>
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
            <p className="text-sm text-gray-500 mb-1">Assigned</p>
            <p className="text-2xl font-bold text-blue-600">{stats.assigned}</p>
          </CardContent>
        </Card>
        <Card className="border-2 border-gray-100">
          <CardContent className="p-4">
            <p className="text-sm text-gray-500 mb-1">In Transit</p>
            <p className="text-2xl font-bold text-purple-600">{stats.in_transit}</p>
          </CardContent>
        </Card>
        <Card className="border-2 border-gray-100">
          <CardContent className="p-4">
            <p className="text-sm text-gray-500 mb-1">Delivered</p>
            <p className="text-2xl font-bold text-green-600">{stats.delivered}</p>
          </CardContent>
        </Card>
        <Card className="border-2 border-gray-100">
          <CardContent className="p-4">
            <p className="text-sm text-gray-500 mb-1">Failed</p>
            <p className="text-2xl font-bold text-red-600">{stats.failed}</p>
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
                placeholder="Search deliveries by ID, order ID, or customer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 rounded-lg border-2 border-gray-200 bg-white text-sm focus:ring-2 focus:ring-[#5a9c3a] focus:border-[#5a9c3a]"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="assigned">Assigned</option>
              <option value="in_transit">In Transit</option>
              <option value="delivered">Delivered</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Deliveries List */}
      <div className="space-y-4">
        {filteredDeliveries.map((delivery) => {
          const StatusIcon = statusConfig[delivery.status as keyof typeof statusConfig].icon
          return (
            <Card key={delivery.id} className="border-2 border-gray-100 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono font-semibold text-gray-900">{delivery.id}</span>
                      <Badge className={`${statusConfig[delivery.status as keyof typeof statusConfig].color} gap-1`}>
                        <StatusIcon className="w-3 h-3" />
                        {statusConfig[delivery.status as keyof typeof statusConfig].label}
                      </Badge>
                      <span className="text-sm text-gray-500">Order: {delivery.orderId}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{delivery.customer}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <MapPin className="w-4 h-4" />
                      <span>{delivery.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{delivery.scheduledDate} • {delivery.scheduledTime}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    {delivery.trackingNumber && (
                      <div className="mb-2">
                        <p className="text-xs text-gray-500">Tracking</p>
                        <p className="font-mono text-sm font-semibold text-gray-900">{delivery.trackingNumber}</p>
                      </div>
                    )}
                    {delivery.driver && (
                      <div className="mb-2">
                        <p className="text-xs text-gray-500">Driver</p>
                        <p className="text-sm font-semibold text-gray-900">{delivery.driver}</p>
                      </div>
                    )}
                    {delivery.status === "in_transit" && delivery.estimatedArrival && (
                      <div className="p-2 bg-purple-50 rounded-lg">
                        <p className="text-xs text-purple-600">ETA</p>
                        <p className="text-sm font-semibold text-purple-900">{delivery.estimatedArrival}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex gap-2">
                    {delivery.items.map((item: any, index: number) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {item.quantity}x {item.name}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetails(delivery)}
                    >
                      View Details
                    </Button>
                    {delivery.status === "pending" && (
                      <Button
                        size="sm"
                        className="bg-[#5a9c3a] hover:bg-[#0d7a3f] text-white"
                        onClick={() => handleAssignDriver(delivery.id)}
                      >
                        Assign Driver
                      </Button>
                    )}
                    {delivery.status === "assigned" && (
                      <Button
                        size="sm"
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                        onClick={() => handleStatusUpdate(delivery.id, "in_transit")}
                      >
                        Start Delivery
                      </Button>
                    )}
                    {delivery.status === "in_transit" && (
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => handleStatusUpdate(delivery.id, "delivered")}
                      >
                        Mark Delivered
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Delivery Details Modal */}
      {selectedDelivery && (
        <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Delivery Details - {selectedDelivery.id}</DialogTitle>
              <DialogDescription>
                Order: {selectedDelivery.orderId} • Created: {selectedDelivery.createdAt}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Customer Info */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Customer Information</h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <p><span className="font-medium">Name:</span> {selectedDelivery.customer}</p>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span>{selectedDelivery.phone}</span>
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Delivery Address</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                    <p className="text-gray-700">{selectedDelivery.address}</p>
                  </div>
                </div>
              </div>

              {/* Items */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Delivery Items</h3>
                <div className="space-y-2">
                  {selectedDelivery.items.map((item: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <Badge variant="outline">Quantity: {item.quantity}</Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Schedule */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Schedule</h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <p><span className="font-medium">Date:</span> {selectedDelivery.scheduledDate}</p>
                  <p><span className="font-medium">Time:</span> {selectedDelivery.scheduledTime}</p>
                </div>
              </div>

              {/* Driver & Vehicle */}
              {selectedDelivery.driver && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Driver & Vehicle</h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <p><span className="font-medium">Driver:</span> {selectedDelivery.driver}</p>
                    {selectedDelivery.vehicle && (
                      <p><span className="font-medium">Vehicle:</span> {selectedDelivery.vehicle}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Tracking */}
              {selectedDelivery.trackingNumber && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Tracking Information</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-mono text-gray-900">{selectedDelivery.trackingNumber}</p>
                  </div>
                </div>
              )}

              {/* Failure Reason */}
              {selectedDelivery.status === "failed" && selectedDelivery.failureReason && (
                <div className="p-4 bg-red-50 rounded-lg border-2 border-red-200">
                  <h3 className="font-semibold text-red-800 mb-2">Delivery Failed</h3>
                  <p className="text-red-700">{selectedDelivery.failureReason}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t">
                {selectedDelivery.status === "pending" && (
                  <Button
                    onClick={() => handleAssignDriver(selectedDelivery.id)}
                    className="flex-1 bg-[#5a9c3a] hover:bg-[#0d7a3f] text-white"
                  >
                    Assign Driver
                  </Button>
                )}
                {selectedDelivery.status === "assigned" && (
                  <Button
                    onClick={() => handleStatusUpdate(selectedDelivery.id, "in_transit")}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    Start Delivery
                  </Button>
                )}
                {selectedDelivery.status === "in_transit" && (
                  <Button
                    onClick={() => handleStatusUpdate(selectedDelivery.id, "delivered")}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  >
                    Mark as Delivered
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

