"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  EyeOff
} from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { deleteProduct, type Product, fetchUserProducts } from "@/lib/product-api"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function ProductsPage() {
  const router = useRouter()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<any>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [loadingProducts, setLoadingProducts] = useState(true)

  // Fetch products on component mount
  useEffect(() => {
    const loadProducts = async () => {
      setLoadingProducts(true)
      try {
        const productsData = await fetchUserProducts()
        setProducts(productsData)
      } catch (error) {
        console.error('Error loading products:', error)
      } finally {
        setLoadingProducts(false)
      }
    }
    loadProducts()
  }, [])

  const handleEdit = (product: any) => {
    const uniqueId = product.unique_id || product.uniqueId || product.id?.toString()
    router.push(`/admin/products/${uniqueId}`)
  }

  const handleDeleteClick = (product: any) => {
    setProductToDelete(product)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return

    const uniqueId = productToDelete.unique_id || productToDelete.uniqueId || productToDelete.id?.toString()
    if (!uniqueId) {
      toast.error("Product unique identifier is missing")
      setDeleteDialogOpen(false)
      setProductToDelete(null)
      return
    }

    setIsDeleting(true)
    try {
      await deleteProduct(uniqueId)
      const productsData = await fetchUserProducts()
      setProducts(productsData)
      setDeleteDialogOpen(false)
      setProductToDelete(null)
    } catch (error) {
      console.error('Error deleting product:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-500 mt-1">Manage your products</p>
        </div>
        <Button 
          className="bg-[#5a9c3a] hover:bg-[#0d7a3f] text-white gap-2"
          onClick={() => router.push('/admin/products/new')}
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Button>
      </div>

      {/* Products Grid */}
      {loadingProducts ? (
        <div className="flex items-center justify-center py-12">
          <p className="text-gray-500">Loading products...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <p className="text-gray-500 text-lg mb-4">No products yet</p>
          <Button 
            className="bg-[#5a9c3a] hover:bg-[#0d7a3f] text-white"
            onClick={() => router.push('/admin/products/new')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Product
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product) => (
            <Card key={product.id} className="border hover:shadow-lg transition-shadow overflow-hidden">
              <div className="relative h-48 bg-gray-100 overflow-hidden">
                <img
                  src={product.main_image || "/placeholder.svg"}
                  alt={product.name || "Product"}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  {product.status ? (
                    <Badge className="bg-emerald-500 text-white text-xs">
                      <Eye className="w-3 h-3 mr-1" />
                      Active
                    </Badge>
                  ) : (
                    <Badge className="bg-gray-500 text-white text-xs">
                      <EyeOff className="w-3 h-3 mr-1" />
                      Inactive
                    </Badge>
                  )}
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
                <p className="text-xs text-gray-500 mb-3">SKU: {product.sku}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-bold text-[#5a9c3a]">
                    ${Number(product.price || 0).toFixed(2)}
                  </span>
                  <span className={`text-sm font-medium ${product.stock > 0 ? "text-emerald-600" : "text-red-600"}`}>
                    Stock: {product.stock}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleEdit(product)}
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:bg-red-50"
                    onClick={() => handleDeleteClick(product)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Delete Product</DialogTitle>
            <DialogDescription className="text-gray-600">
              Are you sure you want to delete <span className="font-semibold">"{productToDelete?.name}"</span>? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => {
                setDeleteDialogOpen(false)
                setProductToDelete(null)
              }}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
