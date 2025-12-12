"use client"

import { Label } from "@/components/ui/label"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2, ShoppingBag, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useCartStore } from "@/stores/cart-store"
import { useAuthStore } from "@/stores/auth-store"
import { getImageUrl } from "@/lib/utils"

export default function CartPage() {
  const { items: cartItems, isLoading, error, fetchCart, updateItemQuantity, removeItem } = useCartStore()
  const { isLoggedIn } = useAuthStore()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [promoCode, setPromoCode] = useState("")
  const [updatingItems, setUpdatingItems] = useState<Set<number>>(new Set())

  useEffect(() => {
    if (isLoggedIn) {
      fetchCart()
    }
  }, [isLoggedIn, fetchCart])

  const handleUpdateQuantity = async (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(id)
      return
    }

    setUpdatingItems(prev => new Set(prev).add(id))
    try {
      await updateItemQuantity(id, newQuantity)
      // Silently update - no toast notification
    } catch (error: any) {
      console.error('Failed to update quantity:', error)
    } finally {
      setUpdatingItems(prev => {
        const newSet = new Set(prev)
        newSet.delete(id)
        return newSet
      })
    }
  }

  const handleRemoveItem = async (id: number) => {
    setUpdatingItems(prev => new Set(prev).add(id))
    try {
      await removeItem(id)
      // Silently remove - no toast notification
    } catch (error: any) {
      console.error('Failed to remove item:', error)
    } finally {
      setUpdatingItems(prev => {
        const newSet = new Set(prev)
        newSet.delete(id)
        return newSet
      })
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.08
  const total = subtotal + tax

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <main className="flex-1 overflow-auto">
        <div className="px-6 py-12 bg-gradient-to-b from-white to-secondary/10">
          <div className="max-w-6xl mx-auto">
            <div className="mb-10">
              <h1 className="text-5xl font-bold text-foreground mb-3">Shopping Cart</h1>
              <p className="text-lg text-muted-foreground">Review your items and proceed to checkout</p>
            </div>

            {isLoading ? (
              <Card className="p-16 text-center rounded-3xl">
                <Loader2 className="w-20 h-20 text-muted-foreground mx-auto mb-6 animate-spin" />
                <h2 className="text-3xl font-semibold text-foreground mb-3">Loading cart...</h2>
              </Card>
            ) : !isLoggedIn ? (
              <Card className="p-16 text-center rounded-3xl">
                <ShoppingBag className="w-20 h-20 text-muted-foreground mx-auto mb-6 opacity-50" />
                <h2 className="text-3xl font-semibold text-foreground mb-3">Please log in</h2>
                <p className="text-muted-foreground mb-8 text-lg">You need to be logged in to view your cart</p>
                <Link href="/login">
                  <Button className="bg-primary hover:bg-accent text-white rounded-xl font-semibold px-8 h-12">
                    Log In
                  </Button>
                </Link>
              </Card>
            ) : error ? (
              <Card className="p-16 text-center rounded-3xl">
                <ShoppingBag className="w-20 h-20 text-muted-foreground mx-auto mb-6 opacity-50" />
                <h2 className="text-3xl font-semibold text-foreground mb-3">Error loading cart</h2>
                <p className="text-muted-foreground mb-8 text-lg">{error}</p>
                <Button 
                  onClick={() => fetchCart()} 
                  className="bg-primary hover:bg-accent text-white rounded-xl font-semibold px-8 h-12"
                >
                  Try Again
                </Button>
              </Card>
            ) : cartItems.length === 0 ? (
              <Card className="p-16 text-center rounded-3xl">
                <ShoppingBag className="w-20 h-20 text-muted-foreground mx-auto mb-6 opacity-50" />
                <h2 className="text-3xl font-semibold text-foreground mb-3">Your cart is empty</h2>
                <p className="text-muted-foreground mb-8 text-lg">Add some fresh produce to get started!</p>
                <Link href="/products">
                  <Button className="bg-primary hover:bg-accent text-white rounded-xl font-semibold px-8 h-12">
                    Browse Products
                  </Button>
                </Link>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                  {cartItems.map((item) => {
                    const isUpdating = updatingItems.has(item.id)
                    const imageUrl = getImageUrl(item.image, item.name)
                    
                    return (
                      <Card key={item.id} className="p-6 rounded-3xl border border-border hover:shadow-lg transition-shadow">
                        <div className="flex gap-6">
                          <Link href={`/products/${item.product_unique_id}`}>
                            <img
                              src={imageUrl}
                              alt={item.name}
                              className="w-32 h-32 object-cover rounded-2xl cursor-pointer hover:scale-105 transition-transform"
                            />
                          </Link>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <Link href={`/products/${item.product_unique_id}`}>
                                  <h3 className="font-bold text-xl text-foreground hover:text-primary cursor-pointer mb-1">
                                    {item.name}
                                  </h3>
                                </Link>
                                <p className="text-sm text-muted-foreground font-mono">SKU: {item.code}</p>
                                {item.seller && (
                                  <p className="text-xs text-muted-foreground mt-1">Seller: {item.seller.full_name}</p>
                                )}
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveItem(item.id)}
                                disabled={isUpdating}
                                className="text-destructive hover:text-destructive hover:bg-red-50 rounded-xl"
                              >
                                {isUpdating ? (
                                  <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                  <Trash2 className="w-5 h-5" />
                                )}
                              </Button>
                            </div>
                            <div className="flex items-center justify-between mt-6">
                              <div className="flex items-center gap-4 bg-secondary rounded-full p-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                  disabled={isUpdating || item.quantity <= 1}
                                  className="rounded-full hover:bg-white h-8 w-8"
                                >
                                  −
                                </Button>
                                <span className="w-12 text-center font-bold text-lg">
                                  {isUpdating ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : item.quantity}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                  disabled={isUpdating || item.quantity >= item.stock}
                                  className="rounded-full hover:bg-white h-8 w-8"
                                >
                                  +
                                </Button>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
                                {item.original_price > item.price && (
                                  <p className="text-xs text-muted-foreground line-through">
                                    ${item.original_price.toFixed(2)}
                                  </p>
                                )}
                                <span className="text-2xl font-bold text-primary">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    )
                  })}

                  {/* Promo Code */}
                  <Card className="p-6 rounded-3xl border border-border bg-gradient-to-r from-primary/5 to-transparent">
                    <Label htmlFor="promo" className="block text-sm font-semibold text-foreground mb-3">
                      Promo Code (optional)
                    </Label>
                    <div className="flex gap-3">
                      <Input
                        id="promo"
                        placeholder="Enter promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="flex-1 rounded-xl border-2 border-border focus:border-primary h-12"
                      />
                      <Button variant="outline" className="rounded-xl border-2 border-border hover:bg-secondary h-12 px-6">
                        Apply
                      </Button>
                    </div>
                  </Card>
                </div>

                {/* Order Summary */}
                <div>
                  <Card className="p-8 rounded-3xl border border-border bg-white sticky top-24 shadow-lg">
                    <h3 className="text-2xl font-bold text-foreground mb-6">Order Summary</h3>
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between text-foreground">
                        <span className="text-muted-foreground">Subtotal ({cartItems.length} items)</span>
                        <span className="font-semibold">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-foreground">
                        <span className="text-muted-foreground">Tax</span>
                        <span className="font-semibold">${tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Delivery</span>
                        <span className="text-green-600 font-semibold">Free</span>
                      </div>
                    </div>

                    <div className="border-t-2 border-border pt-6 mb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-foreground">Total</span>
                        <span className="text-3xl font-bold text-primary">${total.toFixed(2)}</span>
                      </div>
                    </div>

                    <Button className="w-full h-14 gap-2 mb-3 bg-primary hover:bg-accent text-white rounded-xl font-semibold text-base">
                      <ShoppingBag className="w-5 h-5" />
                      Proceed to Checkout
                    </Button>
                    <Link href="/products">
                      <Button variant="outline" className="w-full h-12 rounded-xl border-2 border-border hover:bg-secondary">
                        Continue Shopping
                      </Button>
                    </Link>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
