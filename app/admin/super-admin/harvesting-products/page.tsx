"use client"

import { CRUDTable } from "@/components/admin/crud-table"
import { Package } from "lucide-react"

const mockHarvestingProducts = [
  { id: 1, name: "Harvest Tool Set", price: 49.99, category: "Tools", stock: 25, status: "Active" },
  { id: 2, name: "Harvest Basket", price: 19.99, category: "Accessories", stock: 50, status: "Active" },
  { id: 3, name: "Pruning Shears", price: 24.99, category: "Tools", stock: 30, status: "Active" },
  { id: 4, name: "Garden Gloves", price: 12.99, category: "Accessories", stock: 0, status: "Out of Stock" },
]

export default function HarvestingProductsPage() {
  const handleAdd = () => {
    console.log("Add new harvesting product")
  }

  const handleEdit = (id: number) => {
    console.log("Edit harvesting product", id)
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this harvesting product?")) {
      console.log("Delete harvesting product", id)
    }
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Harvesting Products</h1>
        <p className="text-gray-600">Manage harvesting products</p>
      </div>

      <CRUDTable
        title="Harvesting Products"
        icon={Package}
        columns={[
          { key: "id", label: "ID" },
          { key: "name", label: "Name" },
          { 
            key: "price", 
            label: "Price",
            render: (value) => `$${value?.toFixed(2)}`
          },
          { key: "category", label: "Category" },
          { key: "stock", label: "Stock" },
          { 
            key: "status", 
            label: "Status",
            render: (value) => (
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                value === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}>
                {value}
              </span>
            )
          }
        ]}
        data={mockHarvestingProducts}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchPlaceholder="Search harvesting products..."
      />
    </div>
  )
}

