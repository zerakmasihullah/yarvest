"use client"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Sprout, Store, ArrowRight } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function DonationsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <main className="flex-1 overflow-auto">
        <div className="min-h-screen bg-white">
          <div className="max-w-4xl mx-auto px-6 py-16">
            {/* Coming Soon Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-[#5a9c3a]/10 rounded-full mb-6">
                <Heart className="w-10 h-10 text-[#5a9c3a]" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                Yarvest Donations
              </h1>
              <p className="text-lg text-gray-500 mb-2">Coming Soon</p>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We're building something amazing to support seed and plant programs across your neighborhood.
              </p>
            </div>

            {/* Seller Donation Card */}
            <Card className="border-0 shadow-md mb-8">
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-[#5a9c3a]/10 rounded-lg">
                    <Store className="w-6 h-6 text-[#5a9c3a]" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      For Sellers & Producers
                    </h2>
                    <p className="text-gray-600 mb-6">
                      Forward proceeds from your sales to support your community
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <div className="flex items-start gap-3 mb-4">
                    <Sprout className="w-5 h-5 text-[#5a9c3a] mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Forward Proceeds to Yarvest Donation Box
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        Sellers can opt to forward proceeds from produce sales to the Yarvest Donation Box 
                        to support the seed and plant programs across your neighborhood.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    asChild
                    className="bg-[#5a9c3a] hover:bg-[#0d7a3f] text-white"
                  >
                    <Link href="/admin">
                      <Store className="w-4 h-4 mr-2" />
                      Go to Seller Dashboard
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  <Button 
                    asChild
                    variant="outline"
                    className="border-gray-300"
                  >
                    <Link href="/products">
                      Browse Products
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Simple Info */}
            <div className="text-center text-gray-500">
              <p>We'll notify you when this feature is available.</p>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  )
}
