"use client"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Gift, CheckCircle2, CreditCard, Mail, MessageSquare } from "lucide-react"
import { useState } from "react"

const giftCardAmounts = [25, 50, 100, 250, 500]

const benefits = [
  { icon: CheckCircle2, text: "Never expires" },
  { icon: Mail, text: "Instant delivery" },
  { icon: Gift, text: "Works on all products" },
]

export default function GiftCardsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedAmount, setSelectedAmount] = useState(50)
  const [recipientEmail, setRecipientEmail] = useState("")
  const [message, setMessage] = useState("")

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <main className="flex-1 overflow-auto bg-white">
        <div className="max-w-6xl mx-auto px-6 py-16">
          {/* Simple Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-[#0A5D31]/10 rounded-2xl mb-6">
              <Gift className="w-10 h-10 text-[#0A5D31]" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Gift Cards</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Give the gift of fresh, local produce. Perfect for any occasion!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Amount Selection */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-8 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Amount</h2>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
                  {giftCardAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setSelectedAmount(amount)}
                      className={`p-6 rounded-xl border-2 transition-all ${
                        selectedAmount === amount
                          ? "border-[#0A5D31] bg-[#0A5D31]/5 shadow-md"
                          : "border-gray-200 bg-white hover:border-[#0A5D31]/50 hover:bg-gray-50"
                      }`}
                    >
                      <div className={`text-2xl font-bold mb-1 ${
                        selectedAmount === amount ? "text-[#0A5D31]" : "text-gray-700"
                      }`}>
                        ${amount}
                      </div>
                      {selectedAmount === amount && (
                        <div className="flex justify-center mt-2">
                          <CheckCircle2 className="w-5 h-5 text-[#0A5D31]" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Custom Amount</label>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={selectedAmount === 50 ? "" : selectedAmount}
                    onChange={(e) => setSelectedAmount(Number(e.target.value) || 50)}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#0A5D31] focus:ring-2 focus:ring-[#0A5D31]/20"
                  />
                </div>
              </Card>

              {/* Recipient Info */}
              <Card className="p-8 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Gift Details</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Mail className="w-4 h-4 inline mr-1" />
                      Recipient Email
                    </label>
                    <input
                      type="email"
                      placeholder="recipient@example.com"
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#0A5D31] focus:ring-2 focus:ring-[#0A5D31]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <MessageSquare className="w-4 h-4 inline mr-1" />
                      Personal Message (Optional)
                    </label>
                    <textarea
                      placeholder="Add a personal message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-[#0A5D31] focus:ring-2 focus:ring-[#0A5D31]/20 resize-none"
                    />
                  </div>
                </div>
              </Card>
            </div>

            {/* Right: Preview & Purchase */}
            <div className="lg:col-span-1">
              <Card className="p-8 border-2 border-[#0A5D31] bg-[#0A5D31]/5 sticky top-6">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-[#0A5D31] rounded-2xl mb-4">
                    <Gift className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-5xl font-extrabold text-gray-900 mb-2">${selectedAmount}</div>
                  <div className="text-sm text-gray-600">Gift Card Value</div>
                </div>
                <div className="space-y-3 mb-6">
                  {benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm text-gray-700">
                      <benefit.icon className="w-5 h-5 text-[#0A5D31] flex-shrink-0" />
                      <span>{benefit.text}</span>
                    </div>
                  ))}
                </div>
                <Button 
                  size="lg" 
                  className="w-full bg-[#0A5D31] hover:bg-[#0d7a3f] text-white h-14 rounded-lg font-bold"
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  Purchase Gift Card
                </Button>
              </Card>
            </div>
          </div>

          {/* How It Works */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { step: "1", title: "Choose Amount", desc: "Select any amount from $25 to $500" },
                { step: "2", title: "Personalize", desc: "Add recipient email and message" },
                { step: "3", title: "Send Instantly", desc: "Digital gift card delivered via email" },
              ].map((item) => (
                <div key={item.step} className="text-center p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="w-12 h-12 bg-[#0A5D31] text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  )
}
