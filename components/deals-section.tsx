"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Tag, Clock } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import api from "@/lib/axios"
import { getImageUrl } from "@/lib/utils"

interface Deal {
  id: number
  name: string
  originalPrice: string
  price: string
  discount: number
  image: string
  producer: string
  timeLeft: string
  badge: string
}

interface ApiDeal {
  id: number
  unique_id: string
  name: string
  price: string
  discount: string
  main_image: string
  excerpt: string
  details: string
  seller_id: number
  product_category_id: number
  product_type_id: number
  status: boolean
  sku: string
  stock: number
  created_at: string
  updated_at: string
}

interface ApiResponse {
  success: boolean
  message: string
  data: ApiDeal[]
}

const badgeOptions = ["Best Deal", "Limited", "Popular", "New"]

export function DealsSection() {
  const [favorites, setFavorites] = useState<number[]>([])
  const [deals, setDeals] = useState<Deal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDeals = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await api.get<ApiResponse>("/special-deals")
      
      if (response.data.success && response.data.data) {
        const transformedDeals: Deal[] = response.data.data.map((item, index) => {
          const price = parseFloat(item.price)
          const discountAmount = parseFloat(item.discount)
          const originalPrice = (price + discountAmount).toFixed(2)
          const discountPercentage = Math.round((discountAmount / parseFloat(originalPrice)) * 100)
          
          // Use utility function to construct image URL
          const imageUrl = getImageUrl(item.main_image)
          
          // Generate time left (randomized for demo, or calculate from created_at)
          const daysLeft = Math.floor(Math.random() * 5) + 1
          const timeLeft = daysLeft === 1 ? "1 day left" : `${daysLeft} days left`
          
          return {
            id: item.id,
            name: item.name,
            originalPrice,
            price: price.toFixed(2),
            discount: discountPercentage,
            image: imageUrl,
            producer: `Producer ${item.seller_id}`,
            timeLeft,
            badge: badgeOptions[index % badgeOptions.length],
          }
        })
        
        setDeals(transformedDeals)
      } else {
        setError("Failed to load deals")
      }
    } catch (err: any) {
      console.error("Error fetching deals:", err)
      setError(err.response?.data?.message || "Failed to load special deals")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDeals()
  }, [])

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
      
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="overflow-hidden animate-pulse">
              <div className="h-48 bg-gray-200" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-8 bg-gray-200 rounded" />
              </div>
            </Card>
          ))}
        </div>
      )}
      
      {error && (
        <div className="text-center py-12">
          <p className="text-red-500 mb-4">{error}</p>
          <Button 
            onClick={fetchDeals} 
            variant="outline"
            className="bg-[#0A5D31] text-white hover:bg-[#0d7a3f]"
          >
            Retry
          </Button>
        </div>
      )}
      
      {!loading && !error && deals.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No special deals available at the moment.</p>
        </div>
      )}
      
      {!loading && !error && deals.length > 0 && (
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
      )}
    </div>
  )
}

