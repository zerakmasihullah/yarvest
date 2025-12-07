"use client"

import { CRUDTable } from "@/components/admin/crud-table"
import { HelpCircle } from "lucide-react"

const mockHelp = [
  { id: 1, title: "How to add products?", category: "Products", views: 1250, status: "Published" },
  { id: 2, title: "Payment methods", category: "Payment", views: 980, status: "Published" },
  { id: 3, title: "Shipping information", category: "Shipping", views: 750, status: "Published" },
  { id: 4, title: "Account settings", category: "Account", views: 0, status: "Draft" },
]

export default function HelpPage() {
  const handleAdd = () => {
    console.log("Add new help article")
  }

  const handleEdit = (id: number) => {
    console.log("Edit help article", id)
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this help article?")) {
      console.log("Delete help article", id)
    }
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Help Center</h1>
        <p className="text-gray-600">Manage help articles</p>
      </div>

      <CRUDTable
        title="Help Center"
        icon={HelpCircle}
        columns={[
          { key: "id", label: "ID" },
          { key: "title", label: "Title" },
          { key: "category", label: "Category" },
          { key: "views", label: "Views" },
          { 
            key: "status", 
            label: "Status",
            render: (value) => (
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                value === "Published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
              }`}>
                {value}
              </span>
            )
          }
        ]}
        data={mockHelp}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchPlaceholder="Search help articles..."
      />
    </div>
  )
}

