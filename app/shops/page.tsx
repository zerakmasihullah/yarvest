"use client"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Star, Clock, Phone, Search } from "lucide-react"
import { useState } from "react"

const shops = [
  {
    id: 1,
    name: "Yarvest Market - Downtown",
    location: "123 Main St, San Francisco, CA",
    hours: "8:00 AM - 8:00 PM",
    phone: "(555) 123-4567",
    rating: 4.8,
    reviews: 245,
    image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=500&h=400&fit=crop",
    specialty: "Fresh Produce & Organic Foods",
  },
  {
    id: 2,
    name: "Yarvest Market - Mission",
    location: "456 Valencia St, San Francisco, CA",
    hours: "7:00 AM - 9:00 PM",
    phone: "(555) 234-5678",
    rating: 4.7,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad576?w=500&h=400&fit=crop",
    specialty: "Local Farmers & Artisan Goods",
  },
  {
    id: 3,
    name: "Yarvest Market - Oakland",
    location: "789 Telegraph Ave, Oakland, CA",
    hours: "8:00 AM - 7:00 PM",
    phone: "(555) 345-6789",
    rating: 4.9,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1533322088b9-8808f011e87b?w=500&h=400&fit=crop",
    specialty: "Organic & Sustainable Products",
  },
  {
    id: 4,
    name: "Yarvest Market - Berkeley",
    location: "321 University Ave, Berkeley, CA",
    hours: "9:00 AM - 8:00 PM",
    phone: "(555) 456-7890",
    rating: 4.6,
    reviews: 178,
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=500&h=400&fit=crop",
    specialty: "Community & Educational Focus",
  },
]

export default function ShopsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const filteredShops = shops.filter(
    (shop) =>
      shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <main className="flex-1 overflow-auto">
        <div className="px-6 py-12 bg-gradient-to-b from-white to-secondary/10">
          <div className="max-w-6xl mx-auto">
            <div className="mb-10">
              <h1 className="text-5xl font-bold text-foreground mb-3">Yarvest Stores</h1>
              <p className="text-lg text-muted-foreground">
                Visit our local shops to discover fresh, organic produce and support local farmers
              </p>
            </div>

            {/* Enhanced Search */}
            <div className="mb-10">
              <div className="relative">
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by store name or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-14 h-14 text-base rounded-full border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Shops Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredShops.map((shop) => (
                <Card
                  key={shop.id}
                  className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 rounded-3xl border border-border bg-white flex flex-col h-full"
                >
                  <div className="relative group overflow-hidden bg-secondary h-64">
                    <img
                      src={shop.image || "/placeholder.svg"}
                      alt={shop.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-7 flex flex-col flex-1">
                    <h3 className="text-2xl font-bold text-foreground mb-2">{shop.name}</h3>
                    <p className="text-sm font-semibold text-primary mb-6 uppercase tracking-wide">{shop.specialty}</p>

                    <div className="space-y-3.5 mb-8 pb-8 border-b-2 border-border flex-1">
                      <div className="flex items-start gap-3 text-sm">
                        <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-foreground font-medium">{shop.location}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-foreground font-medium">{shop.hours}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-foreground font-medium">{shop.phone}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold text-lg text-foreground">{shop.rating}</span>
                        <span className="text-sm text-muted-foreground">({shop.reviews} reviews)</span>
                      </div>
                    </div>

                    <Button className="w-full bg-primary hover:bg-accent text-white font-semibold rounded-lg h-12 transition-all">
                      Visit Store
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {filteredShops.length === 0 && (
              <Card className="p-12 text-center rounded-3xl">
                <p className="text-muted-foreground text-lg">No stores found matching your search</p>
              </Card>
            )}
          </div>
        </div>
        <Footer />
      </main>
    </div>
  )
}
