"use client"

import { CRUDTable } from "@/components/admin/crud-table"
import { Gift } from "lucide-react"

const mockGiftCards = [
  { id: 1, code: "GIFT001", amount: 50, used: false, expiry: "2024-12-31", status: "Active" },
  { id: 2, code: "GIFT002", amount: 100, used: true, expiry: "2024-12-31", status: "Used" },
  { id: 3, code: "GIFT003", amount: 25, used: false, expiry: "2024-11-30", status: "Active" },
  { id: 4, code: "GIFT004", amount: 75, used: false, expiry: "2023-12-31", status: "Expired" },
]

export default function GiftCardsPage() {
  const handleAdd = () => {
    console.log("Add new gift card")
  }

  const handleEdit = (id: number) => {
    console.log("Edit gift card", id)
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this gift card?")) {
      console.log("Delete gift card", id)
    }
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Gift Cards</h1>
        <p className="text-gray-600">Manage gift cards</p>
      </div>

      <CRUDTable
        title="Gift Cards"
        icon={Gift}
        columns={[
          { key: "id", label: "ID" },
          { key: "code", label: "Code" },
          { 
            key: "amount", 
            label: "Amount",
            render: (value) => `$${value}`
          },
          { 
            key: "used", 
            label: "Used",
            render: (value) => (
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                value ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
              }`}>
                {value ? "Yes" : "No"}
              </span>
            )
          },
          { key: "expiry", label: "Expiry" },
          { 
            key: "status", 
            label: "Status",
            render: (value) => (
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                value === "Active" ? "bg-green-100 text-green-800" : 
                value === "Used" ? "bg-blue-100 text-blue-800" :
                "bg-gray-100 text-gray-800"
              }`}>
                {value}
              </span>
            )
          }
        ]}
        data={mockGiftCards}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchPlaceholder="Search gift cards..."
      />
    </div>
  )
}

