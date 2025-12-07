"use client"

import { CRUDTable } from "@/components/admin/crud-table"
import { Heart } from "lucide-react"

const mockDonations = [
  { id: 1, title: "Feed Families in Need", goal: 10000, raised: 6750, donors: 234, status: "Active" },
  { id: 2, title: "Support Local Farmers", goal: 15000, raised: 8900, donors: 189, status: "Active" },
  { id: 3, title: "School Garden Program", goal: 8000, raised: 4200, donors: 156, status: "Active" },
  { id: 4, title: "Emergency Food Relief", goal: 20000, raised: 12450, donors: 312, status: "Active" },
]

export default function DonationsPage() {
  const handleAdd = () => {
    console.log("Add new donation")
  }

  const handleEdit = (id: number) => {
    console.log("Edit donation", id)
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this donation campaign?")) {
      console.log("Delete donation", id)
    }
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Donations</h1>
        <p className="text-gray-600">Manage donation campaigns</p>
      </div>

      <CRUDTable
        title="Donations"
        icon={Heart}
        columns={[
          { key: "id", label: "ID" },
          { key: "title", label: "Title" },
          { 
            key: "goal", 
            label: "Goal",
            render: (value) => `$${value?.toLocaleString()}`
          },
          { 
            key: "raised", 
            label: "Raised",
            render: (value) => `$${value?.toLocaleString()}`
          },
          { key: "donors", label: "Donors" },
          { 
            key: "status", 
            label: "Status",
            render: (value) => (
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                value === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
              }`}>
                {value}
              </span>
            )
          }
        ]}
        data={mockDonations}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchPlaceholder="Search donations..."
      />
    </div>
  )
}

