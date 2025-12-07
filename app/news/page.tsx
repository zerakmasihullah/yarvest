"use client"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Newspaper, Calendar, User, ArrowRight, TrendingUp, Clock, Tag } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

const newsArticles = [
  {
    id: 1,
    title: "Local Farmers Market Opens New Location",
    excerpt: "The community celebrates the opening of a new farmers market in downtown, featuring over 50 local vendors.",
    image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&h=600&fit=crop",
    author: "Sarah Johnson",
    date: "2 days ago",
    category: "Community",
    featured: true,
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Sustainable Farming Practices on the Rise",
    excerpt: "More local farms are adopting sustainable practices, reducing environmental impact while increasing yields.",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfefc4db?w=800&h=600&fit=crop",
    author: "Michael Chen",
    date: "5 days ago",
    category: "Farming",
    featured: true,
    readTime: "7 min read",
  },
  {
    id: 3,
    title: "New Organic Certification Program Launched",
    excerpt: "A new certification program helps small farms achieve organic status with reduced costs and paperwork.",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad576?w=800&h=600&fit=crop",
    author: "Emily Rodriguez",
    date: "1 week ago",
    category: "Agriculture",
    featured: false,
    readTime: "4 min read",
  },
  {
    id: 4,
    title: "Harvest Season Brings Record Yields",
    excerpt: "This year's harvest season has been exceptional, with many farms reporting record-breaking yields.",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=600&fit=crop",
    author: "David Thompson",
    date: "2 weeks ago",
    category: "Harvest",
    featured: false,
    readTime: "6 min read",
  },
  {
    id: 5,
    title: "Community Garden Initiative Expands",
    excerpt: "The city's community garden program expands to three new neighborhoods, bringing fresh produce closer to residents.",
    image: "https://images.unsplash.com/photo-1592924357228-91a8676d3a88?w=800&h=600&fit=crop",
    author: "Lisa Wang",
    date: "3 weeks ago",
    category: "Community",
    featured: false,
    readTime: "5 min read",
  },
  {
    id: 6,
    title: "Farm-to-Table Movement Gains Momentum",
    excerpt: "Restaurants partner with local farms to create menus featuring fresh, locally-sourced ingredients.",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
    author: "James Wilson",
    date: "1 month ago",
    category: "Food",
    featured: false,
    readTime: "8 min read",
  },
]

export default function NewsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = ["All", "Community", "Farming", "Agriculture", "Harvest", "Food"]
  const filteredArticles = selectedCategory && selectedCategory !== "All"
    ? newsArticles.filter(article => article.category === selectedCategory)
    : newsArticles

  const featuredArticles = filteredArticles.filter(article => article.featured)
  const regularArticles = filteredArticles.filter(article => !article.featured)

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <main className="flex-1 overflow-auto bg-white">
        {/* Simple Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#0A5D31]/10 rounded-xl flex items-center justify-center">
                <Newspaper className="w-6 h-6 text-[#0A5D31]" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900">News & Stories</h1>
                <p className="text-gray-500 text-sm mt-1">Latest updates from the farming community</p>
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 mt-6">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category === "All" ? null : category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category || (!selectedCategory && category === "All")
                      ? "bg-[#0A5D31] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Featured Articles */}
          {featuredArticles.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-5 h-5 text-[#0A5D31]" />
                <h2 className="text-2xl font-bold text-gray-900">Featured Stories</h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredArticles.map((article, idx) => (
                  <Link key={article.id} href={`/news/${article.id}`}>
                    <article className={`group relative overflow-hidden rounded-xl bg-white border border-gray-200 hover:shadow-lg transition-all ${
                      idx === 0 ? "lg:col-span-2" : ""
                    }`}>
                      <div className={`relative ${idx === 0 ? "h-96" : "h-64"} overflow-hidden`}>
                        <img 
                          src={article.image} 
                          alt={article.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                        <Badge className="absolute top-4 left-4 bg-[#0A5D31] text-white border-0">
                          Featured
                        </Badge>
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                          <Badge variant="outline" className="mb-3 bg-white/20 text-white border-white/30">
                            {article.category}
                          </Badge>
                          <h3 className={`font-bold mb-2 ${idx === 0 ? "text-3xl" : "text-xl"} line-clamp-2`}>
                            {article.title}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-white/90">
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              {article.author}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {article.readTime}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {article.date}
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Regular Articles */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest News</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularArticles.map((article) => (
                <Link key={article.id} href={`/news/${article.id}`}>
                  <article className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={article.image} 
                        alt={article.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-white/90 text-gray-700 border-0">
                          <Tag className="w-3 h-3 mr-1" />
                          {article.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-[#0A5D31] transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{article.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-3">
                          <span>{article.author}</span>
                          <span>•</span>
                          <span>{article.date}</span>
                        </div>
                        <div className="flex items-center gap-1 text-[#0A5D31] font-medium">
                          Read More
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  )
}
