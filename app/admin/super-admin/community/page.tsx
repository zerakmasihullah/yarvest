"use client"

import { CRUDTable } from "@/components/admin/crud-table"
import { Users2 } from "lucide-react"

const mockCommunity = [
  { id: 1, name: "John Doe", email: "john@example.com", posts: 12, comments: 45, status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", posts: 8, comments: 32, status: "Active" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", posts: 5, comments: 18, status: "Active" },
  { id: 4, name: "Sarah Williams", email: "sarah@example.com", posts: 0, comments: 3, status: "Inactive" },
]

export default function CommunityPage() {
  const handleAdd = () => {
    console.log("Add new community member")
  }

  const handleEdit = (id: number) => {
    console.log("Edit community member", id)
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this community member?")) {
      console.log("Delete community member", id)
    }
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Community</h1>
        <p className="text-gray-600">Manage community members</p>
      </div>

      <CRUDTable
        title="Community"
        icon={Users2}
        columns={[
          { key: "id", label: "ID" },
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "posts", label: "Posts" },
          { key: "comments", label: "Comments" },
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
        data={mockCommunity}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchPlaceholder="Search community..."
      />
    </div>
  )
}

