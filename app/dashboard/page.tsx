"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuthStore } from "@/stores/auth-store"
import { useRouter } from "next/navigation"
import Link from "next/link"
import api from "@/lib/axios"
import {
  Package,
  ShoppingCart,
  Truck,
  Users,
  Leaf,
  DollarSign,
  BarChart3,
  Calendar,
  HeartHandshake,
  Building2,
  Award,
  TrendingUp,
  ArrowRight,
  Settings,
  User,
  MapPin,
  Clock,
  CheckCircle2,
  Loader2,
} from "lucide-react"

export default function UnifiedDashboard() {
  const user = useAuthStore((state) => state.user)
  const isLoading = useAuthStore((state) => state.isLoading)
  const router = useRouter()
  const [userRoles, setUserRoles] = useState<string[]>([])
  const [loadingRoles, setLoadingRoles] = useState(true)

  useEffect(() => {
    // Wait for auth to initialize
    if (isLoading) {
      return
    }

    if (!user) {
      router.push("/")
      return
    }
    
    // Fetch user roles from API
    const fetchUserRoles = async () => {
      try {
        setLoadingRoles(true)
        const response = await api.get('/user/roles')
        // Handle different response structures
        const rolesData = response.data?.data?.roles || response.data?.roles || []
        const roles = Array.isArray(rolesData) 
          ? rolesData.map((r: any) => r.name || r) 
          : []
        setUserRoles(roles)
      } catch (error: any) {
        console.error('Error fetching roles:', error)
        // If API fails, try to get roles from user object if available
        if (user && (user as any).roles) {
          const roles = Array.isArray((user as any).roles)
            ? (user as any).roles.map((r: any) => r.name || r)
            : []
          setUserRoles(roles)
        }
      } finally {
        setLoadingRoles(false)
      }
    }
    
    fetchUserRoles()
  }, [user, router, isLoading])

  // Show loading state while auth initializes
  if (isLoading || loadingRoles) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-[#0A5D31]" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Please log in to access the dashboard.</p>
      </div>
    )
  }

  const hasRole = (roleName: string) => {
    return userRoles.some(r => r.toLowerCase() === roleName.toLowerCase())
  }

  const hasBuyer = hasRole("Buyer")
  const hasSeller = hasRole("Seller")
  const hasHelper = hasRole("Helper")
  const hasCourier = hasRole("Courier")

  // Buyer sections
  const buyerSections = [
    {
      icon: ShoppingCart,
      title: "My Orders",
      description: "View and track your orders",
      href: "/cart",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      icon: HeartHandshake,
      title: "Favorites",
      description: "Your saved products",
      href: "/favorites",
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
    },
    {
      icon: User,
      title: "Profile",
      description: "Manage your account",
      href: "/profile",
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
    },
  ]

  // Seller sections
  const sellerSections = [
    {
      icon: Package,
      title: "Products",
      description: "Manage your products",
      href: "/admin/products",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    },
    {
      icon: ShoppingCart,
      title: "Orders",
      description: "View customer orders",
      href: "/admin/orders",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      icon: BarChart3,
      title: "Analytics",
      description: "Sales and performance",
      href: "/admin/analytics",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      icon: Leaf,
      title: "Harvest Requests",
      description: "Manage harvest requests",
      href: "/admin/harvest-requests",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
    },
  ]

  // Helper/Volunteer sections
  const helperSections = [
    {
      icon: Leaf,
      title: "Harvesting Tasks",
      description: "View available harvesting tasks",
      href: "/volunteers/harvesting",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      icon: Calendar,
      title: "Schedule",
      description: "Manage your availability",
      href: "/volunteers/schedule",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      icon: Award,
      title: "Impact & Rewards",
      description: "Track your community impact",
      href: "/volunteers/impact",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
    },
    {
      icon: DollarSign,
      title: "Earnings",
      description: "View your earnings",
      href: "/volunteers/earnings",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
    },
  ]

  // Courier sections
  const courierSections = [
    {
      icon: Truck,
      title: "Deliveries",
      description: "Manage delivery routes",
      href: "/courier/deliveries",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      icon: MapPin,
      title: "Routes",
      description: "View delivery routes",
      href: "/courier/routes",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    },
    {
      icon: DollarSign,
      title: "Earnings",
      description: "Track your earnings",
      href: "/courier/earnings",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      icon: TrendingUp,
      title: "Performance",
      description: "View performance metrics",
      href: "/courier/performance",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
    },
  ]

  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Dashboard</h1>
        <p className="text-gray-600 mb-6">Select an option from the sidebar to get started.</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {hasBuyer && (
            <Badge className="bg-blue-100 text-blue-800 border-blue-200">
              <HeartHandshake className="w-3 h-3 mr-1" />
              Buyer
            </Badge>
          )}
          {hasSeller && (
            <Badge className="bg-purple-100 text-purple-800 border-purple-200">
              <Building2 className="w-3 h-3 mr-1" />
              Seller
            </Badge>
          )}
          {hasHelper && (
            <Badge className="bg-green-100 text-green-800 border-green-200">
              <Award className="w-3 h-3 mr-1" />
              Helper
            </Badge>
          )}
          {hasCourier && (
            <Badge className="bg-orange-100 text-orange-800 border-orange-200">
              <Truck className="w-3 h-3 mr-1" />
              Courier
            </Badge>
          )}
        </div>
      </div>
    </div>
  )
}

