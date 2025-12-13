"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, ThumbsUp, Flag, CheckCircle } from "lucide-react"
import { useState } from "react"

interface Product {
  id: number
  name: string
  rating: number
  reviews: number
}

interface Review {
  id: number
  userName: string
  userImage?: string
  rating: number
  date: string
  comment: string
  verified: boolean
  helpful: number
}

const mockReviews: Review[] = [
  {
    id: 1,
    userName: "Sarah Johnson",
    rating: 5,
    date: "2 days ago",
    comment: "Absolutely amazing quality! The tomatoes were so fresh and flavorful. Will definitely order again. The packaging was excellent and everything arrived in perfect condition.",
    verified: true,
    helpful: 12,
  },
  {
    id: 2,
    userName: "Michael Chen",
    rating: 5,
    date: "1 week ago",
    comment: "Best tomatoes I've ever had. The organic certification gives me peace of mind. Highly recommend! The flavor is incredible and they're perfect for salads.",
    verified: true,
    helpful: 8,
  },
  {
    id: 3,
    userName: "Emily Rodriguez",
    rating: 4,
    date: "2 weeks ago",
    comment: "Great product, very fresh. The delivery was fast and packaging was excellent. Will order again soon!",
    verified: false,
    helpful: 5,
  },
  {
    id: 4,
    userName: "David Thompson",
    rating: 5,
    date: "3 weeks ago",
    comment: "These tomatoes are incredible! So much better than store-bought. The farm-fresh quality really shows. Perfect for making homemade pasta sauce.",
    verified: true,
    helpful: 15,
  },
  {
    id: 5,
    userName: "Lisa Wang",
    rating: 4,
    date: "1 month ago",
    comment: "Very satisfied with my purchase. The tomatoes are fresh and taste great. Good value for money.",
    verified: true,
    helpful: 3,
  },
]

interface ProductReviewsProps {
  product: Product
}

export function ProductReviews({ product }: ProductReviewsProps) {
  const [helpfulReviews, setHelpfulReviews] = useState<number[]>([])

  const handleHelpful = (reviewId: number) => {
    setHelpfulReviews((prev) => (prev.includes(reviewId) ? prev.filter((id) => id !== reviewId) : [...prev, reviewId]))
  }

  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: mockReviews.filter((r) => Math.floor(r.rating) === rating).length,
    percentage: (mockReviews.filter((r) => Math.floor(r.rating) === rating).length / mockReviews.length) * 100,
  }))

  return (
    <div className="mt-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-900">Reviews</h3>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-lg font-semibold text-gray-900">{product.rating}</span>
          <span className="text-sm text-gray-500">({product.reviews})</span>
        </div>
      </div>

      <div className="space-y-3">
        {mockReviews.slice(0, 3).map((review) => (
          <div key={review.id} className="pb-4 border-b border-gray-100 last:border-0">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#5a9c3a] flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                {review.userName.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="font-semibold text-gray-900 text-sm">{review.userName}</span>
                  {review.verified && (
                    <Badge className="bg-blue-100 text-blue-700 text-xs px-2 py-0 rounded-full">
                      Verified
                    </Badge>
                  )}
                  <span className="text-xs text-gray-500">{review.date}</span>
                </div>
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{review.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

