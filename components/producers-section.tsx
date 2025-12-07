"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Star, CheckCircle } from "lucide-react"
import Link from "next/link"

const producers = [
  {
    id: 1,
    name: "Green Valley Farm",
    location: "Marin County, CA",
    specialty: "Organic Vegetables",
    image: "https://images.pexels.com/photos/2132171/pexels-photo-2132171.jpeg?auto=compress&cs=tinysrgb&w=500",
    rating: 4.9,
    verified: true,
    products: 45,
  },
  {
    id: 2,
    name: "Sunny Side Orchard",
    location: "Sonoma County, CA",
    specialty: "Fresh Fruits & Apples",
    image: "https://images.pexels.com/photos/5529599/pexels-photo-5529599.jpeg?auto=compress&cs=tinysrgb&w=500",
    rating: 4.8,
    verified: true,
    products: 32,
  },
  {
    id: 3,
    name: "Leaf & Root Collective",
    location: "San Francisco, CA",
    specialty: "Local Greens",
    image: "https://images.pexels.com/photos/2518861/pexels-photo-2518861.jpeg?auto=compress&cs=tinysrgb&w=500",
    rating: 4.7,
    verified: true,
    products: 28,
  },
  {
    id: 4,
    name: "Meadow Fresh Dairy",
    location: "Petaluma, CA",
    specialty: "Local Dairy Products",
    image: "https://images.pexels.com/photos/422218/pexels-photo-422218.jpeg?auto=compress&cs=tinysrgb&w=500",
    rating: 4.9,
    verified: true,
    products: 18,
  },
]

export function ProducersSection() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-4xl font-bold text-foreground">Meet Our Producers</h2>
          <p className="text-muted-foreground text-base mt-2">Local farmers committed to quality and sustainability</p>
        </div>
        <Link href="/producers" className="text-[#0A5D31] font-semibold hover:text-[#0d7a3f] text-sm transition-colors">
          View All
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {producers.map((producer) => (
          <Link key={producer.id} href={`/producers/${producer.id}`}>
            <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] flex flex-col bg-card border border-border rounded-2xl cursor-pointer h-full">
              <div className="relative group overflow-hidden bg-secondary h-48">
                <img
                  src={producer.image || "/placeholder.svg"}
                  alt={producer.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {producer.verified && (
                  <div className="absolute top-3 right-3 bg-[#0A5D31] text-white p-2 rounded-full shadow-lg">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                )}
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-lg text-foreground mb-1">{producer.name}</h3>
                <p className="text-xs text-[#0A5D31] font-semibold mb-2 uppercase tracking-wide">{producer.specialty}</p>

                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-4">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                  {producer.location}
                </div>

                <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-sm text-foreground">{producer.rating}</span>
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">{producer.products} items</span>
                </div>

                <Button className="w-full bg-[#0A5D31] hover:bg-[#0d7a3f] text-white font-semibold rounded-xl transition-all mt-auto h-10">
                  View Shop
                </Button>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
