"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAuthStore } from "@/stores/auth-store"
import api from "@/lib/axios"
import {
  LayoutDashboard,
  User,
  Package,
  ShoppingCart,
  Truck,
  Leaf,
  DollarSign,
  BarChart3,
  Calendar,
  HeartHandshake,
  Building2,
  Award,
  TrendingUp,
  MapPin,
  Settings,
  Bell,
  Menu,
  X,
  Home,
  ShoppingBag,
  Users,
  Store,
  Trophy,
  Users2,
  Gift,
  HelpCircle,
  Newspaper,
  FileText,
  Star,
  MessageSquare,
  Zap,
  LogOut,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn, getImageUrl } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const pathname = usePathname()
  const router = useRouter()
  const user = useAuthStore((state) => state.user)
  const isLoading = useAuthStore((state) => state.isLoading)
  const logout = useAuthStore((state) => state.logout)

  // Get user roles - fetch from API if not available
  const [userRoles, setUserRoles] = useState<string[]>([])
  
  useEffect(() => {
    if (user && !isLoading) {
      // Try to get roles from user object first
      const roles = (user as any).roles?.map((r: any) => r.name) || []
      if (roles.length > 0) {
        setUserRoles(roles)
      } else {
        // Fetch from API if not in user object
        api.get('/user/roles')
          .then((response) => {
            const apiRoles = response.data?.data?.roles?.map((r: any) => r.name) || []
            setUserRoles(apiRoles)
          })
          .catch(() => {
            // Default to buyer if API fails
            setUserRoles(['Buyer'])
          })
      }
    }
  }, [user, isLoading])

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/')
    }
  }, [user, isLoading, router])

  const hasBuyer = userRoles.some((r: string) => r.toLowerCase() === 'buyer')
  const hasSeller = userRoles.some((r: string) => r.toLowerCase() === 'seller')
  const hasHelper = userRoles.some((r: string) => r.toLowerCase() === 'helper')
  const hasCourier = userRoles.some((r: string) => r.toLowerCase() === 'courier')

  // Dashboard menu items - all content in sidebar
  type MenuItem = {
    icon: any
    label: string
    href: string
    section: string
  }
  
  const allMenuItems: MenuItem[] = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard", section: "main" },
    { icon: User, label: "Profile", href: "/profile", section: "main" },
  ]

  // Buyer menu items
  if (hasBuyer) {
    allMenuItems.push(
      { icon: ShoppingCart, label: "My Orders", href: "/cart", section: "buyer" },
      { icon: HeartHandshake, label: "Favorites", href: "/favorites", section: "buyer" }
    )
  }

  // Seller menu items
  if (hasSeller) {
    allMenuItems.push(
      { icon: LayoutDashboard, label: "Admin Dashboard", href: "/admin", section: "seller" },
      { icon: Package, label: "Products", href: "/admin/products", section: "seller" },
      { icon: ShoppingCart, label: "Orders", href: "/admin/orders", section: "seller" },
      { icon: Leaf, label: "Harvest Requests", href: "/admin/harvest-requests", section: "seller" },
      { icon: Truck, label: "Deliveries", href: "/admin/deliveries", section: "seller" },
      { icon: BarChart3, label: "Analytics", href: "/admin/analytics", section: "seller" },
      { icon: Zap, label: "Promotions", href: "/admin/promotions", section: "seller" },
      { icon: MessageSquare, label: "Community", href: "/admin/community", section: "seller" },
      { icon: User, label: "Admin Profile", href: "/admin/profile", section: "seller" },
      { icon: Settings, label: "Admin Settings", href: "/admin/settings", section: "seller" }
    )
  }

  // Helper menu items
  if (hasHelper) {
    allMenuItems.push(
      { icon: LayoutDashboard, label: "Volunteer Dashboard", href: "/volunteers", section: "helper" },
      { icon: Leaf, label: "Harvesting", href: "/volunteers/harvesting", section: "helper" },
      { icon: Calendar, label: "Schedule", href: "/volunteers/schedule", section: "helper" },
      { icon: Award, label: "Impact", href: "/volunteers/impact", section: "helper" },
      { icon: DollarSign, label: "Earnings", href: "/volunteers/earnings", section: "helper" },
      { icon: Truck, label: "Deliveries", href: "/volunteers/deliveries", section: "helper" },
      { icon: MapPin, label: "Routes", href: "/volunteers/routes", section: "helper" },
      { icon: TrendingUp, label: "Performance", href: "/volunteers/performance", section: "helper" },
      { icon: Star, label: "Reviews", href: "/volunteers/reviews", section: "helper" },
      { icon: FileText, label: "Documents", href: "/volunteers/documents", section: "helper" },
      { icon: User, label: "Volunteer Profile", href: "/volunteers/profile", section: "helper" },
      { icon: HelpCircle, label: "Help", href: "/volunteers/help", section: "helper" },
      { icon: Settings, label: "Volunteer Settings", href: "/volunteers/settings", section: "helper" }
    )
  }

  // Courier menu items
  if (hasCourier) {
    allMenuItems.push(
      { icon: LayoutDashboard, label: "Courier Dashboard", href: "/courier", section: "courier" },
      { icon: Truck, label: "Deliveries", href: "/courier/deliveries", section: "courier" },
      { icon: MapPin, label: "Routes", href: "/courier/routes", section: "courier" },
      { icon: DollarSign, label: "Earnings", href: "/courier/earnings", section: "courier" },
      { icon: TrendingUp, label: "Performance", href: "/courier/performance", section: "courier" },
      { icon: Star, label: "Reviews", href: "/courier/reviews", section: "courier" },
      { icon: FileText, label: "Documents", href: "/courier/documents", section: "courier" },
      { icon: User, label: "Courier Profile", href: "/courier/profile", section: "courier" },
      { icon: HelpCircle, label: "Help & Support", href: "/courier/help", section: "courier" },
      { icon: Settings, label: "Courier Settings", href: "/courier/settings", section: "courier" }
    )
  }

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  if (isLoading) {
    return (
      <div className="flex flex-col h-screen bg-background">
        <main className="flex-1 overflow-auto flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-4 border-[#0A5D31] border-t-transparent rounded-full animate-spin" />
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </main>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden">
      {/* Header */}
      <header className="bg-white border-b border-gray-200/50 z-40 sticky top-0 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 md:px-6 h-16">
          {/* Left: Logo and sidebar toggle */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="h-9 w-9 hover:bg-gray-100"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </Button>
            <Link href="/dashboard" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
              <img
                src="https://cdn.prod.website-files.com/67c12ad0bddda4257ffc4539/67c15cdb77981e22a226bc86_Navbar%20Brand.svg"
                alt="Yarvest"
                className="h-8"
              />
            </Link>
          </div>

          {/* Center: Search */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search ⌘K"
                className="pl-10 pr-4 h-9 bg-gray-50/50 border-gray-200 focus:bg-white focus:border-[#0A5D31] focus:ring-1 focus:ring-[#0A5D31] rounded-lg text-sm"
              />
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-gray-100 relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 px-2 h-9 hover:bg-gray-100">
                  <div className="relative">
                    {(user as any)?.profile_picture || user?.image ? (
                      <img
                        src={getImageUrl((user as any).profile_picture || user.image)}
                        alt={user?.first_name || 'User'}
                        className="w-8 h-8 rounded-full ring-2 ring-white object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0A5D31] to-[#0d7a3f] flex items-center justify-center text-white text-sm font-semibold ring-2 ring-white">
                        {user?.first_name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
                      </div>
                    )}
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="flex items-center cursor-pointer">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/" className="flex items-center cursor-pointer">
                    <Home className="mr-2 h-4 w-4" />
                    Home
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={cn(
            "bg-gray-50/50 border-r border-gray-200/50 transition-all duration-300 ease-in-out z-30",
            sidebarOpen ? "w-64" : "w-0 md:w-20",
            "hidden md:block"
          )}
        >
          <div className="h-full flex flex-col overflow-hidden">
            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
              {sidebarOpen ? (
                <>
                  {/* Main Section */}
                  <div className="mb-6">
                    <div className="space-y-0.5">
                      {allMenuItems.filter(item => item.section === "main").map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(item.href))
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                              "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group relative",
                              isActive
                                ? "bg-gradient-to-r from-[#0A5D31] to-[#0d7a3f] text-white shadow-md"
                                : "text-gray-700 hover:bg-gray-100"
                            )}
                          >
                            {isActive && (
                              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-full"></div>
                            )}
                            <Icon className={cn("w-5 h-5 flex-shrink-0 relative z-10", isActive ? "text-white" : "text-gray-500")} />
                            <span className="text-sm font-medium relative z-10">{item.label}</span>
                          </Link>
                        )
                      })}
                    </div>
                  </div>

                  {/* Buyer Section */}
                  {hasBuyer && (
                    <div className="mb-6">
                      <div className="relative mb-4">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center">
                          <span className="bg-gray-50/50 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Buyer</span>
                        </div>
                      </div>
                      <div className="space-y-0.5">
                        {allMenuItems.filter(item => item.section === "buyer").map((item) => {
                          const Icon = item.icon
                          const isActive = pathname === item.href || pathname?.startsWith(item.href)
                            return (
                              <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group relative",
                                  isActive
                                    ? "bg-gradient-to-r from-[#0A5D31] to-[#0d7a3f] text-white shadow-md"
                                    : "text-gray-700 hover:bg-gray-100"
                                )}
                              >
                                {isActive && (
                                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-full"></div>
                                )}
                                <Icon className={cn("w-5 h-5 flex-shrink-0 relative z-10", isActive ? "text-white" : "text-gray-500")} />
                                <span className="text-sm font-medium relative z-10">{item.label}</span>
                              </Link>
                            )
                        })}
                      </div>
                    </div>
                  )}

                  {/* Seller Section */}
                  {hasSeller && (
                    <div className="mb-6">
                      <div className="relative mb-4">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center">
                          <span className="bg-gray-50/50 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Seller</span>
                        </div>
                      </div>
                      <div className="space-y-0.5">
                        {allMenuItems.filter(item => item.section === "seller").map((item) => {
                          const Icon = item.icon
                          const isActive = pathname === item.href || pathname?.startsWith(item.href)
                            return (
                              <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group relative",
                                  isActive
                                    ? "bg-gradient-to-r from-[#0A5D31] to-[#0d7a3f] text-white shadow-md"
                                    : "text-gray-700 hover:bg-gray-100"
                                )}
                              >
                                {isActive && (
                                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-full"></div>
                                )}
                                <Icon className={cn("w-5 h-5 flex-shrink-0 relative z-10", isActive ? "text-white" : "text-gray-500")} />
                                <span className="text-sm font-medium relative z-10">{item.label}</span>
                              </Link>
                            )
                        })}
                      </div>
                    </div>
                  )}

                  {/* Helper Section */}
                  {hasHelper && (
                    <div className="mb-6">
                      <div className="relative mb-4">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center">
                          <span className="bg-gray-50/50 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Helper</span>
                        </div>
                      </div>
                      <div className="space-y-0.5">
                        {allMenuItems.filter(item => item.section === "helper").map((item) => {
                          const Icon = item.icon
                          const isActive = pathname === item.href || pathname?.startsWith(item.href)
                            return (
                              <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group relative",
                                  isActive
                                    ? "bg-gradient-to-r from-[#0A5D31] to-[#0d7a3f] text-white shadow-md"
                                    : "text-gray-700 hover:bg-gray-100"
                                )}
                              >
                                {isActive && (
                                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-full"></div>
                                )}
                                <Icon className={cn("w-5 h-5 flex-shrink-0 relative z-10", isActive ? "text-white" : "text-gray-500")} />
                                <span className="text-sm font-medium relative z-10">{item.label}</span>
                              </Link>
                            )
                        })}
                      </div>
                    </div>
                  )}

                  {/* Courier Section */}
                  {hasCourier && (
                    <div className="mb-6">
                      <div className="relative mb-4">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center">
                          <span className="bg-gray-50/50 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Courier</span>
                        </div>
                      </div>
                      <div className="space-y-0.5">
                        {allMenuItems.filter(item => item.section === "courier").map((item) => {
                          const Icon = item.icon
                          const isActive = pathname === item.href || pathname?.startsWith(item.href)
                            return (
                              <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group relative",
                                  isActive
                                    ? "bg-gradient-to-r from-[#0A5D31] to-[#0d7a3f] text-white shadow-md"
                                    : "text-gray-700 hover:bg-gray-100"
                                )}
                              >
                                {isActive && (
                                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-full"></div>
                                )}
                                <Icon className={cn("w-5 h-5 flex-shrink-0 relative z-10", isActive ? "text-white" : "text-gray-500")} />
                                <span className="text-sm font-medium relative z-10">{item.label}</span>
                              </Link>
                            )
                        })}
                      </div>
                    </div>
                  )}

                  {/* Common Pages Section */}
                  <div className="mb-6">
                    <div className="relative mb-4">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                      </div>
                      <div className="relative flex justify-center">
                        <span className="bg-gray-50/50 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Explore</span>
                      </div>
                    </div>
                    <div className="space-y-0.5">
                      {allMenuItems.filter(item => item.section === "common").map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href || pathname?.startsWith(item.href)
                            return (
                              <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group relative",
                                  isActive
                                    ? "bg-gradient-to-r from-[#0A5D31] to-[#0d7a3f] text-white shadow-md"
                                    : "text-gray-700 hover:bg-gray-100"
                                )}
                              >
                                {isActive && (
                                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-full"></div>
                                )}
                                <Icon className={cn("w-5 h-5 flex-shrink-0 relative z-10", isActive ? "text-white" : "text-gray-500")} />
                                <span className="text-sm font-medium relative z-10">{item.label}</span>
                              </Link>
                            )
                      })}
                    </div>
                  </div>
                </>
              ) : (
                // Collapsed sidebar - show only icons
                <div className="flex flex-col items-center gap-1 p-2">
                  {allMenuItems.slice(0, 10).map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href || pathname?.startsWith(item.href)
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200",
                          isActive
                            ? "bg-gradient-to-br from-[#0A5D31] to-[#0d7a3f] text-white shadow-md"
                            : "text-gray-700 hover:bg-gray-100"
                        )}
                        title={item.label}
                      >
                        <Icon className={cn("w-5 h-5", isActive ? "text-white" : "text-gray-500")} />
                      </Link>
                    )
                  })}
                </div>
              )}
            </nav>

          </div>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Mobile Sidebar */}
        <aside
          className={cn(
            "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 z-30 transition-transform duration-300 ease-in-out md:hidden",
            sidebarOpen ? "translate-x-0 w-64" : "-translate-x-full"
          )}
        >
          <div className="h-full flex flex-col overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <Link href="/dashboard" className="flex items-center">
                <img
                  src="https://cdn.prod.website-files.com/67c12ad0bddda4257ffc4539/67c15cdb77981e22a226bc86_Navbar%20Brand.svg"
                  alt="Yarvest"
                  className="h-7"
                />
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <nav className="flex-1 overflow-y-auto p-4 space-y-2">
              {/* Main Section */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-2 px-2">Main</p>
                {allMenuItems.filter(item => item.section === "main").map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 relative mb-1",
                        isActive
                          ? "bg-gradient-to-r from-[#0A5D31] to-[#0d7a3f] text-white shadow-md"
                          : "text-gray-700 hover:bg-gray-100"
                      )}
                    >
                      {isActive && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-full"></div>
                      )}
                      <Icon className={cn("w-5 h-5 flex-shrink-0 relative z-10", isActive ? "text-white" : "text-gray-500")} />
                      <span className="text-sm font-medium relative z-10">{item.label}</span>
                    </Link>
                  )
                })}
              </div>

              {/* Buyer Section */}
              {hasBuyer && (
                <div className="mb-6">
                  <p className="text-xs font-semibold text-gray-400 uppercase mb-3 px-3 tracking-wider">Buyer</p>
                  <div className="space-y-1">
                    {allMenuItems.filter(item => item.section === "buyer").map((item) => {
                      const Icon = item.icon
                      const isActive = pathname === item.href || pathname?.startsWith(item.href)
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setSidebarOpen(false)}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 relative",
                            isActive
                              ? "bg-gradient-to-r from-[#0A5D31] to-[#0d7a3f] text-white shadow-md"
                              : "text-gray-700 hover:bg-gray-100"
                          )}
                        >
                          {isActive && (
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-full"></div>
                          )}
                          <Icon className={cn("w-5 h-5 flex-shrink-0 relative z-10", isActive ? "text-white" : "text-gray-500")} />
                          <span className="text-sm font-medium relative z-10">{item.label}</span>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Seller Section */}
              {hasSeller && (
                <div className="mb-6">
                  <p className="text-xs font-semibold text-gray-400 uppercase mb-3 px-3 tracking-wider">Seller</p>
                  <div className="space-y-1">
                    {allMenuItems.filter(item => item.section === "seller").map((item) => {
                      const Icon = item.icon
                      const isActive = pathname === item.href || pathname?.startsWith(item.href)
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setSidebarOpen(false)}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 relative",
                            isActive
                              ? "bg-gradient-to-r from-[#0A5D31] to-[#0d7a3f] text-white shadow-md"
                              : "text-gray-700 hover:bg-gray-100"
                          )}
                        >
                          {isActive && (
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-full"></div>
                          )}
                          <Icon className={cn("w-5 h-5 flex-shrink-0 relative z-10", isActive ? "text-white" : "text-gray-500")} />
                          <span className="text-sm font-medium relative z-10">{item.label}</span>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Helper Section */}
              {hasHelper && (
                <div className="mb-6">
                  <p className="text-xs font-semibold text-gray-400 uppercase mb-3 px-3 tracking-wider">Helper</p>
                  <div className="space-y-1">
                    {allMenuItems.filter(item => item.section === "helper").map((item) => {
                      const Icon = item.icon
                      const isActive = pathname === item.href || pathname?.startsWith(item.href)
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setSidebarOpen(false)}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 relative",
                            isActive
                              ? "bg-gradient-to-r from-[#0A5D31] to-[#0d7a3f] text-white shadow-md"
                              : "text-gray-700 hover:bg-gray-100"
                          )}
                        >
                          {isActive && (
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-full"></div>
                          )}
                          <Icon className={cn("w-5 h-5 flex-shrink-0 relative z-10", isActive ? "text-white" : "text-gray-500")} />
                          <span className="text-sm font-medium relative z-10">{item.label}</span>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Courier Section */}
              {hasCourier && (
                <div className="mb-6">
                  <p className="text-xs font-semibold text-gray-400 uppercase mb-3 px-3 tracking-wider">Courier</p>
                  <div className="space-y-1">
                    {allMenuItems.filter(item => item.section === "courier").map((item) => {
                      const Icon = item.icon
                      const isActive = pathname === item.href || pathname?.startsWith(item.href)
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setSidebarOpen(false)}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 relative",
                            isActive
                              ? "bg-gradient-to-r from-[#0A5D31] to-[#0d7a3f] text-white shadow-md"
                              : "text-gray-700 hover:bg-gray-100"
                          )}
                        >
                          {isActive && (
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-full"></div>
                          )}
                          <Icon className={cn("w-5 h-5 flex-shrink-0 relative z-10", isActive ? "text-white" : "text-gray-500")} />
                          <span className="text-sm font-medium relative z-10">{item.label}</span>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Common Pages Section */}
              <div className="mb-6">
                <p className="text-xs font-semibold text-gray-400 uppercase mb-3 px-3 tracking-wider">Explore</p>
                <div className="space-y-1">
                  {allMenuItems.filter(item => item.section === "common").map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href || pathname?.startsWith(item.href)
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                          isActive
                            ? "bg-[#0A5D31] text-white shadow-sm"
                            : "text-gray-700 hover:bg-gray-50 hover:text-[#0A5D31]"
                        )}
                      >
                        <Icon className={cn("w-5 h-5 flex-shrink-0", isActive ? "text-white" : "text-gray-500 group-hover:text-[#0A5D31]")} />
                        <span className="text-sm font-medium">{item.label}</span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </nav>

          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-[#ffffff]">
          {children}
        </main>
      </div>
    </div>
  )
}

