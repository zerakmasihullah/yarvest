"use client"

import { CRUDTable } from "@/components/admin/crud-table"
import { Star } from "lucide-react"

const mockReviews = [
  { id: 1, product: "Organic Tomatoes", customer: "John Doe", rating: 5, comment: "Excellent quality!", status: "Approved", date: "2024-01-15" },
  { id: 2, product: "Fresh Carrots", customer: "Jane Smith", rating: 4, comment: "Very fresh and tasty", status: "Approved", date: "2024-01-14" },
  { id: 3, product: "Sweet Apples", customer: "Mike Johnson", rating: 5, comment: "Best apples I've ever had", status: "Pending", date: "2024-01-13" },
  { id: 4, product: "Organic Lettuce", customer: "Sarah Williams", rating: 3, comment: "Good but could be better", status: "Approved", date: "2024-01-12" },
  { id: 5, product: "Premium Blueberries", customer: "David Brown", rating: 2, comment: "Not as fresh as expected", status: "Rejected", date: "2024-01-11" },
]

export default function ReviewsPage() {
  const handleAdd = () => {
    console.log("Add new review")
  }

  const handleEdit = (id: number) => {
    console.log("Edit review", id)
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this review?")) {
      console.log("Delete review", id)
    }
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Reviews</h1>
        <p className="text-gray-600">Manage product reviews and ratings</p>
      </div>

      <CRUDTable
        title="Reviews"
        icon={Star}
        columns={[
          { key: "id", label: "ID" },
          { key: "product", label: "Product" },
          { key: "customer", label: "Customer" },
          { 
            key: "rating", 
            label: "Rating",
            render: (value) => (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{value}/5</span>
              </div>
            )
          },
          { 
            key: "comment", 
            label: "Comment",
            render: (value) => (
              <span className="max-w-xs truncate block" title={value}>
                {value}
              </span>
            )
          },
          { key: "date", label: "Date" },
          { 
            key: "status", 
            label: "Status",
            render: (value) => {
              const statusColors: Record<string, string> = {
                "Approved": "bg-green-100 text-green-800",
                "Pending": "bg-yellow-100 text-yellow-800",
                "Rejected": "bg-red-100 text-red-800",
              }
              return (
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[value] || "bg-gray-100 text-gray-800"}`}>
                  {value}
                </span>
              )
            }
          }
        ]}
        data={mockReviews}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchPlaceholder="Search reviews..."
      />
    </div>
  )
}

