"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  Filter,
  Package,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  Download
} from "lucide-react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

const mockOrders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    email: "john@example.com",
    phone: "(555) 123-4567",
    items: [
      { name: "Organic Heirloom Tomatoes", quantity: 2, price: 4.99 },
      { name: "Fresh Local Carrots", quantity: 3, price: 2.99 },
    ],
    total: 19.95,
    status: "pending",
    paymentStatus: "paid",
    date: "2024-01-15 10:30 AM",
    shippingAddress: "123 Main St, San Francisco, CA 94102",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    email: "jane@example.com",
    phone: "(555) 234-5678",
    items: [
      { name: "Sweet Local Apples", quantity: 5, price: 5.99 },
    ],
    total: 29.95,
    status: "processing",
    paymentStatus: "paid",
    date: "2024-01-15 09:15 AM",
    shippingAddress: "456 Oak Ave, Oakland, CA 94601",
  },
  {
    id: "ORD-003",
    customer: "Mike Johnson",
    email: "mike@example.com",
    phone: "(555) 345-6789",
    items: [
      { name: "Crisp Organic Lettuce", quantity: 1, price: 3.49 },
      { name: "Fresh Spinach Bundles", quantity: 2, price: 3.99 },
    ],
    total: 11.47,
    status: "shipped",
    paymentStatus: "paid",
    date: "2024-01-14 02:45 PM",
    shippingAddress: "789 Pine St, Berkeley, CA 94704",
    trackingNumber: "TRK123456789",
  },
  {
    id: "ORD-004",
    customer: "Sarah Williams",
    email: "sarah@example.com",
    phone: "(555) 456-7890",
    items: [
      { name: "Premium Blueberries", quantity: 2, price: 7.99 },
    ],
    total: 15.98,
    status: "delivered",
    paymentStatus: "paid",
    date: "2024-01-13 11:20 AM",
    shippingAddress: "321 Elm Dr, San Jose, CA 95110",
    trackingNumber: "TRK987654321",
  },
  {
    id: "ORD-005",
    customer: "David Brown",
    email: "david@example.com",
    phone: "(555) 567-8901",
    items: [
      { name: "Organic Strawberries", quantity: 3, price: 6.99 },
    ],
    total: 20.97,
    status: "cancelled",
    paymentStatus: "refunded",
    date: "2024-01-12 04:10 PM",
    shippingAddress: "654 Maple Way, Palo Alto, CA 94301",
  },
]

const statusConfig = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  processing: { label: "Processing", color: "bg-blue-100 text-blue-800", icon: Package },
  shipped: { label: "Shipped", color: "bg-purple-100 text-purple-800", icon: Truck },
  delivered: { label: "Delivered", color: "bg-green-100 text-green-800", icon: CheckCircle },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-800", icon: XCircle },
}

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = {
    total: mockOrders.length,
    pending: mockOrders.filter(o => o.status === "pending").length,
    processing: mockOrders.filter(o => o.status === "processing").length,
    shipped: mockOrders.filter(o => o.status === "shipped").length,
    delivered: mockOrders.filter(o => o.status === "delivered").length,
    revenue: mockOrders.filter(o => o.status !== "cancelled").reduce((sum, o) => sum + o.total, 0),
  }

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    console.log(`Updating order ${orderId} to ${newStatus}`)
    // In a real app, this would make an API call
  }

  const handleViewDetails = (order: any) => {
    setSelectedOrder(order)
    setShowDetailsModal(true)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
          <p className="text-gray-500 mt-1">Manage and track customer orders</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Export Orders
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <Card className="border-2 border-gray-100">
          <CardContent className="p-4">
            <p className="text-sm text-gray-500 mb-1">Total Orders</p>
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
            <p className="text-sm text-gray-500 mb-1">Processing</p>
            <p className="text-2xl font-bold text-blue-600">{stats.processing}</p>
          </CardContent>
        </Card>
        <Card className="border-2 border-gray-100">
          <CardContent className="p-4">
            <p className="text-sm text-gray-500 mb-1">Shipped</p>
            <p className="text-2xl font-bold text-purple-600">{stats.shipped}</p>
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
            <p className="text-sm text-gray-500 mb-1">Revenue</p>
            <p className="text-2xl font-bold text-[#5a9c3a]">${stats.revenue.toFixed(2)}</p>
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
                placeholder="Search orders by ID, customer, or email..."
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
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card className="border-2 border-gray-100">
        <CardHeader>
          <CardTitle>Orders ({filteredOrders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Order ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Customer</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Items</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Total</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => {
                  const StatusIcon = statusConfig[order.status as keyof typeof statusConfig].icon
                  return (
                    <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <span className="font-mono font-semibold text-gray-900">{order.id}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-medium text-gray-900">{order.customer}</p>
                          <p className="text-sm text-gray-500">{order.email}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm text-gray-600">
                          {order.items.length} item(s)
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-bold text-gray-900">${order.total.toFixed(2)}</span>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={`${statusConfig[order.status as keyof typeof statusConfig].color} gap-1`}>
                          <StatusIcon className="w-3 h-3" />
                          {statusConfig[order.status as keyof typeof statusConfig].label}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {order.date}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewDetails(order)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          {order.status === "pending" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleStatusUpdate(order.id, "processing")}
                              className="text-blue-600 hover:text-blue-700"
                            >
                              Process
                            </Button>
                          )}
                          {order.status === "processing" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleStatusUpdate(order.id, "shipped")}
                              className="text-purple-600 hover:text-purple-700"
                            >
                              Ship
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Order Details Modal */}
      {selectedOrder && (
        <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Order Details - {selectedOrder.id}</DialogTitle>
              <DialogDescription>
                Order placed on {selectedOrder.date}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Customer Info */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Customer Information</h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <p><span className="font-medium">Name:</span> {selectedOrder.customer}</p>
                  <p><span className="font-medium">Email:</span> {selectedOrder.email}</p>
                  <p><span className="font-medium">Phone:</span> {selectedOrder.phone}</p>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Order Items</h3>
                <div className="space-y-2">
                  {selectedOrder.items.map((item: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                  <div className="flex items-center justify-between p-3 bg-[#5a9c3a]/10 rounded-lg border-2 border-[#5a9c3a]">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="font-bold text-[#5a9c3a] text-xl">${selectedOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Shipping Address</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">{selectedOrder.shippingAddress}</p>
                </div>
              </div>

              {/* Tracking */}
              {selectedOrder.trackingNumber && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Tracking Information</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-mono text-gray-900">{selectedOrder.trackingNumber}</p>
                  </div>
                </div>
              )}

              {/* Status Actions */}
              <div className="flex gap-3 pt-4 border-t">
                {selectedOrder.status === "pending" && (
                  <Button
                    onClick={() => handleStatusUpdate(selectedOrder.id, "processing")}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    Mark as Processing
                  </Button>
                )}
                {selectedOrder.status === "processing" && (
                  <Button
                    onClick={() => handleStatusUpdate(selectedOrder.id, "shipped")}
                    className="flex-1 bg-purple-600 hover:bg-purple-700"
                  >
                    Mark as Shipped
                  </Button>
                )}
                {selectedOrder.status === "shipped" && (
                  <Button
                    onClick={() => handleStatusUpdate(selectedOrder.id, "delivered")}
                    className="flex-1 bg-green-600 hover:bg-green-700"
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

