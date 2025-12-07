"use client"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SearchIcon, Filter, MapPin, Star, ShoppingCart, Heart, X, SlidersHorizontal, Grid3x3, List, TrendingUp, Clock, Leaf, CheckCircle } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { ProductDetailsModal } from "@/components/product-details-modal"
import { ProductCard } from "@/components/product-card"

const searchResults = [
  {
    id: 1,
    name: "Organic Heirloom Tomatoes",
    price: 4.99,
    unit: "/lb",
    code: "PROD-001",
    description: "Fresh, juicy heirloom tomatoes grown organically with no pesticides. Perfect for salads, sauces, and fresh eating.",
    producer: "Green Valley Farm",
    rating: 4.8,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1592924357228-91a8676d3a88?w=800&h=800&fit=crop",
    distance: "2.3 km",
    category: "Vegetables",
    organic: true,
    badge: "Best Seller",
    inStock: true,
    deliveryTime: "Same Day",
  },
  {
    id: 2,
    name: "Fresh Local Carrots",
    price: 2.99,
    unit: "/lb",
    code: "PROD-002",
    description: "Crisp, sweet carrots harvested fresh from local farms. Rich in beta-carotene and perfect for snacking or cooking.",
    producer: "Sunny Side Farm",
    rating: 4.9,
    reviews: 95,
    image: "https://images.unsplash.com/photo-1599599810694-b5ac4dd64b51?w=800&h=800&fit=crop",
    distance: "5.1 km",
    category: "Vegetables",
    organic: true,
    badge: "New",
    inStock: true,
    deliveryTime: "Next Day",
  },
  {
    id: 3,
    name: "Crisp Organic Lettuce",
    price: 3.49,
    unit: "/pack",
    code: "PROD-003",
    description: "Fresh, crisp organic lettuce perfect for salads and sandwiches. Grown without synthetic pesticides.",
    producer: "Leaf & Root",
    rating: 4.7,
    reviews: 82,
    image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=800&h=800&fit=crop",
    distance: "3.8 km",
    category: "Vegetables",
    organic: true,
    badge: null,
    inStock: true,
    deliveryTime: "Same Day",
  },
  {
    id: 4,
    name: "Sweet Local Apples",
    price: 5.99,
    unit: "/lb",
    code: "PROD-004",
    description: "Sweet, crisp apples from local orchards. Perfect for eating fresh or baking into pies and desserts.",
    producer: "Orchard Fresh",
    rating: 4.9,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b27c8a?w=800&h=800&fit=crop",
    distance: "8.2 km",
    category: "Fruits",
    organic: true,
    badge: "Premium",
    inStock: true,
    deliveryTime: "Next Day",
  },
  {
    id: 5,
    name: "Fresh Spinach Bundles",
    price: 3.99,
    unit: "/pack",
    code: "PROD-005",
    description: "Fresh, tender spinach leaves packed with nutrients. Great for salads, smoothies, and cooked dishes.",
    producer: "Green Valley Farm",
    rating: 4.8,
    reviews: 112,
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=800&h=800&fit=crop",
    distance: "2.3 km",
    category: "Vegetables",
    organic: true,
    badge: "Organic",
    inStock: true,
    deliveryTime: "Same Day",
  },
  {
    id: 6,
    name: "Premium Blueberries",
    price: 7.99,
    unit: "/pack",
    code: "PROD-006",
    description: "Sweet, plump blueberries bursting with flavor. High in antioxidants and perfect for breakfast or snacking.",
    producer: "Berry Perfect Farm",
    rating: 5.0,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=800&h=800&fit=crop",
    distance: "4.5 km",
    category: "Fruits",
    organic: true,
    badge: "Premium",
    inStock: true,
    deliveryTime: "Same Day",
  },
  {
    id: 7,
    name: "Fresh Broccoli",
    price: 3.29,
    unit: "/lb",
    code: "PROD-007",
    description: "Fresh, green broccoli florets rich in vitamins and fiber. Perfect for steaming, roasting, or stir-frying.",
    producer: "Green Valley Farm",
    rating: 4.6,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=800&h=800&fit=crop",
    distance: "2.3 km",
    category: "Vegetables",
    organic: true,
    badge: null,
    inStock: true,
    deliveryTime: "Same Day",
  },
  {
    id: 8,
    name: "Organic Strawberries",
    price: 6.99,
    unit: "/pack",
    code: "PROD-008",
    description: "Sweet, juicy organic strawberries picked at peak ripeness. Perfect for desserts, smoothies, or fresh eating.",
    producer: "Berry Fields Co.",
    rating: 4.9,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=800&h=800&fit=crop",
    distance: "6.1 km",
    category: "Fruits",
    organic: true,
    badge: "Best Seller",
    inStock: true,
    deliveryTime: "Next Day",
  },
]

