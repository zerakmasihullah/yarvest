"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { 
  Plus, 
  Image as ImageIcon,
  Video,
  Link as LinkIcon,
  Send,
  Heart,
  MessageCircle,
  Share2,
  Edit,
  Trash2,
  Calendar,
  Eye,
  Search,
  TrendingUp
} from "lucide-react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"

const mockPosts = [
  {
    id: 1,
    title: "Fresh Harvest This Week!",
    content: "Just harvested our organic tomatoes and carrots. Fresh, local, and pesticide-free! Available now in our store.",
    image: "https://images.unsplash.com/photo-1592924357228-91a8676d3a88?w=800&h=400&fit=crop",
    likes: 45,
    comments: 12,
    shares: 8,
    views: 234,
    published: "2024-01-15 10:30 AM",
    status: "published",
  },
  {
    id: 2,
    title: "Sustainable Farming Practices",
    content: "We're proud to share our commitment to sustainable farming. Learn about our eco-friendly methods that protect the environment while delivering fresh produce.",
    image: null,
    likes: 67,
    comments: 23,
    shares: 15,
    views: 456,
    published: "2024-01-14 02:15 PM",
    status: "published",
  },
  {
    id: 3,
    title: "New Product Launch: Organic Kale",
    content: "Introducing our newest addition - premium organic kale! Perfect for salads, smoothies, and cooking.",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=800&h=400&fit=crop",
    likes: 34,
    comments: 8,
    shares: 5,
    views: 189,
    published: "2024-01-13 09:00 AM",
    status: "draft",
  },
]

export default function CommunityPage() {
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingPost, setEditingPost] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
    status: "draft",
  })

  const handleSave = () => {
    console.log("Saving post:", formData)
    setShowAddModal(false)
    setEditingPost(null)
    setFormData({
      title: "",
      content: "",
      image: "",
      status: "draft",
    })
  }

  const handleEdit = (post: any) => {
    setEditingPost(post)
    setFormData({
      title: post.title,
      content: post.content,
      image: post.image || "",
      status: post.status,
    })
    setShowAddModal(true)
  }

  const filteredPosts = mockPosts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Community Posts</h1>
          <p className="text-gray-600">Share updates, tips, and connect with your customers</p>
        </div>
        <Button 
          className="bg-gradient-to-r from-[#0A5D31] to-[#0d7a3f] hover:from-[#0d7a3f] hover:to-[#0A5D31] text-white gap-2 shadow-lg"
          onClick={() => {
            setEditingPost(null)
            setFormData({
              title: "",
              content: "",
              image: "",
              status: "draft",
            })
            setShowAddModal(true)
          }}
        >
          <Plus className="w-5 h-5" />
          Create Post
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-2 hover:shadow-lg transition-all">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-500 mb-1">Total Posts</p>
            <p className="text-2xl font-bold text-gray-900">{mockPosts.length}</p>
          </CardContent>
        </Card>
        <Card className="border-2 hover:shadow-lg transition-all">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-500 mb-1">Total Likes</p>
            <p className="text-2xl font-bold text-[#0A5D31]">
              {mockPosts.reduce((sum, post) => sum + post.likes, 0)}
            </p>
          </CardContent>
        </Card>
        <Card className="border-2 hover:shadow-lg transition-all">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-500 mb-1">Total Views</p>
            <p className="text-2xl font-bold text-blue-600">
              {mockPosts.reduce((sum, post) => sum + post.views, 0)}
            </p>
          </CardContent>
        </Card>
        <Card className="border-2 hover:shadow-lg transition-all">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-500 mb-1">Engagement Rate</p>
            <p className="text-2xl font-bold text-purple-600">12.5%</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="border-2 shadow-lg">
        <CardContent className="p-5">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search posts by title or content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 border-2"
            />
          </div>
        </CardContent>
      </Card>

      {/* Posts */}
      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="border-2 hover:shadow-xl transition-all">
            {post.image && (
              <div className="h-64 bg-gray-100 overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
              </div>
            )}
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-2xl mb-2">{post.title}</CardTitle>
                  <Badge className={post.status === "published" ? "bg-emerald-500 text-white" : "bg-yellow-500 text-white"}>
                    {post.status}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(post)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>
              
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    <span className="font-semibold">{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    <span className="font-semibold">{post.comments}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Share2 className="w-4 h-4" />
                    <span className="font-semibold">{post.shares}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span className="font-semibold">{post.views}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>{post.published}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create/Edit Post Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {editingPost ? "Edit Post" : "Create New Post"}
            </DialogTitle>
            <DialogDescription>
              Share updates, tips, or news with the community
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-4">
            <div>
              <Label htmlFor="title" className="text-base font-semibold">Post Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Fresh Harvest This Week!"
                className="mt-2 h-12 border-2"
              />
            </div>

            <div>
              <Label htmlFor="content" className="text-base font-semibold">Content *</Label>
              <textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Write your post content here..."
                rows={8}
                className="mt-2 w-full p-4 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-[#0A5D31] focus:border-[#0A5D31] resize-none"
              />
            </div>

            <div>
              <Label htmlFor="image" className="text-base font-semibold">Image URL (Optional)</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  className="h-12 border-2"
                />
                <Button variant="outline" type="button" className="h-12">
                  <ImageIcon className="w-5 h-5" />
                </Button>
              </div>
              {formData.image && (
                <img src={formData.image} alt="Preview" className="mt-3 w-full h-48 object-cover rounded-xl border-2 border-gray-200" />
              )}
            </div>

            <div>
              <Label htmlFor="status" className="text-base font-semibold">Status</Label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="mt-2 w-full h-12 px-4 rounded-lg border-2 border-gray-200 bg-white text-sm font-medium focus:ring-2 focus:ring-[#0A5D31] focus:border-[#0A5D31]"
              >
                <option value="draft">Draft</option>
                <option value="published">Publish Now</option>
                <option value="scheduled">Schedule</option>
              </select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddModal(false)} className="h-12">
              Cancel
            </Button>
            <Button 
              className="bg-gradient-to-r from-[#0A5D31] to-[#0d7a3f] hover:from-[#0d7a3f] hover:to-[#0A5D31] text-white h-12 gap-2"
              onClick={handleSave}
            >
              <Send className="w-4 h-4" />
              {editingPost ? "Update Post" : formData.status === "published" ? "Publish Post" : "Save Draft"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

