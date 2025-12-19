"use client"

import { Button } from "@/components/ui/button"
import { MapPin, Star } from "lucide-react"
import Link from "next/link"
import { ApiProducer, Location } from "@/types/producer"
import { TransformedProducer } from "@/lib/producer-api"

// Helper function to format location
const formatLocation = (location: string | Location | null | undefined): string => {
  if (!location) return 'Location not available'
  if (typeof location === 'string') {
    return location
  }
  // Handle location object
  if (location.full_location) {
    return location.full_location
  }
  // Build location from parts
  const parts = [location.city, location.state, location.country].filter(Boolean)
  return parts.length > 0 ? parts.join(', ') : 'Location not available'
}

interface ProducerCardProps {
  producer: ApiProducer | TransformedProducer
  className?: string
}

export function ProducerCard({ producer, className = "" }: ProducerCardProps) {
  // Handle both ApiProducer and TransformedProducer types
  const uniqueId = (producer as any).unique_id || producer.id
  const producerLocation = typeof producer.location === 'string' 
    ? producer.location 
    : (producer.location as Location | null | undefined)
  
  return (
    <Link href={`/producers/${uniqueId}`}>
      <div className={`overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] flex flex-col bg-card border border-border rounded-2xl cursor-pointer h-full ${className}`}>
        <div className="relative group overflow-hidden bg-secondary h-48">
          <div className="absolute inset-0 flex items-center justify-center bg-white">
            <img
              src={producer.image || "/placeholder.png"}
              alt={producer.name}
              className="max-h-full max-w-full w-auto h-auto object-contain group-hover:scale-110 transition-transform duration-300"
              style={{ aspectRatio: '1/1' }}
              onError={(e) => {
                e.currentTarget.src = "/placeholder.png"
              }}
            />
          </div>
        </div>
        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-bold text-lg text-foreground mb-1">{producer.name || 'Producer'}</h3>
          {producer.specialty && (
            <p className="text-xs text-[#5a9c3a] font-semibold mb-2 uppercase tracking-wide">{producer.specialty}</p>
          )}

          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-4">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            {formatLocation(producerLocation)}
          </div>

          <div className="mt-auto pt-4 border-t border-border">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1">
                {producer.rating > 0 ? (
                  <>
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-sm text-foreground">{producer.rating}</span>
                  </>
                ) : (
                  <span className="text-xs text-muted-foreground">No rating</span>
                )}
              </div>
              <span className="text-xs text-muted-foreground font-medium">{producer.products || 0} items</span>
            </div>

            <Button className="w-full bg-[#5a9c3a] hover:bg-[#0d7a3f] text-white font-semibold rounded-xl transition-all h-10">
              View Shop
            </Button>
          </div>
        </div>
      </div>
    </Link>
  )
}

