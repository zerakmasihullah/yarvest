"use client"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Star, ShoppingCart, Trash2, MapPin } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

const favoriteProducts = [
  {
    id: 1,
    name: "Organic Heirloom Tomatoes",
    price: 4.99,
    unit: "/lb",
    code: "TOMO001",
    image: "https://images.unsplash.com/photo-1592924357228-91a8676d3a88?w=800&h=800&fit=crop",
    producer: "Green Valley Farm",
    rating: 4.8,
    reviews: 128,
    badge: "Best Seller",
    organic: true,
  },
  {
    id: 2,
    name: "Fresh Local Carrots",
    price: 2.99,
    unit: "/lb",
    code: "CARR002",
    image: "https://images.unsplash.com/photo-1599599810694-b5ac4dd64b51?w=800&h=800&fit=crop",
    producer: "Sunny Side Farm",
    rating: 4.9,
    reviews: 95,
    badge: "New",
    organic: true,
  },
  {
    id: 4,
    name: "Sweet Local Apples",
    price: 5.99,
    unit: "/lb",
    code: "APPL004",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b27c8a?w=800&h=800&fit=crop",
    producer: "Orchard Fresh",
    rating: 4.9,
    reviews: 156,
    badge: "Premium",
    organic: true,
  },
  {
    id: 6,
    name: "Premium Blueberries",
    price: 7.99,
    unit: "/pack",
    code: "BLUE006",
    image: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=800&h=800&fit=crop",
    producer: "Berry Fields Co.",
    rating: 5.0,
    reviews: 203,
    badge: "Premium",
    organic: true,
  },
]

export default function FavoritesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [favorites, setFavorites] = useState<number[]>(favoriteProducts.map((p) => p.id))

  const removeFavorite = (id: number) => {
    setFavorites((prev) => prev.filter((fav) => fav !== id))
  }

  const displayedProducts = favoriteProducts.filter((product) => favorites.includes(product.id))

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <main className="flex-1 overflow-auto">
        <div className="px-6 py-12 bg-gradient-to-b from-white to-secondary/10">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-red-500/10 rounded-xl">
                  <Heart className="w-8 h-8 text-red-500 fill-red-500" />
                </div>
                <div>
                  <h1 className="text-5xl font-bold text-foreground">My Favorites</h1>
                  <p className="text-lg text-muted-foreground mt-1">
                    {displayedProducts.length} {displayedProducts.length === 1 ? "item" : "items"} saved
                  </p>
                </div>
              </div>
            </div>

            {displayedProducts.length === 0 ? (
              <Card className="p-16 text-center rounded-3xl">
                <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h2 className="text-2xl font-semibold text-foreground mb-2">No favorites yet</h2>
                <p className="text-muted-foreground mb-6">Start adding products to your favorites to see them here!</p>
                <Link href="/products">
                  <Button className="bg-primary hover:bg-accent text-white rounded-xl font-semibold px-8">
                    Browse Products
                  </Button>
                </Link>
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {displayedProducts.map((product) => (
                  <Card
                    key={product.id}
                    className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] flex flex-col bg-white border border-border rounded-3xl"
                  >
                    {/* Product Image */}
                    <div className="relative group overflow-hidden bg-secondary h-64">
                      <Link href={`/products/${product.id}`}>
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 cursor-pointer"
                        />
                      </Link>
                      {product.badge && (
                        <Badge className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold uppercase shadow-lg">
                          {product.badge}
                        </Badge>
                      )}
                      {product.organic && (
                        <Badge className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase shadow-lg">
                          Organic
                        </Badge>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-4 right-4 bg-white hover:bg-red-50 shadow-lg rounded-full"
                        onClick={() => removeFavorite(product.id)}
                      >
                        <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                      </Button>
                    </div>

                    {/* Product Info */}
                    <div className="p-5 flex flex-col flex-1">
                      <p className="text-xs font-bold text-primary mb-1 uppercase tracking-wider">{product.producer}</p>
                      <Link href={`/products/${product.id}`}>
                        <h3 className="font-bold text-foreground mb-2 hover:text-primary cursor-pointer leading-snug line-clamp-2">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-xs text-muted-foreground mb-3 font-mono">SKU: {product.code}</p>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>

                      {/* Price and Action */}
                      <div className="mt-auto pt-4 border-t border-border">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-baseline gap-1">
                            <span className="font-bold text-2xl text-primary">${product.price.toFixed(2)}</span>
                            <span className="text-sm text-muted-foreground">{product.unit}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Link href={`/products/${product.id}`} className="flex-1">
                            <Button variant="outline" className="w-full border-2 border-border hover:bg-secondary rounded-xl font-semibold h-11">
                              View Details
                            </Button>
                          </Link>
                          <Button className="flex-1 gap-2 bg-primary hover:bg-accent text-white rounded-xl font-semibold transition-all h-11">
                            <ShoppingCart className="w-4 h-4" />
                            Add
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

