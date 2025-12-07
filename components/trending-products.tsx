"use client"

import { ProductCard } from "@/components/product-card"
import { TrendingUp } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

const trendingProducts = [
  {
    id: 101,
    name: "Organic Kale Bundle",
    price: "4.99",
    unit: "/bunch",
    code: "KALE101",
    image: "https://images.pexels.com/photos/2325843/pexels-photo-2325843.jpeg?auto=compress&cs=tinysrgb&w=500",
    producer: "Green Valley Farm",
    rating: 4.9,
    reviews: 234,
    badge: "Trending",
    trend: "+45%",
  },
  {
    id: 102,
    name: "Fresh Strawberries",
    price: "6.99",
    unit: "/lb",
    code: "STRA102",
    image: "https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=500",
    producer: "Sunny Side Orchard",
    rating: 4.8,
    reviews: 189,
    badge: "Hot",
    trend: "+32%",
  },
  {
    id: 103,
    name: "Farm Fresh Eggs",
    price: "7.99",
    unit: "/dozen",
    code: "EGGS103",
    image: "https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=500",
    producer: "Meadow Fresh Dairy",
    rating: 5.0,
    reviews: 312,
    badge: "Best Seller",
    trend: "+67%",
  },
  {
    id: 104,
    name: "Organic Avocados",
    price: "8.99",
    unit: "/lb",
    code: "AVOC104",
    image: "https://images.pexels.com/photos/1084542/pexels-photo-1084542.jpeg?auto=compress&cs=tinysrgb&w=500",
    producer: "Orchard Fresh",
    rating: 4.7,
    reviews: 156,
    badge: "Popular",
    trend: "+28%",
  },
  {
    id: 105,
    name: "Fresh Broccoli",
    price: "3.99",
    unit: "/lb",
    code: "BROC105",
    image: "https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg?auto=compress&cs=tinysrgb&w=500",
    producer: "Green Valley Farm",
    rating: 4.9,
    reviews: 201,
    badge: "Trending",
    trend: "+41%",
  },
]

export function TrendingProducts() {
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-6 h-6 text-[#0A5D31]" />
            <h2 className="text-4xl font-bold text-foreground">Trending Now</h2>
          </div>
          <p className="text-muted-foreground text-base mt-2">What everyone's buying this week</p>
        </div>
        <Link href="/products?filter=trending" className="text-[#0A5D31] font-semibold hover:text-[#0d7a3f] text-sm transition-colors">
          View All
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {trendingProducts.map((product) => (
          <div key={product.id} className="relative">
            <div className="absolute top-3 right-3 z-10 bg-yellow-400 text-gray-900 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
              <TrendingUp className="w-3 h-3" />
              {product.trend}
            </div>
            <ProductCard
              id={product.id}
              name={product.name}
              price={product.price}
              unit={product.unit}
              code={product.code}
              image={product.image}
              producer={product.producer}
              rating={product.rating}
              reviews={product.reviews}
              badge={product.badge}
              isFavorite={favorites.includes(product.id)}
              onToggleFavorite={toggleFavorite}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

