"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Tag, Clock } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

const deals = [
  {
    id: 1,
    name: "Organic Vegetable Bundle",
    originalPrice: "24.99",
    price: "18.99",
    discount: 24,
    image: "https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=500",
    producer: "Green Valley Farm",
    timeLeft: "2 days left",
    badge: "Best Deal",
  },
  {
    id: 2,
    name: "Fresh Fruit Mix Pack",
    originalPrice: "19.99",
    price: "14.99",
    discount: 25,
    image: "https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=500",
    producer: "Sunny Side Orchard",
    timeLeft: "1 day left",
    badge: "Limited",
  },
  {
    id: 3,
    name: "Farm Fresh Dairy Bundle",
    originalPrice: "22.99",
    price: "17.99",
    discount: 22,
    image: "https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=500",
    producer: "Meadow Fresh Dairy",
    timeLeft: "3 days left",
    badge: "Popular",
  },
  {
    id: 4,
    name: "Organic Greens Collection",
    originalPrice: "16.99",
    price: "12.99",
    discount: 24,
    image: "https://images.pexels.com/photos/1272557/pexels-photo-1272557.jpeg?auto=compress&cs=tinysrgb&w=500",
    producer: "Leaf & Root",
    timeLeft: "5 days left",
    badge: "New",
  },
]

export function DealsSection() {
  const [favorites, setFavorites] = useState<number[]>([])

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Tag className="w-6 h-6 text-[#0A5D31]" />
            <h2 className="text-4xl font-bold text-foreground">Special Deals</h2>
          </div>
          <p className="text-muted-foreground text-base mt-2">Limited time offers - Don't miss out!</p>
        </div>
        <Link href="/deals" className="text-[#0A5D31] font-semibold hover:text-[#0d7a3f] text-sm transition-colors">
          View All Deals
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {deals.map((deal) => (
          <Card
            key={deal.id}
            className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] flex flex-col bg-card border-2 border-red-100 rounded-2xl relative"
          >
            <div className="absolute top-3 right-3 z-10 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              {deal.discount}% OFF
            </div>
            
            {/* Product Image */}
            <div className="relative group overflow-hidden bg-secondary h-48">
              <Link href={`/products/${deal.id}`}>
                <img
                  src={deal.image || "/placeholder.svg"}
                  alt={deal.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 cursor-pointer"
                />
              </Link>
              {deal.badge && (
                <div className="absolute top-3 left-3 bg-[#0A5D31] text-white px-3 py-1 rounded-full text-xs font-bold uppercase">
                  {deal.badge}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-4 flex flex-col flex-1">
              <p className="text-xs font-bold text-[#0A5D31] mb-1 uppercase tracking-wider">{deal.producer}</p>
              <Link href={`/products/${deal.id}`}>
                <h3 className="font-bold text-foreground mb-2 hover:text-[#0A5D31] cursor-pointer leading-snug line-clamp-2 text-sm">
                  {deal.name}
                </h3>
              </Link>

              <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
                <Clock className="w-4 h-4 text-red-500" />
                <span className="text-red-600 font-semibold">{deal.timeLeft}</span>
              </div>

              {/* Price and Action */}
              <div className="mt-auto pt-3 border-t border-border">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold text-2xl text-[#0A5D31]">${deal.price}</span>
                    <span className="text-sm text-muted-foreground line-through">${deal.originalPrice}</span>
                  </div>
                </div>
                <Button className="w-full gap-2 bg-[#0A5D31] hover:bg-[#0d7a3f] text-white rounded-xl font-semibold transition-all h-10">
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

