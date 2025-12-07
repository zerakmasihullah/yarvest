"use client"

import Link from "next/link"
import { useState } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"
import { 
  LayoutDashboard, 
  Zap, 
  Truck, 
  Users,
  ArrowRight
} from "lucide-react"

const panels = [
  {
    icon: LayoutDashboard,
    title: "Seller Panel",
    description: "Manage products, orders, deliveries, and analytics",
    href: "/admin",
    color: "from-[#0A5D31] to-[#0d7a3f]",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    textColor: "text-emerald-700"
  },
  {
    icon: Zap,
    title: "Super Admin",
    description: "Full system access - users, shops, payments, and more",
    href: "/admin/super-admin",
    color: "from-purple-600 to-indigo-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    textColor: "text-purple-700"
  },
  {
    icon: Truck,
    title: "Courier Panel",
    description: "Manage deliveries, routes, earnings, and performance",
    href: "/courier",
    color: "from-blue-600 to-purple-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-700"
  },
  {
    icon: Users,
    title: "Volunteers Panel",
    description: "Harvesting, deliveries, schedule, and impact tracking",
    href: "/volunteers",
    color: "from-[#0A5D31] to-emerald-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    textColor: "text-green-700"
  }
]

export default function PanelsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <main className="flex-1 overflow-auto bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-20">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Choose Your Panel
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Select the dashboard you want to access for testing and management
            </p>
          </div>

          {/* Panels Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {panels.map((panel) => {
              const Icon = panel.icon
              return (
                <Link
                  key={panel.href}
                  href={panel.href}
                  className="group block w-full"
                >
                  <div
                    className={`relative w-full min-h-[280px] p-8 rounded-2xl border-2 ${panel.borderColor} ${panel.bgColor} transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer overflow-hidden`}
                  >
                    {/* Background Gradient on Hover */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${panel.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    />
                    
                    {/* Content */}
                    <div className="relative z-10">
                      {/* Icon */}
                      <div
                        className={`w-16 h-16 rounded-xl bg-gradient-to-br ${panel.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>

                      {/* Title */}
                      <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-white transition-colors duration-300">
                        {panel.title}
                      </h2>

                      {/* Description */}
                      <p className={`text-gray-600 mb-6 group-hover:text-white/90 transition-colors duration-300`}>
                        {panel.description}
                      </p>

                      {/* Arrow */}
                      <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 group-hover:text-white transition-colors duration-300">
                        <span>Access Panel</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:bg-white/20 transition-all duration-300" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12 group-hover:bg-white/20 transition-all duration-300" />
                  </div>
                </Link>
              )
            })}
          </div>

          {/* Footer Note */}
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500">
              All panels are available for testing purposes
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

