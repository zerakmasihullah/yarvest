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
  FileText
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const courierMenuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/courier" },
  { icon: Package, label: "Deliveries", href: "/courier/deliveries" },
  { icon: DollarSign, label: "Earnings", href: "/courier/earnings" },
  { icon: Star, label: "Reviews", href: "/courier/reviews" },
  { icon: MapPin, label: "Routes", href: "/courier/routes" },
  { icon: BarChart3, label: "Performance", href: "/courier/performance" },
  { icon: User, label: "Profile", href: "/courier/profile" },
  { icon: Settings, label: "Settings", href: "/courier/settings" },
]

const additionalMenuItems = [
  { icon: FileText, label: "Documents", href: "/courier/documents" },
  { icon: HelpCircle, label: "Help & Support", href: "/courier/help" },
]

export default function CourierLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
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
                <h1 className="text-xl font-bold text-gray-900">Courier Dashboard</h1>
                <p className="text-xs text-gray-500">Manage your deliveries</p>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Back to Store
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
        <aside className="hidden lg:flex w-72 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)] flex-col">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center overflow-hidden">
                <img
                  src="https://cdn.prod.website-files.com/67c12ad0bddda4257ffc4539/67c15cdb77981e22a226bc86_Navbar%20Brand.svg"
                  alt="Logo"
                  className="w-full h-full object-contain p-2"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-gray-900 truncate">Mike Driver</h2>
                <p className="text-xs text-gray-500">Courier Account</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-semibold text-emerald-700">Online</span>
            </div>
          </div>
          
          <nav className="flex-1 p-4 space-y-1">
            {courierMenuItems.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== "/courier" && pathname?.startsWith(item.href))
              return (
                <Link key={item.label} href={item.href}>
                  <div
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer group ${
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-600/20"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <item.icon className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-500 group-hover:text-blue-600"}`} />
                    <span className="font-medium">{item.label}</span>
                    {item.label === "Deliveries" && (
                      <Badge className={`ml-auto ${isActive ? "bg-white text-blue-600" : "bg-blue-500 text-white"}`}>5</Badge>
                    )}
                  </div>
                </Link>
              )
            })}
            <div className="pt-4 mt-4 border-t border-gray-200">
              <p className="text-xs font-semibold text-gray-500 uppercase mb-2 px-4">More</p>
              {additionalMenuItems.map((item) => {
                const isActive = pathname === item.href || 
                  (item.href !== "/courier" && pathname?.startsWith(item.href))
                return (
                  <Link key={item.label} href={item.href}>
                    <div
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer group ${
                        isActive
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-600/20"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <item.icon className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-500 group-hover:text-blue-600"}`} />
                      <span className="font-medium">{item.label}</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </nav>
        </aside>

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <>
            <div 
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <aside className="fixed left-0 top-[73px] w-72 bg-white border-r border-gray-200 h-[calc(100vh-73px)] z-50 lg:hidden overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center overflow-hidden">
                    <img
                      src="https://cdn.prod.website-files.com/67c12ad0bddda4257ffc4539/67c15cdb77981e22a226bc86_Navbar%20Brand.svg"
                      alt="Logo"
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-bold text-gray-900 truncate">Mike Driver</h2>
                    <p className="text-xs text-gray-500">Courier Account</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-sm font-semibold text-emerald-700">Online</span>
                </div>
              </div>
              <nav className="flex-1 p-4 space-y-1">
                {courierMenuItems.map((item) => {
                  const isActive = pathname === item.href || 
                    (item.href !== "/courier" && pathname?.startsWith(item.href))
                  return (
                    <Link 
                      key={item.label} 
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <div
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${
                          isActive
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                        {item.label === "Deliveries" && (
                          <Badge className={`ml-auto ${isActive ? "bg-white text-blue-600" : "bg-blue-500 text-white"}`}>5</Badge>
                        )}
                      </div>
                    </Link>
                  )
                })}
                <div className="pt-4 mt-4 border-t border-gray-200">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-2 px-4">More</p>
                  {additionalMenuItems.map((item) => {
                    const isActive = pathname === item.href || 
                      (item.href !== "/courier" && pathname?.startsWith(item.href))
                    return (
                      <Link 
                        key={item.label} 
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                      >
                        <div
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${
                            isActive
                              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.label}</span>
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
        <main className="flex-1 lg:ml-0 min-h-[calc(100vh-73px)]">
          {children}
        </main>
      </div>
    </div>
  )
}

