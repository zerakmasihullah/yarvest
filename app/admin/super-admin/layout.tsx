"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Zap,
  ShoppingBag,
  Store,
  Heart,
  Truck,
  Package,
  Users,
  Calendar,
  Gift,
  Newspaper,
  Settings,
  Menu,
  X,
  LogOut,
  Home,
  Users2,
  Trophy,
  HelpCircle,
  ShoppingCart,
  CreditCard,
  User,
  Star,
  Folder,
  Ticket
} from "lucide-react"
import { Button } from "@/components/ui/button"

const menuItems = [
  { icon: ShoppingBag, label: "Products", href: "/admin/super-admin/products" },
  { icon: Store, label: "Shops", href: "/admin/super-admin/shops" },
  { icon: ShoppingCart, label: "Orders", href: "/admin/super-admin/orders" },
  { icon: CreditCard, label: "Payments", href: "/admin/super-admin/payments" },
  { icon: User, label: "Users", href: "/admin/super-admin/users" },
  { icon: Heart, label: "Donations", href: "/admin/super-admin/donations" },
  { icon: Truck, label: "Validators", href: "/admin/super-admin/validators" },
  { icon: Package, label: "Harvesting Products", href: "/admin/super-admin/harvesting-products" },
  { icon: Package, label: "Harvesters", href: "/admin/super-admin/harvesters" },
  { icon: Users, label: "Producers", href: "/admin/super-admin/producers" },
  { icon: Calendar, label: "Events", href: "/admin/super-admin/events" },
  { icon: Gift, label: "Gift Cards", href: "/admin/super-admin/gift-cards" },
  { icon: Newspaper, label: "News", href: "/admin/super-admin/news" },
  { icon: Users2, label: "Community", href: "/admin/super-admin/community" },
  { icon: Trophy, label: "Leaderboard", href: "/admin/super-admin/leaderboard" },
  { icon: Star, label: "Reviews", href: "/admin/super-admin/reviews" },
  { icon: Folder, label: "Categories", href: "/admin/super-admin/categories" },
  { icon: Ticket, label: "Coupons", href: "/admin/super-admin/coupons" },
  { icon: Truck, label: "Deliveries", href: "/admin/super-admin/deliveries" },
  { icon: HelpCircle, label: "Help Center", href: "/admin/super-admin/help" },
]

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
            <Link href="/admin/super-admin" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#0A5D31] flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="hidden md:block">
                <h1 className="text-xl font-bold text-gray-900">Super Admin</h1>
                <p className="text-xs text-gray-500">Complete Control Panel</p>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                View Site
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
        {/* Sidebar */}
        <aside className="hidden lg:flex w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)] flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">Manage</h2>
          </div>
          
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            <Link
              href="/admin/super-admin"
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all mb-2 ${
                pathname === "/admin/super-admin"
                  ? "bg-[#0A5D31] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Zap className="w-5 h-5" />
              <span className="font-medium text-sm">Dashboard</span>
            </Link>
            {menuItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
                    isActive
                      ? "bg-[#0A5D31] text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium text-sm">{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </aside>

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <>
            <div 
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <aside className="fixed left-0 top-[73px] w-64 bg-white border-r border-gray-200 h-[calc(100vh-73px)] z-50 lg:hidden overflow-y-auto">
              <nav className="flex-1 p-4 space-y-1">
                <Link
                  href="/admin/super-admin"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 mb-2"
                >
                  <Zap className="w-5 h-5" />
                  <span className="font-medium text-sm">Dashboard</span>
                </Link>
                {menuItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium text-sm">{item.label}</span>
                  </Link>
                ))}
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
