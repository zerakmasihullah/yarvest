"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  HelpCircle,
  MessageSquare,
  Search,
  Book,
  Video,
  Phone,
  Mail,
  Send,
  CheckCircle,
  Clock
} from "lucide-react"
import { useState } from "react"

const faqCategories = [
  { id: "getting-started", name: "Getting Started", count: 5 },
  { id: "deliveries", name: "Deliveries", count: 8 },
  { id: "earnings", name: "Earnings & Payments", count: 6 },
  { id: "troubleshooting", name: "Troubleshooting", count: 4 },
]

const faqs = [
  {
    id: 1,
    category: "getting-started",
    question: "How do I start accepting deliveries?",
    answer: "To start accepting deliveries, toggle your status to 'Online' in the dashboard. You'll then receive delivery requests based on your active hours and location.",
  },
  {
    id: 2,
    category: "deliveries",
    question: "What should I do if I can't find the delivery address?",
    answer: "If you can't find the delivery address, contact the customer using the phone number provided in the delivery details. You can also use the navigation feature to get directions.",
  },
  {
    id: 3,
    category: "earnings",
    question: "When do I get paid?",
    answer: "Earnings are processed weekly. You'll receive payments every Monday for deliveries completed the previous week. Payments are deposited directly to your connected bank account.",
  },
  {
    id: 4,
    category: "deliveries",
    question: "Can I reject a delivery?",
    answer: "Yes, you can reject deliveries that you're unable to complete. However, frequent rejections may affect your rating and access to high-priority deliveries.",
  },
]

const supportTickets = [
  {
    id: "TKT-001",
    subject: "Payment issue",
    status: "open",
    priority: "high",
    createdAt: "2024-01-15 10:30 AM",
    lastUpdate: "2024-01-15 11:00 AM",
  },
  {
    id: "TKT-002",
    subject: "App navigation problem",
    status: "resolved",
    priority: "medium",
    createdAt: "2024-01-14 02:15 PM",
    lastUpdate: "2024-01-14 03:30 PM",
  },
]

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showContactForm, setShowContactForm] = useState(false)

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Help & Support</h1>
        <p className="text-gray-600">Find answers to common questions or contact support</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-2 hover:shadow-xl transition-all cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Contact Support</h3>
            <p className="text-sm text-gray-600 mb-4">Get help from our support team</p>
            <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white">
              Open Ticket
            </Button>
          </CardContent>
        </Card>

        <Card className="border-2 hover:shadow-xl transition-all cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Call Support</h3>
            <p className="text-sm text-gray-600 mb-4">Speak with a support agent</p>
            <Button variant="outline" className="w-full border-2">
              (555) 123-4567
            </Button>
          </CardContent>
        </Card>

        <Card className="border-2 hover:shadow-xl transition-all cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
              <Video className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Video Tutorials</h3>
            <p className="text-sm text-gray-600 mb-4">Watch step-by-step guides</p>
            <Button variant="outline" className="w-full border-2">
              Watch Videos
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="border-2 shadow-lg">
        <CardContent className="p-5">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 border-2"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* FAQ Categories */}
        <Card className="border-2 shadow-lg">
          <CardHeader className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <CardTitle className="flex items-center gap-2">
              <Book className="w-5 h-5 text-blue-600" />
              Categories
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
                  selectedCategory === "all" ? "bg-blue-50 border-l-4 border-blue-600" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900">All Questions</span>
                  <Badge className="bg-blue-100 text-blue-800">{faqs.length}</Badge>
                </div>
              </button>
              {faqCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
                    selectedCategory === category.id ? "bg-blue-50 border-l-4 border-blue-600" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900">{category.name}</span>
                    <Badge className="bg-gray-100 text-gray-800">{category.count}</Badge>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* FAQ List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredFaqs.map((faq) => (
            <Card key={faq.id} className="border-2 hover:shadow-xl transition-all">
              <CardHeader>
                <CardTitle className="text-lg flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>{faq.question}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Support Tickets */}
      <Card className="border-2 shadow-lg">
        <CardHeader className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center justify-between">
            <CardTitle>Support Tickets</CardTitle>
            <Button 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white gap-2"
              onClick={() => setShowContactForm(true)}
            >
              <MessageSquare className="w-4 h-4" />
              New Ticket
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-100">
            {supportTickets.map((ticket) => (
              <div key={ticket.id} className="p-5 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono font-semibold text-gray-900">{ticket.id}</span>
                      <Badge className={
                        ticket.status === "open" ? "bg-yellow-500 text-white" :
                        ticket.status === "resolved" ? "bg-emerald-500 text-white" :
                        "bg-gray-500 text-white"
                      }>
                        {ticket.status}
                      </Badge>
                      {ticket.priority === "high" && (
                        <Badge className="bg-red-500 text-white">High Priority</Badge>
                      )}
                    </div>
                    <p className="font-semibold text-gray-900 mb-1">{ticket.subject}</p>
                    <p className="text-sm text-gray-500">Created: {ticket.createdAt} • Last update: {ticket.lastUpdate}</p>
                  </div>
                  <Button variant="outline">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

