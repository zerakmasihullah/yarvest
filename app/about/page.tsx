"use client"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Leaf, Users, Heart, Sprout } from "lucide-react"
import { useState } from "react"

export default function AboutPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <main className="flex-1 overflow-auto">
        <div className="min-h-screen bg-white">
          <div className="max-w-4xl mx-auto px-6 py-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">About Yarvest</h1>
            <p className="text-gray-500 text-sm mb-12">Connecting communities with fresh, locally-grown produce</p>

            <div className="space-y-12">
              {/* Mission */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Yarvest is dedicated to connecting communities with fresh, locally-grown produce while supporting 
                  local farmers and producers. We believe in creating a sustainable food ecosystem that benefits 
                  everyone—from the farmers who grow our food to the families who enjoy it.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Our platform makes it easy to discover and purchase fresh produce directly from verified local 
                  farmers, ensuring quality, freshness, and supporting your local economy.
                </p>
              </section>

              {/* Values */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Our Values</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-[#5a9c3a]/10 rounded-lg">
                          <Leaf className="w-6 h-6 text-[#5a9c3a]" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">Sustainability</h3>
                          <p className="text-gray-600 text-sm">
                            We promote sustainable farming practices and support local agriculture to reduce 
                            environmental impact.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-[#5a9c3a]/10 rounded-lg">
                          <Users className="w-6 h-6 text-[#5a9c3a]" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">Community</h3>
                          <p className="text-gray-600 text-sm">
                            We build strong connections between farmers and consumers, fostering a sense of 
                            community and mutual support.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-[#5a9c3a]/10 rounded-lg">
                          <Heart className="w-6 h-6 text-[#5a9c3a]" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">Quality</h3>
                          <p className="text-gray-600 text-sm">
                            We ensure all products meet high quality standards and come from verified, 
                            trusted producers.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-[#5a9c3a]/10 rounded-lg">
                          <Sprout className="w-6 h-6 text-[#5a9c3a]" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">Freshness</h3>
                          <p className="text-gray-600 text-sm">
                            We prioritize freshness by connecting you directly with local farmers, ensuring 
                            you get the best produce available.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* How It Works */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">How It Works</h2>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-[#5a9c3a] text-white rounded-full flex items-center justify-center font-semibold">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Browse Products</h3>
                      <p className="text-gray-600 text-sm">
                        Explore fresh produce from verified local farmers and producers in your area.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-[#5a9c3a] text-white rounded-full flex items-center justify-center font-semibold">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Place Your Order</h3>
                      <p className="text-gray-600 text-sm">
                        Add items to your cart and checkout securely with our payment system.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-[#5a9c3a] text-white rounded-full flex items-center justify-center font-semibold">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Get Fresh Produce</h3>
                      <p className="text-gray-600 text-sm">
                        Receive your order through delivery or pickup, enjoying the freshest local produce.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  )
}
