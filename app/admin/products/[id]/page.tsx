"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, X, ImageIcon, ArrowLeft } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { fetchUnits, fetchCategories, fetchProductTypes, updateProduct, fetchUserProducts, type Unit, type Category, type ProductType } from "@/lib/product-api"
import api from "@/lib/axios"
import { getImageUrl } from "@/lib/utils"
import { toast } from "sonner"

export default function EditProductPage() {
  const router = useRouter()
  const params = useParams()
  const productId = params.id as string
  
  const [isLoading, setIsLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(true)
  const [loadingProduct, setLoadingProduct] = useState(true)
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // API data
  const [units, setUnits] = useState<Unit[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [productTypes, setProductTypes] = useState<ProductType[]>([])
  
  // Form data
  const [formData, setFormData] = useState({
    name: "",
    product_category_id: "",
    product_type_id: "",
    unite_id: "",
    price: "",
    discount: "0",
    stock: "",
    sku: "",
    status: true,
    main_image: "",
    excerpt: "",
    details: "",
  })
  
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Fetch units, categories, and product types
  useEffect(() => {
    const loadData = async () => {
      setLoadingData(true)
      try {
        const [unitsData, categoriesData, productTypesData] = await Promise.all([
          fetchUnits(),
          fetchCategories(),
          fetchProductTypes(),
        ])
        setUnits(unitsData)
        setCategories(categoriesData)
        setProductTypes(productTypesData)
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setLoadingData(false)
      }
    }
    loadData()
  }, [])

  // Load product data
  useEffect(() => {
    const loadProduct = async () => {
      if (!productId) return
      
      setLoadingProduct(true)
      try {
        const products = await fetchUserProducts()
        const product = products.find(
          (p: any) => p.unique_id === productId || p.id?.toString() === productId
        )
        
        if (!product) {
          toast.error('Product not found')
          router.push('/admin/products')
          return
        }

        const categoryId = product.product_category_id ?? product.category_id ?? product.category?.id ?? product.product_category?.id ?? null
        const typeId = product.product_type_id ?? product.type_id ?? product.product_type?.id ?? product.type?.id ?? null
        const unitId = product.unite_id ?? product.unit_id ?? product.unit?.id ?? null

        setFormData({
          name: product.name || "",
          product_category_id: categoryId !== null && categoryId !== undefined ? String(categoryId) : "",
          product_type_id: typeId !== null && typeId !== undefined ? String(typeId) : "",
          unite_id: unitId !== null && unitId !== undefined ? String(unitId) : "",
          price: product.price?.toString() || "",
          discount: product.discount?.toString() || "0",
          stock: product.stock?.toString() || "",
          sku: product.sku || product.code || "",
          status: product.status !== undefined ? product.status : true,
          main_image: product.main_image || product.image || "",
          excerpt: product.excerpt || "",
          details: product.details || product.description || "",
        })
      } catch (error) {
        console.error('Error loading product:', error)
        toast.error('Failed to load product')
        router.push('/admin/products')
      } finally {
        setLoadingProduct(false)
      }
    }
    loadProduct()
  }, [productId, router])

  // Set preview when formData.main_image changes
  useEffect(() => {
    if (formData.main_image) {
      setImagePreview(getImageUrl(formData.main_image))
    } else {
      setImagePreview(null)
    }
  }, [formData.main_image])

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB')
      return
    }

    setIsUploadingImage(true)

    try {
      const formDataToUpload = new FormData()
      formDataToUpload.append('image', file)
      formDataToUpload.append('type', 'product')

      const response = await api.post('/upload-image', formDataToUpload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      // Backend returns: { success: true, data: { url: "...", path: "...", image: "..." } }
      const imagePath = response.data?.data?.path || response.data?.data?.image
      
      if (imagePath && imagePath.length <= 255) {
        setFormData({ ...formData, main_image: imagePath })
        // Use getImageUrl for preview to ensure consistent URL construction
        setImagePreview(getImageUrl(imagePath))
        toast.success('Image uploaded successfully')
      } else {
        toast.error('Image upload failed. Please try again.')
      }
    } catch (error: any) {
      console.error('Error uploading image:', error)
      toast.error(error.response?.data?.message || 'Failed to upload image. Please try again.')
    } finally {
      setIsUploadingImage(false)
    }
  }

  const handleRemoveImage = () => {
    setFormData({ ...formData, main_image: "" })
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }


  const handleSave = async () => {
    const validationErrors: Record<string, string> = {}

    if (!formData.name || formData.name.trim() === "") {
      validationErrors.name = "Product name is required"
    }
    if (!formData.sku || formData.sku.trim() === "") {
      validationErrors.sku = "SKU code is required"
    }
    if (!formData.product_category_id || formData.product_category_id === "") {
      validationErrors.product_category_id = "Category is required"
    }
    if (!formData.product_type_id || formData.product_type_id === "") {
      validationErrors.product_type_id = "Product type is required"
    }
    if (!formData.unite_id || formData.unite_id === "") {
      validationErrors.unite_id = "Unit is required"
    }
    if (!formData.price || formData.price.trim() === "") {
      validationErrors.price = "Price is required"
    } else {
      const price = Number(formData.price)
      if (isNaN(price) || price <= 0) {
        validationErrors.price = "Price must be a positive number"
      }
    }
    if (formData.discount && formData.discount.trim() !== "") {
      const discount = Number(formData.discount)
      if (isNaN(discount) || discount < 0) {
        validationErrors.discount = "Discount must be a non-negative number"
      }
    }
    if (!formData.stock || formData.stock.trim() === "") {
      validationErrors.stock = "Stock quantity is required"
    } else {
      const stock = Number(formData.stock)
      if (isNaN(stock) || stock < 0 || !Number.isInteger(stock)) {
        validationErrors.stock = "Stock must be a non-negative integer"
      }
    }
    if (!formData.details || formData.details.trim() === "") {
      validationErrors.details = "Full description is required"
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors({})

    setIsLoading(true)
    try {
      const payload = {
        name: formData.name.trim(),
        product_category_id: Number(formData.product_category_id),
        product_type_id: Number(formData.product_type_id),
        unite_id: Number(formData.unite_id),
        price: Number(formData.price),
        discount: Number(formData.discount) || 0,
        stock: Number(formData.stock),
        sku: formData.sku.trim(),
        status: formData.status,
        main_image: formData.main_image?.trim() || "",
        excerpt: formData.excerpt?.trim() || "",
        details: formData.details.trim(),
      }

      await updateProduct(productId, payload)
      router.push('/admin/products')
    } catch (error) {
      console.error('Error updating product:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (loadingProduct) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading product...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
          <p className="text-gray-600 mt-2">Update your product information</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 space-y-8">
          {/* Image Upload Section */}
          <div className="space-y-3">
            <Label className="text-base font-semibold text-gray-900">Product Image</Label>
            <div className="flex gap-4">
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
                <p className="text-xs text-gray-500">Upload an image file. Max size: 5MB</p>
              </div>
            </div>
          </div>

          {/* Basic Information Section */}
          <div className="space-y-4 border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Product Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value })
                    if (errors.name) setErrors({ ...errors, name: "" })
                  }}
                  placeholder="e.g., Organic Tomatoes"
                  className={`h-10 ${errors.name ? "border-red-500" : ""}`}
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="sku" className="text-sm font-medium text-gray-700">
                  SKU Code <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="sku"
                  value={formData.sku}
                  onChange={(e) => {
                    setFormData({ ...formData, sku: e.target.value })
                    if (errors.sku) setErrors({ ...errors, sku: "" })
                  }}
                  placeholder="e.g., TOMO001"
                  className={`h-10 ${errors.sku ? "border-red-500" : ""}`}
                />
                {errors.sku && <p className="text-sm text-red-500">{errors.sku}</p>}
              </div>
            </div>
          </div>

          {/* Pricing & Inventory Section */}
          <div className="space-y-4 border-t pt-6">
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
                    onChange={(e) => {
                      setFormData({ ...formData, price: e.target.value })
                      if (errors.price) setErrors({ ...errors, price: "" })
                    }}
                    placeholder="0.00"
                    className={`h-10 pl-7 ${errors.price ? "border-red-500" : ""}`}
                  />
                </div>
                {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
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
                    onChange={(e) => {
                      setFormData({ ...formData, discount: e.target.value })
                      if (errors.discount) setErrors({ ...errors, discount: "" })
                    }}
                    placeholder="0.00"
                    className={`h-10 pl-7 ${errors.discount ? "border-red-500" : ""}`}
                  />
                </div>
                {errors.discount && <p className="text-sm text-red-500">{errors.discount}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock" className="text-sm font-medium text-gray-700">
                  Stock <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="stock"
                  type="number"
                  value={formData.stock}
                  onChange={(e) => {
                    setFormData({ ...formData, stock: e.target.value })
                    if (errors.stock) setErrors({ ...errors, stock: "" })
                  }}
                  placeholder="0"
                  className={`h-10 ${errors.stock ? "border-red-500" : ""}`}
                />
                {errors.stock && <p className="text-sm text-red-500">{errors.stock}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="unit" className="text-sm font-medium text-gray-700">
                  Unit <span className="text-red-500">*</span>
                </Label>
                <select
                  id="unit"
                  value={formData.unite_id}
                  onChange={(e) => {
                    setFormData({ ...formData, unite_id: e.target.value })
                    if (errors.unite_id) setErrors({ ...errors, unite_id: "" })
                  }}
                  disabled={loadingData}
                  className={`w-full h-10 px-3 border rounded-md bg-white text-sm focus:ring-2 focus:ring-[#5a9c3a] focus:border-[#5a9c3a] ${errors.unite_id ? "border-red-500" : "border-gray-300"}`}
                >
                  <option value="">Select unit</option>
                  {units.map((unit) => (
                    <option key={unit.id} value={String(unit.id)}>
                      {unit.name} {unit.symbol ? `(${unit.symbol})` : ""}
                    </option>
                  ))}
                </select>
                {errors.unite_id && <p className="text-sm text-red-500">{errors.unite_id}</p>}
              </div>
            </div>
          </div>

          {/* Classification Section */}
          <div className="space-y-4 border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900">Classification</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-medium text-gray-700">
                  Category <span className="text-red-500">*</span>
                </Label>
                <select
                  id="category"
                  value={formData.product_category_id}
                  onChange={(e) => {
                    setFormData({ ...formData, product_category_id: e.target.value })
                    if (errors.product_category_id) setErrors({ ...errors, product_category_id: "" })
                  }}
                  disabled={loadingData}
                  className={`w-full h-10 px-3 border rounded-md bg-white text-sm focus:ring-2 focus:ring-[#5a9c3a] focus:border-[#5a9c3a] ${errors.product_category_id ? "border-red-500" : "border-gray-300"}`}
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={String(category.id)}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.product_category_id && <p className="text-sm text-red-500">{errors.product_category_id}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="product_type" className="text-sm font-medium text-gray-700">
                  Product Type <span className="text-red-500">*</span>
                </Label>
                <select
                  id="product_type"
                  value={formData.product_type_id}
                  onChange={(e) => {
                    setFormData({ ...formData, product_type_id: e.target.value })
                    if (errors.product_type_id) setErrors({ ...errors, product_type_id: "" })
                  }}
                  disabled={loadingData}
                  className={`w-full h-10 px-3 border rounded-md bg-white text-sm focus:ring-2 focus:ring-[#5a9c3a] focus:border-[#5a9c3a] ${errors.product_type_id ? "border-red-500" : "border-gray-300"}`}
                >
                  <option value="">Select type</option>
                  {productTypes.map((type) => (
                    <option key={type.id} value={String(type.id)}>
                      {type.name}
                    </option>
                  ))}
                </select>
                {errors.product_type_id && <p className="text-sm text-red-500">{errors.product_type_id}</p>}
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
          <div className="space-y-4 border-t pt-6">
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
                  onChange={(e) => {
                    setFormData({ ...formData, details: e.target.value })
                    if (errors.details) setErrors({ ...errors, details: "" })
                  }}
                  placeholder="Describe your product in detail..."
                  rows={4}
                  className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-[#5a9c3a] focus:border-[#5a9c3a] resize-none text-sm ${errors.details ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.details && <p className="text-sm text-red-500">{errors.details}</p>}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-3 border-t pt-6">
            <Button
              variant="outline"
              onClick={() => router.back()}
              disabled={isLoading}
              className="h-10"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isLoading || loadingData}
              className="bg-[#5a9c3a] hover:bg-[#0d7a3f] text-white h-10 px-6"
            >
              {isLoading ? "Updating..." : "Update Product"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

