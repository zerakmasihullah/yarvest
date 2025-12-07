"use client"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Search, Filter, Package, Award, TrendingUp, Star, CheckCircle } from "lucide-react"
import { useState } from "react"
import { ProductDetailsModal } from "@/components/product-details-modal"

const categories = [
  { name: "All", icon: Package },
  { name: "Hand Tools", icon: Package },
  { name: "Baskets & Containers", icon: Package },
  { name: "Protective Gear", icon: Package },
  { name: "Equipment", icon: Package },
]

const harvestingProducts = [
  {
    id: 1,
    name: "Professional Harvesting Basket",
    price: 45.99,
    unit: "each",
    code: "HB001",
    image: "https://images.unsplash.com/photo-1585320806297-9794b0e4ee87?w=500&h=500&fit=crop",
    producer: "Farm Tools Co.",
    rating: 4.8,
    reviews: 156,
    badge: "Best Seller",
    organic: false,
    category: "Baskets & Containers",
    description: "Durable wicker basket perfect for collecting fresh produce",
    inStock: true,
  },
  {
    id: 2,
    name: "Stainless Steel Pruning Shears",
    price: 29.99,
    unit: "pair",
    code: "PS002",
    image: "https://images.unsplash.com/photo-1585320806297-9794b0e4ee87?w=500&h=500&fit=crop",
    producer: "Garden Essentials",
    rating: 4.9,
    reviews: 203,
    badge: "New",
    organic: false,
    category: "Hand Tools",
    description: "Sharp, rust-resistant shears for precise cutting",
    inStock: true,
  },
  {
    id: 3,
    name: "Harvesting Gloves Set",
    price: 18.99,
    unit: "pair",
    code: "HG003",
    image: "https://images.unsplash.com/photo-1585320806297-9794b0e4ee87?w=500&h=500&fit=crop",
    producer: "Farm Tools Co.",
    rating: 4.7,
    reviews: 89,
    badge: null,
    organic: false,
    category: "Protective Gear",
    description: "Comfortable gloves with reinforced fingertips",
    inStock: true,
  },
  {
    id: 4,
    name: "Fruit Picking Pole",
    price: 39.99,
    unit: "each",
    code: "FP004",
    image: "https://images.unsplash.com/photo-1585320806297-9794b0e4ee87?w=500&h=500&fit=crop",
    producer: "Harvest Pro",
    rating: 4.6,
    reviews: 67,
    badge: null,
    organic: false,
    category: "Equipment",
    description: "Extendable pole for reaching high branches",
    inStock: true,
  },
  {
    id: 5,
    name: "Harvesting Apron",
    price: 24.99,
    unit: "each",
    code: "HA005",
    image: "https://images.unsplash.com/photo-1585320806297-9794b0e4ee87?w=500&h=500&fit=crop",
    producer: "Farm Tools Co.",
    rating: 4.8,
    reviews: 112,
    badge: "Popular",
    organic: false,
    category: "Protective Gear",
    description: "Heavy-duty apron with multiple pockets",
    inStock: true,
  },
  {
    id: 6,
    name: "Garden Harvesting Knife",
    price: 34.99,
    unit: "each",
    code: "HK006",
    image: "https://images.unsplash.com/photo-1585320806297-9794b0e4ee87?w=500&h=500&fit=crop",
    producer: "Garden Essentials",
    rating: 4.9,
    reviews: 145,
    badge: null,
    organic: false,
    category: "Hand Tools",
    description: "Professional-grade harvesting knife with safety sheath",
    inStock: true,
  },
  {
    id: 7,
    name: "Harvesting Tote Bag",
    price: 19.99,
    unit: "each",
    code: "HT007",
    image: "https://images.unsplash.com/photo-1585320806297-9794b0e4ee87?w=500&h=500&fit=crop",
    producer: "Farm Tools Co.",
    rating: 4.7,
    reviews: 98,
    badge: null,
    organic: false,
    category: "Baskets & Containers",
    description: "Reusable canvas tote for carrying produce",
    inStock: true,
  },
  {
    id: 8,
    name: "Professional Pruning Saw",
    price: 42.99,
    unit: "each",
    code: "PS008",
    image: "https://images.unsplash.com/photo-1585320806297-9794b0e4ee87?w=500&h=500&fit=crop",
    producer: "Harvest Pro",
    rating: 4.8,
    reviews: 134,
    badge: "Premium",
    organic: false,
    category: "Hand Tools",
    description: "Folding saw for cutting thicker branches",
    inStock: true,
  },
  {
    id: 9,
    name: "Harvesting Knee Pads",
    price: 16.99,
    unit: "pair",
    code: "KP009",
    image: "https://images.unsplash.com/photo-1585320806297-9794b0e4ee87?w=500&h=500&fit=crop",
    producer: "Farm Tools Co.",
    rating: 4.6,
    reviews: 76,
    badge: null,
    organic: false,
    category: "Protective Gear",
    description: "Comfortable knee protection for ground-level harvesting",
    inStock: true,
  },
  {
    id: 10,
    name: "Berry Picking Container Set",
    price: 32.99,
    unit: "set",
    code: "BC010",
    image: "https://images.unsplash.com/photo-1585320806297-9794b0e4ee87?w=500&h=500&fit=crop",
    producer: "Garden Essentials",
    rating: 4.9,
    reviews: 167,
    badge: "Best Seller",
    organic: false,
    category: "Baskets & Containers",
    description: "Set of 3 stackable containers for berry picking",
    inStock: true,
  },
  {
    id: 11,
    name: "Harvesting Cart",
    price: 189.99,
    unit: "each",
    code: "HC011",
    image: "https://images.unsplash.com/photo-1585320806297-9794b0e4ee87?w=500&h=500&fit=crop",
    producer: "Harvest Pro",
    rating: 4.7,
    reviews: 45,
    badge: null,
    organic: false,
    category: "Equipment",
    description: "Heavy-duty cart for transporting large harvests",
    inStock: true,
  },
  {
    id: 12,
    name: "Multi-Tool Harvesting Kit",
    price: 59.99,
    unit: "kit",
    code: "MK012",
    image: "https://images.unsplash.com/photo-1585320806297-9794b0e4ee87?w=500&h=500&fit=crop",
    producer: "Farm Tools Co.",
    rating: 4.9,
    reviews: 201,
    badge: "Premium",
    organic: false,
    category: "Hand Tools",
    description: "Complete kit with shears, knife, and accessories",
    inStock: true,
  },
]

