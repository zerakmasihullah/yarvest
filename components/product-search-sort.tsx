"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface ProductSearchSortProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  sortBy: string
  onSortChange: (sort: string) => void
  placeholder?: string
}

export function ProductSearchSort({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  placeholder = "Search products...",
}: ProductSearchSortProps) {
  return (
    <div className="flex items-center gap-3 flex-1 max-w-lg">
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-12 pr-4 py-2 h-12 rounded-xl border-2 border-gray-200 focus:border-[#0A5D31] focus:ring-2 focus:ring-[#0A5D31]/20 bg-white shadow-sm"
        />
      </div>
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="px-4 py-2 h-12 rounded-xl border-2 border-gray-200 bg-white text-foreground text-sm focus:ring-2 focus:ring-[#0A5D31] focus:border-[#0A5D31] cursor-pointer shadow-sm"
      >
        <option value="featured">Featured</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="rating">Rating: Highest</option>
      </select>
    </div>
  )
}

