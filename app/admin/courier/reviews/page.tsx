"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Star,
  MessageSquare,
  Search,
  ThumbsUp
} from "lucide-react"
import { useState } from "react"

const mockReviews = [
  {
    id: 1,
    customer: "John Doe",
    rating: 5,
    comment: "Fast and friendly delivery! The driver was professional and arrived exactly on time. Highly recommend!",
    date: "2024-01-15",
    orderId: "ORD-001",
    helpful: 12,
    response: null,
  },
  {
    id: 2,
    customer: "Jane Smith",
    rating: 4,
    comment: "Good service, arrived on time. Package was well-handled.",
    date: "2024-01-14",
    orderId: "ORD-002",
    helpful: 5,
    response: "Thank you for your feedback!",
  },
  {
    id: 3,
    customer: "Mike Johnson",
    rating: 5,
    comment: "Excellent! Very professional and courteous. Will definitely use again.",
    date: "2024-01-13",
    orderId: "ORD-003",
    helpful: 8,
    response: null,
  },
  {
    id: 4,
    customer: "Sarah Williams",
    rating: 3,
    comment: "Delivery was okay, but arrived a bit later than expected.",
    date: "2024-01-12",
    orderId: "ORD-004",
    helpful: 2,
    response: null,
  },
  {
    id: 5,
    customer: "David Brown",
    rating: 5,
    comment: "Outstanding service! The driver went above and beyond. Five stars!",
    date: "2024-01-11",
    orderId: "ORD-005",
    helpful: 15,
    response: "We appreciate your kind words!",
  },
]

export default function ReviewsPage() {
  const [ratingFilter, setRatingFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredReviews = mockReviews.filter((review) => {
    const matchesRating = ratingFilter === "all" || review.rating.toString() === ratingFilter
    const matchesSearch = 
      review.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesRating && matchesSearch
  })

  const stats = {
    totalReviews: mockReviews.length,
    averageRating: mockReviews.reduce((sum, r) => sum + r.rating, 0) / mockReviews.length,
    fiveStar: mockReviews.filter(r => r.rating === 5).length,
    fourStar: mockReviews.filter(r => r.rating === 4).length,
    threeStar: mockReviews.filter(r => r.rating === 3).length,
    twoStar: mockReviews.filter(r => r.rating === 2).length,
    oneStar: mockReviews.filter(r => r.rating === 1).length,
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Reviews & Ratings</h1>
          <p className="text-gray-600">View customer feedback and manage your reputation</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-2 hover:shadow-xl transition-all bg-gradient-to-br from-yellow-50 to-amber-50">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Star className="w-8 h-8 fill-yellow-400 text-yellow-400" />
              <p className="text-4xl font-bold text-gray-900">{stats.averageRating.toFixed(1)}</p>
            </div>
            <p className="text-sm text-gray-600">Average Rating</p>
            <p className="text-xs text-gray-500 mt-1">{stats.totalReviews} total reviews</p>
          </CardContent>
        </Card>

        <Card className="border-2 hover:shadow-lg transition-all">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 ${i < 5 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.fiveStar}</p>
            <p className="text-sm text-gray-600">5 Star Reviews</p>
          </CardContent>
        </Card>

        <Card className="border-2 hover:shadow-lg transition-all">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-1 mb-2">
              {[...Array(4)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.fourStar}</p>
            <p className="text-sm text-gray-600">4 Star Reviews</p>
          </CardContent>
        </Card>

        <Card className="border-2 hover:shadow-lg transition-all">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-gray-600 mb-2">Rating Distribution</p>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span>5★</span>
                <div className="flex-1 mx-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-yellow-400" 
                    style={{ width: `${(stats.fiveStar / stats.totalReviews) * 100}%` }}
                  />
                </div>
                <span>{stats.fiveStar}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span>4★</span>
                <div className="flex-1 mx-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-yellow-400" 
                    style={{ width: `${(stats.fourStar / stats.totalReviews) * 100}%` }}
                  />
                </div>
                <span>{stats.fourStar}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span>3★</span>
                <div className="flex-1 mx-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-yellow-400" 
                    style={{ width: `${(stats.threeStar / stats.totalReviews) * 100}%` }}
                  />
                </div>
                <span>{stats.threeStar}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-2 shadow-lg">
        <CardContent className="p-5">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search reviews..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 border-2"
              />
            </div>
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="px-4 py-2 rounded-lg border-2 border-gray-200 bg-white text-sm font-medium focus:ring-2 focus:ring-[#5a9c3a] focus:border-[#5a9c3a] h-12"
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <Card key={review.id} className="border-2 hover:shadow-xl transition-all">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#5a9c3a] to-[#0d7a3f] flex items-center justify-center text-white font-bold">
                      {review.customer.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{review.customer}</p>
                      <p className="text-xs text-gray-500">{review.date} • Order {review.orderId}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                    <Badge className={
                      review.rating >= 4 ? "bg-emerald-500 text-white" :
                      review.rating >= 3 ? "bg-yellow-500 text-white" :
                      "bg-red-500 text-white"
                    }>
                      {review.rating} Stars
                    </Badge>
                  </div>
                  <p className="text-gray-700 mb-3">{review.comment}</p>
                  {review.response && (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-xs font-semibold text-blue-900 mb-1">Your Response</p>
                      <p className="text-sm text-blue-800">{review.response}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{review.helpful} helpful</span>
                  </div>
                </div>
                {!review.response && (
                  <Button variant="outline" size="sm" className="border-2">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Respond
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

