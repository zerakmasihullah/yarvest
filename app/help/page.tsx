"use client"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { HelpCircle, Search, MessageCircle, Mail, Phone, BookOpen, ChevronDown, CheckCircle, ArrowRight } from "lucide-react"
import { useState } from "react"

const faqCategories = [
  {
    title: "Getting Started",
    icon: BookOpen,
    questions: [
      { q: "How do I create an account?", a: "Click on the Account button in the sidebar and follow the registration process. You'll need to provide your email address and create a password." },
      { q: "How do I place an order?", a: "Browse products, add items to your cart, and proceed to checkout. You can review your order before finalizing the purchase." },
      { q: "What payment methods do you accept?", a: "We accept all major credit cards, PayPal, Apple Pay, Google Pay, and gift cards." },
      { q: "Is my payment information secure?", a: "Yes, we use industry-standard encryption to protect your payment information. We never store your full credit card details." },
    ],
  },
  {
    title: "Orders & Delivery",
    icon: MessageCircle,
    questions: [
      { q: "What are your delivery options?", a: "We offer same-day delivery, next-day delivery, and scheduled deliveries. Delivery options vary by location." },
      { q: "How do I track my order?", a: "You'll receive a tracking link via email once your order ships. You can also track orders in your account dashboard." },
      { q: "What if I'm not satisfied with my order?", a: "Contact us within 48 hours for a full refund or replacement. We stand behind the quality of all our products." },
      { q: "Can I modify or cancel my order?", a: "You can modify or cancel your order within 1 hour of placing it. After that, please contact our support team." },
    ],
  },
  {
    title: "Products",
    icon: HelpCircle,
    questions: [
      { q: "Are your products organic?", a: "Many of our products are organic. Look for the organic badge on product pages. We clearly label all organic products." },
      { q: "Where do your products come from?", a: "All products are sourced from verified local farmers and producers within your region. We prioritize local sourcing." },
      { q: "How fresh are the products?", a: "Products are harvested and delivered within 24-48 hours of your order. We maintain cold chain storage for optimal freshness." },
      { q: "What if a product is out of stock?", a: "You can sign up for notifications when out-of-stock items become available. We restock regularly." },
    ],
  },
  {
    title: "Account & Billing",
    icon: CheckCircle,
    questions: [
      { q: "How do I update my account information?", a: "Go to your Account page and click on 'Edit Profile' to update your information, address, and preferences." },
      { q: "How do I change my password?", a: "In your Account settings, click on 'Security' and then 'Change Password'. You'll need to enter your current password." },
      { q: "Can I save multiple delivery addresses?", a: "Yes, you can save multiple addresses in your account. Select your preferred address at checkout." },
      { q: "How do I view my order history?", a: "All your orders are available in your Account dashboard under 'Order History'. You can view details and reorder items." },
    ],
  },
]

const contactOptions = [
  { icon: MessageCircle, title: "Live Chat", description: "Chat with our support team", action: "Start Chat" },
  { icon: Mail, title: "Email Support", description: "support@yarvest.com", action: "Send Email" },
  { icon: Phone, title: "Phone Support", description: "(415) 555-0123", action: "Call Now" },
]

export default function HelpPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null)

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
      q.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0)

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <main className="flex-1 overflow-auto bg-white">
        {/* Clean Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-6 py-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#0A5D31]/10 rounded-2xl mb-4">
                <HelpCircle className="w-8 h-8 text-[#0A5D31]" />
              </div>
              <h1 className="text-5xl font-bold text-gray-900 mb-3">How can we help?</h1>
              <p className="text-lg text-gray-600">Find answers to common questions or get in touch</p>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-14 h-14 text-base rounded-2xl border-2 border-gray-200 focus:border-[#0A5D31] focus:ring-4 focus:ring-[#0A5D31]/20 bg-white"
              />
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 py-12">
          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {contactOptions.map((option, idx) => (
              <div
                key={idx}
                className="bg-[#0A5D31] rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <option.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-2">{option.title}</h3>
                <p className="text-white/90 text-sm mb-4">{option.description}</p>
                <Button variant="secondary" className="w-full bg-white/20 hover:bg-white/30 text-white border-0">
                  {option.action}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            ))}
          </div>

          {/* FAQ Categories */}
          <div className="space-y-4">
            {filteredFAQs.map((category, catIdx) => (
              <div key={catIdx} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                <button
                  onClick={() => setExpandedCategory(expandedCategory === category.title ? null : category.title)}
                  className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#0A5D31]/10 rounded-xl flex items-center justify-center">
                      <category.icon className="w-5 h-5 text-[#0A5D31]" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {category.questions.length}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      expandedCategory === category.title ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {expandedCategory === category.title && (
                  <div className="px-6 pb-6 space-y-3 border-t border-gray-100 pt-4">
                    {category.questions.map((faq, faqIdx) => (
                      <div key={faqIdx} className="group">
                        <button
                          onClick={() => setExpandedQuestion(expandedQuestion === faqIdx ? null : faqIdx)}
                          className="w-full text-left p-4 rounded-xl hover:bg-[#0A5D31]/5 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <h4 className="font-semibold text-gray-900 flex-1">{faq.q}</h4>
                            <ChevronDown
                              className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${
                                expandedQuestion === faqIdx ? "rotate-180" : ""
                              }`}
                            />
                          </div>
                        </button>
                        {expandedQuestion === faqIdx && (
                          <div className="px-4 pb-4 text-gray-600 leading-relaxed">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredFAQs.length === 0 && (
            <div className="text-center py-16">
              <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600 mb-6">Try different search terms or contact our support team</p>
              <Button className="bg-[#0A5D31] hover:bg-[#0d7a3f] text-white">
                Contact Support
              </Button>
            </div>
          )}
        </div>
        <Footer />
      </main>
    </div>
  )
}
