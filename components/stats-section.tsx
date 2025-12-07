"use client"

import { Users, ShoppingBag, Leaf, Award } from "lucide-react"

const stats = [
  {
    icon: Users,
    number: "10,000+",
    label: "Happy Customers",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    icon: ShoppingBag,
    number: "50,000+",
    label: "Products Sold",
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    icon: Leaf,
    number: "500+",
    label: "Local Farmers",
    color: "text-[#0A5D31]",
    bgColor: "bg-[#0A5D31]/10",
  },
  {
    icon: Award,
    number: "4.9/5",
    label: "Average Rating",
    color: "text-yellow-500",
    bgColor: "bg-yellow-50",
  },
]

export function StatsSection() {
  return (
    <div className="w-full bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 md:p-12 border border-gray-200">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-foreground mb-3">Our Impact</h2>
        <p className="text-muted-foreground text-base max-w-2xl mx-auto">
          Building a stronger community through local agriculture
        </p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div
              key={index}
              className="text-center p-6 bg-white rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 ${stat.bgColor} rounded-2xl mb-4`}>
                <Icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">{stat.number}</div>
              <div className="text-muted-foreground text-sm font-medium">{stat.label}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

