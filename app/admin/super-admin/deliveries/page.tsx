"use client"

import { CRUDTable } from "@/components/admin/crud-table"
import { Truck } from "lucide-react"

const mockDeliveries = [
  { id: 1, orderId: "ORD-001", customer: "John Doe", address: "123 Main St, SF", courier: "John Courier", status: "In Transit", date: "2024-01-15" },
  { id: 2, orderId: "ORD-002", customer: "Jane Smith", address: "456 Oak Ave, Oakland", courier: "Jane Courier", status: "Delivered", date: "2024-01-14" },
  { id: 3, orderId: "ORD-003", customer: "Mike Johnson", address: "789 Pine Rd, Berkeley", courier: "Mike Courier", status: "Pending", date: "2024-01-16" },
  { id: 4, orderId: "ORD-004", customer: "Sarah Williams", address: "321 Elm St, San Jose", courier: "Sarah Courier", status: "Delivered", date: "2024-01-13" },
]

export default function DeliveriesPage() {
  const handleAdd = () => {
    console.log("Add new delivery")
  }

  const handleEdit = (id: number) => {
    console.log("Edit delivery", id)
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this delivery?")) {
      console.log("Delete delivery", id)
    }
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Deliveries</h1>
        <p className="text-gray-600">Manage deliveries and shipping</p>
      </div>

      <CRUDTable
        title="Deliveries"
        icon={Truck}
        columns={[
          { key: "id", label: "ID" },
          { key: "orderId", label: "Order ID" },
          { key: "customer", label: "Customer" },
          { 
            key: "address", 
            label: "Address",
            render: (value) => (
              <span className="max-w-xs truncate block" title={value}>
                {value}
              </span>
            )
          },
          { key: "courier", label: "Courier" },
          { key: "date", label: "Date" },
          { 
            key: "status", 
            label: "Status",
            render: (value) => {
              const statusColors: Record<string, string> = {
                "Pending": "bg-yellow-100 text-yellow-800",
                "In Transit": "bg-blue-100 text-blue-800",
                "Delivered": "bg-green-100 text-green-800",
                "Failed": "bg-red-100 text-red-800",
              }
              return (
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[value] || "bg-gray-100 text-gray-800"}`}>
                  {value}
                </span>
              )
            }
          }
        ]}
        data={mockDeliveries}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchPlaceholder="Search deliveries..."
      />
    </div>
  )
}