export default function HarvestingProductsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [favorites, setFavorites] = useState<number[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  const filteredProducts = harvestingProducts.filter((product) => {
    const matchesSearch = !searchQuery || product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || selectedCategory === "All" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  const handleProductClick = (product: any) => {
    setSelectedProduct(product)
  }

  const getRelatedProducts = (product: any) => {
    return harvestingProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <main className="flex-1 overflow-auto">
        <div className="px-6 py-16 bg-gradient-to-b from-white to-gray-50/50">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-12 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-[#0A5D31]/10 rounded-full mb-6">
                <ShoppingBag className="w-10 h-10 text-[#0A5D31]" />
              </div>
              <h1 className="text-5xl font-bold text-gray-900 mb-4">Harvesting Products</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
                Essential tools and equipment for efficient harvesting
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-[#0A5D31]" />
                  <span>{harvestingProducts.length} Products Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#0A5D31]" />
                  <span>4.8+ Average Rating</span>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="mb-8 flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <Button
                  key={category.name}
                  variant={selectedCategory === category.name || (!selectedCategory && category.name === "All") ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.name === "All" ? null : category.name)}
                  className={`rounded-full gap-2 ${
                    selectedCategory === category.name || (!selectedCategory && category.name === "All")
                      ? "bg-[#0A5D31] text-white"
                      : ""
                  }`}
                >
                  <category.icon className="w-4 h-4" />
                  {category.name}
                </Button>
              ))}
            </div>

            {/* Search */}
            <div className="mb-8">
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search harvesting products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-5 py-3 rounded-full border-2 border-gray-200 focus:border-[#0A5D31] focus:ring-2 focus:ring-[#0A5D31]/20"
                />
              </div>
            </div>

            {/* Featured Products */}
            {!searchQuery && !selectedCategory && (
              <Card className="p-6 mb-8 rounded-2xl border-2 border-[#0A5D31] bg-gradient-to-br from-[#0A5D31]/5 to-white">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-6 h-6 text-[#0A5D31]" />
                  <h2 className="text-2xl font-bold text-gray-900">Popular This Week</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {harvestingProducts.filter(p => p.badge === "Best Seller" || p.badge === "Popular").slice(0, 4).map((product) => (
                    <div key={product.id} className="text-center p-4 rounded-xl hover:bg-white/50 transition-colors cursor-pointer" onClick={() => handleProductClick(product)}>
                      <img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded-lg mb-2" />
                      <p className="text-sm font-semibold text-gray-900 line-clamp-2">{product.name}</p>
                      <p className="text-lg font-bold text-[#0A5D31] mt-1">${product.price}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
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
                  organic={product.organic}
                  isFavorite={favorites.includes(product.id)}
                  onToggleFavorite={toggleFavorite}
                  onClick={() => handleProductClick(product)}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <Card className="p-12 text-center rounded-2xl">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">No products found matching your search</p>
              </Card>
            )}

            {/* Why Choose Section */}
            <Card className="mt-12 p-8 rounded-2xl border-2 border-gray-200 bg-gradient-to-br from-[#0A5D31]/5 to-white">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Why Choose Our Harvesting Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: Award, title: "Quality Guaranteed", desc: "All products tested for durability and performance" },
                  { icon: CheckCircle, title: "Verified Suppliers", desc: "Products from trusted farm equipment manufacturers" },
                  { icon: Star, title: "Customer Reviews", desc: "4.8+ average rating from thousands of satisfied customers" },
                ].map((item, idx) => (
                  <div key={idx} className="text-center">
                    <div className="w-14 h-14 bg-[#0A5D31]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <item.icon className="w-7 h-7 text-[#0A5D31]" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
        <Footer />

        {/* Product Details Modal */}
        {selectedProduct && (
          <ProductDetailsModal
            product={selectedProduct}
            open={!!selectedProduct}
            onOpenChange={(open) => !open && setSelectedProduct(null)}
            relatedProducts={getRelatedProducts(selectedProduct)}
            onAddToCart={() => {}}
            onToggleFavorite={toggleFavorite}
            favorites={favorites}
          />
        )}
      </main>
    </div>
  )
}
