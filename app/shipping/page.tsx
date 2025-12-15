"use client"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Truck, Clock, MapPin, Package } from "lucide-react"
import { useState } from "react"

export default function ShippingPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <main className="flex-1 overflow-auto">
        <div className="min-h-screen bg-white">
          <div className="max-w-4xl mx-auto px-6 py-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Shipping & Pickup Information</h1>
            <p className="text-gray-600 mb-12">
              Learn about our current pickup options and upcoming delivery service.
            </p>

            <div className="space-y-8">
              {/* Current Option */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Current Option</h2>
                <Card className="border-2 border-[#5a9c3a] shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-[#5a9c3a]/10 rounded-lg">
                        <MapPin className="w-6 h-6 text-[#5a9c3a]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-gray-900">Pickup</h3>
                          <span className="bg-[#5a9c3a] text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                            Available Now
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">
                          Pick up your order from designated pickup locations. Our sellers currently offer pickup 
                          at convenient locations throughout your area. When you place an order, you'll select 
                          a pickup point and receive notification when your order is ready.
                        </p>
                        <p className="text-[#5a9c3a] font-medium text-sm">Free</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Coming Soon */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Coming Soon</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-0 shadow-md opacity-75">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-gray-100 rounded-lg">
                          <Truck className="w-6 h-6 text-gray-400" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-gray-900">Home Delivery</h3>
                            <span className="bg-gray-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                              Coming Soon
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">
                            We're working on launching a delivery system to bring fresh produce directly to your door.
                          </p>
                          <p className="text-gray-500 font-medium text-sm">TBA</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-md opacity-75">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-gray-100 rounded-lg">
                          <Clock className="w-6 h-6 text-gray-400" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-gray-900">Express Delivery</h3>
                            <span className="bg-gray-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                              Coming Soon
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">
                            Fast delivery options for urgent orders will be available soon.
                          </p>
                          <p className="text-gray-500 font-medium text-sm">TBA</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> We're actively working on our delivery system. Stay tuned for updates! 
                    In the meantime, pickup is available at convenient locations.
                  </p>
                </div>
              </section>

              {/* Pickup Information */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Pickup Information</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  When you place an order, you'll be able to select from available pickup locations in your area. 
                  Each seller may have different pickup points, so check the options during checkout.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  You'll receive an email notification when your order is ready for pickup, typically within 1-2 
                  business days. Pickup locations are usually open during regular business hours, and you can 
                  coordinate specific pickup times directly with the seller if needed.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Pickup is completely free and allows you to meet local farmers in person, ask questions about 
                  their products, and support your community directly.
                </p>
              </section>

              {/* Tracking */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Order Tracking</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Once your order is shipped, you'll receive a tracking number via email. You can track 
                  your order status in your account dashboard or by using the tracking link provided.
                </p>
              </section>

              {/* Packaging */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Packaging</h2>
                <p className="text-gray-700 leading-relaxed">
                  We use eco-friendly packaging materials to keep your produce fresh during transit. 
                  All items are carefully packed to ensure they arrive in perfect condition.
                </p>
              </section>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  )
}
