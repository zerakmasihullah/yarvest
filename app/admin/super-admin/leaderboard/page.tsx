"use client"

import { CRUDTable } from "@/components/admin/crud-table"
import { Trophy } from "lucide-react"

const mockLeaderboard = [
  { id: 1, name: "John Doe", points: 1250, rank: 1, level: "Gold", status: "Active" },
  { id: 2, name: "Jane Smith", points: 980, rank: 2, level: "Silver", status: "Active" },
  { id: 3, name: "Mike Johnson", points: 750, rank: 3, level: "Silver", status: "Active" },
  { id: 4, name: "Sarah Williams", points: 450, rank: 4, level: "Bronze", status: "Active" },
]

export default function LeaderboardPage() {
  const handleAdd = () => {
    console.log("Add new leaderboard entry")
  }

  const handleEdit = (id: number) => {
    console.log("Edit leaderboard entry", id)
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this leaderboard entry?")) {
      console.log("Delete leaderboard entry", id)
    }
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Leaderboard</h1>
        <p className="text-gray-600">Manage leaderboard rankings</p>
      </div>

      <CRUDTable
        title="Leaderboard"
        icon={Trophy}
        columns={[
          { key: "id", label: "ID" },
          { key: "name", label: "Name" },
          { key: "points", label: "Points" },
          { key: "rank", label: "Rank" },
          { 
            key: "level", 
            label: "Level",
            render: (value) => (
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                value === "Gold" ? "bg-yellow-100 text-yellow-800" :
                value === "Silver" ? "bg-gray-100 text-gray-800" :
                "bg-orange-100 text-orange-800"
              }`}>
                {value}
              </span>
            )
          },
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
        data={mockLeaderboard}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchPlaceholder="Search leaderboard..."
      />
    </div>
  )
}

