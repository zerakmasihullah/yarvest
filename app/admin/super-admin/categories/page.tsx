"use client"

import { CRUDTable } from "@/components/admin/crud-table"
import { Folder } from "lucide-react"

const mockCategories = [
  { id: 1, name: "Vegetables", slug: "vegetables", products: 45, status: "Active" },
  { id: 2, name: "Fruits", slug: "fruits", products: 32, status: "Active" },
  { id: 3, name: "Herbs", slug: "herbs", products: 18, status: "Active" },
  { id: 4, name: "Grains", slug: "grains", products: 12, status: "Active" },
  { id: 5, name: "Dairy", slug: "dairy", products: 8, status: "Inactive" },
]

export default function CategoriesPage() {
  const handleAdd = () => {
    console.log("Add new category")
  }

  const handleEdit = (id: number) => {
    console.log("Edit category", id)
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this category?")) {
      console.log("Delete category", id)
    }
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Categories</h1>
        <p className="text-gray-600">Manage product categories</p>
      </div>

      <CRUDTable
        title="Categories"
        icon={Folder}
        columns={[
          { key: "id", label: "ID" },
          { key: "name", label: "Name" },
          { key: "slug", label: "Slug" },
          { key: "products", label: "Products" },
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
        data={mockCategories}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchPlaceholder="Search categories..."
      />
    </div>
  )
}

