"use client"

import { CRUDTable } from "@/components/admin/crud-table"
import { Newspaper } from "lucide-react"

const mockNews = [
  { id: 1, title: "New Organic Certification", date: "2024-01-10", author: "Admin", views: 1250, status: "Published" },
  { id: 2, title: "Harvest Season Begins", date: "2024-01-08", author: "Admin", views: 980, status: "Published" },
  { id: 3, title: "Farmers Market Opening", date: "2024-01-05", author: "Admin", views: 750, status: "Published" },
  { id: 4, title: "New Product Launch", date: "2024-01-12", author: "Admin", views: 0, status: "Draft" },
]

export default function NewsPage() {
  const handleAdd = () => {
    console.log("Add new news article")
  }

  const handleEdit = (id: number) => {
    console.log("Edit news article", id)
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this news article?")) {
      console.log("Delete news article", id)
    }
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">News</h1>
        <p className="text-gray-600">Manage news articles</p>
      </div>

      <CRUDTable
        title="News"
        icon={Newspaper}
        columns={[
          { key: "id", label: "ID" },
          { key: "title", label: "Title" },
          { key: "date", label: "Date" },
          { key: "author", label: "Author" },
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
        data={mockNews}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchPlaceholder="Search news..."
      />
    </div>
  )
}

