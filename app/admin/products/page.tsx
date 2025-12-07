"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Sparkles,
  Image as ImageIcon,
  Eye,
  EyeOff,
  Filter,
  Grid3x3,
  List,
  MoreVertical
} from "lucide-react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

const mockProducts = [
  {
    id: 1,
    name: "Organic Heirloom Tomatoes",
    price: 4.99,
    unit: "/lb",
    code: "TOMO001",
    image: "https://images.unsplash.com/photo-1592924357228-91a8676d3a88?w=800&h=800&fit=crop",
    category: "Vegetables",
    stock: 45,
    status: "active",
    organic: true,
    description: "Fresh, organic heirloom tomatoes grown without pesticides.",
  },
  {
    id: 2,
    name: "Fresh Local Carrots",
    price: 2.99,
    unit: "/lb",
    code: "CARR002",
    image: "https://images.unsplash.com/photo-1599599810694-b5ac4dd64b51?w=800&h=800&fit=crop",
    category: "Vegetables",
    stock: 32,
    status: "active",
    organic: true,
    description: "Crisp, sweet carrots harvested at peak ripeness.",
  },
  {
    id: 3,
    name: "Sweet Local Apples",
    price: 5.99,
    unit: "/lb",
    code: "APPL004",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b27c8a?w=800&h=800&fit=crop",
    category: "Fruits",
    stock: 0,
    status: "out_of_stock",
    organic: true,
    description: "Crisp, sweet apples picked fresh from our orchard.",
  },
]

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<any>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    unit: "/lb",
    code: "",
    category: "Vegetables",
    stock: "",
    organic: false,
    description: "",
    image: "",
  })

  const handleAIGenerate = async () => {
    setIsGenerating(true)
    setTimeout(() => {
      setFormData({
        ...formData,
        name: "Premium Organic Kale",
        description: "Nutrient-dense organic kale perfect for salads, smoothies, or sautéing. Grown using sustainable farming practices without pesticides. Rich in vitamins A, C, and K, with a fresh, earthy flavor that enhances any dish. Harvested at peak freshness to ensure maximum nutritional value and taste.",
        code: "KALE" + Math.floor(Math.random() * 1000).toString().padStart(3, '0'),
        category: "Vegetables",
        organic: true,
        price: "3.79",
        unit: "/bunch",
        stock: "50",
      })
      setIsGenerating(false)
    }, 2000)
  }

  const handleSave = () => {
    console.log("Saving product:", formData)
    setShowAddModal(false)
    setEditingProduct(null)
    setFormData({
      name: "",
      price: "",
      unit: "/lb",
      code: "",
      category: "Vegetables",
      stock: "",
      organic: false,
      description: "",
      image: "",
    })
  }

  const handleEdit = (product: any) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      price: product.price.toString(),
      unit: product.unit,
      code: product.code,
      category: product.category,
      stock: product.stock.toString(),
      organic: product.organic,
      description: product.description,
      image: product.image,
    })
    setShowAddModal(true)
  }

  const filteredProducts = mockProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.code.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Products</h1>
          <p className="text-gray-600">Manage your product listings and inventory</p>
        </div>
        <Button 
          className="bg-gradient-to-r from-[#0A5D31] to-[#0d7a3f] hover:from-[#0d7a3f] hover:to-[#0A5D31] text-white gap-2 shadow-lg"
          onClick={() => {
            setEditingProduct(null)
            setFormData({
              name: "",
              price: "",
              unit: "/lb",
              code: "",
              category: "Vegetables",
              stock: "",
              organic: false,
              description: "",
              image: "",
            })
            setShowAddModal(true)
          }}
        >
          <Plus className="w-5 h-5" />
          Add Product
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="border-2 shadow-lg">
        <CardContent className="p-5">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search products by name or SKU..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 border-2"
              />
            </div>
            <div className="flex gap-3">
              <select className="px-4 py-3 rounded-lg border-2 border-gray-200 bg-white text-sm font-medium focus:ring-2 focus:ring-[#0A5D31] focus:border-[#0A5D31] h-12">
                <option>All Categories</option>
                <option>Vegetables</option>
                <option>Fruits</option>
                <option>Herbs</option>
              </select>
              <select className="px-4 py-3 rounded-lg border-2 border-gray-200 bg-white text-sm font-medium focus:ring-2 focus:ring-[#0A5D31] focus:border-[#0A5D31] h-12">
                <option>All Status</option>
                <option>Active</option>
                <option>Out of Stock</option>
                <option>Draft</option>
              </select>
              <div className="flex border-2 border-gray-200 rounded-lg overflow-hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className={`h-12 w-12 rounded-none ${viewMode === "grid" ? "bg-[#0A5D31] text-white" : ""}`}
                >
                  <Grid3x3 className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className={`h-12 w-12 rounded-none ${viewMode === "list" ? "bg-[#0A5D31] text-white" : ""}`}
                >
                  <List className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="border-2 hover:shadow-2xl transition-all duration-300 overflow-hidden group">
              <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  {product.status === "active" ? (
                    <Badge className="bg-emerald-500 text-white border-0">
                      <Eye className="w-3 h-3 mr-1" />
                      Active
                    </Badge>
                  ) : (
                    <Badge className="bg-red-500 text-white border-0">
                      <EyeOff className="w-3 h-3 mr-1" />
                      Out of Stock
                    </Badge>
                  )}
                  {product.organic && (
                    <Badge className="bg-[#0A5D31] text-white border-0">Organic</Badge>
                  )}
                </div>
              </div>
              <CardContent className="p-5">
                <div className="mb-3">
                  <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
                  <p className="text-xs text-gray-500 font-mono">SKU: {product.code}</p>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-[#0A5D31]">${product.price}</span>
                    <span className="text-sm text-gray-500 ml-1">{product.unit}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Stock</p>
                    <p className={`font-bold ${product.stock > 0 ? "text-emerald-600" : "text-red-600"}`}>
                      {product.stock}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 border-2 hover:border-[#0A5D31] hover:bg-[#0A5D31] hover:text-white transition-all"
                    onClick={() => handleEdit(product)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    className="border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="border-2 hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <div className="flex gap-6">
                  <div className="w-32 h-32 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-bold text-xl text-gray-900">{product.name}</h3>
                          {product.status === "active" ? (
                            <Badge className="bg-emerald-500 text-white">Active</Badge>
                          ) : (
                            <Badge className="bg-red-500 text-white">Out of Stock</Badge>
                          )}
                          {product.organic && <Badge className="bg-[#0A5D31] text-white">Organic</Badge>}
                        </div>
                        <p className="text-sm text-gray-500 font-mono mb-2">SKU: {product.code}</p>
                        <p className="text-sm text-gray-600">{product.description}</p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-5 h-5" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div>
                          <p className="text-sm text-gray-500">Price</p>
                          <p className="text-2xl font-bold text-[#0A5D31]">${product.price}<span className="text-sm text-gray-500 ml-1">{product.unit}</span></p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Stock</p>
                          <p className={`text-xl font-bold ${product.stock > 0 ? "text-emerald-600" : "text-red-600"}`}>
                            {product.stock} units
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => handleEdit(product)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Product Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </DialogTitle>
            <DialogDescription>
              {editingProduct ? "Update product information" : "Create a new product listing"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* AI Generate Button */}
            {!editingProduct && (
              <div className="flex items-center justify-between p-5 bg-gradient-to-r from-purple-50 via-blue-50 to-purple-50 rounded-xl border-2 border-purple-200">
                <div>
                  <h4 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    One-Click AI Write
                  </h4>
                  <p className="text-sm text-gray-600">Let AI generate product details for you instantly</p>
                </div>
                <Button
                  onClick={handleAIGenerate}
                  disabled={isGenerating}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white gap-2 shadow-lg"
                >
                  <Sparkles className={`w-4 h-4 ${isGenerating ? "animate-spin" : ""}`} />
                  {isGenerating ? "Generating..." : "AI Generate"}
                </Button>
              </div>
            )}

            {/* Product Image */}
            <div>
              <Label className="text-base font-semibold">Product Image URL</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  placeholder="https://example.com/image.jpg"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="h-12 border-2"
                />
                <Button variant="outline" type="button" className="h-12">
                  <ImageIcon className="w-5 h-5" />
                </Button>
              </div>
              {formData.image && (
                <img src={formData.image} alt="Preview" className="mt-3 w-32 h-32 object-cover rounded-xl border-2 border-gray-200" />
              )}
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-base font-semibold">Product Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Organic Heirloom Tomatoes"
                  className="mt-2 h-12 border-2"
                />
              </div>
              <div>
                <Label htmlFor="code" className="text-base font-semibold">SKU Code *</Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="e.g., TOMO001"
                  className="mt-2 h-12 border-2"
                />
              </div>
            </div>

            {/* Price and Stock */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="price" className="text-base font-semibold">Price *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0.00"
                  className="mt-2 h-12 border-2"
                />
              </div>
              <div>
                <Label htmlFor="unit" className="text-base font-semibold">Unit</Label>
                <select
                  id="unit"
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  className="mt-2 w-full h-12 px-4 rounded-lg border-2 border-gray-200 bg-white text-sm font-medium focus:ring-2 focus:ring-[#0A5D31] focus:border-[#0A5D31]"
                >
                  <option>/lb</option>
                  <option>/pack</option>
                  <option>/bunch</option>
                  <option>/piece</option>
                  <option>/kg</option>
                </select>
              </div>
              <div>
                <Label htmlFor="stock" className="text-base font-semibold">Stock Quantity *</Label>
                <Input
                  id="stock"
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  placeholder="0"
                  className="mt-2 h-12 border-2"
                />
              </div>
            </div>

            {/* Category and Organic */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category" className="text-base font-semibold">Category *</Label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="mt-2 w-full h-12 px-4 rounded-lg border-2 border-gray-200 bg-white text-sm font-medium focus:ring-2 focus:ring-[#0A5D31] focus:border-[#0A5D31]"
                >
                  <option>Vegetables</option>
                  <option>Fruits</option>
                  <option>Herbs</option>
                  <option>Grains</option>
                  <option>Dairy</option>
                </select>
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={formData.organic}
                    onChange={(e) => setFormData({ ...formData, organic: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-300 text-[#0A5D31] focus:ring-[#0A5D31]"
                  />
                  <span className="text-base font-semibold">Organic Product</span>
                </label>
              </div>
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description" className="text-base font-semibold">Description *</Label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your product in detail..."
                rows={6}
                className="mt-2 w-full p-4 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-[#0A5D31] focus:border-[#0A5D31] resize-none"
              />
            </div>
          </div>

          <DialogFooter className="gap-3">
            <Button variant="outline" onClick={() => setShowAddModal(false)} className="h-12">
              Cancel
            </Button>
            <Button 
              className="bg-gradient-to-r from-[#0A5D31] to-[#0d7a3f] hover:from-[#0d7a3f] hover:to-[#0A5D31] text-white h-12"
              onClick={handleSave}
            >
              {editingProduct ? "Update Product" : "Create Product"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
