"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Star, Store, ArrowRight } from "lucide-react"
import Link from "next/link"

const featuredShops = [
  {
    id: 1,
    name: "Green Valley Farm Store",
    location: "Marin County, CA",
    specialty: "Organic Vegetables & Fruits",
    image: "https://images.pexels.com/photos/2132171/pexels-photo-2132171.jpeg?auto=compress&cs=tinysrgb&w=500",
    rating: 4.9,
    verified: true,
    products: 145,
    distance: "2.3 miles",
    badge: "Featured",
  },
  {
    id: 2,
    name: "Sunny Side Market",
    location: "Sonoma County, CA",
    specialty: "Fresh Fruits & Local Goods",
    image: "https://images.pexels.com/photos/5529599/pexels-photo-5529599.jpeg?auto=compress&cs=tinysrgb&w=500",
    rating: 4.8,
    verified: true,
    products: 98,
    distance: "5.1 miles",
    badge: "Popular",
  },
  {
    id: 3,
    name: "Leaf & Root Market",
    location: "San Francisco, CA",
    specialty: "Local Greens & Herbs",
    image: "https://images.pexels.com/photos/2518861/pexels-photo-2518861.jpeg?auto=compress&cs=tinysrgb&w=500",
    rating: 4.7,
    verified: true,
    products: 76,
    distance: "1.8 miles",
    badge: "Near You",
  },
  {
    id: 4,
    name: "Meadow Fresh Store",
    location: "Petaluma, CA",
    specialty: "Dairy & Farm Products",
    image: "https://images.pexels.com/photos/422218/pexels-photo-422218.jpeg?auto=compress&cs=tinysrgb&w=500",
    rating: 4.9,
    verified: true,
    products: 52,
    distance: "8.2 miles",
    badge: "Top Rated",
  },
]

export function FeaturedShops() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Store className="w-6 h-6 text-[#0A5D31]" />
            <h2 className="text-4xl font-bold text-foreground">Featured Shops</h2>
          </div>
          <p className="text-muted-foreground text-base mt-2">Discover the best local stores near you</p>
        </div>
        <Link href="/shops" className="text-[#0A5D31] font-semibold hover:text-[#0d7a3f] text-sm transition-colors">
          View All Shops
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredShops.map((shop) => (
          <Link key={shop.id} href={`/shops/${shop.id}`}>
            <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] flex flex-col bg-card border border-border rounded-2xl cursor-pointer h-full">
              <div className="relative group overflow-hidden bg-secondary h-48">
                <img
                  src={shop.image || "/placeholder.svg"}
                  alt={shop.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {shop.badge && (
                  <div className="absolute top-3 left-3 bg-[#0A5D31] text-white px-3 py-1 rounded-full text-xs font-bold uppercase">
                    {shop.badge}
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-semibold text-gray-900">
                  {shop.distance}
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-lg text-foreground mb-1">{shop.name}</h3>
                <p className="text-xs text-[#0A5D31] font-semibold mb-2 uppercase tracking-wide">{shop.specialty}</p>

                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                  {shop.location}
                </div>

                <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-sm text-foreground">{shop.rating}</span>
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">{shop.products} items</span>
                </div>

                <Button className="w-full bg-[#0A5D31] hover:bg-[#0d7a3f] text-white font-semibold rounded-xl transition-all mt-auto h-10 flex items-center justify-center gap-2">
                  Visit Shop
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