const relatedSearches = ["organic vegetables", "fresh fruits", "local produce", "farm to table", "seasonal produce"]
const trendingSearches = ["tomatoes", "apples", "lettuce", "carrots", "berries"]

export default function SearchPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("relevance")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [priceRange, setPriceRange] = useState<string | null>(null)
  const [minRating, setMinRating] = useState<number | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  const categories = ["All", "Vegetables", "Fruits", "Dairy", "Meat", "Grains"]
  const priceRanges = ["Under $3", "$3 - $5", "$5 - $10", "Over $10"]
  const ratings = [4.0, 4.5, 4.7, 4.8, 5.0]

  const filteredResults = searchResults.filter((product) => {
    const matchesSearch = !searchQuery || product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.producer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || selectedCategory === "All" || product.category === selectedCategory
    const matchesPrice = !priceRange || (
      (priceRange === "Under $3" && product.price < 3) ||
      (priceRange === "$3 - $5" && product.price >= 3 && product.price <= 5) ||
      (priceRange === "$5 - $10" && product.price > 5 && product.price <= 10) ||
      (priceRange === "Over $10" && product.price > 10)
    )
    const matchesRating = !minRating || product.rating >= minRating
    return matchesSearch && matchesCategory && matchesPrice && matchesRating
  })

  const sortedResults = [...filteredResults].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "reviews":
        return b.reviews - a.reviews
      default:
        return 0
    }
  })

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  const handleProductClick = (product: any) => {
    setSelectedProduct(product)
  }

  const getRelatedProducts = (product: any) => {
    if (!product) return []
    return searchResults.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4).map(p => ({
      ...p,
      code: p.code || `PROD-${String(p.id).padStart(3, '0')}`,
      description: p.description || `${p.name} - Fresh and locally sourced.`
    }))
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Find Fresh Products</h1>
            <p className="text-muted-foreground">Search from local farmers and producers</p>
          </div>

          {/* Search Bar */}
          <div className="mb-6 flex gap-3">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search products, farms, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border-border bg-white focus:ring-2 focus:ring-primary text-lg"
                autoFocus
              />
            </div>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowFilters(!showFilters)}
              className={`gap-2 border-border hover:bg-secondary ${showFilters ? "bg-[#0A5D31] text-white border-[#0A5D31]" : ""}`}
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span className="hidden sm:inline">Filters</span>
            </Button>
            <div className="hidden md:flex gap-2 border border-gray-200 rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "bg-[#0A5D31] text-white" : ""}
              >
                <Grid3x3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "bg-[#0A5D31] text-white" : ""}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Trending & Related Searches */}
          {!searchQuery && (
            <div className="mb-8 space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#0A5D31]" />
                  Trending Searches
                </h3>
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.map((term) => (
                    <Button
                      key={term}
                      variant="outline"
                      size="sm"
                      onClick={() => setSearchQuery(term)}
                      className="rounded-full text-sm"
                    >
                      {term}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Related Searches</h3>
                <div className="flex flex-wrap gap-2">
                  {relatedSearches.map((term) => (
                    <Button
                      key={term}
                      variant="outline"
                      size="sm"
                      onClick={() => setSearchQuery(term)}
                      className="rounded-full text-sm"
                    >
                      {term}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Filters Panel */}
          {showFilters && (
            <Card className="mb-8 p-6 bg-white border-2 border-gray-200 rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Filter Products</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="text-sm font-semibold text-foreground mb-3 block">Category</label>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <label key={cat} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === cat || (!selectedCategory && cat === "All")}
                          onChange={() => setSelectedCategory(cat === "All" ? null : cat)}
                          className="w-4 h-4 rounded border-border text-[#0A5D31] focus:ring-[#0A5D31]"
                        />
                        <span className="text-sm text-foreground">{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground mb-3 block">Price Range</label>
                  <div className="space-y-2">
                    {priceRanges.map((price) => (
                      <label key={price} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input
                          type="radio"
                          name="price"
                          checked={priceRange === price}
                          onChange={() => setPriceRange(priceRange === price ? null : price)}
                          className="w-4 h-4 rounded border-border text-[#0A5D31] focus:ring-[#0A5D31]"
                        />
                        <span className="text-sm text-foreground">{price}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground mb-3 block">Minimum Rating</label>
                  <div className="space-y-2">
                    {ratings.map((rating) => (
                      <label key={rating} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input
                          type="radio"
                          name="rating"
                          checked={minRating === rating}
                          onChange={() => setMinRating(minRating === rating ? null : rating)}
                          className="w-4 h-4 rounded border-border text-[#0A5D31] focus:ring-[#0A5D31]"
                        />
                        <span className="text-sm text-foreground flex items-center gap-1">
                          {rating}+ <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground mb-3 block">Quick Filters</label>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => {
                        // Filter organic products
                      }}
                    >
                      <Leaf className="w-4 h-4 mr-2" />
                      Organic Only
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => {
                        // Filter same day delivery
                      }}
                    >
                      <Clock className="w-4 h-4 mr-2" />
                      Same Day Delivery
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => {
                        // Reset all filters
                        setSelectedCategory(null)
                        setPriceRange(null)
                        setMinRating(null)
                      }}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Clear All
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Results Info */}
          <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{sortedResults.length}</span> products
                {searchQuery && <span> for "<span className="font-semibold">{searchQuery}</span>"</span>}
              </p>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-lg border border-border bg-white text-foreground text-sm focus:ring-2 focus:ring-primary"
            >
              <option value="relevance">Relevance</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Reviews</option>
            </select>
          </div>

          {/* Search Results */}
          {sortedResults.length > 0 ? (
            <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12" : "space-y-4 mb-12"}>
              {sortedResults.map((product) => (
                viewMode === "grid" ? (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    unit={product.unit}
                    code={`PROD${product.id}`}
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
                ) : (
                  <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-row bg-white border-border">
                    <div className="relative w-48 h-48 bg-secondary flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover cursor-pointer"
                        onClick={() => handleProductClick(product)}
                      />
                      {product.organic && (
                        <Badge className="absolute top-2 left-2 bg-green-500 text-white">
                          <Leaf className="w-3 h-3 mr-1" />
                          Organic
                        </Badge>
                      )}
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-primary mb-1 uppercase tracking-wide">{product.producer}</p>
                          <h3 className="font-bold text-lg text-foreground mb-2 hover:text-primary cursor-pointer" onClick={() => handleProductClick(product)}>
                            {product.name}
                          </h3>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleFavorite(product.id)}
                          className="flex-shrink-0"
                        >
                          <Heart className={`w-5 h-5 ${favorites.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
                        </Button>
                      </div>
                      <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {product.distance}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {product.deliveryTime}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 mb-3">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground ml-1">
                          {product.rating} ({product.reviews} reviews)
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="font-bold text-2xl text-primary">${product.price}{product.unit}</span>
                        <Button className="bg-[#0A5D31] hover:bg-[#0d7a3f] text-white gap-2">
                          <ShoppingCart className="w-4 h-4" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </Card>
                )
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center rounded-2xl mb-12">
              <SearchIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
              <Button onClick={() => {
                setSearchQuery("")
                setSelectedCategory(null)
                setPriceRange(null)
                setMinRating(null)
              }} className="bg-[#0A5D31] hover:bg-[#0d7a3f] text-white">
                Clear Filters
              </Button>
            </Card>
          )}
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
