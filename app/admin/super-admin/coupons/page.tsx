"use client"

import { CRUDTable } from "@/components/admin/crud-table"
import { Ticket } from "lucide-react"

const mockCoupons = [
  { id: 1, code: "SAVE10", discount: 10, type: "Percentage", used: 45, limit: 100, expiry: "2024-12-31", status: "Active" },
  { id: 2, code: "WELCOME20", discount: 20, type: "Percentage", used: 12, limit: 50, expiry: "2024-06-30", status: "Active" },
  { id: 3, code: "FLAT5", discount: 5, type: "Fixed", used: 8, limit: 200, expiry: "2024-03-31", status: "Active" },
  { id: 4, code: "SUMMER15", discount: 15, type: "Percentage", used: 50, limit: 50, expiry: "2023-12-31", status: "Expired" },
]

export default function CouponsPage() {
  const handleAdd = () => {
    console.log("Add new coupon")
  }

  const handleEdit = (id: number) => {
    console.log("Edit coupon", id)
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this coupon?")) {
      console.log("Delete coupon", id)
    }
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Coupons</h1>
        <p className="text-gray-600">Manage discount coupons and promotions</p>
      </div>

      <CRUDTable
        title="Coupons"
        icon={Ticket}
        columns={[
          { key: "id", label: "ID" },
          { key: "code", label: "Code" },
          { 
            key: "discount", 
            label: "Discount",
            render: (value, row) => 
              row.type === "Percentage" ? `${value}%` : `$${value}`
          },
          { key: "type", label: "Type" },
          { key: "used", label: "Used" },
          { key: "limit", label: "Limit" },
          { key: "expiry", label: "Expiry" },
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
        data={mockCoupons}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchPlaceholder="Search coupons..."
      />
    </div>
  )
}

