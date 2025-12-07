"use client"

import { CRUDTable } from "@/components/admin/crud-table"
import { ShoppingCart } from "lucide-react"

const mockOrders = [
  { id: 1, orderNumber: "ORD-001", customer: "John Doe", total: 45.99, status: "Pending", date: "2024-01-15", items: 3 },
  { id: 2, orderNumber: "ORD-002", customer: "Jane Smith", total: 89.50, status: "Processing", date: "2024-01-14", items: 5 },
  { id: 3, orderNumber: "ORD-003", customer: "Mike Johnson", total: 125.00, status: "Shipped", date: "2024-01-13", items: 7 },
  { id: 4, orderNumber: "ORD-004", customer: "Sarah Williams", total: 32.99, status: "Delivered", date: "2024-01-12", items: 2 },
  { id: 5, orderNumber: "ORD-005", customer: "David Brown", total: 67.50, status: "Cancelled", date: "2024-01-11", items: 4 },
]

export default function OrdersPage() {
  const handleAdd = () => {
    console.log("Add new order")
  }

  const handleEdit = (id: number) => {
    console.log("Edit order", id)
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this order?")) {
      console.log("Delete order", id)
    }
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Orders</h1>
        <p className="text-gray-600">Manage all orders</p>
      </div>

      <CRUDTable
        title="Orders"
        icon={ShoppingCart}
        columns={[
          { key: "id", label: "ID" },
          { key: "orderNumber", label: "Order Number" },
          { key: "customer", label: "Customer" },
          { 
            key: "total", 
            label: "Total",
            render: (value) => `$${value?.toFixed(2)}`
          },
          { key: "items", label: "Items" },
          { key: "date", label: "Date" },
          { 
            key: "status", 
            label: "Status",
            render: (value) => {
              const statusColors: Record<string, string> = {
                "Pending": "bg-yellow-100 text-yellow-800",
                "Processing": "bg-blue-100 text-blue-800",
                "Shipped": "bg-purple-100 text-purple-800",
                "Delivered": "bg-green-100 text-green-800",
                "Cancelled": "bg-red-100 text-red-800",
              }
              return (
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[value] || "bg-gray-100 text-gray-800"}`}>
                  {value}
                </span>
              )
            }
          }
        ]}
        data={mockOrders}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchPlaceholder="Search orders..."
      />
    </div>
  )
}

