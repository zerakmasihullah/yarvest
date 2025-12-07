"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  ShoppingBag,
  Store,
  Heart,
  Truck,
  Package,
  Users,
  Calendar,
  Gift,
  Newspaper,
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

const sections = [
  { icon: ShoppingBag, label: "Products", href: "/admin/super-admin/products", count: 124 },
  { icon: Store, label: "Shops", href: "/admin/super-admin/shops", count: 45 },
  { icon: ShoppingCart, label: "Orders", href: "/admin/super-admin/orders", count: 342 },
  { icon: CreditCard, label: "Payments", href: "/admin/super-admin/payments", count: 298 },
  { icon: User, label: "Users", href: "/admin/super-admin/users", count: 1250 },
  { icon: Heart, label: "Donations", href: "/admin/super-admin/donations", count: 12 },
  { icon: Truck, label: "Validators", href: "/admin/super-admin/validators", count: 28 },
  { icon: Package, label: "Harvesting Products", href: "/admin/super-admin/harvesting-products", count: 67 },
  { icon: Package, label: "Harvesters", href: "/admin/super-admin/harvesters", count: 45 },
  { icon: Users, label: "Producers", href: "/admin/super-admin/producers", count: 89 },
  { icon: Calendar, label: "Events", href: "/admin/super-admin/events", count: 15 },
  { icon: Gift, label: "Gift Cards", href: "/admin/super-admin/gift-cards", count: 234 },
  { icon: Newspaper, label: "News", href: "/admin/super-admin/news", count: 42 },
  { icon: Users2, label: "Community", href: "/admin/super-admin/community", count: 1250 },
  { icon: Trophy, label: "Leaderboard", href: "/admin/super-admin/leaderboard", count: 500 },
  { icon: Star, label: "Reviews", href: "/admin/super-admin/reviews", count: 856 },
  { icon: Folder, label: "Categories", href: "/admin/super-admin/categories", count: 15 },
  { icon: Ticket, label: "Coupons", href: "/admin/super-admin/coupons", count: 24 },
  { icon: Truck, label: "Deliveries", href: "/admin/super-admin/deliveries", count: 189 },
  { icon: HelpCircle, label: "Help Center", href: "/admin/super-admin/help", count: 38 },
]

export default function SuperAdminDashboard() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Super Admin Dashboard</h1>
        <p className="text-gray-600">Manage all platform content and settings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sections.map((section) => (
          <Link key={section.label} href={section.href}>
            <Card className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-[#0A5D31]">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-[#0A5D31]/10 flex items-center justify-center">
                    <section.icon className="w-6 h-6 text-[#0A5D31]" />
                  </div>
                  <span className="text-2xl font-bold text-[#0A5D31]">{section.count}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{section.label}</h3>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
