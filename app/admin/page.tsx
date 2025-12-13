"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Package, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Plus,
  Leaf,
  Truck,
  Users,
  Activity,
  MoreVertical
} from "lucide-react"
import Link from "next/link"

const stats = [
  {
    title: "Total Revenue",
    value: "$12,450",
    change: "+23%",
    trend: "up",
    icon: DollarSign,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
  },
  {
    title: "Total Orders",
    value: "342",
    change: "+8%",
    trend: "up",
    icon: ShoppingCart,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    title: "Total Products",
    value: "124",
    change: "+12%",
    trend: "up",
    icon: Package,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
  {
    title: "Active Customers",
    value: "1,234",
    change: "+15%",
    trend: "up",
    icon: Users,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
  },
]

const recentOrders = [
  { id: "ORD-001", customer: "John Doe", product: "Organic Tomatoes", amount: "$24.99", status: "pending", date: "2 hours ago" },
  { id: "ORD-002", customer: "Jane Smith", product: "Fresh Carrots", amount: "$15.50", status: "processing", date: "5 hours ago" },
  { id: "ORD-003", customer: "Mike Johnson", product: "Organic Lettuce", amount: "$12.99", status: "shipped", date: "1 day ago" },
  { id: "ORD-004", customer: "Sarah Williams", product: "Sweet Apples", amount: "$29.99", status: "delivered", date: "2 days ago" },
]

const topProducts = [
  { name: "Organic Heirloom Tomatoes", sales: 156, revenue: "$778.44", growth: "+12%", image: "https://images.unsplash.com/photo-1592924357228-91a8676d3a88?w=100&h=100&fit=crop" },
  { name: "Fresh Local Carrots", sales: 142, revenue: "$424.58", growth: "+8%", image: "https://images.unsplash.com/photo-1599599810694-b5ac4dd64b51?w=100&h=100&fit=crop" },
  { name: "Sweet Local Apples", sales: 128, revenue: "$766.72", growth: "+15%", image: "https://images.unsplash.com/photo-1560806887-1e4cd0b27c8a?w=100&h=100&fit=crop" },
  { name: "Crisp Organic Lettuce", sales: 98, revenue: "$342.02", growth: "+5%", image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=100&h=100&fit=crop" },
]

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  processing: "bg-blue-100 text-blue-800 border-blue-200",
  shipped: "bg-purple-100 text-purple-800 border-purple-200",
  delivered: "bg-emerald-100 text-emerald-800 border-emerald-200",
}

export default function AdminDashboard() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your store today.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Eye className="w-4 h-4" />
            View Store
          </Button>
          <Button className="bg-gradient-to-r from-[#5a9c3a] to-[#0d7a3f] hover:from-[#0d7a3f] hover:to-[#5a9c3a] text-white gap-2 shadow-lg" asChild>
            <Link href="/admin/products">
              <Plus className="w-4 h-4" />
              Add Product
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-2xl ${stat.bgColor} group-hover:scale-110 transition-transform`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className={`flex items-center gap-1 text-sm font-semibold px-2 py-1 rounded-full ${
                  stat.trend === "up" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                }`}>
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                  {stat.change}
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-600 font-medium">{stat.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <Card className="lg:col-span-2 shadow-sm">
          <CardHeader className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold">Recent Orders</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/orders" className="text-[#5a9c3a] hover:text-[#0d7a3f]">
                  View All
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              {recentOrders.map((order) => (
                <div key={order.id} className="p-5 hover:bg-gray-50 transition-colors cursor-pointer group">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono font-semibold text-gray-900">{order.id}</span>
                        <Badge className={`${statusColors[order.status as keyof typeof statusColors]} border`}>
                          {order.status}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium text-gray-900 mb-1">{order.customer}</p>
                      <p className="text-sm text-gray-600">{order.product}</p>
                      <p className="text-xs text-gray-500 mt-1">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900 mb-1">{order.amount}</p>
                      <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="shadow-sm">
          <CardHeader className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <CardTitle className="text-xl font-bold">Top Products</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              {topProducts.map((product, index) => (
                <div key={product.name} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-6 h-6 rounded-full bg-gradient-to-br from-[#5a9c3a] to-[#0d7a3f] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                          {index + 1}
                        </span>
                        <p className="font-semibold text-gray-900 truncate">{product.name}</p>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="text-gray-600">{product.sales} sales</span>
                        <span className="text-gray-400">•</span>
                        <span className="font-bold text-[#5a9c3a]">{product.revenue}</span>
                      </div>
                    </div>
                    <Badge className="bg-emerald-50 text-emerald-600 border-emerald-200">
                      {product.growth}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-sm bg-[#ffffff]">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto flex-col gap-3 py-6 border-2 hover:border-[#5a9c3a] hover:bg-[#5a9c3a]/5 transition-all" asChild>
              <Link href="/admin/products">
                <Package className="w-8 h-8 text-[#5a9c3a]" />
                <span className="font-semibold">Manage Products</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-3 py-6 border-2 hover:border-[#5a9c3a] hover:bg-[#5a9c3a]/5 transition-all" asChild>
              <Link href="/admin/orders">
                <ShoppingCart className="w-8 h-8 text-[#5a9c3a]" />
                <span className="font-semibold">View Orders</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-3 py-6 border-2 hover:border-[#5a9c3a] hover:bg-[#5a9c3a]/5 transition-all" asChild>
              <Link href="/admin/harvest-requests">
                <Leaf className="w-8 h-8 text-[#5a9c3a]" />
                <span className="font-semibold">Harvest Requests</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-3 py-6 border-2 hover:border-[#5a9c3a] hover:bg-[#5a9c3a]/5 transition-all" asChild>
              <Link href="/admin/deliveries">
                <Truck className="w-8 h-8 text-[#5a9c3a]" />
                <span className="font-semibold">Track Deliveries</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
