"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import api from "@/lib/axios"

interface Category {
  id: number
  name: string
  image?: string
  slug?: string
  href?: string
  [key: string]: any
}

export function FreshFoodCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true)
        
        // Use /categories endpoint (baseURL already includes /api)
        const response = await api.get("/categories")
        
        // Get API base URL for constructing image URLs
        // Remove /api from baseURL for images since they're usually in storage/public
        const apiBaseURL = process.env.NEXT_PUBLIC_API_URL || api.defaults.baseURL || 'https://violet-bison-661615.hostingersite.com/api'
        const baseURLWithoutApi = apiBaseURL.replace(/\/api$/, '') // Remove trailing /api
        
        // Map API response to component format
        const categoriesData = response.data.data || response.data || []
        const mappedCategories = categoriesData.map((cat: any) => {
          // Construct full image URL if it's a relative path
          let imageUrl = "/placeholder.svg"
          if (cat.image) {
            if (cat.image.startsWith("http://") || cat.image.startsWith("https://")) {
              // Already a full URL
              imageUrl = cat.image
            } else if (cat.image.startsWith("/")) {
              // Absolute path from root
              imageUrl = `${baseURLWithoutApi}${cat.image}`
            } else {
              // Relative path - prepend base URL without /api
              imageUrl = `${baseURLWithoutApi}/${cat.image}`
            }
          }
          
          // Generate slug from name if not provided
          const slug = cat.slug || cat.name.toLowerCase().replace(/\s+/g, "-")
          
          return {
            id: cat.id,
            name: cat.name,
            image: imageUrl,
            href: `/category/${slug}`,
            slug: slug,
          }
        })
        
        setCategories(mappedCategories)
        setError(null)
      } catch (err: any) {
        console.error("Error fetching categories:", err)
        setError(err.message || "Failed to load categories")
        // Fallback to empty array on error
        setCategories([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (isLoading) {
    return (
      <div className="w-full">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-4xl font-bold text-foreground">Shop by Category</h2>
            <p className="text-muted-foreground text-base mt-2">Explore fresh, local, and organic produce</p>
          </div>
          <Link href="/categories" className="text-[#0A5D31] font-semibold hover:text-[#0d7a3f] text-sm transition-colors">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12 gap-4">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="text-center animate-pulse">
              <div className="h-20 w-20 mx-auto mb-2 bg-gray-200 rounded-xl"></div>
              <div className="h-4 w-16 mx-auto bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-4xl font-bold text-foreground">Shop by Category</h2>
            <p className="text-muted-foreground text-base mt-2">Explore fresh, local, and organic produce</p>
          </div>
          <Link href="/categories" className="text-[#0A5D31] font-semibold hover:text-[#0d7a3f] text-sm transition-colors">
            View All
          </Link>
        </div>
        <div className="text-center py-8 text-gray-500">
          <p>Unable to load categories. Please try again later.</p>
        </div>
      </div>
    )
  }

  if (categories.length === 0) {
    return (
      <div className="w-full">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-4xl font-bold text-foreground">Shop by Category</h2>
            <p className="text-muted-foreground text-base mt-2">Explore fresh, local, and organic produce</p>
          </div>
          <Link href="/categories" className="text-[#0A5D31] font-semibold hover:text-[#0d7a3f] text-sm transition-colors">
            View All
          </Link>
        </div>
        <div className="text-center py-8 text-gray-500">
          <p>No categories available at the moment.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-4xl font-bold text-foreground">Shop by Category</h2>
          <p className="text-muted-foreground text-base mt-2">Explore fresh, local, and organic produce</p>
        </div>
        <Link href="/categories" className="text-[#0A5D31] font-semibold hover:text-[#0d7a3f] text-sm transition-colors">
          View All
        </Link>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12 gap-4">
        {categories.map((category) => (
          <Link key={category.id || category.name} href={category.href || `/category/${category.slug || category.name.toLowerCase().replace(/\s+/g, "-")}`}>
            <div className="group cursor-pointer text-center">
              <div className="relative overflow-hidden rounded-xl h-20 w-20 mx-auto mb-2 shadow-md hover:shadow-lg transition-all duration-300 border-2 border-gray-100 hover:border-[#0A5D31] hover:scale-105">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="font-medium text-foreground text-xs group-hover:text-[#0A5D31] transition-colors line-clamp-2">
                {category.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
