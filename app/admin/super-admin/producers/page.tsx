"use client"

import { CRUDTable } from "@/components/admin/crud-table"
import { Users } from "lucide-react"

const mockProducers = [
  { id: 1, name: "Green Valley Farm", email: "contact@greenvalley.com", products: 12, rating: 4.8, status: "Active" },
  { id: 2, name: "Sunny Side Farm", email: "info@sunnyside.com", products: 8, rating: 4.9, status: "Active" },
  { id: 3, name: "Orchard Fresh", email: "hello@orchard.com", products: 15, rating: 4.7, status: "Active" },
  { id: 4, name: "Leaf & Root", email: "info@leafroot.com", products: 6, rating: 4.6, status: "Inactive" },
]

export default function ProducersPage() {
  const handleAdd = () => {
    console.log("Add new producer")
  }

  const handleEdit = (id: number) => {
    console.log("Edit producer", id)
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this producer?")) {
      console.log("Delete producer", id)
    }
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Producers</h1>
        <p className="text-gray-600">Manage producers</p>
      </div>

      <CRUDTable
        title="Producers"
        icon={Users}
        columns={[
          { key: "id", label: "ID" },
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "products", label: "Products" },
          { 
            key: "rating", 
            label: "Rating",
            render: (value) => `${value}/5.0`
          },
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
        data={mockProducers}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchPlaceholder="Search producers..."
      />
    </div>
  )
}

