"use client"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users2, MessageCircle, Calendar, Award, TrendingUp, Heart, Users, BookOpen, MapPin, Star } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

const communityStats = {
  members: 12543,
  posts: 8921,
  events: 234,
  groups: 67,
}

const featuredGroups = [
  { id: 1, name: "Organic Farmers Network", members: 1234, description: "Connect with certified organic farmers" },
  { id: 2, name: "Urban Gardening Club", members: 856, description: "Share tips for city gardening" },
  { id: 3, name: "Farm-to-Table Chefs", members: 432, description: "Recipes and cooking with fresh produce" },
]

const recentPosts = [
  { id: 1, title: "Best practices for tomato growing", author: "Sarah Johnson", likes: 45, comments: 12 },
  { id: 2, title: "Composting tips for beginners", author: "Michael Chen", likes: 38, comments: 8 },
  { id: 3, title: "Seasonal planting guide", author: "Emily Rodriguez", likes: 52, comments: 15 },
]

export default function CommunityPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <main className="flex-1 overflow-auto">
        <div className="bg-gradient-to-b from-white via-gray-50/50 to-white">
          <div className="px-6 py-16 space-y-16 max-w-7xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-[#0A5D31]/10 rounded-full mb-6">
                <Users2 className="w-10 h-10 text-[#0A5D31]" />
              </div>
              <h1 className="text-5xl font-bold text-gray-900 mb-4">Community</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Connect with local farmers, share experiences, and support sustainable agriculture together
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="p-6 rounded-2xl border-2 border-gray-200 text-center">
                <Users className="w-8 h-8 text-[#0A5D31] mx-auto mb-2" />
                <div className="text-3xl font-bold text-gray-900">{communityStats.members.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Members</div>
              </Card>
              <Card className="p-6 rounded-2xl border-2 border-gray-200 text-center">
                <MessageCircle className="w-8 h-8 text-[#0A5D31] mx-auto mb-2" />
                <div className="text-3xl font-bold text-gray-900">{communityStats.posts.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Posts</div>
              </Card>
              <Card className="p-6 rounded-2xl border-2 border-gray-200 text-center">
                <Calendar className="w-8 h-8 text-[#0A5D31] mx-auto mb-2" />
                <div className="text-3xl font-bold text-gray-900">{communityStats.events}</div>
                <div className="text-sm text-gray-600">Events</div>
              </Card>
              <Card className="p-6 rounded-2xl border-2 border-gray-200 text-center">
                <Users2 className="w-8 h-8 text-[#0A5D31] mx-auto mb-2" />
                <div className="text-3xl font-bold text-gray-900">{communityStats.groups}</div>
                <div className="text-sm text-gray-600">Groups</div>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6 rounded-2xl border-2 border-gray-200 hover:border-[#0A5D31] transition-all hover:shadow-xl">
                <div className="w-12 h-12 bg-[#0A5D31]/10 rounded-xl flex items-center justify-center mb-4">
                  <MessageCircle className="w-6 h-6 text-[#0A5D31]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Forums</h3>
                <p className="text-gray-600 mb-4">Join discussions about farming, recipes, and sustainability</p>
                <Button className="w-full bg-[#0A5D31] hover:bg-[#0d7a3f] text-white rounded-full">Join Discussion</Button>
              </Card>

              <Card className="p-6 rounded-2xl border-2 border-gray-200 hover:border-[#0A5D31] transition-all hover:shadow-xl">
                <div className="w-12 h-12 bg-[#0A5D31]/10 rounded-xl flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-[#0A5D31]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Events</h3>
                <p className="text-gray-600 mb-4">Attend local farmers markets and community gatherings</p>
                <Link href="/events">
                  <Button className="w-full bg-[#0A5D31] hover:bg-[#0d7a3f] text-white rounded-full">View Events</Button>
                </Link>
              </Card>

              <Card className="p-6 rounded-2xl border-2 border-gray-200 hover:border-[#0A5D31] transition-all hover:shadow-xl">
                <div className="w-12 h-12 bg-[#0A5D31]/10 rounded-xl flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-[#0A5D31]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Leaderboard</h3>
                <p className="text-gray-600 mb-4">See top contributors and active community members</p>
                <Link href="/leaderboard">
                  <Button className="w-full bg-[#0A5D31] hover:bg-[#0d7a3f] text-white rounded-full">View Rankings</Button>
                </Link>
              </Card>

              <Card className="p-6 rounded-2xl border-2 border-gray-200 hover:border-[#0A5D31] transition-all hover:shadow-xl">
                <div className="w-12 h-12 bg-[#0A5D31]/10 rounded-xl flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-[#0A5D31]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Success Stories</h3>
                <p className="text-gray-600 mb-4">Read inspiring stories from our community</p>
                <Button className="w-full bg-[#0A5D31] hover:bg-[#0d7a3f] text-white rounded-full">Read Stories</Button>
              </Card>

              <Card className="p-6 rounded-2xl border-2 border-gray-200 hover:border-[#0A5D31] transition-all hover:shadow-xl">
                <div className="w-12 h-12 bg-[#0A5D31]/10 rounded-xl flex items-center justify-center mb-4">
                  <Users2 className="w-6 h-6 text-[#0A5D31]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Groups</h3>
                <p className="text-gray-600 mb-4">Join interest-based groups and connect with like-minded people</p>
                <Button className="w-full bg-[#0A5D31] hover:bg-[#0d7a3f] text-white rounded-full">Explore Groups</Button>
              </Card>

              <Card className="p-6 rounded-2xl border-2 border-gray-200 hover:border-[#0A5D31] transition-all hover:shadow-xl">
                <div className="w-12 h-12 bg-[#0A5D31]/10 rounded-xl flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-[#0A5D31]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Volunteer</h3>
                <p className="text-gray-600 mb-4">Help local farms and make a difference in your community</p>
                <Link href="/donations">
                  <Button className="w-full bg-[#0A5D31] hover:bg-[#0d7a3f] text-white rounded-full">Get Involved</Button>
                </Link>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="p-6 rounded-2xl border-2 border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Featured Groups</h3>
                <div className="space-y-4">
                  {featuredGroups.map((group) => (
                    <div key={group.id} className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                      <div className="w-12 h-12 bg-[#0A5D31]/10 rounded-xl flex items-center justify-center">
                        <Users2 className="w-6 h-6 text-[#0A5D31]" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900">{group.name}</h4>
                        <p className="text-sm text-gray-600">{group.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{group.members} members</p>
                      </div>
                      <Button variant="outline" size="sm" className="rounded-full">Join</Button>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 rounded-2xl border-2 border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Discussions</h3>
                <div className="space-y-4">
                  {recentPosts.map((post) => (
                    <div key={post.id} className="p-4 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100">
                      <h4 className="font-bold text-gray-900 mb-2">{post.title}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>By {post.author}</span>
                        <span className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          {post.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          {post.comments}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  )
}

