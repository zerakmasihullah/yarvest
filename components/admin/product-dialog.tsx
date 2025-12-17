"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sparkles, Upload, X, ImageIcon } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import type { Unit, Category, ProductType } from "@/lib/product-api"
import api from "@/lib/axios"
import { toast } from "sonner"

interface ProductDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  formData: {
    main_image: string
    name: string
    sku: string
    price: string
    discount: string
    unite_id: string
    stock: string
    product_category_id: string
    product_type_id: string
    status: boolean
    excerpt: string
    details: string
  }
  setFormData: React.Dispatch<React.SetStateAction<{
    main_image: string
    name: string
    sku: string
    price: string
    discount: string
    unite_id: string
    stock: string
    product_category_id: string
    product_type_id: string
    status: boolean
    excerpt: string
    details: string
  }>>
  editingProduct: any | null
  isGenerating: boolean
  isLoading: boolean
  loadingData: boolean
  units: Unit[]
  categories: Category[]
  productTypes: ProductType[]
  onAIGenerate: () => void
  onSave: () => void
}

export function ProductDialog({
  open,
  onOpenChange,
  formData,
  setFormData,
  editingProduct,
  isGenerating,
  isLoading,
  loadingData,
  units,
  categories,
  productTypes,
  onAIGenerate,
  onSave,
}: ProductDialogProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Set preview when formData.main_image changes
  useEffect(() => {
    if (formData.main_image) {
      setImagePreview(formData.main_image)
    } else {
      setImagePreview(null)
    }
  }, [formData.main_image])

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB')
      return
    }

    setIsUploadingImage(true)

    try {
      // Try to upload image to backend first
      const formDataToUpload = new FormData()
      formDataToUpload.append('image', file)
      formDataToUpload.append('type', 'product')

      // Attempt upload to backend
      const response = await api.post('/upload-image', formDataToUpload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).catch(() => null)

      // If backend returns a URL, use it
      if (response?.data?.url || response?.data?.data?.url) {
        const imageUrl = response.data?.url || response.data?.data?.url
        setFormData({ ...formData, main_image: imageUrl })
        setImagePreview(imageUrl)
        toast.success('Image uploaded successfully')
        setIsUploadingImage(false)
        return
      }
    } catch (error: any) {
      // Silently fail and use base64 fallback
      console.log('Upload endpoint not available, using base64')
    }

    // Fallback: convert to base64 for preview and storage
    // This works with the backend since it accepts main_image as a string
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64String = reader.result as string
      setFormData({ ...formData, main_image: base64String })
      setImagePreview(base64String)
      toast.success('Image loaded successfully')
      setIsUploadingImage(false)
    }
    reader.onerror = () => {
      toast.error('Failed to load image')
      setIsUploadingImage(false)
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveImage = () => {
    setFormData({ ...formData, main_image: "" })
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleImageUrlChange = (url: string) => {
    setFormData({ ...formData, main_image: url })
    setImagePreview(url)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <DialogHeader className="pb-4 border-b">
          <DialogTitle className="text-2xl font-bold text-gray-900">
            {editingProduct ? "Edit Product" : "Add New Product"}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            {editingProduct ? "Update your product information" : "Fill in the details to create a new product"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* AI Generate Section - Only for new products */}
          {!editingProduct && (
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#5a9c3a] to-[#0d7a3f]">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">AI Generate</h4>
                  <p className="text-sm text-gray-600">Let AI help you fill in product details</p>
                </div>
              </div>
              <Button
                onClick={onAIGenerate}
                disabled={isGenerating}
                className="bg-[#5a9c3a] hover:bg-[#0d7a3f] text-white"
              >
                <Sparkles className={`w-4 h-4 mr-2 ${isGenerating ? "animate-spin" : ""}`} />
                {isGenerating ? "Generating..." : "Generate"}
              </Button>
            </div>
          )}

          {/* Image Upload Section */}
          <div className="space-y-3">
            <Label className="text-base font-semibold text-gray-900">Product Image</Label>
            <div className="flex gap-4">
              {/* Image Preview */}
              <div className="flex-shrink-0">
                {imagePreview ? (
                  <div className="relative w-32 h-32 rounded-lg border-2 border-gray-200 overflow-hidden bg-gray-50">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <div className="w-32 h-32 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                    <ImageIcon className="w-8 h-8 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Upload Options */}
              <div className="flex-1 space-y-3">
                <div className="flex gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                    id="image-upload"
                    disabled={isUploadingImage}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploadingImage}
                    className="flex-1 border-2 border-dashed hover:border-[#5a9c3a] hover:bg-green-50"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {isUploadingImage ? "Uploading..." : "Upload Image"}
                  </Button>
                </div>
                <div className="relative">
                  <Input
                    placeholder="Or enter image URL"
                    value={formData.main_image}
                    onChange={(e) => handleImageUrlChange(e.target.value)}
                    className="pr-10"
                  />
                  {formData.main_image && (
                    <button
                      type="button"
                      onClick={() => {
                        const url = formData.main_image
                        if (url) {
                          setImagePreview(url)
                        }
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-[#5a9c3a] hover:underline"
                    >
                      Load
                    </button>
                  )}
                </div>
                <p className="text-xs text-gray-500">Upload an image file or paste an image URL. Max size: 5MB</p>
              </div>
            </div>
          </div>

          {/* Basic Information Section */}
          <div className="space-y-4 border-t pt-4">
            <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                Product Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Organic Tomatoes"
                className="h-10"
              />
            </div>
          </div>

          {/* Pricing & Inventory Section */}
          <div className="space-y-4 border-t pt-4">
            <h3 className="text-lg font-semibold text-gray-900">Pricing & Inventory</h3>
            <div className="grid grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price" className="text-sm font-medium text-gray-700">
                  Price <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="0.00"
                    className="h-10 pl-7"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="discount" className="text-sm font-medium text-gray-700">
                  Discount
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <Input
                    id="discount"
                    type="number"
                    step="0.01"
                    value={formData.discount}
                    onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                    placeholder="0.00"
                    className="h-10 pl-7"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock" className="text-sm font-medium text-gray-700">
                  Stock <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="stock"
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  placeholder="0"
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unit" className="text-sm font-medium text-gray-700">
                  Unit <span className="text-red-500">*</span>
                </Label>
                <select
                  id="unit"
                  value={formData.unite_id}
                  onChange={(e) => setFormData({ ...formData, unite_id: e.target.value })}
                  disabled={loadingData}
                  className="w-full h-10 px-3 border border-gray-300 rounded-md bg-white text-sm focus:ring-2 focus:ring-[#5a9c3a] focus:border-[#5a9c3a]"
                >
                  <option value="">Select unit</option>
                  {units.map((unit) => (
                    <option key={unit.id} value={String(unit.id)}>
                      {unit.name} {unit.symbol ? `(${unit.symbol})` : ""}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Classification Section */}
          <div className="space-y-4 border-t pt-4">
            <h3 className="text-lg font-semibold text-gray-900">Classification</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-medium text-gray-700">
                  Category <span className="text-red-500">*</span>
                </Label>
                <select
                  id="category"
                  value={formData.product_category_id}
                  onChange={(e) => setFormData({ ...formData, product_category_id: e.target.value })}
                  disabled={loadingData}
                  className="w-full h-10 px-3 border border-gray-300 rounded-md bg-white text-sm focus:ring-2 focus:ring-[#5a9c3a] focus:border-[#5a9c3a]"
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={String(category.id)}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="product_type" className="text-sm font-medium text-gray-700">
                  Product Type <span className="text-red-500">*</span>
                </Label>
                <select
                  id="product_type"
                  value={formData.product_type_id}
                  onChange={(e) => setFormData({ ...formData, product_type_id: e.target.value })}
                  disabled={loadingData}
                  className="w-full h-10 px-3 border border-gray-300 rounded-md bg-white text-sm focus:ring-2 focus:ring-[#5a9c3a] focus:border-[#5a9c3a]"
                >
                  <option value="">Select type</option>
                  {productTypes.map((type) => (
                    <option key={type.id} value={String(type.id)}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Status</Label>
                <div className="flex items-center h-10">
                  <label className="relative flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#5a9c3a] transition-colors"></div>
                    <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform peer-checked:translate-x-5"></div>
                    <span className="text-sm font-medium text-gray-700 ml-2">
                      {formData.status ? "Active" : "Inactive"}
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="space-y-4 border-t pt-4">
            <h3 className="text-lg font-semibold text-gray-900">Description</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="excerpt" className="text-sm font-medium text-gray-700">
                  Short Description
                </Label>
                <Input
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Brief product summary..."
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="details" className="text-sm font-medium text-gray-700">
                  Full Description <span className="text-red-500">*</span>
                </Label>
                <textarea
                  id="details"
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  placeholder="Describe your product in detail..."
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#5a9c3a] focus:border-[#5a9c3a] resize-none text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="border-t pt-4 gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
            className="h-10"
          >
            Cancel
          </Button>
          <Button
            onClick={onSave}
            disabled={isLoading || loadingData}
            className="bg-[#5a9c3a] hover:bg-[#0d7a3f] text-white h-10 px-6"
          >
            {isLoading ? "Saving..." : editingProduct ? "Update Product" : "Create Product"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
