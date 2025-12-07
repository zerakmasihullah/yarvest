"use client"

import { CRUDTable } from "@/components/admin/crud-table"
import { Truck } from "lucide-react"

const mockValidators = [
  { id: 1, name: "John Validator", email: "john@example.com", verified: 45, status: "Active" },
  { id: 2, name: "Jane Validator", email: "jane@example.com", verified: 32, status: "Active" },
  { id: 3, name: "Mike Validator", email: "mike@example.com", verified: 28, status: "Active" },
  { id: 4, name: "Sarah Validator", email: "sarah@example.com", verified: 19, status: "Inactive" },
]

export default function ValidatorsPage() {
  const handleAdd = () => {
    console.log("Add new validator")
  }

  const handleEdit = (id: number) => {
    console.log("Edit validator", id)
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this validator?")) {
      console.log("Delete validator", id)
    }
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Validators</h1>
        <p className="text-gray-600">Manage validators</p>
      </div>

      <CRUDTable
        title="Validators"
        icon={Truck}
        columns={[
          { key: "id", label: "ID" },
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "verified", label: "Verified Items" },
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
        data={mockValidators}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchPlaceholder="Search validators..."
      />
    </div>
  )
}

