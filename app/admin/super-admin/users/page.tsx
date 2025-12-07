"use client"

import { CRUDTable } from "@/components/admin/crud-table"
import { User } from "lucide-react"

const mockUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Customer", orders: 12, status: "Active", joined: "2023-06-15" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Customer", orders: 8, status: "Active", joined: "2023-07-20" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "Producer", orders: 0, status: "Active", joined: "2023-05-10" },
  { id: 4, name: "Sarah Williams", email: "sarah@example.com", role: "Admin", orders: 0, status: "Active", joined: "2023-01-05" },
  { id: 5, name: "David Brown", email: "david@example.com", role: "Customer", orders: 3, status: "Inactive", joined: "2023-08-12" },
]

export default function UsersPage() {
  const handleAdd = () => {
    console.log("Add new user")
  }

  const handleEdit = (id: number) => {
    console.log("Edit user", id)
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      console.log("Delete user", id)
    }
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Users</h1>
        <p className="text-gray-600">Manage all users and accounts</p>
      </div>

      <CRUDTable
        title="Users"
        icon={User}
        columns={[
          { key: "id", label: "ID" },
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { 
            key: "role", 
            label: "Role",
            render: (value) => (
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                value === "Admin" ? "bg-purple-100 text-purple-800" :
                value === "Producer" ? "bg-blue-100 text-blue-800" :
                "bg-gray-100 text-gray-800"
              }`}>
                {value}
              </span>
            )
          },
          { key: "orders", label: "Orders" },
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
        data={mockUsers}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchPlaceholder="Search users..."
      />
    </div>
  )
}

