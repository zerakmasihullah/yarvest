"use client"

import { CRUDTable } from "@/components/admin/crud-table"
import { Calendar } from "lucide-react"

const mockEvents = [
  { id: 1, title: "Farmers Market", date: "2024-01-15", location: "San Francisco", attendees: 150, status: "Active" },
  { id: 2, title: "Harvest Festival", date: "2024-02-20", location: "Oakland", attendees: 200, status: "Active" },
  { id: 3, title: "Organic Workshop", date: "2024-03-10", location: "Berkeley", attendees: 75, status: "Active" },
  { id: 4, title: "Spring Planting Day", date: "2024-04-05", location: "San Jose", attendees: 120, status: "Upcoming" },
]

export default function EventsPage() {
  const handleAdd = () => {
    console.log("Add new event")
  }

  const handleEdit = (id: number) => {
    console.log("Edit event", id)
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this event?")) {
      console.log("Delete event", id)
    }
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Events</h1>
        <p className="text-gray-600">Manage events</p>
      </div>

      <CRUDTable
        title="Events"
        icon={Calendar}
        columns={[
          { key: "id", label: "ID" },
          { key: "title", label: "Title" },
          { key: "date", label: "Date" },
          { key: "location", label: "Location" },
          { key: "attendees", label: "Attendees" },
          { 
            key: "status", 
            label: "Status",
            render: (value) => (
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                value === "Active" ? "bg-green-100 text-green-800" : 
                value === "Upcoming" ? "bg-blue-100 text-blue-800" : 
                "bg-gray-100 text-gray-800"
              }`}>
                {value}
              </span>
            )
          }
        ]}
        data={mockEvents}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchPlaceholder="Search events..."
      />
    </div>
  )
}

