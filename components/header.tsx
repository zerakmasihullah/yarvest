"use client"

import { Menu, Search, ShoppingCart, MapPin, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useState } from "react"
import { LocationModal } from "@/components/location-modal"

interface HeaderProps {
  toggleSidebar?: () => void
}

export function Header({ toggleSidebar }: HeaderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [deliveryAddress, setDeliveryAddress] = useState("1100 Victory Lane, San Francisco, CA 94102")
  const [locationModalOpen, setLocationModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 w-full">
        <div className="flex items-center justify-between px-6 py-5 gap-6 max-w-full">
          {/* Menu & Logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
              <img
                src="https://cdn.prod.website-files.com/67c12ad0bddda4257ffc4539/67c15cdb77981e22a226bc86_Navbar%20Brand.svg"
                alt="Yarvest"
                className="h-10"
              />
            </Link>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-5xl">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 w-7 h-7 text-gray-500 z-10" />
              <Input
                type="text"
                placeholder="Search products, stores, and recipes"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchQuery.trim()) {
                    window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`
                  }
                }}
                className="w-full pl-16 pr-8 py-6 text-lg bg-white border border-gray-300 rounded-full text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0A5D31] focus:border-[#0A5D31] shadow-sm hover:border-gray-400 transition-all"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <Link href="/community" className="hidden md:flex items-center gap-2 hover:bg-gray-100 rounded-lg px-3 py-2">
              <span className="text-sm text-gray-900 font-medium">Community</span>
            </Link>
            <button
              className="hidden md:flex items-center gap-2 hover:bg-gray-100 rounded-lg px-3 py-2"
              onClick={() => setLocationModalOpen(true)}
            >
              <MapPin className="w-5 h-5 text-gray-700" />
              <span className="text-sm text-gray-900">{deliveryAddress.split(",")[0]}</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>
            <Link href="/cart" className="flex items-center gap-2 hover:bg-gray-100 rounded-lg px-3 py-2">
              <ShoppingCart className="w-5 h-5 text-gray-900" />
              <span className="text-sm text-gray-900">0</span>
            </Link>
          </div>
        </div>
      </header>

    <LocationModal
      open={locationModalOpen}
      onOpenChange={setLocationModalOpen}
      currentAddress={deliveryAddress}
      onAddressChange={setDeliveryAddress}
    />
    </>
  )
}
