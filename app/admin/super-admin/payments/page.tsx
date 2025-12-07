"use client"

import { CRUDTable } from "@/components/admin/crud-table"
import { CreditCard } from "lucide-react"

const mockPayments = [
  { id: 1, transactionId: "TXN-001", orderId: "ORD-001", customer: "John Doe", amount: 45.99, method: "Credit Card", status: "Completed", date: "2024-01-15" },
  { id: 2, transactionId: "TXN-002", orderId: "ORD-002", customer: "Jane Smith", amount: 89.50, method: "PayPal", status: "Completed", date: "2024-01-14" },
  { id: 3, transactionId: "TXN-003", orderId: "ORD-003", customer: "Mike Johnson", amount: 125.00, method: "Credit Card", status: "Pending", date: "2024-01-13" },
  { id: 4, transactionId: "TXN-004", orderId: "ORD-004", customer: "Sarah Williams", amount: 32.99, method: "Bank Transfer", status: "Failed", date: "2024-01-12" },
  { id: 5, transactionId: "TXN-005", orderId: "ORD-005", customer: "David Brown", amount: 67.50, method: "Credit Card", status: "Refunded", date: "2024-01-11" },
]

export default function PaymentsPage() {
  const handleAdd = () => {
    console.log("Add new payment")
  }

  const handleEdit = (id: number) => {
    console.log("Edit payment", id)
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this payment?")) {
      console.log("Delete payment", id)
    }
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Payments</h1>
        <p className="text-gray-600">Manage all payments and transactions</p>
      </div>

      <CRUDTable
        title="Payments"
        icon={CreditCard}
        columns={[
          { key: "id", label: "ID" },
          { key: "transactionId", label: "Transaction ID" },
          { key: "orderId", label: "Order ID" },
          { key: "customer", label: "Customer" },
          { 
            key: "amount", 
            label: "Amount",
            render: (value) => `$${value?.toFixed(2)}`
          },
          { key: "method", label: "Payment Method" },
          { key: "date", label: "Date" },
          { 
            key: "status", 
            label: "Status",
            render: (value) => {
              const statusColors: Record<string, string> = {
                "Completed": "bg-green-100 text-green-800",
                "Pending": "bg-yellow-100 text-yellow-800",
                "Failed": "bg-red-100 text-red-800",
                "Refunded": "bg-blue-100 text-blue-800",
              }
              return (
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[value] || "bg-gray-100 text-gray-800"}`}>
                  {value}
                </span>
              )
            }
          }
        ]}
        data={mockPayments}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchPlaceholder="Search payments..."
      />
    </div>
  )
}

