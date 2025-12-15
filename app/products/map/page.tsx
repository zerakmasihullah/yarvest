"use client"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Map as MapIcon, ArrowLeft } from "lucide-react"
import { useState, useMemo, useEffect } from "react"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"

const MapView = dynamic(() => import("@/components/map-view").then(mod => ({ default: mod.MapView })), {
  ssr: false,
})
import { InfiniteScrollFetcher } from "@/components/infinite-scroll-fetcher"
import { ApiProduct } from "@/components/api-product-card"
import { calculateProductPrices } from "@/lib/product-utils"
import { getImageUrl } from "@/lib/utils"
import Link from "next/link"

interface SellerLocation {
  id: number
  sellerId: number
  sellerName: string
  lat: number
  lng: number
  location: string
  products: ApiProduct[]
  image?: string
}

export default function ProductsMapPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [products, setProducts] = useState<ApiProduct[]>([])
  const router = useRouter()

  // Group products by seller location
  const sellerLocations = useMemo(() => {
    const sellerMap = new Map<string, {
      sellerId: number
      sellerUniqueId: string
      sellerName: string
      lat: number
      lng: number
      location: string
      products: ApiProduct[]
      image?: string
      rating?: number
      reviewsCount?: number
    }>()

    products.forEach(product => {
      // Seller location data is now included directly from the API
      const seller = product.seller as any
      
      // Check if seller has latitude and longitude (from new API)
      if (!seller?.latitude || !seller?.longitude) {
        return // Skip products without coordinates
      }

      const lat = parseFloat(seller.latitude)
      const lng = parseFloat(seller.longitude)

      if (isNaN(lat) || isNaN(lng)) return

      const sellerUniqueId = seller.unique_id || seller.id.toString()
      const locationStr = seller.address?.full_location || 
        (seller.address?.city && seller.address?.state 
          ? `${seller.address.city}, ${seller.address.state}` 
          : '')
      
      if (!sellerMap.has(sellerUniqueId)) {
        sellerMap.set(sellerUniqueId, {
          sellerId: seller.id,
          sellerUniqueId,
          sellerName: seller.full_name || 'Unknown Seller',
          lat,
          lng,
          location: locationStr,
          products: [],
          image: seller.image ? getImageUrl(seller.image) : undefined,
          rating: product.reviews?.average_rating,
          reviewsCount: product.reviews?.total || 0,
        })
      }

      const sellerData = sellerMap.get(sellerUniqueId)!
      sellerData.products.push(product)
      // Update rating if this product has better reviews
      if (product.reviews?.average_rating && (!sellerData.rating || product.reviews.average_rating > sellerData.rating)) {
        sellerData.rating = product.reviews.average_rating
      }
      sellerData.reviewsCount = (sellerData.reviewsCount || 0) + (product.reviews?.total || 0)
    })

    return Array.from(sellerMap.values()).map((seller) => ({
      id: seller.sellerId,
      sellerId: seller.sellerId,
      sellerUniqueId: seller.sellerUniqueId,
      name: seller.sellerName,
      lat: seller.lat,
      lng: seller.lng,
      location: seller.location,
      products: seller.products,
      image: seller.image,
      productImage: seller.products[0]?.main_image ? getImageUrl(seller.products[0].main_image, seller.products[0].name) : seller.image,
      productsCount: seller.products.length,
      rating: seller.rating,
      reviews: seller.reviewsCount,
      link: `/sellers/${seller.sellerUniqueId}`,
    }))
  }, [products])

  // Calculate map center
  const mapCenter = useMemo(() => {
    if (sellerLocations.length === 0) return [37.7749, -122.4194] as [number, number]
    const avgLat = sellerLocations.reduce((sum, loc) => sum + loc.lat, 0) / sellerLocations.length
    const avgLng = sellerLocations.reduce((sum, loc) => sum + loc.lng, 0) / sellerLocations.length
    return [avgLat, avgLng] as [number, number]
  }, [sellerLocations])

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      
      <main className="flex-1 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-white via-green-50/30 to-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-5 shadow-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push("/products")}
                className="rounded-full hover:bg-green-50"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <div className="p-2 bg-[#5a9c3a]/10 rounded-xl">
                    <MapIcon className="h-7 w-7 text-[#5a9c3a]" />
                  </div>
                  Products Map View
                </h1>
                <p className="text-sm text-gray-600 mt-2 flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <ArrowLeft className="w-4 h-4" />
                    {sellerLocations.length} seller locations
                  </span>
                  <span className="text-gray-400">•</span>
                  <span>{products.length} products available</span>
                </p>
              </div>
            </div>
            <Button
              onClick={() => router.push("/products")}
              variant="outline"
              className="border-[#5a9c3a] text-[#5a9c3a] hover:bg-[#5a9c3a] hover:text-white transition-all shadow-sm hover:shadow-md"
            >
              Back to Products
            </Button>
          </div>
        </div>

        {/* Map Container */}
        <div className="h-[calc(100vh-140px)] w-full relative">
          {/* Load products with locations */}
          <InfiniteScrollFetcher<ApiProduct>
            url="/products/with-locations"
            limit={100}
            enabled={true}
            gridClassName="hidden"
            renderItem={() => null}
            renderLoading={() => null}
            renderError={() => null}
            renderEmpty={() => null}
            onSuccess={(data) => {
              setProducts(prev => {
                const newProducts = Array.isArray(data) ? data : []
                const existingIds = new Set(prev.map(p => p.id))
                const uniqueNewProducts = newProducts.filter(p => !existingIds.has(p.id))
                return [...prev, ...uniqueNewProducts]
              })
            }}
          />

          {sellerLocations.length > 0 ? (
            <MapView
              locations={sellerLocations.map(loc => ({
                id: loc.id,
                name: loc.name,
                lat: loc.lat,
                lng: loc.lng,
                location: loc.location,
                image: loc.image,
                productImage: loc.productImage,
                link: loc.link,
                products: loc.productsCount,
                rating: loc.rating,
                reviews: loc.reviews,
                productsList: loc.products.map(p => ({
                  id: p.id,
                  name: p.name,
                  price: calculateProductPrices(p).price,
                  image: getImageUrl(p.main_image, p.name),
                  link: `/products/${p.unique_id || p.id}`,
                })),
              }))}
              center={mapCenter}
              zoom={6}
              showHeatMap={false}
              title=""
            />
          ) : (
            <div className="h-full flex items-center justify-center bg-gradient-to-br from-gray-50 via-green-50/20 to-gray-50">
              <div className="text-center p-8">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-[#5a9c3a]/20 rounded-full blur-xl animate-pulse"></div>
                  <MapIcon className="w-20 h-20 text-[#5a9c3a] mx-auto relative animate-bounce" />
                </div>
                <p className="text-gray-700 font-semibold text-lg mb-2">Loading product locations...</p>
                <p className="text-sm text-gray-500">Please wait while we fetch product data</p>
                <div className="mt-4 flex justify-center gap-2">
                  <div className="w-2 h-2 bg-[#5a9c3a] rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                  <div className="w-2 h-2 bg-[#5a9c3a] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-[#5a9c3a] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
