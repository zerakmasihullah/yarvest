"use client"

import { useState } from "react"
import { CRUDTable } from "@/components/admin/crud-table"
import { Store } from "lucide-react"

const mockShops = [
  { id: 1, name: "Farm Fresh Market", location: "San Francisco", owner: "John Doe", status: "Active" },
  { id: 2, name: "Local Harvest Store", location: "Oakland", owner: "Jane Smith", status: "Active" },
  { id: 3, name: "Organic Corner", location: "Berkeley", owner: "Mike Johnson", status: "Active" },
  { id: 4, name: "Green Market", location: "San Jose", owner: "Sarah Williams", status: "Inactive" },
]

export default function ShopsPage() {
  const handleAdd = () => {
    console.log("Add new shop")
  }

  const handleEdit = (id: number) => {
    console.log("Edit shop", id)
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this shop?")) {
      console.log("Delete shop", id)
    }
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Shops</h1>
        <p className="text-gray-600">Manage all shops in the platform</p>
      </div>

      <CRUDTable
        title="Shops"
        icon={Store}
        columns={[
          { key: "id", label: "ID" },
          { key: "name", label: "Name" },
          { key: "location", label: "Location" },
          { key: "owner", label: "Owner" },
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
        data={mockShops}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchPlaceholder="Search shops..."
      />
    </div>
  )
}

