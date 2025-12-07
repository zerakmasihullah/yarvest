"use client"

import { ProductCard } from "@/components/product-card"
import { useState } from "react"
import Link from "next/link"

const products = [
  {
    id: 1,
    name: "Organic Heirloom Tomatoes",
    price: "4.99",
    unit: "/lb",
    code: "TOMO001",
    image: "https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=500",
    producer: "Green Valley Farm",
    rating: 4.8,
    reviews: 128,
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Fresh Local Carrots",
    price: "2.99",
    unit: "/lb",
    code: "CARR002",
    image: "https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=500",
    producer: "Sunny Side Farm",
    rating: 4.9,
    reviews: 95,
    badge: "New",
  },
  {
    id: 3,
    name: "Crisp Organic Lettuce",
    price: "3.49",
    unit: "/pack",
    code: "LETT003",
    image: "https://images.pexels.com/photos/1199562/pexels-photo-1199562.jpeg?auto=compress&cs=tinysrgb&w=500",
    producer: "Leaf & Root",
    rating: 4.7,
    reviews: 82,
    badge: null,
  },
  {
    id: 4,
    name: "Sweet Local Apples",
    price: "5.99",
    unit: "/lb",
    code: "APPL004",
    image: "https://images.pexels.com/photos/1510392/pexels-photo-1510392.jpeg?auto=compress&cs=tinysrgb&w=500",
    producer: "Orchard Fresh",
    rating: 4.9,
    reviews: 156,
    badge: "Premium",
  },
  {
    id: 5,
    name: "Fresh Spinach Bundles",
    price: "3.99",
    unit: "/pack",
    code: "SPIN005",
    image: "https://images.pexels.com/photos/2325843/pexels-photo-2325843.jpeg?auto=compress&cs=tinysrgb&w=500",
    producer: "Green Valley Farm",
    rating: 4.8,
    reviews: 112,
    badge: "Organic",
  },
]

export function ProductShowcase() {
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-4xl font-bold text-foreground">Featured Fresh Products</h2>
          <p className="text-muted-foreground text-base mt-2">Premium quality from verified local producers</p>
        </div>
        <Link href="/products" className="text-[#0A5D31] font-semibold hover:text-[#0d7a3f] text-sm transition-colors">
          View All
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
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
        ))}
      </div>
    </div>
  )
}
