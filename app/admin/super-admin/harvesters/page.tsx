"use client"

import { CRUDTable } from "@/components/admin/crud-table"
import { Package } from "lucide-react"

const mockHarvesters = [
  { id: 1, name: "John Harvester", email: "john@example.com", completed: 25, rating: 4.8, status: "Active", joined: "2023-05-15" },
  { id: 2, name: "Jane Harvester", email: "jane@example.com", completed: 18, rating: 4.9, status: "Active", joined: "2023-06-20" },
  { id: 3, name: "Mike Harvester", email: "mike@example.com", completed: 12, rating: 4.6, status: "Active", joined: "2023-07-10" },
  { id: 4, name: "Sarah Harvester", email: "sarah@example.com", completed: 5, rating: 4.2, status: "Inactive", joined: "2023-08-12" },
]

export default function HarvestersPage() {
  const handleAdd = () => {
    console.log("Add new harvester")
  }

  const handleEdit = (id: number) => {
    console.log("Edit harvester", id)
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this harvester?")) {
      console.log("Delete harvester", id)
    }
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Harvesters</h1>
        <p className="text-gray-600">Manage harvesters</p>
      </div>

      <CRUDTable
        title="Harvesters"
        icon={Package}
        columns={[
          { key: "id", label: "ID" },
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "completed", label: "Completed Jobs" },
          { 
            key: "rating", 
            label: "Rating",
            render: (value) => `${value}/5.0`
          },
          { key: "joined", label: "Joined" },
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
        data={mockHarvesters}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchPlaceholder="Search harvesters..."
      />
    </div>
  )
}

