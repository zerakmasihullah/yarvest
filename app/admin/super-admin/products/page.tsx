"use client"

import { CRUDTable } from "@/components/admin/crud-table"
import { ShoppingBag } from "lucide-react"

// Mock data - replace with API call
const mockProducts = [
  { id: 1, name: "Organic Tomatoes", price: 4.99, category: "Vegetables", producer: "Green Valley Farm", status: "Active" },
  { id: 2, name: "Fresh Carrots", price: 2.99, category: "Vegetables", producer: "Sunny Side Farm", status: "Active" },
  { id: 3, name: "Sweet Apples", price: 5.99, category: "Fruits", producer: "Orchard Fresh", status: "Active" },
  { id: 4, name: "Organic Lettuce", price: 3.49, category: "Vegetables", producer: "Leaf & Root", status: "Active" },
  { id: 5, name: "Premium Blueberries", price: 7.99, category: "Fruits", producer: "Berry Fields Co.", status: "Active" },
]

export default function ProductsPage() {
  const handleAdd = () => {
    console.log("Add new product")
    // Open add modal or navigate to add page
  }

  const handleEdit = (id: number) => {
    console.log("Edit product", id)
    // Open edit modal or navigate to edit page
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      console.log("Delete product", id)
      // Call delete API
    }
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Products</h1>
        <p className="text-gray-600">Manage all products in the platform</p>
      </div>

      <CRUDTable
        title="Products"
        icon={ShoppingBag}
        columns={[
          { key: "id", label: "ID" },
          { key: "name", label: "Name" },
          { 
            key: "price", 
            label: "Price",
            render: (value) => `$${value?.toFixed(2)}`
          },
          { key: "category", label: "Category" },
          { key: "producer", label: "Producer" },
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
        data={mockProducts}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchPlaceholder="Search products..."
      />
    </div>
  )
}

