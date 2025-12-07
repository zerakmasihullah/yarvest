"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"

const productCategories = [
  {
    name: "All",
    image: "https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=200",
    href: "/products",
  },
  {
    name: "Produce",
    image: "https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=200",
    href: "/products?category=produce",
  },
  {
    name: "Meat & Seafood",
    image: "https://images.pexels.com/photos/361184/asparagus-steak-veal-chop-veal-361184.jpeg?auto=compress&cs=tinysrgb&w=200",
    href: "/products?category=meat",
  },
  {
    name: "Dairy & Eggs",
    image: "https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=200",
    href: "/products?category=dairy",
  },
  {
    name: "Bakery",
    image: "https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=200",
    href: "/products?category=bakery",
  },
  {
    name: "Beverages",
    image: "https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=200",
    href: "/products?category=beverages",
  },
  {
    name: "Snacks",
    image: "https://images.pexels.com/photos/1537169/pexels-photo-1537169.jpeg?auto=compress&cs=tinysrgb&w=200",
    href: "/products?category=snacks",
  },
  {
    name: "Frozen",
    image: "https://images.pexels.com/photos/1272557/pexels-photo-1272557.jpeg?auto=compress&cs=tinysrgb&w=200",
    href: "/products?category=frozen",
  },
  {
    name: "Organic",
    image: "https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg?auto=compress&cs=tinysrgb&w=200",
    href: "/products?category=organic",
  },
  {
    name: "Grains",
    image: "https://images.pexels.com/photos/1537169/pexels-photo-1537169.jpeg?auto=compress&cs=tinysrgb&w=200",
    href: "/products?category=grains",
  },
  {
    name: "Herbs & Spices",
    image: "https://images.pexels.com/photos/1340116/pexels-photo-1340116.jpeg?auto=compress&cs=tinysrgb&w=200",
    href: "/products?category=herbs",
  },
]

interface ProductCategoriesProps {
  selectedCategory?: string | null
  onCategorySelect?: (category: string | null) => void
}

export function ProductCategories({ selectedCategory, onCategorySelect }: ProductCategoriesProps) {
  return (
    <div className="w-full bg-white border-b border-gray-100 py-6 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-5 overflow-x-auto scrollbar-hide">
        {productCategories.map((category) => {
          const isActive = selectedCategory === category.name || (!selectedCategory && category.name === "All")
          return (
            <button
              key={category.name}
              onClick={() => onCategorySelect?.(category.name === "All" ? null : category.name)}
              className={`flex flex-col items-center gap-3 min-w-[90px] flex-shrink-0 transition-all group ${
                isActive ? "opacity-100" : "opacity-80 hover:opacity-100"
              }`}
            >
              <div
                className={`relative overflow-hidden rounded-2xl h-20 w-20 border-2 transition-all duration-300 shadow-md ${
                  isActive
                    ? "border-[#0A5D31] shadow-xl scale-110 ring-2 ring-[#0A5D31]/20"
                    : "border-gray-200 hover:border-[#0A5D31]/50 hover:shadow-lg group-hover:scale-105"
                }`}
              >
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  className={`w-full h-full object-cover transition-transform duration-300 ${
                    isActive ? "scale-110" : "group-hover:scale-110"
                  }`}
                />
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0A5D31]/20 to-transparent"></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent"></div>
              </div>
              <span
                className={`text-xs font-semibold text-center transition-colors ${
                  isActive ? "text-[#0A5D31]" : "text-gray-700 group-hover:text-[#0A5D31]"
                }`}
              >
                {category.name}
              </span>
            </button>
          )
        })}
        <button className="flex items-center justify-center min-w-[40px] h-20 text-gray-400 hover:text-gray-600 transition-colors">
          <ChevronRight className="w-5 h-5" />
        </button>
        </div>
      </div>
    </div>
  )
}

