"use client"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { RefreshCw, Clock, CheckCircle } from "lucide-react"
import { useState } from "react"

export default function ReturnsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <main className="flex-1 overflow-auto">
        <div className="min-h-screen bg-white">
          <div className="max-w-4xl mx-auto px-6 py-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Returns & Refunds</h1>
            <p className="text-gray-600 mb-12">
              Returns and refunds are handled directly between buyers and sellers on our marketplace platform.
            </p>

            <div className="space-y-8">
              {/* How It Works */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">How Returns Work</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Yarvest is a marketplace that connects you directly with local farmers and producers. 
                  Each seller has their own return and refund policy. When you have an issue with an order, 
                  you should contact the seller directly to resolve it.
                </p>
                <Card className="border-2 border-[#5a9c3a] shadow-md bg-green-50/30">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-[#5a9c3a]/10 rounded-lg">
                        <CheckCircle className="w-6 h-6 text-[#5a9c3a]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Direct Communication</h3>
                        <p className="text-gray-700 text-sm">
                          All returns, refunds, and order issues should be resolved directly between you and the seller. 
                          This direct communication helps build trust and ensures quick resolution.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Return Process */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">How to Request a Return or Refund</h2>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-[#5a9c3a] text-white rounded-full flex items-center justify-center font-semibold">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Contact the Seller</h3>
                      <p className="text-gray-600 text-sm">
                        Go to your order details in your account dashboard and use the "Contact Seller" feature 
                        to message them directly about your concern. Be sure to include details about the issue 
                        and photos if applicable.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-[#5a9c3a] text-white rounded-full flex items-center justify-center font-semibold">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Work with the Seller</h3>
                      <p className="text-gray-600 text-sm">
                        The seller will review your request and work with you to resolve the issue. Most sellers 
                        are responsive and want to ensure customer satisfaction. They may offer a refund, replacement, 
                        or other solution based on their policy.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-[#5a9c3a] text-white rounded-full flex items-center justify-center font-semibold">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Resolution</h3>
                      <p className="text-gray-600 text-sm">
                        Once you and the seller agree on a solution, they will process the refund or return according 
                        to their policy. Refunds are typically processed back to your original payment method within 
                        5-7 business days.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Seller Policies */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Seller Policies</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Each seller on Yarvest sets their own return and refund policies. These policies may vary based on:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                  <li>The type of product (perishable items may have shorter return windows)</li>
                  <li>Seller preferences and business practices</li>
                  <li>Product condition and packaging requirements</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  You can view a seller's return policy on their profile page or product listings. We encourage 
                  sellers to have clear, fair policies and to communicate openly with buyers.
                </p>
              </section>

              {/* Best Practices */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Best Practices</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-[#5a9c3a]/10 rounded-lg">
                          <CheckCircle className="w-6 h-6 text-[#5a9c3a]" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">For Buyers</h3>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Contact sellers promptly if you have concerns</li>
                            <li>• Provide clear details and photos when needed</li>
                            <li>• Be respectful and understanding</li>
                            <li>• Review seller policies before purchasing</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-[#5a9c3a]/10 rounded-lg">
                          <CheckCircle className="w-6 h-6 text-[#5a9c3a]" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">For Sellers</h3>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Respond to buyer inquiries promptly</li>
                            <li>• Have clear return/refund policies</li>
                            <li>• Work with buyers to resolve issues fairly</li>
                            <li>• Process refunds in a timely manner</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Need Help */}
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Need Help?</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you're unable to resolve an issue directly with a seller, or if you have questions about 
                  how the marketplace works, please{" "}
                  <a href="/contact" className="text-[#5a9c3a] hover:underline">contact us</a>. We're here to 
                  help facilitate communication and ensure a positive experience for both buyers and sellers.
                </p>
                <Card className="border-0 shadow-md bg-gray-50">
                  <CardContent className="p-6">
                    <p className="text-sm text-gray-600">
                      <strong>Note:</strong> Yarvest facilitates connections between buyers and sellers but does not 
                      mediate disputes or process refunds directly. All transactions and resolutions are handled 
                      between the buyer and seller.
                    </p>
                  </CardContent>
                </Card>
              </section>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  )
}
