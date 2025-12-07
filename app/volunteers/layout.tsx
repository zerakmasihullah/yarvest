"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard,
  Truck,
  DollarSign,
  Star,
  Package,
  MapPin,
  Clock,
  Settings,
  Bell,
  Menu,
  X,
  LogOut,
  Home,
  User,
  Award,
  MessageSquare,
  BarChart3,
  HelpCircle,
  FileText,
  Leaf,
  Users,
  Heart,
  Calendar,
  TrendingUp
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const volunteerMenuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/volunteers" },
  { icon: Package, label: "Deliveries", href: "/volunteers/deliveries" },
  { icon: Leaf, label: "Harvesting", href: "/volunteers/harvesting" },
  { icon: DollarSign, label: "Earnings", href: "/volunteers/earnings" },
  { icon: Star, label: "Reviews", href: "/volunteers/reviews" },
  { icon: MapPin, label: "Routes", href: "/volunteers/routes" },
  { icon: BarChart3, label: "Performance", href: "/volunteers/performance" },
  { icon: Calendar, label: "Schedule", href: "/volunteers/schedule" },
  { icon: User, label: "Profile", href: "/volunteers/profile" },
  { icon: Settings, label: "Settings", href: "/volunteers/settings" },
]

const additionalMenuItems = [
  { icon: FileText, label: "Documents", href: "/volunteers/documents" },
  { icon: Heart, label: "Impact", href: "/volunteers/impact" },
  { icon: HelpCircle, label: "Help", href: "/volunteers/help" },
]

export default function VolunteersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            <Link href="/" className="flex items-center gap-3">
              <img
                src="https://cdn.prod.website-files.com/67c12ad0bddda4257ffc4539/67c15cdb77981e22a226bc86_Navbar%20Brand.svg"
                alt="Yarvest"
                className="h-8"
              />
              <div className="hidden md:block">
                <h1 className="text-xl font-bold text-gray-900">Volunteers</h1>
                <p className="text-xs text-gray-500">Make a difference</p>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Store
              </Link>
            </Button>
            <Button variant="ghost" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:flex w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)] flex-col">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0A5D31] to-[#0d7a3f] flex items-center justify-center overflow-hidden">
                <img
                  src="https://cdn.prod.website-files.com/67c12ad0bddda4257ffc4539/67c15cdb77981e22a226bc86_Navbar%20Brand.svg"
                  alt="Logo"
                  className="w-full h-full object-contain p-2"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-gray-900 truncate">Sarah Volunteer</h2>
                <p className="text-xs text-gray-500">Courier & Harvester</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2.5 bg-emerald-50 rounded-lg border border-emerald-200">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-sm font-medium text-emerald-700">Active</span>
            </div>
          </div>
          
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {volunteerMenuItems.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== "/volunteers" && pathname?.startsWith(item.href))
              return (
                <Link key={item.label} href={item.href}>
                  <div
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all cursor-pointer ${
                      isActive
                        ? "bg-gradient-to-r from-[#0A5D31] to-[#0d7a3f] text-white shadow-sm"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <item.icon className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-500"}`} />
                    <span className="font-medium text-sm">{item.label}</span>
                    {item.label === "Deliveries" && (
                      <Badge className={`ml-auto text-xs ${isActive ? "bg-white text-[#0A5D31]" : "bg-[#0A5D31] text-white"}`}>5</Badge>
                    )}
                    {item.label === "Harvesting" && (
                      <Badge className={`ml-auto text-xs ${isActive ? "bg-white text-[#0A5D31]" : "bg-emerald-500 text-white"}`}>3</Badge>
                    )}
                  </div>
                </Link>
              )
            })}
            <div className="pt-4 mt-4 border-t border-gray-200">
              <p className="text-xs font-medium text-gray-500 uppercase mb-2 px-3">More</p>
              {additionalMenuItems.map((item) => {
                const isActive = pathname === item.href || 
                  (item.href !== "/volunteers" && pathname?.startsWith(item.href))
                return (
                  <Link key={item.label} href={item.href}>
                    <div
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all cursor-pointer ${
                        isActive
                          ? "bg-gradient-to-r from-[#0A5D31] to-[#0d7a3f] text-white shadow-sm"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <item.icon className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-500"}`} />
                      <span className="font-medium text-sm">{item.label}</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </nav>

          {/* Footer Stats */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="grid grid-cols-2 gap-2">
              <div className="text-center p-2 bg-white rounded-lg">
                <p className="text-xs text-gray-500 mb-1">This Week</p>
                <p className="text-sm font-bold text-[#0A5D31]">$356</p>
              </div>
              <div className="text-center p-2 bg-white rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Rating</p>
                <div className="flex items-center justify-center gap-0.5">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <p className="text-sm font-bold text-gray-900">4.8</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <>
            <div 
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <aside className="fixed left-0 top-[73px] w-64 bg-white border-r border-gray-200 h-[calc(100vh-73px)] z-50 lg:hidden overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0A5D31] to-[#0d7a3f] flex items-center justify-center overflow-hidden">
                    <img
                      src="https://cdn.prod.website-files.com/67c12ad0bddda4257ffc4539/67c15cdb77981e22a226bc86_Navbar%20Brand.svg"
                      alt="Logo"
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-semibold text-gray-900 truncate">Sarah Volunteer</h2>
                    <p className="text-xs text-gray-500">Courier & Harvester</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-2.5 bg-emerald-50 rounded-lg border border-emerald-200">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-sm font-medium text-emerald-700">Active</span>
                </div>
              </div>
              <nav className="flex-1 p-4 space-y-1">
                {volunteerMenuItems.map((item) => {
                  const isActive = pathname === item.href || 
                    (item.href !== "/volunteers" && pathname?.startsWith(item.href))
                  return (
                    <Link 
                      key={item.label} 
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <div
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all cursor-pointer ${
                          isActive
                            ? "bg-gradient-to-r from-[#0A5D31] to-[#0d7a3f] text-white shadow-sm"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium text-sm">{item.label}</span>
                        {item.label === "Deliveries" && (
                          <Badge className={`ml-auto text-xs ${isActive ? "bg-white text-[#0A5D31]" : "bg-[#0A5D31] text-white"}`}>5</Badge>
                        )}
                        {item.label === "Harvesting" && (
                          <Badge className={`ml-auto text-xs ${isActive ? "bg-white text-[#0A5D31]" : "bg-emerald-500 text-white"}`}>3</Badge>
                        )}
                      </div>
                    </Link>
                  )
                })}
                <div className="pt-4 mt-4 border-t border-gray-200">
                  <p className="text-xs font-medium text-gray-500 uppercase mb-2 px-3">More</p>
                  {additionalMenuItems.map((item) => {
                    const isActive = pathname === item.href || 
                      (item.href !== "/volunteers" && pathname?.startsWith(item.href))
                    return (
                      <Link 
                        key={item.label} 
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                      >
                        <div
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all cursor-pointer ${
                            isActive
                              ? "bg-gradient-to-r from-[#0A5D31] to-[#0d7a3f] text-white shadow-sm"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium text-sm">{item.label}</span>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </nav>
            </aside>
          </>
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-0 min-h-[calc(100vh-73px)] bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  )
}
